// backend/resource/repositories/admin/project_request_repository.go

package admin

import (
	adminModel "backend/resource/models"

	"gorm.io/gorm"
)

type ProjectRequestRepository struct {
	DB *gorm.DB
}

func (r *ProjectRequestRepository) GetProjectRequests(
	agencyID uint,
) ([]adminModel.ProjectRequest, error) {
	var requests []adminModel.ProjectRequest

	err := r.DB.
		Where("agency_id = ?", agencyID).
		Preload("Client").
		Order("created_at DESC").
		Find(&requests).Error

	if err != nil {
		return nil, err
	}

	return requests, nil
}

func (r *ProjectRequestRepository) GetProjectRequestByID(
	agencyID uint,
	requestID uint,
) (*adminModel.ProjectRequest, error) {
	var request adminModel.ProjectRequest

	err := r.DB.
		Where("id = ?", requestID).
		Where("agency_id = ?", agencyID).
		Preload("Client").
		Preload("Agency").
		First(&request).Error

	if err != nil {
		return nil, err
	}

	return &request, nil
}

func (r *ProjectRequestRepository) ApproveProjectRequest(
	agencyID uint,
	requestID uint,
	project *adminModel.Project,
) error {
	return r.DB.Transaction(func(tx *gorm.DB) error {
		var request adminModel.ProjectRequest

		if err := tx.
			Where("id = ?", requestID).
			Where("agency_id = ?", agencyID).
			Where("status = ?", adminModel.ProjectRequestPending).
			First(&request).Error; err != nil {
			return err
		}

		project.ProjectRequestID = &request.ID

		if err := tx.Create(project).Error; err != nil {
			return err
		}

		if err := tx.
			Model(&request).
			Update("status", adminModel.ProjectRequestApproved).Error; err != nil {
			return err
		}

		return nil
	})
}

func (r *ProjectRequestRepository) RejectProjectRequest(
	agencyID uint,
	requestID uint,
) error {
	result := r.DB.
		Model(&adminModel.ProjectRequest{}).
		Where("id = ?", requestID).
		Where("agency_id = ?", agencyID).
		Where("status = ?", adminModel.ProjectRequestPending).
		Update("status", adminModel.ProjectRequestRejected)

	if result.Error != nil {
		return result.Error
	}

	if result.RowsAffected == 0 {
		return gorm.ErrRecordNotFound
	}

	return nil
}

func (r *ProjectRequestRepository) GetPendingProjectRequestCount(
	agencyID uint,
) (int64, error) {
	var count int64

	err := r.DB.
		Model(&adminModel.ProjectRequest{}).
		Where("agency_id = ?", agencyID).
		Where("status = ?", adminModel.ProjectRequestPending).
		Count(&count).Error

	if err != nil {
		return 0, err
	}

	return count, nil
}
