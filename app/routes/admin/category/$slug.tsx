import { json, redirect } from "@remix-run/node";
import type { LoaderArgs, ActionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { getCategory, updateCategory } from "~/models/category.server";
import { Form } from "@remix-run/react";
import { useEffect, useState } from "react";

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();

  const title = formData.get("category_name");
  const slug = formData.get("slug");
  const image = formData.get("image");
  const initialSlug = formData.get("initial-slug");

  invariant(typeof title === "string", "title must be a string");
  invariant(typeof slug === "string", "title must be a string");
  invariant(typeof image === "string", "title must be a string");
  invariant(typeof initialSlug === "string", "title must be a string");

  await updateCategory(initialSlug, { title, slug, image });

  return redirect("/admin");
};

export const loader = async ({ params }: LoaderArgs) => {
  invariant(params.slug, `params.slug is required`);

  const category = await getCategory(params.slug);
  invariant(category, `Category not found: ${params.slug}`);

  return json({ category });
};

export default function UpdateCategory() {
  const { category } = useLoaderData<typeof loader>();

  const [image, setImage] = useState<any>("");
  const [title, setTitle] = useState<any>("");
  const [slug, setSlug] = useState<any>("");

  const initialSlug = category.slug;

  useEffect(() => {
    setImage(category.image);
    setTitle(category.title);
    setSlug(category.slug);
    console.log(image, title, slug);
  }, [category.slug]);

  return (
    <Form method="post">
      <input type="hidden" name="initial-slug" value={initialSlug} />
      <div className="space-y-8">
        <div className="text-2xl font-medium text-center border-b-2 p-2">
          {category.title}
        </div>
        <div className="w-full">
          <label
            htmlFor="category_name"
            className="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
          >
            Category Name
          </label>
          <input
            type="text"
            name="category_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Input Category Name"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </div>
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
            placeholder="Input Slug"
            value={slug}
            onChange={(event) => {
              setSlug(event.target.value);
            }}
          />
        </div>
        <div className="w-full">
          <label
            htmlFor="image"
            className="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
          >
            Image
          </label>
          <textarea
            rows={20}
            name="image"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Place SVG Code Here"
            value={image}
            onChange={(event) => {
              setImage(event.target.value);
            }}
          />
        </div>
        <div className="flex column">
          <div className="grow"></div>
          <button
            type="submit"
            value="delete"
            className="text-red-400 hover:text-white border border-red-400 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-300 dark:text-red-300 dark:hover:text-white dark:hover:bg-red-400 dark:focus:ring-red-900"
          >
            Delete
          </button>
          <button
            type="submit"
            value="create"
            className="text-blue-400 hover:text-white border border-blue-400 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-300 dark:text-blue-300 dark:hover:text-white dark:hover:bg-blue-400 dark:focus:ring-blue-900"
          >
            Update
          </button>
        </div>
      </div>
    </Form>
  );
}
