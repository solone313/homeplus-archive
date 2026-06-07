import { Frame } from "../components/Frame";
import { VideoPlayer } from "../components/VideoPlayer";
import { NaverMap } from "../components/NaverMap";
import { LayerStack } from "../components/LayerStack";
import { SwipeGallery } from "../components/SwipeGallery";
import { Lightbox } from "../components/Lightbox";
import {
  STORY_INTRO_VIDEO,
  STORY_INTRO_POSTER,
  HERO_IMAGE,
  SITE_LAYERS,
  LIFE_SCENES,
  UNIT_ELEVATION,
  UNIT_SECTION,
  UNIT_INTERIOR,
} from "../constants/site";

const CHAPTERS = [
  { id: "hero", num: "00", label: "" },
  { id: "video", num: "01", label: "INTRO FILM" },
  { id: "why", num: "02", label: "WHY" },
  { id: "site", num: "03", label: "SITE" },
  { id: "void", num: "04", label: "VOID" },
  { id: "life", num: "05", label: "LIFE BEYOND THE ROOM" },
  { id: "unit", num: "06", label: "UNIT" },
];

export function Story() {
  return (
    <>
      <ChapterRail />

      {/* 00 HERO ───────────────────────────────────── */}
      <section id="hero" className="relative min-h-screen-d w-full">
        <div className="absolute inset-0">
          {HERO_IMAGE ? (
            <img
              src={HERO_IMAGE}
              alt="대표 이미지"
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div className="silver-shimmer absolute inset-0" />
          )}
          {!HERO_IMAGE && (
            <div className="absolute inset-0 grid place-items-center">
              <span className="font-mono text-[11px] tracking-[0.3em] text-mute">
                대표 이미지 슬롯 · 6/18 예정
              </span>
            </div>
          )}
        </div>

        <div className="relative z-10 flex min-h-screen-d flex-col justify-between px-4 pb-28 pt-16 md:px-10 md:pb-20 md:pt-24">
          <p className="rule-dim">SCENE 00 — INTRO</p>

          <div>
            <h1 className="flex items-baseline gap-1 text-[24vw] font-extrabold leading-[0.85] tracking-[-0.05em] md:text-[clamp(7rem,16vw,16rem)]">
              <span>HOME</span>
              <span className="relative inline-block translate-y-[-0.05em] px-[0.06em]">
                <svg
                  width="0.78em"
                  height="0.78em"
                  viewBox="0 0 100 100"
                  className="inline-block"
                  fill="none"
                >
                  <path
                    d="M50 8 V92 M8 50 H92"
                    stroke="var(--color-accent)"
                    strokeWidth="14"
                    strokeLinecap="square"
                  />
                </svg>
              </span>
            </h1>
            <p className="mt-3 max-w-xl text-base font-medium leading-tight tracking-tight md:mt-5 md:text-2xl">
              비움으로 <span className="text-accent">삶</span>이 스며드는 집
            </p>
            <p className="mt-2 max-w-md text-xs leading-relaxed text-ink-soft md:text-sm">
              홈플러스가 쇼핑에 삶을 더했듯, 주거에 삶을 심는다.
            </p>

            <a
              href="#video"
              className="group mt-8 inline-flex items-center gap-3 border border-ink bg-ink px-5 py-3 font-mono text-[11px] tracking-[0.25em] text-paper transition-colors hover:bg-accent hover:border-accent md:gap-4 md:px-6 md:py-3.5 md:text-[12px]"
            >
              <span>다음 — INTRO FILM</span>
              <span aria-hidden className="transition-transform group-hover:translate-y-0.5">↓</span>
            </a>
          </div>
        </div>
      </section>

      {/* 01 INTRO VIDEO ───────────────────────────────────── */}
      <Section id="video" tag="SCENE 01 — INTRO FILM" title="영상으로 먼저 만나기">
        <VideoPlayer
          src={STORY_INTRO_VIDEO}
          poster={STORY_INTRO_POSTER}
          ratio="16/9"
        />
        <p className="mt-3 font-mono text-[11px] tracking-[0.18em] text-mute">
          ↳ 음소거 자동재생 · 클릭 또는 SOUND ON 버튼으로 사운드 활성
        </p>
      </Section>

      {/* 02 WHY ───────────────────────────────────── */}
      <Section
        id="why"
        tag="SCENE 02 — WHY"
        title={
          <>
            먹고자는 것 이상의{" "}
            <span className="text-accent">삶</span>을<br className="md:block" />
            다시 집으로
          </>
        }
        subtitle="국토부 최저주거기준 1인 14sqm. 잠자고 먹고 씻는 것만 겨우 가능한 면적. 비움은 면적을 포기하는 것이 아니라, 주어진 면적이 주거로서 기능하도록 하는 수단이다."
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          {[1, 2, 3].map((n) => (
            <Frame
              key={n}
              ratio="3/2"
              label={`DIAGRAM 0${n}`}
              index="TBD"
            >
              <div className="grid h-full w-full place-items-center bg-silver-100">
                <span className="font-mono text-[10px] tracking-[0.3em] text-mute">
                  통계·다이어그램 슬롯
                </span>
              </div>
            </Frame>
          ))}
        </div>
        <Footnotes
          items={[
            "출처 1 — 자료 도착 시 교체",
            "출처 2 — 자료 도착 시 교체",
          ]}
        />
      </Section>

      {/* 03 SITE ───────────────────────────────────── */}
      <Section
        id="site"
        tag="SCENE 03 — SITE"
        title={
          <>
            상업이 대신한 공공성,<br className="md:block" />
            <span className="text-accent">사라지는 자리</span>
          </>
        }
        subtitle="2025.10.30 홈플러스 가양점 폐점. 25년간 동네의 부엌·갤러리·운동장이 한꺼번에 사라졌다."
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
          {/* Photo + plan */}
          <Frame
            ratio="4/3"
            label="기존 홈플러스"
            index="사진"
            className="md:col-span-7"
          >
            <div className="grid h-full w-full place-items-center bg-silver-100">
              <span className="font-mono text-[10px] tracking-[0.3em] text-mute">
                현장 사진 슬롯
              </span>
            </div>
          </Frame>
          <Frame
            ratio="3/4"
            label="기존 홈플러스"
            index="도면"
            className="md:col-span-5"
          >
            <div className="grid h-full w-full place-items-center bg-silver-100">
              <span className="font-mono text-[10px] tracking-[0.3em] text-mute">
                도면 슬롯
              </span>
            </div>
          </Frame>

          {/* Naver Map */}
          <div className="md:col-span-12">
            <p className="rule-dim mb-3">대지 위치</p>
            <NaverMap ratio="16/9" zoom={16} />
          </div>

          {/* Layer toggle: 철거 / 보존 / 신설 */}
          <div className="md:col-span-12">
            <p className="rule-dim mb-3">철거 · 보존 · 신설</p>
            <LayerStack ratio="16/9" layers={SITE_LAYERS} />
            <p className="mt-2 font-mono text-[10px] tracking-[0.2em] text-mute">
              ↳ 각 레이어를 켜고/끄거나 ONLY 로 하나만 보세요 · 자료 6/14 예정
            </p>
          </div>
        </div>
      </Section>

      {/* 04 VOID ───────────────────────────────────── */}
      <Section
        id="void"
        tag="SCENE 04 — VOID"
        title={
          <>
            비움, <span className="text-accent">3단계</span>로<br className="md:block" />
            번지는 면적
          </>
        }
        subtitle="방 · 골목 · 마을. 스케일을 옮기며 비움이 만드는 관계의 가능성."
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          {["방 · UNIT", "골목 · CIRCULATION", "마을 · PROGRAM"].map((label, i) => (
            <Frame
              key={label}
              ratio="3/4"
              label={`STAGE 0${i + 1}`}
              index="6/10 예정"
            >
              <div className="grid h-full w-full place-items-center bg-silver-100">
                <span className="font-mono text-[11px] tracking-[0.3em] text-mute">
                  {label}
                </span>
              </div>
            </Frame>
          ))}
        </div>
        <Frame
          ratio="16/9"
          label="동선 다이어그램"
          index="보유 자료"
          className="mt-4 md:mt-6"
        >
          <div className="grid h-full w-full place-items-center bg-silver-100">
            <span className="font-mono text-[10px] tracking-[0.3em] text-mute">
              CIRCULATION DIAGRAM
            </span>
          </div>
        </Frame>
      </Section>

      {/* 05 LIFE BEYOND THE ROOM ───────────────────────────────────── */}
      <Section
        id="life"
        tag="SCENE 05 — LIFE BEYOND THE ROOM"
        title={
          <>
            방 너머의 삶,<br className="md:block" />
            <span className="text-accent">위치마다 다른 풍경</span>
          </>
        }
        subtitle="좌우로 스와이프하거나 화살표로 네 개의 장면을 차례로 만나보세요."
      >
        <SwipeGallery
          ratio="3/2"
          slides={LIFE_SCENES.map((s, i) => ({
            id: s.id,
            src: s.src,
            title: s.title || `SCENE 0${i + 1}`,
            caption: s.caption,
          }))}
        />
      </Section>

      {/* 06 UNIT ───────────────────────────────────── */}
      <Section
        id="unit"
        tag="SCENE 06 — UNIT"
        title={
          <>
            가장 안쪽,<br className="md:block" />
            <span className="text-accent">한 방의 단면</span>
          </>
        }
        subtitle="입면 · 단면 · 내부 렌더. 이미지 클릭 시 확대해서 볼 수 있습니다."
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-8">
            <Lightbox src={UNIT_ELEVATION} label="입면도" ratio="16/9" />
          </div>
          <div className="md:col-span-4">
            <Lightbox src={UNIT_SECTION} label="단면도" ratio="3/4" />
          </div>
          <div className="md:col-span-12">
            <Lightbox src={UNIT_INTERIOR} label="내부 렌더" ratio="3/2" />
          </div>
        </div>
      </Section>

      {/* END ───────────────────────────────────── */}
      <section className="mx-auto max-w-[1440px] px-4 py-16 md:px-10 md:py-24">
        <p className="rule-dim mb-4">END · 더 보기</p>
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
          <a
            href="#/drawings"
            className="group inline-flex items-center justify-between border border-ink bg-paper px-4 py-3 font-mono text-[11px] tracking-[0.25em] transition-colors hover:bg-ink hover:text-paper md:px-5"
          >
            <span>도면 전체 보기 · DRAWINGS</span>
            <span className="ml-3 transition-transform group-hover:translate-x-1">→</span>
          </a>
          <a
            href="#/film"
            className="group inline-flex items-center justify-between border border-ink bg-paper px-4 py-3 font-mono text-[11px] tracking-[0.25em] transition-colors hover:bg-ink hover:text-paper md:px-5"
          >
            <span>전체 영상 보기 · FILM</span>
            <span className="ml-3 transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>
      </section>
    </>
  );
}

