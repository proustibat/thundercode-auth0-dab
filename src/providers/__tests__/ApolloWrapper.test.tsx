import { useAuth0 } from "@auth0/auth0-react";
import { render } from "@testing-library/react";
import type { Mock } from "vitest";
import { ApolloWrapper } from "../ApolloWrapper.tsx";

// Mock de useAuth0
vi.mock("@auth0/auth0-react", () => ({
    useAuth0: vi.fn(),
}));

// Mock d'ApolloProvider
vi.mock("@apollo/client", () => ({
    ApolloProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    ApolloClient: vi.fn(),
    InMemoryCache: vi.fn(),
    createHttpLink: vi.fn(),
    from: vi.fn(),
    setContext: vi.fn(),
}));

describe("ApolloWrapper", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders children when authenticated", () => {
        // Mock des valeurs retournées par useAuth0
        (useAuth0 as Mock).mockReturnValue({
            getAccessTokenSilently: vi.fn(),
            isAuthenticated: true,
        });

        const { getByText } = render(
            <ApolloWrapper>
                <div>Test Child</div>
            </ApolloWrapper>
        );

        expect(getByText("Test Child")).toBeInTheDocument();
    });

    it("renders children when not authenticated", () => {
        // Mock des valeurs retournées par useAuth0
        (useAuth0 as Mock).mockReturnValue({
            getAccessTokenSilently: vi.fn(),
            isAuthenticated: false,
        });

        const { getByText } = render(
            <ApolloWrapper>
                <div>Test Child</div>
            </ApolloWrapper>
        );

        expect(getByText("Test Child")).toBeInTheDocument();
    });
});
