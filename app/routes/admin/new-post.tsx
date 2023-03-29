import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getCategories } from "~/models/category.server";
import type { ActionArgs } from "@remix-run/node";
import { createPost } from "~/models/post.server";

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();

  const title = formData.get("title");
  const slug = formData.get("slug");
  const category_slug = formData.get("category_slug");
  const markdown = formData.get("content");

  await createPost({ title, slug, category_slug, markdown });
  return redirect("/admin");
};

export const loader = async () => {
  const categories = await getCategories();

  return json({ categories });
};

export default function CreatePost() {
  const { categories } = useLoaderData<typeof loader>();
  return (
    <form className="px-12 py-6" method="post">
      <div className="space-y-8">
        <div className="text-3xl font-serif font-medium text-center border-b-2 p-2">
          Create New Post
        </div>
        <div className="">
          <label
            htmlFor="title"
            className="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Input Title"
            required
          />
        </div>
        <div className="flex column space-x-4">
          <div className="w-full">
            <label
              htmlFor="slug"
              className="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
            >
              Slug
            </label>
            <input
              type="text"
              name="slug"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Insert Slug"
              required
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="cars"
              className="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
            >
              Select Category
            </label>

            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="category_slug"
            >
              {categories.map((category) => (
                <option value={category.slug}>{category.title}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="">
          <label
            htmlFor="content"
            className="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
          >
            Content
          </label>
          <textarea
            name="content"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Category Name"
            rows={20}
            required
          ></textarea>
        </div>

        <div className="flex column">
          <div className="grow"></div>
          <button
            type="submit"
            value="create"
            className="bg-orange-400 text-white hover:text-white border border-orange-400 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-orange-300 dark:text-orange-300 dark:hover:text-white dark:hover:bg-orange-400 dark:focus:ring-orange-900"
          >
            Create
          </button>
        </div>
      </div>
    </form>
  );
}
