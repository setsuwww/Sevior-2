package admin

import (
	"errors"
	"net/http"
	"strconv"

	adminDTO "backend/resource/dto/admin"
	adminModel "backend/resource/models"
	adminService "backend/resource/services/admin"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type DeveloperController struct {
	Service *adminService.DeveloperService
}

// ==========================================================
// GET ALL DEVELOPERS
// ==========================================================

func (c *DeveloperController) GetDevelopers(
	ctx *gin.Context,
) {

	currentUser, exists := ctx.Get("currentUser")

	if !exists {
		ctx.JSON(http.StatusUnauthorized, gin.H{
			"error": "Unauthorized",
		})
		return
	}

	user, ok := currentUser.(adminModel.User)

	if !ok {
		ctx.JSON(http.StatusUnauthorized, gin.H{
			"error": "Invalid user",
		})
		return
	}

	if user.AgencyID == nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": "Agency not found",
		})
		return
	}

	developers, err := c.Service.GetDevelopers(
		*user.AgencyID,
	)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	ctx.JSON(http.StatusOK, developers)
}

// ==========================================================
// GET DETAIL
// ==========================================================

func (c *DeveloperController) GetDeveloperByID(
	ctx *gin.Context,
) {

	currentUser, exists := ctx.Get("currentUser")

	if !exists {
		ctx.JSON(http.StatusUnauthorized, gin.H{
			"error": "Unauthorized",
		})
		return
	}

	user, ok := currentUser.(adminModel.User)

	if !ok {
		ctx.JSON(http.StatusUnauthorized, gin.H{
			"error": "Invalid user",
		})
		return
	}

	if user.AgencyID == nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": "Agency not found",
		})
		return
	}

	developerID, err := strconv.ParseUint(
		ctx.Param("id"),
		10,
		64,
	)

	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid developer ID",
		})
		return
	}

	developer, err := c.Service.GetDeveloperByID(
		*user.AgencyID,
		uint(developerID),
	)

	if err != nil {

		if errors.Is(err, gorm.ErrRecordNotFound) ||
			err.Error() == "developer not found" {

			ctx.JSON(http.StatusNotFound, gin.H{
				"error": "Developer not found",
			})
			return
		}

		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	ctx.JSON(http.StatusOK, developer)
}

// ==========================================================
// CREATE
// ==========================================================

func (c *DeveloperController) CreateDeveloper(
	ctx *gin.Context,
) {

	currentUser, exists := ctx.Get("currentUser")

	if !exists {
		ctx.JSON(http.StatusUnauthorized, gin.H{
			"error": "Unauthorized",
		})
		return
	}

	user, ok := currentUser.(adminModel.User)

	if !ok {
		ctx.JSON(http.StatusUnauthorized, gin.H{
			"error": "Invalid user",
		})
		return
	}

	if user.AgencyID == nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": "Agency not found",
		})
		return
	}

	var req adminDTO.CreateDeveloperRequest

	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	developer, err := c.Service.CreateDeveloper(
		*user.AgencyID,
		req,
	)

	if err != nil {

		status := http.StatusInternalServerError

		switch err.Error() {

		case "full name is required",
			"email is required":

			status = http.StatusBadRequest

		case "email already in use":

			status = http.StatusConflict
		}

		ctx.JSON(status, gin.H{
			"error": err.Error(),
		})

		return
	}

	ctx.JSON(http.StatusCreated, developer)
}

// ==========================================================
// UPDATE
// ==========================================================

func (c *DeveloperController) UpdateDeveloper(
	ctx *gin.Context,
) {

	currentUser, exists := ctx.Get("currentUser")

	if !exists {
		ctx.JSON(http.StatusUnauthorized, gin.H{
			"error": "Unauthorized",
		})
		return
	}

	user, ok := currentUser.(adminModel.User)

	if !ok {
		ctx.JSON(http.StatusUnauthorized, gin.H{
			"error": "Invalid user",
		})
		return
	}

	if user.AgencyID == nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": "Agency not found",
		})
		return
	}

	developerID, err := strconv.ParseUint(
		ctx.Param("id"),
		10,
		64,
	)

	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid developer ID",
		})
		return
	}

	var req adminDTO.UpdateDeveloperRequest

	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	developer, err := c.Service.UpdateDeveloper(
		*user.AgencyID,
		uint(developerID),
		req,
	)

	if err != nil {

		status := http.StatusInternalServerError

		switch err.Error() {

		case "developer not found":
			status = http.StatusNotFound

		case "full name is required",
			"email is required":

			status = http.StatusBadRequest

		case "email already in use":

			status = http.StatusConflict
		}

		ctx.JSON(status, gin.H{
			"error": err.Error(),
		})

		return
	}

	ctx.JSON(http.StatusOK, developer)
}

// ==========================================================
// DELETE
// ==========================================================

func (c *DeveloperController) DeleteDeveloper(
	ctx *gin.Context,
) {

	currentUser, exists := ctx.Get("currentUser")

	if !exists {
		ctx.JSON(http.StatusUnauthorized, gin.H{
			"error": "Unauthorized",
		})
		return
	}

	user, ok := currentUser.(adminModel.User)

	if !ok {
		ctx.JSON(http.StatusUnauthorized, gin.H{
			"error": "Invalid user",
		})
		return
	}

	if user.AgencyID == nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": "Agency not found",
		})
		return
	}

	developerID, err := strconv.ParseUint(
		ctx.Param("id"),
		10,
		64,
	)

	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid developer ID",
		})
		return
	}

	if err := c.Service.DeleteDeveloper(
		*user.AgencyID,
		uint(developerID),
	); err != nil {

		if err.Error() == "developer not found" {
			ctx.JSON(http.StatusNotFound, gin.H{
				"error": "Developer not found",
			})
			return
		}

		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})

		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"message": "Developer deleted successfully",
	})
}
