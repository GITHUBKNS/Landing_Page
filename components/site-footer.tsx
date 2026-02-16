export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-white/10 py-8 text-center text-sm text-muted">
      <p>© {new Date().getFullYear()} Your Name. Built with Next.js + Tailwind.</p>
      <p className="mt-2">No tracking cookies are used by default.</p>
    </footer>
  );
}
