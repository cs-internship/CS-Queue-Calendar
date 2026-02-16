import { useContext, useEffect, useState } from "react";
import { ConfigProvider, theme } from "antd";
import Footer from "./components/Footer";
import CSCalendar from "./components/CSCalendar";
import FloatButtonSection from "./components/FloatButtonSection";
import AnnouncementModule from "./components/AnnouncementModule";
import Toastify from "./components/Toastify";
import { ThemeContext } from "./store/Theme/ThemeContext";

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

    useEffect(() => {
        const timer = setTimeout(() => {
            document.body.classList.add("loaded");
        }, 0);

        return () => clearTimeout(timer);
    }, []);

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
