import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "../../components/Footer";

describe("Footer", () => {
    it("should render without crashing", () => {
        render(<Footer />);
    });

    it("should render anchor element", () => {
        render(<Footer />);
        const link = screen.getByRole("link");
        expect(link).toBeInTheDocument();
    });

    it("should have correct href to GitHub", () => {
        render(<Footer />);
        const link = screen.getByRole("link");
        expect(link).toHaveAttribute(
            "href",
            "https://github.com/cs-internship"
        );
    });

    it("should have target _blank", () => {
        render(<Footer />);
        const link = screen.getByRole("link");
        expect(link).toHaveAttribute("target", "_blank");
    });

    it("should have rel noreferrer", () => {
        render(<Footer />);
        const link = screen.getByRole("link");
        expect(link).toHaveAttribute("rel", "noreferrer");
    });

    it("should display copyright text", () => {
        render(<Footer />);
        expect(screen.getByText(/© CS Internship/)).toBeInTheDocument();
    });

    it("should display year", () => {
        render(<Footer />);
        const currentYear = new Date().getFullYear();
        expect(screen.getByText(new RegExp(currentYear))).toBeInTheDocument();
    });

    it("should have page-footer class", () => {
        const { container } = render(<Footer />);
        expect(container.querySelector(".page-footer")).toBeInTheDocument();
    });

    it("should be accessible link", () => {
        render(<Footer />);
        const link = screen.getByRole("link");
        expect(link.getAttribute("href")).toBeTruthy();
        expect(link.getAttribute("rel")).toBe("noreferrer");
    });
});
