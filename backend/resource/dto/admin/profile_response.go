package admin

import "time"

type ProfileResponse struct {
	User   UserProfileResponse    `json:"user"`
	Agency *AgencyProfileResponse `json:"agency"`
}

type UserProfileResponse struct {
	ID           uint       `json:"id"`
	FullName     string     `json:"full_name"`
	Email        string     `json:"email"`
	Phone        string     `json:"phone"`
	ProfileImage string     `json:"profile_image"`
	Biography    string     `json:"biography"`
	Role         string     `json:"role"`
	IsActive     bool       `json:"is_active"`
	LastLogin    *time.Time `json:"last_login"`
}

type AgencyProfileResponse struct {
	ID                 uint   `json:"id"`
	AgencyName         string `json:"agency_name"`
	AgencySlug         string `json:"agency_slug"`
	OwnerName          string `json:"owner_name"`
	Contact            string `json:"contact"`
	Email              string `json:"email"`
	Description        string `json:"description"`
	Website            string `json:"website"`
	Location           string `json:"location"`
	ProfileImage       string `json:"profile_image"`
	Status             string `json:"status"`
	SubscriptionPlan   string `json:"subscription_plan"`
	SubscriptionStatus string `json:"subscription_status"`
}

type UpdateProfileRequest struct {
	FullName  string `json:"full_name"`
	Email     string `json:"email"`
	Phone     string `json:"phone"`
	Biography string `json:"biography"`

	AgencyName        string `json:"agency_name"`
	AgencySlug        string `json:"agency_slug"`
	AgencyContact     string `json:"contact"`
	AgencyEmail       string `json:"agency_email"`
	AgencyDescription string `json:"description"`
	AgencyWebsite     string `json:"website"`
	AgencyLocation    string `json:"location"`
}

type ChangePasswordRequest struct {
	CurrentPassword string `json:"current_password" binding:"required"`
	NewPassword     string `json:"new_password" binding:"required,min=6"`
	ConfirmPassword string `json:"confirm_password" binding:"required"`
}
