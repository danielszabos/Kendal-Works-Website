import { Link } from "@tanstack/react-router";
import { ADDRESS_LINES, BUSINESS_NAME, PHONE_DISPLAY, PHONE_HREF } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-page grid gap-10 py-14 md:grid-cols-3">
        <div>
          <p className="font-display text-lg font-bold text-primary-foreground">{BUSINESS_NAME}</p>
          {/* TODO: Placeholder — short, accurate one-line description of what's actually offered. */}
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-primary-foreground/75">
            Placeholder — a short, accurate line describing the offices and who they're genuinely
            for.
          </p>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary-foreground/60">
            Quick links
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              { to: "/", label: "Home" },
              { to: "/about", label: "About" },
              { to: "/gallery", label: "Gallery" },
              { to: "/contact", label: "Contact" },
            ].map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-primary-foreground/80 transition-colors hover:text-primary-foreground"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary-foreground/60">
            Get in touch
          </p>
          <a
            href={PHONE_HREF}
            className="mt-4 block font-display text-2xl font-bold text-primary-foreground"
          >
            {PHONE_DISPLAY}
          </a>
          <address className="mt-3 space-y-0.5 text-sm not-italic text-primary-foreground/75">
            {ADDRESS_LINES.slice(1).map((line) => (
              <div key={line}>{line}</div>
            ))}
          </address>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15">
        <div className="container-page py-5 text-center text-xs text-primary-foreground/60">
          © {new Date().getFullYear()} {BUSINESS_NAME}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
