import type { HTMLAttributes } from "react";
import { NisseMark, type NisseMarkVariant } from "./NisseMark";

export type NisseBrandLockupSize = "entry" | "compact";

export type NisseBrandLockupProps = HTMLAttributes<HTMLDivElement> & {
  /** entry = official mark (~48px); compact = favicon variant (~24px) */
  size?: NisseBrandLockupSize;
};

const SIZE_CONFIG: Record<
  NisseBrandLockupSize,
  { variant: NisseMarkVariant; px: number; markClass: string }
> = {
  entry: { variant: "official", px: 48, markClass: "nisse-mark--md" },
  compact: { variant: "favicon", px: 24, markClass: "nisse-mark--sm" },
};

/**
 * Product identity lockup: brand mark + wordmark.
 * Mark is decorative when the wordmark is visible.
 */
export function NisseBrandLockup({
  size = "entry",
  className,
  ...props
}: NisseBrandLockupProps) {
  const config = SIZE_CONFIG[size];
  return (
    <div
      className={[
        "nisse-brand-lockup",
        size === "compact" ? "nisse-brand-lockup--compact" : null,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <NisseMark
        variant={config.variant}
        width={config.px}
        height={config.px}
        alt=""
        className={config.markClass}
        aria-hidden
      />
      <span className="nisse-brand-lockup__wordmark">NISSE</span>
    </div>
  );
}
