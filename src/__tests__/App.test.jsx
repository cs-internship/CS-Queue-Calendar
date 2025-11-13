import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

// Mock child components
jest.mock("../components/Header", () => {
    return function DummyHeader() {
        return <div data-testid="header">Header</div>;
    };
});

jest.mock("../components/Footer", () => {
    return function DummyFooter() {
        return <div data-testid="footer">Footer</div>;
    };
});

jest.mock("../components/CSCalendar", () => {
    return function DummyCSCalendar() {
        return <div data-testid="calendar">Calendar</div>;
    };
});

jest.mock("../components/FloatButtonSection", () => {
    return function DummyFloatButtonSection() {
        return <div data-testid="float-button">Float Button</div>;
    };
});

jest.mock("../components/AnnouncementModule", () => {
    return function DummyAnnouncementModule() {
        return <div data-testid="announcement">Announcement</div>;
    };
});

jest.mock("../components/Toastify", () => {
    return function DummyToastify() {
        return <div data-testid="toastify">Toastify</div>;
    };
});

jest.mock("../store/StoreProvider", () => {
    return function DummyStoreProvider({ children }) {
        return <div data-testid="store-provider">{children}</div>;
    };
});

// Mock ThemeContext
jest.mock("../store/Theme/ThemeContext", () => {
    const React = require("react");
    const mockThemeContext = {
        theme: "light",
        toggleTheme: jest.fn(),
    };
    return {
        __esModule: true,
        default: React.createContext(mockThemeContext),
        ThemeContext: React.createContext(mockThemeContext),
    };
});

describe("App", () => {
    it("should render without crashing", () => {
        render(<App />);
    });

    it("should render Header component", () => {
        render(<App />);
        expect(screen.getByTestId("header")).toBeInTheDocument();
    });

    it("should render Footer component", () => {
        render(<App />);
        expect(screen.getByTestId("footer")).toBeInTheDocument();
    });

    it("should render CSCalendar component", () => {
        render(<App />);
        expect(screen.getByTestId("calendar")).toBeInTheDocument();
    });

    it("should render FloatButtonSection component", () => {
        render(<App />);
        expect(screen.getByTestId("float-button")).toBeInTheDocument();
    });

    it("should render AnnouncementModule component", () => {
        render(<App />);
        expect(screen.getByTestId("announcement")).toBeInTheDocument();
    });

    it("should render Toastify component", () => {
        render(<App />);
        expect(screen.getByTestId("toastify")).toBeInTheDocument();
    });
});
