import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store";
import Notification from "./components/notifications";
import Chat from "./components/chat/chat";
import Rescent from "./components/chat/recentchat";
import SearchFriend from "./components/chat/searchFriend";
import Typography from "@mui/material/Typography";
ReactDOM.createRoot(document.getElementById("root")).render(
 
    <Provider store={store}>
      <App />
    </Provider>
  
);
