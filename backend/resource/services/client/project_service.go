package client

import (
	"errors"

	clientDTO "backend/resource/dto/client"
	clientModel "backend/resource/models"
	clientRepo "backend/resource/repositories/client"

	"gorm.io/gorm"
)

type ProjectService struct {
	Repo *clientRepo.ProjectRepository
	DB   *gorm.DB
}

func (s *ProjectService) CreateProjectRequest(
	clientID uint,
	input clientDTO.CreateProjectRequest,
) (*clientModel.ProjectRequest, error) {

	// Pastikan agency memang ada
	agency, err := s.Repo.FindAgency(input.AgencyID)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, errors.New("agency not found")
		}

		return nil, err
	}

	if agency.ID == 0 {
		return nil, errors.New("agency not found")
	}

	// Validasi budget
	if input.BudgetMin != nil &&
		input.BudgetMax != nil &&
		*input.BudgetMin > *input.BudgetMax {
		return nil, errors.New(
			"minimum budget cannot be greater than maximum budget",
		)
	}

	projectRequest := &clientModel.ProjectRequest{
		AgencyID:      &input.AgencyID,
		ClientID:      &clientID,
		Title:         input.Title,
		Description:   input.Description,
		Category:      input.Category,
		BudgetMin:     input.BudgetMin,
		BudgetMax:     input.BudgetMax,
		Deadline:      input.Deadline,
		AttachmentURL: input.AttachmentURL,
		Status:        clientModel.ProjectRequestPending,
	}

	if err := s.Repo.CreateRequestProject(projectRequest); err != nil {
		return nil, err
	}

	return projectRequest, nil
}
