import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { CallButton } from "./CallButton";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useLocation({ select: (loc) => loc.pathname });
  const isHome = pathname === "/";

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const overHero = isHome && !scrolled;
  const iconOnly = isHome && scrolled;

  return (
    <header
      className={cn(
        "z-50 transition-all duration-300 ease-in-out",
        isHome ? "fixed inset-x-0 top-0" : "sticky top-0",
        overHero
          ? "border-b border-transparent bg-transparent"
          : "border-b border-border/60 bg-background/95 backdrop-blur",
      )}
    >
      <div
        className={cn(
          "container-page grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 transition-all duration-300 ease-in-out",
          overHero ? "py-4" : "py-3",
        )}
      >
        <Link to="/" className="flex min-w-0 items-center" onClick={() => setOpen(false)}>
          {isHome ? (
            <span
              className={cn(
                "relative block shrink-0 transition-all duration-300 ease-in-out",
                overHero ? "h-12 w-[115px] md:h-[60px] md:w-[143px]" : "h-9 w-[79px] md:h-11 md:w-[97px]",
              )}
            >
              <img
                src="/kendal-works-logo-header.png"
                alt=""
                width={1116}
                height={467}
                className={cn(
                  "absolute inset-0 h-full w-full object-contain transition-opacity duration-300 ease-in-out",
                  iconOnly ? "opacity-0" : "opacity-100",
                )}
              />
              <img
                src="/kendal-works-logo-icon.png"
                alt=""
                width={693}
                height={316}
                className={cn(
                  "absolute inset-0 h-full w-full object-contain transition-opacity duration-300 ease-in-out",
                  iconOnly ? "opacity-100" : "opacity-0",
                )}
              />
            </span>
          ) : (
            <img
              src="/kendal-works-logo-icon.png"
              alt=""
              width={693}
              height={316}
              className="h-9 w-auto shrink-0 object-contain md:h-11"
            />
          )}
          <span className="sr-only">Kendal Works</span>
        </Link>

        <div className="flex items-center gap-2 md:gap-6">
          <nav className="hidden items-center gap-7 md:flex">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                activeProps={{ className: "text-primary" }}
                inactiveProps={{ className: "text-muted-foreground hover:text-primary" }}
                className="text-sm font-semibold tracking-tight transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <Link
            to="/contact#send-message"
            className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold tracking-tight text-primary-foreground shadow-card transition-all hover:brightness-110 md:text-base"
          >
            Book Now
          </Link>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid size-10 shrink-0 place-items-center rounded-full border border-border text-primary md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <nav className="border-t border-border/60 bg-background md:hidden">
          <div className="container-page flex flex-col py-2">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: l.to === "/" }}
                activeProps={{ className: "text-primary" }}
                inactiveProps={{ className: "text-muted-foreground" }}
                className="border-b border-border/40 py-3 text-base font-semibold last:border-0"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
