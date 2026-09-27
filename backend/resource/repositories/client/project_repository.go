package client

import (
	"backend/resource/models"

	"gorm.io/gorm"
)

type ProjectRepository struct {
	DB *gorm.DB
}

func (r *ProjectRepository) FindAgency(agencyID uint) (*models.Agency, error) {
	var agency models.Agency

	err := r.DB.
		Where("id = ?", agencyID).
		First(&agency).
		Error

	if err != nil {
		return nil, err
	}

	return &agency, nil
}

func (r *ProjectRepository) CreateRequestProject(projectRequest *models.ProjectRequest) error {
	return r.DB.Create(projectRequest).Error
}
