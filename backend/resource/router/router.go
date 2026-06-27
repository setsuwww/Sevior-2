package router

import (
	"backend/resource/controllers"
	
	superadminCtrl "backend/resource/controllers/superadmin"
	superadminRepo "backend/resource/repositories/superadmin"
	superadminSvc "backend/resource/services/superadmin"

	"backend/resource/middleware"

	"gorm.io/gorm"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func SetupRouter(db *gorm.DB) *gin.Engine {
	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	authPublic := r.Group("/auth")
	authPublic.POST("/register/client", func(c *gin.Context) { controllers.RegisterClient(c, db) })
	authPublic.POST("/register/agency", func(c *gin.Context) { controllers.RegisterAgency(c, db) })
	authPublic.POST("/login", func(c *gin.Context) { controllers.Login(c, db) })
	authPublic.POST("/refresh", func(c *gin.Context) { controllers.RefreshToken(c, db) })

	authProtected := r.Group("/auth")
	authProtected.Use(middleware.AuthMiddleware(db))
	authProtected.GET("/me", controllers.Me)

	// Legacy admin group (keeping it intact for now if needed, or we can replace it)
	// But the user requested superadmin architecture, so let's build the superadmin group.
	
	superadminGroup := r.Group("/superadmin")
	superadminGroup.Use(middleware.AuthMiddleware(db), middleware.RoleMiddleware("SUPER_ADMIN"))
	{
		// Repositories
		dashboardRepo := superadminRepo.NewDashboardRepository(db)
		userRepo := superadminRepo.NewUserRepository(db)
		agencyRepo := superadminRepo.NewAgencyRepository(db)
		projectRepo := superadminRepo.NewProjectRepository(db)
		paymentRepo := superadminRepo.NewPaymentRepository(db)
		settingRepo := superadminRepo.NewSettingRepository(db)

		// Services
		dashboardService := superadminSvc.NewDashboardService(dashboardRepo)
		userService := superadminSvc.NewUserService(userRepo)
		agencyService := superadminSvc.NewAgencyService(agencyRepo)
		projectService := superadminSvc.NewProjectService(projectRepo)
		paymentService := superadminSvc.NewPaymentService(paymentRepo)
		settingService := superadminSvc.NewSettingService(settingRepo)

		// Controllers
		dashboardCtrl := superadminCtrl.NewDashboardController(dashboardService)
		userCtrl := superadminCtrl.NewUserController(userService)
		agencyCtrl := superadminCtrl.NewAgencyController(agencyService)
		projectCtrl := superadminCtrl.NewProjectController(projectService)
		paymentCtrl := superadminCtrl.NewPaymentController(paymentService)
		settingCtrl := superadminCtrl.NewSettingController(settingService)

		// Dashboard
		superadminGroup.GET("/dashboard", dashboardCtrl.GetDashboardSummary)

		// Users
		superadminGroup.GET("/users", userCtrl.GetUsers)
		superadminGroup.GET("/users/:id", userCtrl.GetUser)
		superadminGroup.PATCH("/users/:id/status", userCtrl.UpdateUserStatus)
		superadminGroup.PATCH("/users/:id", userCtrl.UpdateUser)

		// Agencies
		superadminGroup.GET("/agencies", agencyCtrl.GetAgencies)
		superadminGroup.GET("/agencies/:id", agencyCtrl.GetAgency)
		superadminGroup.PATCH("/agencies/:id/status", agencyCtrl.UpdateAgencyStatus)
		superadminGroup.DELETE("/agencies/:id", agencyCtrl.DeleteAgency)

		// Projects
		superadminGroup.GET("/projects", projectCtrl.GetProjects)
		superadminGroup.GET("/projects/:id", projectCtrl.GetProject)

		// Payments / Subscriptions
		superadminGroup.GET("/payments/subscriptions", paymentCtrl.GetSubscriptions)
		superadminGroup.GET("/payments/stats", paymentCtrl.GetPaymentStats)
		superadminGroup.POST("/payments/subscriptions/:id/pay", paymentCtrl.MarkAsPaid)
		superadminGroup.POST("/payments/subscriptions/:id/cancel", paymentCtrl.CancelSubscription)
		superadminGroup.POST("/payments/subscriptions/:id/extend", paymentCtrl.ExtendSubscription)

		// Settings
		superadminGroup.GET("/settings/maintenance", settingCtrl.GetMaintenanceMode)
		superadminGroup.POST("/settings/maintenance", settingCtrl.ToggleMaintenanceMode)
		superadminGroup.GET("/settings/audit-logs", settingCtrl.GetAuditLogs)
		
		superadminGroup.GET("/settings/announcements", settingCtrl.GetAnnouncements)
		superadminGroup.POST("/settings/announcements", settingCtrl.CreateAnnouncement)
		superadminGroup.PATCH("/settings/announcements/:id", settingCtrl.UpdateAnnouncement)
		superadminGroup.DELETE("/settings/announcements/:id", settingCtrl.DeleteAnnouncement)
	}

	// Agency Admin routes
	AgencyAdminRoutes(r, db)

	return r
}
