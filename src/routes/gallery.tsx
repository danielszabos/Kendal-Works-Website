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

const groups = [
  {
    title: "Offices",
    // TODO: Placeholder — confirm real room sizes/capacities and features before publishing.
    blurb: "Placeholder — describe the real room sizes, capacities and features on offer.",
    images: [
      { src: officePrivate, alt: "Single private office with desk and window" },
      { src: officeTwin, alt: "Two-person office with twin desks and monitors" },
      { src: corridor, alt: "Corridor leading to private office suites" },
    ],
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
