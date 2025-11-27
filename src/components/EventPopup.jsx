import React, { useEffect, useRef } from "react";
import moment from "jalali-moment";
import CalendarEventCreator from "./CalendarEventCreator";

const EventPopup = ({ visible, anchorRect, date, event, onClose }) => {
    const popupRef = useRef(null);

    const justOpenedRef = useRef(false);

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (justOpenedRef.current) {
                justOpenedRef.current = false;
                return;
            }

            if (
                popupRef.current &&
                !popupRef.current.contains(e.target) &&
                visible
            ) {
                onClose();
            }
        };

        const handleEscape = (e) => {
            if (e.key === "Escape") onClose();
        };

        document.addEventListener("mousedown", handleOutsideClick);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
            document.removeEventListener("keydown", handleEscape);
        };
    }, [visible, onClose]);

    useEffect(() => {
        if (!visible) return undefined;
        justOpenedRef.current = true;
        const t = setTimeout(() => (justOpenedRef.current = false), 120);
        return () => clearTimeout(t);
    }, [visible]);

    if (!visible || !anchorRect) return null;

    const defaultWidth = 320;
    const popupPadding = 12;

    let left =
        anchorRect.left +
        window.scrollX +
        anchorRect.width / 2 -
        defaultWidth / 2;
    left = Math.max(8, Math.min(left, window.innerWidth - defaultWidth - 8));

    const spaceBelow =
        window.innerHeight - (anchorRect.bottom - window.scrollY);
    const prefersAbove = spaceBelow < 260;
    const top = prefersAbove
        ? anchorRect.top + window.scrollY - 8 - 260
        : anchorRect.bottom + window.scrollY + 8;

    const arrowWidth = 14;
    let arrowLeft =
        anchorRect.left +
        window.scrollX +
        anchorRect.width / 2 -
        left -
        arrowWidth / 2;
    arrowLeft = Math.max(
        12,
        Math.min(arrowLeft, defaultWidth - 12 - arrowWidth)
    );

    const gregorian = date ? date.format("YYYY-MM-DD") : "-";
    const persian = date
        ? moment(date.toDate()).locale("fa").format("jYYYY/jMM/jDD")
        : "-";

    return (
        <div
            ref={popupRef}
            className={`event-popup ${prefersAbove ? "event-popup--above" : ""}`}
            style={{
                position: "absolute",
                top: top,
                left: left,
                width: defaultWidth,
            }}
            role="dialog"
            aria-modal="false"
        >
            <div className="event-popup__arrow" style={{ left: arrowLeft }} />
            <div className="event-popup__content">
                <div className="event-popup__header">
                    <div className="event-popup__header-left">
                        {event && (
                            <span
                                className="event-popup__color-dot"
                                style={{ background: event.color || "#444" }}
                                aria-hidden
                            />
                        )}
                        <div className="event-popup__header-title">
                            {event?.stage || event?.title || "جزئیات جلسه"}
                        </div>
                    </div>
                </div>
                <div className="event-popup__row">
                    <div className="event-popup__label">تاریخ شمسی</div>
                    <div className="event-popup__value">{persian}</div>
                </div>
                <div className="event-popup__row">
                    <div className="event-popup__label">تاریخ میلادی</div>
                    <div className="event-popup__value">{gregorian}</div>
                </div>

                {event && (
                    <>
                        <div className="event-popup__row">
                            <div className="event-popup__label">عنوان جلسه</div>
                            <div className="event-popup__value">
                                {event.fullName || event.title}
                            </div>
                        </div>

                        {event.link && (
                            <div className="event-popup__row">
                                <div className="event-popup__label">
                                    لینک جلسه
                                </div>
                                <div className="event-popup__value">
                                    <a
                                        href={event.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="event-popup__link event-popup__link--primary"
                                    >
                                        {"ماکروسافت تیمز"}
                                    </a>
                                </div>
                            </div>
                        )}

                        {event.resource && (
                            <div className="event-popup__row">
                                <div className="event-popup__label">منبع</div>
                                <div className="event-popup__value">
                                    <a
                                        href={event.resource}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="event-popup__link"
                                    >
                                        {"مشاهده منبع"}
                                    </a>
                                </div>
                            </div>
                        )}
                    </>
                )}

                {date && event && (
                    <div className="event-popup__creator">
                        <CalendarEventCreator
                            eventDate={date.format("YYYY-MM-DD")}
                            eventText={event.fullName || event.title}
                        />
                    </div>
                )}

                <div className="event-popup__footer">
                    <div className="event-popup__meta">
                        <div className="event-popup__label small">زمان</div>
                        <div className="event-popup__value small">
                            ساعت ۱۸:۰۰ تا ۱۹:۰۰
                        </div>
                    </div>

                    <div className="event-popup__actions">
                        <button
                            onClick={onClose}
                            className="ant-btn ant-btn-primary"
                        >
                            بستن
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventPopup;
