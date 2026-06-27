package agencyadmin

import (
	"backend/resource/models"
	"gorm.io/gorm"
)

type DashboardRepository struct {
	DB *gorm.DB
}

type DashboardStats struct {
	TotalDevelopers  int64 `json:"total_developers"`
	TotalClients     int64 `json:"total_clients"`
	TotalProjects    int64 `json:"total_projects"`
	ActiveProjects   int64 `json:"active_projects"`
	CompletedProjects int64 `json:"completed_projects"`
	PendingProjects  int64 `json:"pending_projects"`
}

func (r *DashboardRepository) GetStats(agencyID uint) (*DashboardStats, error) {
	var stats DashboardStats

	// Developers count
	err := r.DB.Model(&models.User{}).
		Where("agency_id = ? AND role = ?", agencyID, models.RoleDeveloper).
		Count(&stats.TotalDevelopers).Error
	if err != nil {
		return nil, err
	}

	// Clients count (must have submitted at least one project request to this agency)
	err = r.DB.Model(&models.User{}).
		Joins("JOIN project_requests ON project_requests.client_id = users.id").
		Where("project_requests.agency_id = ? AND users.role = ?", agencyID, models.RoleClient).
		Distinct("users.id").
		Count(&stats.TotalClients).Error
	if err != nil {
		return nil, err
	}

	// Projects counts
	err = r.DB.Model(&models.Project{}).Where("agency_id = ?", agencyID).Count(&stats.TotalProjects).Error
	if err != nil {
		return nil, err
	}

	err = r.DB.Model(&models.Project{}).Where("agency_id = ? AND status = ?", agencyID, "ACTIVE").Count(&stats.ActiveProjects).Error
	if err != nil {
		return nil, err
	}

	err = r.DB.Model(&models.Project{}).Where("agency_id = ? AND status = ?", agencyID, "COMPLETED").Count(&stats.CompletedProjects).Error
	if err != nil {
		return nil, err
	}

	err = r.DB.Model(&models.Project{}).Where("agency_id = ? AND status = ?", agencyID, "PENDING").Count(&stats.PendingProjects).Error
	if err != nil {
		return nil, err
	}

	return &stats, nil
}
