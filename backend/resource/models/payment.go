package models

import (
	"time"
)

type Payment struct {
	ID             uint         `gorm:"primaryKey" json:"id"`
	AgencyID       uint         `gorm:"not null;index" json:"agency_id"`
	Agency         Agency       `gorm:"foreignKey:AgencyID;constraint:OnDelete:CASCADE" json:"agency"`
	SubscriptionID uint         `gorm:"not null;index" json:"subscription_id"`
	Subscription   Subscription `gorm:"foreignKey:SubscriptionID;constraint:OnDelete:CASCADE" json:"subscription"`
	Amount         float64      `gorm:"not null" json:"amount"`
	Status         string       `gorm:"type:varchar(50);not null;default:'Pending'" json:"status"` // Pending, Paid, Failed
	PaymentDate    *time.Time   `json:"payment_date"`
	CreatedAt      time.Time    `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt      time.Time    `gorm:"autoUpdateTime" json:"updated_at"`
}
