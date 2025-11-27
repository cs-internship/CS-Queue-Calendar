import React, { useEffect, useState } from "react";
import { Calendar, Button, Select, Tag, Tooltip, Flex } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/fa";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import moment from "jalali-moment";
import EventPopup from "./EventPopup";
import { events } from "../constants/events";
import { startCalendarDate } from "../constants/startCalendarDate";
import { persianWeekDays } from "../constants/persianWeekDays";

moment.locale("fa");
dayjs.locale("fa");
dayjs.extend(weekday);
dayjs.extend(localeData);

const CSCalendar = ({ setAnnouncementData, addToCurrentWeek }) => {
    const today = dayjs();

    const [value, setValue] = useState(today);
    const [popupData, setPopupData] = useState({
        visible: false,
        event: null,
        date: null,
        rect: null,
    });

    const [yearMonth, setYearMonth] = useState("");

    const getEventForDate = (date) => {
        const startDate = dayjs(startCalendarDate);

        if (date.isBefore(startDate, "day")) {
            return null;
        }

        const daysSinceStart = date.diff(startDate, "day");
        const weekNumber = Math.floor(daysSinceStart / 7) % 2;

        if (date.day() === 2) {
            return events[weekNumber];
        } else if (date.day() === 0) {
            return events[2 + weekNumber];
        }
        return null;
    };

    const onSelect = (newValue) => {
        setValue(newValue);
    };

    const handleMonthYearChange = (month, year) => {
        setValue(value.month(month).year(year));
    };

    const dateCellRender = (date) => {
        const event = getEventForDate(date);

        const handleOpen = (e) => {
            e.stopPropagation();

            setValue(date);

            if (!event) {
                setPopupData({
                    visible: false,
                    event: null,
                    date: null,
                    rect: null,
                });
                return;
            }
            const rect = e.currentTarget.getBoundingClientRect();

            if (
                popupData.visible &&
                popupData.date &&
                date.isSame(popupData.date, "day")
            ) {
                setPopupData({
                    visible: false,
                    event: null,
                    date: null,
                    rect: null,
                });
                return;
            }

            setValue(date);
            setPopupData({ visible: true, event, date, rect });
        };

        const stageLabel =
            (event &&
                (event.stage ||
                    (event.title &&
                        (event.title.match(/مرحله\s*[^\s]+/)?.[0] ||
                            event.title.replace(/^جلسه\s*/u, ""))) ||
                    (event.fullName &&
                        event.fullName.replace(/^جلسه\s*/u, "")))) ||
            "جلسه";

        const greg = date.format("YYYY-MM-DD");
        const persianDate = moment(date.toDate())
            .locale("fa")
            .format("jYYYY/jMM/jDD");

        const tooltipTitle = (
            <div className="tooltip-style">
                <div>{persianDate}</div>
                <div>{greg}</div>
            </div>
        );

        return (
            <Tooltip
                title={tooltipTitle}
                placement="top"
                mouseEnterDelay={0.12}
                mouseLeaveDelay={0.12}
            >
                <div
                    role="button"
                    tabIndex={0}
                    data-date={date.format("YYYY-MM-DD")}
                    onClick={handleOpen}
                    onKeyDown={(e) => e.key === "Enter" && handleOpen(e)}
                    className="calendar-cell-with-event"
                >
                    {date.isSame(dayjs(), "day") && (
                        <span className="today-badge" aria-hidden>
                            <span className="today-badge__label">Today</span>
                        </span>
                    )}
                    <Tag className="date-label">{date.date()}</Tag>

                    {event && (
                        <Tag
                            color={event.color || "#888"}
                            className="stage-tag"
                        >
                            {stageLabel}
                        </Tag>
                    )}
                </div>
            </Tooltip>
        );
    };

    useEffect(() => {
        const calendarRoot = document.querySelector(".ant-picker-calendar");

        const delegator = (e) => {
            if (e.target.closest && e.target.closest(".event-popup")) {
                return;
            }

            const td = e.target.closest && e.target.closest(".ant-picker-cell");
            if (!td) {
                return;
            }

            const wrapper = td.querySelector(
                ".calendar-cell-with-event[data-date]"
            );
            if (!wrapper) {
                return;
            }

            if (wrapper.contains(e.target)) {
                return;
            }

            const dateStr = wrapper.getAttribute("data-date");
            if (!dateStr) {
                return;
            }

            const clickedDate = dayjs(dateStr);
            const ev = getEventForDate(clickedDate);
            if (!ev) {
                return;
            }

            if (
                popupData.visible &&
                popupData.date &&
                clickedDate.isSame(popupData.date, "day")
            ) {
                setPopupData({
                    visible: false,
                    event: null,
                    date: null,
                    rect: null,
                });
                return;
            }

            const rect = wrapper.getBoundingClientRect();
            setValue(clickedDate);
            setPopupData({ visible: true, event: ev, date: clickedDate, rect });
        };

        if (
            calendarRoot &&
            typeof calendarRoot.addEventListener === "function"
        ) {
            calendarRoot.addEventListener("click", delegator);
            return () => calendarRoot.removeEventListener("click", delegator);
        }
    }, [yearMonth, popupData]);

    useEffect(() => {
        const saturdayDate = moment()
            .add(addToCurrentWeek, "day")
            .startOf("week");

        const startWeekDate = saturdayDate
            .clone()
            .add(9, "day")
            .format("YYYY/M/D");

        const endWeekDate = saturdayDate
            .clone()
            .add(16, "day")
            .format("YYYY/M/D");

        const firstEventDate = saturdayDate
            .clone()
            .add(10, "day")
            .format("YYYY/M/D");
        const secondEventDate = saturdayDate
            .clone()
            .add(15, "day")
            .format("YYYY/M/D");

        const startDate = moment("2025-01-13", "YYYY-MM-DD")
            .locale("fa")
            .format("YYYY-MM-DD HH:mm:ss");

        let firstEvent = "برای این تاریخ رویدادی وجود ندارد.";
        let secondEvent = "برای این تاریخ رویدادی وجود ندارد.";

        if (saturdayDate.isAfter(startDate, "day")) {
            const fe = getEventForDate(
                dayjs(saturdayDate.clone().add(10, "day").toDate())
            );
            const se = getEventForDate(
                dayjs(saturdayDate.clone().add(15, "day").toDate())
            );

            if (fe) firstEvent = fe.fullName || fe.title;
            if (se) secondEvent = se.fullName || se.title;
        }

        const newAnnouncementData = {
            startWeekDate,
            endWeekDate,
            firstEventDate,
            secondEventDate,
            firstEvent,
            secondEvent,
        };

        setAnnouncementData((prev) => {
            if (JSON.stringify(prev) !== JSON.stringify(newAnnouncementData)) {
                return newAnnouncementData;
            }
            return prev;
        });
    }, [addToCurrentWeek, setAnnouncementData]);

    useEffect(() => {
        const tableHeaderItems = Array.from(
            document.querySelectorAll(".ant-picker-content thead tr th")
        );

        tableHeaderItems.map(
            (item, index) => (item.textContent = persianWeekDays[index])
        );

        const todayBtn = document.querySelector(".today-btn");
        if (todayBtn && typeof todayBtn.click === "function") {
            todayBtn.click();
        }
    }, []);

    useEffect(() => {
        const currentMonth = value.month();
        const currentYear = value.year();

        setYearMonth(currentMonth.toString() + currentYear.toString());
    }, [value]);

    return (
        <Flex justify="space-between" vertical className="calendar-section">
            <Calendar
                value={value}
                onSelect={onSelect}
                onPanelChange={(newValue) => {
                    setValue(newValue);
                }}
                cellRender={dateCellRender}
                headerRender={({ value, onChange }) => {
                    const currentMonth = value.month();
                    const currentYear = value.year();
                    const months = dayjs.months();
                    const years = Array.from(
                        { length: 20 },
                        (_, i) => currentYear - 10 + i
                    );

                    return (
                        <Flex
                            justify="space-between"
                            align="center"
                            className="calendar-header"
                        >
                            <Flex gap={8}>
                                <Button
                                    onClick={() =>
                                        onChange(value.subtract(1, "month"))
                                    }
                                >
                                    ماه قبل
                                </Button>
                                <Button
                                    className="today-btn"
                                    onClick={() => onSelect(today)}
                                >
                                    امروز
                                </Button>
                                <Button
                                    onClick={() =>
                                        onChange(value.add(1, "month"))
                                    }
                                >
                                    ماه بعد
                                </Button>
                            </Flex>
                            <Flex gap={8}>
                                <Select
                                    value={currentYear}
                                    onChange={(newYear) =>
                                        handleMonthYearChange(
                                            currentMonth,
                                            newYear
                                        )
                                    }
                                >
                                    {years.map((year) => (
                                        <Select.Option key={year} value={year}>
                                            {year}
                                        </Select.Option>
                                    ))}
                                </Select>
                                <Select
                                    value={currentMonth}
                                    className="month-select"
                                    onChange={(newMonth) =>
                                        handleMonthYearChange(
                                            newMonth,
                                            currentYear
                                        )
                                    }
                                >
                                    {months.map((month, index) => (
                                        <Select.Option
                                            key={index}
                                            value={index}
                                        >
                                            {month}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Flex>
                        </Flex>
                    );
                }}
                locale={{
                    lang: {
                        locale: "fa",
                        today: "امروز",
                        weeks: persianWeekDays,
                    },
                    firstDayOfWeek: 6,
                }}
            />

            <EventPopup
                visible={popupData.visible}
                anchorRect={popupData.rect}
                date={popupData.date}
                event={popupData.event}
                onClose={() =>
                    setPopupData({
                        visible: false,
                        event: null,
                        date: null,
                        rect: null,
                    })
                }
            />
        </Flex>
    );
};

export default CSCalendar;
