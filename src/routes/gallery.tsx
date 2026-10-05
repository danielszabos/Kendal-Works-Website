import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { Check } from "lucide-react";
import { CtaBand } from "@/components/CtaBand";
import { CallButton } from "@/components/CallButton";
import { OFFICE_NAMES } from "@/lib/site";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import officePrivate from "@/assets/office-private.jpg";
import officeTwin from "@/assets/office-twin.jpg";
import corridor from "@/assets/corridor.jpg";
import meetingRoom from "@/assets/meeting-room.jpg";
import meetingSmall from "@/assets/meeting-small.jpg";
import commonArea from "@/assets/common-area.jpg";
import kitchen from "@/assets/kitchen.jpg";
import reception from "@/assets/reception.jpg";
import exterior from "@/assets/exterior.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Office Gallery | Kendal Works (NW) Ltd" },
      {
        name: "description",
        content:
          "Photos of our serviced offices in Kendal: private offices, meeting rooms and shared common areas. Call 07944 883126 to book a viewing.",
      },
      { property: "og:title", content: "Office Gallery | Kendal Works (NW) Ltd" },
      {
        property: "og:description",
        content:
          "See inside our Kendal serviced offices — private rooms, meeting spaces and common areas.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Gallery,
});

type GalleryImage = {
  src: string;
  alt: string;
};

type OfficeLayout = 2 | 3 | 4;

const getOfficeLayout = (index: number): OfficeLayout => {
  const seeded = (index * 57 + 13) % 10;

  if (seeded < 4) {
    return 2;
  }

  if (seeded < 7) {
    return 3;
  }

  return 4;
};

// TODO: Placeholder — confirm the real capacity of each office (Office 1 first) before publishing.
const OFFICE_CAPACITIES = [1, 2, 2, 3, 4, 2, 6, 3, 2];

// TODO: Placeholder — confirm these amenities are genuinely included with every office, and add any missing ones.
const SHARED_AMENITIES = [
  "Wi-Fi included",
  "Toilet access",
  "Shared kitchen facilities",
  "Free parking",
];

const officeSlides = OFFICE_NAMES.map((label, index) => {
  const allImages = [
    { src: officePrivate, alt: `Office ${index + 1} with desk and natural light` },
    { src: officeTwin, alt: `Office ${index + 1} with twin desk setup` },
    { src: corridor, alt: `Corridor view near Office ${index + 1}` },
    { src: meetingSmall, alt: `Office ${index + 1} meeting nook` },
    { src: meetingRoom, alt: `Office ${index + 1} meeting room` },
    { src: commonArea, alt: `Office ${index + 1} common area` },
    { src: kitchen, alt: `Office ${index + 1} kitchen` },
  ];

  const layout = getOfficeLayout(index);
  const images = [...allImages].sort((a, b) => {
    const seedA = (index + a.alt.length) % 7;
    const seedB = (index + b.alt.length) % 7;
    return seedA - seedB;
  });
  const capacity = OFFICE_CAPACITIES[index] ?? 1;

  return {
    label,
    layout,
    images: images.slice(0, layout),
    features: [
      `Space for up to ${capacity} ${capacity === 1 ? "person" : "people"}`,
      ...SHARED_AMENITIES,
    ],
  };
});

type OfficeSlide = (typeof officeSlides)[number];

const groups = [
  {
    title: "Offices",
    // TODO: Placeholder — confirm real room sizes/capacities and features before publishing.
    blurb: "Placeholder — describe the real room sizes, capacities and features on offer.",
    images: [],
  },
  {
    title: "Meeting rooms",
    // TODO: Placeholder — confirm whether meeting room use is genuinely included in the rate, or booked/paid separately.
    blurb: "Placeholder — describe how meeting room booking actually works and what it costs.",
    images: [
      { src: meetingRoom, alt: "Meeting room with oval table, six chairs and wall screen" },
      { src: meetingSmall, alt: "Small huddle room with round table and whiteboard" },
    ],
  },
  {
    title: "Common areas",
    // TODO: Placeholder — describe what the shared spaces are genuinely used for.
    blurb: "Placeholder — describe the shared spaces and how tenants actually use them.",
    images: [
      { src: commonArea, alt: "Breakout lounge with sofas and coffee tables" },
      { src: kitchen, alt: "Shared office kitchen with counter seating" },
      { src: reception, alt: "Reception and waiting area" },
      { src: exterior, alt: "Building entrance and reception doors" },
    ],
  },
];

