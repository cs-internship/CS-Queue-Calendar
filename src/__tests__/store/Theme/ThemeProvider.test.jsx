import { useContext } from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import { ThemeProvider } from "../../../store/Theme/ThemeProvider";
import { ThemeContext } from "../../../store/Theme/ThemeContext";

// Test component to access context
const TestComponent = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    return (
        <div>
            <div data-testid="theme-display">{theme}</div>
            <button onClick={toggleTheme} data-testid="toggle-button">
                Toggle Theme
            </button>
        </div>
    );
};

describe("ThemeProvider", () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it("should render without crashing", () => {
        render(
            <ThemeProvider>
                <div>Test Content</div>
            </ThemeProvider>
        );
    });

    it("should render children", () => {
        render(
            <ThemeProvider>
                <div>Test Content</div>
            </ThemeProvider>
        );
        expect(screen.getByText("Test Content")).toBeInTheDocument();
    });

    it("should provide theme context with default value", () => {
        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );
        const themeDisplay = screen.getByTestId("theme-display");
        expect(themeDisplay.textContent).toBe("light");
    });

    it("should provide toggleTheme function", () => {
        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );
        expect(screen.getByTestId("toggle-button")).toBeInTheDocument();
    });

    it("should toggle theme when toggleTheme is called", () => {
        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );
        const toggleButton = screen.getByTestId("toggle-button");
        const themeDisplay = screen.getByTestId("theme-display");

        expect(themeDisplay.textContent).toBe("light");

        fireEvent.click(toggleButton);
        expect(themeDisplay.textContent).toBe("dark");

        fireEvent.click(toggleButton);
        expect(themeDisplay.textContent).toBe("light");
    });

    it("should persist theme to localStorage", () => {
        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );
        const toggleButton = screen.getByTestId("toggle-button");

        fireEvent.click(toggleButton);

        expect(localStorage.getItem("theme")).toBe("dark");
    });

    it("should read theme from localStorage on mount", () => {
        localStorage.setItem("theme", "dark");

        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );

        const themeDisplay = screen.getByTestId("theme-display");
        expect(themeDisplay.textContent).toBe("dark");
    });

    it("should set data-theme attribute on document element", () => {
        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );

        expect(document.documentElement.getAttribute("data-theme")).toBe(
            "light"
        );
    });

    it("should update data-theme when toggling", () => {
        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );

        const toggleButton = screen.getByTestId("toggle-button");
        fireEvent.click(toggleButton);

        expect(document.documentElement.getAttribute("data-theme")).toBe(
            "dark"
        );
    });

    it("should handle multiple theme toggles", () => {
        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );

        const toggleButton = screen.getByTestId("toggle-button");

        fireEvent.click(toggleButton);
        fireEvent.click(toggleButton);
        fireEvent.click(toggleButton);

        expect(localStorage.getItem("theme")).toBe("dark");
    });

    it("should provide context to all children", () => {
        render(
            <ThemeProvider>
                <div>
                    <TestComponent />
                    <TestComponent />
                </div>
            </ThemeProvider>
        );

        const displays = screen.getAllByTestId("theme-display");
        expect(displays.length).toBe(2);
        expect(displays[0].textContent).toBe("light");
        expect(displays[1].textContent).toBe("light");
    });
});
