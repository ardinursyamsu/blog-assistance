import { LoaderArgs, json } from "@remix-run/node";
import { marked } from "marked";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { getCategories } from "~/models/category.server";
import type { ActionArgs } from "@remix-run/node";

import Category from "~/components/category";
import Main from "~/components/main";
import Footer from "~/components/footer";
import Navbar from "~/components/navbar";
import { getPostsByCategory } from "~/models/post.server";
import { useState } from "react";
import Subcategory from "~/components/subcategory";
import { authenticator } from "~/services/auth.server";

const content_title = "Welcome to Blog-Assistance";
const content = `
The long-term purpose of this project is to make an AI assistance in programming and whatsoever however this is a continuous project. Need more improvement in the future.
`;

const subcategory = (
  <button className="text-gray-900 bg-amber-300 hover:bg-amber-400 focus:ring-2 focus:outline-none focus:ring-amber-400 focus:bg-amber-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2 w-full">
    Subcategory
  </button>
);

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();

  const categorySlug = formData.get("category-slug");

  const posts = await getPostsByCategory(categorySlug);

  return json({ posts });
};

export const loader = async ({ request }: LoaderArgs) => {
  const categories = await getCategories();
  const auth = await authenticator.isAuthenticated(request);
  const isAuth = !!auth;

  return json({ categories, isAuth });
};

export default function Index() {
  const { categories, isAuth } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  var posts: any = [];
  var hidden = "hidden";

  if (typeof actionData !== "undefined") {
    posts = actionData.posts;
    hidden = "";
  }

  const [markdown, setMarkdown] = useState<string>(content);
  const [title, setTitle] = useState<string>(content_title);

  const handleClick = (e: any, markdown: any, title: any) => {
    setMarkdown(markdown);
    setTitle(title);
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar isAuth={isAuth} />
      <Main>
        {/* The left side */}
        <div className="hidden md:flex flex flex-row w-2/5 text-center bg-gray-100 p-4 rounded-lg">
          <div className="w-full m-1">
            <Form method="post">
              {categories.map((category) => (
                <Category
                  key={category.slug}
                  title={category.title}
                  image={category.image}
                  slug={category.slug}
                />
              ))}
            </Form>
          </div>
          <div className={`${hidden} w-full m-1`}>
            {posts.map((post: any) => (
              <Subcategory key={post.slug} data={post} onclick={handleClick} />
            ))}
          </div>
        </div>
        {/* The right side */}
        <div className="text-black sm:w-full lg:w-3/5">
          <div className="font-serif text-4xl w-full px-12 mb-12">{title}</div>
          <article className="prose max-w-none px-12">
            <div
              className="text-black text-justify"
              dangerouslySetInnerHTML={{ __html: marked(markdown) }}
            />
          </article>
        </div>
      </Main>
      <Footer />
    </div>
  );
}
