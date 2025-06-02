import { useAuth0 } from "@auth0/auth0-react";
import PageTitle from "../components/pageTitle.tsx";
import UserClaims from "../components/userClaims.tsx";
import UserProfile from "../components/userProfile.tsx";

const ProfilePage = () => {
    const { isAuthenticated } = useAuth0();

    return (
        <>
            <div className="lg:py-5 py-2">
                <PageTitle title="Profile page" subtitle="This is a public page with restricted content" />
            </div>
            {!isAuthenticated && (
                <section className="p-10 text-center dark:shadow-slate-950 shadow-slate-300 container mx-auto bg-slate-200 dark:bg-slate-800 sm:rounded-xl mt-1 lg:mt-5 dark:text-slate-300 text-slate-950 shadow-sm">
                    <p>Please login to your account to see your profile and your claims</p>
                </section>
            )}
            <UserProfile />
            <UserClaims />
        </>
    );
};

export default ProfilePage;
