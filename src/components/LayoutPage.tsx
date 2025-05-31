import { Link, Outlet } from "@tanstack/react-router";
import LogInOutButton from "./LogInOutButton.tsx";

const navigation = [
    { name: "Home", to: "/" },
    { name: "Profile", to: "/profile" },
    { name: "Projects", to: "/projects" },
];

const LayoutPage = () => {
    return (
        <>
            <nav>
                {navigation.map((item) => (
                    <Link key={item.name} to={item.to}>
                        {item.name}
                    </Link>
                ))}
                <LogInOutButton />
            </nav>
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default LayoutPage;
