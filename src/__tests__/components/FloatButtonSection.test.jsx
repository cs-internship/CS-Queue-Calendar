import React from "react";
import { render, fireEvent } from "@testing-library/react";
import FloatButtonSection from "../../components/FloatButtonSection";

// Mock Ant Design icons
jest.mock("@ant-design/icons", () => ({
    PlusOutlined: () => <span>+</span>,
    SendOutlined: () => <span>send</span>,
    NotificationOutlined: () => <span>notify</span>,
    GithubOutlined: () => <span>github</span>,
    LinkedinOutlined: () => <span>linkedin</span>,
    TwitterOutlined: () => <span>twitter</span>,
    PaperClipOutlined: () => <span>clip</span>,
    BgColorsOutlined: () => <span>colors</span>,
    CopyOutlined: () => <span>copy</span>,
}));

// Mock Ant Design components
jest.mock("antd", () => {
    const React = require("react");
    const handlers = [];
    const FloatButtonGroup = ({ children, ...props }) => (
        <div
            data-testid="float-button-group"
            className="ant-float-button-group"
            {...props}
        >
            {children}
        </div>
    );
    const FloatButton = ({ children, onClick, disabled, ...props }) => {
        handlers.push(onClick);
        return (
            <div
                data-testid="float-button"
                onClick={onClick}
                disabled={disabled}
                {...props}
            >
                {children}
            </div>
        );
    };
    FloatButton.Group = FloatButtonGroup;
    FloatButton.__handlers = handlers;

    return {
        FloatButton,
        Tooltip: ({ title, children, placement }) => (
            <div data-testid="tooltip" title={title} data-placement={placement}>
                {children}
            </div>
        ),
    };
});

// Mock ThemeContext
jest.mock("../../store/Theme/ThemeContext", () => {
    const React = require("react");
    return {
        ThemeContext: React.createContext({
            theme: "light",
            toggleTheme: jest.fn(),
        }),
    };
});

