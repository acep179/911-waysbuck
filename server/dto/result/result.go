package dto

type SuccessResult struct {
	Status int         `json:"code"`
	Data   interface{} `json:"data"`
}

type ErrorResult struct {
	Status  int    `json:"code"`
	Message string `json:"message"`
}
