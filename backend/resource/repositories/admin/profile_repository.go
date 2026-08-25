package admin

import (
	"backend/resource/models"

	"gorm.io/gorm"
)

type ProfileRepository struct {
	DB *gorm.DB
}

func (r *ProfileRepository) GetUserByID(userID uint) (*models.User, error) {
	var user models.User
	err := r.DB.Preload("Agency").First(&user, userID).Error

	if err != nil {
		return nil, err
	}

	return &user, nil
}

func (r *ProfileRepository) UpdateUser(userID uint, data map[string]interface{}) error {
	return r.DB.Model(&models.User{}).Where("id = ?", userID).Updates(data).Error
}

func (r *ProfileRepository) UpdateAgency(agencyID uint, data map[string]interface{}) error {
	return r.DB.Model(&models.Agency{}).Where("id = ?", agencyID).Updates(data).Error
}
