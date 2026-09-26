package admin

import (
	adminModel "backend/resource/models"

	"gorm.io/gorm"
)

type ProjectRepository struct {
	DB *gorm.DB
}

func NewProjectRepository(db *gorm.DB) *ProjectRepository {
	return &ProjectRepository{
		DB: db,
	}
}

func (r *ProjectRepository) GetProjects(agencyID uint) ([]adminModel.Project, error) {
	var projects []adminModel.Project

	err := r.DB.
		Where("agency_id = ?", agencyID).
		Order("created_at DESC").
		Find(&projects).Error

	if err != nil {
		return nil, err
	}

	return projects, nil
}

func (r *ProjectRepository) GetProjectByID(agencyID uint, projectID uint) (*adminModel.Project, error) {
	var project adminModel.Project

	err := r.DB.
		Where(
			"agency_id = ? AND id = ?",
			agencyID,
			projectID,
		).
		First(&project).Error

	if err != nil {
		return nil, err
	}

	return &project, nil
}

func (r *ProjectRepository) GetProjectDevelopers(agencyID uint, projectID uint) ([]adminModel.User, error) {
	var developers []adminModel.User

	err := r.DB.
		Joins("JOIN project_members pm ON pm.developer_id = users.id").
		Where(
			"users.agency_id = ? AND pm.project_id = ?",
			agencyID,
			projectID,
		).
		Order("pm.assigned_at DESC").
		Find(&developers).Error

	if err != nil {
		return nil, err
	}

	return developers, nil
}

func (r *ProjectRepository) IsDeveloperAssigned(projectID uint, developerID uint) (bool, error) {
	var count int64

	err := r.DB.
		Model(&adminModel.ProjectMember{}).
		Where(
			"project_id = ? AND developer_id = ?",
			projectID,
			developerID,
		).
		Count(&count).Error

	if err != nil {
		return false, err
	}

	return count > 0, nil
}

func (r *ProjectRepository) GetDeveloper(agencyID uint, developerID uint) (*adminModel.User, error) {
	var developer adminModel.User

	err := r.DB.
		Where(
			"agency_id = ? AND id = ? AND role = ?",
			agencyID,
			developerID,
			adminModel.RoleDeveloper,
		).
		First(&developer).Error

	if err != nil {
		return nil, err
	}

	return &developer, nil
}

func (r *ProjectRepository) AssignDeveloper(projectID uint, developerID uint) error {
	projectMember := adminModel.ProjectMember{
		ProjectID:   &projectID,
		DeveloperID: &developerID,
	}

	return r.DB.Create(&projectMember).Error
}

func (r *ProjectRepository) RemoveDeveloper(projectID uint, developerID uint) error {
	result := r.DB.
		Where(
			"project_id = ? AND developer_id = ?",
			projectID,
			developerID,
		).
		Delete(&adminModel.ProjectMember{})

	if result.Error != nil {
		return result.Error
	}

	if result.RowsAffected == 0 {
		return gorm.ErrRecordNotFound
	}

	return nil
}
