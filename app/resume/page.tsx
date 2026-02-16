import Link from 'next/link';

export default function ResumePage() {
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">Resume</h1>
      <p className="text-muted">Printable CV with recent experience and achievements.</p>
      <div className="rounded-lg border border-white/10 bg-surface p-6">
        <h2 className="text-xl font-semibold">Senior Full-stack Engineer</h2>
        <p className="text-sm text-muted">Acme Corp — 2021 to Present</p>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">
          <li>Led migration from monolith to Next.js App Router.</li>
          <li>Reduced LCP by 42% through image/CDN optimization.</li>
          <li>Built secure APIs with schema validation and rate-limits.</li>
        </ul>
      </div>
      <Link href="/resume.pdf" className="inline-block rounded-md bg-accent px-4 py-2 font-medium text-bg">
        Download PDF
      </Link>
    </section>
  );
}
