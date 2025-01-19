import React, { useEffect, useState } from "react";
import { Button, Modal, Input, Spin } from "antd";
import moment from "moment-jalaali";

moment.loadPersian({ dialect: "persian-modern" });

const AnnouncementModule = ({
    isModalOpen,
    setIsModalOpen,
    setToastifyObj,
    announcementData,
}) => {
    const [textAreaContent, setTextAreaContent] = useState(
        "Aloha, Nothing to see here"
    );

    const convertToPersianNumbers = (str) => {
        const persianNumbers = "۰۱۲۳۴۵۶۷۸۹";
        return str.replace(
            /[0-9]/g,
            (char) => persianNumbers[parseInt(char, 10)]
        );
    };

    useEffect(() => {
        if (announcementData.startWeekDate) {
            const startWeekDate = moment(
                announcementData.startWeekDate,
                "YYYY/M/D"
            ).format("jD jMMMM");

            const endWeekDate = moment(
                announcementData.endWeekDate,
                "YYYY/M/D"
            ).format("jD jMMMM");

            const firstEventDate = moment(
                announcementData.firstEventDate,
                "YYYY/M/D"
            ).format("jD jMMMM");

            const secondEventDate = moment(
                announcementData.secondEventDate,
                "YYYY/M/D"
            ).format("jD jMMMM");

            setTextAreaContent(`سلام به همگی، وقتتون بخیر

جلسات گروه صف این هفته (${convertToPersianNumbers(
                startWeekDate
            )} تا ${convertToPersianNumbers(
                endWeekDate
            )}) طبق «برنامه زمان‌بندی جلسات»، به شرح زیر برگزار می‌شود:

1️⃣ سه‌شنبه، ${convertToPersianNumbers(firstEventDate)}
موضوع: ${announcementData?.secondEvent?.title.replace(/:/g, " -")}

2️⃣ یک‌شنبه، ${convertToPersianNumbers(secondEventDate)}
موضوع: ${announcementData?.firstEvent?.title.replace(/:/g, " -")}

⏰ زمان جلسات: ۱۸:۰۰ تا ۱۹:۰۰

🚪 زمان ورود: از ساعت ۱۷:۴۵ تا ۱۸:۰۰ (مطابق با قوانین شرکت در جلسات)

💬 افرادی که مایل به شرکت در هر یک از این جلسات هستند، به همین پیام ریپلای کرده و مشخص کنند که در کدام جلسه شرکت خواهند کرد.

.`);
        }
    }, [announcementData]);

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleCopyMessage = async () => {
        try {
            await navigator.clipboard.writeText(textAreaContent);

            setToastifyObj(() => ({
                title: "پیام با موفقیت کپی شد.",
                mode: "success",
            }));
        } catch (error) {
            setToastifyObj(() => ({
                title: "مشکلی در کپی کردن پیام رخ داده است.",
                mode: "error",
            }));
        }
    };

    return (
        <Modal
            open={isModalOpen}
            onCancel={handleCancel}
            footer={[
                <Button key="back" onClick={handleCancel} className="close-btn">
                    بازگشت
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    onClick={handleCopyMessage}
                    className="submit-btn"
                >
                    کپی پیام
                </Button>,
            ]}
            width="842px"
            closeIcon={false}
            className="modal-container code-modal"
        >
            <div className="modal-header">کپی پیام اطلاع‌رسانی</div>
            <div className="modal-title">
                در صورت نیاز به تغییر پیام، آن را ویرایش کنید و سپس دکمه «کپی
                پیام» را بزنید.
            </div>

            {textAreaContent !== "Aloha, Nothing to see here" ? (
                <Input.TextArea
                    rows={18}
                    value={textAreaContent}
                    onChange={(e) => setTextAreaContent(e.target.value)}
                    placeholder="متن خود را وارد کنید..."
                    className="announcement-textarea"
                />
            ) : (
                <Spin size="large" className="loading-spinner" />
            )}
        </Modal>
    );
};

export default AnnouncementModule;
