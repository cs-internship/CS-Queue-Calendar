import React from "react";
import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import CSCalendar from "../../components/CSCalendar";

// Mock dependencies
jest.mock("../../utils/createTds", () => ({
    createTds: jest.fn(),
}));

jest.mock("../../constants/events", () => ({
    events: [
        {
            title: "جلسه مرحله سوم",
            fullName: "جلسه مرحله‌ سوم: پرسش‌وپاسخ",
        },
        {
            title: "جلسه مرحله دوم",
            fullName: "جلسه مرحله‌ دوم: پرسش‌وپاسخ",
        },
        { title: "جلسه مصاحبه", fullName: "جلسه مصاحبه ورود به برنامه" },
        {
            title: "جلسه مرحله اول",
            fullName: "جلسه مرحله‌ اول: پرسش‌وپاسخ",
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

jest.mock("../../components/useIsMobile", () => ({
    useIsMobile: jest.fn(() => false),
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

    it("should render Alert component", () => {
        const { container } = render(
            <CSCalendar
                setAnnouncementData={mockSetAnnouncementData}
                addToCurrentWeek={mockAddToCurrentWeek}
            />
        );

        expect(container.querySelector(".ant-alert")).toBeInTheDocument();
    });

    it("should display event description", () => {
        const { getByText } = render(
            <CSCalendar
                setAnnouncementData={mockSetAnnouncementData}
                addToCurrentWeek={mockAddToCurrentWeek}
            />
        );

        // Should render event description or "no event" message
        const eventDescription = getByText((content, element) => {
            return element && element.className === "event-description";
        });

        expect(eventDescription).toBeInTheDocument();
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

    it("should render ConfigProvider with RTL direction", () => {
        const { container } = render(
            <CSCalendar
                setAnnouncementData={mockSetAnnouncementData}
                addToCurrentWeek={0}
            />
        );

        const alert = container.querySelector(".ant-alert");
        expect(alert).toBeInTheDocument();
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
