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

func NewDeveloperService(
	repo *adminRepo.DeveloperRepository,
) *DeveloperService {
	return &DeveloperService{
		Repo: repo,
	}
}

// ==========================================================
// GET ALL
// ==========================================================

func (s *DeveloperService) GetDevelopers(
	agencyID uint,
) (*adminDTO.DevelopersResponse, error) {

	developers, err := s.Repo.GetDevelopers(agencyID)

	if err != nil {
		return nil, err
	}

	response := &adminDTO.DevelopersResponse{
		Developers: make(
			[]adminDTO.DeveloperResponse,
			0,
			len(developers),
		),
	}

	for _, developer := range developers {
		response.Developers = append(
			response.Developers,
			mapDeveloperResponse(developer),
		)
	}

	return response, nil
}

// ==========================================================
// GET DETAIL
// ==========================================================

func (s *DeveloperService) GetDeveloperByID(
	agencyID uint,
	developerID uint,
) (*adminDTO.DeveloperResponse, error) {

	developer, err := s.Repo.GetDeveloperByID(
		agencyID,
		developerID,
	)

	if err != nil {
		return nil, err
	}

	response := mapDeveloperResponse(*developer)

	return &response, nil
}

// ==========================================================
// CREATE
// ==========================================================

func (s *DeveloperService) CreateDeveloper(
	agencyID uint,
	req adminDTO.CreateDeveloperRequest,
) (*adminDTO.DeveloperResponse, error) {

	req.FullName = strings.TrimSpace(req.FullName)
	req.Email = strings.TrimSpace(req.Email)
	req.Phone = strings.TrimSpace(req.Phone)
	req.Biography = strings.TrimSpace(req.Biography)

	if req.FullName == "" {
		return nil, errors.New("full name is required")
	}

	if req.Email == "" {
		return nil, errors.New("email is required")
	}

	// ======================================================
	// CHECK EMAIL
	// ======================================================

	existingUser, err := s.Repo.FindUserByEmail(
		req.Email,
		0,
	)

	if err == nil && existingUser != nil {
		return nil, errors.New("email already in use")
	}

	if err != nil &&
		!errors.Is(err, gorm.ErrRecordNotFound) {

		return nil, err
	}

	// ======================================================
	// DEFAULT PASSWORD
	// ======================================================

	// Untuk sementara password default.
	// Nanti bisa kita ubah menjadi generated password
	// atau invitation flow.

	hashedPassword, err := bcrypt.GenerateFromPassword(
		[]byte("developer123"),
		bcrypt.DefaultCost,
	)

	if err != nil {
		return nil, err
	}

	isActive := true

	developer := &adminModel.User{
		AgencyID:  &agencyID,
		FullName:  req.FullName,
		Email:     req.Email,
		Password:  string(hashedPassword),
		Role:      adminModel.RoleDeveloper,
		Phone:     req.Phone,
		Biography: req.Biography,
		IsActive:  &isActive,
	}

	if err := s.Repo.CreateDeveloper(developer); err != nil {
		return nil, err
	}

	response := mapDeveloperResponse(*developer)

	return &response, nil
}

// ==========================================================
// UPDATE
// ==========================================================

func (s *DeveloperService) UpdateDeveloper(
	agencyID uint,
	developerID uint,
	req adminDTO.UpdateDeveloperRequest,
) (*adminDTO.DeveloperResponse, error) {

	developer, err := s.Repo.GetDeveloperByID(
		agencyID,
		developerID,
	)

	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, errors.New("developer not found")
		}

		return nil, err
	}

	req.FullName = strings.TrimSpace(req.FullName)
	req.Email = strings.TrimSpace(req.Email)
	req.Phone = strings.TrimSpace(req.Phone)
	req.Biography = strings.TrimSpace(req.Biography)

	if req.FullName == "" {
		return nil, errors.New("full name is required")
	}

	if req.Email == "" {
		return nil, errors.New("email is required")
	}

	// ======================================================
	// CHECK EMAIL
	// ======================================================

	if !strings.EqualFold(
		developer.Email,
		req.Email,
	) {

		existingUser, err := s.Repo.FindUserByEmail(
			req.Email,
			developer.ID,
		)

		if err == nil && existingUser != nil {
			return nil, errors.New("email already in use")
		}

		if err != nil &&
			!errors.Is(err, gorm.ErrRecordNotFound) {

			return nil, err
		}
	}

	// ======================================================
	// UPDATE DATA
	// ======================================================

	data := map[string]interface{}{
		"full_name": req.FullName,
		"email":     req.Email,
		"phone":     req.Phone,
		"biography": req.Biography,
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

	updatedDeveloper, err := s.Repo.GetDeveloperByID(
		agencyID,
		developerID,
	)

	if err != nil {
		return nil, err
	}

	response := mapDeveloperResponse(
		*updatedDeveloper,
	)

	return &response, nil
}

// ==========================================================
// DELETE
// ==========================================================

func (s *DeveloperService) DeleteDeveloper(
	agencyID uint,
	developerID uint,
) error {

	return s.Repo.DeleteDeveloper(
		agencyID,
		developerID,
	)
}

// ==========================================================
// MAPPER
// ==========================================================

func mapDeveloperResponse(
	developer adminModel.User,
) adminDTO.DeveloperResponse {

	return adminDTO.DeveloperResponse{
		ID:           developer.ID,
		AgencyID:     developer.AgencyID,
		FullName:     developer.FullName,
		Email:        developer.Email,
		Phone:        developer.Phone,
		ProfileImage: developer.ProfileImage,
		Biography:    developer.Biography,
		Role:         developer.Role,
		IsActive: developer.IsActive != nil &&
			*developer.IsActive,
		LastLogin: developer.LastLogin,
		CreatedAt: developer.CreatedAt,
		UpdatedAt: developer.UpdatedAt,
	}
}
