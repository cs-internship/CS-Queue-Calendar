import React from "react";
import MyCalendar1 from "./MyCalendar1";
import MyCalendar2 from "./MyCalendar2";
import { ConfigProvider, theme } from "antd";
import Header from "./Header";

const App = () => {
    return (
        <div>
            <Header />

            <ConfigProvider
                theme={{
                    // algorithm: theme.darkAlgorithm,
                }}
            >
                <MyCalendar2 />
            </ConfigProvider>
        </div>
    );
};

export default App;
