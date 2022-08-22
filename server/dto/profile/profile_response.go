package profilesdto

import "waysbuck/models"

type ProfileResponse struct {
	ID      int                   `json:"id" gorm:"primary_key:auto_increment"`
	Image   string                `json:"image" gorm:"type: varchar(255)"`
	Phone   string                `json:"phone" gorm:"type: varchar(255)"`
	Address string                `json:"address" gorm:"type: text"`
	UserID  int                   `json:"user_id"`
	User    models.UserProfileRel `json:"user"`
}
