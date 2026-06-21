package models

import "time"

const (
	RoleSuperAdmin = "SUPER_ADMIN"
	RoleAdmin      = "ADMIN"
	RoleDeveloper  = "DEVELOPER"
	RoleClient     = "CLIENT"
)

type User struct {
	ID           uint   `gorm:"primaryKey"`
	AgencyID     *uint  `gorm:"index"`
	FullName     string `gorm:"type:varchar"`
	Email        string `gorm:"type:varchar;uniqueIndex"`
	Password     string `gorm:"type:text" json:"-"`
	Role         string `gorm:"type:varchar"`
	Phone        string `gorm:"type:varchar"`
	ProfileImage string `gorm:"type:text"`
	IsActive     *bool
	LastLogin    *time.Time
	CreatedAt    time.Time
	UpdatedAt    time.Time

	Agency Agency `gorm:"foreignKey:AgencyID;constraint:OnDelete:CASCADE"`

	// Relations
	ProjectRequests []ProjectRequest `gorm:"foreignKey:ClientID"`
	ClientProjects  []Project        `gorm:"foreignKey:ClientID"`
	ProjectMembers  []ProjectMember  `gorm:"foreignKey:DeveloperID"`
	AssignedTasks   []Task           `gorm:"foreignKey:AssignedTo"`
	TimeLogs        []TimeLog        `gorm:"foreignKey:DeveloperID"`
	ReportedBugs    []BugReport      `gorm:"foreignKey:ReportedBy"`
	AssignedBugs    []BugReport      `gorm:"foreignKey:AssignedTo"`
	Comments        []Comment        `gorm:"foreignKey:UserID"`
	UploadedFiles   []File           `gorm:"foreignKey:UploadedBy"`
	Invoices        []Invoice        `gorm:"foreignKey:ClientID"`
	Notifications   []Notification   `gorm:"foreignKey:UserID"`
	ActivityLogs    []ActivityLog    `gorm:"foreignKey:UserID"`
}
