import React, { useEffect, useRef, useState } from "react";
import { Card, Typography, Space, Descriptions, Button, Flex } from "antd";
import {
    CalendarOutlined,
    ClockCircleOutlined,
    ExportOutlined,
    LinkOutlined,
    FileTextOutlined,
    CloseOutlined,
} from "@ant-design/icons";
import moment from "jalali-moment";
import CalendarEventCreator from "./CalendarEventCreator";
import "../assets/scss/components/_event-popup.scss";

const EventPopup = ({ visible, anchorRect, date, event, onClose }) => {
    const popupRef = useRef(null);

    const [mounted, setMounted] = useState(visible);
    const [isOpen, setIsOpen] = useState(false);

    const justOpenedRef = useRef(false);

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (justOpenedRef.current) {
                justOpenedRef.current = false;
                return;
            }

            if (
                popupRef.current &&
                !popupRef.current.contains(e.target) &&
                visible
            ) {
                onClose();
            }
        };

        const handleEscape = (e) => {
            if (e.key === "Escape") onClose();
        };

        document.addEventListener("mousedown", handleOutsideClick);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
            document.removeEventListener("keydown", handleEscape);
        };
    }, [visible, onClose]);

    useEffect(() => {
        if (visible) {
            setMounted(true);

            const enter = setTimeout(() => setIsOpen(true), 16);

            justOpenedRef.current = true;
            const guard = setTimeout(
                () => (justOpenedRef.current = false),
                160
            );

            return () => {
                clearTimeout(enter);
                clearTimeout(guard);
            };
        }

        setIsOpen(false);
        const leave = setTimeout(() => setMounted(false), 340);
        return () => clearTimeout(leave);
    }, [visible]);

    if (!mounted || !anchorRect) return null;

    const defaultWidth = Math.min(420, Math.max(300, anchorRect?.width || 320));

    let left =
        anchorRect.left +
        window.scrollX +
        anchorRect.width / 2 -
        defaultWidth / 2;
    left = Math.max(8, Math.min(left, window.innerWidth - defaultWidth - 8));

    const spaceBelow =
        window.innerHeight - (anchorRect.bottom - window.scrollY);
    const prefersAbove = spaceBelow < 260;
    const top = prefersAbove
        ? anchorRect.top + window.scrollY - 8 - 260
        : anchorRect.bottom + window.scrollY + 8;

    const arrowWidth = 14;
    let arrowLeft =
        anchorRect.left +
        window.scrollX +
        anchorRect.width / 2 -
        left -
        arrowWidth / 2;
    arrowLeft = Math.max(
        12,
        Math.min(arrowLeft, defaultWidth - 12 - arrowWidth)
    );

    const gregorian = date ? date.format("YYYY-MM-DD") : "-";
    const persian = date
        ? moment(date.toDate()).locale("fa").format("jYYYY/jMM/jDD")
        : "-";

    const transformOrigin = prefersAbove ? "bottom center" : "top center";

    return (
        <div
            ref={popupRef}
            className={`event-popup ${prefersAbove ? "event-popup--above" : ""} ${
                isOpen ? "is-mounted" : "is-closing"
            }`}
            style={{
                position: "absolute",
                top: top,
                left: left,
                width: defaultWidth,
            }}
            role="dialog"
            aria-modal="false"
        >
            <div
                className="event-popup__arrow"
                style={{ left: arrowLeft }}
                aria-hidden
            />
            <div
                className={`event-popup__content ${isOpen ? "is-open" : ""}`}
                style={{ transformOrigin }}
            >
                <Card
                    bordered={false}
                    size="small"
                    className="event-popup__card"
                    dir="rtl"
                >
                    <Space
                        direction="vertical"
                        size={10}
                        className="event-popup__body"
                    >
                        <Flex
                            align="center"
                            justify="space-between"
                            className="event-popup__header"
                        >
                            <Flex
                                align="center"
                                gap={10}
                                className="event-popup__header-left"
                            >
                                {event && (
                                    <span
                                        className="event-popup__color-dot"
                                        style={{
                                            background: event.color || "#444",
                                        }}
                                        aria-hidden
                                    />
                                )}
                                <div>
                                    <Typography.Title
                                        level={5}
                                        className="event-popup__header-title"
                                    >
                                        {event?.title || "OªOýOÝUOOO¦ OªU,O3UØ"}
                                    </Typography.Title>
                                    {event?.fullName && (
                                        <Typography.Text className="event-popup__subtitle">
                                            {event.fullName}
                                        </Typography.Text>
                                    )}
                                </div>
                            </Flex>
                            <Button
                                type="text"
                                size="small"
                                icon={<CloseOutlined />}
                                onClick={onClose}
                                className="event-popup__close-btn"
                            />
                        </Flex>

                        <Descriptions
                            column={1}
                            size="small"
                            colon={false}
                            className="event-popup__descriptions"
                            labelStyle={{ width: 120, fontWeight: 600 }}
                        >
                            <Descriptions.Item
                                label={
                                    <Space size={6}>
                                        <CalendarOutlined />
                                        {"O¦OOñUOOr O'U.O3UO"}
                                    </Space>
                                }
                            >
                                {persian}
                            </Descriptions.Item>
                            <Descriptions.Item
                                label={
                                    <Space size={6}>
                                        <CalendarOutlined />
                                        {"O¦OOñUOOr U.UOU,OO_UO"}
                                    </Space>
                                }
                            >
                                {gregorian}
                            </Descriptions.Item>
                            <Descriptions.Item
                                label={
                                    <Space size={6}>
                                        <FileTextOutlined />
                                        {"O1U+U^OU+ OªU,O3UØ"}
                                    </Space>
                                }
                            >
                                {event?.fullName || event?.title || "-"}
                            </Descriptions.Item>
                            <Descriptions.Item
                                label={
                                    <Space size={6}>
                                        <ClockCircleOutlined />
                                        {"OýU.OU+"}
                                    </Space>
                                }
                            >
                                {event?.time ||
                                    "O3OO1O¦ UñU,:UøUø O¦O UñU1:UøUø"}
                            </Descriptions.Item>
                        </Descriptions>

                        {(event?.link || event?.resource) && (
                            <Flex gap={8} wrap className="event-popup__actions">
                                {event?.link && (
                                    <Button
                                        type="primary"
                                        icon={<ExportOutlined />}
                                        href={event.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        size="small"
                                    >
                                        {"U.OUcOñU^O3OU?O¦ O¦UOU.Oý"}
                                    </Button>
                                )}
                                {event?.resource && (
                                    <Button
                                        type="default"
                                        icon={<LinkOutlined />}
                                        href={event.resource}
                                        target="_blank"
                                        rel="noreferrer"
                                        size="small"
                                    >
                                        {"U.O'OUØO_UØ U.U+O\"O1"}
                                    </Button>
                                )}
                            </Flex>
                        )}

                        {date && event && (
                            <div className="event-popup__creator">
                                <CalendarEventCreator
                                    eventDate={date.format("YYYY-MM-DD")}
                                    eventText={event.fullName || event.title}
                                />
                            </div>
                        )}
                    </Space>
                </Card>
            </div>
        </div>
    );
};

export default EventPopup;
