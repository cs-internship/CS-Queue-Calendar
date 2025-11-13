import { events } from "../../constants/events";

describe("events constants", () => {
    it("should be defined", () => {
        expect(events).toBeDefined();
    });

    it("should be an array", () => {
        expect(Array.isArray(events)).toBe(true);
    });

    it("should have 4 events", () => {
        expect(events.length).toBe(4);
    });

    it("each event should have title and fullName", () => {
        events.forEach((event) => {
            expect(event).toHaveProperty("title");
            expect(event).toHaveProperty("fullName");
        });
    });

    it("should have correct event titles", () => {
        expect(events[0].title).toBe("جلسه مرحله سوم");
        expect(events[1].title).toBe("جلسه مرحله دوم");
        expect(events[2].title).toBe("جلسه مصاحبه");
        expect(events[3].title).toBe("جلسه مرحله اول");
    });

    it("each event should have non-empty title and fullName", () => {
        events.forEach((event) => {
            expect(event.title).toBeTruthy();
            expect(event.fullName).toBeTruthy();
            expect(typeof event.title).toBe("string");
            expect(typeof event.fullName).toBe("string");
        });
    });

    it("fullName should contain Persian text", () => {
        events.forEach((event) => {
            expect(/[\u0600-\u06FF]/.test(event.fullName)).toBe(true);
        });
    });

    it("should contain specific event details", () => {
        const thirdEvent = events.find((e) => e.title === "جلسه مرحله سوم");
        expect(thirdEvent).toBeDefined();
        expect(thirdEvent.fullName).toContain("مرحله‌ سوم");
    });

    it("should be ordered correctly", () => {
        expect(events[0].title).toBe("جلسه مرحله سوم");
        expect(events[1].title).toBe("جلسه مرحله دوم");
        expect(events[2].title).toBe("جلسه مصاحبه");
        expect(events[3].title).toBe("جلسه مرحله اول");
    });
});
