package services

import (
	"errors"
	"time"

	"backend/resource/dto/auth"
	"backend/resource/models"
	"backend/resource/utils"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type AuthService struct {
	db *gorm.DB
}

func NewAuthService(db *gorm.DB) *AuthService {
	return &AuthService{
		db: db,
	}
}

func getSubscriptionPrice(plan models.SubscriptionPlan) (float64, error) {

	switch plan {

	case models.SubscriptionPlanFree:
		return 0, nil

	case models.SubscriptionPlanPro:
		return 49, nil

	case models.SubscriptionPlanExecutive:
		return 199, nil

	default:
		return 0, errors.New("invalid subscription plan")
	}
}

func (s *AuthService) Login(email, password string) (*models.User, error) {
	var user models.User
	if err := s.db.Where("email = ?", email).First(&user).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, errors.New("invalid email or password")
		}
		return nil, err
	}

	if !utils.CheckPassword(user.Password, password) {
		return nil, errors.New("invalid email or password")
	}

	if user.IsActive != nil && !*user.IsActive {
		return nil, errors.New("your account has been suspended")
	}

	// Update last login
	now := time.Now()
	user.LastLogin = &now
	s.db.Save(&user)

	return &user, nil
}

func (s *AuthService) RegisterAgencyOwner(input auth.RegisterAgencyRequest) (*models.User, error) {

	var count int64

	if err := s.db.
		Model(&models.User{}).
		Where("email = ?", input.Email).
		Count(&count).Error; err != nil {
		return nil, err
	}

	if count > 0 {
		return nil, errors.New("email already in use")
	}

	hashedPassword := utils.HashPassword(input.Password)
	isActive := true

	var user models.User

	err := s.db.Transaction(func(tx *gorm.DB) error {
		agency := models.Agency{
			AgencyName:         input.AgencyName,
			AgencySlug:         input.AgencySlug,
			OwnerName:          input.FullName,
			Email:              input.Email,
			Description:        input.AgencyDescription,
			Website:            input.Website,
			SubscriptionPlan:   models.SubscriptionPlan(input.SubscriptionPlan),
			Status:             models.AgencyStatusActive,
			SubscriptionStatus: models.SubscriptionStatusActive,
		}

		if err := tx.Create(&agency).Error; err != nil {
			return err
		}
		user = models.User{
			AgencyID: &agency.ID,
			FullName: input.FullName,
			Email:    input.Email,
			Password: hashedPassword,
			Role:     models.RoleAdmin,
			IsActive: &isActive,
		}

		if err := tx.Create(&user).Error; err != nil {
			return err
		}
		plan := models.SubscriptionPlan(input.SubscriptionPlan)

		price, err := getSubscriptionPrice(plan)
		if err != nil {
			return err
		}

		now := time.Now()

		subscription := models.Subscription{
			AgencyID:  agency.ID,
			Plan:      plan,
			Price:     price,
			Status:    models.SubscriptionStatusActive,
			StartDate: now,
			EndDate:   now.AddDate(0, 1, 0),
		}

		if err := tx.Create(&subscription).Error; err != nil {
			return err
		}

		return nil
	})

	if err != nil {
		return nil, err
	}

	return &user, nil
}

func (s *AuthService) RegisterClient(fullName, email, password string) (*models.User, error) {
	var count int64
	s.db.Model(&models.User{}).Where("email = ?", email).Count(&count)
	if count > 0 {
		return nil, errors.New("email already in use")
	}

	hashedPassword := utils.HashPassword(password)
	isActive := true

	user := models.User{
		FullName: fullName,
		Email:    email,
		Password: hashedPassword,
		Role:     models.RoleClient,
		IsActive: &isActive,
	}

	if err := s.db.Create(&user).Error; err != nil {
		return nil, err
	}

	return &user, nil
}

func (s *AuthService) StoreRefreshToken(userID uint, tokenStr string) error {
	token := models.RefreshToken{
		UserID:    userID,
		Token:     tokenStr,
		ExpiresAt: time.Now().Add(time.Hour * 24 * 7),
	}
	return s.db.Create(&token).Error
}

func (s *AuthService) DeleteRefreshToken(tokenStr string) error {
	return s.db.Where("token = ?", tokenStr).Delete(&models.RefreshToken{}).Error
}

func (s *AuthService) GeneratePasswordResetToken(email string) (string, error) {
	var user models.User
	if err := s.db.Where("email = ?", email).First(&user).Error; err != nil {
		return "", errors.New("account not found")
	}

	token := uuid.New().String()
	resetToken := models.PasswordResetToken{
		UserID:    user.ID,
		Token:     token,
		ExpiresAt: time.Now().Add(time.Minute * 30),
	}

	if err := s.db.Create(&resetToken).Error; err != nil {
		return "", err
	}

	return token, nil
}

func (s *AuthService) ResetPassword(tokenStr, newPassword string) error {
	var token models.PasswordResetToken
	if err := s.db.Where("token = ? AND expires_at > ?", tokenStr, time.Now()).First(&token).Error; err != nil {
		return errors.New("invalid or expired reset token")
	}

	hashedPassword := utils.HashPassword(newPassword)

	err := s.db.Transaction(func(tx *gorm.DB) error {
		if err := tx.Model(&models.User{}).Where("id = ?", token.UserID).Update("password", hashedPassword).Error; err != nil {
			return err
		}
		if err := tx.Where("user_id = ?", token.UserID).Delete(&models.PasswordResetToken{}).Error; err != nil {
			return err
		}
		// Also invalidate all sessions when password changes
		if err := tx.Where("user_id = ?", token.UserID).Delete(&models.RefreshToken{}).Error; err != nil {
			return err
		}
		return nil
	})

	return err
}
