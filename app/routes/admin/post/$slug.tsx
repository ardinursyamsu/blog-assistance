import { json, LoaderArgs, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getCategories } from "~/models/category.server";
import type { ActionArgs } from "@remix-run/node";
import { getPost, updatePost } from "~/models/post.server";
import invariant from "tiny-invariant";
import { useEffect, useState } from "react";

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();

  const title: any = formData.get("title");
  const slug: any = formData.get("slug");
  const category_slug: any = formData.get("category_slug");
  const markdown: any = formData.get("content");
  const initialSlug: any = formData.get("initial-slug");
  const submitButton = formData.get("submit");

  if (submitButton === "delete") {
    console.log("User press delete\n");
    return redirect("/admin/post");
  }

  await updatePost(initialSlug, { title, slug, category_slug, markdown });
  return redirect("/admin/post");
};

export const loader = async ({ params }: LoaderArgs) => {
  invariant(params.slug, `params.slug is required`);

  const post = await getPost(params.slug);

  const categories = await getCategories();
  invariant(post, `Post not found: ${params.slug}`);

  return json({ post, categories });
};

export default function UpdatePost() {
  const { post, categories } = useLoaderData<typeof loader>();

  const [title, setTitle] = useState<any>("");
  const [slug, setSlug] = useState<any>("");
  const [markdown, setMarkdown] = useState<any>("");

  const initialSlug = post.slug;

  const selectedCategory = categories.filter(
    (category) => category.slug === post.category_slug
  )[0];
  const unselectedCategories = categories.filter(
    (category) => category.slug !== post.category_slug
  );

  useEffect(() => {
    setTitle(post.title);
    setSlug(post.slug);
    setMarkdown(post.markdown);
  }, [post.slug]);

  return (
    <form className="px-12 py-6" method="post">
      <input type="hidden" name="initial-slug" value={initialSlug} />
      <div className="space-y-8">
        <div className="text-3xl font-serif font-medium text-center border-b-2 p-2">
          {title}
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
            value={title}
            onChange={(event) => setTitle(event.target.value)}
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
              value={slug}
              onChange={(event) => setSlug(event.target.value)}
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
              defaultValue={post.category_slug}
            >
              {categories.map((category) => (
                <option key={category.slug} value={category.slug}>{category.title}</option>
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
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
          ></textarea>
        </div>

        <div className="flex column">
          <div className="grow"></div>
          <button
            type="submit"
            name="submit"
            value="delete"
            className="bg-red-400 text-white hover:text-white border border-red-400 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-300 dark:text-red-300 dark:hover:text-white dark:hover:bg-red-400 dark:focus:ring-red-900"
          >
            Delete
          </button>
          <button
            type="submit"
            name="submit"
            value="create"
            className="bg-blue-400 text-white hover:text-medium border border-blue-400 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-300 dark:text-blue-300 dark:hover:text-white dark:hover:bg-blue-400 dark:focus:ring-blue-900"
          >
            Update
          </button>
        </div>
      </div>
    </form>
  );
}
