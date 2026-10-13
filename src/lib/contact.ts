import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// Anti-spam thresholds. Real people take longer than a few seconds to fill the
// form in, and genuine enquiries rarely contain more than a couple of links.
const MIN_FILL_MS = 3000;
const MAX_LINKS = 2;

const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(30).optional().default(""),
  office: z.string().trim().max(100),
  message: z.string().trim().min(1).max(5000),
  // Honeypot: hidden from humans, so anything in it came from a bot.
  website: z.string().max(500).optional().default(""),
  // Time the form was first shown, in ms since epoch.
  startedAt: z.number(),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactResult = { ok: true } | { ok: false; error: string };

function spamReason(input: z.output<typeof contactSchema>): string | null {
  if (input.website) return "honeypot filled";
  if (Date.now() - input.startedAt < MIN_FILL_MS) return "submitted too fast";
  const links = input.message.match(/https?:\/\/|www\./gi)?.length ?? 0;
  if (links > MAX_LINKS) return `too many links (${links})`;
  return null;
}

export const sendContactMessage = createServerFn({ method: "POST" })
  .validator((data: ContactInput) => contactSchema.parse(data))
  .handler(async ({ data }): Promise<ContactResult> => {
    const reason = spamReason(data);
    if (reason) {
      // Pretend it worked so bots get no signal about what tripped the filter.
      console.warn(`[contact] dropped as spam: ${reason}`);
      return { ok: true };
    }

    const apiKey = process.env["RESEND_API_KEY"];
    const from = process.env["CONTACT_FROM"];
    const to = process.env["CONTACT_TO"];
    if (!apiKey || !from || !to) {
      console.error("[contact] RESEND_API_KEY, CONTACT_FROM or CONTACT_TO is not set");
      return { ok: false, error: "not-configured" };
    }

    const text = [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone || "(not given)"}`,
      `Office: ${data.office}`,
      "",
      data.message,
    ].join("\n");

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: to.split(",").map((s) => s.trim()),
        reply_to: data.email,
        subject: `Website enquiry from ${data.name}`,
        text,
      }),
    });

    if (!res.ok) {
      console.error(`[contact] Resend error ${res.status}: ${await res.text()}`);
      return { ok: false, error: "send-failed" };
    }
    const { id } = (await res.json()) as { id?: string };
    console.info(`[contact] sent via Resend (id ${id ?? "unknown"}) to ${to}`);
    return { ok: true };
  });
