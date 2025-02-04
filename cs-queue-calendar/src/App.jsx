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

    useEffect(() => {
        return () =>
            console.log(`Aloha!

This program was built on 1403/10/30 for the CS Internship program with love.

🔗 You can check out the app source through the footer link.  
📖 Interested in joining the CS Internship? Read the CS page on Virgool.  
❓ Have questions? Feel free to ask in the CS Queue Telegram group.

Good luck! Hope to see you all very soon in the program :)
- A.S.`);
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
