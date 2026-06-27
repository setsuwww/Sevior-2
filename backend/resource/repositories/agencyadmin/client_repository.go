package agencyadmin

import (
	"backend/resource/models"
	"gorm.io/gorm"
)

type ClientRepository struct {
	DB *gorm.DB
}

func (r *ClientRepository) GetClients(agencyID uint, search, sort string, offset, limit int) ([]models.User, int64, error) {
	var clients []models.User
	var total int64

	// Join with project_requests to ensure the client has submitted at least one request to this agency
	query := r.DB.Model(&models.User{}).
		Joins("JOIN project_requests ON project_requests.client_id = users.id").
		Where("project_requests.agency_id = ? AND users.role = ?", agencyID, models.RoleClient).
		Distinct("users.id")

	if search != "" {
		searchLike := "%" + search + "%"
		query = query.Where("users.full_name ILIKE ? OR users.email ILIKE ? OR users.phone ILIKE ?", searchLike, searchLike, searchLike)
	}

	if err := query.Count(&total).Error; err != nil {
		return nil, 0, err
	}

	if sort == "OLDEST" {
		query = query.Order("users.created_at ASC")
	} else {
		query = query.Order("users.created_at DESC")
	}

	// Preload ProjectRequests to get the last request or count
	if err := query.Preload("ProjectRequests", "agency_id = ?", agencyID).
		Offset(offset).Limit(limit).Find(&clients).Error; err != nil {
		return nil, 0, err
	}

	return clients, total, nil
}

func (r *ClientRepository) GetClientByID(agencyID, clientID uint) (*models.User, error) {
	var client models.User

	// Check if this client belongs to this agency via project requests
	err := r.DB.Joins("JOIN project_requests ON project_requests.client_id = users.id").
		Where("project_requests.agency_id = ? AND users.role = ? AND users.id = ?", agencyID, models.RoleClient, clientID).
		First(&client).Error

	if err != nil {
		return nil, err
	}

	// Load related data scoped to this agency
	err = r.DB.Preload("ProjectRequests", "agency_id = ?", agencyID).
		Preload("ProjectRequests.Projects", "agency_id = ?", agencyID).
		Preload("ProjectRequests.Projects.Tasks").
		First(&client, client.ID).Error

	return &client, err
}
