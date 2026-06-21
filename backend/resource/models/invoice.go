package models

import "time"

type Invoice struct {
	ID            uint       `gorm:"primaryKey"`
	AgencyID      *uint      `gorm:"index"`
	ProjectID     *uint      `gorm:"index"`
	ClientID      *uint      `gorm:"index"`
	InvoiceNumber string     `gorm:"type:varchar"`
	Amount        *float64   `gorm:"type:decimal"`
	Status        string     `gorm:"type:varchar"`
	DueDate       *time.Time `gorm:"type:date"`
	PaidAt        *time.Time `gorm:"type:timestamp"`
	CreatedAt     time.Time
	UpdatedAt     time.Time

	Agency  Agency  `gorm:"foreignKey:AgencyID;constraint:OnDelete:CASCADE"`
	Project Project `gorm:"foreignKey:ProjectID;constraint:OnDelete:CASCADE"`
	Client  User    `gorm:"foreignKey:ClientID;constraint:OnDelete:CASCADE"`
}
