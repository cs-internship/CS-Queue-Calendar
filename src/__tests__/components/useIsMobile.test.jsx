import { renderHook, act } from "@testing-library/react";
import { useIsMobile } from "../../components/useIsMobile";

describe("useIsMobile", () => {
    beforeEach(() => {
        // Reset window size to desktop
        Object.defineProperty(window, "innerWidth", {
            writable: true,
            configurable: true,
            value: 1024,
        });
    });

    it("should return a boolean", () => {
        const { result } = renderHook(() => useIsMobile());
        expect(typeof result.current).toBe("boolean");
    });

    it("should return false for desktop viewport", () => {
        Object.defineProperty(window, "innerWidth", {
            writable: true,
            configurable: true,
            value: 1024,
        });
        const { result } = renderHook(() => useIsMobile());
        expect(result.current).toBe(false);
    });

    it("should return true for mobile viewport", () => {
        Object.defineProperty(window, "innerWidth", {
            writable: true,
            configurable: true,
            value: 500,
        });
        const { result } = renderHook(() => useIsMobile());
        expect(result.current).toBe(true);
    });

    it("should use default breakpoint of 768", () => {
        Object.defineProperty(window, "innerWidth", {
            writable: true,
            configurable: true,
            value: 768,
        });
        const { result } = renderHook(() => useIsMobile());
        expect(result.current).toBe(true);
    });

    it("should accept custom breakpoint", () => {
        Object.defineProperty(window, "innerWidth", {
            writable: true,
            configurable: true,
            value: 900,
        });
        const { result } = renderHook(() => useIsMobile(1000));
        expect(result.current).toBe(true);
    });

    it("should update on window resize", () => {
        const { result, rerender } = renderHook(() => useIsMobile());

        act(() => {
            window.innerWidth = 500;
            window.dispatchEvent(new Event("resize"));
        });

        rerender();
        expect(result.current).toBe(true);
    });

    it("should cleanup event listener on unmount", () => {
        const removeEventListenerSpy = jest.spyOn(
            window,
            "removeEventListener"
        );
        const { unmount } = renderHook(() => useIsMobile());
        unmount();

        expect(removeEventListenerSpy).toHaveBeenCalledWith(
            "resize",
            expect.any(Function)
        );
        removeEventListenerSpy.mockRestore();
    });

    it("should handle edge case at breakpoint", () => {
        Object.defineProperty(window, "innerWidth", {
            writable: true,
            configurable: true,
            value: 769,
        });
        const { result } = renderHook(() => useIsMobile());
        expect(result.current).toBe(false);
    });

    it("should handle very small viewport", () => {
        Object.defineProperty(window, "innerWidth", {
            writable: true,
            configurable: true,
            value: 320,
        });
        const { result } = renderHook(() => useIsMobile());
        expect(result.current).toBe(true);
    });

    it("should handle very large viewport", () => {
        Object.defineProperty(window, "innerWidth", {
            writable: true,
            configurable: true,
            value: 2560,
        });
        const { result } = renderHook(() => useIsMobile());
        expect(result.current).toBe(false);
    });
});
