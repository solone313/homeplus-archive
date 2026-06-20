import { REFERENCES, type ReferenceEntry } from "../constants/references";
import { RevealOnView } from "../components/RevealOnView";
import { SaiLogo } from "../components/SaiLogo";

/**
 * 사이집 참고문헌 — annotated bibliography with per-entry notes.
 */
export function References() {
  return (
    <main className="mx-auto max-w-[1280px] px-4 pt-28 pb-24 md:px-10 md:pt-32 md:pb-32">
      <header>
        <RevealOnView as="span" delay={0} duration={400} className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-mute">
          <SaiLogo className="h-[10px] w-auto" />
          SCENE — REFERENCES
        </RevealOnView>
        <RevealOnView delay={80} duration={500}>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
            참고문헌
          </h1>
        </RevealOnView>
        <RevealOnView delay={160} duration={450}>
          <p className="mt-3 max-w-2xl text-base text-ink-soft md:text-lg">
            사이집 설계의 학술 근거와 자료. 각 항목 아래의 짧은 노트는 이 텍스트가
            설계의 어느 지점에 영향을 주었는지를 기록합니다.
          </p>
        </RevealOnView>
      </header>

      <section className="mt-16 md:mt-20">
        {REFERENCES.map((ref, idx) => (
          <RevealOnView key={ref.id} duration={500}>
            <ReferenceItem
              entry={ref}
              isLast={idx === REFERENCES.length - 1}
            />
          </RevealOnView>
        ))}
      </section>
    </main>
  );
}

type ReferenceItemProps = {
  entry: ReferenceEntry;
  isLast: boolean;
};

function ReferenceItem({ entry, isLast }: ReferenceItemProps) {
  return (
    <article className="mt-12 first:mt-0 md:mt-16">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center border border-line bg-white px-2 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-ink">
          REF · {entry.num}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-mute">
          {entry.category}
        </span>
      </div>

      <h2 className="mt-3 text-xl font-medium leading-snug text-ink md:text-2xl">
        {entry.title}
      </h2>

      <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] uppercase tracking-[0.18em] text-mute">
        {entry.authors && <span>AUTHORS · {entry.authors}</span>}
        {entry.authors && <span className="text-mute/60">·</span>}
        <span>{entry.year}</span>
        <span className="text-mute/60">·</span>
        <span>{entry.source}</span>
        {entry.url && (
          <a
            href={entry.url}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 inline-flex items-center gap-1 border border-line px-2 py-0.5 text-[10px] tracking-[0.2em] text-accent transition-colors hover:border-ink/40"
          >
            LINK <span aria-hidden>↗</span>
          </a>
        )}
      </div>

      {entry.note && (
        <div className="mt-5">
          <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-mute">
            사이집과의 연결
          </div>
          <blockquote className="border-l-2 border-accent py-1 pl-4 text-sm leading-relaxed text-ink/85 md:text-base">
            {entry.note}
          </blockquote>
        </div>
      )}

      {!isLast && <div className="mt-12 border-t border-line/40 md:mt-16" />}
    </article>
  );
}

export default References;
