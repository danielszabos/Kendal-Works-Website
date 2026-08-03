import { CallButton } from "./CallButton";

export function CtaBand({
  heading = "Ready to see the offices?",
  // TODO: Placeholder — "most tenants move in within a week" is an invented claim; confirm real move-in timeframe before publishing.
  text = "Placeholder — describe how a viewing is arranged and give a real sense of how quickly a tenant could actually move in.",
}: {
  heading?: string;
  text?: string;
}) {
  return (
    <section className="bg-primary">
      <div className="container-page section-y text-center">
        <h2 className="mx-auto max-w-2xl text-3xl font-bold text-primary-foreground md:text-4xl">
          {heading}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-primary-foreground/80">
          {text}
        </p>
        <div className="mt-8 flex justify-center">
          <CallButton variant="onBlue" size="lg" />
        </div>
      </div>
    </section>
  );
}
