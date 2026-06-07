import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  /** content that fills the empty frame */
  children?: ReactNode;
  /** aspect ratio width/height, e.g. "16/9", "3/2", "1/1" */
  ratio?: string;
  /** label shown in the small top-left chip */
  label?: string;
  /** label shown in the small top-right chip */
  index?: string;
  className?: string;
};

/**
 * The visual language module: an empty bordered rectangle that
 * fills in with content once it scrolls into view.
 */
export function Frame({
  children,
  ratio = "16/9",
  label,
  index,
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setFilled(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.18 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`frame ${filled ? "is-filled" : ""} ${className}`}
      style={{ aspectRatio: ratio }}
    >
      {(label || index) && (
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-baseline justify-between px-3 py-2 font-mono text-[10px] tracking-[0.2em] text-ink-soft md:px-4">
          <span>{label}</span>
          <span className="text-mute">{index}</span>
        </div>
      )}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ease-out ${
          filled ? "opacity-100" : "opacity-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
