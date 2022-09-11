import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "./app/store";

const AppProviders = ({ children }) => {
  
  return (
    <Provider store={store}>
      <Router>{children}</Router>
    </Provider>
  );
};

export default AppProviders;
