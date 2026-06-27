package agencyadmin

import (
	"backend/resource/models"
	"backend/resource/repositories/agencyadmin"
	"errors"
	"golang.org/x/crypto/bcrypt"
)

type DeveloperService struct {
	Repo *agencyadmin.DeveloperRepository
}

func (s *DeveloperService) GetDevelopers(agencyID uint, search, status, sort string, page, limit int) ([]models.User, int64, error) {
	if page < 1 {
		page = 1
	}
	if limit < 1 || limit > 100 {
		limit = 10
	}
	offset := (page - 1) * limit

	return s.Repo.GetDevelopers(agencyID, search, status, sort, offset, limit)
}

func (s *DeveloperService) GetDeveloperByID(agencyID, developerID uint) (*models.User, error) {
	return s.Repo.GetDeveloperByID(agencyID, developerID)
}

func (s *DeveloperService) CreateDeveloper(agencyID uint, payload map[string]interface{}) error {
	name, _ := payload["full_name"].(string)
	email, _ := payload["email"].(string)
	phone, _ := payload["phone"].(string)
	bio, _ := payload["biography"].(string)
	password, _ := payload["password"].(string)
	isActive, ok := payload["is_active"].(bool)
	if !ok {
		isActive = true
	}

	if name == "" || email == "" || password == "" {
		return errors.New("name, email, and password are required")
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}

	dev := &models.User{
		AgencyID:  &agencyID,
		FullName:  name,
		Email:     email,
		Phone:     phone,
		Biography: bio,
		Password:  string(hashedPassword),
		Role:      models.RoleDeveloper,
		IsActive:  &isActive,
	}

	return s.Repo.CreateDeveloper(dev)
}

func (s *DeveloperService) UpdateDeveloper(agencyID uint, developerID uint, updates map[string]interface{}) error {
	dev, err := s.Repo.GetDeveloperByID(agencyID, developerID)
	if err != nil {
		return err
	}

	// Apply updates
	if name, ok := updates["full_name"].(string); ok {
		dev.FullName = name
	}
	if email, ok := updates["email"].(string); ok {
		dev.Email = email
	}
	if phone, ok := updates["phone"].(string); ok {
		dev.Phone = phone
	}
	if bio, ok := updates["biography"].(string); ok {
		dev.Biography = bio
	}
	if password, ok := updates["password"].(string); ok && password != "" {
		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
		if err == nil {
			dev.Password = string(hashedPassword)
		}
	}
	if isActive, ok := updates["is_active"].(bool); ok {
		dev.IsActive = &isActive
	}

	// We don't allow updating Role or AgencyID

	return s.Repo.UpdateDeveloper(dev)
}

func (s *DeveloperService) DeleteDeveloper(agencyID, developerID uint) error {
	// Verify it belongs to the agency
	_, err := s.Repo.GetDeveloperByID(agencyID, developerID)
	if err != nil {
		return errors.New("developer not found or access denied")
	}

	return s.Repo.SoftDeleteDeveloper(developerID)
}
