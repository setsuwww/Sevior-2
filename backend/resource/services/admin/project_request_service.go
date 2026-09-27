// backend/resource/services/admin/project_request_service.go

package admin

import (
	adminDTO "backend/resource/dto/admin"
	adminModel "backend/resource/models"
	adminRepo "backend/resource/repositories/admin"
	"errors"
)

type ProjectRequestService struct {
	Repo *adminRepo.ProjectRequestRepository
}

func (s *ProjectRequestService) GetProjectRequests(
	agencyID uint,
) ([]adminDTO.ProjectRequestListResponse, error) {
	requests, err := s.Repo.GetProjectRequests(agencyID)
	if err != nil {
		return nil, err
	}

	responses := make(
		[]adminDTO.ProjectRequestListResponse,
		0,
		len(requests),
	)

	for _, request := range requests {
		responses = append(
			responses,
			adminDTO.ProjectRequestListResponse{
				ID:            request.ID,
				ClientID:      valueOrZero(request.ClientID),
				ClientName:    request.Client.FullName,
				ClientEmail:   request.Client.Email,
				ClientPhone:   request.Client.Phone,
				ClientImage:   request.Client.ProfileImage,
				Title:         request.Title,
				Description:   request.Description,
				Category:      request.Category,
				BudgetMin:     request.BudgetMin,
				BudgetMax:     request.BudgetMax,
				Deadline:      request.Deadline,
				AttachmentURL: request.AttachmentURL,
				Status:        request.Status,
				CreatedAt:     request.CreatedAt,
				UpdatedAt:     request.UpdatedAt,
			},
		)
	}

	return responses, nil
}

func (s *ProjectRequestService) GetProjectRequestByID(
	agencyID uint,
	requestID uint,
) (*adminDTO.ProjectRequestDetailResponse, error) {
	request, err := s.Repo.GetProjectRequestByID(
		agencyID,
		requestID,
	)
	if err != nil {
		return nil, err
	}

	return &adminDTO.ProjectRequestDetailResponse{
		ID:            request.ID,
		ClientID:      valueOrZero(request.ClientID),
		ClientName:    request.Client.FullName,
		ClientEmail:   request.Client.Email,
		ClientPhone:   request.Client.Phone,
		ClientImage:   request.Client.ProfileImage,
		Title:         request.Title,
		Description:   request.Description,
		Category:      request.Category,
		BudgetMin:     request.BudgetMin,
		BudgetMax:     request.BudgetMax,
		Deadline:      request.Deadline,
		AttachmentURL: request.AttachmentURL,
		Status:        request.Status,
		CreatedAt:     request.CreatedAt,
		UpdatedAt:     request.UpdatedAt,
	}, nil
}

func (s *ProjectRequestService) ApproveProjectRequest(
	agencyID uint,
	requestID uint,
) error {
	request, err := s.Repo.GetProjectRequestByID(
		agencyID,
		requestID,
	)
	if err != nil {
		return err
	}

	if request.Status != adminModel.ProjectRequestPending {
		return errors.New("project request is not pending")
	}

	if request.AgencyID == nil || request.ClientID == nil {
		return errors.New("invalid project request")
	}

	project := &adminModel.Project{
		ProjectRequestID: &request.ID,
		AgencyID:         request.AgencyID,
		ClientID:         request.ClientID,
		Title:            request.Title,
		Description:      request.Description,
		Budget:           request.BudgetMax,
		Status:           "PENDING",
	}

	return s.Repo.ApproveProjectRequest(
		agencyID,
		requestID,
		project,
	)
}

func (s *ProjectRequestService) RejectProjectRequest(
	agencyID uint,
	requestID uint,
) error {
	request, err := s.Repo.GetProjectRequestByID(
		agencyID,
		requestID,
	)
	if err != nil {
		return err
	}

	if request.Status != adminModel.ProjectRequestPending {
		return errors.New("project request is not pending")
	}

	return s.Repo.RejectProjectRequest(
		agencyID,
		requestID,
	)
}

func (s *ProjectRequestService) GetPendingProjectRequestCount(
	agencyID uint,
) (*adminDTO.ProjectRequestCountResponse, error) {
	count, err := s.Repo.GetPendingProjectRequestCount(
		agencyID,
	)
	if err != nil {
		return nil, err
	}

	return &adminDTO.ProjectRequestCountResponse{
		Count: count,
	}, nil
}

func valueOrZero(value *uint) uint {
	if value == nil {
		return 0
	}

	return *value
}
