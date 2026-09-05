package admin

import (
	"errors"

	adminModel "backend/resource/models"

	"gorm.io/gorm"
)

type DeveloperRepository struct {
	DB *gorm.DB
}

func NewDeveloperRepository(db *gorm.DB) *DeveloperRepository {
	return &DeveloperRepository{
		DB: db,
	}
}

func (r *DeveloperRepository) GetDevelopers(agencyID uint) ([]adminModel.User, error) {
	var developers []adminModel.User

	err := r.DB.
		Where(
			"agency_id = ? AND role = ?",
			agencyID,
			adminModel.RoleDeveloper,
		).
		Order("created_at DESC").
		Find(&developers).Error

	if err != nil {
		return nil, err
	}

	return developers, nil
}

func (r *DeveloperRepository) GetDeveloperByID(agencyID uint, developerID uint) (*adminModel.User, error) {
	var developer adminModel.User

	err := r.DB.
		Where(
			"id = ? AND agency_id = ? AND role = ?",
			developerID,
			agencyID,
			adminModel.RoleDeveloper,
		).
		First(&developer).Error

	if err != nil {
		return nil, err
	}

	return &developer, nil
}

func (r *DeveloperRepository) FindUserByEmail(email string, excludeUserID uint) (*adminModel.User, error) {
	var user adminModel.User

	query := r.DB.Where("email = ?", email)

	if excludeUserID > 0 {
		query = query.Where("id != ?", excludeUserID)
	}

	err := query.First(&user).Error

	if err != nil {
		return nil, err
	}

	return &user, nil
}

func (r *DeveloperRepository) CreateDeveloper(developer *adminModel.User) error {
	return r.DB.Create(developer).Error
}

func (r *DeveloperRepository) UpdateDeveloper(agencyID uint, developerID uint, data map[string]interface{}) error {
	result := r.DB.Model(&adminModel.User{}).
		Where(
			"id = ? AND agency_id = ? AND role = ?",
			developerID,
			agencyID,
			adminModel.RoleDeveloper,
		).
		Updates(data)

	return result.Error
}

func (r *DeveloperRepository) DeleteDeveloper(agencyID uint, developerID uint) error {
	result := r.DB.
		Where(
			"id = ? AND agency_id = ? AND role = ?",
			developerID,
			agencyID,
			adminModel.RoleDeveloper,
		).
		Delete(&adminModel.User{})

	if result.Error != nil {
		return result.Error
	}

	if result.RowsAffected == 0 {
		return errors.New("developer not found")
	}

	return nil
}
