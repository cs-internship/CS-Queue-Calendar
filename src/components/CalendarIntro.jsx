import React from "react";
import { Card, Typography, Space } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

const CalendarIntro = () => {
    const { Paragraph, Link, Title } = Typography;

    return (
        <Card bordered={false} className="calendar-intro" dir="rtl">
            <Space align="start">
                <div className="calendar-intro__icon">
                    <InfoCircleOutlined />
                </div>

                <Space
                    direction="vertical"
                    // size={8}
                    className="calendar-intro__content"
                >
                    <Title level={4} className="calendar-intro__title">
                        تقویم جلسات گروه صف برنامه CS Internship
                    </Title>

                    <Paragraph className="calendar-intro__paragraph">
                        این تقویم، مرجع رسمی زمان‌بندی جلسات پرسش‌وپاسخ مراحل
                        ورود به برنامه CS Internship است و به شما کمک می‌کند
                        تاریخ جلسهٔ مربوط به مرحله‌ای که در آن قرار دارید را
                        پیدا کنید.
                    </Paragraph>

                    <Paragraph className="calendar-intro__paragraph">
                        برای آشنایی با فرایند ورود به برنامه، می‌توانید{" "}
                        <Link
                            href="https://t.me/c/1191433472/3799"
                            target="_blank"
                            rel="cs-internship-entry-process"
                        >
                            پیام پین‌شدهٔ توضیحات کامل مسیر ورود
                        </Link>{" "}
                        را مطالعه کنید.
                    </Paragraph>

                    <Paragraph className="calendar-intro__paragraph calendar-intro__single-line">
                        در این تقویم، نوع جلسه، تاریخ شمسی و میلادی، ساعت
                        برگزاری جلسات، لینک حضور و منبع مطالعاتی (در صورت وجود)
                        مشخص شده است. با انتخاب هر رویداد، جزئیات کامل همان جلسه
                        نمایش داده می‌شود.
                    </Paragraph>
                </Space>
            </Space>
        </Card>
    );
};

export default CalendarIntro;
