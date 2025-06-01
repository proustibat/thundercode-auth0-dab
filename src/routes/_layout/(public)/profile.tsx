import { createFileRoute } from "@tanstack/react-router";
import ProfilePage from "../../../pages/profile.tsx";

export const Route = createFileRoute("/_layout/(public)/profile")({
    component: ProfilePage,
});
