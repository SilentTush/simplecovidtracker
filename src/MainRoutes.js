import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CountryPage from "./pages/CountryPage";
import Home from "./pages/Home";
function MainRoutes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/country/:countryName" component={CountryPage} />
      </Switch>
    </Router>
  );
}

export default MainRoutes;
