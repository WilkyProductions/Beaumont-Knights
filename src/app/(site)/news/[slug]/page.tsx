import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import { newsPosts } from "@/data/news";

export function generateStaticParams() {
  return newsPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = newsPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function NewsPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = newsPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <Container className="max-w-2xl py-12 sm:py-16">
      <p className="text-xs uppercase tracking-wide text-knight-silver/50">
        {formatDate(post.date)}
      </p>
      <h1 className="font-display mt-1 text-3xl uppercase tracking-wide text-knight-silver sm:text-4xl">
        {post.title}
      </h1>
      <div className="mt-6 space-y-4 text-knight-silver/85">
        {post.body.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </Container>
  );
}
