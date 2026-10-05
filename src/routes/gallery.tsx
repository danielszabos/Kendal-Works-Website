import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { CtaBand } from "@/components/CtaBand";
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

const officeSlides = Array.from({ length: 9 }, (_, index) => {
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

  return {
    label: `Office ${index + 1}`,
    layout,
    images: images.slice(0, layout),
  };
});

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

  const visibleOffices = Array.from({ length: 3 }, (_, offset) => {
    const index = (startIndex + offset) % officeSlides.length;
    return officeSlides[index];
  });

  const previousOffice = () => {
    setStartIndex((current) => (current - 1 + officeSlides.length) % officeSlides.length);
  };

  const nextOffice = () => {
    setStartIndex((current) => (current + 1) % officeSlides.length);
  };

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

      <div className="flex gap-5 md:hidden">
        {visibleOffices.slice(0, 1).map((office, index) => (
          <div key={`${office.label}-${index}`} className="w-full shrink-0">
            <OfficeCard label={office.label} images={office.images} layout={office.layout} />
          </div>
        ))}
      </div>

      <div className="hidden gap-5 md:grid md:grid-cols-3">
        {visibleOffices.map((office, index) => (
          <div key={`${office.label}-${index}`} className="min-w-0">
            <OfficeCard label={office.label} images={office.images} layout={office.layout} />
          </div>
        ))}
      </div>
    </div>
  );
}

function OfficeCard({
  label,
  images,
  layout,
}: {
  label: string;
  images: GalleryImage[];
  layout: OfficeLayout;
}) {
  const renderImages = () => {
    if (layout === 2) {
      return (
        <div className="grid h-[360px] grid-rows-2 gap-2 p-2 md:h-[420px]">
          {images.map((image, index) => (
            <img
              key={`${label}-${image.alt}-${index}`}
              src={image.src}
              alt={image.alt}
              width={1200}
              height={900}
              loading="lazy"
              className="h-full w-full rounded-xl object-cover"
            />
          ))}
        </div>
      );
    }

    if (layout === 3) {
      return (
        <div className="grid h-[320px] grid-rows-2 gap-2 p-2 md:h-[420px]">
          <img
            src={images[0].src}
            alt={images[0].alt}
            width={1200}
            height={900}
            loading="lazy"
            className="h-full w-full rounded-xl object-cover"
          />
          <div className="grid grid-cols-2 gap-2">
            {images.slice(1).map((image, index) => (
              <img
                key={`${label}-${image.alt}-${index}`}
                src={image.src}
                alt={image.alt}
                width={1200}
                height={900}
                loading="lazy"
                className="h-full w-full rounded-xl object-cover"
              />
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="grid h-[360px] grid-cols-[1.6fr_0.9fr] gap-2 p-2 md:h-[420px]">
        <img
          src={images[0].src}
          alt={images[0].alt}
          width={1200}
          height={900}
          loading="lazy"
          className="h-full w-full rounded-xl object-cover"
        />
        <div className="grid grid-rows-3 gap-2">
          {images.slice(1).map((image, index) => (
            <img
              key={`${label}-${image.alt}-${index}`}
              src={image.src}
              alt={image.alt}
              width={1200}
              height={900}
              loading="lazy"
              className="h-full w-full rounded-xl object-cover"
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-border/50 bg-card shadow-card">
      <div className="border-b border-border/50 bg-secondary/60 px-4 py-3">
        <h3 className="text-lg font-bold">{label}</h3>
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
