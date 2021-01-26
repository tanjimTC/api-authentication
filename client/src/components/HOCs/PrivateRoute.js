import React from "react";
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({ children, ...rest }) => {
  const isAuthenticated = localStorage.getItem("Auth-Jwt");
  console.log(isAuthenticated);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
