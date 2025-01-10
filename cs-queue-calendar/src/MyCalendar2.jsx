import React, { useEffect, useState } from "react";
import { Alert, Calendar, Button, Badge, Select, ConfigProvider } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/fa";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";

dayjs.locale("fa");
dayjs.extend(weekday);
dayjs.extend(localeData);

const MyCalendar2 = () => {
    const today = dayjs();

    const [value, setValue] = useState(today);
    const [selectedValue, setSelectedValue] = useState(today);
    const [eventDescription, setEventDescription] = useState("");

    const events = [
        { day: 2, title: "جلسه مرحله‌ اول: پرسش‌وپاسخ داکیومنت CS Overview" },
        { day: 0, title: "جلسه مصاحبه‌ گروه تعیین‌شده برای این تاریخ" },
        {
            day: 2,
            title: "جلسه مرحله‌ دوم: پرسش‌وپاسخ فیلم معرفی برنامه‌ CS Internship",
        },
        {
            day: 0,
            title: "جلسه مرحله‌ سوم: پرسش‌وپاسخ داکیومنت CS Internship Prerequisites",
        },
    ];

    const getEventForDate = (date) => {
        const weekNumber =
            Math.floor(date.diff(today.startOf("week"), "week") / 2) % 2;
        const eventIndex =
            (weekNumber * 2 + (date.day() === 0 ? 1 : 0)) % events.length;
        return date.day() === 0 || date.day() === 2 ? events[eventIndex] : null;
    };

    const onSelect = (newValue) => {
        setValue(newValue);
        setSelectedValue(newValue);

        const event = getEventForDate(newValue);

        console.log(newValue);

        if (event) {
            setEventDescription(`${event.title}`);
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
        setEventDescription("");
    };

    const handleMonthYearChange = (month, year) => {
        setValue(value.month(month).year(year));
    };

    const dateCellRender = (date) => {
        const event = getEventForDate(date);
        return event ? <Badge status="success" text={event.title} /> : null;
    };

    const weekDays = [
        "شنبه",
        "یک‌شنبه",
        "دوشنبه",
        "سه‌شنبه",
        "چهارشنبه",
        "پنج‌شنبه",
        "جمعه",
    ];

    useEffect(() => {
        const tableHeaderItems = Array.from(
            document.querySelectorAll(".ant-picker-content thead tr th")
        );

        console.log(tableHeaderItems);

        tableHeaderItems.map(
            (item, index) => (item.textContent = weekDays[index])
        );
    }, []);

    return (
        <>
            <ConfigProvider direction={"rtl"}>
                <Alert
                    message={eventDescription || "تاریخی انتخاب نشده است."}
                    type="info"
                    showIcon
                    style={{ marginBottom: 16 }}
                />
            </ConfigProvider>

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
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <div>
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
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <Select
                                    value={currentYear}
                                    onChange={(newYear) =>
                                        handleMonthYearChange(
                                            currentMonth,
                                            newYear
                                        )
                                    }
                                    style={{ width: 100, marginRight: 8 }}
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
                                    style={{ width: 120 }}
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
                            </div>
                        </div>
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
        </>
    );
};

export default MyCalendar2;
