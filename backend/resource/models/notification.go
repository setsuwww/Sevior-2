package models

import "time"

type Notification struct {
	ID        uint   `gorm:"primaryKey"`
	AgencyID  *uint  `gorm:"index"`
	UserID    *uint  `gorm:"index"`
	Title     string `gorm:"type:varchar"`
	Message   string `gorm:"type:text"`
	IsRead    *bool
	CreatedAt time.Time

	Agency Agency `gorm:"foreignKey:AgencyID;constraint:OnDelete:CASCADE"`
	User   User   `gorm:"foreignKey:UserID;constraint:OnDelete:CASCADE"`
}
