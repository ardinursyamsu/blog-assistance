import { ActionArgs, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { createCategory } from "~/models/category.server";

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();

  const title = formData.get("category_name");
  const slug = formData.get("slug");
  const image = formData.get("image");

  await createCategory({ title, slug, image });

  return redirect("/admin/category");
};

export default function NewCategory() {
  const decorator =
    "text-orange-400 hover:text-white border border-orange-400 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-orange-300 dark:text-orange-300 dark:hover:text-white dark:hover:bg-orange-400 dark:focus:ring-orange-900";

  return (
    <Form className="px-12 py-6" method="post">
      <div className="space-y-8">
        <div className="text-3xl font-serif font-medium text-center border-b-2 p-2">
          Create New Category
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
            required
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
            required
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
            required
          />
        </div>
        <div className="flex column">
          <div className="grow"></div>
          <button
            type="submit"
            value="submit"
            className="bg-orange-400 text-white hover:text-white border border-orange-400 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-orange-300 dark:text-orange-300 dark:hover:text-white dark:hover:bg-orange-400 dark:focus:ring-orange-900"
          >
            Create
          </button>
        </div>
      </div>
    </Form>
  );
}
