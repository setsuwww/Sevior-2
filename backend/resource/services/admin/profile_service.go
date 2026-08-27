package admin

import (
	"errors"
	"fmt"
	"mime/multipart"
	"os"
	"path/filepath"
	"strings"
	"time"

	adminDTO "backend/resource/dto/admin"
	adminModel "backend/resource/models"
	adminRepo "backend/resource/repositories/admin"

	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type ProfileService struct {
	Repo *adminRepo.ProfileRepository
}

func NewProfileService(repo *adminRepo.ProfileRepository) *ProfileService {
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
			ProfileTheme: user.ProfileTheme,
			IsActive:     user.IsActive != nil && *user.IsActive,
			LastLogin:    user.LastLogin,
		},

		Agency: nil,
	}

	if user.AgencyID != nil && user.Agency.ID != 0 {
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

	if !strings.EqualFold(user.Email, req.Email) {

		existingUser, err := s.Repo.FindUserByEmail(
			req.Email,
			user.ID,
		)

		if err == nil && existingUser != nil {
			return errors.New("email already in use")
		}

		if err != nil &&
			!errors.Is(err, gorm.ErrRecordNotFound) {
			return err
		}
	}

	var agencyID uint

	if user.AgencyID != nil && user.Agency.ID != 0 {
		currentAgency := user.Agency

		agencySlug := strings.TrimSpace(req.AgencySlug)

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
			"contact":     strings.TrimSpace(req.AgencyContact),
			"email":       strings.TrimSpace(req.AgencyEmail),
			"description": strings.TrimSpace(req.AgencyDescription),
			"website":     strings.TrimSpace(req.AgencyWebsite),
			"location":    strings.TrimSpace(req.AgencyLocation),
		}

		if agencySlug != "" {
			agencyData["agency_slug"] = agencySlug
		}

		if err := s.Repo.UpdateAgency(
			currentAgency.ID,
			agencyData,
		); err != nil {
			return err
		}
	}

	// ======================================================
	// USER DATA
	// ======================================================

	userData := map[string]interface{}{
		"full_name": strings.TrimSpace(req.FullName),
		"email":     strings.TrimSpace(req.Email),
		"phone":     strings.TrimSpace(req.Phone),
		"biography": strings.TrimSpace(req.Biography),
	}

	// ======================================================
	// TRANSACTION
	// ======================================================

	err = s.Repo.DB.Transaction(func(tx *gorm.DB) error {

		userResult := tx.
			Model(&adminModel.User{}).
			Where("id = ?", userID).
			Updates(userData)

		if userResult.Error != nil {
			return userResult.Error
		}

		// ==================================================
		// AGENCY
		// ==================================================

		if agencyID != 0 {

			agencyData := map[string]interface{}{
				"agency_name": strings.TrimSpace(req.AgencyName),
				"contact":     strings.TrimSpace(req.AgencyContact),
				"email":       strings.TrimSpace(req.AgencyEmail),
				"description": strings.TrimSpace(req.AgencyDescription),
				"website":     strings.TrimSpace(req.AgencyWebsite),
				"location":    strings.TrimSpace(req.AgencyLocation),
			}

			agencySlug := strings.TrimSpace(req.AgencySlug)

			if agencySlug != "" {
				agencyData["agency_slug"] = agencySlug
			}

			agencyResult := tx.
				Model(&adminModel.Agency{}).
				Where("id = ?", agencyID).
				Updates(agencyData)

			if agencyResult.Error != nil {
				return agencyResult.Error
			}
		}

		return nil
	})

	if err != nil {
		return err
	}

	return nil
}

