import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { MDX } from "@/components/mdx";
import { Prose } from "@/components/ui/typography";
import { getAllPosts } from "@/data/docs";

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slug = (await params).slug;
  const post = getAllPosts().find((post) => post.slug === slug);

  if (!post) {
    return {};
  }

  const { title, description } = post.metadata;

  return {
    title,
    description,
    alternates: {
      canonical: `/docs/${post.slug}`,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const slug = (await params).slug;
  const post = getAllPosts().find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <div className="h-10" />

      <Prose>
        <h1 className="font-heading mb-6">{post.metadata.title}</h1>

        <p className="lead">{post.metadata.description}</p>

        <MDX code={post.content} />
      </Prose>

      <div className="h-4" />
    </>
  );
}
