package models

import "time"

type ProjectMember struct {
	ID          uint       `gorm:"primaryKey"`
	ProjectID   *uint      `gorm:"index"`
	DeveloperID *uint      `gorm:"index"`
	AssignedAt  *time.Time `gorm:"type:timestamp"`

	Project   Project `gorm:"foreignKey:ProjectID;constraint:OnDelete:CASCADE"`
	Developer User    `gorm:"foreignKey:DeveloperID;constraint:OnDelete:CASCADE"`
}
