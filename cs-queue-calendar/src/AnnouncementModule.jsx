import React, { useState } from "react";
import { Button, Modal, Input, Spin, message } from "antd";

const AnnouncementModule = ({ isModalOpen, setIsModalOpen }) => {
    const [textAreaContent, setTextAreaContent] = useState("j");

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleCopyMessage = async () => {
        try {
            // Attempt to copy text to clipboard
            await navigator.clipboard.writeText(textAreaContent);

            // Show success toast
            message.success("متن با موفقیت کپی شد.");
        } catch (error) {
            // Log error and show error toast
            console.error("Error copying text: ", error);
            message.error("مشکلی در کپی کردن متن رخ داده است.");
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
                    کپی متن
                </Button>,
            ]}
            width="842px"
            closeIcon={false}
            className="modal-container code-modal"
        >
            <div className="modal-header">کپی متن اطلاع‌رسانی</div>
            <div className="modal-title">
                در صورت نیاز به تغییر پیام، آن را ویرایش کنید و سپس دکمه «کپی
                پیام» را بزنید.
            </div>

            {textAreaContent ? (
                <Input.TextArea
                    rows={6}
                    value={textAreaContent}
                    onChange={(e) => setTextAreaContent(e.target.value)}
                    placeholder="متن خود را اینجا وارد کنید..."
                    className="announcement-textarea"
                />
            ) : (
                <Spin size="large" className="loading-spinner" />
            )}
        </Modal>
    );
};

export default AnnouncementModule;
