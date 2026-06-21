package models

import "time"

type ActivityLog struct {
	ID         uint   `gorm:"primaryKey"`
	AgencyID   *uint  `gorm:"index"`
	UserID     *uint  `gorm:"index"`
	Action     string `gorm:"type:varchar"`
	EntityType string `gorm:"type:varchar"`
	EntityID   *uint  `gorm:"index"`
	IPAddress  string `gorm:"type:varchar"`
	CreatedAt  time.Time

	Agency Agency `gorm:"foreignKey:AgencyID;constraint:OnDelete:CASCADE"`
	User   User   `gorm:"foreignKey:UserID;constraint:OnDelete:CASCADE"`
}