/* ──────────────── helpers ──────────────── */

function Section({
  id,
  tag,
  title,
  subtitle,
  children,
}: {
  id: string;
  tag: string;
  title: React.ReactNode;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="relative mx-auto max-w-[1440px] scroll-mt-16 px-4 py-16 md:px-10 md:py-24"
    >
      <header className="mb-8 md:mb-12">
        <p className="rule-dim mb-3 md:mb-4">{tag}</p>
        <h2 className="text-[8vw] font-extrabold leading-[1] tracking-[-0.035em] md:text-[clamp(2.5rem,5vw,5rem)]">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft md:mt-4 md:text-base">
            {subtitle}
          </p>
        )}
      </header>
      {children}
    </section>
  );
}

function Footnotes({ items }: { items: string[] }) {
  return (
    <ol className="mt-5 space-y-1 border-t border-line/60 pt-4 font-mono text-[10px] leading-relaxed tracking-[0.05em] text-mute md:text-[11px]">
      {items.map((t, i) => (
        <li key={i} className="flex gap-2">
          <span>[{(i + 1).toString().padStart(2, "0")}]</span>
          <span>{t}</span>
        </li>
      ))}
    </ol>
  );
}

function ChapterRail() {
  return (
    <nav
      aria-label="STORY 챕터"
      className="pointer-events-none fixed right-2 top-1/2 z-40 hidden -translate-y-1/2 md:block"
    >
      <ul className="pointer-events-auto flex flex-col gap-1 font-mono text-[10px] tracking-[0.18em] text-mute">
        {CHAPTERS.map((c) => (
          <li key={c.id}>
            <a
              href={`#${c.id}`}
              className="group flex items-center justify-end gap-2 py-1 transition-colors hover:text-ink"
            >
              <span className="hidden whitespace-nowrap opacity-0 transition-opacity group-hover:opacity-100 lg:inline">
                {c.label}
              </span>
              <span>{c.num}</span>
              <span className="block h-px w-4 bg-current transition-all group-hover:w-8" />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
