import { z } from 'zod';

export const projectSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(3),
  summary: z.string().min(10),
  tech: z.array(z.string()).min(1),
  tags: z.array(z.string()).min(1),
  demoUrl: z.string().url().optional(),
  repoUrl: z.string().url().optional(),
  content: z.string().min(20)
});
