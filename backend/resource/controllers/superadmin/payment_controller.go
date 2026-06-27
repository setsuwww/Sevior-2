package superadmin

import (
	"net/http"
	"strconv"

	service "backend/resource/services/superadmin"

	"github.com/gin-gonic/gin"
)

type PaymentController struct {
	Service service.PaymentService
}

func NewPaymentController(s service.PaymentService) *PaymentController {
	return &PaymentController{Service: s}
}

func (ctrl *PaymentController) GetSubscriptions(c *gin.Context) {
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "10"))
	status := c.Query("status")

	if page < 1 {
		page = 1
	}
	if limit < 1 || limit > 100 {
		limit = 10
	}

	response, err := ctrl.Service.GetSubscriptions(page, limit, status)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch subscriptions"})
		return
	}

	c.JSON(http.StatusOK, response)
}

func (ctrl *PaymentController) GetPaymentStats(c *gin.Context) {
	stats, err := ctrl.Service.GetPaymentStats()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch payment stats"})
		return
	}
	c.JSON(http.StatusOK, stats)
}

func (ctrl *PaymentController) MarkAsPaid(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	if err := ctrl.Service.MarkAsPaid(uint(id)); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to mark as paid"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Subscription marked as paid"})
}

func (ctrl *PaymentController) CancelSubscription(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	if err := ctrl.Service.CancelSubscription(uint(id)); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to cancel subscription"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Subscription cancelled"})
}

func (ctrl *PaymentController) ExtendSubscription(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	var input struct {
		Days int `json:"days" binding:"required,min=1"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := ctrl.Service.ExtendSubscription(uint(id), input.Days); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to extend subscription"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Subscription extended successfully"})
}
