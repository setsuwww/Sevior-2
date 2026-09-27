package client

import (
	"errors"
	"time"

	clientDTO "backend/resource/dto/client"
	clientModel "backend/resource/models"
	clientRepo "backend/resource/repositories/client"

	"gorm.io/gorm"
)

type ProjectService struct {
	Repo *clientRepo.ProjectRepository
}

func (s *ProjectService) CreateProjectRequest(clientID uint, input clientDTO.CreateProjectRequest) (*clientModel.ProjectRequest, error) {

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

	if input.BudgetMin != nil &&
		input.BudgetMax != nil &&
		*input.BudgetMin > *input.BudgetMax {
		return nil, errors.New(
			"minimum budget cannot be greater than maximum budget",
		)
	}

	var deadline *time.Time

	if input.Deadline != nil && *input.Deadline != "" {
		parsedDeadline, err := time.Parse(
			"2006-01-02",
			*input.Deadline,
		)

		if err != nil {
			return nil, errors.New("invalid deadline format")
		}

		deadline = &parsedDeadline
	}

	projectRequest := &clientModel.ProjectRequest{
		AgencyID:      &input.AgencyID,
		ClientID:      &clientID,
		Title:         input.Title,
		Description:   input.Description,
		Category:      input.Category,
		BudgetMin:     input.BudgetMin,
		BudgetMax:     input.BudgetMax,
		Deadline:      deadline,
		AttachmentURL: input.AttachmentURL,
		Status:        clientModel.ProjectRequestPending,
	}

	if err := s.Repo.CreateRequestProject(projectRequest); err != nil {
		return nil, err
	}

	return projectRequest, nil
}

func (s *ProjectService) GetMyProjectRequests(clientID uint, view string) ([]clientModel.ProjectRequest, error) {
	var statuses []string

	switch view {
	case "", "pending":
		statuses = []string{
			clientModel.ProjectRequestPending,
		}

	case "history":
		statuses = []string{
			clientModel.ProjectRequestApproved,
			clientModel.ProjectRequestRejected,
			clientModel.ProjectRequestCancelled,
		}

	default:
		return nil, errors.New("invalid project request view")
	}

	return s.Repo.FindProjectRequests(clientID, statuses)
}

func (s *ProjectService) GetMyProjects(clientID uint) ([]clientModel.Project, error) {
	return s.Repo.FindProjects(clientID)
}
