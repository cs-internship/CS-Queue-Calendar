import React, { useContext } from "react";
import { ConfigProvider, theme } from "antd";
import Header from "./Header";
import Footer from "./Footer";
import CSCalendar from "./CSCalendar";
import { ThemeContext } from "./ThemeContext";

const App = () => {
    const { theme: currentTheme, toggleTheme } = useContext(ThemeContext);

    return (
        <div>
            <Header />

            {/* <button onClick={toggleTheme}>Toggle Theme</button> */}

            <ConfigProvider
                theme={{
                    algorithm:
                        currentTheme === "dark"
                            ? theme.darkAlgorithm
                            : theme.defaultAlgorithm,
                }}
            >
                <CSCalendar />
            </ConfigProvider>

            <Footer />
        </div>
    );
};

export default App;
