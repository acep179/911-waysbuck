package handlers

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"strconv"
	productsdto "waysbuck/dto/products"
	dto "waysbuck/dto/result"
	"waysbuck/models"
	"waysbuck/repositories"

	"github.com/cloudinary/cloudinary-go/v2"
	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v4"
	"github.com/gorilla/mux"
)

type handlerProduct struct {
	ProductRepository repositories.ProductRepository
}

func HandlerProduct(ProductRepository repositories.ProductRepository) *handlerProduct {
	return &handlerProduct{ProductRepository}
}

func (h *handlerProduct) FindProducts(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Content-Type", "application/json")

	products, err := h.ProductRepository.FindProducts()

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)

		response := dto.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()}

		json.NewEncoder(w).Encode(response)
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Status: http.StatusOK, Data: products}

	json.NewEncoder(w).Encode(response)
}

func (h *handlerProduct) GetProduct(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Content-Type", "application/json")

	id, _ := strconv.Atoi(mux.Vars(r)["id"])

	product, err := h.ProductRepository.GetProduct(id)

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Status: http.StatusOK, Data: product}

	json.NewEncoder(w).Encode(response)
}

func (h *handlerProduct) CreateProduct(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Content-Type", "application/json")

	userInfo := r.Context().Value("userInfo").(jwt.MapClaims)
	userId := int(userInfo["id"].(float64))

	dataContex := r.Context().Value("dataFile")
	filepath := dataContex.(string)

	price, _ := strconv.Atoi(r.FormValue("price"))
	request := productsdto.CreateProductRequest{
		Title: r.FormValue("title"),
		Price: price,
		Image: filepath,
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	// Declare Context Background, Cloud Name, API Key, API Secret ...
	var ctx = context.Background()
	var CLOUD_NAME = os.Getenv("CLOUD_NAME")
	var API_KEY = os.Getenv("API_KEY")
	var API_SECRET = os.Getenv("API_SECRET")

	// Add your Cloudinary credentials ...
	cld, _ := cloudinary.NewFromParams(CLOUD_NAME, API_KEY, API_SECRET)

	// Upload file to Cloudinary ...
	resp, err := cld.Upload.Upload(ctx, filepath, uploader.UploadParams{Folder: "waysbuck-911"})

	if err != nil {
		fmt.Println(err.Error())
	}

	product := models.Product{
		Title:  request.Title,
		Price:  request.Price,
		Image:  resp.SecureURL,
		UserID: userId,
	}

	data, err := h.ProductRepository.CreateProduct(product)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Status: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Status: http.StatusOK, Data: convertProductsResponse(data)}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerProduct) UpdateProduct(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Content-Type", "application/json")

	dataContex := r.Context().Value("dataFile")
	filepath := dataContex.(string)

	price, _ := strconv.Atoi(r.FormValue("price"))
	request := productsdto.UpdateProductRequest{
		Title: r.FormValue("title"),
		Price: price,
		Image: filepath,
	}

	id, _ := strconv.Atoi(mux.Vars(r)["id"])
	product, err := h.ProductRepository.GetProduct(id)

	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	// Declare Context Background, Cloud Name, API Key, API Secret ...
	var ctx = context.Background()
	var CLOUD_NAME = os.Getenv("CLOUD_NAME")
	var API_KEY = os.Getenv("API_KEY")
	var API_SECRET = os.Getenv("API_SECRET")

	// Add your Cloudinary credentials ...
	cld, _ := cloudinary.NewFromParams(CLOUD_NAME, API_KEY, API_SECRET)

	// Upload file to Cloudinary ...
	resp, err := cld.Upload.Upload(ctx, filepath, uploader.UploadParams{Folder: "waysbuck-911"})

	if err != nil {
		fmt.Println(err.Error())
	}

	if len(request.Title) > 0 {
		product.Title = request.Title
	}

	if request.Price > 0 {
		product.Price = request.Price
	}

	if len(request.Image) > 0 {
		product.Image = resp.SecureURL
	}

	data, err := h.ProductRepository.UpdateProduct(product)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Status: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Status: http.StatusOK, Data: convertProductsResponse(data)}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerProduct) DeleteProduct(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Content-Type", "application/json")

	id, _ := strconv.Atoi(mux.Vars(r)["id"])
	product, err := h.ProductRepository.GetProduct(id)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	data, err := h.ProductRepository.DeleteProduct(product)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Status: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Status: http.StatusOK, Data: convertProductsResponse(data)}
	json.NewEncoder(w).Encode(response)
}

func convertProductsResponse(u models.Product) productsdto.ProductResponse {
	return productsdto.ProductResponse{
		ID:    u.ID,
		Title: u.Title,
		Price: u.Price,
		Image: u.Image,
	}
}
