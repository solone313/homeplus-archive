import { PageShell } from "../components/PageShell";
import { VideoPlayer } from "../components/VideoPlayer";
import { FILM_VIDEO, FILM_POSTER } from "../constants/site";

export function Film() {
  return (
    <PageShell
      tag="03 / FILM"
      title="필름"
      subtitle="짧은 영상과 캡션. STORY 인트로 영상과는 다른, 별도의 작품 필름입니다."
    >
      <section className="mx-auto max-w-[1440px] px-4 pt-8 md:px-10 md:pt-12">
        <VideoPlayer
          src={FILM_VIDEO}
          poster={FILM_POSTER}
          ratio="16/9"
          autoplay={false}
        />

        <div className="mt-8 grid grid-cols-1 gap-6 md:mt-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="rule-dim mb-3">CAPTION</p>
            <div className="space-y-4 text-base leading-relaxed text-ink md:text-lg">
              <p className="text-mute">캡션 텍스트 슬롯 — 6/10 도착 예정</p>
              <p className="text-mute">
                도착 시 이 영역에 챕터 자막 또는 단락 텍스트로 채워집니다.
              </p>
            </div>
          </div>
          <div className="md:col-span-5">
            <p className="rule-dim mb-3">META</p>
            <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 font-mono text-[11px] tracking-[0.15em]">
              <dt className="text-mute">DURATION</dt>
              <dd>TBD</dd>
              <dt className="text-mute">FORMAT</dt>
              <dd>MP4 · 16:9</dd>
              <dt className="text-mute">CREDIT</dt>
              <dd>KIM JISU</dd>
              <dt className="text-mute">YEAR</dt>
              <dd>2026</dd>
            </dl>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
