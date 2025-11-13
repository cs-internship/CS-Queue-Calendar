import { startCalendarDate } from "../../constants/startCalendarDate";

describe("startCalendarDate constants", () => {
    it("should be defined", () => {
        expect(startCalendarDate).toBeDefined();
    });

    it("should be a string", () => {
        expect(typeof startCalendarDate).toBe("string");
    });

    it("should have valid date format YYYY-MM-DD", () => {
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        expect(dateRegex.test(startCalendarDate)).toBe(true);
    });

    it("should be a valid date", () => {
        const date = new Date(startCalendarDate);
        expect(date instanceof Date && !isNaN(date)).toBe(true);
    });

    it("should be 2025-01-13", () => {
        expect(startCalendarDate).toBe("2025-01-13");
    });

    it("should not be empty", () => {
        expect(startCalendarDate.length).toBeGreaterThan(0);
    });

    it("date parts should be valid numbers", () => {
        const [year, month, day] = startCalendarDate.split("-").map(Number);
        expect(year).toBeGreaterThan(2000);
        expect(month).toBeGreaterThanOrEqual(1);
        expect(month).toBeLessThanOrEqual(12);
        expect(day).toBeGreaterThanOrEqual(1);
        expect(day).toBeLessThanOrEqual(31);
    });
});
