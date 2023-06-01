import stylesheet from "~/tailwind.css";

import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  { rel: "stylesheet", href:"https://cdn.jsdelivr.net/npm/katex@0.16.7/dist/katex.min.css"}
];

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Walter (Blog Assistance)",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
