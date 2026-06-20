import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { STREETVIEW_FRAMES } from "../constants/site";

const N = STREETVIEW_FRAMES.length;

/**
 * 시간의 파노라마 — 가양 홈플러스 25년이 좌→우로 흐른다.
 *
 * 구현: CSS position: sticky + framer-motion useScroll. Lenis 의존을 제거해
 * 네이티브 스크롤로 sticky 가 안정적으로 작동하게 함.
 *
 * Layout:
 *   <section h={N*70vh}>            ← outer 가 scroll range 를 결정
 *     <div sticky top-0 h-screen>   ← pin (네이티브 sticky)
 *       <strip translateX(...)>     ← 가로 panning
 *         {photos[]}
 *       </strip>
 *       <bottom panel: year + bar />
 *     </div>
 *   </section>
 */
export function StreetviewTimeline() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // strip 자체 너비 대비 -((N-1)*100/N)% 만큼 왼쪽으로 이동.
  const xEnd = -((N - 1) * 100) / N;
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `${xEnd}%`]);

  const [idx, setIdx] = useState(0);
  // closing overlay 의 opacity 는 useTransform 의 [0.9, 0.99] 입력에서 동작이
  // 어긋나 (framer-motion 12.38) 상태로 동기화. CSS transition 으로 부드럽게.
  const [overlayOpacity, setOverlayOpacity] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const i = Math.min(N - 1, Math.max(0, Math.round(p * (N - 1))));
    setIdx((prev) => (prev !== i ? i : prev));
    const op = p <= 0.88 ? 0 : p >= 0.99 ? 1 : (p - 0.88) / 0.11;
    setOverlayOpacity((prev) => (Math.abs(prev - op) > 0.01 ? op : prev));
  });

  const current = STREETVIEW_FRAMES[idx];

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="relative w-full"
      style={{ height: `${(N - 1) * 70 + 100}vh` }}
    >
      <div
        className="sticky top-0 w-full overflow-hidden bg-ink"
        style={{ height: "100vh" }}
      >
        {/* Horizontal strip — photos centered within each frame */}
        <motion.div
          className="flex h-full"
          style={{ width: `${N * 100}%`, x }}
        >
          {STREETVIEW_FRAMES.map((f, i) => {
            const sat =
              i === N - 1 ? 0 : Math.max(0.15, 1 - i * (1 / (N - 1)));
            const brt = 1 - i * 0.015;
            return (
              <div
                key={i}
                className="relative grid h-full shrink-0 place-items-center"
                style={{ width: `${100 / N}%` }}
              >
                <figure
                  className="relative w-[72vw] max-w-[900px]"
                  style={{ aspectRatio: "3 / 2" }}
                >
                  <img
                    src={f.src}
                    alt={`${f.year}년 가양 홈플러스`}
                    loading={i <= 1 ? "eager" : "lazy"}
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{
                      filter: `saturate(${sat}) brightness(${brt})`,
                    }}
                  />
                </figure>
              </div>
            );
          })}
        </motion.div>

        {/* Bottom panel — year + progress + endpoints */}
        <div className="pointer-events-none absolute inset-x-4 bottom-6 z-20 md:inset-x-10 md:bottom-10">
          <div className="mb-3 flex items-baseline justify-between md:mb-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper/55 md:text-[11px]">
              STREETVIEW · 가양
              <span className="hidden md:inline"> · 양천로 431</span>
            </p>
            <span className="font-mono text-3xl font-light leading-none tracking-tight text-paper md:text-5xl">
              {current.year}
            </span>
          </div>
          <div className="relative h-px bg-paper/15">
            <motion.div
              className="absolute inset-0 h-px origin-left bg-accent"
              style={{ scaleX: scrollYProgress }}
            />
          </div>
          <div className="mt-2 flex justify-between font-mono text-[9px] uppercase tracking-[0.22em] text-paper/50 md:mt-3 md:text-[10px]">
            <span>2000</span>
            <span>2025</span>
          </div>
        </div>

        {/* Closing overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-30 grid place-items-center bg-ink/55"
          style={{
            opacity: overlayOpacity,
            transition: "opacity 200ms linear",
          }}
        >
          <div className="px-6 text-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper/55 md:text-[11px]">
              END · STREETVIEW
            </p>
            <p className="mt-4 text-4xl font-extralight leading-tight text-paper md:text-6xl">
              25년
              <br />
              <span className="text-accent">한꺼번에</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StreetviewTimeline;
