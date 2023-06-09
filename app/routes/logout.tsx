import { ActionFunction, LoaderArgs } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";

export const loader = async ({ request }: LoaderArgs) => {
  await authenticator.logout(request, { redirectTo: "/" });
};
