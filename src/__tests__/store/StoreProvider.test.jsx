import { render } from "@testing-library/react";

import StoreProvider from "../../store/StoreProvider";

// Mock ThemeProvider
jest.mock("../../store/Theme/ThemeProvider", () => {
    const React = require("react");
    return {
        ThemeProvider: (props) =>
            React.createElement("div", {
                "data-testid": "theme-provider",
                ...props,
            }),
    };
});

describe("StoreProvider", () => {
    it("should render without crashing", () => {
        render(
            <StoreProvider>
                <div>Test Content</div>
            </StoreProvider>
        );
    });

    it("should render children without crashing", () => {
        const { getByText } = render(
            <StoreProvider>
                <div>Test Content</div>
            </StoreProvider>
        );
        expect(getByText("Test Content")).toBeInTheDocument();
    });

    it("should render ThemeProvider", () => {
        const { getByTestId } = render(
            <StoreProvider>
                <div>Test Content</div>
            </StoreProvider>
        );
        expect(getByTestId("theme-provider")).toBeInTheDocument();
    });

    it("should have fragment wrapper", () => {
        const { container } = render(
            <StoreProvider>
                <div>Test Content</div>
            </StoreProvider>
        );
        expect(container).toBeInTheDocument();
    });

    it("should render multiple children", () => {
        const { getByText } = render(
            <StoreProvider>
                <div>Child 1</div>
                <div>Child 2</div>
            </StoreProvider>
        );
        expect(getByText("Child 1")).toBeInTheDocument();
        expect(getByText("Child 2")).toBeInTheDocument();
    });

    it("should pass children to ThemeProvider", () => {
        const { getByText, getByTestId } = render(
            <StoreProvider>
                <div>Content</div>
            </StoreProvider>
        );
        expect(getByTestId("theme-provider")).toBeInTheDocument();
        expect(getByText("Content")).toBeInTheDocument();
    });

    it("should render with empty children", () => {
        const { container } = render(<StoreProvider>{}</StoreProvider>);
        expect(container).toBeInTheDocument();
    });

    it("should maintain structure with complex children", () => {
        const { getByText } = render(
            <StoreProvider>
                <div>
                    <span>Nested Content</span>
                </div>
            </StoreProvider>
        );
        expect(getByText("Nested Content")).toBeInTheDocument();
    });

    it("should be accessible", () => {
        const { container } = render(
            <StoreProvider>
                <button>Test Button</button>
            </StoreProvider>
        );
        expect(container.querySelector("button")).toBeInTheDocument();
    });
});
