package transactiondto

type TransactionResponse struct {
	ID      int    `json:"id"`
	Amount  int    `json:"amount"`
	Status  string `json:"status"`
	BuyerID int    `json:"buyer_id"`
}
