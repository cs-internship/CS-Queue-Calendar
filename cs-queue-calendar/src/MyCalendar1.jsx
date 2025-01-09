import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment-jalaali";
import "moment/locale/fa";
import "react-big-calendar/lib/css/react-big-calendar.css";

moment.locale("fa");
moment.loadPersian({ usePersianDigits: true });
const localizer = momentLocalizer(moment);

const generateRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const monthColors = Array.from({ length: 12 }, () => generateRandomColor());

console.log(monthColors);

const generateEvents = () => {
    const events = [];
    const currentYear = moment().jYear();

    for (let month = 0; month < 12; month++) {
        for (let day = 1; day <= 31; day++) {
            const date = moment(
                `${currentYear}-${month + 1}-${day}`,
                "jYYYY-jMM-jDD"
            );

            if (!date.isValid()) continue;

            const dayOfWeek = date.day();

            const weekNumber = date.week();
            const isEvenWeek = weekNumber % 2 === 0;
            const weekText = isEvenWeek ? "زوج" : "فرد";

            if (dayOfWeek === 1 || dayOfWeek === 3) {
                events.push({
                    title: `سلام ${
                        dayOfWeek === 1 ? "یکشنبه" : "سه‌شنبه"
                    } (${weekText})`,
                    start: date.hour(18).minute(0).toDate(),
                    end: date.hour(19).minute(0).toDate(),
                    allDay: false,
                    color: dayOfWeek === 1 ? "blue" : "red",
                });
            }
        }
    }

    return events;
};

const CustomToolbar = (props) => {
    const { label, onNavigate } = props;
    const currentDate = moment(props.date);
    const currentMonthIndex = currentDate.jMonth();
    const nextMonthIndex = currentDate.clone().add(1, "jMonth").jMonth();
    const currentMonthColor = monthColors[currentMonthIndex];
    const nextMonthColor = monthColors[nextMonthIndex];

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px",
            }}
        >
            <button
                onClick={() => onNavigate("PREV")}
                style={{
                    padding: "5px 10px",
                    backgroundColor: "#f0f0f0",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    cursor: "pointer",
                }}
            >
                ماه قبل
            </button>
            <button
                onClick={() => onNavigate("TODAY")}
                style={{
                    padding: "5px 10px",
                    backgroundColor: "#007BFF",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                }}
            >
                امروز
            </button>
            <button
                onClick={() => onNavigate("NEXT")}
                style={{
                    padding: "5px 10px",
                    backgroundColor: "#f0f0f0",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    cursor: "pointer",
                }}
            >
                ماه بعد
            </button>
            <div
                style={{
                    textAlign: "center",
                    fontWeight: "bold",
                }}
                dangerouslySetInnerHTML={{
                    __html: `
                        <span style="color: ${currentMonthColor}; font-weight: bold;">
                            ${currentDate.format("jMMMM jYYYY")}
                        </span> - 
                        <span style="color: ${nextMonthColor}; font-weight: bold;">
                            ${currentDate
                                .clone()
                                .add(1, "jMonth")
                                .format("jMMMM jYYYY")}
                        </span>
                    `,
                }}
            />
        </div>
    );
};

const MyCalendar1 = () => {
    const events = generateEvents();

    const getMonthRange = (date) => {
        const startOfMonth = moment(date).startOf("jMonth").toDate();
        const endOfMonth = moment(date).endOf("jMonth").toDate();
        return { start: startOfMonth, end: endOfMonth };
    };

    return (
        <div style={{ height: "500px", margin: "20px" }}>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: "500px" }}
                views={["month"]}
                defaultView="month"
                culture="fa"
                messages={{
                    next: "ماه بعد",
                    previous: "ماه قبل",
                    today: "امروز",
                    month: "ماه",
                }}
                formats={{
                    dateFormat: (date, culture, localizer) =>
                        moment(date).format("jD"),
                    dayFormat: (date, culture, localizer) =>
                        moment(date).format("ddd jD"),
                }}
                eventPropGetter={(event) => ({
                    style: {
                        backgroundColor: event.color,
                        color: "white",
                    },
                })}
                dayPropGetter={(date) => {
                    const today = moment().startOf("day").toDate();
                    const { start, end } = getMonthRange(date);

                    if (date < start || date > end) {
                        return {
                            style: { visibility: "hidden" },
                        };
                    }

                    const monthIndex = moment(date).jMonth();
                    const backgroundColor =
                        date.getTime() === today.getTime()
                            ? "white"
                            : monthColors[monthIndex];

                    return {
                        style: {
                            backgroundColor,
                            color:
                                date.getTime() === today.getTime()
                                    ? "white"
                                    : "black",
                        },
                    };
                }}
                components={{
                    toolbar: CustomToolbar,
                }}
            />
        </div>
    );
};

export default MyCalendar1;
