import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getCategories } from "~/models/category.server";
import ButtonCategory from "~/components/buttoncategory";

export const loader = async () => {
  return json({ categories: await getCategories() });
};

export default function Categories() {
  const { categories } = useLoaderData<typeof loader>();
  return (
    <div className="px-12 py-6">
      {categories.map((category) => (
        <ButtonCategory
          slug={category.slug}
          image={category.image}
          title={category.title}
        />
      ))}
    </div>
  );
}
