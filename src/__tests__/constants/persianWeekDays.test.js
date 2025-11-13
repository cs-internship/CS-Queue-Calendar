import { persianWeekDays } from "../../constants/persianWeekDays";

describe("persianWeekDays constants", () => {
    it("should be defined", () => {
        expect(persianWeekDays).toBeDefined();
    });

    it("should be an array", () => {
        expect(Array.isArray(persianWeekDays)).toBe(true);
    });

    it("should have 7 days", () => {
        expect(persianWeekDays.length).toBe(7);
    });

    it("should contain correct Persian day names", () => {
        expect(persianWeekDays[0]).toBe("شنبه");
        expect(persianWeekDays[1]).toBe("یک‌شنبه");
        expect(persianWeekDays[2]).toBe("دوشنبه");
        expect(persianWeekDays[3]).toBe("سه‌شنبه");
        expect(persianWeekDays[4]).toBe("چهارشنبه");
        expect(persianWeekDays[5]).toBe("پنج‌شنبه");
        expect(persianWeekDays[6]).toBe("جمعه");
    });

    it("each day should be a non-empty string", () => {
        persianWeekDays.forEach((day) => {
            expect(typeof day).toBe("string");
            expect(day.length).toBeGreaterThan(0);
        });
    });

    it("each day should contain Persian characters", () => {
        persianWeekDays.forEach((day) => {
            expect(/[\u0600-\u06FF]/.test(day)).toBe(true);
        });
    });

    it("Saturday should be first day", () => {
        expect(persianWeekDays[0]).toBe("شنبه");
    });

    it("Friday should be last day", () => {
        expect(persianWeekDays[6]).toBe("جمعه");
    });

    it("should start with weekend day", () => {
        expect(persianWeekDays[0]).toBe("شنبه");
        expect(persianWeekDays[6]).toBe("جمعه");
    });
});
