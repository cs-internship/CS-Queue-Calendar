import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CryptoJS from "crypto-js";
import CalendarIntro from "../../components/CalendarIntro";

jest.mock("antd", () => {
    const React = require("react");
    return {
        Card: ({ children, ...props }) => (
            <div data-testid="card" {...props}>
                {children}
            </div>
        ),
        Typography: {
            Paragraph: ({ children, ...props }) => <p {...props}>{children}</p>,
            Link: ({ children, ...props }) => <a {...props}>{children}</a>,
            Title: ({ children, ...props }) => <h1 {...props}>{children}</h1>,
        },
        Space: ({ children, ...props }) => <div {...props}>{children}</div>,
    };
});

jest.mock("@ant-design/icons", () => ({
    InfoCircleOutlined: () => <span>icon</span>,
}));

describe("CalendarIntro", () => {
    beforeEach(() => {
        window.open = jest.fn();
    });

    it("renders introductory content", () => {
        render(<CalendarIntro />);
        expect(screen.getByTestId("card")).toBeInTheDocument();
        expect(screen.getAllByRole("heading").length).toBeGreaterThan(0);
    });

    it("opens the decrypted link on every fourth click of the info icon", () => {
        render(<CalendarIntro />);

        const iconTrigger = screen.getByText("icon").parentElement;

        const encrypted =
            "U2FsdGVkX1/6Qzhsn/GOmvLuTL2y3E9PiuIq9z5eyMlHYCBbHTRgO4+YONp1oZPMWNvhHthzh2FtMlqpzQOYBA==";
        const expectedUrl = CryptoJS.AES.decrypt(
            encrypted,
            "1403-10-30"
        ).toString(CryptoJS.enc.Utf8);

        fireEvent.click(iconTrigger);
        fireEvent.click(iconTrigger);
        fireEvent.click(iconTrigger);
        expect(window.open).not.toHaveBeenCalled();

        fireEvent.click(iconTrigger);
        expect(window.open).toHaveBeenCalledWith(expectedUrl, "_blank");

        fireEvent.click(iconTrigger);
        fireEvent.click(iconTrigger);
        fireEvent.click(iconTrigger);
        fireEvent.click(iconTrigger);
        expect(window.open).toHaveBeenCalledTimes(2);
    });
});
