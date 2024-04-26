import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import { getMuiLinks } from "./mui/getMuiLinks";
import { MuiMeta } from "./mui/MuiMeta";
import { LinksFunction } from "@remix-run/node";
import { MuiDocument } from "./mui/MuiDocument";
import React from "react";
import Header from "../components/Header";

export const links: LinksFunction = () => [...getMuiLinks()];

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
