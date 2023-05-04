import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getCategories } from "~/models/category.server";
import { getPosts } from "~/models/post.server";

export const loader = async () => {
  const posts = await getPosts();
  const categories = await getCategories();

  return json({ posts, categories });
};

export default function Post() {
  const { posts, categories } = useLoaderData<typeof loader>();
  return (
    <div className="space-y-3">
      {categories.map((category) => (
        <div key={category.slug}>
          <div className="bg-white w-full mx-3 p-4 rounded-md drop-shadow-lg	">
            <div className="font-medium font-sans text-xl mb-2">
              {category.title}
            </div>
            {posts.map((post) =>
              post.category_slug == category.slug ? (
                <Link key={post.slug} to={`/admin/post/${post.slug}`}>
                  <button
                    key={post.slug}
                    className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-small rounded-lg text-sm px-5 py-2 text-left mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                  >
                    {post.title}
                  </button>
                </Link>
              ) : (
                ""
              )
            )}
            <br />
          </div>
        </div>
      ))}
    </div>
  );
}
