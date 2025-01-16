import React, { useContext } from "react";
import { ConfigProvider, theme } from "antd";
import Header from "./Header";
import Footer from "./Footer";
import CSCalendar from "./CSCalendar";
import { ThemeContext } from "./ThemeContext";
import FloatButtonSection from "./FloatButtonSection";

const App = () => {
    const { theme: currentTheme } = useContext(ThemeContext);

    return (
        <ConfigProvider
            theme={{
                algorithm:
                    currentTheme === "dark"
                        ? theme.darkAlgorithm
                        : theme.defaultAlgorithm,
            }}
        >
            <Header />
            <CSCalendar />
            <Footer />
            <FloatButtonSection />
        </ConfigProvider>
    );
};

export default App;
