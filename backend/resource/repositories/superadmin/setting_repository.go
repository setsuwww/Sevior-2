package superadmin

import (
	"backend/resource/models"
	"gorm.io/gorm"
)

type SettingRepository interface {
	// Maintenance
	GetMaintenanceMode() bool
	SetMaintenanceMode(isActive bool) error

	// Audit Logs
	GetAuditLogs(page, limit int, search string) ([]models.ActivityLog, int64, error)

	// Announcements
	GetAnnouncements(page, limit int) ([]models.Announcement, int64, error)
	CreateAnnouncement(announcement *models.Announcement) error
	UpdateAnnouncement(id uint, updates map[string]interface{}) error
	DeleteAnnouncement(id uint) error
}

type settingRepository struct {
	db *gorm.DB
	// Temporary in-memory state for maintenance.
	// In production, this should use Redis or a specific DB table.
	maintenanceMode bool
}

func NewSettingRepository(db *gorm.DB) SettingRepository {
	return &settingRepository{db: db, maintenanceMode: false}
}

func (r *settingRepository) GetMaintenanceMode() bool {
	return r.maintenanceMode
}

func (r *settingRepository) SetMaintenanceMode(isActive bool) error {
	r.maintenanceMode = isActive
	return nil
}

func (r *settingRepository) GetAuditLogs(page, limit int, search string) ([]models.ActivityLog, int64, error) {
	var logs []models.ActivityLog
	var total int64

	query := r.db.Model(&models.ActivityLog{}).Preload("User").Preload("Agency")

	if search != "" {
		searchQuery := "%" + search + "%"
		query = query.Where("action ILIKE ? OR details ILIKE ?", searchQuery, searchQuery)
	}

	query.Count(&total)

	offset := (page - 1) * limit
	err := query.Order("created_at DESC").Limit(limit).Offset(offset).Find(&logs).Error

	return logs, total, err
}

func (r *settingRepository) GetAnnouncements(page, limit int) ([]models.Announcement, int64, error) {
	var announcements []models.Announcement
	var total int64

	query := r.db.Model(&models.Announcement{}).Preload("Author")
	query.Count(&total)

	offset := (page - 1) * limit
	err := query.Order("created_at DESC").Limit(limit).Offset(offset).Find(&announcements).Error

	return announcements, total, err
}

func (r *settingRepository) CreateAnnouncement(announcement *models.Announcement) error {
	return r.db.Create(announcement).Error
}

func (r *settingRepository) UpdateAnnouncement(id uint, updates map[string]interface{}) error {
	return r.db.Model(&models.Announcement{}).Where("id = ?", id).Updates(updates).Error
}

func (r *settingRepository) DeleteAnnouncement(id uint) error {
	return r.db.Delete(&models.Announcement{}, id).Error
}
