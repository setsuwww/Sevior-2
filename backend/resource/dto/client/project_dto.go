package client

import "time"

type CreateProjectRequest struct {
	AgencyID      uint       `json:"agencyId" binding:"required"`
	Title         string     `json:"title" binding:"required,min=3,max=255"`
	Description   string     `json:"description" binding:"required"`
	Category      string     `json:"category"`
	BudgetMin     *float64   `json:"budgetMin"`
	BudgetMax     *float64   `json:"budgetMax"`
	Deadline      *time.Time `json:"deadline"`
	AttachmentURL string     `json:"attachmentUrl"`
}

type ProjectRequestResponse struct {
	ID            uint       `json:"id"`
	AgencyID      uint       `json:"agencyId"`
	ClientID      uint       `json:"clientId"`
	Title         string     `json:"title"`
	Description   string     `json:"description"`
	Category      string     `json:"category"`
	BudgetMin     *float64   `json:"budgetMin,omitempty"`
	BudgetMax     *float64   `json:"budgetMax,omitempty"`
	Deadline      *time.Time `json:"deadline,omitempty"`
	AttachmentURL string     `json:"attachmentUrl,omitempty"`
	Status        string     `json:"status"`
	CreatedAt     time.Time  `json:"createdAt"`
}
