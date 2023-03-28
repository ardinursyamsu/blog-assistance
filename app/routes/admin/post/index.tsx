import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getPosts } from "~/models/post.server";

export const loader = async () => {
  return json({ posts: await getPosts() });
};

export default function UpdatePost() {
  const { posts } = useLoaderData<typeof loader>();
  return (
    <div>
      {posts.map((post) => (
        <Link to={post.slug}>
          <button
            key={post.slug}
            className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-small rounded-lg text-sm px-5 py-2 text-left mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
          >
            {post.title}
          </button>
        </Link>
      ))}
    </div>
  );
}
