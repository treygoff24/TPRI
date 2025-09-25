const QUICK_LINKS = [
  { href: "#problem", label: "The Problem" },
  { href: "#solution", label: "Our Solution" },
  { href: "#evidence", label: "Evidence" },
  { href: "#resources", label: "Resources" },
  { href: "#action", label: "Take Action" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-y-8 px-4 py-12 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-text-muted">
            TPRI Coalition
          </p>
          <p className="mt-3 max-w-xl text-sm text-text-secondary">
            Mobilizing American private capital through Total Political Risk Insurance to counter
            authoritarian state financing across the Americas.
          </p>
        </div>
        <nav className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-text-secondary">
          {QUICK_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-text-primary">
              {link.label}
            </a>
          ))}
          <a href="mailto:policy@tpri.gov" className="hover:text-text-primary">
            policy@tpri.gov
          </a>
          <a href="#hero" className="hover:text-text-primary">
            Back to top
          </a>
        </nav>
        <span className="text-xs text-text-muted">
          © {new Date().getFullYear()} TPRI Initiative. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
