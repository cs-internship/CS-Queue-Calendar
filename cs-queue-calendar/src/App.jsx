import React, { useContext, useState } from "react";
import { ConfigProvider, theme } from "antd";
import Header from "./Header";
import Footer from "./Footer";
import CSCalendar from "./CSCalendar";
import { ThemeContext } from "./ThemeContext";
import FloatButtonSection from "./FloatButtonSection";
import AnnouncementModule from "./AnnouncementModule";

const App = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

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
            <FloatButtonSection setIsModalOpen={setIsModalOpen} />
            <ConfigProvider direction={"rtl"}>
                <AnnouncementModule
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                />
            </ConfigProvider>
        </ConfigProvider>
    );
};

export default App;
