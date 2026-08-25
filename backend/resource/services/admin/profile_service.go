package admin

import (
	"errors"
	"strings"

	adminDTO "backend/resource/dto/admin"
	repository "backend/resource/repositories/admin"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type ProfileService struct {
	Repo *repository.ProfileRepository
}

func NewProfileService(repo *repository.ProfileRepository) *ProfileService {
	return &ProfileService{
		Repo: repo,
	}
}

func (s *ProfileService) GetProfile(userID uint) (*adminDTO.ProfileResponse, error) {

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
			Status:             string(user.Agency.Status),
			SubscriptionPlan:   string(user.Agency.SubscriptionPlan),
			SubscriptionStatus: string(user.Agency.SubscriptionStatus),
		}
	}

	return response, nil
}

func (s *ProfileService) UpdateProfile(userID uint, req adminDTO.UpdateProfileRequest) error {

	user, err := s.Repo.GetUserByID(userID)
	if err != nil {
		return err
	}

	req.FullName = strings.TrimSpace(req.FullName)
	req.Email = strings.TrimSpace(req.Email)

	if req.FullName == "" {
		return errors.New("full name is required")
	}

	if req.Email == "" {
		return errors.New("email is required")
	}

	// ==========================================
	// CHECK EMAIL USER
	// ==========================================

	if !strings.EqualFold(user.Email, req.Email) {

		existingUser, err := s.Repo.FindUserByEmail(
			req.Email,
			user.ID,
		)

		if err == nil && existingUser != nil {
			return errors.New("email already in use")
		}

		if err != nil && !errors.Is(err, gorm.ErrRecordNotFound) {
			return err
		}
	}

	// ==========================================
	// UPDATE USER
	// ==========================================

	userData := map[string]interface{}{
		"full_name": req.FullName,
		"email":     req.Email,
		"phone":     strings.TrimSpace(req.Phone),
		"biography": strings.TrimSpace(req.Biography),
	}

	if err := s.Repo.UpdateUser(user.ID, userData); err != nil {
		return err
	}

	// ==========================================
	// UPDATE AGENCY
	// ==========================================

	if user.AgencyID != nil {

		agency, err := s.Repo.GetUserByID(userID)
		if err != nil {
			return err
		}

		if agency.AgencyID != nil && agency.Agency.ID != 0 {

			currentAgency := agency.Agency

			agencySlug := strings.TrimSpace(req.AgencySlug)

			// Cek slug hanya jika user mengirim slug baru.
			if agencySlug != "" &&
				agencySlug != currentAgency.AgencySlug {

				existingAgency, err := s.Repo.FindAgencyBySlug(
					agencySlug,
					currentAgency.ID,
				)

				if err == nil && existingAgency != nil {
					return errors.New("agency slug already in use")
				}

				if err != nil &&
					!errors.Is(err, gorm.ErrRecordNotFound) {
					return err
				}
			}

			agencyData := map[string]interface{}{
				"agency_name": strings.TrimSpace(req.AgencyName),
				"agency_slug": agencySlug,
				"contact":     strings.TrimSpace(req.AgencyContact),
				"email":       strings.TrimSpace(req.AgencyEmail),
				"description": strings.TrimSpace(req.AgencyDescription),
				"website":     strings.TrimSpace(req.AgencyWebsite),
				"location":    strings.TrimSpace(req.AgencyLocation),
			}

			// Jangan overwrite slug dengan string kosong
			// kalau frontend tidak mengirimkannya.
			if agencySlug == "" {
				delete(agencyData, "agency_slug")
			}

			if err := s.Repo.UpdateAgency(
				currentAgency.ID,
				agencyData,
			); err != nil {
				return err
			}
		}
	}

	return nil
}

func (s *ProfileService) ChangePassword(userID uint, req adminDTO.ChangePasswordRequest) error {

	if req.NewPassword != req.ConfirmPassword {
		return errors.New("password confirmation does not match")
	}

	if len(req.NewPassword) < 6 {
		return errors.New("new password must be at least 6 characters")
	}

	user, err := s.Repo.GetUserByID(userID)
	if err != nil {
		return err
	}

	if err := bcrypt.CompareHashAndPassword(
		[]byte(user.Password),
		[]byte(req.CurrentPassword),
	); err != nil {
		return errors.New("current password is incorrect")
	}

	hashedPassword, err := bcrypt.GenerateFromPassword(
		[]byte(req.NewPassword),
		bcrypt.DefaultCost,
	)

	if err != nil {
		return err
	}

	return s.Repo.UpdateUser(
		userID,
		map[string]interface{}{
			"password": string(hashedPassword),
		},
	)
}
