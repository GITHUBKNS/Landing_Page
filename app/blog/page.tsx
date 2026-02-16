import Link from 'next/link';
import { getAllPosts } from '@/lib/content';

const PAGE_SIZE = 5;

export default function BlogPage({ searchParams }: { searchParams: { page?: string; tag?: string } }) {
  const page = Number(searchParams.page ?? 1);
  const tag = searchParams.tag;
  const posts = getAllPosts().filter((post) => (tag ? post.tags.includes(tag) : true));
  const pages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
  const slice = posts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">Blog</h1>
      <p className="text-sm text-muted">Markdown posts with tags, pagination, and RSS feed.</p>
      <div className="space-y-4">
        {slice.map((post) => (
          <article key={post.slug} className="rounded-lg border border-white/10 bg-surface p-5">
            <p className="text-xs text-muted">{post.date}</p>
            <h2 className="mt-1 text-xl font-semibold">
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>
            <p className="mt-2 text-sm text-muted">{post.excerpt}</p>
          </article>
        ))}
      </div>
      <div className="flex gap-3 text-sm">
        {Array.from({ length: pages }).map((_, i) => (
          <Link key={i + 1} href={`/blog?page=${i + 1}${tag ? `&tag=${tag}` : ''}`} className="text-accent">
            {i + 1}
          </Link>
        ))}
      </div>
    </section>
  );
}
