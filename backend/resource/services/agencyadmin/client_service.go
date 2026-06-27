package agencyadmin

import (
	"backend/resource/models"
	"backend/resource/repositories/agencyadmin"
)

type ClientService struct {
	Repo *agencyadmin.ClientRepository
}

func (s *ClientService) GetClients(agencyID uint, search, sort string, page, limit int) ([]models.User, int64, error) {
	if page < 1 {
		page = 1
	}
	if limit < 1 || limit > 100 {
		limit = 10
	}
	offset := (page - 1) * limit

	return s.Repo.GetClients(agencyID, search, sort, offset, limit)
}

func (s *ClientService) GetClientByID(agencyID, clientID uint) (*models.User, error) {
	return s.Repo.GetClientByID(agencyID, clientID)
}
