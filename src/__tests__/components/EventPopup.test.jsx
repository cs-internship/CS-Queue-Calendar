import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import dayjs from "dayjs";

import EventPopup from "../../components/EventPopup";
import { ThemeContext } from "../../store/Theme/ThemeContext";

const mockCalendarCreator = jest.fn();
jest.mock("../../components/CalendarEventCreator", () => {
    return function MockCalendarEventCreator(props) {
        mockCalendarCreator(props);
        return <div data-testid="calendar-event-creator" />;
    };
});

const anchorRect = {
    left: 100,
    top: 100,
    bottom: 140,
    width: 120,
    height: 40,
};

const baseEvent = {
    title: "Title",
    fullName: "Full Event Title",
    colorLight: "#111111",
    colorDark: "#222222",
    link: "https://example.com/session",
    resource: "https://example.com/resource",
    time: "10:00 - 11:00",
};

const renderPopup = (props, theme = "light") =>
    render(
        <ThemeContext.Provider value={{ theme, toggleTheme: jest.fn() }}>
            <EventPopup {...props} />
        </ThemeContext.Provider>
    );

describe("EventPopup", () => {
    beforeEach(() => {
        jest.useFakeTimers();
        jest.clearAllMocks();
        mockCalendarCreator.mockClear();
    });

    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
    });

    it("returns null when not visible or missing anchorRect", () => {
        const { container, rerender } = renderPopup({
            visible: false,
            anchorRect: null,
            date: null,
            event: null,
            onClose: jest.fn(),
        });
        expect(container.firstChild).toBeNull();

        rerender(
            <ThemeContext.Provider value={{ theme: "light" }}>
                <EventPopup
                    visible={true}
                    anchorRect={null}
                    date={dayjs()}
                    event={baseEvent}
                    onClose={jest.fn()}
                />
            </ThemeContext.Provider>
        );
        expect(container.firstChild).toBeNull();
    });

    it("renders event details, resource links, and calendar creator", () => {
        const onClose = jest.fn();
        const date = dayjs("2025-01-14");

        const { container } = renderPopup(
            {
                visible: true,
                anchorRect,
                date,
                event: baseEvent,
                onClose,
            },
            "dark"
        );

        act(() => jest.advanceTimersByTime(20));

        expect(container.querySelector(".event-popup")).toBeInTheDocument();
        const popupNode = container.querySelector(".event-popup");
        expect(
            container.querySelector(".event-popup__content")?.className
        ).toContain("is-open");
        expect(popupNode?.style.width).toBeTruthy();
        expect(screen.getByText("Full Event Title")).toBeInTheDocument();
        expect(screen.getByText("10:00 - 11:00")).toBeInTheDocument();
        expect(screen.getByText("تاریخ شمسی")).toBeInTheDocument();
        expect(screen.getByText("تاریخ میلادی")).toBeInTheDocument();
        expect(container.querySelector(".event-popup__link--primary")).toBe(
            container.querySelector(`a[href="https://example.com/session"]`)
        );
        expect(
            container.querySelector(`a[href="https://example.com/resource"]`)
        ).toBeInTheDocument();

        const dot = container.querySelector(".event-popup__color-dot");
        expect(dot?.style.background).toContain("34");

        expect(mockCalendarCreator).toHaveBeenCalledWith(
            expect.objectContaining({
                eventDate: "2025-01-14",
                eventText: "Full Event Title",
            })
        );

        fireEvent.keyDown(document, { key: "Escape" });
        expect(onClose).toHaveBeenCalled();
    });

    it("ignores the first outside click due to guard, then closes", () => {
        const onClose = jest.fn();
        renderPopup({
            visible: true,
            anchorRect,
            date: dayjs("2025-01-14"),
            event: baseEvent,
            onClose,
        });

        act(() => {});
        fireEvent.mouseDown(document.body);
        expect(onClose).not.toHaveBeenCalled();

        act(() => jest.advanceTimersByTime(200));
        fireEvent.mouseDown(document.body);
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("renders fallback values when no event is provided", () => {
        const { getByText } = renderPopup({
            visible: true,
            anchorRect,
            date: dayjs("2025-01-14"),
            event: null,
            onClose: jest.fn(),
        });

        jest.runAllTimers();

        expect(getByText("ساعت ۱۸:۰۰ تا ۱۹:۰۰")).toBeInTheDocument();
        expect(
            screen.queryByTestId("calendar-event-creator")
        ).not.toBeInTheDocument();
    });

    it("positions above when there is not enough space below", () => {
        const tallRect = { ...anchorRect, top: 720, bottom: 760 };
        const { container } = renderPopup({
            visible: true,
            anchorRect: tallRect,
            date: dayjs("2025-01-14"),
            event: baseEvent,
            onClose: jest.fn(),
        });

        jest.runAllTimers();

        expect(container.querySelector(".event-popup")?.className).toContain(
            "event-popup--above"
        );
    });

    it("invokes onClose when Escape is pressed", async () => {
        const onClose = jest.fn();
        const { container } = renderPopup({
            visible: true,
            anchorRect,
            date: dayjs("2025-01-14"),
            event: baseEvent,
            onClose,
        });

        await waitFor(() =>
            expect(container.querySelector(".event-popup")).toBeInTheDocument()
        );
        fireEvent.keyDown(document, { key: "Escape" });
        expect(onClose).toHaveBeenCalled();
    });

    it("renders fallback values when date is missing", () => {
        const { getAllByText } = renderPopup({
            visible: true,
            anchorRect,
            date: null,
            event: null,
            onClose: jest.fn(),
        });

        act(() => jest.runAllTimers());
        expect(getAllByText("-").length).toBeGreaterThanOrEqual(1);
    });

    it("closes when clicking outside after opening", () => {
        const onClose = jest.fn();
        renderPopup({
            visible: true,
            anchorRect,
            date: dayjs("2025-01-14"),
            event: baseEvent,
            onClose,
        });

        act(() => jest.advanceTimersByTime(220));
        fireEvent.mouseDown(document.body);
        expect(onClose).toHaveBeenCalled();
    });
});
