package admin

import "time"

type ProjectResponse struct {
	ID               uint       `json:"id"`
	AgencyID         uint       `json:"agencyId"`
	ProjectRequestID *uint      `json:"projectRequestId,omitempty"`
	ClientID         *uint      `json:"clientId,omitempty"`
	Title            string     `json:"title"`
	Description      string     `json:"description"`
	Budget           *float64   `json:"budget,omitempty"`
	Progress         *int       `json:"progress,omitempty"`
	CurrentPhase     string     `json:"currentPhase"`
	StartDate        *time.Time `json:"startDate,omitempty"`
	EndDate          *time.Time `json:"endDate,omitempty"`
	Status           string     `json:"status"`
	CreatedAt        time.Time  `json:"createdAt"`
	UpdatedAt        time.Time  `json:"updatedAt"`
}

type ProjectDeveloperResponse struct {
	ID           uint       `json:"id"`
	FullName     string     `json:"fullName"`
	Email        string     `json:"email"`
	Phone        string     `json:"phone"`
	ProfileImage string     `json:"profileImage"`
	Biography    string     `json:"biography"`
	IsActive     *bool      `json:"isActive,omitempty"`
	AssignedAt   *time.Time `json:"assignedAt,omitempty"`
}

type AssignDeveloperRequest struct {
	DeveloperID uint `json:"developerId" binding:"required"`
}

type ProjectListResponse struct {
	Data       []ProjectResponse `json:"data"`
	Total      int64             `json:"total"`
}

type ProjectDetailResponse struct {
	Project    ProjectResponse           `json:"project"`
	Developers []ProjectDeveloperResponse `json:"developers"`
}
