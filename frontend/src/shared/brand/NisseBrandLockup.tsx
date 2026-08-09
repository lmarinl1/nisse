import type { CSSProperties, HTMLAttributes } from "react";
import { brandAssetPaths, type NisseMarkVariant } from "./NisseMark";

export type NisseBrandLockupSize = "entry" | "compact";

export type NisseBrandLockupProps = HTMLAttributes<HTMLDivElement> & {
  /** entry = official mark (~48px); compact = favicon variant (~24px) */
  size?: NisseBrandLockupSize;
};

const SIZE_CONFIG: Record<
  NisseBrandLockupSize,
  { variant: NisseMarkVariant; markClass: string }
> = {
  // Clean SVGs as mask sources (no baked neon/glow) → tinted with discovery
  entry: { variant: "official-clean", markClass: "nisse-mark--md" },
  compact: { variant: "favicon-clean", markClass: "nisse-mark--sm" },
};

/**
 * Product identity lockup: brand mark + wordmark.
 * In-app mark uses discovery yellow (same accent as active UI icons).
 * Mark is decorative when the wordmark is visible.
 */
export function NisseBrandLockup({
  size = "entry",
  className,
  ...props
}: NisseBrandLockupProps) {
  const config = SIZE_CONFIG[size];
  const maskUrl = `url(${brandAssetPaths[config.variant]})`;
  const markStyle = {
    ["--nisse-mark-mask" as string]: maskUrl,
  } as CSSProperties;

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
      <span
        className={["nisse-mark", "nisse-mark--discovery", config.markClass]
          .filter(Boolean)
          .join(" ")}
        style={markStyle}
        aria-hidden
      />
      <span className="nisse-brand-lockup__wordmark">NISSE</span>
    </div>
  );
}
