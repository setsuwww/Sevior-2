package superadmin

import (
	"backend/resource/models"
	"gorm.io/gorm"
)

type AgencyRepository interface {
	GetAll(page, limit int, search, subscriptionFilter, sort string) ([]models.Agency, int64, error)
	GetByID(id uint) (*models.Agency, error)
	UpdateStatus(id uint, isActive bool) error
	Delete(id uint) error
}

type agencyRepository struct {
	db *gorm.DB
}

func NewAgencyRepository(db *gorm.DB) AgencyRepository {
	return &agencyRepository{db}
}

func (r *agencyRepository) GetAll(page, limit int, search, subscriptionFilter, sort string) ([]models.Agency, int64, error) {
	var agencies []models.Agency
	var total int64

	query := r.db.Model(&models.Agency{}).
		Preload("Owner").
		Preload("Subscription").
		Preload("Users") // To count developers/clients later

	if search != "" {
		searchQuery := "%" + search + "%"
		query = query.Joins("LEFT JOIN users ON users.id = agencies.owner_id").
			Where("agencies.name ILIKE ? OR users.full_name ILIKE ? OR users.email ILIKE ?", searchQuery, searchQuery, searchQuery)
	}

	if subscriptionFilter != "" && subscriptionFilter != "ALL" {
		query = query.Joins("LEFT JOIN subscriptions ON subscriptions.agency_id = agencies.id").
			Where("subscriptions.status = ?", subscriptionFilter)
	}

	query.Count(&total)

	if sort == "OLDEST" {
		query = query.Order("agencies.created_at ASC")
	} else {
		query = query.Order("agencies.created_at DESC")
	}

	offset := (page - 1) * limit
	err := query.Limit(limit).Offset(offset).Find(&agencies).Error

	return agencies, total, err
}

func (r *agencyRepository) GetByID(id uint) (*models.Agency, error) {
	var agency models.Agency
	err := r.db.
		Preload("Owner").
		Preload("Subscription").
		Preload("Users").
		Preload("Projects").
		First(&agency, id).Error
	return &agency, err
}

func (r *agencyRepository) UpdateStatus(id uint, isActive bool) error {
	return r.db.Model(&models.Agency{}).Where("id = ?", id).Update("is_active", isActive).Error
}

func (r *agencyRepository) Delete(id uint) error {
	return r.db.Delete(&models.Agency{}, id).Error
}
