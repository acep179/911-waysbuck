package transactiondto

type TransactionResponse struct {
	ID     int    `json:"id"`
	Amount int    `json:"amount"`
	Status string `json:"status"`
	UserID int    `json:"user_id"`
}
