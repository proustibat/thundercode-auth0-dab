import { onError } from "@apollo/client/link/error";
import type { Mock } from "vitest";
import { createErrorLink } from "../createErrorLink";

vi.mock("@apollo/client/link/error", () => ({
    onError: vi.fn(),
}));

describe("createErrorLink", () => {
    it("should call displayToast for each GraphQL error", () => {
        const displayToastMock = vi.fn();
        createErrorLink(displayToastMock);

        const graphQLErrors = [
            { message: "Error 1", extensions: { code: "CODE1" } },
            { message: "Error 2", extensions: { code: "CODE2" } },
        ];
        const networkError = null;

        const errorHandler = (onError as Mock).mock.calls[0][0];
        errorHandler({ graphQLErrors, networkError });

        expect(displayToastMock).toHaveBeenCalledTimes(2);
        expect(displayToastMock).toHaveBeenCalledWith("[GraphQL error]: Error 1 (code: CODE1)");
        expect(displayToastMock).toHaveBeenCalledWith("[GraphQL error]: Error 2 (code: CODE2)");
    });

    it("should call displayToast for network errors", () => {
        const displayToastMock = vi.fn();
        createErrorLink(displayToastMock);

        const graphQLErrors = null;
        const networkError = "Network error occurred";

        const errorHandler = (onError as Mock).mock.calls[0][0];
        errorHandler({ graphQLErrors, networkError });

        expect(displayToastMock).toHaveBeenCalledTimes(1);
        expect(displayToastMock).toHaveBeenCalledWith("[Network error]: Network error occurred");
    });

    it("should log errors to the console", () => {
        const displayToastMock = vi.fn();
        createErrorLink(displayToastMock);

        const graphQLErrors = [{ message: "Error 1", extensions: { code: "CODE1" } }];
        const networkError = "Network error occurred";

        const consoleGroup = vi.spyOn(console, "group").mockImplementation(() => {});
        const consoleLog = vi.spyOn(console, "log").mockImplementation(() => {});
        const consoleWarn = vi.spyOn(console, "warn").mockImplementation(() => {});
        const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
        const consoleGroupEnd = vi.spyOn(console, "groupEnd").mockImplementation(() => {});

        const errorHandler = (onError as Mock).mock.calls[0][0];
        errorHandler({ graphQLErrors, networkError });

        expect(consoleGroup).toHaveBeenCalledWith("🔥 Apollo Error Link");
        expect(consoleLog).toHaveBeenCalledWith("GraphQL errors:", graphQLErrors);
        expect(consoleLog).toHaveBeenCalledWith("Network error:", networkError);
        expect(consoleWarn).toHaveBeenCalledWith("[GraphQL error]: Error 1 (code: CODE1)");
        expect(consoleError).toHaveBeenCalledWith("[Network error]: Network error occurred");
        expect(consoleGroupEnd).toHaveBeenCalled();
    });
});
