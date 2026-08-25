package admin

import (
	"backend/resource/models"

	"gorm.io/gorm"
)

type ProfileRepository struct {
	DB *gorm.DB
}

func (r *ProfileRepository) GetUserProfile(userID uint) (*models.User, error) {
	var user models.User

	err := r.DB.
		Preload("Agency").
		First(&user, userID).Error

	if err != nil {
		return nil, err
	}

	return &user, nil
}
