import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import App from "../App";
import { ThemeContext } from "../store/Theme/ThemeContext";

jest.mock("antd", () => {
    const theme = {
        defaultAlgorithm: "defaultAlgorithm",
        darkAlgorithm: "darkAlgorithm",
    };

    const ConfigProvider = ({ children, theme: themeProp }) => (
        <div
            data-testid="config-provider"
            data-theme={JSON.stringify(themeProp)}
        >
            {children}
        </div>
    );

    return { ConfigProvider, theme };
});

const mockCsCalendar = jest.fn();
let mockAnnouncementProps = null;

jest.mock("../components/CSCalendar", () => {
    const React = require("react");
    return function MockCSCalendar(props) {
        mockCsCalendar(props);

        const { setAnnouncementData } = props;

        React.useEffect(() => {
            setAnnouncementData({
                startWeekDate: "2025/01/13",
                endWeekDate: "2025/01/20",
                firstEventDate: "2025/01/15",
                secondEventDate: "2025/01/19",
                firstEvent: "First",
                secondEvent: "Second",
            });
        }, [setAnnouncementData]);

        return <div data-testid="calendar" />;
    };
});

jest.mock("../components/Footer", () => {
    const MockFooter = () => <div data-testid="footer">footer</div>;

    MockFooter.displayName = "MockFooter";

    return MockFooter;
});

jest.mock("../components/FloatButtonSection", () => {
    return function MockFloatButtonSection({ setIsModalOpen }) {
        return (
            <button
                data-testid="float-toggle"
                onClick={() => setIsModalOpen(true)}
            >
                toggle
            </button>
        );
    };
});

jest.mock("../components/AnnouncementModule", () => {
    return function MockAnnouncementModule(props) {
        mockAnnouncementProps = props;
        return (
            <div
                data-testid="announcement"
                onClick={() => props.setAddToCurrentWeek((prev) => prev + 1)}
            >
                announcement
            </div>
        );
    };
});

jest.mock("../components/Toastify", () => {
    return function MockToastify({ toastifyObj }) {
        return (
            <div data-testid="toastify" data-mode={toastifyObj?.mode || ""} />
        );
    };
});

describe("App", () => {
    beforeEach(() => {
        document.body.className = "";
        jest.useFakeTimers();
        jest.clearAllMocks();
        mockAnnouncementProps = null;
        mockCsCalendar.mockClear();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    const renderWithTheme = (themeValue = "light") =>
        render(
            <ThemeContext.Provider
                value={{ theme: themeValue, toggleTheme: jest.fn() }}
            >
                <App />
            </ThemeContext.Provider>
        );

    it("applies the correct theme algorithm and mounts children for light mode", () => {
        renderWithTheme("light");
        jest.runAllTimers();

        const providers = screen.getAllByTestId("config-provider");
        expect(providers.length).toBeGreaterThan(0);
        const outerTheme = JSON.parse(providers[0].dataset.theme);
        expect(outerTheme.algorithm).toBe("defaultAlgorithm");
        expect(screen.getByTestId("calendar")).toBeInTheDocument();
        expect(screen.getByTestId("footer")).toBeInTheDocument();
    });

    it("switches to dark algorithm when theme context is dark", () => {
        renderWithTheme("dark");
        jest.runAllTimers();

        const providers = screen.getAllByTestId("config-provider");
        const outerTheme = JSON.parse(providers[0].dataset.theme);
        expect(outerTheme.algorithm).toBe("darkAlgorithm");
    });

    it("adds the loaded class to body after the initial effect", () => {
        renderWithTheme();
        expect(document.body.classList.contains("loaded")).toBe(false);
        jest.runAllTimers();
        expect(document.body.classList.contains("loaded")).toBe(true);
    });

    it("propagates announcement data from calendar to announcement module", async () => {
        renderWithTheme();
        await waitFor(() =>
            expect(mockAnnouncementProps?.announcementData?.firstEvent).toBe(
                "First"
            )
        );
        expect(mockCsCalendar).toHaveBeenCalled();
    });

    it("updates addToCurrentWeek state when announcement module requests it", async () => {
        renderWithTheme();
        fireEvent.click(screen.getByTestId("announcement"));

        await waitFor(() => {
            const lastCall =
                mockCsCalendar.mock.calls[mockCsCalendar.mock.calls.length - 1];
            expect(lastCall[0].addToCurrentWeek).toBe(1);
        });
    });

    it("opens the announcement modal via float button toggle", async () => {
        renderWithTheme();
        fireEvent.click(screen.getByTestId("float-toggle"));

        await waitFor(() =>
            expect(mockAnnouncementProps?.isModalOpen).toBe(true)
        );
    });
});
