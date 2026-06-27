package superadmin

import (
	"backend/resource/models"
	repo "backend/resource/repositories/superadmin"
)

type DashboardResponse struct {
	TotalAgencies          int64                `json:"total_agencies"`
	TotalAdmins            int64                `json:"total_admins"`
	TotalDevelopers        int64                `json:"total_developers"`
	TotalClients           int64                `json:"total_clients"`
	TotalActiveProjects    int64                `json:"total_active_projects"`
	TotalCompletedProjects int64                `json:"total_completed_projects"`
	MonthlyRevenue         float64              `json:"monthly_revenue"`
	ActiveSubscriptions    int64                `json:"active_subscriptions"`
	RecentActivities       []models.ActivityLog `json:"recent_activities"`
}

type DashboardService interface {
	GetDashboardSummary() (*DashboardResponse, error)
}

type dashboardService struct {
	repo repo.DashboardRepository
}

func NewDashboardService(repo repo.DashboardRepository) DashboardService {
	return &dashboardService{repo}
}

func (s *dashboardService) GetDashboardSummary() (*DashboardResponse, error) {
	agencies, _ := s.repo.GetTotalAgencies()
	admins, _ := s.repo.GetTotalUsersByRole(models.RoleAdmin)
	devs, _ := s.repo.GetTotalUsersByRole(models.RoleDeveloper)
	clients, _ := s.repo.GetTotalUsersByRole(models.RoleClient)
	activeProj, _ := s.repo.GetTotalProjectsByStatus("In Progress")
	completedProj, _ := s.repo.GetTotalProjectsByStatus("Completed")
	revenue, _ := s.repo.GetMonthlyRevenue()
	subs, _ := s.repo.GetActiveSubscriptions()
	activities, _ := s.repo.GetRecentActivities(10)

	return &DashboardResponse{
		TotalAgencies:          agencies,
		TotalAdmins:            admins,
		TotalDevelopers:        devs,
		TotalClients:           clients,
		TotalActiveProjects:    activeProj,
		TotalCompletedProjects: completedProj,
		MonthlyRevenue:         revenue,
		ActiveSubscriptions:    subs,
		RecentActivities:       activities,
	}, nil
}
