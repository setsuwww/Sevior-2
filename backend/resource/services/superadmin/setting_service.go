package superadmin

import (
	"backend/resource/models"
	repo "backend/resource/repositories/superadmin"
)

type PaginatedAuditLogsResponse struct {
	Data  []models.ActivityLog `json:"data"`
	Total int64                `json:"total"`
	Page  int                  `json:"page"`
	Limit int                  `json:"limit"`
}

type PaginatedAnnouncementsResponse struct {
	Data  []models.Announcement `json:"data"`
	Total int64                 `json:"total"`
	Page  int                   `json:"page"`
	Limit int                   `json:"limit"`
}

type SettingService interface {
	GetMaintenanceMode() bool
	SetMaintenanceMode(isActive bool) error

	GetAuditLogs(page, limit int, search string) (*PaginatedAuditLogsResponse, error)

	GetAnnouncements(page, limit int) (*PaginatedAnnouncementsResponse, error)
	CreateAnnouncement(title, content string, createdBy uint) error
	UpdateAnnouncement(id uint, updates map[string]interface{}) error
	DeleteAnnouncement(id uint) error
}

type settingService struct {
	repo repo.SettingRepository
}

func NewSettingService(repo repo.SettingRepository) SettingService {
	return &settingService{repo}
}

func (s *settingService) GetMaintenanceMode() bool {
	return s.repo.GetMaintenanceMode()
}

func (s *settingService) SetMaintenanceMode(isActive bool) error {
	return s.repo.SetMaintenanceMode(isActive)
}

func (s *settingService) GetAuditLogs(page, limit int, search string) (*PaginatedAuditLogsResponse, error) {
	logs, total, err := s.repo.GetAuditLogs(page, limit, search)
	if err != nil {
		return nil, err
	}

	return &PaginatedAuditLogsResponse{
		Data:  logs,
		Total: total,
		Page:  page,
		Limit: limit,
	}, nil
}

func (s *settingService) GetAnnouncements(page, limit int) (*PaginatedAnnouncementsResponse, error) {
	announcements, total, err := s.repo.GetAnnouncements(page, limit)
	if err != nil {
		return nil, err
	}

	return &PaginatedAnnouncementsResponse{
		Data:  announcements,
		Total: total,
		Page:  page,
		Limit: limit,
	}, nil
}

func (s *settingService) CreateAnnouncement(title, content string, createdBy uint) error {
	announcement := &models.Announcement{
		Title:     title,
		Content:   content,
		CreatedBy: createdBy,
		IsActive:  true,
	}
	return s.repo.CreateAnnouncement(announcement)
}

func (s *settingService) UpdateAnnouncement(id uint, updates map[string]interface{}) error {
	return s.repo.UpdateAnnouncement(id, updates)
}

func (s *settingService) DeleteAnnouncement(id uint) error {
	return s.repo.DeleteAnnouncement(id)
}
