package agencyadmin

import (
	"backend/resource/repositories/agencyadmin"
)

type DashboardService struct {
	Repo *agencyadmin.DashboardRepository
}

func (s *DashboardService) GetDashboardStats(agencyID uint) (*agencyadmin.DashboardStats, error) {
	return s.Repo.GetStats(agencyID)
}

// In a real scenario, we might also add GetRecentActivities here, returning a combined list of latest Users, Projects, etc.
