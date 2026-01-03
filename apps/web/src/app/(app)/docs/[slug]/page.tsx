import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LLMCopyButtonWithViewOptions } from "@/components/ai/page-actions";
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
      <div className="h-12" />

      <Prose>
        <h1 className="font-heading mb-2">{post.metadata.title}</h1>

        <p className="lead mt-2 mb-6">{post.metadata.description}</p>

        <div>
          <LLMCopyButtonWithViewOptions
            markdownUrl={`/docs/${post.slug}.mdx`}
          />
        </div>

        <MDX code={post.content} />
      </Prose>

      <div className="h-4" />
    </>
  );
}
