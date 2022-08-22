package authdto

import "waysbuck/models"

type RegisterResponse struct {
	ID       int    `json:"id"`
	FullName string `json:"fullName" form:"name" validate:"required"`
	Email    string `json:"email"  form:"email" validate:"required"`
	Password string `json:"password"  form:"password" validate:"required"`
}

type LoginResponse struct {
	ID       int                    `gorm:"type: int" json:"id"`
	FullName string                 `gorm:"type: varchar(255)" json:"fullName"`
	Email    string                 `gorm:"type: varchar(255)" json:"email"`
	Status   string                 `gorm:"type: varchar(255)" json:"status"`
	Token    string                 `gorm:"type: varchar(255)" json:"token"`
	Profile  models.ProfileResponse `json:"profile"`
}

type CheckAuthResponse struct {
	Id       int                    `gorm:"type: int" json:"id"`
	FullName string                 `gorm:"type: varchar(255)" json:"fullname"`
	Email    string                 `gorm:"type: varchar(255)" json:"email"`
	Status   string                 `gorm:"type: varchar(50)"  json:"status"`
	Profile  models.ProfileResponse `json:"profile"`
}
