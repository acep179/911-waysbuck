package transactiondto

type CreateTransactionRequest struct {
	Amount int `json:"amount" validate:"required"`
}

type UpdateTransactionRequest struct {
	Amount int    `json:"amount"`
	Status string `json:"status"`
	UserID int    `json:"user_id"`
}
