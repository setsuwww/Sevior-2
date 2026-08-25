package admin

import (
	"errors"

	"backend/resource/models"
	"backend/resource/repositories/admin"
)

type ProfileService struct {
	Repo *admin.ProfileRepository
}

type UpdateProfileRequest struct {
	FullName     string `json:"full_name"`
	Phone        string `json:"phone"`
	ProfileImage string `json:"profile_image"`
	Biography    string `json:"biography"`

	AgencyName  string `json:"agency_name"`
	AgencySlug  string `json:"agency_slug"`
	Contact     string `json:"contact"`
	Description string `json:"description"`
	Website     string `json:"website"`
	Location    string `json:"location"`
	AgencyImage string `json:"agency_profile_image"`
}

func (s *ProfileService) GetProfile(userID uint) (*models.User, error) {
	return s.Repo.GetUserByID(userID)
}

func (s *ProfileService) UpdateProfile(userID uint, req UpdateProfileRequest) error {

	user, err := s.Repo.GetUserByID(userID)
	if err != nil {
		return err
	}

	userData := map[string]interface{}{
		"full_name":     req.FullName,
		"phone":         req.Phone,
		"profile_image": req.ProfileImage,
		"biography":     req.Biography,
	}

	if err := s.Repo.UpdateUser(userID, userData); err != nil {
		return err
	}

	if user.AgencyID == nil {
		return nil
	}

	agencyData := map[string]interface{}{
		"agency_name":   req.AgencyName,
		"agency_slug":   req.AgencySlug,
		"contact":       req.Contact,
		"description":   req.Description,
		"website":       req.Website,
		"location":      req.Location,
		"profile_image": req.AgencyImage,
	}

	if err := s.Repo.UpdateAgency(*user.AgencyID, agencyData); err != nil {
		return err
	}

	return nil
}

var ErrUnauthorized = errors.New("unauthorized")
