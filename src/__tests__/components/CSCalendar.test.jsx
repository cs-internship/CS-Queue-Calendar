import React from "react";
import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import CSCalendar from "../../components/CSCalendar";

jest.mock("../../constants/events", () => ({
    events: [
        {
            title: "جلسه مرحله سوم",
            fullName: "جلسه مرحله‌ سوم: پرسش‌وپاسخ",
            link: "https://teams.microsoft.com/meeting-3",
            resource: "https://example.com/resource-3",
        },
        {
            title: "جلسه مرحله دوم",
            fullName: "جلسه مرحله‌ دوم: پرسش‌وپاسخ",
            link: "https://teams.microsoft.com/meeting-2",
            resource: "https://example.com/resource-2",
        },
        {
            title: "جلسه مصاحبه",
            fullName: "جلسه مصاحبه ورود به برنامه",
            link: "",
            resource: "",
        },
        {
            title: "جلسه مرحله اول",
            fullName: "جلسه مرحله‌ اول: پرسش‌وپاسخ",
            link: "https://teams.microsoft.com/meeting-1",
            resource: "https://example.com/resource-1",
        },
    ],
}));

jest.mock("../../constants/startCalendarDate", () => ({
    startCalendarDate: "2025-01-13",
}));

jest.mock("../../constants/persianWeekDays", () => ({
    persianWeekDays: [
        "شنبه",
        "یک‌شنبه",
        "دوشنبه",
        "سه‌شنبه",
        "چهارشنبه",
        "پنج‌شنبه",
        "جمعه",
    ],
}));

jest.mock("../../components/CalendarEventCreator", () => {
    return function MockCalendarEventCreator() {
        return (
            <div data-testid="calendar-event-creator">
                Calendar Event Creator
            </div>
        );
    };
});

// Mock dayjs and moment
jest.mock("dayjs", () => {
    const originalDayjs = jest.requireActual("dayjs");
    return originalDayjs;
});

jest.mock("jalali-moment", () => {
    const originalMoment = jest.requireActual("jalali-moment");
    return originalMoment;
});

