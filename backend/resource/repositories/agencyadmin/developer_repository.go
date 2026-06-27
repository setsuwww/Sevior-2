package agencyadmin

import (
	"backend/resource/models"
	"gorm.io/gorm"
)

type DeveloperRepository struct {
	DB *gorm.DB
}

func (r *DeveloperRepository) GetDevelopers(agencyID uint, search, status, sort string, offset, limit int) ([]models.User, int64, error) {
	var developers []models.User
	var total int64

	query := r.DB.Model(&models.User{}).
		Where("agency_id = ? AND role = ?", agencyID, models.RoleDeveloper)

	if search != "" {
		searchLike := "%" + search + "%"
		query = query.Where("full_name ILIKE ? OR email ILIKE ? OR phone ILIKE ?", searchLike, searchLike, searchLike)
	}

	if status == "ACTIVE" {
		query = query.Where("is_active = ?", true)
	} else if status == "INACTIVE" {
		query = query.Where("is_active = ?", false)
	}

	if err := query.Count(&total).Error; err != nil {
		return nil, 0, err
	}

	if sort == "OLDEST" {
		query = query.Order("created_at ASC")
	} else {
		query = query.Order("created_at DESC")
	}

	if err := query.Preload("AssignedTasks").Preload("ProjectMembers").Offset(offset).Limit(limit).Find(&developers).Error; err != nil {
		return nil, 0, err
	}

	return developers, total, nil
}

func (r *DeveloperRepository) GetDeveloperByID(agencyID, developerID uint) (*models.User, error) {
	var developer models.User
	err := r.DB.Preload("AssignedTasks").Preload("ProjectMembers.Project").Where("agency_id = ? AND role = ? AND id = ?", agencyID, models.RoleDeveloper, developerID).First(&developer).Error
	if err != nil {
		return nil, err
	}
	return &developer, nil
}

func (r *DeveloperRepository) UpdateDeveloper(developer *models.User) error {
	return r.DB.Save(developer).Error
}

func (r *DeveloperRepository) SoftDeleteDeveloper(developerID uint) error {
	return r.DB.Delete(&models.User{}, developerID).Error
}

func (r *DeveloperRepository) CreateDeveloper(developer *models.User) error {
	return r.DB.Create(developer).Error
}
