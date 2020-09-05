import React from "react";
import { Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import Header from "./components/Header";
import App from "./components/App";
import Admin from "./components/Admin";
import SubDomain from "./components/SubDomain";
import UserProfile from "./components/UserProfile";
import Badge from "./components/Badge";
import theme from "./theme.js";

function Routes() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Switch>
        <Route path="/admin" component={Admin} />
        <Route path="/profile" component={UserProfile} />
        <Route path="/subdomain" component={SubDomain} />
        <Route path="/badge" component={Badge} />
        <Route exact path="/" component={App} />
      </Switch>
    </ThemeProvider>
  );
}

export default Routes;
