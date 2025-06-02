import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { toast } from "sonner";

const LoginOutButton = () => {
    const { logout, loginWithPopup, isAuthenticated, isLoading } = useAuth0();

    useEffect(() => {
        if (isAuthenticated) {
            toast.success("Log in successfully.");
        }
    }, [isAuthenticated]);

    const handleLogout = async () => {
        await logout({ logoutParams: { returnTo: window.location.origin } });
        // await router.invalidate();
    };

    const handleLogin = async () => {
        await loginWithPopup({
            authorizationParams: {
                redirect_uri: window.location.origin,
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
