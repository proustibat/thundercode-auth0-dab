import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { toast } from "sonner";
import { useAuthClaims } from "../hooks/useAuthClaims.ts";

const UserClaims = () => {
    const { isAuthenticated } = useAuth0();
    const { claims, error, isLoading } = useAuthClaims();

    if (!isAuthenticated) return null;

    useEffect(() => {
        if (error) {
            toast.error(`Error while loading claims: ${error.message}`);
        }
    }, [error]);

    return (
        <section className="dark:shadow-slate-950 shadow-slate-300 container mx-auto bg-slate-200 dark:bg-slate-800 sm:rounded-xl p-10 lg:mt-5 mt-3 dark:text-slate-300 text-slate-950 shadow-sm">
            <p className="mt-4 mb-1 text-sm sm:text-lg">Here are your decoded claims from token:</p>
            {isLoading ? (
                <div>Loading claims...</div>
            ) : (
                claims && (
                    <pre data-testid="user-claims" className="whitespace-pre-wrap overflow-auto text-xs sm:text-sm">
                        {JSON.stringify(claims, null, 2)}
                    </pre>
                )
            )}
        </section>
    );
};
export default UserClaims;
