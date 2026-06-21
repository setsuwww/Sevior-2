package models

import "time"

type File struct {
	ID         uint   `gorm:"primaryKey"`
	AgencyID   *uint  `gorm:"index"`
	ProjectID  *uint  `gorm:"index"`
	UploadedBy *uint  `gorm:"index"`
	FileName   string `gorm:"type:varchar"`
	FileURL    string `gorm:"type:text"`
	FileSize   *int64 `gorm:"type:bigint"`
	MimeType   string `gorm:"type:varchar"`
	CreatedAt  time.Time

	Agency   Agency  `gorm:"foreignKey:AgencyID;constraint:OnDelete:CASCADE"`
	Project  Project `gorm:"foreignKey:ProjectID;constraint:OnDelete:CASCADE"`
	Uploader User    `gorm:"foreignKey:UploadedBy;constraint:OnDelete:CASCADE"`
}
