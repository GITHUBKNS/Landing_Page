import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="space-y-4 text-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-muted">Sorry, this page does not exist.</p>
      <Link href="/" className="text-accent">
        Back to home
      </Link>
    </section>
  );
}
