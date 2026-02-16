import Link from 'next/link';
import { getAllProjects } from '@/lib/content';

export const metadata = {
  title: 'Projects | Portfolio'
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">Projects</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <article key={project.slug} className="rounded-lg border border-white/10 bg-surface p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">{project.title}</h2>
              <span className="text-xs text-muted">{project.tech.join(' · ')}</span>
            </div>
            <p className="mt-2 text-sm text-muted">{project.summary}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="rounded border border-white/15 px-2 py-1 text-xs text-muted">
                  #{tag}
                </span>
              ))}
            </div>
            <Link href={`/projects/${project.slug}`} className="mt-4 inline-block text-sm text-accent">
              View details →
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
