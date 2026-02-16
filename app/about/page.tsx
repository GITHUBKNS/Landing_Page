export default function AboutPage() {
  return (
    <section className="max-w-3xl space-y-6">
      <h1 className="text-3xl font-bold">About</h1>
      <p className="text-muted">
        I design and build modern web applications focused on accessibility, performance, and business impact.
      </p>
      <div className="rounded-lg border border-white/10 bg-surface p-5">
        <h2 className="font-semibold">Skills</h2>
        <p className="mt-2 text-sm text-muted">Next.js, TypeScript, Node.js, design systems, testing, cloud deployment.</p>
      </div>
    </section>
  );
}
