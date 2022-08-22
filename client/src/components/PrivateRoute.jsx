import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

const PrivateRoute = ({ element: Component, ...rest }) => {

  const [state] = useContext(UserContext)

  return state.isLogin ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;