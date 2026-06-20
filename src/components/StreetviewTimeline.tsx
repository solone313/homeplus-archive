import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { STREETVIEW_FRAMES } from "../constants/site";

gsap.registerPlugin(ScrollTrigger);

const N = STREETVIEW_FRAMES.length;

/**
 * 시간의 파노라마 — 가양 홈플러스 15년이 좌→우로 흐른다.
 *
 * Pin + horizontal-pan via GSAP ScrollTrigger (CSS sticky 와 Lenis 가 호환되지
 * 않기 때문에 ScrollTrigger 가 정확한 방법). 가운데에 사진이 작게 떠 있고
 * 양옆은 검은 여백 — 영화관식 framing.
 */
export function StreetviewTimeline() {
  const outerRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  const [idx, setIdx] = useState(0);
  const progressMV = useMotionValue(0);
  const finalOpacity = useTransform(progressMV, [0.88, 0.99], [0, 1]);

  useEffect(() => {
    if (!outerRef.current || !pinRef.current || !stripRef.current) return;

    const ctx = gsap.context(() => {
      // Strip 전체 너비 = N×viewport, 끝까지 갔을 때 -((N-1)/N)*100% 만큼 이동.
      const totalShiftPercent = -((N - 1) / N) * 100;

      gsap.to(stripRef.current, {
        xPercent: totalShiftPercent,
        ease: "none",
        scrollTrigger: {
          trigger: outerRef.current,
          start: "top top",
          end: `+=${(N - 1) * 50}%`, // ~50vh of scroll per frame transition
          pin: pinRef.current,
          pinSpacing: true,
          scrub: 0.4,
          onUpdate: (self) => {
            progressMV.set(self.progress);
            const i = Math.min(
              N - 1,
              Math.max(0, Math.round(self.progress * (N - 1))),
            );
            setIdx((prev) => (prev !== i ? i : prev));
          },
        },
      });
    }, outerRef);

    return () => ctx.revert();
  }, [progressMV]);

  const current = STREETVIEW_FRAMES[idx];

  return (
    <section ref={outerRef as React.RefObject<HTMLElement>} className="relative">
      <div
        ref={pinRef}
        className="relative h-screen w-full overflow-hidden bg-ink"
      >
        {/* Top header — site label + real-time year */}
        <div className="pointer-events-none absolute inset-x-4 top-4 z-20 flex items-start justify-between md:inset-x-10 md:top-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper/60 md:text-[11px]">
            STREETVIEW · 가양
            <span className="hidden md:inline"> · 양천로 431</span>
          </p>
          <div className="flex flex-col items-end gap-1">
            <span className="font-mono text-3xl font-light leading-none tracking-tight text-paper md:text-5xl">
              {current.year}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper/55 md:text-[11px]">
              — {current.context}
            </span>
          </div>
        </div>

        {/* Horizontal strip */}
        <div
          ref={stripRef}
          className="flex h-full"
          style={{ width: `${N * 100}%` }}
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
                  className="relative w-[86vw] max-w-[1100px]"
                  style={{ aspectRatio: "3 / 2" }}
                >
                  <img
                    src={f.src}
                    alt={`${f.year}년 가양 홈플러스 — ${f.context}`}
                    loading={i <= 1 ? "eager" : "lazy"}
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{
                      filter: `saturate(${sat}) brightness(${brt})`,
                    }}
                  />
                  {/* Per-frame label — bottom-left of photo */}
                  <figcaption className="absolute bottom-2 left-2 z-10 bg-ink/65 px-2 py-1 font-mono text-[9px] tracking-[0.22em] text-paper backdrop-blur-sm md:bottom-3 md:left-3 md:text-[10px]">
                    {f.year} · {f.context}
                  </figcaption>
                </figure>
              </div>
            );
          })}
        </div>

        {/* Bottom progress + endpoint labels */}
        <div className="pointer-events-none absolute inset-x-4 bottom-6 z-20 md:inset-x-10 md:bottom-10">
          <div className="relative h-px bg-paper/15">
            <motion.div
              className="absolute inset-0 h-px origin-left bg-accent"
              style={{ scaleX: progressMV }}
            />
          </div>
          <div className="mt-3 flex justify-between font-mono text-[9px] uppercase tracking-[0.22em] text-paper/50 md:text-[10px]">
            <span>2010 · 개장</span>
            <span>2025 · 폐점</span>
          </div>
        </div>

        {/* Closing overlay — "25년 한꺼번에" fades in on last frame */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-30 grid place-items-center bg-ink/55"
          style={{ opacity: finalOpacity }}
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
        </motion.div>
      </div>
    </section>
  );
}

export default StreetviewTimeline;
