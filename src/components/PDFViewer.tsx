type Props = {
  src?: string;
  /** filename for download button */
  filename?: string;
  ratio?: string;
};

/**
 * Lightweight PDF viewer using browser's native PDF support via <iframe>.
 * Mobile Safari sometimes can't render inline PDFs — we fall back to an
 * "open in new tab" button there.
 */
export function PDFViewer({ src, filename = "drawings.pdf", ratio = "16/10" }: Props) {
  if (!src) {
    return (
      <div
        className="relative w-full overflow-hidden border border-line/60 bg-silver-100"
        style={{ aspectRatio: ratio }}
      >
        <div className="absolute inset-0 grid place-items-center text-mute">
          <div className="text-center">
            <p className="font-mono text-[11px] tracking-[0.3em]">
              PDF PLACEHOLDER
            </p>
            <p className="mt-2 text-xs">
              합본 PDF 파일을{" "}
              <code className="rounded bg-silver-200 px-1.5 py-0.5">
                /public/media/{filename}
              </code>{" "}
              에 두고
              <br />
              <code className="rounded bg-silver-200 px-1.5 py-0.5">src</code> 속성으로 경로 전달
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <div
        className="relative w-full overflow-hidden border border-line/60 bg-silver-100"
        style={{ aspectRatio: ratio }}
      >
        <iframe
          src={`${src}#view=FitH`}
          title="도면 PDF"
          className="absolute inset-0 h-full w-full"
        />
      </div>
      <div className="mt-3 flex items-center justify-between gap-3">
        <p className="font-mono text-[10px] tracking-[0.2em] text-mute">
          FILE · {filename}
        </p>
        <div className="flex gap-2">
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-line/70 bg-paper-soft px-3 py-2 font-mono text-[11px] tracking-[0.2em] transition-colors hover:border-ink hover:bg-ink hover:text-paper"
          >
            <span>↗ 새 탭에서 열기</span>
          </a>
          <a
            href={src}
            download={filename}
            className="inline-flex items-center gap-2 border-2 border-ink bg-ink px-3 py-2 font-mono text-[11px] tracking-[0.2em] text-paper transition-colors hover:bg-accent hover:border-accent"
          >
            <span>↓ 다운로드</span>
          </a>
        </div>
      </div>
    </div>
  );
}
