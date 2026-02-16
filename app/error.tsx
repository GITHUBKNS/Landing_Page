'use client';

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <section className="space-y-4 text-center">
      <h1 className="text-3xl font-bold">Something went wrong</h1>
      <p className="text-muted">Please try again.</p>
      <button onClick={reset} className="rounded border border-white/20 px-4 py-2">
        Retry
      </button>
    </section>
  );
}
