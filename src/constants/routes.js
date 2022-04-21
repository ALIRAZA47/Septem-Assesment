// LIBRARY
import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// COMPONENTs
import Plans from "../pages/Plans";
import { useAuth } from "../AuthContext";
import Signup from "../pages/Signup";
import Welcome from "../pages/Welcome";
import Dashboard from "../pages/Dashboard";
import { userHasHostingPlans } from "../firebase";

export function Routes() {
  const { isUser } = useAuth();
  console.log(isUser());
  return (
    <Switch>
      {/* Welcome/Splash route */}
      <Route exact path="/" component={Welcome} />

      {/* Signup route */}
      <Route exact path="/signup">
        {isUser() ? (
          userHasHostingPlans() ? (
            <Redirect to="/dashboard" />
          ) : (
            <Redirect to="/plans" />
          )
        ) : (
          <Signup />
        )}
      </Route>

      {/* Plans route */}
      <Route exact path="/plans">
        {isUser() ? (
          userHasHostingPlans() ? (
            <Redirect to="/dashboard" />
          ) : (
            <Plans />
          )
        ) : (
          <Redirect to="/signup" />
        )}
      </Route>

      {/* Dashboard Rout */}
      <Route exact path="/dashboard">
        {isUser() ? (
          userHasHostingPlans() ? (
            <Dashboard />
          ) : (
            <Redirect to="/plans" />
          )
        ) : (
          <Redirect to="/signup" />
        )}
      </Route>
    </Switch>
  );
}
