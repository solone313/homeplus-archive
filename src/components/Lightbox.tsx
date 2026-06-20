import { useEffect, useState } from "react";

type Props = {
  src?: string;
  alt?: string;
  label?: string;
  ratio?: string;
};

/**
 * Clickable image that opens a fullscreen overlay. Click-toggle zoom + drag pan +
 * ESC/click-outside to close. Falls back to placeholder if no src.
 * (Wheel zoom 은 page scroll 과 충돌해서 의도적으로 제외 — 클릭/키보드로만 확대.)
 */
export function Lightbox({ src, alt, label, ratio = "16/9" }: Props) {
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "+" || e.key === "=") setZoom((z) => Math.min(5, z + 0.25));
      if (e.key === "-") setZoom((z) => Math.max(1, z - 0.25));
      if (e.key === "0") {
        setZoom(1);
        setPan({ x: 0, y: 0 });
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!src) {
    return (
      <div
        className="relative w-full overflow-hidden border border-line/60 bg-silver-100"
        style={{ aspectRatio: ratio }}
      >
        <div className="absolute inset-0 grid place-items-center text-mute">
          <span className="font-mono text-[10px] tracking-[0.3em]">
            {label ?? "IMAGE SLOT"}
          </span>
        </div>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => {
          setOpen(true);
          setZoom(1);
          setPan({ x: 0, y: 0 });
        }}
        className="group relative block w-full overflow-hidden border border-line/60 bg-silver-100"
        style={{ aspectRatio: ratio }}
        aria-label="확대해서 보기"
      >
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 border border-paper/70 bg-ink/50 px-2 py-1 font-mono text-[10px] tracking-[0.25em] text-paper backdrop-blur opacity-0 transition-opacity group-hover:opacity-100">
          <span>⤢</span>
          <span>확대</span>
        </span>
        {label && (
          <span className="absolute left-3 top-3 inline-flex items-center border border-ink/30 bg-paper/85 px-2 py-1 font-mono text-[10px] tracking-[0.2em] text-ink">
            {label}
          </span>
        )}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] grid place-items-center bg-ink/95 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
          onPointerDown={(e) => {
            if (zoom > 1) setDragging(true);
            (e.target as Element).setPointerCapture?.(e.pointerId);
          }}
          onPointerMove={(e) => {
            if (!dragging) return;
            setPan((p) => ({ x: p.x + e.movementX, y: p.y + e.movementY }));
          }}
          onPointerUp={() => setDragging(false)}
        >
          <img
            src={src}
            alt={alt}
            className="max-h-[88dvh] max-w-[92vw] select-none object-contain transition-transform duration-100"
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              cursor: zoom > 1 ? (dragging ? "grabbing" : "grab") : "zoom-in",
            }}
            draggable={false}
            onClick={(e) => {
              e.stopPropagation();
              if (zoom === 1) {
                setZoom(2);
              } else {
                setZoom(1);
                setPan({ x: 0, y: 0 });
              }
            }}
          />

          {/* HUD */}
          <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between px-4 py-4 font-mono text-[10px] tracking-[0.25em] text-paper/70 md:px-8">
            <span>{label ?? alt ?? "IMAGE"}</span>
            <span>{Math.round(zoom * 100)}%</span>
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center font-mono text-[10px] tracking-[0.25em] text-paper/60">
            ESC 닫기 · 클릭 확대 · 드래그 이동 · 0 리셋
          </div>
          <button
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center border border-paper/40 bg-paper/10 text-paper backdrop-blur transition-colors hover:bg-paper hover:text-ink md:right-8 md:top-8"
            aria-label="닫기"
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
}
