import { createFileRoute } from "@tanstack/react-router";
import { HeartHandshake, ShieldCheck, Sparkles } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { CtaBand } from "@/components/CtaBand";
import exterior from "@/assets/exterior.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | Kendal Works (NW) Ltd" },
      {
        name: "description",
        content:
          "Kendal Works (NW) Ltd is a family-run provider of serviced offices in Kendal, Cumbria, offering flexible all-inclusive space to local businesses.",
      },
      { property: "og:title", content: "About Us | Kendal Works (NW) Ltd" },
      {
        property: "og:description",
        content:
          "A family-run serviced office provider in Kendal, Cumbria. Flexible, all-inclusive space for local businesses.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: About,
});

const values = [
  {
    icon: HeartHandshake,
    title: "Local and hands-on",
    // TODO: Placeholder — confirm whether the owners are genuinely local/hands-on and how enquiries are actually handled.
    text: "Placeholder — describe how hands-on and local the day-to-day running of the business genuinely is.",
  },
  {
    icon: ShieldCheck,
    title: "Honest and predictable",
    // TODO: Placeholder — confirm the real pricing/contract terms before making claims about no hidden charges.
    text: "Placeholder — describe the real pricing structure and what tenants can genuinely expect on cost and contract terms.",
  },
  {
    icon: Sparkles,
    title: "Properly maintained",
    // TODO: Placeholder — confirm what maintenance/cleaning is genuinely provided.
    text: "Placeholder — describe what cleaning, maintenance and upkeep is genuinely provided as standard.",
  },
];

// TODO: Placeholder — all three values below are invented and must be confirmed by the client
// (number of offices, real access arrangement, real starting price) before publishing.
const stats = [
  { value: "[TODO]", label: "Private offices" },
  { value: "[TODO]", label: "Keyholder access" },
  { value: "[TODO]", label: "Per office, per month" },
];

function About() {
  return (
    <PageLayout>
      <section className="border-b border-border/50">
        <div className="container-page py-14 md:py-20">
          <p className="eyebrow">About Kendal Works</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-[1.1] md:text-5xl">
            A local landlord for local businesses
          </h1>
          {/* TODO: Placeholder — replace with a real, specific description of what's offered and who it's for. */}
          <p className="mt-5 max-w-2xl text-lg leading-relaxed">
            Placeholder — describe what's genuinely offered (office type, inclusions, lease style)
            and the kind of business this is actually a good fit for.
          </p>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="eyebrow">Our story</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">Built from a local need</h2>
            {/* TODO: Placeholder — replace with the real story of how/why the business started. Only the client knows this. */}
            <p className="mt-5 leading-relaxed">
              Placeholder — tell the real story of how Kendal Works started: what the building was
              before, why it was set up, and what problem it was solving.
            </p>
            {/* TODO: Placeholder — replace with real detail about current tenants and how the business actually runs. */}
            <p className="mt-4 leading-relaxed">
              Placeholder — describe who the building is actually home to today, and what genuinely
              sets the day-to-day running of it apart.
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl shadow-card">
            <img
              src={exterior}
              alt="Entrance and reception doors of the Kendal Works office building"
              width={1200}
              height={900}
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="section-y bg-secondary">
        <div className="container-page">
          <p className="eyebrow">What we're about</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold md:text-4xl">
            Three things we don't compromise on
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl border border-border/60 bg-card p-7 shadow-card"
              >
                <div className="grid size-12 place-items-center rounded-xl bg-primary/5 text-primary">
                  <v.icon className="size-6" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-xl font-bold">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page">
          <div className="grid gap-8 rounded-2xl border border-border/60 p-10 text-center shadow-card sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-display text-4xl font-extrabold text-primary md:text-5xl">
                  {s.value}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TODO: Placeholder — "what's available this month" implies real-time availability; only use if genuinely true. */}
      <CtaBand
        heading="Come and have a look"
        text="Placeholder — invite people to arrange a viewing, and give a genuine sense of current availability."
      />
    </PageLayout>
  );
}
