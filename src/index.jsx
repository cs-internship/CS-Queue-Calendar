import React from "react";
import ReactDOM from "react-dom/client";

import "./assets/scss/index.scss";
import App from "./App";
import "react-big-calendar/lib/css/react-big-calendar.css";
import StoreProvider from "./store/StoreProvider";
import { printEE } from "./utils/printEE";

// Built with love for the bright future of the CS Internship ♡

printEE("Aloha");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <StoreProvider>
            <App />
        </StoreProvider>
    </React.StrictMode>
);
