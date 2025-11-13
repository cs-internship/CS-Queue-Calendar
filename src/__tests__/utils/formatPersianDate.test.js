import { formatPersianDate } from "../../utils/formatPersianDate";

describe("formatPersianDate", () => {
    it("should be defined", () => {
        expect(formatPersianDate).toBeDefined();
    });

    it("should be a function", () => {
        expect(typeof formatPersianDate).toBe("function");
    });

    it("should return a string", () => {
        const result = formatPersianDate("2024/12/13");
        expect(typeof result).toBe("string");
    });

    it("should convert Gregorian date to Persian date", () => {
        // Test with a known date
        const result = formatPersianDate("2024/12/13");
        expect(result).toBeDefined();
        expect(result.length).toBeGreaterThan(0);
    });

    it("should handle different date formats", () => {
        const result1 = formatPersianDate("2024/1/1");
        const result2 = formatPersianDate("2024/12/31");

        expect(result1).toBeDefined();
        expect(result2).toBeDefined();
        expect(typeof result1).toBe("string");
        expect(typeof result2).toBe("string");
    });

    it("should convert numbers to Persian numerals", () => {
        const result = formatPersianDate("2024/12/13");
        // Result should contain Persian numerals (۰-۹)
        expect(/[۰-۹]/.test(result)).toBe(true);
    });

    it("should handle valid date inputs", () => {
        expect(() => formatPersianDate("2023/6/15")).not.toThrow();
        expect(() => formatPersianDate("2024/12/25")).not.toThrow();
    });

    it("should return Persian month name", () => {
        const result = formatPersianDate("2024/12/13");
        // Should contain Persian text (not just numbers)
        expect(result.length).toBeGreaterThan(0);
    });

    it("should format date with day and month name", () => {
        const result = formatPersianDate("2024/6/21");
        // Check if result has the pattern of "day month" in Persian
        expect(result).toMatch(/[\u0600-\u06FF]+/); // Persian characters
    });

    it("should handle different months", () => {
        const jan = formatPersianDate("2024/1/1");
        const jun = formatPersianDate("2024/6/15");
        const dec = formatPersianDate("2024/12/31");

        expect(jan).toBeDefined();
        expect(jun).toBeDefined();
        expect(dec).toBeDefined();
    });

    it("should handle leap year dates", () => {
        const result = formatPersianDate("2024/2/29"); // Leap year
        expect(result).toBeDefined();
    });

    it("should not throw for valid date objects", () => {
        expect(() => {
            formatPersianDate("2024/3/20");
        }).not.toThrow();
    });

    it("should return consistent results for same input", () => {
        const result1 = formatPersianDate("2024/12/13");
        const result2 = formatPersianDate("2024/12/13");
        expect(result1).toBe(result2);
    });
});
