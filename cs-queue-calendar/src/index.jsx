import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/scss/index.scss";
import App from "./App";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { ThemeProvider } from "./store/ThemeContext";

// Built with love for the bright future of the CS Internship ♡

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </React.StrictMode>
);
