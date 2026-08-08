import type { SVGProps } from "react";
import { icons, type IconName } from "./registry";

export type IconSize = "sm" | "nav" | "md" | "lg";

export type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName;
  /** 16 | 20 | 24 | 32 — ver docs/ux-framework/10-iconography.md */
  size?: IconSize;
  title?: string;
};

const sizeClass: Record<IconSize, string> = {
  sm: "nisse-icon--sm",
  nav: "nisse-icon--nav",
  md: "nisse-icon--md",
  lg: "nisse-icon--lg",
};

/**
 * NISSE line icon (24×24 viewBox, currentColor).
 * Color inherits from CSS `color`; default display size is 24px (md).
 */
export function Icon({
  name,
  size = "md",
  title,
  className,
  ...props
}: IconProps) {
  const Glyph = icons[name];
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={["nisse-icon", sizeClass[size], className]
        .filter(Boolean)
        .join(" ")}
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <Glyph />
    </svg>
  );
}
