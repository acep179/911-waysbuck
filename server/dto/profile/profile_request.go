package profilesdto

type ProfileRequest struct {
	Image   string `json:"image" gorm:"type: varchar(255)"`
	Phone   string `json:"phone" gorm:"type: varchar(255)"`
	Address string `json:"address" gorm:"type: text"`
	UserID  int    `json:"user_id"`
}
