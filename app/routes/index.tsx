import { useState } from "react";
import { getCategories } from "~/models/category.server";
import { json } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { getPostsByCategory } from "~/models/post.server";
import type { ActionArgs } from "@remix-run/node";
import { marked } from "marked";

import Navbar from "~/components/navbar";
import MainContainer from "~/components/maincontainer";

const text = `
The long-term purpose of this project is to make an AI assistance in programming and whatsoever
however this is just the prototype. Need more improvement in the future.

#### To Do:
- Fix the flow of root page. They should display 1 button and 2 button in different manner
- Tidy up the function like better user experience
- Tidy up the layout. This is a mess

#### Bug:
- Category selected doesn't select the corresponding post
`;


export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();

  const categorySlug = formData.get("category-slug");

  const posts = await getPostsByCategory(categorySlug);

  return json({ posts });
};

export const loader = async () => {
  const categories = await getCategories();

  return json({ categories });
};

export default function Index() {
  const { categories } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  var posts: any = [];

  if (typeof actionData !== "undefined") {
    posts = actionData.posts;
  }

  const [markdown, setMarkdown] = useState<string>(text);
  const [title, setTitle] = useState<string>("Welcome to Blog-Assistance");

  const handleCategories = (e: any, markdown: string, title: string) => {
    setMarkdown(markdown);
    setTitle(title);
  };

  return (
    <MainContainer>
      <Navbar />
      <div className="flex flex-column">
        <div className="w-1/6">
          <Form method="post">
            {categories.map((category) => (
              <button
                key={category.slug}
                className="text-blue-700 w-full hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-small rounded-lg text-sm px-5 py-2 text-left mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                type="submit"
                name="category-slug"
                value={category.slug}
              >
                {category.title}
              </button>
            ))}
          </Form>
        </div>
        <div className="w-1/6 mx-2">
          {posts.map((post: any) => (
            <button
              key={post.slug}
              className="text-blue-700 w-full hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-small rounded-lg text-sm px-5 py-2 text-left mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
              type="submit"
              name="category-slug"
              value={post.markdown}
              onClick={(e) => handleCategories(e, post.markdown, post.title)}
            >
              {post.title}
            </button>
          ))}
        </div>
        <div className="w-4/6">
          <div className="grid row-2 w-full">
            <div className="text-center text-4xl w-full py-4 px-12">
              <div className="text-2xl font-medium text-center border-b-2 p-2">
                {title}
              </div>
            </div>
            <div className="py-4 px-12 text-justify">
              <div
                className="prose prose-stone max-w-none"
                dangerouslySetInnerHTML={{ __html: marked(markdown) }}
              />
            </div>
          </div>
        </div>
      </div>
    </MainContainer>
  );
}
