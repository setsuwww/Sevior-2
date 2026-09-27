package client

import (
	clientModel "backend/resource/models"

	"gorm.io/gorm"
)

type AgencyRepository struct {
	DB *gorm.DB
}

func (r *AgencyRepository) GetAllAgencies() ([]clientModel.Agency, error) {
	var agencies []clientModel.Agency

	err := r.DB.
		Where("status = ?", "ACTIVE").
		Find(&agencies).Error

	if err != nil {
		return nil, err
	}

	return agencies, nil
}

func (r *AgencyRepository) GetAgencies(page int, limit int) ([]clientModel.Agency, int64, error) {
	var agencies []clientModel.Agency
	var total int64

	offset := (page - 1) * limit

	// Total agency aktif
	if err := r.DB.
		Model(&clientModel.Agency{}).
		Where("status = ?", clientModel.AgencyStatusActive).
		Count(&total).Error; err != nil {
		return nil, 0, err
	}

	// Data agency aktif untuk halaman tersebut
	err := r.DB.
		Select(`
			id,
			agency_name,
			agency_slug,
			description,
			location,
			profile_image,
			subscription_plan
		`).
		Where("status = ?", clientModel.AgencyStatusActive).
		Order("created_at DESC").
		Limit(limit).
		Offset(offset).
		Find(&agencies).Error

	if err != nil {
		return nil, 0, err
	}

	return agencies, total, nil
}
