import { useAuth0 } from "@auth0/auth0-react";

const UserProfile = () => {
    const { user, isLoading, isAuthenticated } = useAuth0();

    if (!isAuthenticated) return null;

    return (
        <section className="p-10 dark:shadow-slate-950 shadow-slate-300 container mx-auto bg-slate-200 dark:bg-slate-800 sm:rounded-xl mt-1 lg:mt-5 dark:text-slate-300 text-slate-950 shadow-sm">
            {isLoading ? (
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
    );
};
export default UserProfile;
