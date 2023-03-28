import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import MainContainer from "~/components/maincontainer";
import Navbar from "~/components/navbar";
import { getCategories } from "~/models/category.server";

export const loader = async () => {
  return json({ categories: await getCategories() });
};

export default function Body() {
  const { categories } = useLoaderData<typeof loader>();

  const decorator =
    "text-orange-400 hover:text-white border border-orange-400 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-orange-300 dark:text-orange-300 dark:hover:text-white dark:hover:bg-orange-400 dark:focus:ring-orange-900 w-4/5";
  return (
    <MainContainer>
      <Navbar />
      <div className="flex flex-column mx-12">
        <div className="w-1/5">
          <Link to="./post">
            <button className={decorator}>All Posts</button>
          </Link>
          <Link to="./category">
            <button className={decorator}>All Categories</button>
          </Link>
          <Link to="./new-post">
            <button className={decorator}>Create Post</button>
          </Link>
          <Link to="./new-category">
            <button className={decorator}>Create Category</button>
          </Link>
        </div>
        <div className="w-4/5">
          <Outlet />
        </div>
      </div>
    </MainContainer>
  );
}
