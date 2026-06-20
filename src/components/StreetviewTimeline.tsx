import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useAnimationControls,
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
  // progress dot 의 left 좌표 — 훅은 컴포넌트 top-level 에서만 호출.
  const dotLeft = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const [idx, setIdx] = useState(0);
  // closing overlay 의 opacity 는 useTransform 의 [0.9, 0.99] 입력에서 동작이
  // 어긋나 (framer-motion 12.38) 상태로 동기화. CSS transition 으로 부드럽게.
  const [overlayOpacity, setOverlayOpacity] = useState(0);
  // hint 는 scroll 이 약간이라도 진행되면 사라진다 — "이미 보았다" 신호.
  const [hintFaded, setHintFaded] = useState(false);
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const i = Math.min(N - 1, Math.max(0, Math.round(p * (N - 1))));
    setIdx((prev) => (prev !== i ? i : prev));
    const op = p <= 0.88 ? 0 : p >= 0.99 ? 1 : (p - 0.88) / 0.11;
    setOverlayOpacity((prev) => (Math.abs(prev - op) > 0.01 ? op : prev));
    if (p > 0.1) setHintFaded(true);
  });

  const current = STREETVIEW_FRAMES[idx];

  // Initial nudge — viewport 진입 시 1회, strip 이 살짝 왼쪽으로 갔다가 돌아옴.
  const nudgeControls = useAnimationControls();
  const nudgedRef = useRef(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !nudgedRef.current) {
            nudgedRef.current = true;
            const t = window.setTimeout(() => {
              nudgeControls
                .start({
                  x: -30,
                  transition: { duration: 0.2, ease: "easeOut" },
                })
                .then(() =>
                  nudgeControls.start({
                    x: 0,
                    transition: { duration: 0.4, ease: "easeIn" },
                  }),
                );
            }, 500);
            return () => window.clearTimeout(t);
          }
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [nudgeControls]);

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
        {/* Horizontal strip — photos centered within each frame.
            Outer motion.div carries scroll-driven x; inner carries the
            one-shot nudge so the two transforms compose without fighting. */}
        <motion.div
          className="flex h-full"
          style={{ width: `${N * 100}%`, x }}
        >
          <motion.div
            className="flex h-full w-full"
            animate={nudgeControls}
            initial={{ x: 0 }}
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
        </motion.div>

        {/* Bottom panel — year + progress + endpoints */}
        <div className="pointer-events-none absolute inset-x-4 bottom-6 z-20 md:inset-x-10 md:bottom-10">
          <div className="mb-3 flex items-baseline justify-between md:mb-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper/55 md:text-[11px]">
              STREETVIEW · 가양
              <span className="hidden md:inline"> · 양천로 431</span>
            </p>
            <div className="flex flex-col items-end gap-1">
              {/* Affordance hint — scroll 직후 페이드아웃 */}
              <span
                className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper/45 transition-opacity duration-500"
                style={{ opacity: hintFaded ? 0 : 1 }}
                aria-hidden={hintFaded}
              >
                SCROLL TO PAN →
              </span>
              <span className="font-mono text-2xl font-light leading-none tracking-tight text-paper md:text-3xl">
                {current.year}
              </span>
            </div>
          </div>
          {/* Progress bar — track 어둡게, fill 은 accent (= void/gap 신호),
              tick marks 로 프레임 경계 + 현재 위치 점 */}
          <div className="relative h-[2px] bg-paper/10 md:h-[3px]">
            <motion.div
              className="absolute inset-y-0 left-0 origin-left bg-accent"
              style={{ scaleX: scrollYProgress, width: "100%" }}
            />
            {/* Frame ticks — 각 프레임 시작 위치 */}
            {STREETVIEW_FRAMES.map((_, i) => {
              const left = (i / (N - 1)) * 100;
              return (
                <span
                  key={i}
                  aria-hidden
                  className="absolute -top-[2px] h-[6px] w-[2px] bg-paper/30 md:-top-[1.5px]"
                  style={{
                    left: `${left}%`,
                    transform:
                      i === 0
                        ? "translateX(0)"
                        : i === N - 1
                          ? "translateX(-100%)"
                          : "translateX(-50%)",
                  }}
                />
              );
            })}
            {/* Current position dot */}
            <motion.span
              aria-hidden
              className="absolute top-1/2 h-[8px] w-[8px] -translate-y-1/2 rounded-full bg-paper md:h-[10px] md:w-[10px]"
              style={{
                left: dotLeft,
                x: "-50%",
              }}
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
