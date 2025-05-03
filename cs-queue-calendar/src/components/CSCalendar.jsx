import React, { useEffect, useState } from "react";
import {
    Alert,
    Calendar,
    Button,
    Badge,
    Select,
    ConfigProvider,
    Flex,
} from "antd";
import dayjs from "dayjs";
import "dayjs/locale/fa";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import moment from "jalali-moment";
import { createTds } from "../utils/createTds";
import { events } from "../constants/events";
import { startCalendarDate } from "../constants/startCalendarDate";
import { persianWeekDays } from "../constants/persianWeekDays";
import { useIsMobile } from "./useIsMobile";
import CalendarEventCreator from "./CalendarEventCreator";

moment.locale("fa");
dayjs.locale("fa");
dayjs.extend(weekday);
dayjs.extend(localeData);

const CSCalendar = ({ setAnnouncementData, addToCurrentWeek }) => {
    const today = dayjs();

    const [value, setValue] = useState(today);
    const [eventDescription, setEventDescription] = useState("");
    const [yearMonth, setYearMonth] = useState("");

    const isMobile = useIsMobile();

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
        const event = getEventForDate(newValue);

        if (event) {
            setEventDescription(
                isMobile
                    ? `${event.title} - ساعت ۱۸:۰۰ تا ۱۹:۰۰`
                    : `${event.fullName} - ساعت ۱۸:۰۰ تا ۱۹:۰۰`
            );
        } else {
            setEventDescription("برای این تاریخ رویدادی وجود ندارد.");
        }
    };

    const onPanelChange = (newValue) => {
        setValue(newValue);
    };

    const handleMonthYearChange = (month, year) => {
        setValue(value.month(month).year(year));
    };

    const dateCellRender = (date) => {
        const event = getEventForDate(date);
        return event ? (
            <Badge
                status="success"
                text={isMobile ? `${event.title}` : `${event.fullName}`}
            />
        ) : null;
    };

    useEffect(() => {
        return () => {
            setTimeout(() => {
                createTds();
            }, 0);
        };
    }, [yearMonth]);

    useEffect(() => {
        const saturdayDate = moment()
            .add(addToCurrentWeek, "day")
            .startOf("week");

        // console.log("saturdayDate >>", saturdayDate);

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
            firstEvent = getEventForDate(
                dayjs(saturdayDate.clone().add(10, "day").toDate())
            ).fullName;
            secondEvent = getEventForDate(
                dayjs(saturdayDate.clone().add(15, "day").toDate())
            ).fullName;
        }

        const newAnnouncementData = {
            startWeekDate,
            endWeekDate,
            firstEventDate,
            secondEventDate,
            firstEvent,
            secondEvent,
        };

        // console.log("newAnnouncementData >>", newAnnouncementData);

        setAnnouncementData((prev) => {
            if (JSON.stringify(prev) !== JSON.stringify(newAnnouncementData)) {
                return newAnnouncementData;
            }
            return prev;
        });
    }, [addToCurrentWeek]);

    useEffect(() => {
        const tableHeaderItems = Array.from(
            document.querySelectorAll(".ant-picker-content thead tr th")
        );

        tableHeaderItems.map(
            (item, index) => (item.textContent = persianWeekDays[index])
        );

        document.querySelector(".today-btn").click();
    }, []);

    useEffect(() => {
        const currentMonth = value.month();
        const currentYear = value.year();

        setYearMonth(currentMonth.toString() + currentYear.toString());
    }, [value]);

    return (
        <>
            <Calendar
                value={value}
                onSelect={onSelect}
                onPanelChange={onPanelChange}
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

            <ConfigProvider direction={"rtl"}>
                <Alert
                    message={
                        <div className="event-description">
                            <div className="event-title">
                                {eventDescription}
                            </div>

                            {eventDescription !==
                                "برای این تاریخ رویدادی وجود ندارد." && (
                                <CalendarEventCreator
                                    eventDate={value.format("YYYY-MM-DD")}
                                    eventText={eventDescription}
                                    className="event-calender-btn"
                                />
                            )}
                        </div>
                    }
                    type="info"
                    showIcon
                />
            </ConfigProvider>
        </>
    );
};

export default CSCalendar;
