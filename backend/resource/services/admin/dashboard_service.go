package admin

import "backend/resource/repositories/admin"

type DashboardService struct {
	Repo *admin.DashboardRepository
}

func (s *DashboardService) GetDashboardStats(agencyID uint) (*admin.DashboardStats, error) {
	return s.Repo.GetStats(agencyID)
}

// In a real scenario, we might also add GetRecentActivities here, returning a combined list of latest Users, Projects, etc.
