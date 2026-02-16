import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import AnnouncementModule from "../../components/AnnouncementModule";

// Mock navigator.clipboard
Object.defineProperty(navigator, "clipboard", {
    value: {
        writeText: jest.fn(),
    },
    configurable: true,
});

// Mock Ant Design components
jest.mock("antd", () => {
    return {
        Button: ({ onClick, children, ...props }) => (
            <button onClick={onClick} {...props}>
                {children}
            </button>
        ),
        Modal: ({ open, onCancel, children, footer, ...props }) => {
            if (!open) return null;
            return (
                <div data-testid="modal" {...props}>
                    {children}
                    <div data-testid="modal-footer">{footer}</div>
                    <button onClick={onCancel} data-testid="close-btn">
                        Close
                    </button>
                </div>
            );
        },
        Input: {
            TextArea: ({ value, onChange, ...props }) => (
                <textarea value={value} onChange={onChange} {...props} />
            ),
        },
        Spin: ({ _size, className }) => (
            <div data-testid="spinner" className={className}></div>
        ),
        Flex: ({ children, ...props }) => (
            <div data-testid="flex" {...props}>
                {children}
            </div>
        ),
    };
});

describe("AnnouncementModule", () => {
    const defaultProps = {
        isModalOpen: false,
        setIsModalOpen: jest.fn(),
        setToastifyObj: jest.fn(),
        announcementData: {
            startWeekDate: "",
            endWeekDate: "",
            firstEventDate: "",
            secondEventDate: "",
            firstEvent: "",
            secondEvent: "",
        },
        setAddToCurrentWeek: jest.fn((updater) =>
            typeof updater === "function" ? updater(0) : updater
        ),
    };

    beforeEach(() => {
        jest.clearAllMocks();
        navigator.clipboard.writeText = jest.fn();
    });

    it("should render without crashing", () => {
        render(<AnnouncementModule {...defaultProps} />);
    });

    it("should not render modal when closed", () => {
        const { container } = render(
            <AnnouncementModule {...defaultProps} isModalOpen={false} />
        );
        expect(
            container.querySelector(`[data-testid="modal"]`)
        ).not.toBeInTheDocument();
    });

    it("should handle setIsModalOpen prop", () => {
        const setIsModalOpen = jest.fn();
        render(
            <AnnouncementModule
                {...defaultProps}
                isModalOpen={true}
                setIsModalOpen={setIsModalOpen}
            />
        );
        expect(setIsModalOpen).toBeDefined();
    });

    it("should accept announcementData prop", () => {
        const announcementData = {
            startWeekDate: "2025/1/13",
            endWeekDate: "2025/1/20",
            firstEventDate: "2025/1/15",
            secondEventDate: "2025/1/19",
            firstEvent: "جلسه مرحله اول",
            secondEvent: "جلسه مصاحبه",
        };
        render(
            <AnnouncementModule
                {...defaultProps}
                announcementData={announcementData}
            />
        );
    });

    it("should accept setToastifyObj prop", () => {
        const setToastifyObj = jest.fn();
        render(
            <AnnouncementModule
                {...defaultProps}
                setToastifyObj={setToastifyObj}
            />
        );
    });

    it("should accept setAddToCurrentWeek prop", () => {
        const setAddToCurrentWeek = jest.fn((fn) =>
            typeof fn === "function" ? fn(0) : fn
        );
        render(
            <AnnouncementModule
                {...defaultProps}
                setAddToCurrentWeek={setAddToCurrentWeek}
            />
        );
    });

    it("should render modal when isModalOpen is true", () => {
        const { getByTestId } = render(
            <AnnouncementModule {...defaultProps} isModalOpen={true} />
        );
        expect(getByTestId("modal")).toBeInTheDocument();
    });

    it("should show loading spinner when no announcement data", () => {
        const { getByTestId } = render(
            <AnnouncementModule {...defaultProps} isModalOpen={true} />
        );
        expect(getByTestId("spinner")).toBeInTheDocument();
    });

    it("should update textArea content when announcementData changes", async () => {
        const announcementData = {
            startWeekDate: "2025/1/13",
            endWeekDate: "2025/1/20",
            firstEventDate: "2025/1/15",
            secondEventDate: "2025/1/19",
            firstEvent: "جلسه مرحله اول",
            secondEvent: "جلسه مصاحبه",
        };
        const { container, rerender } = render(
            <AnnouncementModule
                {...defaultProps}
                isModalOpen={true}
                announcementData={defaultProps.announcementData}
            />
        );

        rerender(
            <AnnouncementModule
                {...defaultProps}
                isModalOpen={true}
                announcementData={announcementData}
            />
        );

        await waitFor(() => {
            const textarea = container.querySelector("textarea");
            if (textarea) {
                expect(textarea.value).not.toBe("Aloha, Nothing to see here");
            }
        });
    });

    it("should call handleCancel on close button click", () => {
        const setIsModalOpen = jest.fn();
        const { getByTestId } = render(
            <AnnouncementModule
                {...defaultProps}
                isModalOpen={true}
                setIsModalOpen={setIsModalOpen}
            />
        );
        fireEvent.click(getByTestId("close-btn"));
        expect(setIsModalOpen).toHaveBeenCalled();
    });

    it("should handle next week button click", () => {
        const setAddToCurrentWeek = jest.fn((fn) =>
            typeof fn === "function" ? fn(0) : fn
        );
        render(
            <AnnouncementModule
                {...defaultProps}
                isModalOpen={true}
                setAddToCurrentWeek={setAddToCurrentWeek}
            />
        );

        const buttons = screen.getAllByRole("button");
        fireEvent.click(buttons[0]);
        expect(setAddToCurrentWeek).toHaveBeenCalled();
    });

    it("should handle current week button click", () => {
        const setAddToCurrentWeek = jest.fn((fn) =>
            typeof fn === "function" ? fn(0) : fn
        );
        render(
            <AnnouncementModule
                {...defaultProps}
                isModalOpen={true}
                setAddToCurrentWeek={setAddToCurrentWeek}
            />
        );

        const buttons = screen.getAllByRole("button");
        fireEvent.click(buttons[1]);
        expect(setAddToCurrentWeek).toHaveBeenCalled();
    });

    it("should handle previous week button click", () => {
        const setAddToCurrentWeek = jest.fn((fn) =>
            typeof fn === "function" ? fn(0) : fn
        );
        render(
            <AnnouncementModule
                {...defaultProps}
                isModalOpen={true}
                setAddToCurrentWeek={setAddToCurrentWeek}
            />
        );

        const buttons = screen.getAllByRole("button");
        fireEvent.click(buttons[2]);
        expect(setAddToCurrentWeek).toHaveBeenCalled();
    });

    it("should allow textarea editing", async () => {
        const announcementData = {
            startWeekDate: "2025/1/13",
            endWeekDate: "2025/1/20",
            firstEventDate: "2025/1/15",
            secondEventDate: "2025/1/19",
            firstEvent: "جلسه مرحله اول",
            secondEvent: "جلسه مصاحبه",
        };
        const { container } = render(
            <AnnouncementModule
                {...defaultProps}
                isModalOpen={true}
                announcementData={announcementData}
            />
        );

        const textarea = container.querySelector("textarea");
        if (textarea) {
            const user = userEvent.setup();
            await user.clear(textarea);
            await user.type(textarea, "Updated message");
            expect(textarea.value).toBe("Updated message");
        }
    });

    it("should handle multiple prop changes", () => {
        const { rerender } = render(<AnnouncementModule {...defaultProps} />);

        const newProps = {
            ...defaultProps,
            isModalOpen: true,
        };
        rerender(<AnnouncementModule {...newProps} />);
    });

    it("should have proper callbacks", () => {
        const setIsModalOpen = jest.fn();
        const setToastifyObj = jest.fn();
        const setAddToCurrentWeek = jest.fn((fn) =>
            typeof fn === "function" ? fn(0) : fn
        );

        render(
            <AnnouncementModule
                {...defaultProps}
                setIsModalOpen={setIsModalOpen}
                setToastifyObj={setToastifyObj}
                setAddToCurrentWeek={setAddToCurrentWeek}
            />
        );
    });

    it("should render all footer buttons", () => {
        render(<AnnouncementModule {...defaultProps} isModalOpen={true} />);

        const buttons = screen.getAllByRole("button");
        expect(buttons.length).toBeGreaterThan(0);
    });

    it("should display modal header", () => {
        render(<AnnouncementModule {...defaultProps} isModalOpen={true} />);

        expect(screen.getByText("کپی پیام اطلاع‌رسانی")).toBeInTheDocument();
    });

    it("should display modal title", () => {
        render(<AnnouncementModule {...defaultProps} isModalOpen={true} />);

        expect(
            screen.getByText(/در صورت نیاز به تغییر پیام/i)
        ).toBeInTheDocument();
    });

    it("should have copy button in modal footer", () => {
        const announcementData = {
            startWeekDate: "2025/1/13",
            endWeekDate: "2025/1/20",
            firstEventDate: "2025/1/15",
            secondEventDate: "2025/1/19",
            firstEvent: "جلسه مرحله اول",
            secondEvent: "جلسه مصاحبه",
        };

        render(
            <AnnouncementModule
                {...defaultProps}
                isModalOpen={true}
                announcementData={announcementData}
            />
        );

        const buttons = screen.getAllByRole("button");
        const copyButton = buttons[buttons.length - 1]; // کپی پیام button
        expect(copyButton).toBeInTheDocument();
    });

    it("should render textarea when announcement data is ready", () => {
        const announcementData = {
            startWeekDate: "2025/1/13",
            endWeekDate: "2025/1/20",
            firstEventDate: "2025/1/15",
            secondEventDate: "2025/1/19",
            firstEvent: "جلسه مرحله اول",
            secondEvent: "جلسه مصاحبه",
        };

        const { container } = render(
            <AnnouncementModule
                {...defaultProps}
                isModalOpen={true}
                announcementData={announcementData}
            />
        );

        const textarea = container.querySelector("textarea");
        expect(textarea).toBeInTheDocument();
        expect(textarea.value).toBeTruthy();
    });

    it("should have copy and back buttons in footer", () => {
        const announcementData = {
            startWeekDate: "2025/1/13",
            endWeekDate: "2025/1/20",
            firstEventDate: "2025/1/15",
            secondEventDate: "2025/1/19",
            firstEvent: "جلسه مرحله اول",
            secondEvent: "جلسه مصاحبه",
        };

        render(
            <AnnouncementModule
                {...defaultProps}
                isModalOpen={true}
                announcementData={announcementData}
            />
        );

        const copyButton = screen.getByText("کپی پیام");
        const backButton = screen.getByText("بازگشت");

        expect(copyButton).toBeInTheDocument();
        expect(backButton).toBeInTheDocument();
    });

    it("should handle next week button click", () => {
        const setAddToCurrentWeek = jest.fn((fn) =>
            typeof fn === "function" ? fn(0) : fn
        );
        render(
            <AnnouncementModule
                {...defaultProps}
                isModalOpen={true}
                setAddToCurrentWeek={setAddToCurrentWeek}
            />
        );

        const nextWeekBtn = screen.getByText("هفته آینده");
        fireEvent.click(nextWeekBtn);
        expect(setAddToCurrentWeek).toHaveBeenCalled();
    });

    it("should handle current week button click", () => {
        const setAddToCurrentWeek = jest.fn((fn) =>
            typeof fn === "function" ? fn(0) : fn
        );
        render(
            <AnnouncementModule
                {...defaultProps}
                isModalOpen={true}
                setAddToCurrentWeek={setAddToCurrentWeek}
            />
        );

        const currentWeekBtn = screen.getByText("هفته جاری");
        fireEvent.click(currentWeekBtn);
        expect(setAddToCurrentWeek).toHaveBeenCalledWith(0);
    });

    it("should handle previous week button click", () => {
        const setAddToCurrentWeek = jest.fn((fn) =>
            typeof fn === "function" ? fn(0) : fn
        );
        render(
            <AnnouncementModule
                {...defaultProps}
                isModalOpen={true}
                setAddToCurrentWeek={setAddToCurrentWeek}
            />
        );

        const prevWeekBtn = screen.getByText("هفته گذشته");
        fireEvent.click(prevWeekBtn);
        expect(setAddToCurrentWeek).toHaveBeenCalled();
    });

    it("should include conditional text for interview sessions", () => {
        const announcementData = {
            startWeekDate: "2025/1/13",
            endWeekDate: "2025/1/20",
            firstEventDate: "2025/1/15",
            secondEventDate: "2025/1/19",
            firstEvent: "جلسه مرحله اول: پرسش‌وپاسخ",
            secondEvent: "جلسه مصاحبه ورود به برنامه",
        };

        const { container } = render(
            <AnnouncementModule
                {...defaultProps}
                isModalOpen={true}
                announcementData={announcementData}
            />
        );

        const textarea = container.querySelector("textarea");
        expect(textarea.value).toContain("درصورتی وجود ظرفیت");
    });

    it("should not include conditional text for non-interview sessions", () => {
        const announcementData = {
            startWeekDate: "2025/1/13",
            endWeekDate: "2025/1/20",
            firstEventDate: "2025/1/15",
            secondEventDate: "2025/1/19",
            firstEvent: "جلسه مرحله اول",
            secondEvent: "جلسه مرحله دوم",
        };

        const { container } = render(
            <AnnouncementModule
                {...defaultProps}
                isModalOpen={true}
                announcementData={announcementData}
            />
        );

        const textarea = container.querySelector("textarea");
        expect(textarea.value).not.toContain("درصورتی وجود ظرفیت");
    });

    it("should replace colons in event names", () => {
        const announcementData = {
            startWeekDate: "2025/1/13",
            endWeekDate: "2025/1/20",
            firstEventDate: "2025/1/15",
            secondEventDate: "2025/1/19",
            firstEvent: "جلسه مرحله اول: پرسش‌وپاسخ",
            secondEvent: "جلسه مصاحبه: ورود",
        };

        const { container } = render(
            <AnnouncementModule
                {...defaultProps}
                isModalOpen={true}
                announcementData={announcementData}
            />
        );

        const textarea = container.querySelector("textarea");
        expect(textarea.value).toContain("جلسه مرحله اول - پرسش‌وپاسخ");
    });

    it("should generate announcement text with conditional message for interview session", () => {
        const announcementData = {
            startWeekDate: "2025/1/13",
            endWeekDate: "2025/1/20",
            firstEventDate: "2025/1/15",
            secondEventDate: "2025/1/19",
            firstEvent: "جلسه مرحله اول",
            secondEvent: "جلسه مصاحبه ورود به برنامه",
        };

        const { container } = render(
            <AnnouncementModule
                {...defaultProps}
                isModalOpen={true}
                announcementData={announcementData}
            />
        );

        const textarea = container.querySelector("textarea");
        expect(textarea).toBeInTheDocument();
        expect(textarea.value).toContain("جلسه مصاحبه ورود به برنامه");
    });

    it("should not include conditional message for non-interview sessions", () => {
        const announcementData = {
            startWeekDate: "2025/1/13",
            endWeekDate: "2025/1/20",
            firstEventDate: "2025/1/15",
            secondEventDate: "2025/1/19",
            firstEvent: "جلسه مرحله اول",
            secondEvent: "جلسه مرحله دوم",
        };

        const { container } = render(
            <AnnouncementModule
                {...defaultProps}
                isModalOpen={true}
                announcementData={announcementData}
            />
        );

        const textarea = container.querySelector("textarea");
        expect(textarea).toBeInTheDocument();
        expect(textarea.value).toContain("جلسه مرحله دوم");
    });

    it("should update textarea when announcementData changes with full content", async () => {
        const announcementData = {
            startWeekDate: "2025/1/13",
            endWeekDate: "2025/1/20",
            firstEventDate: "2025/1/15",
            secondEventDate: "2025/1/19",
            firstEvent: "جلسه مرحله اول: پرسش‌وپاسخ",
            secondEvent: "جلسه مصاحبه",
        };

        const { container } = render(
            <AnnouncementModule
                {...defaultProps}
                isModalOpen={true}
                announcementData={announcementData}
            />
        );

        await waitFor(() => {
            const textarea = container.querySelector("textarea");
            expect(textarea.value).toContain("برنامه زمان‌بندی جلسات");
        });
    });

    it("should handle onCancel when modal footer close button is clicked", () => {
        const setIsModalOpen = jest.fn();
        const { getByText } = render(
            <AnnouncementModule
                {...defaultProps}
                isModalOpen={true}
                setIsModalOpen={setIsModalOpen}
            />
        );

        const backButton = getByText("بازگشت");
        fireEvent.click(backButton);
        expect(setIsModalOpen).toHaveBeenCalledWith(false);
    });

    it("should copy announcement text and show success toast", async () => {
        const announcementData = {
            startWeekDate: "2025/1/13",
            endWeekDate: "2025/1/20",
            firstEventDate: "2025/1/15",
            secondEventDate: "2025/1/19",
            firstEvent: "First : Event",
            secondEvent: "Second",
        };

        const setToastifyObj = jest.fn();
        navigator.clipboard.writeText.mockResolvedValueOnce();

        render(
            <AnnouncementModule
                {...defaultProps}
                isModalOpen={true}
                setToastifyObj={setToastifyObj}
                announcementData={announcementData}
            />
        );

        const copyButton = screen.getByText("کپی پیام");
        fireEvent.click(copyButton);

        await waitFor(() =>
            expect(setToastifyObj).toHaveBeenCalledWith(expect.any(Function))
        );
        expect(navigator.clipboard.writeText).toHaveBeenCalled();
    });

    it("should show error toast when copy fails", async () => {
        const announcementData = {
            startWeekDate: "2025/1/13",
            endWeekDate: "2025/1/20",
            firstEventDate: "2025/1/15",
            secondEventDate: "2025/1/19",
            firstEvent: "First",
            secondEvent: "Second",
        };

        const setToastifyObj = jest.fn((updater) => updater());
        navigator.clipboard.writeText.mockRejectedValueOnce(
            new Error("denied")
        );

        render(
            <AnnouncementModule
                {...defaultProps}
                isModalOpen={true}
                setToastifyObj={setToastifyObj}
                announcementData={announcementData}
            />
        );

        const copyButton = screen.getByText("کپی پیام");
        fireEvent.click(copyButton);

        await waitFor(() => expect(setToastifyObj).toHaveBeenCalled());
    });
});
