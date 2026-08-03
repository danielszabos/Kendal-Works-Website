import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarClock, MapPin, Wifi, ArrowRight } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { CallButton } from "@/components/CallButton";
import { CtaBand } from "@/components/CtaBand";
import { HeroSlideshow } from "@/components/HeroSlideshow";
import { TypewriterWord } from "@/components/TypewriterWord";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import heroOffice from "@/assets/hero-office.jpg";
import officePrivate from "@/assets/office-private.jpg";
import officeTwin from "@/assets/office-twin.jpg";
import meetingRoom from "@/assets/meeting-room.jpg";
import commonArea from "@/assets/common-area.jpg";
import reception from "@/assets/reception.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Serviced Offices in Kendal | Kendal Works (NW) Ltd" },
      {
        name: "description",
        content:
          "Flexible serviced offices to rent in central Kendal, Cumbria. All-inclusive rates, 24/7 access and simple monthly terms. Call 07944 883126.",
      },
      { property: "og:title", content: "Serviced Offices in Kendal | Kendal Works (NW) Ltd" },
      {
        property: "og:description",
        content:
          "Flexible, all-inclusive serviced offices for local businesses in Kendal, Cumbria. Call 07944 883126 to arrange a viewing.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Home,
});

const features = [
  {
    icon: CalendarClock,
    title: "Flexible terms",
    // TODO: Placeholder — describe the real contract terms (length, notice period, whether it's genuinely rolling/monthly).
    text: "Placeholder — explain the real lease terms: contract length, notice period, and how easy it actually is to scale up or down.",
  },
  {
    icon: MapPin,
    title: "Central Kendal location",
    // TODO: Placeholder — confirm real distances/links before publishing (parking, M6, Oxenholme station).
    text: "Placeholder — describe the real location: distance from the town centre, parking situation, and nearby transport links.",
  },
  {
    icon: Wifi,
    title: "Everything included",
    // TODO: Placeholder — list only what's genuinely included in the monthly rate.
    text: "Placeholder — list what's genuinely included in the monthly rate (utilities, broadband, cleaning, insurance, etc).",
  },
];

const heroSlides = [
  {
    src: heroOffice,
    alt: "Bright modern serviced office interior with desks and large windows",
    width: 1600,
    height: 1072,
  },
  { src: reception, alt: "Reception and waiting area with soft seating", width: 1200, height: 900 },
  {
    src: meetingRoom,
    alt: "Meeting room with oval table and wall screen",
    width: 1200,
    height: 900,
  },
  { src: officeTwin, alt: "Private two-person office with skyline view", width: 1200, height: 900 },
];

const galleryPreview = [
  { src: officePrivate, alt: "Private serviced office with desk and town view" },
  { src: meetingRoom, alt: "Meeting room with oval table and wall screen" },
  { src: commonArea, alt: "Breakout area with seating and coffee point" },
  { src: reception, alt: "Reception and waiting area" },
];

function Home() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative isolate h-dvh overflow-hidden border-b border-border/50">
        <HeroSlideshow slides={heroSlides} />
        <div
          className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/40 to-white/10 md:bg-gradient-to-r md:from-white/75 md:via-white/45 md:to-white/10"
          aria-hidden="true"
        />

        <div className="container-page relative flex h-full items-start pt-28 sm:items-center sm:pt-0">
          <div className="max-w-xl [text-shadow:0_1px_3px_rgba(255,255,255,0.85),0_2px_12px_rgba(255,255,255,0.55)]">
            <p className="eyebrow">Serviced offices · Kendal, Cumbria</p>
            <h1 className="mt-4 text-4xl font-extrabold leading-[1.08] text-primary md:text-5xl lg:text-6xl">
              Office space made for <TypewriterWord className="text-foreground" />
            </h1>
            {/* TODO: Placeholder — replace with a real, specific description of the offices: what's included, how flexible the terms actually are, and the real distance/walk time from the town centre. 1–2 sentences, same length as this. */}
            <p className="mt-5 max-w-xl text-lg font-medium leading-relaxed text-foreground">
              Placeholder — describe the offices and what's genuinely included, the real terms on
              offer, and how far the building actually is from Kendal town centre.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <CallButton size="lg" />
              {/* TODO: Placeholder — only keep "no forms, no waiting" if that's actually true of the enquiry process; otherwise describe the real process. */}
              <span className="text-sm font-semibold text-foreground">
                Placeholder — describe how enquiries are actually handled.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Kendal Works */}
      <section className="section-y bg-secondary">
        <div className="container-page">
          <p className="eyebrow">Why Kendal Works</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold md:text-4xl">
            A straightforward home for your business
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-border/60 bg-card p-7 shadow-card"
              >
                <div className="grid size-12 place-items-center rounded-xl bg-primary/5 text-primary">
                  <f.icon className="size-6" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-xl font-bold">{f.title}</h3>
                <p className="mt-3 text-sm leading-relaxed">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About the space */}
      <section className="section-y">
        <div className="container-page grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="overflow-hidden rounded-2xl shadow-card">
            <img
              src={commonArea}
              alt="Shared breakout space with sofas and a kitchenette"
              width={1200}
              height={900}
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
          <div>
            <p className="eyebrow">About the space</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              Well-kept offices, run by people you can reach
            </h2>
            {/* TODO: Placeholder — describe the real office mix (sizes/capacities) and what's actually included in each room. */}
            <p className="mt-5 leading-relaxed">
              Placeholder — describe the real mix of office sizes available, whether they're
              furnished, and what's included in each room (heating, broadband, etc).
            </p>
            {/* TODO: Placeholder — describe the real shared facilities and access arrangements. */}
            <p className="mt-4 leading-relaxed">
              Placeholder — describe the shared facilities tenants actually have access to (meeting
              room, kitchen, breakout area) and the real parking and access arrangements.
            </p>
            <Link
              to="/about"
              className="mt-7 inline-flex items-center gap-2 font-semibold text-primary hover:underline"
            >
              More about us <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* A look inside */}
      <section className="section-y bg-secondary">
        <div className="container-page">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
            <div className="min-w-0">
              <p className="eyebrow">A look inside</p>
              <h2 className="mt-3 text-3xl font-bold md:text-4xl">Take a look around</h2>
            </div>
            <Link
              to="/gallery"
              className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              View gallery <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {galleryPreview.map((img) => (
              <Link
                key={img.alt}
                to="/gallery"
                className="overflow-hidden rounded-xl border border-border/50 bg-card"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  width={1200}
                  height={900}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-300 hover:scale-[1.03]"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="section-y">
        <div className="container-page">
          <TestimonialCarousel />
        </div>
      </section>

      <CtaBand />
    </PageLayout>
  );
}
