package superadmin

import (
	"backend/resource/models"
	"gorm.io/gorm"
)

type DashboardRepository interface {
	GetTotalAgencies() (int64, error)
	GetTotalUsersByRole(role string) (int64, error)
	GetTotalProjectsByStatus(status string) (int64, error)
	GetMonthlyRevenue() (float64, error)
	GetActiveSubscriptions() (int64, error)
	GetRecentActivities(limit int) ([]models.ActivityLog, error)
}

type dashboardRepository struct {
	db *gorm.DB
}

func NewDashboardRepository(db *gorm.DB) DashboardRepository {
	return &dashboardRepository{db}
}

func (r *dashboardRepository) GetTotalAgencies() (int64, error) {
	var count int64
	err := r.db.Model(&models.Agency{}).Count(&count).Error
	return count, err
}

func (r *dashboardRepository) GetTotalUsersByRole(role string) (int64, error) {
	var count int64
	err := r.db.Model(&models.User{}).Where("role = ?", role).Count(&count).Error
	return count, err
}

func (r *dashboardRepository) GetTotalProjectsByStatus(status string) (int64, error) {
	var count int64
	err := r.db.Model(&models.Project{}).Where("status = ?", status).Count(&count).Error
	return count, err
}

func (r *dashboardRepository) GetMonthlyRevenue() (float64, error) {
	// Dummy query for monthly revenue based on Payments this month
	var total float64
	err := r.db.Model(&models.Payment{}).
		Select("COALESCE(SUM(amount), 0)").
		Where("status = ? AND payment_date >= date_trunc('month', CURRENT_DATE)", "Paid").
		Scan(&total).Error
	return total, err
}

func (r *dashboardRepository) GetActiveSubscriptions() (int64, error) {
	var count int64
	err := r.db.Model(&models.Subscription{}).Where("status = ?", "Active").Count(&count).Error
	return count, err
}

func (r *dashboardRepository) GetRecentActivities(limit int) ([]models.ActivityLog, error) {
	var logs []models.ActivityLog
	err := r.db.Order("created_at DESC").Limit(limit).Find(&logs).Error
	return logs, err
}
