import React from "react";
import { Card, Typography, Space } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

const CalendarIntro = () => {
    const { Paragraph, Link, Title, Text } = Typography;

    return (
        <Card bordered={false} className="calendar-intro" dir="rtl">
            <Space align="start">
                <div className="calendar-intro__icon">
                    <InfoCircleOutlined />
                </div>

                <Space
                    direction="vertical"
                    size={8}
                    className="calendar-intro__content"
                >
                    <Title level={4} className="calendar-intro__title">
                        تقویم جلسات گروه صف برنامه CS Internship
                    </Title>

                    <Paragraph className="calendar-intro__paragraph">
                        این تقویم، مرجع رسمی زمان‌بندی جلسات پرسش‌وپاسخ مراحل
                        ورود به برنامه CS Internship است و نمای کلی ساختار
                        برگزاری جلسات گروه صف را در طول هفته نمایش می‌دهد.
                    </Paragraph>

                    <Paragraph className="calendar-intro__paragraph">
                        برای آشنایی با فرایند ورود، می‌توانید{" "}
                        <Link
                            href="https://t.me/c/1191433472/3799"
                            target="_blank"
                            rel="cs-internship-entry-process"
                        >
                            پیام پین‌شدهٔ توضیحات کامل مسیر ورود
                        </Link>{" "}
                        را مطالعه کنید.
                    </Paragraph>

                    <Paragraph className="calendar-intro__paragraph">
                        در این تقویم، برای هر جلسه موارد زیر مشخص شده است:
                    </Paragraph>

                    <ul className="calendar-intro__list">
                        <li>نوع جلسه (مرحلهٔ اول، دوم، سوم یا جلسهٔ مصاحبه)</li>
                        <li>تاریخ شمسی و میلادی و بازهٔ زمانی برگزاری</li>
                        <li>
                            لینک حضور در جلسه و منبع مطالعاتی مرتبط (در صورت
                            وجود)
                        </li>
                    </ul>

                    <Text type="secondary" className="calendar-intro__hint">
                        با انتخاب هر رویداد در تقویم، جزئیات کامل همان جلسه
                        نمایش داده می‌شود.
                    </Text>
                </Space>
            </Space>
        </Card>
    );
};

export default CalendarIntro;
