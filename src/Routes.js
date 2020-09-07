import React from "react";
import { Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import Header from "./components/Header";
import App from "./components/App";
import Manager from "./components/Manager";
import SubDomain from "./components/SubDomain";
import UserProfile from "./components/UserProfile";
import Badge from "./components/Badge";
import HR from "./components/HR";
import theme from "./theme.js";

function Routes() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Switch>
        <Route path="/manager" component={Manager} />
        <Route path="/profile" component={UserProfile} />
        <Route path="/subdomain" component={SubDomain} />
        <Route path="/badge" component={Badge} />
        <Route path="/hr" component={HR} />
        <Route exact path="/" component={App} />
      </Switch>
    </ThemeProvider>
  );
}

export default Routes;
