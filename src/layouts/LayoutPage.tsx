import { useAuth0 } from "@auth0/auth0-react";
import { Link, Outlet, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect } from "react";

const navigation = [
    { name: "Home", to: "/" },
    { name: "Profile", to: "/profile" },
    { name: "Projects", to: "/projects" },
];

const LayoutPage = () => {
    const { logout, loginWithPopup, isAuthenticated, isLoading } = useAuth0();
    const search = useSearch({ from: "/_layout" });
    const navigate = useNavigate();

    useEffect(() => {
        if (search.redirect?.length && isAuthenticated) {
            navigate({ to: search.redirect });
        }
    }, [isAuthenticated, search, navigate]);

    const handleLogout = async () => {
        await logout();
        // await router.invalidate();
    };

    const handleLogin = async () => {
        await loginWithPopup({
            authorizationParams: {
                redirect_uri: window.location.href,
            },
        });
        // await router.invalidate();
    };

    return (
        <>
            <nav>
                {search.redirect && <p>You tried to see a protected page, please login</p>}
                <ul>
                    {navigation.map((item) => (
                        <li key={item.name}>
                            <Link to={item.to}>{item.name}</Link>
                        </li>
                    ))}
                </ul>
                {!isLoading && (
                    <button type="button" onClick={isAuthenticated ? handleLogout : handleLogin}>
                        {isAuthenticated ? "Logout" : "Login"}
                    </button>
                )}
            </nav>
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default LayoutPage;
