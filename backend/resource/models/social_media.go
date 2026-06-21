package models

import "time"

type SocialMedia struct {
	ID        uint   `gorm:"primaryKey"`
	AgencyID  *uint  `gorm:"index"`
	Platform  string `gorm:"type:varchar"`
	URL       string `gorm:"type:varchar"`
	CreatedAt time.Time
	UpdatedAt time.Time

	Agency Agency `gorm:"foreignKey:AgencyID;constraint:OnDelete:CASCADE"`
}
