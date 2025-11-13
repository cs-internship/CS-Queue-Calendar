import { convertToPersianNumbers } from "../../utils/convertToPersianNumbers";

describe("convertToPersianNumbers", () => {
    it("should convert English numbers to Persian", () => {
        expect(convertToPersianNumbers("123")).toBe("۱۲۳");
    });

    it("should handle single digit numbers", () => {
        expect(convertToPersianNumbers("0")).toBe("۰");
        expect(convertToPersianNumbers("1")).toBe("۱");
        expect(convertToPersianNumbers("5")).toBe("۵");
        expect(convertToPersianNumbers("9")).toBe("۹");
    });

    it("should handle all digits from 0 to 9", () => {
        expect(convertToPersianNumbers("0123456789")).toBe("۰۱۲۳۴۵۶۷۸۹");
    });

    it("should convert numbers within strings", () => {
        expect(convertToPersianNumbers("Date: 2024-12-13")).toBe(
            "Date: ۲۰۲۴-۱۲-۱۳"
        );
    });

    it("should handle empty string", () => {
        expect(convertToPersianNumbers("")).toBe("");
    });

    it("should handle strings without numbers", () => {
        expect(convertToPersianNumbers("Hello World")).toBe("Hello World");
    });

    it("should handle mixed content with numbers and letters", () => {
        expect(convertToPersianNumbers("ABC123DEF456")).toBe("ABC۱۲۳DEF۴۵۶");
    });

    it("should handle large numbers", () => {
        expect(convertToPersianNumbers("123456789")).toBe("۱۲۳۴۵۶۷۸۹");
    });

    it("should handle special characters with numbers", () => {
        expect(convertToPersianNumbers("Price: $99.99")).toBe("Price: $۹۹.۹۹");
    });

    it("should return a string", () => {
        expect(typeof convertToPersianNumbers("123")).toBe("string");
    });
});
