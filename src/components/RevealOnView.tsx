import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** ms after the element enters view before the reveal starts */
  delay?: number;
  /** transition duration in ms (default 450) */
  duration?: number;
  /** initial translateY offset in px (default 8) */
  y?: number;
  /** IntersectionObserver threshold (default 0.18) */
  threshold?: number;
  /** rendered element tag (default "div"); use "p" for inline-flex contexts */
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Fades + slide-ups children once when ~18% of the element scrolls into view.
 * For HERO elements that are in the initial viewport, the trigger fires on
 * mount → use `delay` for staggered arrival arcs. For sections below the fold,
 * each instance triggers on its own IntersectionObserver entry.
 */
export function RevealOnView({
  children,
  delay = 0,
  duration = 450,
  y = 8,
  threshold = 0.18,
  as = "div",
  className,
  style,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  const Tag = as as React.ElementType;
  const baseEasing = "cubic-bezier(0.22, 1, 0.36, 1)";
  return (
    <Tag
      ref={ref as React.Ref<HTMLElement>}
      className={className}
      style={{
        ...style,
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : `translateY(${y}px)`,
        transition: `opacity ${duration}ms ${baseEasing} ${delay}ms, transform ${duration}ms ${baseEasing} ${delay}ms`,
        willChange: shown ? undefined : "opacity, transform",
      }}
    >
      {children}
    </Tag>
  );
}

export default RevealOnView;
