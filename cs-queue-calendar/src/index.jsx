import React, { useEffect } from "react";
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
            {console.log(`Aloha!

This program was built on 1403/10/30 for the CS Internship program with love.

🔗 You can check out the app source through the footer link.  
📖 Interested in joining the CS Internship? Read the CS page on Virgool.  
❓ Have questions? Feel free to ask in the CS Queue Telegram group.

Good luck! Hope to see you all very soon in the program :)
- A.S.`)}
            <App />
        </ThemeProvider>
    </React.StrictMode>
);
