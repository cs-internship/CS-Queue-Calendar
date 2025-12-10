import CryptoJS from "crypto-js";
import { printEE } from "../../utils/printEE";

describe("printEE", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("logs decrypted message when a valid key is provided", () => {
        const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
        const warnSpy = jest
            .spyOn(console, "warn")
            .mockImplementation(() => {});

        printEE("Aloha");

        expect(logSpy).toHaveBeenCalled();
        expect(
            (logSpy.mock.calls[0][0] || "").toString().length
        ).toBeGreaterThan(0);
        expect(warnSpy).not.toHaveBeenCalled();
    });

    it("warns when decryption yields an empty string", () => {
        jest.spyOn(CryptoJS.AES, "decrypt").mockReturnValue({
            toString: () => "",
        });
        const warnSpy = jest
            .spyOn(console, "warn")
            .mockImplementation(() => {});

        printEE("bad-key");

        expect(warnSpy).toHaveBeenCalledWith(
            "Console message decryption failed."
        );
    });

    it("logs an error when decryption throws", () => {
        jest.spyOn(CryptoJS.AES, "decrypt").mockImplementation(() => {
            throw new Error("boom");
        });
        const errorSpy = jest
            .spyOn(console, "error")
            .mockImplementation(() => {});

        printEE("any");

        expect(errorSpy).toHaveBeenCalledWith(
            "Error decrypting console message:",
            expect.any(Error)
        );
    });
});
