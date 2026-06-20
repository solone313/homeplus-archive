import { useEffect, useRef, useState } from "react";
import { RevealOnView } from "./RevealOnView";
import { STREETVIEW_FRAMES } from "../constants/site";

/**
 * 가양 홈플러스 25년 — 시간 순서대로 배치된 거리뷰 필름스트립.
 * 프레임이 좌→우로 도착하면서 채도가 점진적으로 빠짐. 마지막 프레임은
 * 흑백 (지워진 자리). 호버 시 6초에 걸쳐 천천히 원래 색으로 복원
 * — "기억의 제스처".
 *
 * 이미지가 아직 없으면 placeholder 슬롯으로 표시 (자료 도착 시 교체).
 */
export function StreetviewTimeline() {
  const total = STREETVIEW_FRAMES.length;
  const [tailVisible, setTailVisible] = useState(false);

  // Last-frame reveal delay + duration; trailing caption appears 600ms after it.
  const lastDelay = (total - 1) * 120;
  const lastDuration = 400 + (total - 1) * 100; // 400 → 800ms
  const tailDelay = lastDelay + lastDuration + 600;
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    timerRef.current = window.setTimeout(() => setTailVisible(true), tailDelay);
    return () => {
      if (timerRef.current != null) window.clearTimeout(timerRef.current);
    };
  }, [tailDelay]);

  return (
    <div className="streetview-timeline">
      <div className="mb-4 md:mb-6 flex items-baseline justify-between">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-mute">
          지나간 25년
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-mute/70">
          STREETVIEW · {STREETVIEW_FRAMES[0].year}–{STREETVIEW_FRAMES[total - 1].year}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 md:grid-cols-5 md:gap-3">
        {STREETVIEW_FRAMES.map((frame, idx) => {
          const delay = idx * 120;
          const duration = 400 + idx * 100;
          // Saturation steps: 1 → 0.8 → 0.55 → 0.3 → 0 (last frame is monochrome).
          const sat = idx === total - 1 ? 0 : 1 - idx * 0.25;
          const bright = 1 - idx * 0.03;
          return (
            <RevealOnView key={frame.year} delay={delay} duration={duration} y={10}>
              <figure className="sv-frame group">
                <figcaption className="mb-1.5 flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-mute">
                  <span>{frame.year}</span>
                  <span className="text-mute/60">{String(idx + 1).padStart(2, "0")}</span>
                </figcaption>
                <div
                  className="sv-frame-img relative aspect-[4/3] overflow-hidden border border-line bg-silver-100"
                  style={{
                    filter: `saturate(${sat}) brightness(${bright})`,
                  }}
                >
                  {frame.src ? (
                    <img
                      src={frame.src}
                      alt={`${frame.year}년 홈플러스 가양점 거리뷰`}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover"
                      onError={(e) => {
                        // Hide broken img so the placeholder text shows through.
                        (e.currentTarget as HTMLImageElement).style.display = "none";
                      }}
                    />
                  ) : null}
                  <span className="absolute inset-0 grid place-items-center font-mono text-[9px] tracking-[0.25em] text-mute/70 pointer-events-none">
                    {frame.year} · 자료 예정
                  </span>
                </div>
                <p className="mt-2 text-[11px] leading-snug text-ink-soft md:text-xs">
                  {frame.context}
                </p>
              </figure>
            </RevealOnView>
          );
        })}
      </div>

      <p
        className="mt-6 max-w-xl font-mono text-[11px] leading-relaxed tracking-[0.06em] text-mute md:mt-8 md:text-xs"
        style={{
          opacity: tailVisible ? 1 : 0,
          transform: tailVisible ? "translateY(0)" : "translateY(6px)",
          transition: "opacity 600ms cubic-bezier(0.22, 1, 0.36, 1), transform 600ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        ↳ 25년 — 동네의 부엌, 갤러리, 운동장이 한꺼번에. 프레임 위에 마우스를 올리면 그 해의 색이 잠시 돌아옵니다.
      </p>

      <style>{`
        .sv-frame-img {
          transition: filter 600ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .sv-frame:hover .sv-frame-img,
        .sv-frame:focus-within .sv-frame-img {
          filter: saturate(1) brightness(1) !important;
        }
      `}</style>
    </div>
  );
}

export default StreetviewTimeline;
