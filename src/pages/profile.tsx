import { useAuth0 } from "@auth0/auth0-react";
import { useAuthClaims } from "../hooks/useAuthClaims.ts";

const ProfilePage = () => {
    const { user, isAuthenticated, isLoading: isLoadingAuth0, error: errorAuth0 } = useAuth0();
    const { claims, error: errorClaims, isLoading: isLoadingClaims } = useAuthClaims();

    return (
        <>
            <h1>Profile page</h1>
            {!isAuthenticated ? (
                <p className="text-xs mt-5">Please login to your account to see your profile and your claims</p>
            ) : (
                <>
                    <div>
                        <h2>Auth0Information</h2>
                        {isLoadingAuth0 ? (
                            <p>Loading user information...</p>
                        ) : (
                            <>
                                {user && <pre>{JSON.stringify(user, null, 2)}</pre>}
                                {errorAuth0 && <div>Error while loading user information: {errorAuth0.message}</div>}
                            </>
                        )}

                        <h2>User claims decoded from token</h2>
                        {isLoadingClaims ? (
                            <div>Loading claims...</div>
                        ) : (
                            <>
                                {claims && <pre>{JSON.stringify(claims, null, 2)}</pre>}
                                {errorClaims && <div>{errorClaims.message}</div>}
                            </>
                        )}
                    </div>
                </>
            )}
        </>
    );
};

export default ProfilePage;
