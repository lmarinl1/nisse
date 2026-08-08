/**
 * NISSE brand mark (telescope) — not a UI icon.
 * Assets: frontend/public/brand/
 * Spec: docs/ux-framework/13-brand-mark.md
 */
import type { ImgHTMLAttributes } from "react";

export type NisseMarkVariant =
  | "official"
  | "official-clean"
  | "official-dark"
  | "favicon"
  | "favicon-clean"
  | "favicon-dark"
  | "official-currentColor"
  | "favicon-currentColor";

export type NisseMarkProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "src" | "alt"
> & {
  variant?: NisseMarkVariant;
  /** Accessible name; defaults to "NISSE" */
  alt?: string;
};

const VARIANT_SRC: Record<NisseMarkVariant, string> = {
  official: "/brand/nisse-icon-official.svg",
  "official-clean": "/brand/nisse-icon-official-clean.svg",
  "official-dark": "/brand/nisse-icon-official-dark.svg",
  favicon: "/brand/nisse-favicon.svg",
  "favicon-clean": "/brand/nisse-favicon-clean.svg",
  "favicon-dark": "/brand/nisse-favicon-dark.svg",
  "official-currentColor": "/brand/nisse-icon-currentColor.svg",
  "favicon-currentColor": "/brand/nisse-favicon-currentColor.svg",
};

/**
 * Brand mark (telescopio). Prefer `official` for identity surfaces;
 * `favicon` for compact chrome (sin estrellas).
 */
export function NisseMark({
  variant = "official",
  alt = "NISSE",
  width = 48,
  height = 48,
  className,
  ...props
}: NisseMarkProps) {
  return (
    <img
      src={VARIANT_SRC[variant]}
      alt={alt}
      width={width}
      height={height}
      className={["nisse-mark", className].filter(Boolean).join(" ")}
      decoding="async"
      {...props}
    />
  );
}

export const brandAssetPaths = VARIANT_SRC;
