import { getAllPosts } from '@/lib/content';

export async function GET() {
  const posts = getAllPosts();
  const items = posts
    .map(
      (p) => `\n<item><title>${p.title}</title><link>https://example.com/blog/${p.slug}</link><pubDate>${new Date(p.date).toUTCString()}</pubDate><description>${p.excerpt}</description></item>`
    )
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8" ?><rss version="2.0"><channel><title>Your Name Blog</title><link>https://example.com/blog</link><description>Engineering notes</description>${items}</channel></rss>`;

  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
