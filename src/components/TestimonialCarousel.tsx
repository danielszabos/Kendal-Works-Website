import { useEffect, useRef, useState } from "react";
import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

// TODO: Placeholder — every entry below is invented. Replace all 5 with real tenant
// testimonials (real quote, real name, real business/role). Keep 5 entries so the dot
// navigation still has something to cycle through, or trim the array if there are fewer.
const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Placeholder — real tenant quote. Should describe a specific positive experience: what made moving in easy, a feature they valued (broadband, flexibility, location), 2–3 sentences in their own words.",
    name: "Placeholder — real tenant name",
    role: "Placeholder — their business name, role, and how long they've been a tenant",
  },
  {
    quote:
      "Placeholder — real tenant quote. Should describe a specific positive experience: what made moving in easy, a feature they valued (broadband, flexibility, location), 2–3 sentences in their own words.",
    name: "Placeholder — real tenant name",
    role: "Placeholder — their business name, role, and how long they've been a tenant",
  },
  {
    quote:
      "Placeholder — real tenant quote. Should describe a specific positive experience: what made moving in easy, a feature they valued (broadband, flexibility, location), 2–3 sentences in their own words.",
    name: "Placeholder — real tenant name",
    role: "Placeholder — their business name, role, and how long they've been a tenant",
  },
  {
    quote:
      "Placeholder — real tenant quote. Should describe a specific positive experience: what made moving in easy, a feature they valued (broadband, flexibility, location), 2–3 sentences in their own words.",
    name: "Placeholder — real tenant name",
    role: "Placeholder — their business name, role, and how long they've been a tenant",
  },
  {
    quote:
      "Placeholder — real tenant quote. Should describe a specific positive experience: what made moving in easy, a feature they valued (broadband, flexibility, location), 2–3 sentences in their own words.",
    name: "Placeholder — real tenant name",
    role: "Placeholder — their business name, role, and how long they've been a tenant",
  },
];

const AUTO_ADVANCE_MS = 6000;
const SWIPE_THRESHOLD_PX = 40;

export function TestimonialCarousel() {
  const [active, setActive] = useState(0);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % TESTIMONIALS.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [active]);

  const goTo = (index: number) => setActive((index + TESTIMONIALS.length) % TESTIMONIALS.length);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
    const delta = endX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < SWIPE_THRESHOLD_PX) return;
    goTo(active + (delta < 0 ? 1 : -1));
  };

  const current = TESTIMONIALS[active]!;

  return (
    <div className="mx-auto max-w-3xl">
      <figure
        key={active}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="animate-in fade-in touch-pan-y rounded-2xl border border-border/60 p-8 text-center shadow-card duration-500 md:p-12"
      >
        <Quote className="mx-auto size-8 text-primary" aria-hidden="true" />
        <blockquote className="mt-6 font-display text-xl leading-relaxed text-primary md:text-2xl">
          “{current.quote}”
        </blockquote>
        <figcaption className="mt-6 text-sm text-muted-foreground">
          {current.name} · {current.role}
        </figcaption>
      </figure>

      <div className="mt-6 flex items-center justify-center gap-2">
        {TESTIMONIALS.map((t, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Show testimonial ${i + 1} of ${TESTIMONIALS.length}`}
            aria-current={i === active}
            className={cn(
              "size-2.5 rounded-full transition-all",
              i === active ? "w-6 bg-primary" : "bg-border hover:bg-accent",
            )}
          />
        ))}
      </div>
    </div>
  );
}
