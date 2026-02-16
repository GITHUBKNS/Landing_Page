export default function ContactPage() {
  return (
    <section className="max-w-2xl space-y-6">
      <h1 className="text-3xl font-bold">Contact</h1>
      <form action="/api/contact" method="post" className="space-y-4 rounded-lg border border-white/10 bg-surface p-6">
        <label className="block">
          <span className="text-sm">Name</span>
          <input name="name" required className="mt-1 w-full rounded border border-white/20 bg-bg p-2" />
        </label>
        <label className="block">
          <span className="text-sm">Email</span>
          <input name="email" type="email" required className="mt-1 w-full rounded border border-white/20 bg-bg p-2" />
        </label>
        <label className="block">
          <span className="text-sm">Message</span>
          <textarea name="message" rows={5} required className="mt-1 w-full rounded border border-white/20 bg-bg p-2" />
        </label>
        <input name="company" className="hidden" tabIndex={-1} autoComplete="off" />
        <button className="rounded bg-accent px-4 py-2 font-medium text-bg" type="submit">
          Send Message
        </button>
      </form>
    </section>
  );
}
