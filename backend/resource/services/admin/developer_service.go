package admin

import (
	"errors"
	"strings"

	adminDTO "backend/resource/dto/admin"
	adminModel "backend/resource/models"
	adminRepo "backend/resource/repositories/admin"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type DeveloperService struct {
	Repo *adminRepo.DeveloperRepository
}

func boolPtr(value bool) *bool {
	return &value
}

func NewDeveloperService(repo *adminRepo.DeveloperRepository) *DeveloperService {
	return &DeveloperService{Repo: repo}
}

func (s *DeveloperService) GetDevelopers(agencyID uint) ([]adminModel.User, error) {
	return s.Repo.GetDevelopers(agencyID)
}

func (s *DeveloperService) GetDeveloperByID(agencyID uint, developerID uint) (*adminModel.User, error) {
	return s.Repo.GetDeveloperByID(agencyID, developerID)
}

func (s *DeveloperService) CreateDeveloper(agencyID uint, req adminDTO.CreateDeveloperRequest) (*adminModel.User, error) {

	fullName := strings.TrimSpace(req.FullName)
	email := strings.TrimSpace(strings.ToLower(req.Email))
	phone := strings.TrimSpace(req.Phone)
	biography := strings.TrimSpace(req.Biography)
	password := strings.TrimSpace(req.Password)

	if fullName == "" {
		return nil, errors.New("full name is required")
	}
	if email == "" {
		return nil, errors.New("email is required")
	}
	if phone == "" {
		return nil, errors.New("phone is required")
	}
	if password == "" {
		return nil, errors.New("password is required")
	}
	if biography == "" {
		biography = "I'm a developer and I love Sevior."
	}

	existingUser, err := s.Repo.FindUserByEmail(email, 0)
	if err != nil && !errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, err
	}
	if existingUser != nil {
		return nil, errors.New("email already exists")
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return nil, err
	}

	developer := &adminModel.User{
		AgencyID:  &agencyID,
		FullName:  fullName,
		Email:     email,
		Phone:     phone,
		Password:  string(hashedPassword),
		Biography: biography,
		Role:      adminModel.RoleDeveloper,
		IsActive:  boolPtr(true),
	}

	if err := s.Repo.CreateDeveloper(developer); err != nil {
		return nil, err
	}

	return developer, nil
}

func (s *DeveloperService) UpdateDeveloper(agencyID uint, developerID uint, req adminDTO.UpdateDeveloperRequest) (*adminModel.User, error) {
	fullName := strings.TrimSpace(req.FullName)
	email := strings.TrimSpace(strings.ToLower(req.Email))
	phone := strings.TrimSpace(req.Phone)
	biography := strings.TrimSpace(req.Biography)

	if fullName == "" {
		return nil, errors.New("full name is required")
	}

	if email == "" {
		return nil, errors.New("email is required")
	}

	if phone == "" {
		return nil, errors.New("phone is required")
	}

	// Pastikan developer memang milik agency tersebut.
	_, err := s.Repo.GetDeveloperByID(
		agencyID,
		developerID,
	)

	if err != nil {
		return nil, err
	}

	// Cek email hanya kalau email berubah / dipakai user lain.
	existingUser, err := s.Repo.FindUserByEmail(
		email,
		developerID,
	)

	if err != nil && !errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, err
	}

	if existingUser != nil {
		return nil, errors.New("email already in use")
	}

	data := map[string]interface{}{
		"full_name": fullName,
		"email":     email,
		"phone":     phone,
		"biography": biography,
	}

	if req.IsActive != nil {
		data["is_active"] = *req.IsActive
	}

	if err := s.Repo.UpdateDeveloper(
		agencyID,
		developerID,
		data,
	); err != nil {
		return nil, err
	}

	return s.Repo.GetDeveloperByID(
		agencyID,
		developerID,
	)
}

func (s *DeveloperService) DeleteDeveloper(agencyID uint, developerID uint) error {
	return s.Repo.DeleteDeveloper(agencyID, developerID)
}
