// backend/resource/controllers/admin/project_request_controller.go

package admin

import (
	adminMiddleware "backend/resource/middleware"
	adminService "backend/resource/services/admin"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type ProjectRequestController struct {
	Service *adminService.ProjectRequestService
}

func (c *ProjectRequestController) GetProjectRequests(
	ctx *gin.Context,
) {
	agencyID, err := adminMiddleware.GetAgencyID(ctx)
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{
			"error": err.Error(),
		})
		return
	}

	requests, err := c.Service.GetProjectRequests(agencyID)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to fetch project requests",
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"data": requests,
	})
}

func (c *ProjectRequestController) GetProjectRequest(
	ctx *gin.Context,
) {
	agencyID, err := adminMiddleware.GetAgencyID(ctx)
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{
			"error": err.Error(),
		})
		return
	}

	requestID, err := strconv.ParseUint(
		ctx.Param("id"),
		10,
		64,
	)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid project request ID",
		})
		return
	}

	request, err := c.Service.GetProjectRequestByID(
		agencyID,
		uint(requestID),
	)
	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{
			"error": "Project request not found",
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"data": request,
	})
}

func (c *ProjectRequestController) ApproveProjectRequest(
	ctx *gin.Context,
) {
	agencyID, err := adminMiddleware.GetAgencyID(ctx)
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{
			"error": err.Error(),
		})
		return
	}

	requestID, err := strconv.ParseUint(
		ctx.Param("id"),
		10,
		64,
	)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid project request ID",
		})
		return
	}

	err = c.Service.ApproveProjectRequest(
		agencyID,
		uint(requestID),
	)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"message": "Project request approved successfully",
	})
}

func (c *ProjectRequestController) RejectProjectRequest(
	ctx *gin.Context,
) {
	agencyID, err := adminMiddleware.GetAgencyID(ctx)
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{
			"error": err.Error(),
		})
		return
	}

	requestID, err := strconv.ParseUint(
		ctx.Param("id"),
		10,
		64,
	)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid project request ID",
		})
		return
	}

	err = c.Service.RejectProjectRequest(
		agencyID,
		uint(requestID),
	)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"message": "Project request rejected successfully",
	})
}

func (c *ProjectRequestController) GetPendingProjectRequestCount(
	ctx *gin.Context,
) {
	agencyID, err := adminMiddleware.GetAgencyID(ctx)
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{
			"error": err.Error(),
		})
		return
	}

	result, err := c.Service.GetPendingProjectRequestCount(
		agencyID,
	)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to fetch project request count",
		})
		return
	}

	ctx.JSON(http.StatusOK, result)
}
