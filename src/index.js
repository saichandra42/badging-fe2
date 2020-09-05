import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import Routes from "./Routes";
import { createBrowserHistory } from "history";

const customHistory = createBrowserHistory();

ReactDOM.render(
  <BrowserRouter history={customHistory}>
    <Routes />
  </BrowserRouter>,
  document.getElementById("root")
);
