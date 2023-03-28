import { prisma } from "~/db.server";
import { Post } from "@prisma/client";

export async function getPosts() {
  return prisma.post.findMany();
}

export async function getPost(slug: any) {
  return prisma.post.findUnique({ where: { slug: slug } });
}

export async function createPost(post: any) {
  return prisma.post.create({ data: post });
}

export async function updatePost(
  initialSlug: string,
  post: Pick<Post, "title" | "slug" | "category_slug" | "markdown">
) {
  const slug = initialSlug;
  return prisma.post.update({ where: { slug: slug }, data: post });
}

export async function getPostsByCategory(slug: any) {
  return prisma.post.findMany({ where: { category_slug: slug } });
}
