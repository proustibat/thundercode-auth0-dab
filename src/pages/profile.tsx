import { useAuth0 } from "@auth0/auth0-react";

const ProfilePage = () => {
    const { user, isAuthenticated, isLoading, error } = useAuth0();

    if (isLoading) {
        return <div>Loading profile information...</div>;
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            <h1>Profile page</h1>
            {isAuthenticated && <pre>{JSON.stringify(user, null, 2)}</pre>}
            {!isAuthenticated && <p>You can see your profile information only if you are logged in</p>}
        </>
    );
};

export default ProfilePage;