function OfficeCarousel() {
  const [startIndex, setStartIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  // The selected office is kept after closing so the window doesn't go blank while it fades out.
  const [selectedOffice, setSelectedOffice] = useState<OfficeSlide | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const openOffice = (office: OfficeSlide) => {
    setSelectedOffice(office);
    setIsDetailsOpen(true);
  };
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === "undefined") {
      return true;
    }

    return window.innerWidth >= 768;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const pageSize = isDesktop ? 3 : 1;

  const visibleOffices = Array.from({ length: pageSize }, (_, offset) => {
    const index = (startIndex + offset) % officeSlides.length;
    return officeSlides[index];
  }).filter((office): office is OfficeSlide => office !== undefined);

  const previousOffice = () => {
    setDirection("prev");
    setStartIndex((current) => (current - pageSize + officeSlides.length) % officeSlides.length);
  };

  const nextOffice = () => {
    setDirection("next");
    setStartIndex((current) => (current + pageSize) % officeSlides.length);
  };

  // Re-keying on startIndex replays the slide-in animation each time the arrows are pressed.
  const slideClass =
    direction === "next" ? "slide-in-from-right-16" : "slide-in-from-left-16";
  const animationClass = `animate-in fade-in ${slideClass} duration-1200 ease-out motion-reduce:animate-none`;

  return (
    <div className="mt-8">
      <div className="mb-4 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={previousOffice}
          aria-label="Previous office"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-xl text-primary shadow-card transition hover:border-primary/60 hover:text-primary"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={nextOffice}
          aria-label="Next office"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-xl text-primary shadow-card transition hover:border-primary/60 hover:text-primary"
        >
          ›
        </button>
      </div>

      {/* overflow-x-clip stops the slide from causing a horizontal scrollbar; the padding keeps card shadows visible. */}
      <div className="-mx-3 overflow-x-clip px-3 pb-3">
        <div key={startIndex} className={animationClass}>
          <div className="flex gap-5 md:hidden">
            {visibleOffices.slice(0, 1).map((office, index) => (
              <div key={`${office.label}-${index}`} className="w-full shrink-0">
                <OfficeCard
                  label={office.label}
                  images={office.images}
                  layout={office.layout}
                  onOpen={() => openOffice(office)}
                />
              </div>
            ))}
          </div>

          <div className="hidden gap-5 md:grid md:grid-cols-3">
            {visibleOffices.map((office, index) => (
              <div key={`${office.label}-${index}`} className="min-w-0">
                <OfficeCard
                  label={office.label}
                  images={office.images}
                  layout={office.layout}
                  onOpen={() => openOffice(office)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-h-[90vh] w-[calc(100%-2rem)] max-w-3xl overflow-y-auto rounded-2xl p-5 sm:p-7">
          {selectedOffice ? <OfficeDetails office={selectedOffice} /> : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function OfficeDetails({ office }: { office: OfficeSlide }) {
  return (
    <>
      <DialogHeader className="pr-8 text-left">
        <DialogTitle className="text-2xl font-bold">{office.label}</DialogTitle>
        <DialogDescription>Photos and what's included with this office.</DialogDescription>
      </DialogHeader>

      <div className="grid gap-3 sm:grid-cols-2">
        {office.images.map((image, index) => (
          <div
            key={`${office.label}-${image.alt}-${index}`}
            className={`overflow-hidden rounded-xl border border-border/40 bg-secondary/40 ${
              office.images.length % 2 === 1 && index === 0 ? "sm:col-span-2" : ""
            }`}
          >
            <img
              src={image.src}
              alt={image.alt}
              width={1200}
              height={900}
              className="aspect-[4/3] h-full w-full object-cover"
            />
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-lg font-bold">What's included</h3>
        <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
          {office.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5 text-sm">
              <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-3 border-t border-border/50 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">Like this office? Call to arrange a viewing.</p>
        <CallButton />
      </div>
    </>
  );
}

function OfficeCard({
  label,
  images,
  layout,
  onOpen,
}: {
  label: string;
  images: GalleryImage[];
  layout: OfficeLayout;
  onOpen: () => void;
}) {
  const renderImages = () => {
    if (layout === 2) {
      return (
        <div className="grid h-[360px] grid-rows-2 gap-2 p-2 md:h-[420px]">
          {images.map((image, index) => (
            <div
              key={`${label}-${image.alt}-${index}`}
              className="overflow-hidden rounded-xl border border-border/40 bg-secondary/40"
            >
              <img
                src={image.src}
                alt={image.alt}
                width={1200}
                height={900}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      );
    }

    if (layout === 3) {
      return (
        <div className="grid h-[320px] grid-rows-2 gap-2 p-2 md:h-[420px]">
          <div className="overflow-hidden rounded-xl border border-border/40 bg-secondary/40">
            <img
              src={images[0].src}
              alt={images[0].alt}
              width={1200}
              height={900}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            {images.slice(1).map((image, index) => (
              <div
                key={`${label}-${image.alt}-${index}`}
                className="overflow-hidden rounded-xl border border-border/40 bg-secondary/40"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  width={1200}
                  height={900}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="grid h-[360px] grid-cols-[1.6fr_0.9fr] gap-2 p-2 md:h-[420px]">
        <div className="overflow-hidden rounded-xl border border-border/40 bg-secondary/40">
          <img
            src={images[0].src}
            alt={images[0].alt}
            width={1200}
            height={900}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="grid grid-rows-3 gap-2">
          {images.slice(1).map((image, index) => (
            <div
              key={`${label}-${image.alt}-${index}`}
              className="overflow-hidden rounded-xl border border-border/40 bg-secondary/40"
            >
              <img
                src={image.src}
                alt={image.alt}
                width={1200}
                height={900}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`View photos and details for ${label}`}
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
      className="group cursor-pointer overflow-hidden rounded-2xl border border-border/50 bg-card shadow-card transition hover:border-primary/60 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      <div className="flex items-center justify-between gap-3 border-b border-border/50 bg-secondary/60 px-4 py-3">
        <h3 className="text-lg font-bold">{label}</h3>
        <span className="text-sm font-semibold text-primary group-hover:underline">
          View details
        </span>
      </div>
      {renderImages()}
    </div>
  );
}

function Gallery() {
  return (
    <PageLayout>
      <section className="border-b border-border/50">
        <div className="container-page py-14 md:py-20">
          <p className="eyebrow">Gallery</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-[1.1] md:text-5xl">
            See inside the building
          </h1>
          {/* TODO: Placeholder — "a ten-minute visit" is an invented detail; keep only if genuinely accurate. */}
          <p className="mt-5 max-w-2xl text-lg leading-relaxed">
            Placeholder — a short line inviting people to browse the photos below, and encouraging a
            real viewing if they like what they see.
          </p>
        </div>
      </section>

      {groups.map((group, i) => (
        <section key={group.title} className={i % 2 === 1 ? "section-y bg-secondary" : "section-y"}>
          <div className="container-page">
            <h2 className="text-2xl font-bold md:text-3xl">{group.title}</h2>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">{group.blurb}</p>

            {group.title === "Offices" ? (
              <OfficeCarousel />
            ) : (
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {group.images.map((img) => (
                  <figure
                    key={img.alt}
                    className="overflow-hidden rounded-2xl border border-border/50 bg-card shadow-card"
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      width={1200}
                      height={900}
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover"
                    />
                  </figure>
                ))}
              </div>
            )}
          </div>
        </section>
      ))}

      {/* TODO: Placeholder — "rooms that are free right now" implies real-time availability; only use if genuinely true. */}
      <CtaBand
        heading="Prefer to see it in person?"
        text="Placeholder — invite people to call and arrange a viewing, with a genuine sense of current availability."
      />
    </PageLayout>
  );
}
