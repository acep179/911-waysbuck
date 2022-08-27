import {React, useContext, useEffect} from "react";
import { Routes, Route } from "react-router-dom";

import { API, setAuthToken } from "./config/api";
import { PrivateRoute } from './components'
import { UserContext } from "./context/userContext";
import { Home, AddProductAdmin, AddTopingAdmin, Cart, DetailProduct, IncomeTransactionAdmin, Profile } from './pages'



function App() {
  
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  
  const [state, dispatch] = useContext(UserContext)
  
  //. cek authh token

  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth');
      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: 'AUTH_ERROR',
        });
      }

      // Get user data
      let payload = response.data.data;
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: 'USER_SUCCESS',
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.token) {
      checkUser();
    }
  },);

  let isLogin = state.isLogin
  let isAdmin = state.user.status === "admin" ? true : false
  
  return (
      <Routes>
        <Route path="/" element={ isLogin ? (isAdmin ? <IncomeTransactionAdmin/> : <Home />) : <Home/>} />
        <Route exact path="/" element={<PrivateRoute />}>
          <Route path="/add-product" element={<AddProductAdmin />} />
          <Route path="/add-toping" element={<AddTopingAdmin />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/detail-product/:id" element={<DetailProduct />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
  );
}

export default App;
