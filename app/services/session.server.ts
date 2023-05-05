import { createCookieSessionStorage } from "@remix-run/node";

export let sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_session",
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secrets: ["3}E#hpk?%2IqrBDUwFor-&lu@o'R6"],
    secure: process.env.NODE_ENV == "production",
  },
});

export let { getSession, commitSession, destroySession } = sessionStorage;
