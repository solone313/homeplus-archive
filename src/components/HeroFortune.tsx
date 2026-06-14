import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FORTUNES, type Fortune } from "../constants/fortunes";
import { SaiLogo } from "./SaiLogo";

function pickIndex(prev: number, length: number): number {
  if (length <= 1) return 0;
  let next = Math.floor(Math.random() * length);
  if (next === prev) {
    next = (next + 1) % length;
  }
  return next;
}

/**
 * 통합 로고 (사이집 워드마크 + 추상 도형) 를 트리거로 한 마디 인용 모달.
 * - idle: 중앙 바 위치에 핑크 펄스 (살아있는 시그널)
 * - hover: 캡션 "↑ CLICK · 한 마디" 페이드 인
 * - click: 로고 두 반쪽이 양쪽으로 swing-open 후 모달 오픈
 * - 모달: 앞면(인용) ↔ 뒷면(레퍼런스) 3D 뒤집기
 */
export function HeroFortune() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSplit, setIsSplit] = useState(false);
  const [isBack, setIsBack] = useState(false);
  const [idx, setIdx] = useState(0);
  const [bodyVisible, setBodyVisible] = useState(true);
  const lastIdxRef = useRef<number>(-1);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  // prefers-reduced-motion 을 의도적으로 무시 (졸업작품 사이트는 애니메이션이 콘텐츠).
  // 호환을 위해 상태/리터럴은 유지하되 항상 false.
  const reducedMotion = false;
  const setReducedMotion = (_: boolean) => undefined;
  void setReducedMotion;

  const pickNew = useCallback(() => {
    const next = pickIndex(lastIdxRef.current, FORTUNES.length);
    lastIdxRef.current = next;
    setIdx(next);
  }, []);

  const openModal = useCallback(() => {
    setIsSplit(true);
    setIsBack(false);
    window.setTimeout(() => {
      pickNew();
      setBodyVisible(true);
      setIsOpen(true);
    }, reducedMotion ? 0 : 240);
  }, [pickNew, reducedMotion]);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    window.setTimeout(() => {
      setIsSplit(false);
      setIsBack(false);
    }, reducedMotion ? 0 : 280);
  }, [reducedMotion]);

  const reroll = useCallback(() => {
    setBodyVisible(false);
    setIsBack(false);
    window.setTimeout(() => {
      pickNew();
      setBodyVisible(true);
    }, 180);
  }, [pickNew]);

  const toggleFlip = useCallback(() => {
    setIsBack((b) => !b);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 0);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      window.clearTimeout(t);
    };
  }, [isOpen, closeModal]);

  const fortune: Fortune = FORTUNES[idx] ?? FORTUNES[0];
  const labelId = "hero-fortune-title";
  const total = FORTUNES.length;

  return (
    <>
      {/* Combined logo (사이집 wordmark + abstract shapes) — splits open on click */}
      <div className={`hf-wrapper inline-block ${isSplit ? "is-split" : ""}`}>
        <div
          className={`hf-trigger group relative aspect-[527/192] h-[22vw] max-w-full md:h-[clamp(4.5rem,10vw,10rem)] ${
            isSplit ? "is-split" : ""
          }`}
        >
          {/* Left half — clipped to left 50% of image */}
          <img
            src={`${import.meta.env.BASE_URL}saijip-combined.png`}
            alt="사이집"
            aria-hidden
            className="hf-left absolute inset-0 h-full w-full select-none object-contain"
            style={{ clipPath: "inset(0 50% 0 0)" }}
          />
          {/* Right half — clipped to right 50% */}
          <img
            src={`${import.meta.env.BASE_URL}saijip-combined.png`}
            alt=""
            aria-hidden
            className="hf-right absolute inset-0 h-full w-full select-none object-contain"
            style={{ clipPath: "inset(0 0 0 50%)" }}
          />

          {/* Soft pink halo behind the bar — gentle pulse, blends with the logo */}
          <span
            aria-hidden
            className="hf-halo pointer-events-none absolute"
            style={{
              top: "8%",
              height: "62%",
              left: "49.8%",
              width: "14%",
              transform: "translateX(-50%)",
              background:
                "radial-gradient(closest-side, #ec4899 0%, transparent 65%)",
              filter: "blur(4px)",
              borderRadius: "50%",
            }}
          />

          {/* Click hit area — wide central strip over most of the logo */}
          <button
            type="button"
            onClick={openModal}
            aria-label="건축가의 한 마디 꺼내기"
            className="absolute z-10 cursor-pointer rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            style={{
              left: "18%",
              width: "64%",
              top: "0%",
              height: "100%",
            }}
          >
            <span className="sr-only">건축가의 한 마디 꺼내기</span>
          </button>
        </div>

        {/* Caption — sits below the trigger and contributes to layout height */}
        <div className="hf-caption-row mt-3 flex justify-center md:mt-4">
          <span
            aria-hidden
            className="hf-caption pointer-events-none font-mono text-accent transition-opacity duration-300"
            style={{
              fontSize: "10px",
              lineHeight: 1,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            ↑ click · 한 마디 꺼내기
          </span>
        </div>
      </div>

      {/* Animation styles — halo breath, caption fade, split halves on click */}
      <style>{`
        @keyframes hf-halo-anim {
          0%, 100% { opacity: 0.20; transform: translateX(-50%) scale(0.92); }
          50%      { opacity: 0.55; transform: translateX(-50%) scale(1.1); }
        }
        .hf-halo {
          animation: hf-halo-anim 2.6s ease-in-out infinite;
          transform-origin: center;
        }
        .hf-wrapper:hover .hf-halo,
        .hf-wrapper:focus-within .hf-halo {
          animation-duration: 1.1s;
        }
        .hf-wrapper.is-split .hf-halo {
          animation: none;
          opacity: 0;
        }

        /* Caption — quiet by default, full on hover */
        .hf-caption { opacity: 0.55; }
        .hf-wrapper:hover .hf-caption,
        .hf-wrapper:focus-within .hf-caption { opacity: 1; }
        .hf-wrapper.is-split .hf-caption { opacity: 0; }

        /* Left + right halves — swing apart on click */
        .hf-left, .hf-right {
          transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
          transform-origin: center;
        }
        .hf-trigger.is-split .hf-left  { transform: translateX(-8%); }
        .hf-trigger.is-split .hf-right { transform: translateX(8%); }
      `}</style>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="hf-backdrop"
            className="fixed inset-0 z-50 grid place-items-center bg-ink/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.18, ease: "easeOut" }}
            onClick={closeModal}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby={labelId}
              className="relative w-[90vw] max-w-md bg-paper border border-ink/20 p-8 md:p-10 h-[560px] md:h-[600px] max-h-[88vh] flex flex-col"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{
                duration: reducedMotion ? 0 : 0.25,
                ease: "easeOut",
              }}
              onClick={(e) => e.stopPropagation()}
              style={{ perspective: 1200 }}
            >
              {/* Corner ticks (blueprint feel) */}
              <span aria-hidden className="absolute left-2 top-2 h-[6px] w-[6px] border-l border-t border-ink/40" />
              <span aria-hidden className="absolute right-2 top-2 h-[6px] w-[6px] border-r border-t border-ink/40" />
              <span aria-hidden className="absolute left-2 bottom-2 h-[6px] w-[6px] border-l border-b border-ink/40" />
              <span aria-hidden className="absolute right-2 bottom-2 h-[6px] w-[6px] border-r border-b border-ink/40" />

              {/* Flip container — fills the card except the footer */}
              <div
                className="relative flex-1 cursor-pointer"
                onClick={toggleFlip}
                role="button"
                tabIndex={-1}
                aria-label={isBack ? "인용으로 돌아가기" : "레퍼런스 보기"}
              >
                <motion.div
                  className="relative h-full w-full"
                  style={{
                    transformStyle: "preserve-3d",
                    position: "relative",
                  }}
                  animate={{ rotateY: isBack ? 180 : 0 }}
                  transition={{
                    duration: reducedMotion ? 0 : 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {/* FRONT — quote */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                    }}
                  >
                    {/* Header */}
                    <div className="flex items-center gap-2">
                      <SaiLogo className="text-accent h-3 w-auto" />
                      <span
                        id={labelId}
                        className="font-mono text-[10px] tracking-[0.24em] text-mute uppercase"
                      >
                        FORTUNE · 사이집
                      </span>
                    </div>

                    {/* Top-right paper counter (md+) */}
                    <span className="absolute right-0 top-0 hidden font-mono text-[10px] tracking-[0.24em] text-mute uppercase md:inline">
                      {`PAPER · ${String(idx + 1).padStart(2, "0")} OF ${String(total).padStart(2, "0")}`}
                    </span>

                    {/* Flip hint */}
                    <span className="absolute right-0 -bottom-1 font-mono text-[9px] tracking-[0.22em] text-mute/60 uppercase">
                      ↺ tap to flip
                    </span>

                    {/* Body */}
                    <div className="mt-6">
                      <div aria-hidden className="mb-6 w-12 border-t border-dashed border-ink/20" />
                      <div className="min-h-[8rem] md:min-h-[10rem]">
                        <AnimatePresence mode="wait">
                          {bodyVisible && (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{
                                duration: reducedMotion ? 0 : 0.18,
                                ease: "easeOut",
                              }}
                            >
                              <p className="font-light tracking-[-0.01em] text-ink text-2xl md:text-3xl leading-[1.55]">
                                {fortune.quote}
                              </p>
                              <p className="mt-6 font-mono text-[12px] md:text-[13px] tracking-[0.18em] text-mute uppercase">
                                — {fortune.speaker}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>

                  {/* BACK — reference */}
                  <div
                    className="flex flex-col"
                    style={{
                      position: "absolute",
                      inset: 0,
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    {/* Header */}
                    <div className="flex items-center gap-2">
                      <SaiLogo className="text-accent h-3 w-auto" />
                      <span className="font-mono text-[10px] tracking-[0.24em] text-mute uppercase">
                        REFERENCE · 사이집
                      </span>
                    </div>

                    {/* Top-right paper counter (md+) */}
                    <span className="absolute right-0 top-0 hidden font-mono text-[10px] tracking-[0.24em] text-mute uppercase md:inline">
                      {`PAPER · ${String(idx + 1).padStart(2, "0")} OF ${String(total).padStart(2, "0")}`}
                    </span>

                    {/* Flip hint */}
                    <span className="absolute right-0 -bottom-1 font-mono text-[9px] tracking-[0.22em] text-mute/60 uppercase">
                      ↺ back to quote
                    </span>

                    {/* Body — flex-1 fills back face, scrolls internally if content exceeds */}
                    <div className="mt-6 flex-1 overflow-y-auto pr-1 pb-12">
                      <div aria-hidden className="mb-6 w-12 border-t border-dashed border-ink/20" />

                      {/* SOURCE */}
                      <div>
                        <p className="font-mono text-[10px] tracking-[0.24em] text-mute uppercase">
                          SOURCE
                        </p>
                        <p className="mt-2 text-sm md:text-base text-ink leading-relaxed font-light">
                          {fortune.source}
                        </p>
                      </div>

                      {/* ARCHITECT */}
                      <div className="mt-5 md:mt-6">
                        <p className="font-mono text-[10px] tracking-[0.24em] text-mute uppercase">
                          {`ARCHITECT — ${fortune.architect}`}
                        </p>
                        <p className="mt-2 text-sm md:text-base text-ink leading-relaxed font-light">
                          {fortune.architectBio}
                        </p>
                      </div>

                      {/* 사이집 연결 */}
                      <div className="mt-5 md:mt-6">
                        <p className="font-mono text-[10px] tracking-[0.24em] text-mute uppercase">
                          사이집 연결
                        </p>
                        <div className="mt-2 border-l-2 border-accent pl-3 py-1">
                          <p className="text-sm md:text-base text-ink leading-relaxed font-light">
                            {fortune.saiConnection}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Footer — outside the flip container, always visible */}
              <div className="mt-8 flex items-center justify-between">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    reroll();
                  }}
                  className="font-mono text-[10px] tracking-[0.22em] border border-ink/30 px-3 py-2 uppercase transition-colors hover:border-accent hover:text-accent"
                >
                  다시 뽑기
                </button>
                <button
                  ref={closeBtnRef}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    closeModal();
                  }}
                  className="font-mono text-[10px] tracking-[0.22em] bg-ink text-paper px-3 py-2 uppercase transition-colors hover:bg-accent"
                >
                  닫기
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default HeroFortune;
