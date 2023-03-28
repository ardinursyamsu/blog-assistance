import { Category } from "@prisma/client";
import { prisma } from "~/db.server";

export async function getCategories() {
  return prisma.category.findMany();
}

export async function createCategory(category: any) {
  return prisma.category.create({ data: category });
}

export async function getCategory(slug: string) {
  return prisma.category.findUnique({ where: { slug: slug } });
}

export async function updateCategory(
  initialSlug: string,
  category: Pick<Category, "title" | "slug" | "image">
) {
  const slug = initialSlug;
  return prisma.category.update({ where: { slug: slug }, data: category });
}
