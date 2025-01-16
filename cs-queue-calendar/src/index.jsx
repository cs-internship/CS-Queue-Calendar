import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { ThemeProvider } from "./ThemeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </React.StrictMode>
);
