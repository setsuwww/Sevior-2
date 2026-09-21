package models

import "time"

type ProjectMember struct {
	ID          uint       `gorm:"primaryKey"`
	ProjectID   *uint      `gorm:"not null;uniqueIndex:idx_project_developer"`
	DeveloperID *uint      `gorm:"not null;uniqueIndex:idx_project_developer"`
	AssignedAt  *time.Time `gorm:"type:timestamp"`

	Project   Project `gorm:"foreignKey:ProjectID;constraint:OnDelete:CASCADE"`
	Developer User    `gorm:"foreignKey:DeveloperID;constraint:OnDelete:CASCADE"`
}
