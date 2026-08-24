package repositories

import (
	"backend/resource/models"

	"gorm.io/gorm"
)

type AgencyRepository struct {
	DB *gorm.DB
}

func (r *AgencyRepository) GetAllAgencies() ([]models.Agency, error) {
	var agencies []models.Agency

	err := r.DB.
		Where("status = ?", "ACTIVE").
		Find(&agencies).Error

	if err != nil {
		return nil, err
	}

	return agencies, nil
}
