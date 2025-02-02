import React, { useEffect, useState } from "react";
import { Button, Modal, Input, Spin } from "antd";
import { formatPersianDate } from "../utils/formatPersianDate";

const AnnouncementModule = ({
    isModalOpen,
    setIsModalOpen,
    setToastifyObj,
    announcementData,
}) => {
    const [textAreaContent, setTextAreaContent] = useState(
        "Aloha, Nothing to see here"
    );

    useEffect(() => {
        if (announcementData.startWeekDate) {
            setTextAreaContent(`📅 برنامه #زمان‌بندی‌_جلسات گروه صف در هفته آینده (${formatPersianDate(
                announcementData.startWeekDate
            )} تا ${formatPersianDate(announcementData.endWeekDate)})

🔸 **سه‌شنبه، ${formatPersianDate(announcementData.firstEventDate)}**
موضوع: **${announcementData?.firstEvent?.replace(/:/g, " -")}**

🔸 **یک‌شنبه، ${formatPersianDate(announcementData.secondEventDate)}**
موضوع: **${announcementData?.secondEvent?.replace(/:/g, " -")}**${
                announcementData?.secondEvent?.split(":")[0] ===
                "جلسه مرحله‌ چهارم"
                    ? "\n(رزرو این جلسه امکان‌پذیر نیست)"
                    : ""
            }  

⏰ **زمان جلسات**: ۱۸:۰۰ تا ۱۹:۰۰

🚪 **زمان ورود**: ۱۷:۴۵ تا ۱۸:۰۰ (مطابق با قوانین شرکت در جلسات)

💬 **مهلت اعلام حضور**:  
افرادی که قصد شرکت در جلسات هفته آینده را دارند، تا تاریخ **${formatPersianDate(
                announcementData.startWeekDate
            )}** فرصت دارند به همین پیام ریپلای زده و مشخص کنند در کدام جلسه شرکت خواهند کرد.  
جلساتی که تا تاریخ **${formatPersianDate(
                announcementData.startWeekDate
            )}** ریپلای دریافت کرده باشند، در هفته بعد برگزار خواهند شد.

**برنامه زمان‌بندی جلسات گروه**:  
${window.location.href}`);
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
                    rows={20}
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