func (s *ProfileService) ChangePassword(userID uint, req adminDTO.ChangePasswordRequest) error {

	if req.NewPassword != req.ConfirmPassword {
		return errors.New(
			"password confirmation does not match",
		)
	}

	if len(req.NewPassword) < 6 {
		return errors.New(
			"new password must be at least 6 characters",
		)
	}

	user, err := s.Repo.GetUserByID(userID)
	if err != nil {
		return err
	}

	if err := bcrypt.CompareHashAndPassword(
		[]byte(user.Password),
		[]byte(req.CurrentPassword),
	); err != nil {
		return errors.New(
			"current password is incorrect",
		)
	}

	hashedPassword, err :=
		bcrypt.GenerateFromPassword(
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

func (s *ProfileService) UploadUserProfileImage(userID uint, file *multipart.FileHeader) (string, error) {

	if file == nil {
		return "", errors.New("profile image is required")
	}

	if file.Size > 5*1024*1024 {
		return "", errors.New(
			"profile image must be less than 5MB",
		)
	}

	extension := strings.ToLower(
		filepath.Ext(file.Filename),
	)

	allowedExtensions := map[string]bool{
		".jpg":  true,
		".jpeg": true,
		".png":  true,
		".webp": true,
	}

	if !allowedExtensions[extension] {
		return "", errors.New(
			"only JPG, JPEG, PNG, and WEBP images are allowed",
		)
	}

	user, err := s.Repo.GetUserByID(userID)
	if err != nil {
		return "", err
	}

	uploadDir := "./uploads/users"

	if err := os.MkdirAll(uploadDir, 0755); err != nil {
		return "", err
	}

	filename := fmt.Sprintf(
		"user_%d_%s%s",
		user.ID,
		uuid.New().String(),
		extension,
	)

	filePath := filepath.Join(
		uploadDir,
		filename,
	)

	if err := saveUploadedFile(file, filePath); err != nil {
		return "", err
	}

	imageURL := fmt.Sprintf(
		"/uploads/users/%s",
		filename,
	)

	if err := s.Repo.UpdateUser(
		user.ID,
		map[string]interface{}{
			"profile_image": imageURL,
		},
	); err != nil {

		_ = os.Remove(filePath)

		return "", err
	}

	return imageURL, nil
}

func (s *ProfileService) UploadAgencyProfileImage(userID uint, file *multipart.FileHeader) (string, error) {

	if file == nil {
		return "", errors.New("agency image is required")
	}

	if file.Size > 5*1024*1024 {
		return "", errors.New(
			"agency image must be less than 5MB",
		)
	}

	extension := strings.ToLower(
		filepath.Ext(file.Filename),
	)

	allowedExtensions := map[string]bool{
		".jpg":  true,
		".jpeg": true,
		".png":  true,
		".webp": true,
	}

	if !allowedExtensions[extension] {
		return "", errors.New(
			"only JPG, JPEG, PNG, and WEBP images are allowed",
		)
	}

	user, err := s.Repo.GetUserByID(userID)
	if err != nil {
		return "", err
	}

	if user.AgencyID == nil || user.Agency.ID == 0 {
		return "", errors.New("agency not found")
	}

	uploadDir := "./uploads/agencies"

	if err := os.MkdirAll(uploadDir, 0755); err != nil {
		return "", err
	}

	filename := fmt.Sprintf(
		"agency_%d_%s%s",
		user.Agency.ID,
		uuid.New().String(),
		extension,
	)

	filePath := filepath.Join(
		uploadDir,
		filename,
	)

	if err := saveUploadedFile(file, filePath); err != nil {
		return "", err
	}

	imageURL := fmt.Sprintf(
		"/uploads/agencies/%s",
		filename,
	)

	if err := s.Repo.UpdateAgency(
		user.Agency.ID,
		map[string]interface{}{
			"profile_image": imageURL,
		},
	); err != nil {

		// DB gagal → hapus file yang sudah di-upload
		_ = os.Remove(filePath)

		return "", err
	}

	return imageURL, nil
}

func saveUploadedFile(file *multipart.FileHeader, destination string) error {
	src, err := file.Open()
	if err != nil {
		return err
	}

	defer src.Close()

	dst, err := os.Create(destination)
	if err != nil {
		return err
	}

	defer dst.Close()

	buffer := make([]byte, 32*1024)

	for {
		n, readErr := src.Read(buffer)

		if n > 0 {
			if _, err := dst.Write(buffer[:n]); err != nil {
				return err
			}
		}

		if readErr != nil {
			if readErr.Error() == "EOF" {
				break
			}

			return readErr
		}
	}

	return nil
}

func (s *ProfileService) DeleteAccount(userID uint) error {
	return s.Repo.DeleteUser(userID)
}

var _ = time.Now
