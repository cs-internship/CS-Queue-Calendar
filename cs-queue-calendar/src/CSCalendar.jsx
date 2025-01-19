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

import moment from "moment";

import "moment/locale/fa"; // برای استفاده از زبان فارسی

import momentJalaali from "moment-jalaali";

moment.locale("fa"); // فعال کردن زبان فارسی

dayjs.locale("fa");
dayjs.extend(weekday);
dayjs.extend(localeData);

const CSCalendar = ({ setAnnouncementData }) => {
    const today = dayjs();

    const [value, setValue] = useState(today);
    const [selectedValue, setSelectedValue] = useState(today);
    const [eventDescription, setEventDescription] = useState("");

    const weekDays = [
        "شنبه",
        "یک‌شنبه",
        "دوشنبه",
        "سه‌شنبه",
        "چهارشنبه",
        "پنج‌شنبه",
        "جمعه",
    ];

    const events = [
        {
            title: "جلسه مرحله‌ اول: پرسش‌وپاسخ داکیومنت CS Overview",
        },
        {
            title: "جلسه مرحله‌ دوم: پرسش‌وپاسخ فیلم معرفی برنامه‌ CS Internship",
        },
        {
            title: "جلسه مرحله‌ چهارم: مصاحبه‌ گروه تعیین‌شده برای این تاریخ",
        },
        {
            title: "جلسه مرحله‌ سوم: پرسش‌وپاسخ داکیومنت فرآیند‌های برنامه CS Internship",
        },
    ];

    const getEventForDate = (date) => {
        const startDate = dayjs("2025-01-13");

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
        setSelectedValue(newValue);

        const event = getEventForDate(newValue);
        if (event) {
            setEventDescription(`${event.title} - ساعت ۱۸:۰۰ تا ۱۹:۰۰`);
        } else {
            setEventDescription("برای این تاریخ رویدادی وجود ندارد.");
        }
    };

    const onPanelChange = (newValue) => {
        setValue(newValue);
    };

    const handleTodayClick = () => {
        setValue(today);
        setSelectedValue(today);

        const event = getEventForDate(today);
        if (event) {
            setEventDescription(`${event.title} - ساعت ۱۸:۰۰ تا ۱۹:۰۰`);
        } else {
            setEventDescription("برای این تاریخ رویدادی وجود ندارد.");
        }
    };

    const handleMonthYearChange = (month, year) => {
        setValue(value.month(month).year(year));
    };

    const dateCellRender = (date) => {
        const event = getEventForDate(date);
        return event ? <Badge status="success" text={event.title} /> : null;
    };

    useEffect(() => {
        const saturdayDate = moment().startOf("week");

        const startWeekDate = saturdayDate
            .clone()
            .add(2, "day")
            .format("YYYY/M/D");
        const endWeekDate = saturdayDate
            .clone()
            .add(9, "day")
            .format("YYYY/M/D");

        const firstEventDate = saturdayDate
            .clone()
            .add(3, "day")
            .format("YYYY/M/D");
        const secondEventDate = saturdayDate
            .clone()
            .add(8, "day")
            .format("YYYY/M/D");

        const firstEvent = getEventForDate(saturdayDate.clone().add(3, "day"));
        const secondEvent = getEventForDate(saturdayDate.clone().add(8, "day"));

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
    }, []);

    useEffect(() => {
        const tableHeaderItems = Array.from(
            document.querySelectorAll(".ant-picker-content thead tr th")
        );

        tableHeaderItems.map(
            (item, index) => (item.textContent = weekDays[index])
        );

        return () => console.log("Aloha");
    }, []);

    return (
        <>
            <Calendar
                value={value}
                onSelect={onSelect}
                onPanelChange={onPanelChange}
                dateCellRender={dateCellRender}
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
                                <Button onClick={handleTodayClick}>
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
                        weeks: weekDays,
                    },
                    firstDayOfWeek: 6,
                }}
            />

            <ConfigProvider direction={"rtl"}>
                <Alert
                    message={eventDescription || "تاریخی انتخاب نشده است."}
                    type="info"
                    showIcon
                />
            </ConfigProvider>
        </>
    );
};

export default CSCalendar;
