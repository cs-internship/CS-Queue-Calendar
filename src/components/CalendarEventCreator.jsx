import { Button } from "antd";
import React from "react";

const CalendarEventCreator = ({ eventDate, eventText }) => {
    const createGoogleCalendarLink = () => {
        const [year, month, day] = eventDate.split("-").map(Number);

        const pad = (num) => num.toString().padStart(2, "0");
        const formatDate = (y, m, d, h, min) =>
            `${y}${pad(m)}${pad(d)}T${pad(h)}${pad(min)}00`;

        const start = formatDate(year, month, day, 18, 0);
        const end = formatDate(year, month, day, 19, 0);

        const description = `لطفاً توجه داشته باشید:
بازه زمانی حضور در جلسه از ساعت ۱۷:۴۵ تا ۱۸:۰۰ است. پس از ساعت ۱۸، امکان ورود به جلسه وجود نخواهد داشت.

لینک جلسه:
https://t.me/c/1191433472/3800

قوانین شرکت در جلسه:
https://t.me/c/1191433472/3801`;

        const googleCalendarUrl = `https://calendar.google.com/calendar/r/eventedit?text=${encodeURIComponent(
            eventText
        )}&dates=${start}/${end}&details=${encodeURIComponent(description)}`;

        return googleCalendarUrl;
    };

    return (
        <div className="calendar-event-creator">
            <Button
                onClick={() =>
                    window.open(createGoogleCalendarLink(), "_blank")
                }
            >
                اضافه کردن رویداد به گوگل کلندر
            </Button>
        </div>
    );
};

export default CalendarEventCreator;
