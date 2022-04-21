// LIBRARY
import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// COMPONENTs
import Plans from "./pages/Plans";
import { useAuth } from "./AuthContext";
import Signup from "./pages/Signup";
import Welcome from "./pages/Welcome";
import Dashboard from "./pages/Dashboard";
import { userHasHostingPlans } from "./firebase";

export function Routes() {
  const [userHasPlans, setUserHasPlans] = React.useState(false);
  const { isUser } = useAuth();
  userHasHostingPlans(setUserHasPlans);
  console.log(isUser());
  console.log(userHasPlans);
  return (
    <Switch>
      {/* Welcome/Splash route */}
      <Route exact path="/welcome" component={Welcome} />
      <Route exact path="/">
        {isUser() ? (
          userHasPlans ? (
            <Redirect to="/dashboard" />
          ) : (
            <Redirect to="/plans" />
          )
        ) : (
          <Welcome />
        )}
      </Route>

      {/* Signup route */}
      <Route exact path="/signup">
        {isUser() ? (
          userHasPlans ? (
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
          userHasPlans ? (
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
          userHasPlans ? (
            <Dashboard />
          ) : (
            <Redirect to="/plans" />
          )
        ) : (
          <Redirect to="/" />
        )}
      </Route>
    </Switch>
  );
}
