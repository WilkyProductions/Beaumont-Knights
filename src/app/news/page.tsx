import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { newsPosts } from "@/data/news";

export const metadata: Metadata = {
  title: "News",
  description:
    "Season announcements, tryout dates, and updates from Beaumont Knights Baseball.",
};

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function NewsPage() {
  const posts = [...newsPosts].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <Container className="py-12 sm:py-16">
      <SectionHeading eyebrow="Stay Updated" title="News" />

      <ul className="mt-8 space-y-6">
        {posts.map((post) => (
          <li
            key={post.slug}
            className="rounded border border-knight-charcoal-light bg-knight-charcoal p-5 sm:p-6"
          >
            <p className="text-xs uppercase tracking-wide text-knight-silver/50">
              {formatDate(post.date)}
            </p>
            <h2 className="mt-1 font-heading text-xl font-semibold text-knight-silver">
              <Link href={`/news/${post.slug}`} className="hover:text-knight-gold-bright">
                {post.title}
              </Link>
            </h2>
            <p className="mt-2 text-sm text-knight-silver/75">{post.excerpt}</p>
            <Link
              href={`/news/${post.slug}`}
              className="mt-3 inline-block text-xs font-heading uppercase tracking-wide text-knight-gold-bright hover:underline"
            >
              Read More
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
