package client

import (
	clientModel "backend/resource/models"

	"gorm.io/gorm"
)

type ProjectRepository struct {
	DB *gorm.DB
}

func (r *ProjectRepository) FindAgency(agencyID uint) (*clientModel.Agency, error) {
	var agency clientModel.Agency

	err := r.DB.
		Where("id = ?", agencyID).
		First(&agency).Error

	if err != nil {
		return nil, err
	}

	return &agency, nil
}

func (r *ProjectRepository) CreateRequestProject(projectRequest *clientModel.ProjectRequest) error {
	return r.DB.Create(projectRequest).Error
}

func (r *ProjectRepository) FindProjectRequests(clientID uint, statuses []string) ([]clientModel.ProjectRequest, error) {

	var requests []clientModel.ProjectRequest

	query := r.DB.
		Preload("Agency").
		Where("client_id = ?", clientID)

	if len(statuses) > 0 {
		query = query.Where("status IN ?", statuses)
	}

	err := query.
		Order("created_at DESC").
		Find(&requests).Error

	if err != nil {
		return nil, err
	}

	return requests, nil
}

func (r *ProjectRepository) FindProjects(clientID uint) ([]clientModel.Project, error) {

	var projects []clientModel.Project

	err := r.DB.
		Preload("Agency").
		Where("client_id = ?", clientID).
		Order("created_at DESC").
		Find(&projects).Error

	if err != nil {
		return nil, err
	}

	return projects, nil
}
