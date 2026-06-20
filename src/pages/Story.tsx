import { Frame } from "../components/Frame";
import { HeroFortune } from "../components/HeroFortune";
import { RevealOnView } from "../components/RevealOnView";
import { SaiLogo } from "../components/SaiLogo";
import { VideoPlayer } from "../components/VideoPlayer";
import { NaverMap } from "../components/NaverMap";
import { SwipeGallery } from "../components/SwipeGallery";
import { Lightbox } from "../components/Lightbox";
import { StreetviewTimeline } from "../components/StreetviewTimeline";
import { MagneticField } from "../components/effects/MagneticField";
import { TracingOverlay } from "../components/effects/TracingOverlay";
import {
  STORY_INTRO_VIDEO,
  STORY_INTRO_POSTER,
  HERO_IMAGE,
  LIFE_SCENES,
  UNIT_ELEVATION,
  UNIT_SECTION,
  UNIT_INTERIOR,
} from "../constants/site";

export function Story() {
  return (
    <>

      {/* 00 HERO ───────────────────────────────────── */}
      <section id="hero" className="relative w-full bg-white">
        <div className="relative z-10 mx-auto flex max-w-[1440px] flex-col px-4 pb-16 pt-16 md:px-10 md:pb-20 md:pt-24">
          <div>
            <RevealOnView as="p" delay={0} duration={400} className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-mute md:text-[12px]">
              <SaiLogo className="h-[10px] w-auto" />
              SCENE 00 — INTRO
            </RevealOnView>

            {/* Architectural plate — photo + 우상단 작은 메타 (좌측 SCENE label 의 짝).
                메타는 도면적 anchor 두 자리 (좌 SCENE · 우 작품 신원) 만 잡고
                wordmark / 슬로건은 하단으로 양보 — 정체성 자리 중복 해소. */}
            <div className="mt-5 grid grid-cols-1 gap-6 md:mt-8 md:grid-cols-12 md:gap-8">
              <RevealOnView as="figure" delay={180} duration={650} className="md:col-span-9">
                <div className="relative aspect-[16/10] overflow-hidden border border-line bg-white">
                  {HERO_IMAGE ? (
                    <img
                      src={HERO_IMAGE}
                      alt="사이집 가양"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    <div className="silver-shimmer absolute inset-0 grid place-items-center">
                      <span className="font-mono text-[11px] tracking-[0.3em] text-mute">
                        대표 이미지 슬롯 · SOON · 2026.10
                      </span>
                    </div>
                  )}
                </div>
              </RevealOnView>
              <aside className="md:col-span-3 flex flex-col justify-end gap-2 md:gap-3">
                <RevealOnView delay={320} duration={450} className="flex flex-col gap-2 md:gap-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-mute md:text-[11px]">
                    GRADUATION DESIGN · 2026
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-mute md:text-[11px]">
                    KIM JI SU
                  </p>
                  <hr className="border-0 border-t border-line my-1" />
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-mute md:text-[11px]">
                    SAIJIP GAYANG · 양천로 431
                  </p>
                </RevealOnView>
              </aside>
            </div>
          </div>

          {/* 하단 — 상단 grid 와 동일한 가로 anchor 구조 유지.
              좌 col-span-8: wordmark + slogan + subtitle
              우 col-span-4: next-scene hint + INTRO FILM CTA (우측-정렬, 하단 anchor) */}
          <div className="mt-10 grid grid-cols-1 gap-6 md:mt-14 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-8 flex flex-col">
              <RevealOnView delay={450} duration={550}>
                <h1 className="block">
                  <HeroFortune />
                </h1>
              </RevealOnView>
              <RevealOnView delay={650} duration={500}>
                <p className="mt-5 max-w-xl text-xl font-medium leading-[1.3] tracking-tight md:mt-7 md:text-4xl">
                  독립은 있되, <span className="text-accent">고립은 없다</span>
                </p>
              </RevealOnView>
              <RevealOnView delay={800} duration={450}>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-soft md:text-base">
                  옛 홈플러스 가양점 자리, 비움을 사이에 둔 다섯 슬래브의 집.
                </p>
              </RevealOnView>
            </div>
            <div className="md:col-span-4 flex flex-col items-start justify-end md:items-end">
              <RevealOnView delay={1050} duration={450}>
                <a
                  href="#video"
                  className="group inline-flex items-center gap-3 border border-ink bg-ink px-5 py-3 font-mono text-[11px] tracking-[0.25em] text-paper shadow-sm transition-colors hover:bg-accent hover:border-accent md:gap-4 md:px-6 md:py-3.5 md:text-[12px]"
                >
                  <span>다음 — INTRO FILM</span>
                  <span aria-hidden className="transition-transform group-hover:translate-y-0.5">↓</span>
                </a>
              </RevealOnView>
            </div>
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

      {/* 02 SITE ───────────────────────────────────── */}
      {/* SCENE 02 header — separate section so the panorama below can use
          position: sticky without being trapped under a transformed ancestor.
          narrative: SITE 가 먼저 — 사라지는 자리를 본 뒤에 WHY (설계 근거) 로 흐름. */}
      <section
        id="site"
        className="relative mx-auto max-w-[1440px] scroll-mt-16 px-4 pt-16 md:px-10 md:pt-24"
      >
        <header className="mb-0">
          <RevealOnView as="p" delay={0} duration={400} className="mb-3 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-mute md:text-[12px] md:mb-4">
            <SaiLogo className="h-[10px] w-auto" />
            SCENE 02 — SITE
          </RevealOnView>
          <RevealOnView delay={80} duration={500}>
            <h2 className="text-[8vw] font-extrabold leading-[1.15] tracking-[-0.035em] md:text-[clamp(2.5rem,5vw,5rem)]">
              상업이 대신한 공공성,<br className="md:block" />
              <span className="text-accent">사라지는 자리</span>
            </h2>
          </RevealOnView>
          <RevealOnView delay={160} duration={450}>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft md:mt-4 md:text-base">
              2025.12.28 홈플러스 가양점 폐점. 25년간 동네의 부엌·갤러리·운동장이 한꺼번에 사라졌다.
            </p>
          </RevealOnView>
        </header>
      </section>

      {/* Streetview panorama — 가양 15년의 가로 흐름. Full-bleed, scroll-pinned. */}
      <div className="mt-10 md:mt-14">
        <StreetviewTimeline />
      </div>

      {/* SCENE 02 body — photos, map, layers */}
      <section className="relative mx-auto max-w-[1440px] px-4 pb-16 md:px-10 md:pb-24">
        <RevealOnView delay={0} duration={500}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6 mt-12 md:mt-20">
          {/* 기존 홈플러스 평면도 — B1 / 1F / 2F */}
          <div className="md:col-span-12">
            <p className="rule-dim mb-3">기존 홈플러스 평면도 · 2000 ~ 2025</p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
              <Lightbox src={`${import.meta.env.BASE_URL}floorplans/b1.jpg`} label="지하 1층" ratio="4/3" />
              <Lightbox src={`${import.meta.env.BASE_URL}floorplans/1f.jpg`} label="지상 1층" ratio="4/3" />
              <Lightbox src={`${import.meta.env.BASE_URL}floorplans/2f.jpg`} label="지상 2층" ratio="4/3" />
            </div>
          </div>

          {/* Naver Map */}
          <div className="md:col-span-12">
            <p className="rule-dim mb-3">대지 위치</p>
            <NaverMap ratio="16/9" zoom={16} />
          </div>

        </div>
        </RevealOnView>
      </section>

      {/* 03 WHY ───────────────────────────────────── */}
      {/* narrative: SITE 의 사라짐을 본 뒤, 설계가 응답하는 'WHY' — 비움이 답이다. */}
      <Section
        id="why"
        tag="SCENE 03 — WHY"
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
          {[
            { n: 1, metric: "1인 가구 가구당 면적 추이 (2000-2025)" },
            { n: 2, metric: "14sqm 행위면적 분배" },
            { n: 3, metric: "사회적 관계 활성화 지표" },
          ].map(({ n, metric }) => (
            <Frame
              key={n}
              ratio="3/2"
              label={`DIAG 0${n} · ${metric}`}
              index="SOON · 2026.10"
            >
              <div
                className="grid h-full w-full place-items-center bg-silver-100"
                style={{ minHeight: "8rem" }}
              >
                <span className="font-mono text-[10px] tracking-[0.3em] text-mute">
                  통계·다이어그램 슬롯
                </span>
              </div>
            </Frame>
          ))}
        </div>
        {/* footnotes hidden until real sources arrive — keep array empty */}
        <Footnotes items={[]} />
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
        {/* Magnetic field — 12개 노드가 마우스에 따라 밀고 끌리며 가까워지면 점선으로 연결 */}
        <div className="mb-6 md:mb-8">
          <MagneticField cols={4} rows={3} width={1200} height={420} />
          <p className="mt-3 font-mono text-[10px] tracking-[0.22em] text-mute">
            ↳ 마우스를 가까이 가져가면 노드가 밀려나고, 멀어지면 천천히 끌려옵니다. 임계 거리 안에서는 점선이 잠시 맺힙니다.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          {["방 · UNIT", "골목 · CIRCULATION", "마을 · PROGRAM"].map((label, i) => (
            <Frame
              key={label}
              ratio="3/4"
              label={`STAGE 0${i + 1}`}
              index="SOON · 2026.10"
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
        {/* Tracing overlay — 네 개 방 카드 클릭 시 트레이싱지 한 장씩 누적되며 동선 곡선이 드러남 */}
        <div className="mb-8 md:mb-12">
          <TracingOverlay maxStack={3} />
          <p className="mt-3 font-mono text-[10px] tracking-[0.22em] text-mute">
            ↳ 닫힌 방 카드를 클릭하면 트레이싱지가 위에서 한 장씩 쌓이며 방 사이의 공유 공간이 곡선으로 드러납니다.
          </p>
        </div>

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
        <RevealOnView as="p" delay={0} duration={400} className="mb-3 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-mute md:text-[12px] md:mb-4">
          <SaiLogo className="h-[10px] w-auto" />
          {tag}
        </RevealOnView>
        <RevealOnView delay={80} duration={500}>
          <h2 className="text-[8vw] font-extrabold leading-[1.15] tracking-[-0.035em] md:text-[clamp(2.5rem,5vw,5rem)]">
            {title}
          </h2>
        </RevealOnView>
        {subtitle && (
          <RevealOnView delay={160} duration={450}>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft md:mt-4 md:text-base">
              {subtitle}
            </p>
          </RevealOnView>
        )}
      </header>
      <RevealOnView delay={200} duration={500}>{children}</RevealOnView>
    </section>
  );
}

function Footnotes({ items }: { items: string[] }) {
  if (items.length === 0) return null;
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

