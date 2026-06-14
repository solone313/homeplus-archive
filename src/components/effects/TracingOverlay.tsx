import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { gsap } from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';

export type Unit = {
  id: string;
  label: string;
  area: string;
  desc?: string;
  x: number;
  y: number;
};

export type Bridge = {
  from: string;
  to: string;
  label: string;
  d: string;
};

export type TracingOverlayProps = {
  units?: Unit[];
  bridges?: Record<string, Bridge[]>;
  maxStack?: number;
  className?: string;
};

const DEFAULT_UNITS: Unit[] = [
  { id: 'A', label: '방 A', area: '13.4㎡', desc: '단독 침실 · 남향 채광', x: 0, y: 0 },
  { id: 'B', label: '방 B', area: '11.8㎡', desc: '작업실 겸 서재 · 북측 안정광', x: 1, y: 0 },
  { id: 'C', label: '방 C', area: '12.6㎡', desc: '공용 거실로 열린 침실', x: 0, y: 1 },
  { id: 'D', label: '방 D', area: '14.2㎡', desc: '마당과 직결된 손님방', x: 1, y: 1 },
];

const DEFAULT_BRIDGES: Record<string, Bridge[]> = {
  A: [
    { from: 'A', to: 'B', label: '공유 복도 · 4.1m', d: 'M 25 25 C 45 10, 55 10, 75 25' },
    { from: 'A', to: 'C', label: '공유 계단 · 3.2m', d: 'M 25 25 C 10 45, 10 55, 25 75' },
  ],
  B: [
    { from: 'B', to: 'D', label: '공유 마당 · 6.2m', d: 'M 75 25 C 90 45, 90 55, 75 75' },
    { from: 'B', to: 'C', label: '대각 통로 · 7.8m', d: 'M 75 25 C 55 45, 45 55, 25 75' },
  ],
  C: [
    { from: 'C', to: 'D', label: '공용 거실 · 5.0m', d: 'M 25 75 C 45 90, 55 90, 75 75' },
    { from: 'C', to: 'A', label: '공유 계단 · 3.2m', d: 'M 25 75 C 10 55, 10 45, 25 25' },
  ],
  D: [
    { from: 'D', to: 'B', label: '공유 마당 · 6.2m', d: 'M 75 75 C 90 55, 90 45, 75 25' },
    { from: 'D', to: 'A', label: '대각 통로 · 7.8m', d: 'M 75 75 C 55 55, 45 45, 25 25' },
  ],
};

function usePrefersReducedMotion(): boolean {
  // prefers-reduced-motion 무시 — 졸업작품 사이트는 애니메이션이 콘텐츠.
  return false;
}

function useIsMobile(): boolean {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(max-width: 640px)');
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener?.('change', update);
    return () => mq.removeEventListener?.('change', update);
  }, []);
  return mobile;
}

