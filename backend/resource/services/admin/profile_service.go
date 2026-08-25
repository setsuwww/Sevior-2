package admin

import (
	"backend/resource/models"
	"backend/resource/repositories/admin"
)

type ProfileService struct {
	Repo *admin.ProfileRepository
}

func (s *ProfileService) GetUserProfile(userID uint) (*models.User, error) {
	return s.Repo.GetUserProfile(userID)
}
