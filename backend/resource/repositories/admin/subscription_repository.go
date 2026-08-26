package admin

import (
	"backend/resource/models"

	"gorm.io/gorm"
)

type SubscriptionRepository struct {
	DB *gorm.DB
}

func (r *SubscriptionRepository) GetCurrentSubscription(
	agencyID uint,
) (*models.Subscription, error) {

	var subscription models.Subscription

	err := r.DB.
		Where("agency_id = ?", agencyID).
		Where(
			"status IN ?",
			[]models.SubscriptionStatus{
				models.SubscriptionStatusActive,
				models.SubscriptionStatusTrialing,
			},
		).
		Order("end_date DESC").
		First(&subscription).
		Error

	if err != nil {
		return nil, err
	}

	return &subscription, nil
}

func (r *SubscriptionRepository) GetPayments(agencyID uint, subscriptionID uint) ([]models.Payment, error) {

	var payments []models.Payment

	err := r.DB.
		Where(
			"agency_id = ? AND subscription_id = ?",
			agencyID,
			subscriptionID,
		).
		Order("created_at DESC").
		Find(&payments).
		Error

	return payments, err
}
