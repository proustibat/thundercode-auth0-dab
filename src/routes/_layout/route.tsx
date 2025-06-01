import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import LayoutPage from "../../layouts/LayoutPage.tsx";

export const Route = createFileRoute("/_layout")({
    validateSearch: z.object({
        redirect: z.string().optional().catch(""),
    }),
    component: LayoutPage,
});
