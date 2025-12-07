import React from "react";
import { Card, Typography, Space } from "antd";

const CalendarIntro = () => {
    const { Title, Paragraph, Link, Text } = Typography;

    return (
        <Card bordered={false} className="calendar-intro" dir="rtl">
            <Space
                direction="vertical"
                size={4}
                className="calendar-intro__body"
            >
                <Text className="calendar-intro__badge">راهنمای تقویم</Text>
                <Title level={4} className="calendar-intro__title">
                    تقویم رسمی جلسات پرسش‌وپاسخ
                </Title>
                <Paragraph className="calendar-intro__paragraph">
                    این تقویم، مرجع رسمی زمان‌بندی جلسات پرسش‌وپاسخ مراحل ورود
                    به برنامه CS Internship است و ساختار برگزاری جلسات گروه صف
                    را در طول هفته نمایش می‌دهد.
                </Paragraph>
                <Paragraph className="calendar-intro__paragraph">
                    برای آشنایی با فرایند ورود، می‌توانید پیام پین‌شده‌ی توضیحات
                    کامل مسیر ورود را از اینجا مطالعه کنید:{" "}
                    <Link
                        href="https://t.me/c/1191433472/3799"
                        target="_blank"
                        rel="cs-internship-entry-process"
                    >
                        لینک توضیحات فرایند ورود به برنامه
                    </Link>
                    .
                </Paragraph>
                <Paragraph className="calendar-intro__paragraph">
                    در تقویم، نوع و زمان هر جلسه مشخص شده است. با انتخاب هر
                    رویداد، جزئیات آن شامل تاریخ، ساعت، عنوان جلسه و لینک حضور
                    قابل مشاهده خواهد بود.
                </Paragraph>
            </Space>
        </Card>
    );
};

export default CalendarIntro;
