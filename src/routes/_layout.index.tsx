import { createFileRoute } from "@tanstack/react-router";
import IndexPage from "../pages";

export const Route = createFileRoute("/_layout/")({
    component: IndexPage,
});
