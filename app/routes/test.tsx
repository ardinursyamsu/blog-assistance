import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";

export async function action({ request }: ActionArgs) {
  return await authenticator.authenticate("user-pass", request, {
    successRedirect: "/admin",
    failureRedirect: "/test",
  });
}

export async function loader ({request}: LoaderArgs){
  return await authenticator.isAuthenticated(request, {
    successRedirect: "/admin"
  })
}

export default function Screen() {
  return (
    <Form method="post" className="container">
      <input
        className="form-control border-2"
        type="email"
        name="email"
        required
      />
      <input
        className="form-control border-2"
        type="password"
        name="password"
        autoComplete="current-password"
        required
      />
      <button className="btn">Sign In</button>
    </Form>
  );
}
