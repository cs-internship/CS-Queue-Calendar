import React from "react";
import MyCalendar2 from "./MyCalendar2";
import { ConfigProvider, theme } from "antd";
import Header from "./Header";
import Footer from "./Footer";

const App = () => {
    return (
        <div>
            <Header />

            <ConfigProvider
                theme={{
                    algorithm: theme.darkAlgorithm,
                }}
            >
                <MyCalendar2 />
            </ConfigProvider>

            <Footer />
        </div>
    );
};

export default App;
