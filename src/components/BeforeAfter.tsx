import { useCallback, useEffect, useRef, useState } from "react";

type Side = { src: string; alt?: string; label?: string };

type Props = {
  before: Side;
  after: Side;
  ratio?: string;
  /** initial split (0-100) */
  initial?: number;
};

/**
 * Two stacked images with a draggable vertical split.
 * Mouse + touch + keyboard accessible.
 */
export function BeforeAfter({ before, after, ratio = "16/9", initial = 50 }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(initial);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const r = rootRef.current;
    if (!r) return;
    const rect = r.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPct(Math.min(100, Math.max(0, next)));
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!dragging.current) return;
      setFromClientX(e.clientX);
    };
    const onUp = () => {
      dragging.current = false;
      document.body.style.cursor = "";
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [setFromClientX]);

  const startDrag = (e: React.PointerEvent) => {
    dragging.current = true;
    document.body.style.cursor = "ew-resize";
    setFromClientX(e.clientX);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setPct((p) => Math.max(0, p - 4));
    if (e.key === "ArrowRight") setPct((p) => Math.min(100, p + 4));
    if (e.key === "Home") setPct(0);
    if (e.key === "End") setPct(100);
  };

  const placeholder = !before.src && !after.src;

  return (
    <div
      ref={rootRef}
      className="relative w-full select-none overflow-hidden border border-line/60 bg-silver-100"
      style={{ aspectRatio: ratio, touchAction: "pan-y" }}
      onPointerDown={startDrag}
      role="slider"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pct)}
      aria-label="Before/After 비교 슬라이더"
      tabIndex={0}
      onKeyDown={onKey}
    >
      {/* AFTER (full underneath) */}
      {after.src ? (
        <img
          src={after.src}
          alt={after.alt ?? "after"}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center bg-silver-100 text-mute">
          {!placeholder && (
            <span className="font-mono text-[10px] tracking-[0.3em]">
              {after.label ?? "AFTER"} 슬롯
            </span>
          )}
        </div>
      )}

      {/* BEFORE (clipped to pct width) */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0"
        style={{ width: `${pct}%` }}
      >
        <div className="relative h-full" style={{ width: rootRef.current?.clientWidth ?? "100%" }}>
          {before.src ? (
            <img
              src={before.src}
              alt={before.alt ?? "before"}
              className="absolute inset-0 h-full object-cover"
              style={{ width: rootRef.current?.clientWidth ?? "100%" }}
              draggable={false}
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center bg-silver-200 text-mute" style={{ width: rootRef.current?.clientWidth ?? "100%" }}>
              <span className="font-mono text-[10px] tracking-[0.3em]">
                {before.label ?? "BEFORE"} 슬롯
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Labels */}
      <span className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-1.5 border border-paper/70 bg-ink/60 px-2 py-1 font-mono text-[10px] tracking-[0.25em] text-paper backdrop-blur">
        <span className="block h-1 w-1 rounded-full bg-accent" />
        {before.label ?? "BEFORE"}
      </span>
      <span className="pointer-events-none absolute right-3 top-3 inline-flex items-center gap-1.5 border border-paper/70 bg-ink/60 px-2 py-1 font-mono text-[10px] tracking-[0.25em] text-paper backdrop-blur">
        {after.label ?? "AFTER"}
        <span className="block h-1 w-1 rounded-full bg-paper" />
      </span>

      {/* Divider + handle */}
      <div
        className="pointer-events-none absolute inset-y-0 z-10 w-[2px] bg-accent"
        style={{ left: `calc(${pct}% - 1px)` }}
      />
      <div
        className="absolute inset-y-0 z-20 flex w-10 -translate-x-1/2 cursor-ew-resize items-center justify-center"
        style={{ left: `${pct}%` }}
      >
        <span className="grid h-10 w-10 place-items-center rounded-full border-2 border-accent bg-paper text-accent shadow-lg">
          <span className="text-xs font-bold">⟷</span>
        </span>
      </div>

      {/* % readout */}
      <span className="pointer-events-none absolute bottom-3 right-3 font-mono text-[10px] tracking-[0.2em] text-paper drop-shadow">
        {Math.round(pct)}%
      </span>
    </div>
  );
}
