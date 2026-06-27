package superadmin

import (
	"backend/resource/models"
	repo "backend/resource/repositories/superadmin"
)

type PaginatedProjectsResponse struct {
	Data  []models.Project `json:"data"`
	Total int64            `json:"total"`
	Page  int              `json:"page"`
	Limit int              `json:"limit"`
}

type ProjectService interface {
	GetProjects(page, limit int, search, filter, sort string) (*PaginatedProjectsResponse, error)
	GetProjectByID(id uint) (*models.Project, error)
}

type projectService struct {
	repo repo.ProjectRepository
}

func NewProjectService(repo repo.ProjectRepository) ProjectService {
	return &projectService{repo}
}

func (s *projectService) GetProjects(page, limit int, search, filter, sort string) (*PaginatedProjectsResponse, error) {
	projects, total, err := s.repo.GetAll(page, limit, search, filter, sort)
	if err != nil {
		return nil, err
	}

	return &PaginatedProjectsResponse{
		Data:  projects,
		Total: total,
		Page:  page,
		Limit: limit,
	}, nil
}

func (s *projectService) GetProjectByID(id uint) (*models.Project, error) {
	return s.repo.GetByID(id)
}
