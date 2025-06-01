import { useAuth0 } from "@auth0/auth0-react";
import PageTitle from "../components/pageTitle.tsx";
import { useAuthClaims } from "../hooks/useAuthClaims.ts";

const ProfilePage = () => {
    const { user, isAuthenticated, isLoading: isLoadingAuth0, error: errorAuth0 } = useAuth0();
    const { claims, error: errorClaims, isLoading: isLoadingClaims } = useAuthClaims();

    return (
        <>
            <div className="lg:py-5 py-2">
                <PageTitle title="Profile page" subtitle="This is a public page with restricted content" />
            </div>
            {!isAuthenticated ? (
                <section className="p-10 text-center dark:shadow-slate-950 shadow-slate-300 container mx-auto bg-slate-200 dark:bg-slate-800 sm:rounded-xl mt-1 lg:mt-5 dark:text-slate-300 text-slate-950 shadow-sm">
                    <p>Please login to your account to see your profile and your claims</p>
                </section>
            ) : (
                <div>
                    <section className="p-10 dark:shadow-slate-950 shadow-slate-300 container mx-auto bg-slate-200 dark:bg-slate-800 sm:rounded-xl mt-1 lg:mt-5 dark:text-slate-300 text-slate-950 shadow-sm">
                        {errorAuth0 && <div>Error while loading user information: {errorAuth0.message}</div>}
                        {isLoadingAuth0 ? (
                            <p>Loading user information...</p>
                        ) : (
                            user && (
                                <>
                                    <div className="flex items-center gap-3">
                                        {user.picture && (
                                            <img
                                                alt={user.name}
                                                src={user.picture}
                                                className="inline-block size-10 rounded-full sm:ring-2 ring-1 ring-white"
                                                referrerPolicy="no-referrer"
                                            />
                                        )}
                                        <h2 className="uppercase text-xl sm:text-4xl">
                                            Hi {user.given_name || user.nickname || user.name}!
                                        </h2>
                                    </div>
                                    <p className="mt-4 mb-1 text-sm sm:text-lg">Here is your auth0 user information:</p>
                                    <pre
                                        data-testid="user-profile"
                                        className="whitespace-pre-wrap overflow-auto text-xs sm:text-sm"
                                    >
                                        {JSON.stringify(user, null, 2)}
                                    </pre>
                                </>
                            )
                        )}
                    </section>
                    <section className="dark:shadow-slate-950 shadow-slate-300 container mx-auto bg-slate-200 dark:bg-slate-800 sm:rounded-xl p-10 lg:mt-5 mt-3 dark:text-slate-300 text-slate-950 shadow-sm">
                        {errorClaims && <div>Error while loading user claims: {errorClaims.message}</div>}
                        <p className="mt-4 mb-1 text-sm sm:text-lg">Here are your decoded claims from token:</p>
                        {isLoadingClaims ? (
                            <div>Loading claims...</div>
                        ) : (
                            claims && (
                                <pre
                                    data-testid="user-claims"
                                    className="whitespace-pre-wrap overflow-auto text-xs sm:text-sm"
                                >
                                    {JSON.stringify(claims, null, 2)}
                                </pre>
                            )
                        )}
                    </section>
                </div>
            )}
        </>
    );
};

export default ProfilePage;
