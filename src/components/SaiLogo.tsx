import type { SVGProps } from "react";

type SaiLogoProps = SVGProps<SVGSVGElement> & {
  variant?: "solid" | "outline";
  /** Class applied to the left triangle path. */
  leftClassName?: string;
  /** Class applied to the middle vertical bar path — lets callers animate just the 사이 element. */
  middleBarClassName?: string;
  /** Class applied to the right trapezoid path. */
  rightClassName?: string;
};

/**
 * 사이집가양 abstract logo mark — three architectural silhouettes with a gap (사이) between them.
 * Fill color is controlled via `currentColor` so callers set it with Tailwind text-* classes.
 *
 * Native aspect ratio is roughly 3 : 1.  Set width OR height (the other follows).
 */
export function SaiLogo({
  variant = "solid",
  className,
  leftClassName,
  middleBarClassName,
  rightClassName,
  ...rest
}: SaiLogoProps) {
  const isOutline = variant === "outline";
  const shape = isOutline
    ? {
        fill: "none" as const,
        stroke: "currentColor",
        strokeWidth: 1.4,
        strokeLinejoin: "round" as const,
        strokeLinecap: "round" as const,
      }
    : { fill: "currentColor" };

  return (
    <svg
      viewBox="0 0 100 30"
      aria-hidden="true"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      {...rest}
    >
      {/* Triangle — peaked roof, gently left-leaning peak */}
      <path
        d="M 2 28 L 18 3 L 38 28 Z"
        {...shape}
        className={leftClassName}
      />
      {/* Vertical bar — the 사이 (gap) */}
      <path
        d="M 42 5 L 48 5 L 48 28 L 42 28 Z"
        {...shape}
        className={middleBarClassName}
      />
      {/* Trapezoid — slanted-left facade with flat top + vertical right + flat bottom */}
      <path
        d="M 52 28 L 64 8 L 98 8 L 98 28 Z"
        {...shape}
        className={rightClassName}
      />
    </svg>
  );
}

export default SaiLogo;
