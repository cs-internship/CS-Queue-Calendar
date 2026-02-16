import React from "react";
import { act } from "react-dom/test-utils";

const mockRender = jest.fn();

jest.mock("react-dom/client", () => ({
    createRoot: jest.fn(() => ({ render: mockRender })),
}));

jest.mock("../App", () => {
    const MockApp = () => <div data-testid="app" />;
    MockApp.displayName = "App";
    return MockApp;
});

jest.mock("../store/StoreProvider", () => {
    const React = require("react");
    function MockStoreProvider({ children }) {
        return <div data-testid="store-provider">{children}</div>;
    }
    MockStoreProvider.displayName = "StoreProvider";
    return {
        __esModule: true,
        default: MockStoreProvider,
    };
});

const mockPrintEE = jest.fn();
jest.mock("../utils/printEE", () => ({ printEE: mockPrintEE }));

jest.mock("../assets/scss/index.scss", () => ({}), { virtual: true });

describe("index.jsx entry point", () => {
    beforeEach(() => {
        document.body.innerHTML = `<div id="root"></div>`;
        const { createRoot } = require("react-dom/client");
        createRoot.mockReturnValue({ render: mockRender });
        createRoot.mockClear();
        mockRender.mockClear();
        mockPrintEE.mockClear();
    });

    it("initializes the React root, renders the app tree, and calls printEE", async () => {
        await act(async () => {
            jest.isolateModules(() => {
                require("../index.jsx");
            });
        });

        const { createRoot } = require("react-dom/client");

        expect(createRoot).toHaveBeenCalledWith(
            document.getElementById("root")
        );
        expect(mockRender).toHaveBeenCalled();
        const renderedTree = mockRender.mock.calls[0][0];
        expect(renderedTree.type).toBe(React.StrictMode);
        expect(mockPrintEE).toHaveBeenCalledWith("Aloha");
    });

    it("wraps the App component with StoreProvider", async () => {
        await act(async () => {
            jest.isolateModules(() => {
                require("../index.jsx");
            });
        });

        const renderedTree = mockRender.mock.calls[0][0];
        const strictChildren = renderedTree.props.children;
        expect(strictChildren.type.displayName).toBe("StoreProvider");
        const appElement = strictChildren.props.children;
        const appType = appElement.type.displayName || appElement.type.name;
        expect(appType).toBe("App");
    });
});
