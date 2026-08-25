package admin

import (
	adminDTO "backend/resource/dto/admin"
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

func (s *ProfileService) GetProfile(
	userID uint,
) (*adminDTO.ProfileResponse, error) {

	user, err := s.Repo.GetUserByID(userID)

	if err != nil {
		return nil, err
	}

	response := &adminDTO.ProfileResponse{
		User: adminDTO.UserProfileResponse{
			ID:           user.ID,
			FullName:     user.FullName,
			Email:        user.Email,
			Phone:        user.Phone,
			ProfileImage: user.ProfileImage,
			Biography:    user.Biography,
			Role:         user.Role,
			IsActive:     user.IsActive != nil && *user.IsActive,
			LastLogin:    user.LastLogin,
		},

		Agency: nil,
	}

	if user.AgencyID != nil {
		response.Agency = &adminDTO.AgencyProfileResponse{
			ID:                 user.Agency.ID,
			AgencyName:         user.Agency.AgencyName,
			AgencySlug:         user.Agency.AgencySlug,
			OwnerName:          user.Agency.OwnerName,
			Contact:            user.Agency.Contact,
			Email:              user.Agency.Email,
			Description:        user.Agency.Description,
			Website:            user.Agency.Website,
			Location:           user.Agency.Location,
			ProfileImage:       user.Agency.ProfileImage,
			Status:             user.Agency.Status,
			SubscriptionPlan:   user.Agency.SubscriptionPlan,
			SubscriptionStatus: user.Agency.SubscriptionStatus,
		}
	}

	return response, nil
}

func (s *ProfileService) UpdateProfile(
	userID uint,
	req UpdateProfileRequest,
) error {

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

	if err := s.Repo.UpdateAgency(
		*user.AgencyID,
		agencyData,
	); err != nil {
		return err
	}

	return nil
}
