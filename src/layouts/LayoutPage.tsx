import { useAuth0 } from "@auth0/auth0-react";
import { Outlet, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect } from "react";
import Menu from "../components/menu.tsx";

const LayoutPage = () => {
    const { isAuthenticated, error } = useAuth0();
    const search = useSearch({ from: "/_layout" });
    const navigate = useNavigate();

    useEffect(() => {
        if (search.redirect?.length && isAuthenticated) {
            navigate({ to: search.redirect });
        }
    }, [isAuthenticated, search, navigate]);

    return (
        <>
            <Menu />
            <main className="mx-auto max-w-5xl pb-5">
                {search.redirect && <p>You tried to see a protected page, please login!</p>}
                {error && <p>Auth0 error: {error.message}</p>}
                <Outlet />
            </main>
        </>
    );
};

export default LayoutPage;
