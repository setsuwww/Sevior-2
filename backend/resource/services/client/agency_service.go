package client

import (
	clientRepository "backend/resource/repositories/client"

	"backend/resource/models"
)

type AgencyService struct {
	Repo *clientRepository.AgencyRepository
}

func (s *AgencyService) GetAgencies() ([]models.Agency, error) {
	return s.Repo.GetAllAgencies()
}
