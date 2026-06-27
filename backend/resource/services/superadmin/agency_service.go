package superadmin

import (
	"backend/resource/models"
	repo "backend/resource/repositories/superadmin"
)

type PaginatedAgenciesResponse struct {
	Data  []models.Agency `json:"data"`
	Total int64           `json:"total"`
	Page  int             `json:"page"`
	Limit int             `json:"limit"`
}

type AgencyService interface {
	GetAgencies(page, limit int, search, subscriptionFilter, sort string) (*PaginatedAgenciesResponse, error)
	GetAgencyByID(id uint) (*models.Agency, error)
	UpdateAgencyStatus(id uint, isActive bool) error
	DeleteAgency(id uint) error
}

type agencyService struct {
	repo repo.AgencyRepository
}

func NewAgencyService(repo repo.AgencyRepository) AgencyService {
	return &agencyService{repo}
}

func (s *agencyService) GetAgencies(page, limit int, search, subscriptionFilter, sort string) (*PaginatedAgenciesResponse, error) {
	agencies, total, err := s.repo.GetAll(page, limit, search, subscriptionFilter, sort)
	if err != nil {
		return nil, err
	}

	return &PaginatedAgenciesResponse{
		Data:  agencies,
		Total: total,
		Page:  page,
		Limit: limit,
	}, nil
}

func (s *agencyService) GetAgencyByID(id uint) (*models.Agency, error) {
	return s.repo.GetByID(id)
}

func (s *agencyService) UpdateAgencyStatus(id uint, isActive bool) error {
	return s.repo.UpdateStatus(id, isActive)
}

func (s *agencyService) DeleteAgency(id uint) error {
	return s.repo.Delete(id)
}
