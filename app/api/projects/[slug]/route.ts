import { NextResponse } from 'next/server';
import { getProjectBySlug } from '@/lib/content';

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  if (!project) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json({ project });
}
