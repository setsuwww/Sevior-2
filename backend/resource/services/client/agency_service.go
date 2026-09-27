package client

import (
	clientModel "backend/resource/models"
	clientRepo "backend/resource/repositories/client"
)

type AgencyService struct {
	Repo *clientRepo.AgencyRepository
}

func (s *AgencyService) GetAgencies() ([]clientModel.Agency, error) {
	return s.Repo.GetAllAgencies()
}
