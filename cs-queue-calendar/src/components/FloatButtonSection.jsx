import React, { useContext, useState } from "react";
import { FloatButton, Tooltip } from "antd";
import { ThemeContext } from "../store/ThemeContext";
import {
    PlusOutlined,
    LinkedinOutlined,
    TwitterOutlined,
    PaperClipOutlined,
    SendOutlined,
    BgColorsOutlined,
    GithubOutlined,
    NotificationOutlined,
    CopyOutlined,
} from "@ant-design/icons";

const FloatButtonSection = ({ setIsModalOpen }) => {
    const { toggleTheme } = useContext(ThemeContext);

    const openLink = (link) => {
        window.open(link, "_blank");
    };

    const [showTransition, setShowTransition] = useState(false);

    const handleChangeTheme = () => {
        setShowTransition(true);

        const timer1 = setTimeout(() => {
            setShowTransition(false);
        }, 1200);

        const timer2 = setTimeout(() => {
            toggleTheme();
        }, 400);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    };

    return (
        <>
            <FloatButton.Group
                trigger="click"
                type="primary"
                icon={<PlusOutlined />}
                direction="up"
            >
                <Tooltip title="CS Internship - Queue Group" placement="right">
                    <FloatButton
                        icon={<SendOutlined />}
                        onClick={() =>
                            openLink("https://t.me/+5PuhQ2hDIy1lNWRi")
                        }
                    />
                </Tooltip>

                <Tooltip
                    title="CS Internship - Telegram Channel"
                    placement="right"
                >
                    <FloatButton
                        icon={<NotificationOutlined />}
                        onClick={() => openLink("https://t.me/cs_internship")}
                    />
                </Tooltip>

                <Tooltip title="CS Internship on GitHub" placement="right">
                    <FloatButton
                        icon={<GithubOutlined />}
                        onClick={() =>
                            openLink("https://github.com/cs-internship")
                        }
                    />
                </Tooltip>

                <Tooltip title="CS Internship on LinkedIn" placement="right">
                    <FloatButton
                        icon={<LinkedinOutlined />}
                        onClick={() =>
                            openLink(
                                "https://www.linkedin.com/search/results/all/?keywords=%23cs_internship&origin=GLOBAL_SEARCH_HEADER&sid=L3k"
                            )
                        }
                    />
                </Tooltip>

                <Tooltip title="CS Internship on X (Twitter)" placement="right">
                    <FloatButton
                        icon={<TwitterOutlined />}
                        onClick={() =>
                            openLink("https://x.com/hashtag/cs_internship")
                        }
                    />
                </Tooltip>

                <Tooltip title="CS Internship on Virgool" placement="right">
                    <FloatButton
                        icon={<PaperClipOutlined />}
                        onClick={() =>
                            openLink(
                                "https://virgool.io/cs-internship/cs-internship-k3j2hx4wgvga"
                            )
                        }
                    />
                </Tooltip>

                <Tooltip title="Change Theme" placement="right">
                    <FloatButton
                        icon={<BgColorsOutlined />}
                        onClick={handleChangeTheme}
                    />
                </Tooltip>

                <Tooltip title="Announcement Message" placement="right">
                    <FloatButton
                        icon={<CopyOutlined />}
                        onClick={() =>
                            setIsModalOpen((pervState) => !pervState)
                        }
                    />
                </Tooltip>
            </FloatButton.Group>

            {showTransition && <div className="fancy-theme-transition"></div>}
        </>
    );
};

export default FloatButtonSection;
