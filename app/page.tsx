import Link from 'next/link';
import { getAllProjects } from '@/lib/content';

export default function HomePage() {
  const featured = getAllProjects().slice(0, 3);

  return (
    <section className="space-y-10">
      <div className="space-y-4">
        <p className="font-mono text-sm text-accent">Full-stack engineer</p>
        <h1 className="text-4xl font-bold sm:text-6xl">I build polished products for web teams.</h1>
        <p className="max-w-2xl text-lg text-muted">
          Portfolio, case studies, and writing on architecture, DX, and performance.
        </p>
        <div className="flex gap-3">
          <Link href="/projects" className="rounded-md bg-accent px-4 py-2 font-medium text-bg">
            View Projects
          </Link>
          <Link href="/contact" className="rounded-md border border-white/20 px-4 py-2">
            Contact Me
          </Link>
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-semibold">Featured Projects</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {featured.map((p) => (
            <article key={p.slug} className="rounded-lg border border-white/10 bg-surface p-4">
              <h3 className="font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted">{p.summary}</p>
              <Link className="mt-3 inline-block text-sm text-accent" href={`/projects/${p.slug}`}>
                Read case study →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
