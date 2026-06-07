import { useState } from "react";

type Layer = {
  id: string;
  label: string;
  src: string;
  alt?: string;
};

type Props = {
  layers: Layer[];
  ratio?: string;
  /** background base (same image showing site context under all toggles) */
  base?: { src: string; alt?: string };
};

/**
 * N-layer view with toggle pills. Each layer crossfades on top of optional base.
 * Use for 철거 / 보존 / 신설 type comparisons.
 */
export function LayerStack({ layers, ratio = "16/9", base }: Props) {
  const [activeIds, setActiveIds] = useState<string[]>(() => layers.map((l) => l.id));

  const toggle = (id: string) => {
    setActiveIds((cur) =>
      cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id],
    );
  };
  const only = (id: string) => setActiveIds([id]);
  const all = () => setActiveIds(layers.map((l) => l.id));

  return (
    <div>
      <div
        className="relative w-full overflow-hidden border border-line/60 bg-silver-100"
        style={{ aspectRatio: ratio }}
      >
        {/* Base layer */}
        {base?.src && (
          <img
            src={base.src}
            alt={base.alt ?? "base"}
            className="absolute inset-0 h-full w-full object-cover opacity-60"
          />
        )}
        {/* Layers */}
        {layers.map((l) => {
          const on = activeIds.includes(l.id);
          if (!l.src) {
            return (
              <div
                key={l.id}
                className="absolute inset-0 grid place-items-center transition-opacity duration-500"
                style={{ opacity: on ? 0.9 : 0 }}
              >
                <span className="font-mono text-[10px] tracking-[0.3em] text-mute">
                  {l.label} 레이어 슬롯
                </span>
              </div>
            );
          }
          return (
            <img
              key={l.id}
              src={l.src}
              alt={l.alt ?? l.label}
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
              style={{ opacity: on ? 1 : 0 }}
            />
          );
        })}
        {/* legend top-left */}
        <div className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-2 border border-paper/70 bg-ink/55 px-2 py-1 font-mono text-[10px] tracking-[0.25em] text-paper backdrop-blur">
          <span>SITE LAYERS</span>
          <span className="text-paper/60">{activeIds.length}/{layers.length}</span>
        </div>
      </div>

      {/* Toggle controls */}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {layers.map((l) => {
          const on = activeIds.includes(l.id);
          return (
            <div key={l.id} className="inline-flex">
              <button
                onClick={() => toggle(l.id)}
                aria-pressed={on}
                className={`inline-flex items-center gap-2 border px-3 py-1.5 font-mono text-[11px] tracking-[0.18em] transition-colors ${
                  on
                    ? "border-ink bg-ink text-paper"
                    : "border-line/70 bg-paper-soft text-mute hover:border-ink"
                }`}
              >
                <span
                  className={`block h-2 w-2 ${on ? "bg-accent" : "bg-line"}`}
                />
                <span>{l.label}</span>
              </button>
              <button
                onClick={() => only(l.id)}
                className="inline-flex items-center border-y border-r border-line/70 bg-paper-soft px-2 font-mono text-[9px] tracking-[0.2em] text-mute transition-colors hover:bg-ink hover:text-paper"
                title="이 레이어만 보기"
              >
                ONLY
              </button>
            </div>
          );
        })}
        <button
          onClick={all}
          className="inline-flex items-center border border-line/70 bg-paper-soft px-3 py-1.5 font-mono text-[10px] tracking-[0.2em] text-mute transition-colors hover:bg-ink hover:text-paper"
        >
          ALL
        </button>
      </div>
    </div>
  );
}
