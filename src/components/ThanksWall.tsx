import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * 골강판 셔터 사진 위에 14명의 이름표가 붙어있다. 각 이름에 hover/focus/tap
 * 하면 그 사람의 역할이 사진 하단의 reveal slot 에 "두둥!" 하고 spring 으로
 * 튀어 오른다. 사진 자체가 사라진 마트의 셔터를 닮아 사이트 톤과 일치.
 *
 * 좌표는 사진(1166×1458) 위의 이름표 중심을 백분율로 잡아둠. 사진 비율을
 * aspect-[1166/1458] 로 고정하므로 반응형으로 자동 스케일.
 */
type Person = { name: string; role: string; x: number; y: number };

// 좌표(%) 는 사진에 5% grid 를 덮어 직접 측정한 이름표 중심 픽셀.
// 사진(1094×1386) 비율을 고정해서 반응형으로 자동 스케일됨.
// (원본 1166×1458 에서 36px 흰 테두리 trim 후 좌표 변환 적용.)
const PEOPLE: Person[] = [
  { name: "선희", role: "작업실의 밥 로스 겸 멘탈 테라피스트", x: 41.5, y: 19.5 },
  { name: "주연", role: "전시계획 디렉터 겸 렌더 후보정팀", x: 62.8, y: 23.7 },
  { name: "이경", role: "모형 총감독", x: 35.1, y: 26.9 },
  { name: "호진", role: "웹사이트 제작자 겸 생존지원팀", x: 53.2, y: 32.1 },
  { name: "주원", role: "판넬·영상 제작지원팀", x: 68.1, y: 39.5 },
  { name: "혜성", role: "설계의 북극성 겸 영상지원팀", x: 43.6, y: 44.7 },
  { name: "허씨자매들", role: "긴급지원팀", x: 63.9, y: 50.0 },
  { name: "동규", role: "모형·3D 프린팅 제작지원팀", x: 32.9, y: 55.3 },
  { name: "후림", role: "모형·3D 프린팅 제작지원팀", x: 39.3, y: 59.5 },
  { name: "형준", role: "멘탈케어 겸 운반지원팀", x: 58.5, y: 67.9 },
  { name: "하윤", role: "디테일 긴급구조대", x: 54.3, y: 73.1 },
  { name: "세진", role: "조경 방향잡이", x: 66.0, y: 82.6 },
  { name: "신웅", role: "깨알 디테일팀", x: 40.4, y: 86.8 },
  { name: "나영", role: "디테일 겸 졸전 기동지원대", x: 50.0, y: 88.9 },
];

export function ThanksWall() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <figure className="mx-auto w-full max-w-[680px]">
      <div
        className="relative w-full overflow-hidden border border-line bg-paper-soft"
        style={{ aspectRatio: "1094 / 1386" }}
      >
        <img
          src={`${import.meta.env.BASE_URL}media/thanks-wall.jpg`}
          alt="THANKS TO — 도와준 사람들의 이름표가 붙은 골강판 셔터"
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />

        {/* 14 hover hotspots over name tags */}
        {PEOPLE.map((p, i) => {
          const isActive = active === i;
          return (
            <button
              key={p.name}
              type="button"
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive((v) => (v === i ? null : v))}
              onFocus={() => setActive(i)}
              onBlur={() => setActive((v) => (v === i ? null : v))}
              onClick={() => setActive((v) => (v === i ? null : i))}
              className="group absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer outline-none"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: "14%",
                height: "5%",
                minHeight: "28px",
              }}
              aria-label={`${p.name} — ${p.role}`}
            >
              {/* 평소엔 거의 안 보이는 ring, hover/focus 시 살짝 강조 */}
              <span
                aria-hidden
                className={`block h-full w-full rounded-[2px] transition ${
                  isActive
                    ? "outline outline-2 outline-accent shadow-[0_0_18px_rgba(160,61,58,0.55)]"
                    : "outline outline-1 outline-transparent group-hover:outline-accent/40 group-focus-visible:outline-accent"
                }`}
              />
            </button>
          );
        })}

        {/* Reveal slot — 사진 하단 빈 골강판 위에 "두둥!" */}
        <div className="pointer-events-none absolute inset-x-4 bottom-[3.5%] flex justify-center md:inset-x-8">
          <AnimatePresence mode="wait">
            {active !== null && (
              <motion.div
                key={active}
                initial={{ scale: 0.55, opacity: 0, y: 24, rotate: -4 }}
                animate={{ scale: 1, opacity: 1, y: 0, rotate: 0 }}
                exit={{ scale: 0.85, opacity: 0, y: -8, rotate: 2 }}
                transition={{
                  type: "spring",
                  stiffness: 420,
                  damping: 16,
                  mass: 0.6,
                }}
                className="max-w-full"
              >
                <span className="inline-block whitespace-normal break-keep border border-accent bg-paper/95 px-4 py-2 text-center font-point text-sm font-bold leading-tight tracking-tight text-accent shadow-[0_6px_24px_rgba(160,61,58,0.45)] backdrop-blur md:text-base">
                  {PEOPLE[active].role}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <figcaption className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-mute md:text-[11px]">
        ↳ 이름에 마우스를 올리거나 탭하면 포지션이 두둥
      </figcaption>
    </figure>
  );
}
