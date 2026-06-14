import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";

type Props = {
  slogan?: string;
  voidWord?: string;
  autoplay?: boolean;
  delay?: number;
};

export function SloganKerning({
  slogan = "독립은 있되, 고립은 없다",
  voidWord = "고립",
  autoplay = true,
  delay = 350,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const planRef = useRef<SVGSVGElement | null>(null);
  const glyphRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [planVisible, setPlanVisible] = useState(false);

  useEffect(() => {
    const mqMobile = window.matchMedia("(max-width: 640px)");
    const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMobile = () => setIsMobile(mqMobile.matches);
    const updateMotion = () => setReducedMotion(mqMotion.matches);
    updateMobile();
    updateMotion();
    mqMobile.addEventListener("change", updateMobile);
    mqMotion.addEventListener("change", updateMotion);
    return () => {
      mqMobile.removeEventListener("change", updateMobile);
      mqMotion.removeEventListener("change", updateMotion);
    };
  }, []);

  const wideGap = isMobile ? 24 : 50;
  const narrowGap = isMobile ? 12 : 22;
  const glyphSize = isMobile ? 48 : 88;
  const trackHeight = isMobile ? 170 : 280;
  const planHeight = isMobile ? 120 : 180;

  const chars = useMemo(() => {
    return Array.from(slogan).map((c) => (c === " " ? "\u00A0" : c));
  }, [slogan]);

  const voidStart = useMemo(() => slogan.indexOf(voidWord), [slogan, voidWord]);
  const voidEnd = voidStart >= 0 ? voidStart + voidWord.length - 1 : -1;
  const isVoidIdx = (i: number) =>
    voidStart >= 0 && i >= voidStart && i <= voidEnd;

  const computeOffsets = (gap: number) => {
    const n = chars.length;
    const totalWidth = (n - 1) * gap;
    const start = -totalWidth / 2;
    return chars.map((_, i) => start + i * gap);
  };

  const applyOffsets = (gap: number, immediate: boolean) => {
    const offsets = computeOffsets(gap);
    glyphRefs.current.forEach((el, i) => {
      if (!el) return;
      if (immediate) {
        gsap.set(el, { x: offsets[i] });
      }
    });
    return offsets;
  };

  useEffect(() => {
    if (!trackRef.current) return;
    applyOffsets(wideGap, true);

    if (reducedMotion || !autoplay) {
      const offsets = applyOffsets(narrowGap, true);
      void offsets;
      setPlanVisible(true);
      return;
    }

    const targets = computeOffsets(narrowGap);
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        delay: delay / 1000,
        onComplete: () => setPlanVisible(true),
      });
      tl.to(glyphRefs.current.filter(Boolean), {
        x: (i: number) => targets[i],
        duration: 1.6,
        ease: "power3.inOut",
        stagger: { each: 0.018, from: "center" },
      });
    }, trackRef);

    return () => ctx.revert();
  }, [chars, wideGap, narrowGap, autoplay, delay, reducedMotion, isMobile]);

  useEffect(() => {
    if (!planRef.current) return;
    if (planVisible) {
      gsap.fromTo(
        planRef.current,
        { autoAlpha: 0, y: 8 },
        {
          autoAlpha: 1,
          y: 0,
          duration: reducedMotion ? 0 : 0.9,
          ease: "power2.out",
        },
      );
    } else {
      gsap.set(planRef.current, { autoAlpha: 0 });
    }
  }, [planVisible, reducedMotion]);

  const planDotGap = isMobile ? 16 : 34;
  const planDotRadius = isMobile ? 4 : 6;
  const planSidePad = isMobile ? 40 : 80;
  const planTotalDotsWidth = (chars.length - 1) * planDotGap;
  const planInnerWidth = planTotalDotsWidth;
  const planTotalWidthMm = Math.round(chars.length * 240);

  const planSvgWidth = isMobile ? 360 : 1180;
  const planCenterX = planSvgWidth / 2;
  const planStartX = planCenterX - planInnerWidth / 2;

  const voidLeftX =
    voidStart >= 0 ? planStartX + voidStart * planDotGap : planStartX;
  const voidRightX =
    voidEnd >= 0 ? planStartX + voidEnd * planDotGap : planStartX;
  const voidBoxPad = isMobile ? 8 : 14;

  const planBaseY = isMobile ? 70 : 100;
  const planCapY = planBaseY - (isMobile ? 22 : 34);
  const planDimY = isMobile ? 22 : 30;

  return (
    <div
      ref={containerRef}
      className="w-full bg-paper text-ink flex flex-col items-center justify-center py-8 px-4 select-none"
    >
      <div
        className="font-mono text-[10px] tracking-[0.3em] text-mute mb-4 uppercase"
        style={{ letterSpacing: "0.3em" }}
      >
        FIG · 01 — KERNING STUDY
      </div>

      <div
        ref={trackRef}
        className="relative flex items-center justify-center"
        style={{
          width: isMobile ? "100%" : 1180,
          maxWidth: "100%",
          height: trackHeight,
        }}
      >
        <div
          className="absolute left-0 right-0 border-t border-line"
          style={{
            top: `calc(50% - ${glyphSize * 0.62}px)`,
            borderColor: "#cdced3",
          }}
        />
        <div
          className="absolute left-0 right-0 border-t border-line"
          style={{
            top: `calc(50% + ${glyphSize * 0.38}px)`,
            borderColor: "#cdced3",
          }}
        />

        <div
          className="relative"
          style={{ height: glyphSize * 1.4, width: "100%" }}
        >
          <div
            className="absolute left-1/2 top-1/2"
            style={{ transform: "translate(-50%, -50%)" }}
          >
            {chars.map((c, i) => {
              const isV = isVoidIdx(i);
              return (
                <span
                  key={i}
                  ref={(el) => {
                    glyphRefs.current[i] = el;
                  }}
                  className="absolute top-1/2 left-1/2 inline-block text-ink"
                  style={{
                    fontSize: glyphSize,
                    lineHeight: 1,
                    fontWeight: 500,
                    transform: "translate(-50%, -50%)",
                    fontFamily:
                      "'Pretendard', 'Apple SD Gothic Neo', system-ui, sans-serif",
                  }}
                >
                  <span className="relative inline-block">
                    {isV && (
                      <span
                        aria-hidden
                        className="absolute pointer-events-none"
                        style={{
                          inset: `-${glyphSize * 0.08}px -${glyphSize * 0.06}px`,
                          border: "1px dashed #ec4899",
                          borderRadius: 2,
                        }}
                      />
                    )}
                    {c}
                  </span>
                </span>
              );
            })}
          </div>
        </div>

        {voidStart >= 0 && (
          <div
            className="absolute font-mono text-accent"
            style={{
              top: `calc(50% - ${glyphSize * 0.95}px)`,
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: isMobile ? 9 : 11,
              letterSpacing: "0.3em",
              color: "#ec4899",
            }}
          >
            VOID
          </div>
        )}
      </div>

      <svg
        ref={planRef}
        width={isMobile ? "100%" : 1180}
        height={planHeight}
        viewBox={`0 0 ${planSvgWidth} ${planHeight}`}
        preserveAspectRatio="xMidYMid meet"
        style={{
          maxWidth: "100%",
          marginTop: isMobile ? 8 : 16,
          opacity: 0,
        }}
      >
        <line
          x1={planStartX - planSidePad / 2}
          x2={planStartX + planInnerWidth + planSidePad / 2}
          y1={planDimY}
          y2={planDimY}
          stroke="#8b8d94"
          strokeWidth={0.75}
        />
        <line
          x1={planStartX - planSidePad / 2}
          x2={planStartX - planSidePad / 2}
          y1={planDimY - 4}
          y2={planDimY + 4}
          stroke="#8b8d94"
          strokeWidth={0.75}
        />
        <line
          x1={planStartX + planInnerWidth + planSidePad / 2}
          x2={planStartX + planInnerWidth + planSidePad / 2}
          y1={planDimY - 4}
          y2={planDimY + 4}
          stroke="#8b8d94"
          strokeWidth={0.75}
        />
        <text
          x={planCenterX}
          y={planDimY - 8}
          textAnchor="middle"
          fill="#18181b"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          fontSize={isMobile ? 9 : 11}
          letterSpacing="0.18em"
        >
          {`W ${planTotalWidthMm} mm`}
        </text>

        <text
          x={planStartX - planSidePad / 2}
          y={planDimY - 14}
          textAnchor="middle"
          fill="#18181b"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          fontSize={isMobile ? 10 : 13}
          fontWeight={600}
        >
          A
        </text>
        <text
          x={planStartX + planInnerWidth + planSidePad / 2}
          y={planDimY - 14}
          textAnchor="middle"
          fill="#18181b"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          fontSize={isMobile ? 10 : 13}
          fontWeight={600}
        >
          A'
        </text>

        <line
          x1={planStartX - planSidePad / 2}
          x2={planStartX - planSidePad / 2}
          y1={planDimY + 8}
          y2={planBaseY + 14}
          stroke="#cdced3"
          strokeWidth={0.75}
          strokeDasharray="2 3"
        />
        <line
          x1={planStartX + planInnerWidth + planSidePad / 2}
          x2={planStartX + planInnerWidth + planSidePad / 2}
          y1={planDimY + 8}
          y2={planBaseY + 14}
          stroke="#cdced3"
          strokeWidth={0.75}
          strokeDasharray="2 3"
        />

        <line
          x1={planStartX - planSidePad / 4}
          x2={planStartX + planInnerWidth + planSidePad / 4}
          y1={planCapY}
          y2={planCapY}
          stroke="#cdced3"
          strokeWidth={1}
        />
        <line
          x1={planStartX - planSidePad / 4}
          x2={planStartX + planInnerWidth + planSidePad / 4}
          y1={planBaseY + (isMobile ? 14 : 20)}
          y2={planBaseY + (isMobile ? 14 : 20)}
          stroke="#cdced3"
          strokeWidth={1}
        />

        {chars.map((_, i) => {
          const cx = planStartX + i * planDotGap;
          const isV = isVoidIdx(i);
          return (
            <g key={i}>
              <line
                x1={cx}
                x2={cx}
                y1={planCapY}
                y2={planBaseY + (isMobile ? 14 : 20)}
                stroke="#cdced3"
                strokeWidth={0.5}
              />
              <circle
                cx={cx}
                cy={planBaseY}
                r={planDotRadius}
                fill={isV ? "#ec4899" : "#18181b"}
              />
            </g>
          );
        })}

        {voidStart >= 0 && (
          <rect
            x={voidLeftX - voidBoxPad}
            y={planBaseY - voidBoxPad}
            width={voidRightX - voidLeftX + voidBoxPad * 2}
            height={voidBoxPad * 2}
            fill="none"
            stroke="#ec4899"
            strokeWidth={1}
            strokeDasharray="3 3"
            rx={2}
          />
        )}

        <text
          x={planStartX - planSidePad / 2 - (isMobile ? 2 : 6)}
          y={planBaseY + (isMobile ? 30 : 40)}
          textAnchor="start"
          fill="#8b8d94"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          fontSize={isMobile ? 9 : 10}
          letterSpacing="0.18em"
        >
          UNIT · 독립
        </text>
        <text
          x={planStartX + planInnerWidth + planSidePad / 2 + (isMobile ? 2 : 6)}
          y={planBaseY + (isMobile ? 30 : 40)}
          textAnchor="end"
          fill="#8b8d94"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          fontSize={isMobile ? 9 : 10}
          letterSpacing="0.18em"
        >
          UNIT · 함께
        </text>

        <text
          x={planCenterX}
          y={planHeight - (isMobile ? 18 : 22)}
          textAnchor="middle"
          fill="#18181b"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          fontSize={isMobile ? 9 : 11}
          letterSpacing="0.22em"
        >
          PLAN · SCALE 1:200
        </text>
        <text
          x={planCenterX}
          y={planHeight - (isMobile ? 4 : 6)}
          textAnchor="middle"
          fill="#ec4899"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          fontSize={isMobile ? 9 : 11}
          letterSpacing="0.2em"
        >
          → 평면이 단면을 품는다
        </text>
      </svg>
    </div>
  );
}