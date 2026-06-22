package admin

import (
	"net/http"
	"strconv"

	"backend/resource/models"
	"backend/resource/utils"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type UserController struct {
	DB *gorm.DB
}

func (u *UserController) GetUsers(c *gin.Context) {
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "10"))
	role := c.Query("role")
	search := c.Query("search")

	if page < 1 {
		page = 1
	}
	if limit < 1 || limit > 100 {
		limit = 10
	}

	offset := (page - 1) * limit

	query := u.DB.Model(&models.User{})

	if role != "" {
		query = query.Where("role = ?", role)
	}

	if search != "" {
		searchQuery := "%" + search + "%"
		query = query.Where("full_name ILIKE ? OR email ILIKE ?", searchQuery, searchQuery)
	}

	var total, active, inactive int64
	// PostgreSQL aggregate to get counts efficiently
	query.Select("count(*) as total, COALESCE(sum(case when is_active = true then 1 else 0 end), 0) as active, COALESCE(sum(case when is_active = false or is_active is null then 1 else 0 end), 0) as inactive").
		Row().Scan(&total, &active, &inactive)

	var users []models.User

	// Reset Select because we changed it for the Count
	query = query.Select("id", "full_name", "email", "phone", "role", "is_active", "created_at", "updated_at")

	if err := query.
		Limit(limit).
		Offset(offset).
		Order("created_at DESC").
		Find(&users).Error; err != nil {

		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": users,
		"meta": gin.H{
			"page":     page,
			"limit":    limit,
			"total":    total,
			"active":   active,
			"inactive": inactive,
		},
	})
}

func (u *UserController) GetUser(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	var user models.User
	if err := u.DB.
		Select("id", "full_name", "email", "phone", "role", "is_active", "created_at", "updated_at").
		First(&user, id).Error; err != nil {

		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
			return
		}

		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, user)
}

func (u *UserController) CreateUser(c *gin.Context) {
	var input struct {
		FullName string `json:"full_name" binding:"required"`
		Email    string `json:"email" binding:"required,email"`
		Password string `json:"password" binding:"required,min=6"`
		Role     string `json:"role"`
		Phone    string `json:"phone"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	isActive := true
	user := models.User{
		FullName: input.FullName,
		Email:    input.Email,
		Phone:    input.Phone,
		Password: utils.HashPassword(input.Password),
		Role:     input.Role,
		IsActive: &isActive,
	}

	if user.Role == "" {
		user.Role = models.RoleDeveloper
	}

	// Assign AgencyID from current Admin user
	currentUserIface, exists := c.Get("currentUser")
	if exists {
		adminUser := currentUserIface.(models.User)
		if adminUser.AgencyID != nil {
			user.AgencyID = adminUser.AgencyID
		}
	}

	if err := u.DB.Create(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"id":        user.ID,
		"full_name": user.FullName,
		"email":     user.Email,
		"role":      user.Role,
		"isActive":  user.IsActive,
		"createdAt": user.CreatedAt,
	})
}

func (u *UserController) UpdateUser(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	var user models.User
	if err := u.DB.First(&user, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	var input struct {
		FullName *string `json:"full_name"`
		Email    *string `json:"email"`
		Phone    *string `json:"phone"`
		Role     *string `json:"role"`
		IsActive *bool   `json:"isActive"`
		Password *string `json:"password"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if input.FullName != nil {
		user.FullName = *input.FullName
	}
	if input.Email != nil {
		user.Email = *input.Email
	}
	if input.Phone != nil {
		user.Phone = *input.Phone
	}
	if input.Role != nil {
		user.Role = *input.Role
	}
	if input.IsActive != nil {
		user.IsActive = input.IsActive
	}
	if input.Password != nil && *input.Password != "" {
		user.Password = utils.HashPassword(*input.Password)
	}

	if err := u.DB.Save(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "User updated successfully",
	})
}

func (u *UserController) DeleteUser(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	if err := u.DB.Delete(&models.User{}, id).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "User deleted successfully",
	})
}
