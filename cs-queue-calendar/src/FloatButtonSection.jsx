import React, { useContext } from "react";
import { FloatButton, Tooltip } from "antd";
import { ThemeContext } from "./ThemeContext";
import {
    PlusOutlined,
    LinkedinOutlined,
    TwitterOutlined,
    PaperClipOutlined,
    SendOutlined,
    BgColorsOutlined,
    GithubOutlined,
    NotificationOutlined,
} from "@ant-design/icons";

const FloatButtonSection = () => {
    const { toggleTheme } = useContext(ThemeContext);

    const openLink = (link) => {
        window.open(link, "_blank");
    };

    return (
        <FloatButton.Group
            trigger="click"
            type="primary"
            icon={<PlusOutlined />}
            direction="up"
        >
            <Tooltip title="CS Internship - Queue Group" placement="right">
                <FloatButton
                    icon={<SendOutlined />}
                    onClick={() => openLink("https://t.me/+5PuhQ2hDIy1lNWRi")}
                />
            </Tooltip>

            <Tooltip title="CS Internship - Telegram Channel" placement="right">
                <FloatButton
                    icon={<NotificationOutlined />}
                    onClick={() => openLink("https://t.me/cs_internship")}
                />
            </Tooltip>

            <Tooltip title="CS Internship - GitHub" placement="right">
                <FloatButton
                    icon={<GithubOutlined />}
                    onClick={() => openLink("https://github.com/cs-internship")}
                />
            </Tooltip>

            <Tooltip title="CS Internship on LinkedIn" placement="right">
                <FloatButton
                    icon={<LinkedinOutlined />}
                    onClick={() =>
                        openLink(
                            "https://www.linkedin.com/company/cs-internship/"
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
                    onClick={toggleTheme}
                />
            </Tooltip>
        </FloatButton.Group>
    );
};

export default FloatButtonSection;