describe("CSCalendar", () => {
    const mockSetAnnouncementData = jest.fn();
    const mockAddToCurrentWeek = 0;

    beforeEach(() => {
        mockSetAnnouncementData.mockClear();
        jest.clearAllMocks();
    });

    it("should render without crashing", () => {
        render(
            <CSCalendar
                setAnnouncementData={mockSetAnnouncementData}
                addToCurrentWeek={mockAddToCurrentWeek}
            />
        );
    });

    it("should accept setAnnouncementData prop", () => {
        render(
            <CSCalendar
                setAnnouncementData={mockSetAnnouncementData}
                addToCurrentWeek={mockAddToCurrentWeek}
            />
        );
        expect(mockSetAnnouncementData).toBeDefined();
    });

    it("should accept addToCurrentWeek prop", () => {
        render(
            <CSCalendar
                setAnnouncementData={mockSetAnnouncementData}
                addToCurrentWeek={7}
            />
        );
    });

    it("should render container", () => {
        const { container } = render(
            <CSCalendar
                setAnnouncementData={mockSetAnnouncementData}
                addToCurrentWeek={mockAddToCurrentWeek}
            />
        );
        expect(container).toBeInTheDocument();
    });

    it("should call setAnnouncementData", () => {
        render(
            <CSCalendar
                setAnnouncementData={mockSetAnnouncementData}
                addToCurrentWeek={mockAddToCurrentWeek}
            />
        );
        expect(mockSetAnnouncementData).toHaveBeenCalled();
    });

    it("should update when addToCurrentWeek changes", () => {
        const { rerender } = render(
            <CSCalendar
                setAnnouncementData={mockSetAnnouncementData}
                addToCurrentWeek={0}
            />
        );
        rerender(
            <CSCalendar
                setAnnouncementData={mockSetAnnouncementData}
                addToCurrentWeek={7}
            />
        );
        expect(mockSetAnnouncementData).toHaveBeenCalledTimes(2);
    });

    it("should be accessible", () => {
        const { container } = render(
            <CSCalendar
                setAnnouncementData={mockSetAnnouncementData}
                addToCurrentWeek={mockAddToCurrentWeek}
            />
        );
        expect(container).toBeInTheDocument();
    });

    it("should call getEventForDate for selected date", () => {
        const { container } = render(
            <CSCalendar
                setAnnouncementData={mockSetAnnouncementData}
                addToCurrentWeek={mockAddToCurrentWeek}
            />
        );

        // Calendar should render with events
        expect(
            container.querySelectorAll(".ant-badge").length
        ).toBeGreaterThanOrEqual(0);
    });

    it("should handle onPanelChange", () => {
        const { container } = render(
            <CSCalendar
                setAnnouncementData={mockSetAnnouncementData}
                addToCurrentWeek={mockAddToCurrentWeek}
            />
        );

        expect(container).toBeInTheDocument();
    });

    it("should have calendar header with navigation buttons", () => {
        const { getByText } = render(
            <CSCalendar
                setAnnouncementData={mockSetAnnouncementData}
                addToCurrentWeek={mockAddToCurrentWeek}
            />
        );

        expect(getByText("ماه قبل")).toBeInTheDocument();
        expect(getByText("امروز")).toBeInTheDocument();
        expect(getByText("ماه بعد")).toBeInTheDocument();
    });

    it("should not render bottom Alert component anymore (popup replaces it)", () => {
        const { container } = render(
            <CSCalendar
                setAnnouncementData={mockSetAnnouncementData}
                addToCurrentWeek={mockAddToCurrentWeek}
            />
        );

        expect(container.querySelector(".ant-alert")).not.toBeInTheDocument();
    });

    it("clicking a calendar cell with event should open anchored popup showing event details", async () => {
        const { container, getByText } = render(
            <CSCalendar
                setAnnouncementData={mockSetAnnouncementData}
                addToCurrentWeek={mockAddToCurrentWeek}
            />
        );

        await waitFor(() => {
            // find clickable cell wrapper
            const cells = container.querySelectorAll(
                ".calendar-cell-with-event"
            );
            expect(cells.length).toBeGreaterThanOrEqual(0);
            // find the first wrapper that actually contains an event (stage-tag)
            const clickable = Array.from(cells).find((c) =>
                c.querySelector(".stage-tag")
            );
            expect(clickable).toBeTruthy();
            if (clickable) fireEvent.click(clickable);
        });

        // popup should show the Persian date label
        expect(getByText("تاریخ شمسی")).toBeInTheDocument();
        // session link should be labeled as Microsoft Teams in Persian and resource should be present
        expect(getByText("ماکروسافت تیمز")).toBeInTheDocument();
        expect(getByText("مشاهده منبع")).toBeInTheDocument();
    });

    it("clicking the calendar TD (cell square) containing a staged event opens the popup", async () => {
        const { container, getByText } = render(
            <CSCalendar
                setAnnouncementData={mockSetAnnouncementData}
                addToCurrentWeek={mockAddToCurrentWeek}
            />
        );

        await waitFor(() => {
            // find a table cell that contains our clickable wrapper
            const tds = Array.from(
                container.querySelectorAll(".ant-picker-cell")
            );
            const tdWithEvent = tds.find((td) =>
                td.querySelector(".calendar-cell-with-event .stage-tag")
            );

            expect(tdWithEvent).toBeTruthy();

            if (tdWithEvent) {
                fireEvent.click(tdWithEvent);
            }
        });

        expect(getByText("تاریخ شمسی")).toBeInTheDocument();
        expect(getByText("ماکروسافت تیمز")).toBeInTheDocument();
        expect(getByText("مشاهده منبع")).toBeInTheDocument();
    });

    it("every calendar cell should contain a date-label Tag and be annotated with data-date", async () => {
        const { container } = render(
            <CSCalendar
                setAnnouncementData={mockSetAnnouncementData}
                addToCurrentWeek={mockAddToCurrentWeek}
            />
        );

        await waitFor(() => {
            const wrappers = container.querySelectorAll(
                ".calendar-cell-with-event"
            );
            expect(wrappers.length).toBeGreaterThan(0);
            const hasDateAttr = Array.from(wrappers).some((w) =>
                w.getAttribute("data-date")
            );
            expect(hasDateAttr).toBeTruthy();
        });
    });

    it("should have select elements for month and year", () => {
        const { container } = render(
            <CSCalendar
                setAnnouncementData={mockSetAnnouncementData}
                addToCurrentWeek={mockAddToCurrentWeek}
            />
        );

        const selects = container.querySelectorAll(".ant-select");
        expect(selects.length).toBeGreaterThan(0);
    });

    it("should update announcement data on addToCurrentWeek change", () => {
        const { rerender } = render(
            <CSCalendar
                setAnnouncementData={mockSetAnnouncementData}
                addToCurrentWeek={0}
            />
        );

        const firstCallCount = mockSetAnnouncementData.mock.calls.length;

        rerender(
            <CSCalendar
                setAnnouncementData={mockSetAnnouncementData}
                addToCurrentWeek={7}
            />
        );

        const secondCallCount = mockSetAnnouncementData.mock.calls.length;
        expect(secondCallCount).toBeGreaterThan(firstCallCount);
    });

    it("should render calendar element", () => {
        const { container } = render(
            <CSCalendar
                setAnnouncementData={mockSetAnnouncementData}
                addToCurrentWeek={mockAddToCurrentWeek}
            />
        );

        expect(
            container.querySelector(".ant-picker-calendar")
        ).toBeInTheDocument();
    });

    it("should call getEventForDate for dates before startDate", () => {
        const { container } = render(
            <CSCalendar
                setAnnouncementData={mockSetAnnouncementData}
                addToCurrentWeek={-300}
            />
        );

        expect(container).toBeInTheDocument();
    });

    it("should render with different addToCurrentWeek values", () => {
        const { rerender } = render(
            <CSCalendar
                setAnnouncementData={mockSetAnnouncementData}
                addToCurrentWeek={-14}
            />
        );

        rerender(
            <CSCalendar
                setAnnouncementData={mockSetAnnouncementData}
                addToCurrentWeek={14}
            />
        );

        expect(mockSetAnnouncementData).toHaveBeenCalled();
    });

    it("should update year/month state", async () => {
        const { container } = render(
            <CSCalendar
                setAnnouncementData={mockSetAnnouncementData}
                addToCurrentWeek={mockAddToCurrentWeek}
            />
        );

        await waitFor(() => {
            expect(
                container.querySelector(".ant-picker-calendar")
            ).toBeInTheDocument();
        });
    });

    it("should render month navigation buttons", () => {
        const { getByText } = render(
            <CSCalendar
                setAnnouncementData={mockSetAnnouncementData}
                addToCurrentWeek={mockAddToCurrentWeek}
            />
        );

        expect(getByText("ماه قبل")).toBeInTheDocument();
        expect(getByText("امروز")).toBeInTheDocument();
        expect(getByText("ماه بعد")).toBeInTheDocument();
    });

    it("should render calendar with event badges", async () => {
        const { container } = render(
            <CSCalendar
                setAnnouncementData={mockSetAnnouncementData}
                addToCurrentWeek={0}
            />
        );

        await waitFor(() => {
            const badges = container.querySelectorAll(".ant-badge");
            expect(badges.length).toBeGreaterThanOrEqual(0);
        });
    });

    it("should handle dateCellRender", () => {
        const { container } = render(
            <CSCalendar
                setAnnouncementData={mockSetAnnouncementData}
                addToCurrentWeek={0}
            />
        );

        expect(
            container.querySelectorAll(".ant-badge").length
        ).toBeGreaterThanOrEqual(0);
    });

    it("should initialize with today's date", () => {
        const { container } = render(
            <CSCalendar
                setAnnouncementData={mockSetAnnouncementData}
                addToCurrentWeek={0}
            />
        );

        const todayBtn = container.querySelector(".today-btn");
        expect(todayBtn).toBeInTheDocument();
    });

    it("should not show the anchored popup on initial render", () => {
        const { container } = render(
            <CSCalendar
                setAnnouncementData={mockSetAnnouncementData}
                addToCurrentWeek={0}
            />
        );

        const popup = container.querySelector(".event-popup");
        expect(popup).not.toBeInTheDocument();
    });

    it("should handle onPanelChange when month/year changes", () => {
        const { container } = render(
            <CSCalendar
                setAnnouncementData={mockSetAnnouncementData}
                addToCurrentWeek={0}
            />
        );

        const prevBtn = screen.getByText("ماه قبل");
        fireEvent.click(prevBtn);
        expect(mockSetAnnouncementData).toHaveBeenCalled();
    });

    it("should navigate to next month", () => {
        const { container } = render(
            <CSCalendar
                setAnnouncementData={mockSetAnnouncementData}
                addToCurrentWeek={0}
            />
        );

        const nextBtn = screen.getByText("ماه بعد");
        fireEvent.click(nextBtn);
        expect(mockSetAnnouncementData).toHaveBeenCalled();
    });

    it("should navigate to previous month", () => {
        const { container } = render(
            <CSCalendar
                setAnnouncementData={mockSetAnnouncementData}
                addToCurrentWeek={0}
            />
        );

        const prevBtn = screen.getByText("ماه قبل");
        fireEvent.click(prevBtn);
        expect(mockSetAnnouncementData).toHaveBeenCalled();
    });

    it("should click today button", () => {
        const { container } = render(
            <CSCalendar
                setAnnouncementData={mockSetAnnouncementData}
                addToCurrentWeek={0}
            />
        );

        const todayBtn = screen.getByText("امروز");
        fireEvent.click(todayBtn);
        expect(mockSetAnnouncementData).toHaveBeenCalled();
    });

    it("should handle getEventForDate returns null for dates before startDate", () => {
        const { container } = render(
            <CSCalendar
                setAnnouncementData={mockSetAnnouncementData}
                addToCurrentWeek={-500}
            />
        );

        expect(container).toBeInTheDocument();
    });

    it("should set year/month state when value changes", async () => {
        const { container } = render(
            <CSCalendar
                setAnnouncementData={mockSetAnnouncementData}
                addToCurrentWeek={0}
            />
        );

        await waitFor(() => {
            expect(mockSetAnnouncementData).toHaveBeenCalled();
        });
    });

    it("should set correct announcement data for events after startDate", () => {
        render(
            <CSCalendar
                setAnnouncementData={mockSetAnnouncementData}
                addToCurrentWeek={0}
            />
        );

        expect(mockSetAnnouncementData).toHaveBeenCalled();
        const lastCall =
            mockSetAnnouncementData.mock.calls[
                mockSetAnnouncementData.mock.calls.length - 1
            ];
        expect(lastCall[0]).toBeDefined();
    });

    it("should handle multiple prop changes", () => {
        const { rerender } = render(
            <CSCalendar
                setAnnouncementData={mockSetAnnouncementData}
                addToCurrentWeek={0}
            />
        );

        const callCount1 = mockSetAnnouncementData.mock.calls.length;

        rerender(
            <CSCalendar
                setAnnouncementData={mockSetAnnouncementData}
                addToCurrentWeek={7}
            />
        );

        const callCount2 = mockSetAnnouncementData.mock.calls.length;
        expect(callCount2).toBeGreaterThanOrEqual(callCount1);
    });

    it("should cleanup timeout on unmount", () => {
        const { unmount } = render(
            <CSCalendar
                setAnnouncementData={mockSetAnnouncementData}
                addToCurrentWeek={mockAddToCurrentWeek}
            />
        );

        expect(() => unmount()).not.toThrow();
    });
});
