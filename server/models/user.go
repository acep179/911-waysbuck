package models

import (
	"time"
)

type User struct {
	ID          int                  `json:"id"`
	FullName    string               `json:"fullName" gorm:"type: varchar(255)"`
	Email       string               `json:"email" gorm:"type: varchar(255)"`
	Password    string               `json:"password" gorm:"type: varchar(255)"`
	Status      string               `json:"status"`
	Profile     ProfileResponse      `json:"profile"`
	Transaction []TransactionUserRel `json:"transaction"`
	CreatedAt   time.Time            `json:"-"`
	UpdatedAt   time.Time            `json:"-"`
}

//todo relation to the another table
//ctt atribut yang di tulis harus sama
type UserProfileRel struct {
	ID       int    `json:"id"`
	FullName string `json:"fullName"`
	Email    string `json:"email"`
	Status   string `json:"status"`
}

func (UserProfileRel) TableName() string {
	return "users"
}
