package superadmin

import (
	"backend/resource/models"
	"gorm.io/gorm"
)

type ProjectRepository interface {
	GetAll(page, limit int, search, filter, sort string) ([]models.Project, int64, error)
	GetByID(id uint) (*models.Project, error)
}

type projectRepository struct {
	db *gorm.DB
}

func NewProjectRepository(db *gorm.DB) ProjectRepository {
	return &projectRepository{db}
}

func (r *projectRepository) GetAll(page, limit int, search, filter, sort string) ([]models.Project, int64, error) {
	var projects []models.Project
	var total int64

	query := r.db.Model(&models.Project{}).
		Preload("Agency").
		Preload("Client")

	if search != "" {
		searchQuery := "%" + search + "%"
		query = query.Joins("LEFT JOIN agencies ON agencies.id = projects.agency_id").
			Joins("LEFT JOIN users AS clients ON clients.id = projects.client_id").
			Where("projects.name ILIKE ? OR agencies.name ILIKE ? OR clients.full_name ILIKE ?", searchQuery, searchQuery, searchQuery)
	}

	if filter != "" && filter != "ALL" {
		query = query.Where("projects.status = ?", filter)
	}

	query.Count(&total)

	if sort == "OLDEST" {
		query = query.Order("projects.created_at ASC")
	} else {
		query = query.Order("projects.created_at DESC")
	}

	offset := (page - 1) * limit
	err := query.Limit(limit).Offset(offset).Find(&projects).Error

	return projects, total, err
}

func (r *projectRepository) GetByID(id uint) (*models.Project, error) {
	var project models.Project
	err := r.db.
		Preload("Agency").
		Preload("Client").
		Preload("Milestones").
		Preload("Members.User").
		First(&project, id).Error
	return &project, err
}
