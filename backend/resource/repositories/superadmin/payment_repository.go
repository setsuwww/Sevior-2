package superadmin

import (
	"backend/resource/models"
	"gorm.io/gorm"
	"time"
)

type PaymentRepository interface {
	GetSubscriptions(page, limit int, status string) ([]models.Subscription, int64, error)
	GetPaymentStats() (monthly float64, pending float64, totalPaid float64, err error)
	MarkAsPaid(subscriptionID uint) error
	CancelSubscription(subscriptionID uint) error
	ExtendSubscription(subscriptionID uint, days int) error
}

type paymentRepository struct {
	db *gorm.DB
}

func NewPaymentRepository(db *gorm.DB) PaymentRepository {
	return &paymentRepository{db}
}

func (r *paymentRepository) GetSubscriptions(page, limit int, status string) ([]models.Subscription, int64, error) {
	var subs []models.Subscription
	var total int64

	query := r.db.Model(&models.Subscription{}).Preload("Agency")

	if status != "" && status != "ALL" {
		query = query.Where("status = ?", status)
	}

	query.Count(&total)
	offset := (page - 1) * limit
	err := query.Order("created_at DESC").Limit(limit).Offset(offset).Find(&subs).Error

	return subs, total, err
}

func (r *paymentRepository) GetPaymentStats() (monthly float64, pending float64, totalPaid float64, err error) {
	// Monthly revenue
	r.db.Model(&models.Payment{}).
		Select("COALESCE(SUM(amount), 0)").
		Where("status = ? AND payment_date >= date_trunc('month', CURRENT_DATE)", "Paid").
		Scan(&monthly)

	// Pending revenue
	r.db.Model(&models.Payment{}).
		Select("COALESCE(SUM(amount), 0)").
		Where("status = ?", "Pending").
		Scan(&pending)

	// Total paid
	r.db.Model(&models.Payment{}).
		Select("COALESCE(SUM(amount), 0)").
		Where("status = ?", "Paid").
		Scan(&totalPaid)

	return
}

func (r *paymentRepository) MarkAsPaid(subscriptionID uint) error {
	now := time.Now()
	// Update subscription
	if err := r.db.Model(&models.Subscription{}).Where("id = ?", subscriptionID).Update("status", "Active").Error; err != nil {
		return err
	}
	// Update related payment
	return r.db.Model(&models.Payment{}).Where("subscription_id = ? AND status = 'Pending'", subscriptionID).Updates(map[string]interface{}{
		"status":       "Paid",
		"payment_date": &now,
	}).Error
}

func (r *paymentRepository) CancelSubscription(subscriptionID uint) error {
	return r.db.Model(&models.Subscription{}).Where("id = ?", subscriptionID).Update("status", "Cancelled").Error
}

func (r *paymentRepository) ExtendSubscription(subscriptionID uint, days int) error {
	// For simplicity, we just add days to the end_date using raw SQL
	return r.db.Exec("UPDATE subscriptions SET end_date = end_date + (? || ' days')::interval WHERE id = ?", days, subscriptionID).Error
}
