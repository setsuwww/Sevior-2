package admin

import "time"

type DeveloperResponse struct {
	ID           uint       `json:"id"`
	AgencyID     *uint      `json:"agency_id"`
	FullName     string     `json:"full_name"`
	Email        string     `json:"email"`
	Phone        string     `json:"phone"`
	ProfileImage string     `json:"profile_image"`
	Biography    string     `json:"biography"`
	Role         string     `json:"role"`
	IsActive     bool       `json:"is_active"`
	LastLogin    *time.Time `json:"last_login"`
	CreatedAt    time.Time  `json:"created_at"`
	UpdatedAt    time.Time  `json:"updated_at"`
}

type DevelopersResponse struct {
	Developers []DeveloperResponse `json:"developers"`
}

type CreateDeveloperRequest struct {
	FullName  string `json:"full_name" binding:"required"`
	Email     string `json:"email" binding:"required,email"`
	Phone     string `json:"phone"`
	Biography string `json:"biography"`
}

type UpdateDeveloperRequest struct {
	FullName  string `json:"full_name" binding:"required"`
	Email     string `json:"email" binding:"required,email"`
	Phone     string `json:"phone"`
	Biography string `json:"biography"`
	IsActive  *bool  `json:"is_active"`
}
