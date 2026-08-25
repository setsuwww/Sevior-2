package admin

import (
	"errors"

	"backend/resource/models"

	"gorm.io/gorm"
)

type ProfileRepository struct {
	DB *gorm.DB
}

func (r *ProfileRepository) GetUserByID(userID uint) (*models.User, error) {
	var user models.User

	err := r.DB.
		Preload("Agency").
		First(&user, userID).
		Error

	if err != nil {
		return nil, err
	}

	return &user, nil
}

func (r *ProfileRepository) UpdateUser(userID uint, data map[string]interface{}) error {
	return r.DB.
		Model(&models.User{}).
		Where("id = ?", userID).
		Updates(data).
		Error
}

func (r *ProfileRepository) UpdateAgency(agencyID uint, data map[string]interface{}) error {
	return r.DB.
		Model(&models.Agency{}).
		Where("id = ?", agencyID).
		Updates(data).
		Error
}

func (r *ProfileRepository) FindUserByEmail(email string, excludeUserID uint) (*models.User, error) {
	var user models.User

	err := r.DB.
		Where("email = ? AND id != ?", email, excludeUserID).
		First(&user).
		Error

	if err != nil {
		return nil, err
	}

	return &user, nil
}

func (r *ProfileRepository) FindAgencyBySlug(slug string, excludeAgencyID uint) (*models.Agency, error) {
	var agency models.Agency

	err := r.DB.
		Where("agency_slug = ? AND id != ?", slug, excludeAgencyID).
		First(&agency).
		Error

	if err != nil {
		return nil, err
	}

	return &agency, nil
}

func (r *ProfileRepository) DeleteUser(userID uint) error {
	result := r.DB.Delete(&models.User{}, userID)

	if result.Error != nil {
		return result.Error
	}

	if result.RowsAffected == 0 {
		return errors.New("user not found")
	}

	return nil
}
