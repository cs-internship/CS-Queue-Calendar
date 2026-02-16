import { useContext, useEffect, useRef, useState } from "react";
import moment from "jalali-moment";
import CalendarEventCreator from "./CalendarEventCreator";
import "../assets/scss/components/_event-popup.scss";
import { ThemeContext } from "../store/Theme/ThemeContext";

const EventPopup = ({ visible, anchorRect, date, event, onClose }) => {
    const popupRef = useRef(null);

    const [mounted, setMounted] = useState(visible);
    const [isOpen, setIsOpen] = useState(false);

    const { theme } = useContext(ThemeContext);

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
        if (visible) {
            setMounted(true);

            const enter = setTimeout(() => setIsOpen(true), 16);

            justOpenedRef.current = true;
            const guard = setTimeout(
                () => (justOpenedRef.current = false),
                160
            );

            return () => {
                clearTimeout(enter);
                clearTimeout(guard);
            };
        }

        setIsOpen(false);
        const leave = setTimeout(() => setMounted(false), 340);
        return () => clearTimeout(leave);
    }, [visible]);

    if (!mounted || !anchorRect) return null;

    const defaultWidth = Math.min(420, Math.max(300, anchorRect?.width || 320));

    let left =
        anchorRect.left +
        window.scrollX +
        anchorRect.width / 2 -
        defaultWidth / 2;
    left = Math.max(8, Math.min(left, window.innerWidth - defaultWidth - 8));

    const spaceBelow =
        window.innerHeight - (anchorRect.bottom - window.scrollY);
    const prefersAbove = spaceBelow < 301;
    const top = prefersAbove
        ? anchorRect.top + window.scrollY - 8 - 301
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

    const transformOrigin = prefersAbove ? "bottom center" : "top center";

    return (
        <div
            ref={popupRef}
            className={`event-popup ${prefersAbove ? "event-popup--above" : ""} ${
                isOpen ? "is-mounted" : "is-closing"
            }`}
            style={{
                position: "absolute",
                top: top,
                left: left,
                width: defaultWidth,
            }}
            role="dialog"
            aria-modal="false"
        >
            <div
                className="event-popup__arrow"
                style={{ left: arrowLeft }}
                aria-hidden
            />
            <div
                className={`event-popup__content ${isOpen ? "is-open" : ""}`}
                style={{ transformOrigin }}
            >
                <div className="event-popup__header">
                    <div className="event-popup__header-left">
                        {event && (
                            <span
                                className="event-popup__color-dot"
                                style={{
                                    background:
                                        theme === "light"
                                            ? event.colorLight
                                            : event.colorDark,
                                }}
                                aria-hidden
                            />
                        )}
                        <div className="event-popup__header-title">
                            {"جلسه" + " " + event?.title || "جزئیات جلسه"}
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

                <div className="event-popup__row">
                    <div className="event-popup__label">زمان</div>
                    <div className="event-popup__value">
                        {event?.time || "ساعت ۱۸:۰۰ تا ۱۹:۰۰"}
                    </div>
                </div>

                {date && event && (
                    <div className="event-popup__creator">
                        <CalendarEventCreator
                            eventDate={date.format("YYYY-MM-DD")}
                            eventText={event.fullName || event.title}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default EventPopup;
