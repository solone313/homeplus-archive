import { PageShell } from "../components/PageShell";
import { PDFViewer } from "../components/PDFViewer";
import { DRAWINGS_PDF } from "../constants/site";

export function Drawings() {
  return (
    <PageShell
      tag="02 / DRAWINGS"
      title="도면 아카이브"
      subtitle="평면 · 입면 · 단면 · 모형. 자료가 정리되면 카테고리별로 펼쳐집니다. 우선은 통합 PDF 한 권으로 둡니다."
    >
      <section className="mx-auto max-w-[1440px] px-4 pt-8 md:px-10 md:pt-12">
        <div className="-mx-4 mb-4 flex gap-2 overflow-x-auto px-4 pb-4 md:mx-0 md:px-0">
          {["전체 PDF", "평면도", "입면도", "단면도", "디테일"].map((t, i) => (
            <button
              key={t}
              disabled={i !== 0}
              className={`shrink-0 border px-3 py-1.5 font-mono text-[11px] tracking-[0.18em] transition-colors ${
                i === 0
                  ? "border-ink bg-ink text-paper"
                  : "border-line/70 bg-paper-soft text-mute"
              }`}
            >
              {t}
              {i !== 0 && (
                <span className="ml-2 text-[9px] opacity-60">SOON</span>
              )}
            </button>
          ))}
        </div>

        <PDFViewer src={DRAWINGS_PDF} filename="drawings.pdf" ratio="16/10" />
      </section>
    </PageShell>
  );
}
