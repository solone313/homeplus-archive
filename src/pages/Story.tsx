import { Frame } from "../components/Frame";
import { HeroFortune } from "../components/HeroFortune";
import { SaiLogo } from "../components/SaiLogo";
import { VideoPlayer } from "../components/VideoPlayer";
import { NaverMap } from "../components/NaverMap";
import { LayerStack } from "../components/LayerStack";
import { SwipeGallery } from "../components/SwipeGallery";
import { Lightbox } from "../components/Lightbox";
import { SloganKerning } from "../components/effects/SloganKerning";
import { MagneticField } from "../components/effects/MagneticField";
import { TracingOverlay } from "../components/effects/TracingOverlay";
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

export function Story() {
  return (
    <>

      {/* 00 HERO ───────────────────────────────────── */}
      <section id="hero" className="relative w-full bg-white">
        <div className="relative z-10 mx-auto flex max-w-[1440px] flex-col px-4 pb-16 pt-16 md:px-10 md:pb-20 md:pt-24">
          <div>
            <p className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-mute">
              <SaiLogo className="h-[10px] w-auto" />
              SCENE 00 — INTRO
            </p>

            {/* Architectural plate — clean photo, no chips, no caption */}
            <figure className="mt-5 md:mt-8">
              <div className="relative aspect-[16/9] max-w-[960px] overflow-hidden border border-line bg-white">
                {HERO_IMAGE ? (
                  <img
                    src={HERO_IMAGE}
                    alt="사이집 가양"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <div className="silver-shimmer absolute inset-0 grid place-items-center">
                    <span className="font-mono text-[11px] tracking-[0.3em] text-mute">
                      대표 이미지 슬롯 · 6/18 예정
                    </span>
                  </div>
                )}
              </div>
            </figure>
          </div>

          <div className="mt-10 md:mt-14">
            <h1 className="block">
              <HeroFortune />
            </h1>
            <p className="mt-4 max-w-xl text-base font-medium leading-tight tracking-tight md:mt-6 md:text-2xl">
              독립은 있되, <span className="text-accent">고립은 없다</span>
            </p>
            <p className="mt-2 max-w-md text-xs leading-relaxed text-ink-soft md:text-sm">
              옛 홈플러스 가양점 자리, 비움을 사이에 둔 다섯 슬래브의 집.
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

      {/* 00.5 SLOGAN KERNING — 자간이 좁혀지며 평면도 reveal ───── */}
      <section
        id="slogan"
        className="relative mx-auto max-w-[1440px] scroll-mt-16 overflow-hidden border-t border-line/60 px-4 py-16 md:px-10 md:py-24"
      >
        <header className="mb-8 md:mb-12">
          <p className="mb-3 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-mute md:mb-4">
            <SaiLogo className="h-[10px] w-auto" />
            SCENE 00.5 — SLOGAN AS PLAN
          </p>
          <h2 className="text-[7vw] font-extrabold leading-[1.04] tracking-[-0.03em] md:text-[clamp(2rem,4vw,3.5rem)]">
            슬로건은 평면이 아니라 단면이다.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft md:mt-4 md:text-base">
            14개의 글자는 각자 하중을 나눠 진 기둥, 그 사이 여백은 함께 쓰는 공간. 자간이 좁혀지면
            글자 아래로 작은 평면도 한 장이 떠오릅니다.
          </p>
        </header>
        <SloganKerning planImage={`${import.meta.env.BASE_URL}slogan-plan-placeholder.png`} />
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
        <p className="mb-3 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-mute md:mb-4">
        <SaiLogo className="h-[10px] w-auto" />
        {tag}
      </p>
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

