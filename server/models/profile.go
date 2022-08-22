package models

import "time"

type Profile struct {
	ID        int            `json:"id" gorm:"primary_key:auto_increment"`
	Image     string         `json:"image" gorm:"type: varchar(255)"`
	Phone     string         `json:"phone" gorm:"type: varchar(255)"`
	Address   string         `json:"address" gorm:"type: text"`
	UserID    int            `json:"user_id"`
	User      UserProfileRel `json:"user"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
}

// for association relation with another table (user)
type ProfileResponse struct {
	Phone   string `json:"phone"`
	Image   string `json:"image"`
	Address string `json:"address"`
	UserID  int    `json:"-"`
}

func (ProfileResponse) TableName() string {
	return "profiles"
}
