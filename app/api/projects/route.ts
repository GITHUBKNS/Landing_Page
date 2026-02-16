import fs from 'node:fs';
import path from 'node:path';
import { NextResponse } from 'next/server';
import { getAllProjects } from '@/lib/content';
import { projectSchema } from '@/lib/project-schema';

const projectsDir = path.join(process.cwd(), 'content/projects');

export async function GET() {
  return NextResponse.json({ projects: getAllProjects() });
}

export async function POST(request: Request) {
  const token = request.headers.get('x-admin-token');
  if (!process.env.ADMIN_API_TOKEN || token !== process.env.ADMIN_API_TOKEN) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const parsed = projectSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const p = parsed.data;
  const markdown = `---\ntitle: ${p.title}\nsummary: ${p.summary}\ntech: [${p.tech.join(', ')}]\ntags: [${p.tags.join(', ')}]\ndemoUrl: ${p.demoUrl ?? ''}\nrepoUrl: ${p.repoUrl ?? ''}\n---\n\n${p.content}\n`;

  fs.writeFileSync(path.join(projectsDir, `${p.slug}.md`), markdown, 'utf-8');
  return NextResponse.json({ ok: true }, { status: 201 });
}
