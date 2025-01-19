import React, { useContext, useState } from "react";
import { ConfigProvider, theme } from "antd";
import Header from "./Header";
import Footer from "./Footer";
import CSCalendar from "./CSCalendar";
import { ThemeContext } from "./ThemeContext";
import FloatButtonSection from "./FloatButtonSection";
import AnnouncementModule from "./AnnouncementModule";
import Toastify from "./Toastify";

const App = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [toastifyObj, setToastifyObj] = useState("");
    const [announcementData, setAnnouncementData] = useState({
        startWeekDate: "",
        endWeekDate: "",
        firstEventDate: "",
        secondEventDate: "",
        firstEvent: "",
        secondEvent: "",
    });

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
            <Toastify toastifyObj={toastifyObj} />
            <Header />
            <CSCalendar setAnnouncementData={setAnnouncementData} />
            <Footer />
            <FloatButtonSection setIsModalOpen={setIsModalOpen} />
            <ConfigProvider direction={"rtl"}>
                <AnnouncementModule
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    setToastifyObj={setToastifyObj}
                    announcementData={announcementData}
                />
            </ConfigProvider>
        </ConfigProvider>
    );
};

export default App;
