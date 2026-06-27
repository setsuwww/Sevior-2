package models

import (
	"time"
)

type Announcement struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	Title     string    `gorm:"type:varchar(255);not null" json:"title"`
	Content   string    `gorm:"type:text;not null" json:"content"`
	IsActive  bool      `gorm:"default:true" json:"is_active"`
	CreatedBy uint      `gorm:"not null;index" json:"created_by"`
	Author    User      `gorm:"foreignKey:CreatedBy" json:"author"`
	CreatedAt time.Time `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt time.Time `gorm:"autoUpdateTime" json:"updated_at"`
}
