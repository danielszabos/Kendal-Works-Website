import { Phone } from "lucide-react";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/site";
import { cn } from "@/lib/utils";

type Props = {
  variant?: "solid" | "outline" | "onBlue";
  size?: "sm" | "md" | "lg";
  label?: string;
  showIcon?: boolean;
  className?: string;
};

export function CallButton({
  variant = "solid",
  size = "md",
  label = `Call ${PHONE_DISPLAY}`,
  showIcon = true,
  className,
}: Props) {
  return (
    <a
      href={PHONE_HREF}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-all [text-shadow:none] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        size === "sm" && "px-4 py-2 text-sm",
        size === "md" && "px-5 py-2.5 text-sm md:text-base",
        size === "lg" && "px-7 py-3.5 text-base md:text-lg",
        variant === "solid" &&
          "bg-primary text-primary-foreground shadow-card [@media(hover:hover)]:hover:brightness-110",
        variant === "outline" &&
          "border border-primary text-primary hover:bg-secondary",
        variant === "onBlue" &&
          "bg-background text-primary shadow-card hover:bg-secondary",
        className,
      )}
    >
      {showIcon ? <Phone className="size-4 shrink-0" aria-hidden="true" /> : null}
      <span>{label}</span>
    </a>
  );
}
