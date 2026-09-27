package client

import "time"

type CreateProjectRequest struct {
	AgencyID      uint     `json:"agencyId" binding:"required"`
	Title         string   `json:"title" binding:"required,min=3,max=255"`
	Description   string   `json:"description" binding:"required"`
	Category      string   `json:"category"`
	BudgetMin     *float64 `json:"budgetMin"`
	BudgetMax     *float64 `json:"budgetMax"`
	Deadline      *string  `json:"deadline"`
	AttachmentURL string   `json:"attachmentUrl"`
}

type ProjectRequestResponse struct {
	ID            uint      `json:"id"`
	AgencyID      uint      `json:"agencyId"`
	ClientID      uint      `json:"clientId"`
	Title         string    `json:"title"`
	Description   string    `json:"description"`
	Category      string    `json:"category"`
	BudgetMin     *float64  `json:"budgetMin,omitempty"`
	BudgetMax     *float64  `json:"budgetMax,omitempty"`
	Deadline      *string   `json:"deadline"`
	AttachmentURL string    `json:"attachmentUrl,omitempty"`
	Status        string    `json:"status"`
	CreatedAt     time.Time `json:"createdAt"`
}

type ProjectResponse struct {
	ID               uint      `json:"id"`
	ProjectRequestID *uint     `json:"projectRequestId,omitempty"`
	AgencyID         uint      `json:"agencyId"`
	ClientID         uint      `json:"clientId"`
	Title            string    `json:"title"`
	Description      string    `json:"description"`
	Budget           *float64  `json:"budget,omitempty"`
	Progress         *int      `json:"progress,omitempty"`
	CurrentPhase     string    `json:"currentPhase"`
	StartDate        *string   `json:"startDate,omitempty"`
	EndDate          *string   `json:"endDate,omitempty"`
	Status           string    `json:"status"`
	CreatedAt        time.Time `json:"createdAt"`
	UpdatedAt        time.Time `json:"updatedAt"`
}

type AgencyPagination struct {
	Page       int   `json:"page"`
	Limit      int   `json:"limit"`
	Total      int64 `json:"total"`
	TotalPages int   `json:"totalPages"`
	HasNext    bool  `json:"hasNext"`
}

type AgencyListResponse struct {
	ID               uint   `json:"id"`
	AgencyName       string `json:"agencyName"`
	AgencySlug       string `json:"agencySlug"`
	Description      string `json:"description"`
	Location         string `json:"location"`
	ProfileImage     string `json:"profileImage"`
	SubscriptionPlan string `json:"subscriptionPlan"`
}

type AgencyDetailResponse struct {
	Data       []AgencyListResponse `json:"data"`
	Pagination AgencyPagination     `json:"pagination"`
}
