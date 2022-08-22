package handlers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"
	authdto "waysbuck/dto/auth"
	dto "waysbuck/dto/result"
	"waysbuck/models"
	"waysbuck/pkg/bcrypt"
	jwtToken "waysbuck/pkg/jwt"
	"waysbuck/repositories"

	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v4"
)

type handlerAuth struct {
	AuthRepository repositories.AuthRepository
}

func HandlerAuth(AuthRepository repositories.AuthRepository) *handlerAuth {
	return &handlerAuth{AuthRepository}
}

func (h *handlerAuth) Register(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Content-Type", "application/json")

	//. Get Register Request (From Field)
	request := new(authdto.RegisterRequest)
	if err := json.NewDecoder(r.Body).Decode(request); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	//. Validation Empty Field
	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	//. Hashing Password
	password, err := bcrypt.HashingPassword(request.Password)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Status: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
	}

	//. Convert to Struck Models.User for Send to Repository
	user := models.User{
		FullName: request.FullName,
		Email:    request.Email,
		Password: password,
		Status:   "customer",
	}

	//. Processing Register at Auth Repository
	data, err := h.AuthRepository.Register(user)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Status: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
	}

	profile := models.Profile{
		UserID: data.ID,
	}
	//. create nil profile column
	h.AuthRepository.CreateNilProfile(profile)

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Status: http.StatusOK, Data: profile}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerAuth) Login(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Content-Type", "application/json")

	//. Get Login Request (From Field)
	request := new(authdto.LoginRequest)
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	//. Convert to Struck Models.User for Send to Repository
	user := models.User{
		Email:    request.Email,
		Password: request.Password,
	}

	//. For Check email
	user, err := h.AuthRepository.Login(user.Email)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	user.Profile.Image = os.Getenv("PATH_FILE") + user.Profile.Image

	//. For Check password
	isValid := bcrypt.CheckPasswordHash(request.Password, user.Password)
	if !isValid {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Status: http.StatusBadRequest, Message: "wrong email or password"}
		json.NewEncoder(w).Encode(response)
		return
	}

	//. For Generate Token
	claims := jwt.MapClaims{}
	claims["id"] = user.ID
	claims["exp"] = time.Now().Add(time.Hour * 4).Unix() // 4 hours expired

	token, errGenerateToken := jwtToken.GenerateToken(&claims)
	if errGenerateToken != nil {
		log.Println(errGenerateToken)
		fmt.Println("Unauthorize")
		return
	}

	//. Convert to Struck LoginResponse
	loginResponse := authdto.LoginResponse{
		ID:       user.ID,
		FullName: user.FullName,
		Email:    user.Email,
		Status:   user.Status,
		Token:    token,
		Profile:  user.Profile,
	}

	w.Header().Set("Content-Type", "application/json")
	response := dto.SuccessResult{Status: http.StatusOK, Data: loginResponse}
	json.NewEncoder(w).Encode(response)

}

func (h *handlerAuth) CheckAuth(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	userInfo := r.Context().Value("userInfo").(jwt.MapClaims)
	userId := int(userInfo["id"].(float64))

	// Check User by Id
	user, err := h.AuthRepository.Getuser(userId)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	user.Profile.Image = os.Getenv("PATH_FILE") + user.Profile.Image

	CheckAuthResponse := authdto.CheckAuthResponse{
		Id:       user.ID,
		FullName: user.FullName,
		Email:    user.Email,
		Status:   user.Status,
		Profile:  user.Profile,
	}

	w.Header().Set("Content-Type", "application/json")
	response := dto.SuccessResult{Status: http.StatusOK, Data: CheckAuthResponse}
	json.NewEncoder(w).Encode(response)
}
