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
// import moment from "moment";
// import "moment/locale/fa";

import moment from "jalali-moment";

moment.locale("fa");
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
            title: "جلسه مرحله‌ چهارم: مصاحبه‌ گروه تعیین‌شده",
        },
        {
            title: "جلسه مرحله‌ سوم: پرسش‌وپاسخ داکیومنت فرآیند‌های برنامه CS Internship",
        },
    ];

    const getEventForDate = (date) => {
        const startDate = dayjs("2025-01-13");

        // console.log(date);

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

    const handleMonthYearChange = (month, year) => {
        setValue(value.month(month).year(year));
    };

    const dateCellRender = (date) => {
        const event = getEventForDate(date);
        return event ? <Badge status="success" text={event.title} /> : null;
    };

    // const dateCellRender = (date) => {
    //     const gregorianDate = date.format("YYYY-MM-DD");
    //     const persianDate = moment(date.toDate()).format("jYYYY-jMM-jDD");

    //     const event = getEventForDate(date);

    //     return (
    //         <div title={`${gregorianDate}\n${persianDate}`}>
    //             {event ? (
    //                 <Badge status="success" text={event.title} />
    //             ) : (
    //                 <div>hi</div>
    //             )}
    //         </div>
    //     );
    // };

    useEffect(() => {
        const tds = document.querySelectorAll("td");

        tds.forEach((td) => {
            const gregorianDate = td.title;
            if (gregorianDate) {
                // const persianDate = moment(gregorianDate, "YYYY/M/D").format(
                //     "jYYYY/jMM/jDD"
                // );
                // console.log(gregorianDate);

                console.log(gregorianDate.split("\n")[0]);

                // const persianDate = moment(
                //     gregorianDate.split("\n")[0].toString(),
                //     "YYYY-MM-DD"
                // )
                //     .locale("fa")
                //     .format("jYYYY-jMM-jDD");
                const persianDate = moment("2025-01-31", "YYYY-MM-DD")
                    .locale("fa")
                    .format("YYYY/M/D");

                console.log("PER >>", persianDate);

                td.title = `${gregorianDate}\n${persianDate}`;
            }
        });
    }, [value]);

    useEffect(() => {

        const miladiDate = "2025-01-02";
        const shamsiDate = moment(miladiDate, "YYYY-MM-DD")
            .locale("fa")
            .format("jYYYY-jMM-jDD");

        console.log("FAR30 >>", shamsiDate); // خروجی: 1403-10-12
    }, []);

    useEffect(() => {
        const saturdayDate = moment().add(10, "day").startOf("week");

        // console.log(saturdayDate.format("YYYY/M/D"));

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

        const firstEvent = getEventForDate(
            dayjs(saturdayDate.clone().add(10, "day").toDate())
        );
        const secondEvent = getEventForDate(
            dayjs(saturdayDate.clone().add(15, "day").toDate())
        );

        console.log("::", saturdayDate.clone().add(10, "day"));

        const newAnnouncementData = {
            startWeekDate,
            endWeekDate,
            firstEventDate,
            secondEventDate,
            firstEvent,
            secondEvent,
        };

        console.log(newAnnouncementData);

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
                                <Button onClick={() => onSelect(today)}>
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
