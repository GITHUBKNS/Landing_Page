import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';
import { getAllProjects, getProjectBySlug } from '@/lib/content';

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  if (!project) return notFound();

  return (
    <article className="max-w-3xl space-y-5">
      <h1 className="text-3xl font-bold">{project.title}</h1>
      <p className="text-muted">{project.summary}</p>
      <div className="flex gap-4 text-sm">
        {project.demoUrl && (
          <Link href={project.demoUrl} className="text-accent">
            Live Demo
          </Link>
        )}
        {project.repoUrl && (
          <Link href={project.repoUrl} className="text-accent">
            Source Code
          </Link>
        )}
      </div>
      <div className="prose prose-invert max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{project.content}</ReactMarkdown>
      </div>
    </article>
  );
}
