import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import dayjs from "dayjs";
import moment from "jalali-moment";
import CSCalendar from "../../components/CSCalendar";
import { ThemeContext } from "../../store/Theme/ThemeContext";
import { events } from "../../constants/events";
import { startCalendarDate } from "../../constants/startCalendarDate";

jest.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
    cb();
    return 1;
});
jest.spyOn(window, "cancelAnimationFrame").mockImplementation(() => {});

const mockPopup = jest.fn();
jest.mock("../../components/EventPopup", () => {
    return function MockEventPopup(props) {
        mockPopup(props);
        return props.visible ? <div data-testid="event-popup" /> : null;
    };
});

jest.mock("../../components/CalendarIntro", () => {
    const MockCalendarIntro = () => <div data-testid="calendar-intro" />;

    MockCalendarIntro.displayName = "MockCalendarIntro";

    return MockCalendarIntro;
});

jest.mock("antd", () => {
    const React = require("react");

    const Button = ({ children, onClick, className }) => (
        <button className={className} onClick={onClick}>
            {children}
        </button>
    );

    const Select = ({ value, onChange, className, children }) => (
        <select
            className={className}
            value={value}
            data-testid={className || "select"}
            onChange={(e) => onChange(Number(e.target.value))}
        >
            {children}
        </select>
    );
    const SelectOption = ({ value, children }) => (
        <option value={value}>{children}</option>
    );

    SelectOption.displayName = "Select.Option";

    Select.Option = SelectOption;

    const Tag = ({ children, className, color }) => (
        <div className={className} data-color={color}>
            {children}
        </div>
    );

    const Tooltip = ({ children }) => <div>{children}</div>;

    const Flex = ({ children, className, gap, justify, align }) => (
        <div
            className={className}
            data-gap={gap}
            data-justify={justify}
            data-align={align}
        >
            {children}
        </div>
    );

    const Calendar = ({
        value,
        onSelect,
        onPanelChange,
        cellRender,
        headerRender,
    }) => {
        const change = (val) => {
            onSelect && onSelect(val);
            onPanelChange && onPanelChange(val);
        };

        const cells = [value, value.add(1, "day"), value.add(6, "day")];

        return (
            <div className="ant-picker-calendar">
                <table className="ant-picker-content">
                    <thead>
                        <tr>
                            {[...Array(7)].map((_, idx) => (
                                <th key={idx} title={`th-${idx}`}>
                                    th-{idx}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {cells.map((d, idx) => (
                            <tr key={idx}>
                                <td
                                    className="ant-picker-cell"
                                    title={`cell-${idx}`}
                                >
                                    <div
                                        className="ant-picker-cell-inner"
                                        title={`inner-${idx}`}
                                    >
                                        {cellRender(d)}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="header">
                    {headerRender({
                        value,
                        onChange: change,
                    })}
                </div>
            </div>
        );
    };

    return { Calendar, Button, Select, Tag, Tooltip, Flex };
});

describe("CSCalendar", () => {
    let setAnnouncementDataMock;
    let announcementState;

    const renderCalendar = (props = {}, theme = "light") =>
        render(
            <ThemeContext.Provider value={{ theme, toggleTheme: jest.fn() }}>
                <CSCalendar
                    setAnnouncementData={setAnnouncementDataMock}
                    addToCurrentWeek={0}
                    {...props}
                />
            </ThemeContext.Provider>
        );

    const getEventForDateLocal = (date) => {
        const startDate = dayjs(startCalendarDate);
        if (date.isBefore(startDate, "day")) return null;
        const daysSinceStart = date.diff(startDate, "day");
        const weekNumber = Math.floor(daysSinceStart / 7) % 2;
        if (date.day() === 2) return events[weekNumber];
        if (date.day() === 0) return events[2 + weekNumber];
        return null;
    };

    const computeAnnouncement = (offset = 14) => {
        const saturdayDate = moment().add(offset, "day").startOf("week");
        const startWeekDate = saturdayDate
            .clone()
            .add(9, "day")
            .format("YYYY/M/D");
        const endWeekDate = saturdayDate
            .clone()
            .add(16, "day")
            .format("YYYY/M/D");
        const firstEventDate = saturdayDate
            .clone()
            .add(10, "day")
            .format("YYYY/M/D");
        const secondEventDate = saturdayDate
            .clone()
            .add(15, "day")
            .format("YYYY/M/D");

        const startDate = moment("2025-01-13", "YYYY-MM-DD")
            .locale("fa")
            .format("YYYY-MM-DD HH:mm:ss");

        let firstEvent = "";
        let secondEvent = "";

        if (saturdayDate.isAfter(startDate, "day")) {
            const fe = getEventForDateLocal(
                dayjs(saturdayDate.clone().add(10, "day").toDate())
            );
            const se = getEventForDateLocal(
                dayjs(saturdayDate.clone().add(15, "day").toDate())
            );

            if (fe) firstEvent = fe.fullName || fe.title;
            if (se) secondEvent = se.fullName || se.title;
        }

        return {
            startWeekDate,
            endWeekDate,
            firstEventDate,
            secondEventDate,
            firstEvent,
            secondEvent,
        };
    };

    beforeEach(() => {
        jest.useFakeTimers();
        jest.setSystemTime(new Date("2025-01-13T00:00:00Z"));
        announcementState = {};
        setAnnouncementDataMock = jest.fn((updater) => {
            announcementState =
                typeof updater === "function"
                    ? updater(announcementState)
                    : updater;
        });
        mockPopup.mockClear();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it("renders event badges for the current week and updates announcement data", () => {
        const { container } = renderCalendar();
        jest.runOnlyPendingTimers();

        expect(container.querySelectorAll(".stage-tag").length).toBeGreaterThan(
            0
        );
        expect(setAnnouncementDataMock).toHaveBeenCalled();
        expect(announcementState.firstEvent).toBeTruthy();
    });

    it("opens and toggles the popup when clicking a day with an event", async () => {
        const { container } = renderCalendar();
        await act(async () => {});
        const eventCell = Array.from(
            container.querySelectorAll(".calendar-cell-with-event")
        ).find((node) => node.querySelector(".stage-tag"));
        expect(eventCell).toBeInTheDocument();

        fireEvent.click(eventCell);
        await waitFor(() =>
            expect(
                mockPopup.mock.calls.some((call) => call[0].visible === true)
            ).toBe(true)
        );

        const refreshedCell = Array.from(
            container.querySelectorAll(".calendar-cell-with-event")
        ).find((node) => node.querySelector(".stage-tag"));

        fireEvent.click(refreshedCell);
        await waitFor(() =>
            expect(
                mockPopup.mock.calls.some((call) => call[0].visible === false)
            ).toBe(true)
        );
    });

    it("handles delegated cell clicks on table cells", async () => {
        const { container } = renderCalendar();
        await act(async () => {});
        const tableCell = Array.from(
            container.querySelectorAll(".ant-picker-cell")
        ).find((cell) => cell.querySelector(".stage-tag"));
        fireEvent.click(tableCell);

        await waitFor(() =>
            expect(
                mockPopup.mock.calls.some((call) => call[0].visible === true)
            ).toBe(true)
        );

        fireEvent.click(tableCell);
        await waitFor(() =>
            expect(
                mockPopup.mock.calls.some((call) => call[0].visible === false)
            ).toBe(true)
        );
    });

    it("opens via keyboard interaction on Enter", async () => {
        const { container } = renderCalendar();
        const eventCell = Array.from(
            container.querySelectorAll(".calendar-cell-with-event")
        ).find((node) => node.querySelector(".stage-tag"));
        fireEvent.keyDown(eventCell, { key: "Enter" });

        await waitFor(() =>
            expect(
                mockPopup.mock.calls[mockPopup.mock.calls.length - 1][0].visible
            ).toBe(true)
        );
    });

    it("renders short title when viewport width shrinks", () => {
        const { container } = renderCalendar();
        Object.defineProperty(window, "innerWidth", { value: 800 });
        window.dispatchEvent(new Event("resize"));

        const label = container.querySelector(".stage-tag .main-word");
        expect(label?.textContent).toBe(events[0].shortTitle);
    });

    it("applies dark theme colors for event tags", () => {
        const { container } = renderCalendar({}, "dark");
        const tag = container.querySelector(".stage-tag");
        expect(tag?.getAttribute("data-color")).toBe(events[0].colorDark);
    });

    it("handles delegated edge cases and manual popup close", async () => {
        let capturedDelegator;
        const originalAdd = Element.prototype.addEventListener;
        Element.prototype.addEventListener = function (type, handler) {
            if (
                type === "click" &&
                this.classList &&
                this.classList.contains("ant-picker-calendar")
            ) {
                capturedDelegator = handler;
            }
            return originalAdd.call(this, type, handler);
        };

        const { container } = renderCalendar();
        await act(async () => {});
        Element.prototype.addEventListener = originalAdd;

        capturedDelegator({
            target: {
                closest: (sel) => (sel === ".event-popup" ? true : null),
            },
        });

        const tdWithEvent = Array.from(
            container.querySelectorAll(".ant-picker-cell")
        ).find((cell) => cell.querySelector(".stage-tag"));
        const wrapper = tdWithEvent.querySelector(".calendar-cell-with-event");

        wrapper.removeAttribute("data-date");
        capturedDelegator({ target: tdWithEvent });

        wrapper.setAttribute("data-date", "2025-01-14");
        capturedDelegator({ target: tdWithEvent });

        await waitFor(() =>
            expect(
                mockPopup.mock.calls.some((call) => call[0].visible === true)
            ).toBe(true)
        );

        await act(async () => {});
        capturedDelegator({ target: tdWithEvent });
        await waitFor(() =>
            expect(
                mockPopup.mock.calls.some((call) => call[0].visible === false)
            ).toBe(true)
        );

        const lastOnClose =
            mockPopup.mock.calls[mockPopup.mock.calls.length - 1][0].onClose;
        act(() => lastOnClose());
    });

    it("returns previous announcement data when nothing changes", () => {
        const offset = 14;
        announcementState = computeAnnouncement(offset);
        renderCalendar({ addToCurrentWeek: offset });
        expect(setAnnouncementDataMock).toHaveBeenCalled();
    });

    it("closes the popup when clicking a day without an event", async () => {
        const { container } = renderCalendar();
        const emptyCell = Array.from(
            container.querySelectorAll(".calendar-cell-with-event")
        ).find((node) => !node.querySelector(".stage-tag"));

        fireEvent.click(emptyCell);

        await waitFor(() =>
            expect(
                mockPopup.mock.calls[mockPopup.mock.calls.length - 1][0].visible
            ).toBe(false)
        );
    });

    it("updates announcement data when navigating weeks forward and backward", () => {
        renderCalendar({ addToCurrentWeek: 0 });
        const firstCall = { ...announcementState };

        renderCalendar({ addToCurrentWeek: 7 });
        const secondCall = { ...announcementState };
        expect(secondCall.startWeekDate).not.toBe(firstCall.startWeekDate);

        renderCalendar({ addToCurrentWeek: -500 });
        expect(announcementState.firstEvent).toBe(
            announcementState.secondEvent
        );
        expect(announcementState.firstEvent).toBeTruthy();
    });

    it("handles header navigation buttons and month/year selects", () => {
        const { container } = renderCalendar();
        const headerButtons = container.querySelectorAll("button");

        // previous, today, next
        fireEvent.click(headerButtons[0]);
        fireEvent.click(headerButtons[1]);
        fireEvent.click(headerButtons[2]);

        const selects = container.querySelectorAll("select");
        fireEvent.change(selects[0], { target: { value: 2026 } });
        fireEvent.change(selects[1], { target: { value: 5 } });

        expect(setAnnouncementDataMock).toHaveBeenCalled();
    });

    it("strips native title attributes through requestAnimationFrame cleanup", () => {
        const { container, unmount } = renderCalendar();
        const titledCell = container.querySelector(".ant-picker-cell");
        expect(titledCell).toBeInTheDocument();
        return waitFor(() =>
            expect(titledCell?.getAttribute("title")).toBeNull()
        ).then(unmount);
    });
});
