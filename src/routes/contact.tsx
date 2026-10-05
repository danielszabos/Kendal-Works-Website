import { createFileRoute, useLocation } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { Clock, MapPin, Phone } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { CallButton } from "@/components/CallButton";
import {
  ADDRESS_LINES,
  OFFICE_NAMES,
  OPENING_HOURS,
  PHONE_DISPLAY,
  PHONE_HREF,
} from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | Kendal Works (NW) Ltd" },
      {
        name: "description",
        content:
          "Call Kendal Works (NW) Ltd on 07944 883126 to arrange a viewing. Address, opening hours and map for our serviced offices in Kendal, Cumbria.",
      },
      { property: "og:title", content: "Contact | Kendal Works (NW) Ltd" },
      {
        property: "og:description",
        content:
          "Call 07944 883126 to arrange a viewing of our serviced offices in Kendal, Cumbria.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash !== "#send-message") {
      return;
    }

    const form = document.getElementById("send-message");
    if (!form) {
      return;
    }

    requestAnimationFrame(() => {
      form.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }, [location.pathname, location.hash]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <PageLayout>
      <section className="border-b border-border/50">
        <div className="container-page py-14 text-center md:py-20">
          <p className="eyebrow">Contact</p>
          <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-extrabold leading-[1.1] md:text-5xl">
            The quickest way to reach us is a phone call
          </h1>
          <a
            href={PHONE_HREF}
            className="mt-6 block font-display text-3xl font-extrabold text-primary md:text-5xl"
          >
            {PHONE_DISPLAY}
          </a>
          <div className="mt-8 flex justify-center">
            <CallButton size="lg" label="Call now" />
          </div>
        </div>
      </section>

      <section className="section-y bg-secondary">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <div className="lg:order-2">
            <h2 className="text-2xl font-bold md:text-3xl">Or send a message</h2>
            {/* TODO: Placeholder — confirm real response time/process for form enquiries. */}
            <p className="mt-2 text-sm text-muted-foreground">
              Placeholder — describe what happens after the form is submitted and the real response
              time to expect.
            </p>

            {sent ? (
              <div className="mt-6 rounded-2xl border border-border/60 bg-card p-8 shadow-card">
                <h3 className="text-xl font-bold">Thanks — message noted</h3>
                {/* TODO: Placeholder — confirm real response time before publishing. */}
                <p className="mt-3 text-sm leading-relaxed">
                  Placeholder — confirm what happens next and give a real sense of how quickly
                  someone will follow up.
                </p>
                <div className="mt-6">
                  <CallButton />
                </div>
              </div>
            ) : (
              <form
                id="send-message"
                onSubmit={handleSubmit}
                className="mt-6 scroll-mt-[120px] space-y-5 rounded-2xl border border-border/60 bg-card p-7 shadow-card"
              >
                <div>
                  <label htmlFor="name" className="text-sm font-semibold text-primary">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="text-sm font-semibold text-primary">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="text-sm font-semibold text-primary">
                    Phone number{" "}
                    <span className="font-normal text-muted-foreground">(optional)</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label htmlFor="office" className="text-sm font-semibold text-primary">
                    Which office are you interested in?
                  </label>
                  <select
                    id="office"
                    name="office"
                    defaultValue="Not sure yet"
                    className="mt-2 w-full cursor-pointer rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="Not sure yet">Not sure yet</option>
                    {OFFICE_NAMES.map((office) => (
                      <option key={office} value={office}>
                        {office}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="text-sm font-semibold text-primary">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-card transition-all hover:brightness-125"
                >
                  Send message
                </button>
              </form>
            )}
          </div>

          <div className="lg:order-1">
            <h2 className="text-2xl font-bold md:text-3xl">Find us in Kendal</h2>
            {/* TODO: Placeholder — confirm real parking and road/directions details before publishing. */}
            <p className="mt-2 text-sm text-muted-foreground">
              Placeholder — describe real parking availability and how to find the building from the
              town centre or nearest main road.
            </p>
            <div className="mt-6 overflow-hidden rounded-2xl border border-border/60 shadow-card">
              <iframe
                title="Map showing Kendal, Cumbria"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-2.7710%2C54.3170%2C-2.7220%2C54.3450&layer=mapnik&marker=54.3310%2C-2.7465"
                className="h-80 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page grid gap-8 md:grid-cols-3">
          <div className="rounded-2xl border border-border/60 bg-card p-7 shadow-card">
            <Phone className="size-6 text-primary" aria-hidden="true" />
            <h2 className="mt-4 text-xl font-bold">Phone</h2>
            <a href={PHONE_HREF} className="mt-3 block font-semibold text-primary">
              {PHONE_DISPLAY}
            </a>
            {/* TODO: Placeholder — confirm the real callback turnaround time before publishing. */}
            <p className="mt-2 text-sm text-muted-foreground">
              Placeholder — describe what happens if a call isn't answered and the real turnaround
              time for a callback.
            </p>
          </div>

          <div className="rounded-2xl border border-border/60 bg-card p-7 shadow-card">
            <MapPin className="size-6 text-primary" aria-hidden="true" />
            <h2 className="mt-4 text-xl font-bold">Address</h2>
            <address className="mt-3 space-y-0.5 text-sm not-italic leading-relaxed">
              {ADDRESS_LINES.map((line) => (
                <div key={line}>{line}</div>
              ))}
            </address>
          </div>

          <div className="rounded-2xl border border-border/60 bg-card p-7 shadow-card">
            <Clock className="size-6 text-primary" aria-hidden="true" />
            <h2 className="mt-4 text-xl font-bold">Opening hours</h2>
            <dl className="mt-3 space-y-2 text-sm">
              {OPENING_HOURS.map((o) => (
                <div key={o.day}>
                  <dt className="font-semibold text-primary">{o.day}</dt>
                  <dd className="text-muted-foreground">{o.hours}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
