import { LoaderArgs, json, redirect } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";

import Footer from "~/components/footer";
import Main from "~/components/main";
import Navbar from "~/components/navbar";
import { authenticator } from "~/services/auth.server";

export const loader = async ({ request }: LoaderArgs) => {
  const auth = await authenticator.isAuthenticated(request);
  const isAuth = !!auth;

  if (!isAuth) {
    return redirect("/login");
  }

  return json({ isAuth });
};

export default function Admin() {
  const { isAuth } = useLoaderData<typeof loader>();
  return (
    <div className="flex flex-col h-screen">
      <Navbar isAuth={isAuth} />
      <Main>
        {/* The left side */}
        <div className="hidden sm:flex flex flex-column w-1/5 text-center bg-gray-100 p-4 rounded-lg">
          <div className="w-full m-1">
            <Link to="/admin/post">
              <button className="text-gray-900 bg-amber-300 hover:bg-amber-400 focus:ring-2 focus:outline-none focus:ring-amber-400 focus:bg-amber-400 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex text-left mr-2 mb-2 w-full">
                All Posts
              </button>
            </Link>
            <Link to="/admin/category">
              <button className="text-gray-900 bg-amber-300 hover:bg-amber-400 focus:ring-2 focus:outline-none focus:ring-amber-400 focus:bg-amber-400 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex text-left mr-2 mb-2 w-full">
                All Categories
              </button>
            </Link>
            <Link to="/admin/new-post">
              <button className="text-gray-900 bg-amber-300 hover:bg-amber-400 focus:ring-2 focus:outline-none focus:ring-amber-400 focus:bg-amber-400 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex text-left mr-2 mb-2 w-full">
                Create Post
              </button>
            </Link>
            <Link to="/admin/new-category">
              <button className="text-gray-900 bg-amber-300 hover:bg-amber-400 focus:ring-2 focus:outline-none focus:ring-amber-400 focus:bg-amber-400 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex text-left mr-2 mb-2 w-full">
                Create Category
              </button>
            </Link>
          </div>
        </div>
        {/* The right side */}
        <div className="text-black sm:w-full lg:w-4/5">
          <Outlet />
        </div>
      </Main>
      <Footer />
    </div>
  );
}
