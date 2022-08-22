package models

import "time"

type Product struct {
	ID        int            `json:"id" gorm:"primary_key:auto_increment"`
	Title     string         `json:"title" gorm:"type: varchar(255)"`
	Price     int            `json:"price" gorm:"type: int"`
	Image     string         `json:"image" gorm:"type: varchar(255)"`
	UserID    int            `json:"-"`
	User      UserProfileRel `json:"user"`
	CreatedAt time.Time      `json:"-"`
	UpdatedAt time.Time      `json:"-"`
}

type ProductCartRel struct {
	ID    int    `json:"id"`
	Title string `json:"title" gorm:"type: varchar(255)"`
	Price int    `json:"price" gorm:"type: int"`
	Image string `json:"image" gorm:"type: varchar(255)"`
}

type ProductUserRel struct {
	Title string `json:"title" gorm:"type: varchar(255)"`
	Price int    `json:"price" gorm:"type: int"`
	Image string `json:"image" gorm:"type: varchar(255)"`
}

func (ProductCartRel) TableName() string {
	return "products"
}
func (ProductUserRel) TableName() string {
	return "products"
}
