import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./app/store";

const AppProviders = ({ children }) => {
  
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <div className="min-h-screen bg-zinc-100">{children}</div>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default AppProviders;
