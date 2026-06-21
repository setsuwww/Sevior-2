package models

import "time"

type Comment struct {
	ID        uint   `gorm:"primaryKey"`
	AgencyID  *uint  `gorm:"index"`
	ProjectID *uint  `gorm:"index"`
	TaskID    *uint  `gorm:"index"`
	UserID    *uint  `gorm:"index"`
	Comment   string `gorm:"type:text"`
	CreatedAt time.Time
	UpdatedAt time.Time

	Agency  Agency  `gorm:"foreignKey:AgencyID;constraint:OnDelete:CASCADE"`
	Project Project `gorm:"foreignKey:ProjectID;constraint:OnDelete:CASCADE"`
	Task    Task    `gorm:"foreignKey:TaskID;constraint:OnDelete:CASCADE"`
	User    User    `gorm:"foreignKey:UserID;constraint:OnDelete:CASCADE"`
}