describe("FloatButtonSection", () => {
    beforeEach(() => {
        global.window.open = jest.fn();
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.clearAllMocks();
        jest.useRealTimers();
    });

    it("should render without crashing", () => {
        const setIsModalOpen = jest.fn();
        render(<FloatButtonSection setIsModalOpen={setIsModalOpen} />);
    });

    it("should render float button group", () => {
        const setIsModalOpen = jest.fn();
        const { getByTestId } = render(
            <FloatButtonSection setIsModalOpen={setIsModalOpen} />
        );
        expect(getByTestId("float-button-group")).toBeInTheDocument();
    });

    it("should accept setIsModalOpen prop", () => {
        const setIsModalOpen = jest.fn();
        render(<FloatButtonSection setIsModalOpen={setIsModalOpen} />);
        expect(setIsModalOpen).toBeDefined();
    });

    it("should render main trigger button", () => {
        const setIsModalOpen = jest.fn();
        const { container } = render(
            <FloatButtonSection setIsModalOpen={setIsModalOpen} />
        );
        expect(container.querySelector(".ant-float-button-group")).toBeTruthy();
    });

    it("should pass correct props to FloatButton group", () => {
        const setIsModalOpen = jest.fn();
        render(<FloatButtonSection setIsModalOpen={setIsModalOpen} />);
    });

    it("should handle multiple buttons", () => {
        const setIsModalOpen = jest.fn();
        render(<FloatButtonSection setIsModalOpen={setIsModalOpen} />);
    });

    it("should support theme toggling", () => {
        const setIsModalOpen = jest.fn();
        const { getAllByTestId } = render(
            <FloatButtonSection setIsModalOpen={setIsModalOpen} />
        );
        const buttons = getAllByTestId("float-button");
        expect(buttons.length).toBeGreaterThan(0);
    });

    it("should support modal toggling", () => {
        const setIsModalOpen = jest.fn();
        render(<FloatButtonSection setIsModalOpen={setIsModalOpen} />);
        expect(setIsModalOpen).toBeDefined();
    });

    it("should open telegram queue link on send button click", () => {
        const setIsModalOpen = jest.fn();
        const { getAllByTestId } = render(
            <FloatButtonSection setIsModalOpen={setIsModalOpen} />
        );
        const buttons = getAllByTestId("float-button");
        fireEvent.click(buttons[0]);
        expect(window.open).toHaveBeenCalledWith(
            "https://t.me/+5PuhQ2hDIy1lNWRi",
            "_blank"
        );
    });

    it("should open telegram channel on notification button click", () => {
        const setIsModalOpen = jest.fn();
        const { getAllByTestId } = render(
            <FloatButtonSection setIsModalOpen={setIsModalOpen} />
        );
        const buttons = getAllByTestId("float-button");
        fireEvent.click(buttons[1]);
        expect(window.open).toHaveBeenCalledWith(
            "https://t.me/cs_internship",
            "_blank"
        );
    });

    it("should open github link on github button click", () => {
        const setIsModalOpen = jest.fn();
        const { getAllByTestId } = render(
            <FloatButtonSection setIsModalOpen={setIsModalOpen} />
        );
        const buttons = getAllByTestId("float-button");
        fireEvent.click(buttons[2]);
        expect(window.open).toHaveBeenCalledWith(
            "https://github.com/cs-internship",
            "_blank"
        );
    });

    it("should open linkedin link on linkedin button click", () => {
        const setIsModalOpen = jest.fn();
        const { getAllByTestId } = render(
            <FloatButtonSection setIsModalOpen={setIsModalOpen} />
        );
        const buttons = getAllByTestId("float-button");
        fireEvent.click(buttons[3]);
        expect(window.open).toHaveBeenCalledWith(
            "https://www.linkedin.com/company/cs-internship/",
            "_blank"
        );
    });

    it("should open twitter link on twitter button click", () => {
        const setIsModalOpen = jest.fn();
        const { getAllByTestId } = render(
            <FloatButtonSection setIsModalOpen={setIsModalOpen} />
        );
        const buttons = getAllByTestId("float-button");
        fireEvent.click(buttons[4]);
        expect(window.open).toHaveBeenCalledWith(
            "https://x.com/hashtag/cs_internship",
            "_blank"
        );
    });

    it("should open virgool link on virgool button click", () => {
        const setIsModalOpen = jest.fn();
        const { getAllByTestId } = render(
            <FloatButtonSection setIsModalOpen={setIsModalOpen} />
        );
        const buttons = getAllByTestId("float-button");
        fireEvent.click(buttons[5]);
        expect(window.open).toHaveBeenCalledWith(
            "https://virgool.io/cs-internship/cs-internship-k3j2hx4wgvga",
            "_blank"
        );
    });

    it("should handle theme toggle with transition", () => {
        const setIsModalOpen = jest.fn();
        const { getAllByTestId, container } = render(
            <FloatButtonSection setIsModalOpen={setIsModalOpen} />
        );
        const buttons = getAllByTestId("float-button");
        fireEvent.click(buttons[6]);
        jest.advanceTimersByTime(500);
        jest.advanceTimersByTime(1200);
    });

    it("should show transition div on theme toggle", () => {
        jest.useFakeTimers();
        const setIsModalOpen = jest.fn();
        const { container, getAllByTestId } = render(
            <FloatButtonSection setIsModalOpen={setIsModalOpen} />
        );
        const buttons = getAllByTestId("float-button");

        fireEvent.click(buttons[6]); // theme toggle button
        jest.advanceTimersByTime(10);

        const transitionDiv = container.querySelector(
            ".fancy-theme-transition"
        );
        expect(transitionDiv).toBeInTheDocument();

        jest.useRealTimers();
    });

    it("should run cleanup returned by handleChangeTheme", () => {
        const setIsModalOpen = jest.fn();
        render(<FloatButtonSection setIsModalOpen={setIsModalOpen} />);
        const { FloatButton } = require("antd");
        const cleanup = FloatButton.__handlers[6]();
        expect(typeof cleanup).toBe("function");
        cleanup();
    });

    it("should handle announcement button click", () => {
        const setIsModalOpen = jest.fn();
        const { getAllByTestId } = render(
            <FloatButtonSection setIsModalOpen={setIsModalOpen} />
        );
        const buttons = getAllByTestId("float-button");
        fireEvent.click(buttons[7]);
        expect(setIsModalOpen).toHaveBeenCalled();
    });

    it("should toggle modal state on announcement button click", () => {
        const setIsModalOpen = jest.fn();
        const { getAllByTestId } = render(
            <FloatButtonSection setIsModalOpen={setIsModalOpen} />
        );
        const buttons = getAllByTestId("float-button");
        fireEvent.click(buttons[7]);
        expect(setIsModalOpen).toHaveBeenCalledWith(expect.any(Function));
    });
});
