package admin

import "time"

type ProjectRequestListResponse struct {
	ID            uint       `json:"id"`
	ClientID      uint       `json:"clientId"`
	ClientName    string     `json:"clientName"`
	ClientEmail   string     `json:"clientEmail"`
	ClientPhone   string     `json:"clientPhone"`
	ClientImage   string     `json:"clientImage"`
	Title         string     `json:"title"`
	Description   string     `json:"description"`
	Category      string     `json:"category"`
	BudgetMin     *float64   `json:"budgetMin,omitempty"`
	BudgetMax     *float64   `json:"budgetMax,omitempty"`
	Deadline      *time.Time `json:"deadline,omitempty"`
	AttachmentURL string     `json:"attachmentUrl,omitempty"`
	Status        string     `json:"status"`
	CreatedAt     time.Time  `json:"createdAt"`
	UpdatedAt     time.Time  `json:"updatedAt"`
}

type ProjectRequestDetailResponse struct {
	ID            uint       `json:"id"`
	ClientID      uint       `json:"clientId"`
	ClientName    string     `json:"clientName"`
	ClientEmail   string     `json:"clientEmail"`
	ClientPhone   string     `json:"clientPhone"`
	ClientImage   string     `json:"clientImage"`
	Title         string     `json:"title"`
	Description   string     `json:"description"`
	Category      string     `json:"category"`
	BudgetMin     *float64   `json:"budgetMin,omitempty"`
	BudgetMax     *float64   `json:"budgetMax,omitempty"`
	Deadline      *time.Time `json:"deadline,omitempty"`
	AttachmentURL string     `json:"attachmentUrl,omitempty"`
	Status        string     `json:"status"`
	CreatedAt     time.Time  `json:"createdAt"`
	UpdatedAt     time.Time  `json:"updatedAt"`
}

type ProjectRequestCountResponse struct {
	Count int64 `json:"count"`
}
