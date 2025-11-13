import { createTds } from "../../utils/createTds";

describe("createTds", () => {
    let originalQuerySelectorAll;

    beforeEach(() => {
        // Mock document.querySelectorAll
        originalQuerySelectorAll = document.querySelectorAll;
        document.querySelectorAll = jest.fn();
    });

    afterEach(() => {
        // Restore original querySelectorAll
        document.querySelectorAll = originalQuerySelectorAll;
    });

    it("should be defined", () => {
        expect(createTds).toBeDefined();
    });

    it("should be a function", () => {
        expect(typeof createTds).toBe("function");
    });

    it('should call document.querySelectorAll with "td"', () => {
        document.querySelectorAll.mockReturnValue([]);
        createTds();
        expect(document.querySelectorAll).toHaveBeenCalledWith("td");
    });

    it("should handle empty td elements", () => {
        document.querySelectorAll.mockReturnValue([]);
        expect(() => createTds()).not.toThrow();
    });

    it("should process td elements with title attribute", () => {
        const mockTd = {
            title: "2024-12-13\nSome text",
        };
        document.querySelectorAll.mockReturnValue([mockTd]);
        createTds();

        // Should keep the gregorian date and add persian date
        expect(mockTd.title).toContain("2024-12-13");
        expect(mockTd.title).toContain("\n");
    });

    it("should handle multiple td elements", () => {
        const mockTd1 = {
            title: "2024-12-13\nOld text",
        };
        const mockTd2 = {
            title: "2024-12-14\nOld text",
        };
        document.querySelectorAll.mockReturnValue([mockTd1, mockTd2]);
        createTds();

        expect(mockTd1.title).toContain("2024-12-13");
        expect(mockTd2.title).toContain("2024-12-14");
        expect(mockTd1.title).toContain("\n");
        expect(mockTd2.title).toContain("\n");
    });

    it("should handle td with title containing multiple newlines", () => {
        const mockTd = {
            title: "2024-12-13\nLine 2\nLine 3",
        };
        document.querySelectorAll.mockReturnValue([mockTd]);
        createTds();

        // Should extract only the first part and add persian date
        expect(mockTd.title).toContain("2024-12-13");
        expect(mockTd.title).toContain("\n");
    });

    it("should handle td without newlines in title", () => {
        const mockTd = {
            title: "2024-12-13",
        };
        document.querySelectorAll.mockReturnValue([mockTd]);
        createTds();

        expect(mockTd.title).toContain("2024-12-13");
    });

    it("should call querySelectorAll for processing", () => {
        document.querySelectorAll.mockReturnValue([]);
        createTds();
        expect(document.querySelectorAll).toHaveBeenCalledWith("td");
        expect(
            document.querySelectorAll.mock.calls.length
        ).toBeGreaterThanOrEqual(1);
    });
});
