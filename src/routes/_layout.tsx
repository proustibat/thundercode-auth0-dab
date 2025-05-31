import { createFileRoute } from "@tanstack/react-router";
import LayoutPage from "../components/LayoutPage.tsx";

export const Route = createFileRoute("/_layout")({
    component: LayoutPage,
});
