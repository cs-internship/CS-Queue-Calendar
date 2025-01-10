import React from "react";
import { ConfigProvider, theme } from "antd";
import Header from "./Header";
import Footer from "./Footer";
import CSCalendar from "./CSCalendar";

const App = () => {
    return (
        <div>
            <Header />

            <ConfigProvider
                theme={{
                    algorithm: theme.darkAlgorithm,
                }}
            >
                <CSCalendar />
            </ConfigProvider>

            <Footer />
        </div>
    );
};

export default App;
