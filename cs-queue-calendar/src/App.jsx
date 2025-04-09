import React, { useContext, useEffect, useState } from "react";
import { ConfigProvider, theme } from "antd";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CSCalendar from "./components/CSCalendar";
import { ThemeContext } from "./store/ThemeContext";
import FloatButtonSection from "./components/FloatButtonSection";
import AnnouncementModule from "./components/AnnouncementModule";
import Toastify from "./components/Toastify";

const App = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [toastifyObj, setToastifyObj] = useState("");
    const [addToCurrentWeek, setAddToCurrentWeek] = useState(0);
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
            <CSCalendar
                setAnnouncementData={setAnnouncementData}
                addToCurrentWeek={addToCurrentWeek}
            />
            <Footer />
            <FloatButtonSection setIsModalOpen={setIsModalOpen} />
            <ConfigProvider direction={"rtl"}>
                <AnnouncementModule
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    setToastifyObj={setToastifyObj}
                    announcementData={announcementData}
                    setAddToCurrentWeek={setAddToCurrentWeek}
                />
            </ConfigProvider>
        </ConfigProvider>
    );
};

export default App;
