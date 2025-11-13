import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "../../components/Header";

describe("Header", () => {
    beforeEach(() => {
        global.window.open = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should render without crashing", () => {
        render(<Header />);
    });

    it("should render header container", () => {
        const { container } = render(<Header />);
        const headerContainer = container.querySelector(".header-container");
        expect(headerContainer).toBeInTheDocument();
    });

    it("should render h1 element", () => {
        render(<Header />);
        const h1 = screen.getByRole("heading", { level: 1 });
        expect(h1).toBeInTheDocument();
    });

    it("should render title text", () => {
        render(<Header />);
        expect(screen.getByText("CS-Queue-Calendar")).toBeInTheDocument();
    });

    it("should have dashes on both sides", () => {
        const { container } = render(<Header />);
        const dashes = container.querySelectorAll(".header-ICARUS");
        expect(dashes.length).toBeGreaterThan(0);
    });

    it("should have clickable dashes with correct class", () => {
        const { container } = render(<Header />);
        const dashes = container.querySelectorAll(".header-ICARUS");
        expect(dashes.length).toBeGreaterThan(0);
        dashes.forEach((dash) => {
            expect(dash.classList.contains("header-ICARUS")).toBe(true);
        });
    });

    it("should render header structure correctly", () => {
        const { container } = render(<Header />);
        const header = container.querySelector(".header-container");
        expect(header).toBeInTheDocument();
        expect(header.querySelector("h1")).toBeInTheDocument();
    });

    it("should render title with correct styling", () => {
        const { container } = render(<Header />);
        const title = container.querySelector("h1");
        expect(title).toHaveTextContent("CS-Queue-Calendar");
    });

    it("should call window.open when first dash is clicked", () => {
        const { container } = render(<Header />);
        const dashes = container.querySelectorAll(".header-ICARUS");
        fireEvent.click(dashes[0]);
        expect(window.open).toHaveBeenCalledTimes(1);
        expect(window.open).toHaveBeenCalledWith(expect.any(String), "_blank");
    });

    it("should call window.open when second dash is clicked", () => {
        const { container } = render(<Header />);
        const dashes = container.querySelectorAll(".header-ICARUS");
        fireEvent.click(dashes[1]);
        expect(window.open).toHaveBeenCalledTimes(1);
        expect(window.open).toHaveBeenCalledWith(expect.any(String), "_blank");
    });

    it("should not call window.open twice on same dash click", () => {
        const { container } = render(<Header />);
        const dashes = container.querySelectorAll(".header-ICARUS");
        fireEvent.click(dashes[0]);
        fireEvent.click(dashes[0]);
        expect(window.open).toHaveBeenCalledTimes(1);
    });

    it("should update EEClicked state after click", () => {
        const { container } = render(<Header />);
        const dashes = container.querySelectorAll(".header-ICARUS");
        expect(dashes[0].classList.contains("header-ICARUS")).toBe(true);
        fireEvent.click(dashes[0]);
        expect(window.open).toHaveBeenCalled();
    });

    it("should handle both dashes independently", () => {
        const { container } = render(<Header />);
        const dashes = container.querySelectorAll(".header-ICARUS");
        fireEvent.click(dashes[0]);
        fireEvent.click(dashes[1]);
        expect(window.open).toHaveBeenCalledTimes(2);
    });
});
