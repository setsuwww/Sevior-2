package admin

import (
	"errors"

	adminModel "backend/resource/models"
	adminRepo "backend/resource/repositories/admin"

	"gorm.io/gorm"
)

type ProjectService struct {
	Repo *adminRepo.ProjectRepository
}

func NewProjectService(repo *adminRepo.ProjectRepository) *ProjectService {
	return &ProjectService{
		Repo: repo,
	}
}

func (s *ProjectService) GetProjects(agencyID uint,
) ([]adminModel.Project, error) {
	return s.Repo.GetProjects(agencyID)
}

func (s *ProjectService) GetProject(
	agencyID uint,
	projectID uint,
) (*adminModel.Project, error) {
	project, err := s.Repo.GetProjectByID(
		agencyID,
		projectID,
	)

	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, errors.New("project not found")
		}

		return nil, err
	}

	return project, nil
}

func (s *ProjectService) GetProjectDevelopers(
	agencyID uint,
	projectID uint,
) ([]adminModel.User, error) {

	_, err := s.GetProject(agencyID, projectID)
	if err != nil {
		return nil, err
	}

	return s.Repo.GetProjectDevelopers(
		agencyID,
		projectID,
	)
}

func (s *ProjectService) AssignDeveloper(
	agencyID uint,
	projectID uint,
	developerID uint,
) error {

	// 1. Pastikan project milik agency
	_, err := s.GetProject(agencyID, projectID)
	if err != nil {
		return err
	}

	// 2. Pastikan developer milik agency + role developer
	_, err = s.Repo.GetDeveloper(
		agencyID,
		developerID,
	)

	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return errors.New("developer not found")
		}

		return err
	}

	// 3. Cek apakah sudah assigned
	assigned, err := s.Repo.IsDeveloperAssigned(
		projectID,
		developerID,
	)

	if err != nil {
		return err
	}

	if assigned {
		return errors.New("developer is already assigned to this project")
	}

	// 4. Assign
	return s.Repo.AssignDeveloper(
		projectID,
		developerID,
	)
}

func (s *ProjectService) RemoveDeveloper(
	agencyID uint,
	projectID uint,
	developerID uint,
) error {

	// Pastikan project milik agency
	_, err := s.GetProject(agencyID, projectID)
	if err != nil {
		return err
	}

	return s.Repo.RemoveDeveloper(
		projectID,
		developerID,
	)
}
