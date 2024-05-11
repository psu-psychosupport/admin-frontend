import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";

import { getMuiLinks } from "./mui/getMuiLinks";
import { MuiMeta } from "./mui/MuiMeta";
import { LinksFunction, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { MuiDocument } from "./mui/MuiDocument";
import React from "react";
import Header from "./components/Header";
import { apiService } from "../api/apiService";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { sessionStorage } from "~/sessions";

export const links: LinksFunction = () => [...getMuiLinks()];

export async function loader({ request }: LoaderFunctionArgs) {
  if (request.url.endsWith("/signin")) return null;
  const session = await sessionStorage.getSession(
    request.headers.get("cookie"),
  );
  const accessToken = session.get("access_token");
  const refreshToken = session.get("refresh_token");

  if (!accessToken && !refreshToken) throw redirect("/signin");

  apiService.setCredentialsTokens({ accessToken, refreshToken });

  const response = await apiService.getMe();
  if (response.error) {
    if (!refreshToken) throw redirect("/signin");
    const res = await apiService.refreshAccessToken();
    if (res.error) throw redirect("/signin");
    session.set("access_token", res.data?.access_token);
    const headers = new Headers();
    headers.append("Set-Cookie", await sessionStorage.commitSession(session));
    throw redirect(request.url, { headers });
  }
  return null;
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <MuiMeta />
        <Links />
      </head>
      <body>
        <Header />
        {children}
        <ScrollRestoration />
        <Scripts />
        <ToastContainer />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <>
      <MuiDocument>
        <Outlet />
      </MuiDocument>
    </>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    switch (error.status) {
      case 401:
        return (
          <div>
            <p>You don't have access to this invoice.</p>
            <p>Contact {error.data.invoiceOwnerEmail} to get access</p>
          </div>
        );
      case 404:
        return <div>Invoice not found!</div>;
    }

    return (
      <div>
        Something went wrong: {error.status} {error.statusText}
      </div>
    );
  }

  return <div>Something went wrong: {error?.message || "Unknown Error"}</div>;
}
