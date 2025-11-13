import "@testing-library/jest-dom";

// Mock window.open
global.window.open = jest.fn();

// Reset mocks after each test
afterEach(() => {
    jest.clearAllMocks();
});

// Mock console methods
global.console = {
    log: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
};
