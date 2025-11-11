import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import axios from "axios";
import { UserProvider } from "./context/user.jsx";
import './index.css'
import { CardsProvider } from "./context/cards.jsx";

axios.defaults.withCredentials = true; // send cookies
axios.defaults.baseURL = "http://localhost:5000";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <CardsProvider>
        <App />
      </CardsProvider>
      
    </UserProvider>
  </React.StrictMode>
);
