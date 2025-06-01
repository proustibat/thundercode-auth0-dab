import type { Auth0ContextInterface } from "@auth0/auth0-react";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { lazy } from "react";

const TanStackRouterDevtools = import.meta.env.PROD
    ? () => null
    : lazy(() =>
          import("@tanstack/react-router-devtools").then((res) => ({
              default: res.TanStackRouterDevtools,
          }))
      );

interface MyRouteContext {
    auth?: Auth0ContextInterface;
}

export const Route = createRootRouteWithContext<MyRouteContext>()({
    component: () => (
        <>
            <Outlet />
            <TanStackRouterDevtools />
        </>
    ),
});
