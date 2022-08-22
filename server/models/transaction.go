package models

import "time"

type Transaction struct {
	ID        int            `json:"id" gorm:"primary_key:auto_increment"`
	Amount    int            `json:"amount"`
	Status    string         `json:"status"`
	UserID    int            `json:"user_id"`
	User      UserProfileRel `json:"user"`
	Carts     []Cart         `json:"cart"`
	CreatedAt time.Time      `json:"-"`
	UpdatedAt time.Time      `json:"updated_at"`
}

type TransactionCartRel struct {
	ID     int `json:"id"`
	UserId int `json:"user_id"`
	Amount int `json:"amount"`
}

type TransactionUserRel struct {
	ID     int `json:"id"`
	UserId int `json:"user_id"`
}

func (TransactionCartRel) TableName() string {
	return "transactions"
}
func (TransactionUserRel) TableName() string {
	return "transactions"
}
