import { render, screen, fireEvent } from "@testing-library/react";

import CalendarEventCreator from "../../components/CalendarEventCreator";

describe("CalendarEventCreator", () => {
    const defaultProps = {
        eventDate: "2025-01-15",
        eventText: "جلسه مرحله اول - ساعت ۱۸:۰۰ تا ۱۹:۰۰",
    };

    beforeEach(() => {
        global.window.open = jest.fn();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("should render without crashing", () => {
        render(<CalendarEventCreator {...defaultProps} />);
    });

    it("should render button", () => {
        const { container } = render(
            <CalendarEventCreator {...defaultProps} />
        );
        const button = container.querySelector("button");
        expect(button).toBeTruthy();
    });

    it("should have correct button text", () => {
        render(<CalendarEventCreator {...defaultProps} />);
        expect(
            screen.getByText("اضافه کردن رویداد به گوگل کلندر")
        ).toBeInTheDocument();
    });

    it("should accept eventDate prop", () => {
        const { container } = render(
            <CalendarEventCreator
                eventDate="2025-12-25"
                eventText={defaultProps.eventText}
            />
        );
        expect(container).toBeInTheDocument();
    });

    it("should accept eventText prop", () => {
        const { container } = render(
            <CalendarEventCreator
                eventDate={defaultProps.eventDate}
                eventText="Custom Event Text"
            />
        );
        expect(container).toBeInTheDocument();
    });

    it("should open Google Calendar on button click", () => {
        render(<CalendarEventCreator {...defaultProps} />);
        const button = screen.getByRole("button");
        fireEvent.click(button);
        expect(window.open).toHaveBeenCalled();
    });

    it("should open link in new window", () => {
        render(<CalendarEventCreator {...defaultProps} />);
        const button = screen.getByRole("button");
        fireEvent.click(button);
        expect(window.open).toHaveBeenCalledWith(expect.any(String), "_blank");
    });

    it("should generate valid Google Calendar URL", () => {
        render(<CalendarEventCreator {...defaultProps} />);
        const button = screen.getByRole("button");
        fireEvent.click(button);

        const callArgs = window.open.mock.calls[0][0];
        expect(callArgs).toContain("calendar.google.com");
        expect(callArgs).toContain("https://");
    });

    it("should encode event text in URL", () => {
        render(<CalendarEventCreator {...defaultProps} />);
        const button = screen.getByRole("button");
        fireEvent.click(button);

        const url = window.open.mock.calls[0][0];
        expect(url).toContain("text=");
    });

    it("should include dates in calendar URL", () => {
        render(<CalendarEventCreator {...defaultProps} />);
        const button = screen.getByRole("button");
        fireEvent.click(button);

        const url = window.open.mock.calls[0][0];
        expect(url).toContain("dates=");
    });

    it("should format dates correctly", () => {
        render(<CalendarEventCreator {...defaultProps} />);
        const button = screen.getByRole("button");
        fireEvent.click(button);

        const url = window.open.mock.calls[0][0];
        // Should contain formatted date like 20250115
        expect(url).toContain("20250115");
    });

    it("should have button with proper styling", () => {
        const { container } = render(
            <CalendarEventCreator {...defaultProps} />
        );
        expect(
            container.querySelector(".calendar-event-creator")
        ).toBeInTheDocument();
    });

    it("should handle multiple clicks", () => {
        render(<CalendarEventCreator {...defaultProps} />);
        const button = screen.getByRole("button");

        fireEvent.click(button);
        fireEvent.click(button);

        expect(window.open).toHaveBeenCalledTimes(2);
    });
});
