import Link from 'next/link';

const nav = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/resume', label: 'Resume' },
  { href: '/contact', label: 'Contact' }
];

export function SiteHeader() {
  return (
    <header className="border-b border-white/10 bg-bg/80 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link className="font-mono text-sm text-accent" href="/">
          yourname.dev
        </Link>
        <nav className="flex gap-5 text-sm text-muted">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-text">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
