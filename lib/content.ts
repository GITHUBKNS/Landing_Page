import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export type Project = {
  slug: string;
  title: string;
  summary: string;
  tech: string[];
  demoUrl?: string;
  repoUrl?: string;
  tags: string[];
  content: string;
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  content: string;
};

const projectDir = path.join(process.cwd(), 'content/projects');
const postDir = path.join(process.cwd(), 'content/posts');

function readMarkdownFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => file.endsWith('.md'));
}

export function getAllProjects(): Project[] {
  return readMarkdownFiles(projectDir)
    .map((filename) => {
      const slug = filename.replace('.md', '');
      const raw = fs.readFileSync(path.join(projectDir, filename), 'utf-8');
      const { data, content } = matter(raw);
      return { slug, content, ...(data as Omit<Project, 'slug' | 'content'>) };
    })
    .sort((a, b) => a.title.localeCompare(b.title));
}

export function getProjectBySlug(slug: string) {
  return getAllProjects().find((project) => project.slug === slug);
}

export function getAllPosts(): Post[] {
  return readMarkdownFiles(postDir)
    .map((filename) => {
      const slug = filename.replace('.md', '');
      const raw = fs.readFileSync(path.join(postDir, filename), 'utf-8');
      const { data, content } = matter(raw);
      return { slug, content, ...(data as Omit<Post, 'slug' | 'content'>) };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string) {
  return getAllPosts().find((post) => post.slug === slug);
}
