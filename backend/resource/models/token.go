package models

import (
	"time"
)

type RefreshToken struct {
	ID        uint      `gorm:"primaryKey"`
	UserID    uint      `gorm:"index;not null"`
	Token     string    `gorm:"type:varchar;uniqueIndex;not null"`
	ExpiresAt time.Time `gorm:"not null"`
	CreatedAt time.Time
	User      User      `gorm:"foreignKey:UserID;constraint:OnDelete:CASCADE"`
}

type PasswordResetToken struct {
	ID        uint      `gorm:"primaryKey"`
	UserID    uint      `gorm:"index;not null"`
	Token     string    `gorm:"type:varchar;uniqueIndex;not null"`
	ExpiresAt time.Time `gorm:"not null"`
	CreatedAt time.Time
	User      User      `gorm:"foreignKey:UserID;constraint:OnDelete:CASCADE"`
}
