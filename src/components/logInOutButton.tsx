import { useAuth0 } from "@auth0/auth0-react";

const LoginOutButton = () => {
    const { logout, loginWithPopup, isAuthenticated, isLoading } = useAuth0();

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
        <button
            disabled={isLoading}
            type="button"
            onClick={isAuthenticated ? handleLogout : handleLogin}
            className="text-slate-100 rounded-md px-3 py-2 text-sm font-medium outline cursor-pointer hover:bg-slate-100 hover:text-slate-900"
        >
            {isAuthenticated ? "Logout" : "Login"}
        </button>
    );
};
export default LoginOutButton;
