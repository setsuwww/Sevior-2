package auth

type RegisterAgencyRequest struct {
	FullName          string `json:"full_name" binding:"required"`
	Email             string `json:"email" binding:"required,email"`
	Password          string `json:"password" binding:"required,min=6"`
	AgencyName        string `json:"agency_name" binding:"required"`
	AgencySlug        string `json:"agency_slug"`
	AgencyDescription string `json:"agency_description"`
	Website           string `json:"website"`
	SubscriptionPlan  string `json:"subscription_plan"`
}

type RegisterAgencyResponse struct {
	User         UserResponse `json:"user"`
	AccessToken  string       `json:"accessToken"`
	RefreshToken string       `json:"refreshToken"`
}
