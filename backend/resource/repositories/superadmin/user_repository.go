package superadmin

import (
	"backend/resource/models"
	"gorm.io/gorm"
)

type UserRepository interface {
	GetAll(page, limit int, search, role, status, sort string) ([]models.User, int64, error)
	GetByID(id uint) (*models.User, error)
	UpdateStatus(id uint, isActive bool) error
	Update(id uint, updates map[string]interface{}) error
}

type userRepository struct {
	db *gorm.DB
}

func NewUserRepository(db *gorm.DB) UserRepository {
	return &userRepository{db}
}

func (r *userRepository) GetAll(page, limit int, search, role, status, sort string) ([]models.User, int64, error) {
	var users []models.User
	var total int64

	query := r.db.Model(&models.User{}).Preload("Agency")

	if search != "" {
		searchQuery := "%" + search + "%"
		query = query.Where("users.full_name ILIKE ? OR users.email ILIKE ?", searchQuery, searchQuery)
		// To search by agency name we'd need a join, for simplicity assuming email/name is enough,
		// but if we need Agency Name search, we join:
		query = query.Joins("LEFT JOIN agencies ON agencies.id = users.agency_id").
			Or("agencies.name ILIKE ?", searchQuery)
	}

	if role != "" && role != "ALL" {
		query = query.Where("users.role = ?", role)
	}

	switch status {
	case "ACTIVE":
		query = query.Where("users.is_active = ?", true)
	case "INACTIVE":
		query = query.Where("users.is_active = ?", false)
	}

	query.Count(&total)

	if sort == "OLDEST" {
		query = query.Order("users.created_at ASC")
	} else {
		query = query.Order("users.created_at DESC")
	}

	offset := (page - 1) * limit
	err := query.Limit(limit).Offset(offset).Find(&users).Error

	return users, total, err
}

func (r *userRepository) GetByID(id uint) (*models.User, error) {
	var user models.User
	err := r.db.Preload("Agency").First(&user, id).Error
	return &user, err
}

func (r *userRepository) UpdateStatus(id uint, isActive bool) error {
	return r.db.Model(&models.User{}).Where("id = ?", id).Update("is_active", isActive).Error
}

func (r *userRepository) Update(id uint, updates map[string]interface{}) error {
	return r.db.Model(&models.User{}).Where("id = ?", id).Updates(updates).Error
}
