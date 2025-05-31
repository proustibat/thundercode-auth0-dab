import { Link, Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout")({
    component: RouteComponent,
});

export const navigation = [
    { name: "Home", to: "/" },
    { name: "Profile", to: "/profile" },
    { name: "Projects", to: "/projects" },
];

function RouteComponent() {
    return (
        <>
            <header>
                {navigation.map((item) => (
                    <Link key={item.name} to={item.to}>
                        {item.name}
                    </Link>
                ))}
            </header>
            <main>
                <Outlet />
            </main>
        </>
    );
}
