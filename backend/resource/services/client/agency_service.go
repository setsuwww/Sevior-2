package client

import (
	clientDTO "backend/resource/dto/client"
	clientRepo "backend/resource/repositories/client"
	"math"
)

type AgencyService struct {
	Repo *clientRepo.AgencyRepository
}

func (s *AgencyService) GetAgencies(page int, limit int) (*clientDTO.AgencyDetailResponse, error) {

	// Default page
	if page < 1 {
		page = 1
	}
	if limit < 1 {
		limit = 6
	}
	if limit > 50 {
		limit = 50
	}

	agencies, total, err := s.Repo.GetAgencies(page, limit)

	if err != nil {
		return nil, err
	}

	totalPages := int(
		math.Ceil(
			float64(total) / float64(limit),
		),
	)

	data := make(
		[]clientDTO.AgencyListResponse,
		0,
		len(agencies),
	)

	for _, agency := range agencies {
		data = append(
			data,
			clientDTO.AgencyListResponse{
				ID:               agency.ID,
				AgencyName:       agency.AgencyName,
				AgencySlug:       agency.AgencySlug,
				Description:      agency.Description,
				Location:         agency.Location,
				ProfileImage:     agency.ProfileImage,
				SubscriptionPlan: string(agency.SubscriptionPlan),
			},
		)
	}

	return &clientDTO.AgencyDetailResponse{
		Data: data,
		Pagination: clientDTO.AgencyPagination{
			Page:       page,
			Limit:      limit,
			Total:      total,
			TotalPages: totalPages,
			HasNext:    page < totalPages,
		},
	}, nil
}
