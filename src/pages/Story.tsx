import { HeroFortune } from "../components/HeroFortune";
import { RevealOnView } from "../components/RevealOnView";
import { SaiLogo } from "../components/SaiLogo";
import { VideoPlayer } from "../components/VideoPlayer";
import { NaverMap } from "../components/NaverMap";
import { Lightbox } from "../components/Lightbox";
import { StreetviewTimeline } from "../components/StreetviewTimeline";
import {
  STORY_INTRO_VIDEO,
  STORY_INTRO_POSTER,
  HERO_IMAGE,
} from "../constants/site";

export function Story() {
  return (
    <>

      {/* 00 HERO ───────────────────────────────────── */}
      {/* HERO — h-screen 으로 정확히 viewport 채움. photo 는 남는 공간을 fill */}
      <section id="hero" className="relative w-full bg-paper" style={{ minHeight: "100vh" }}>
        <div className="relative z-10 mx-auto flex h-screen max-w-[1440px] flex-col px-4 pb-8 pt-14 md:px-10 md:pb-10 md:pt-16">
          <RevealOnView as="p" delay={0} duration={400} className="inline-flex shrink-0 items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-mute md:text-[12px]">
            <SaiLogo className="h-[10px] w-auto" />
            SCENE 00 — INTRO
          </RevealOnView>

          {/* Photo + meta — flex-1 로 남는 공간 fill. photo 가 height auto-stretch. */}
          <div className="mt-3 grid min-h-0 flex-1 grid-cols-1 gap-3 md:mt-4 md:grid-cols-12 md:gap-6">
            <RevealOnView as="figure" delay={180} duration={650} className="md:col-span-9 min-h-0">
              <div className="relative h-full w-full overflow-hidden border border-line bg-paper-soft">
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
            <aside className="md:col-span-3 flex shrink-0 flex-col justify-end gap-2 md:gap-3">
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

          {/* 하단 row — wordmark + slogan + CTA */}
          <div className="mt-4 grid shrink-0 grid-cols-1 gap-3 md:mt-5 md:grid-cols-12 md:gap-6">
            <div className="md:col-span-8 flex flex-col">
              <RevealOnView delay={450} duration={550}>
                <h1 className="block">
                  <HeroFortune />
                </h1>
              </RevealOnView>
              <RevealOnView delay={650} duration={500}>
                <p className="mt-2 max-w-xl text-xl font-medium leading-[1.2] tracking-tight md:mt-3 md:text-3xl">
                  독립은 있되, <span className="text-accent">고립은 없다</span>
                </p>
              </RevealOnView>
              <RevealOnView delay={800} duration={450}>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-soft md:text-base">
                  옛 홈플러스 가양점 자리, 비움을 사이에 둔 다섯 슬래브의 집.
                </p>
              </RevealOnView>
            </div>
            <div className="md:col-span-4 flex flex-col items-start justify-end md:items-end">
              <RevealOnView delay={1050} duration={450}>
                <a
                  href="#video"
                  onClick={(e) => {
                    // HashRouter 가 #video 를 /video 라우트로 해석해 404 가 뜨는 문제 회피.
                    // 같은 페이지 앵커 스크롤로만 동작시킨다.
                    e.preventDefault();
                    document
                      .querySelector("#video")
                      ?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
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
      {/* 01 INTRO FILM — 한 viewport 에 헤더+영상+캡션 모두 들어오게 inline 작은
          layout. Section helper 의 8vw h2 + py-24 는 너무 커서 분리. */}
      <section
        id="video"
        className="relative mx-auto max-w-[1440px] scroll-mt-16 px-4 py-10 md:px-10 md:py-14"
      >
        <header className="mb-4 md:mb-6">
          <RevealOnView as="p" delay={0} duration={400} className="mb-2 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-mute md:text-[12px] md:mb-3">
            <SaiLogo className="h-[10px] w-auto" />
            SCENE 01 — INTRO FILM
          </RevealOnView>
          <RevealOnView delay={80} duration={500}>
            <h2 className="text-3xl font-extrabold leading-[1.15] tracking-[-0.025em] md:text-4xl">
              영상으로 먼저 만나기
            </h2>
          </RevealOnView>
        </header>
        <RevealOnView delay={160} duration={500}>
          <div className="mx-auto" style={{ maxWidth: "min(820px, 56vh * 16 / 9)" }}>
            <VideoPlayer
              src={STORY_INTRO_VIDEO}
              poster={STORY_INTRO_POSTER}
              ratio="16/9"
            />
            <p className="mt-2 font-mono text-[10px] tracking-[0.18em] text-mute md:text-[11px]">
              ↳ 음소거 자동재생 · 클릭 또는 SOUND ON 버튼으로 사운드 활성
            </p>
          </div>
        </RevealOnView>
      </section>

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
        subtitle="국토부 최저주거기준 1인 14m². 잠자고 먹고 씻는 것만 겨우 가능한 면적. 비움은 면적을 포기하는 것이 아니라, 주어진 면적이 주거로서 기능하도록 하는 수단이다."
      >
        {/* Mass Diagram — 두꺼운 마트에 사이를 내다 */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
          {/* 좌측: 헤드라인 + 설명 + 7 step 라벨 */}
          <div className="md:col-span-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-mute md:text-[11px]">
              MASS DIAGRAM
            </p>
            <h3 className="mt-3 text-3xl font-extrabold leading-[1.15] tracking-[-0.025em] md:text-4xl">
              두꺼운 마트에<br />
              <span className="text-accent">사이</span>를 내다
            </h3>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-soft md:text-base">
              기존 구조 그리드는 남기고 깊고 닫힌 마트의 몸체를 비운다. 그 사이로
              빛과 바람, 동선과 공유생활이 스며들며 하나의 큰 상자는 여러 겹의 집
              으로 전환된다.
            </p>
            {/* 7 step 라벨 — 영상이 돌면서 한 화면에 모두 노출 */}
            <ol className="mt-6 grid grid-cols-1 gap-3 md:mt-8">
              {[
                { n: "01", title: "기존 홈플러스의 깊은 상자형 매스" },
                { n: "02", title: "주거 채광을 위한 매스 분절" },
                { n: "03", title: "자연환기를 위한 중앙부 비움" },
                { n: "04", title: "안뜰 채광을 위한 매스 깊이 조정" },
                { n: "05", title: "도시 연결과 서비스 분리를 위한 동선 재배치" },
                { n: "06", title: "안뜰 스케일 조절을 위한 브릿지 배치" },
                { n: "07", title: "주거 밀도 보완을 위한 수직 증축" },
              ].map(({ n, title }) => (
                <li key={n} className="flex gap-3 text-xs leading-relaxed text-ink-soft md:text-sm">
                  <span className="font-mono text-[10px] tracking-[0.22em] text-accent md:text-[11px]">
                    {n}
                  </span>
                  <span>{title}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* 우측: MP4 자동재생 + 반복. viewport 진입 시 .play() · 벗어나면 .pause() */}
          <div className="md:col-span-8">
            <div className="relative w-full overflow-hidden border border-line bg-paper-soft">
              <video
                src={`${import.meta.env.BASE_URL}media/mass-transform.mp4`}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="block h-auto w-full"
                aria-label="매스 변형 7-step 다이어그램"
              />
            </div>
            <p className="mt-2 font-mono text-[10px] tracking-[0.22em] text-mute">
              ↳ 좌측 7 step 을 영상이 순서대로 보여줍니다
            </p>
          </div>
        </div>
        {/* footnotes hidden until real sources arrive — keep array empty */}
        <Footnotes items={[]} />
      </Section>

      {/* 04 VOID ───────────────────────────────────── */}
      <Section
        id="unit-design"
        tag="SCENE 04 — UNIT DESIGN"
        title={
          <>
            <span className="text-accent">두께</span>를<br className="md:block" />
            생활로 바꾸기
          </>
        }
        subtitle="두꺼운 벽은 단순히 공간을 나누는 경계가 아니다. 그 안을 비워내면 사람과 사물이 머무는 작은 장소가 되고, 벽의 두께는 하나의 생활 단위가 된다."
      >
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-10">
          {/* 좌측 본문 — 두께 → 거리 조절 장치 */}
          <div className="md:col-span-4">
            <p className="text-sm leading-relaxed text-ink-soft md:text-base">
              사이집은 기존 구조체와 새로 삽입된 벽 사이의 간격을 버려진 틈으로
              두지 않는다. 그 사이에는 창가, 수납, 책상, 벤치, 알코브가 들어가며
              작은 유닛의 생활을 보완한다.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft md:mt-6 md:text-base">
              벽은 더 이상 안과 밖을 가르는 선이 아니라, 혼자 머무는 방과 함께
              쓰는 공간 사이의 <span className="text-accent">거리를 조절</span>하는
              장치가 된다.
            </p>
            {/* 4 step 인덱스 — 우측 4 isometric 과 매칭 */}
            <ol className="mt-8 grid grid-cols-1 gap-3 md:mt-10">
              {[
                { n: "01", title: "벽 — 단순한 경계" },
                { n: "02", title: "두께 안에 비움 — 알코브" },
                { n: "03", title: "사람이 머문다" },
                { n: "04", title: "생활 단위가 된다" },
              ].map(({ n, title }) => (
                <li
                  key={n}
                  className="flex gap-3 text-xs leading-relaxed text-ink-soft md:text-sm"
                >
                  <span className="font-mono text-[10px] tracking-[0.22em] text-accent md:text-[11px]">
                    {n}
                  </span>
                  <span>{title}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* 우측 4 isometric drawings — 가로 grid 4컬럼. 이미지는
              public/media/unit-design-steps.png (사용자가 잘라낸 4-step 가로
              strip 또는 4 개 분리 PNG). 아직 없을 때는 placeholder. */}
          <div className="md:col-span-8">
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
              {["01", "02", "03", "04"].map((n) => (
                <figure
                  key={n}
                  className="relative aspect-[3/4]"
                >
                  <img
                    src={`${import.meta.env.BASE_URL}media/unit-${n}.png`}
                    alt={`Unit design step ${n}`}
                    className="absolute inset-0 h-full w-full object-contain"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                  <figcaption className="pointer-events-none absolute left-0 top-0 font-mono text-[9px] tracking-[0.22em] text-mute md:text-[10px]">
                    {n}
                  </figcaption>
                </figure>
              ))}
            </div>
            <p className="mt-3 font-mono text-[10px] tracking-[0.22em] text-mute">
              ↳ 벽 두께 안의 비움 — 단순 경계 → 알코브 → 사람 → 생활 단위
            </p>
          </div>
        </div>
      </Section>

      {/* THANKS TO — credits ───────────────────────────────────── */}
      <section className="mx-auto max-w-[1440px] px-4 py-20 md:px-10 md:py-28">
        <header className="mb-10 text-center md:mb-14">
          <RevealOnView as="p" delay={0} duration={400} className="font-mono text-[10px] uppercase tracking-[0.3em] text-mute md:text-[11px]">
            ─ THANKS TO ─
          </RevealOnView>
          <RevealOnView delay={120} duration={500}>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-soft md:mt-5 md:text-[12px]">
              도와준 사람들
            </p>
          </RevealOnView>
        </header>
        <ul className="mx-auto flex max-w-md flex-col items-center gap-3 text-center md:gap-4">
          {[
            "선희",
            "주연",
            "이경",
            "호진",
            "주원",
            "혜성",
            "허씨자매들",
            "동규",
            "후림",
            "형준",
            "하윤",
            "세진",
            "신웅",
            "나영",
          ].map((name, i) => (
            <RevealOnView key={name} delay={240 + i * 80} duration={450}>
              <li className="text-lg font-light leading-tight text-ink md:text-xl">
                {name}
              </li>
            </RevealOnView>
          ))}
        </ul>
        {/* Bottom hairline as credit close */}
        <RevealOnView delay={240 + 14 * 80 + 200} duration={500} className="mt-12 flex justify-center md:mt-16">
          <span className="h-px w-12 bg-line" />
        </RevealOnView>
      </section>

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

