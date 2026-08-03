import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const WORDS = ["Businesses", "Professionals", "Teams", "Organisations", "Agencies"];

const TYPE_SPEED_MS = 90;
const DELETE_SPEED_MS = 50;
const PAUSE_AFTER_TYPE_MS = 1800;
const PAUSE_AFTER_DELETE_MS = 400;

export function TypewriterWord({ className }: { className?: string }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "deleting">("typing");

  useEffect(() => {
    const currentWord = WORDS[wordIndex % WORDS.length]!;
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (text.length < currentWord.length) {
        timeout = setTimeout(() => setText(currentWord.slice(0, text.length + 1)), TYPE_SPEED_MS);
      } else {
        timeout = setTimeout(() => setPhase("deleting"), PAUSE_AFTER_TYPE_MS);
      }
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(currentWord.slice(0, text.length - 1)), DELETE_SPEED_MS);
      } else {
        timeout = setTimeout(() => {
          setWordIndex((i) => (i + 1) % WORDS.length);
          setPhase("typing");
        }, PAUSE_AFTER_DELETE_MS);
      }
    }

    return () => clearTimeout(timeout);
  }, [text, phase, wordIndex]);

  return (
    <span className={cn("inline-block", className)}>
      <span className="sr-only">{WORDS.join(", ")}</span>
      <span aria-hidden="true">
        {text}
        <span
          className="ml-0.5 inline-block w-[3px] animate-pulse bg-current align-[-0.12em]"
          style={{ height: "0.85em" }}
        />
      </span>
    </span>
  );
}
