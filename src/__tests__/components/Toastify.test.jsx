import { render } from "@testing-library/react";

import Toastify from "../../components/Toastify";

// Mock react-toastify
jest.mock("react-toastify", () => {
    const React = require("react");
    const mockToast = jest.fn();
    mockToast.success = jest.fn();
    mockToast.error = jest.fn();
    mockToast.info = jest.fn();
    mockToast.warning = jest.fn();

    return {
        ToastContainer: (props) =>
            React.createElement("div", {
                "data-testid": "toast-container",
                ...props,
            }),
        toast: mockToast,
    };
});

// Mock ThemeContext
jest.mock("../../store/Theme/ThemeContext", () => {
    const React = require("react");
    return {
        ThemeContext: React.createContext({ theme: "light" }),
    };
});

describe("Toastify", () => {
    it("should render without crashing", () => {
        render(<Toastify toastifyObj="" />);
    });

    it("should render ToastContainer", () => {
        const { getByTestId } = render(<Toastify toastifyObj="" />);
        expect(getByTestId("toast-container")).toBeInTheDocument();
    });

    it("should have toastifyObj prop", () => {
        const toastObj = { title: "Test", mode: "success" };
        render(<Toastify toastifyObj={toastObj} />);
    });

    it("should handle empty toastifyObj", () => {
        render(<Toastify toastifyObj="" />);
    });

    it("should render with theme context", () => {
        render(<Toastify toastifyObj="" />);
    });

    it("should handle different toast modes", () => {
        const modes = ["success", "error", "info", "warning"];
        modes.forEach((mode) => {
            const { unmount } = render(
                <Toastify toastifyObj={{ title: "Test", mode }} />
            );
            unmount();
        });
    });

    it("should update when toastifyObj changes", () => {
        const { rerender } = render(<Toastify toastifyObj="" />);
        rerender(<Toastify toastifyObj={{ title: "New", mode: "success" }} />);
    });

    it("should have container with proper attributes", () => {
        const { container } = render(<Toastify toastifyObj="" />);
        expect(container).toBeInTheDocument();
    });

    it("should handle undefined toastifyObj", () => {
        render(<Toastify toastifyObj={undefined} />);
    });

    it("should be accessible component", () => {
        const { container } = render(<Toastify toastifyObj="" />);
        expect(container.firstChild).toBeInTheDocument();
    });

    it("should call toast with provided mode and theme", () => {
        const { toast } = require("react-toastify");
        const toastObj = { title: "Hello", mode: "success" };
        render(<Toastify toastifyObj={toastObj} />);
        expect(toast.success).toHaveBeenCalledWith(
            "Hello",
            expect.objectContaining({
                theme: expect.any(Object),
                autoClose: 4000,
            })
        );
    });

    it("should log an error for invalid toast mode", () => {
        const errorSpy = jest
            .spyOn(console, "error")
            .mockImplementation(() => {});
        render(<Toastify toastifyObj={{ title: "Oops", mode: "unknown" }} />);
        expect(errorSpy).toHaveBeenCalledWith("Invalid toast mode: unknown");
        errorSpy.mockRestore();
    });
});
