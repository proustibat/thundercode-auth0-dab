import { useAuth0 } from "@auth0/auth0-react";
import { Outlet, useLocation, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect } from "react";
import { toast } from "sonner";
import Menu from "../components/menu.tsx";

const LayoutPage = () => {
    const { isAuthenticated, error } = useAuth0();
    const search = useSearch({ from: "/_layout" });
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (search.redirect?.length && isAuthenticated) {
            navigate({ to: search.redirect });
        }
    }, [isAuthenticated, search, navigate]);

    useEffect(() => {
        if (location.searchStr === "?redirect=%2Fprojects") {
            toast.error("You tried to see a protected page, please login!");
        }
    }, [location]);

    useEffect(() => {
        if (error) {
            toast.error(`Auth0 error: ${error.message}`);
        }
    }, [error]);

    return (
        <>
            <Menu />
            <main className="mx-auto max-w-5xl pb-5">
                <Outlet />
            </main>
        </>
    );
};

export default LayoutPage;
