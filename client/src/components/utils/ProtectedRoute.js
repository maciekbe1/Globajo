import React from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import SigninPage from "components/pages/SigninPage";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuth } = useSelector(({ authReducer }) => authReducer);

  return (
    <Route
      render={(props) => (isAuth ? <Component {...props} /> : <SigninPage />)}
      {...rest}
    />
  );
};

export default ProtectedRoute;
