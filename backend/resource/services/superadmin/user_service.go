package superadmin

import (
	"backend/resource/models"
	repo "backend/resource/repositories/superadmin"
)

type PaginatedUsersResponse struct {
	Data  []models.User `json:"data"`
	Total int64         `json:"total"`
	Page  int           `json:"page"`
	Limit int           `json:"limit"`
}

type UserService interface {
	GetUsers(page, limit int, search, role, status, sort string) (*PaginatedUsersResponse, error)
	GetUserByID(id uint) (*models.User, error)
	UpdateUserStatus(id uint, isActive bool) error
	UpdateUser(id uint, updates map[string]interface{}) error
}

type userService struct {
	repo repo.UserRepository
}

func NewUserService(repo repo.UserRepository) UserService {
	return &userService{repo}
}

func (s *userService) GetUsers(page, limit int, search, role, status, sort string) (*PaginatedUsersResponse, error) {
	users, total, err := s.repo.GetAll(page, limit, search, role, status, sort)
	if err != nil {
		return nil, err
	}

	return &PaginatedUsersResponse{
		Data:  users,
		Total: total,
		Page:  page,
		Limit: limit,
	}, nil
}

func (s *userService) GetUserByID(id uint) (*models.User, error) {
	return s.repo.GetByID(id)
}

func (s *userService) UpdateUserStatus(id uint, isActive bool) error {
	return s.repo.UpdateStatus(id, isActive)
}

func (s *userService) UpdateUser(id uint, updates map[string]interface{}) error {
	return s.repo.Update(id, updates)
}