export function TracingOverlay({
  units = DEFAULT_UNITS,
  bridges = DEFAULT_BRIDGES,
  maxStack = 3,
  className = '',
}: TracingOverlayProps) {
  const [openUnits, setOpenUnits] = useState<string[]>([]);
  const pathRefs = useRef<Map<string, SVGPathElement | null>>(new Map());
  const reduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();

  const cols = useMemo(() => {
    const maxX = units.reduce((m, u) => Math.max(m, u.x), 0);
    return Math.max(2, maxX + 1);
  }, [units]);

  const rows = useMemo(() => {
    const maxY = units.reduce((m, u) => Math.max(m, u.y), 0);
    return Math.max(2, maxY + 1);
  }, [units]);

  const effectiveMaxStack = isMobile ? Math.min(maxStack, 2) : maxStack;

  const toggleUnit = useCallback(
    (id: string) => {
      setOpenUnits((prev) => {
        if (prev.includes(id)) {
          return prev.filter((u) => u !== id);
        }
        const next = [...prev, id];
        while (next.length > effectiveMaxStack) {
          next.shift();
        }
        return next;
      });
    },
    [effectiveMaxStack],
  );

  const closeAll = useCallback(() => setOpenUnits([]), []);

  const activeBridges = useMemo(() => {
    const list: Array<{ key: string; unitId: string; bridge: Bridge; index: number }> = [];
    openUnits.forEach((uid, layerIdx) => {
      const arr = bridges[uid] ?? [];
      arr.forEach((b, i) => {
        list.push({ key: `${uid}-${b.from}-${b.to}-${i}-${layerIdx}`, unitId: uid, bridge: b, index: i });
      });
    });
    return list;
  }, [openUnits, bridges]);

  useEffect(() => {
    activeBridges.forEach(({ key }) => {
      const el = pathRefs.current.get(key);
      if (!el) return;
      const len = el.getTotalLength();
      el.style.strokeDasharray = `${len}`;
      el.style.strokeDashoffset = `${len}`;
      if (reduced) {
        el.style.strokeDashoffset = '0';
        el.style.strokeDasharray = '4 3';
      } else {
        gsap.to(el, {
          strokeDashoffset: 0,
          duration: 0.7,
          ease: 'power2.out',
          onComplete: () => {
            el.style.strokeDasharray = '4 3';
            el.style.strokeDashoffset = '0';
          },
        });
      }
    });
  }, [activeBridges, reduced]);

  const setPathRef = useCallback((key: string) => {
    return (el: SVGPathElement | null) => {
      if (el) pathRefs.current.set(key, el);
      else pathRefs.current.delete(key);
    };
  }, []);

  return (
    <div
      className={`relative border border-line bg-paper-soft p-3 sm:p-5 ${className}`}
    >
      <div className="flex items-start justify-between gap-2 mb-3 sm:mb-4">
        <div className="font-mono text-[10px] sm:text-[11px] tracking-[0.22em] text-mute leading-relaxed">
          <div className="text-ink">TRACING OVERLAY</div>
          <div>클릭으로 누적</div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.22em] text-mute">
            MAX {effectiveMaxStack} LAYERS
          </span>
          <button
            type="button"
            onClick={closeAll}
            disabled={openUnits.length === 0}
            aria-label="close all overlays"
            className="font-mono text-[10px] sm:text-[11px] tracking-[0.22em] border border-line px-2 py-1 text-ink hover:text-accent hover:border-accent transition-colors disabled:opacity-40 disabled:hover:text-ink disabled:hover:border-line"
          >
            X
          </button>
        </div>
      </div>

      <div className="relative">
        <div
          className="grid gap-2"
          style={{
            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
          }}
        >
          {units.map((unit) => {
            const active = openUnits.includes(unit.id);
            return (
              <button
                key={unit.id}
                type="button"
                onClick={() => toggleUnit(unit.id)}
                style={{
                  gridColumnStart: unit.x + 1,
                  gridRowStart: unit.y + 1,
                }}
                className={`relative h-[160px] sm:h-[200px] border bg-paper text-left p-3 sm:p-4 transition-all duration-200 group focus:outline-none ${
                  active
                    ? 'border-accent ring-1 ring-accent'
                    : 'border-line hover:border-ink/40'
                }`}
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.22em] text-mute">
                    UNIT · {unit.id}
                  </span>
                  <motion.span
                    key={active ? 'on' : 'off'}
                    initial={reduced ? false : { opacity: 0, y: -2 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`font-mono text-[10px] sm:text-[11px] tracking-[0.22em] ${
                      active ? 'text-accent' : 'text-accent/70 group-hover:text-accent'
                    }`}
                  >
                    {active ? 'ACTIVE' : 'CLICK'}
                  </motion.span>
                </div>

                <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 pointer-events-none">
                  <div className="text-ink text-2xl sm:text-3xl tracking-tight">
                    {unit.label}
                  </div>
                  <div className="font-mono text-[10px] sm:text-[11px] tracking-[0.22em] text-mute">
                    {unit.area}
                  </div>
                </div>

                {unit.desc && (
                  <div className="absolute left-3 right-3 sm:left-4 sm:right-4 bottom-3 sm:bottom-4 font-mono text-[10px] sm:text-[11px] tracking-[0.18em] text-mute truncate">
                    {unit.desc}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            {activeBridges.map(({ key, bridge }) => (
              <path key={`def-${key}`} id={`tp-${key}`} d={bridge.d} />
            ))}
          </defs>
          <AnimatePresence>
            {activeBridges.map(({ key, bridge }) => (
              <g key={key}>
                <path
                  ref={setPathRef(key)}
                  d={bridge.d}
                  fill="none"
                  stroke="#ec4899"
                  strokeWidth={1}
                  strokeOpacity={0.7}
                  vectorEffect="non-scaling-stroke"
                  pathLength={1}
                />
                <text
                  fill="#ec4899"
                  fillOpacity={0.85}
                  fontSize={isMobile ? 2.4 : 2}
                  letterSpacing={0.3}
                  style={{
                    fontFamily:
                      'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                    textTransform: 'uppercase',
                  }}
                >
                  <textPath href={`#tp-${key}`} startOffset="20%">
                    {bridge.label}
                  </textPath>
                </text>
              </g>
            ))}
          </AnimatePresence>
        </svg>
      </div>

      <div className="mt-3 sm:mt-4 flex items-center justify-between gap-2">
        <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.22em] text-mute">
          독립은 있되, 고립은 없다
        </span>
        <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.22em] text-mute">
          {openUnits.length}/{effectiveMaxStack} ACTIVE
        </span>
      </div>
    </div>
  );
}