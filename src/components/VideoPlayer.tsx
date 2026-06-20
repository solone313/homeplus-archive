import { useEffect, useRef, useState } from "react";

type Props = {
  src?: string;
  poster?: string;
  /** autoplay muted by default; click to unmute */
  autoplay?: boolean;
  loop?: boolean;
  /** aspect ratio CSS string */
  ratio?: string;
  caption?: string;
};

/** Extracts the 11-char video id from any common YouTube URL form, or null. */
function parseYouTubeId(url: string): string | null {
  const m = url.match(
    /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|v\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  );
  return m ? m[1] : null;
}

/** Extracts a Vimeo numeric id from any common Vimeo URL form, or null. */
function parseVimeoId(url: string): string | null {
  const m = url.match(/vimeo\.com\/(?:video\/)?(\d{6,})/);
  return m ? m[1] : null;
}

export function VideoPlayer({
  src,
  poster,
  autoplay = true,
  loop = true,
  ratio = "16/9",
  caption,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(autoplay);
  const [visible, setVisible] = useState(false);

  // External video host detection — early branch (separate render)
  const ytId = src ? parseYouTubeId(src) : null;
  const vimeoId = src && !ytId ? parseVimeoId(src) : null;

  // Pause / play when off / on screen
  useEffect(() => {
    const el = videoRef.current;
    if (!el || !src) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          setVisible(e.isIntersecting);
          if (e.isIntersecting && autoplay && el.paused) {
            el.play().catch(() => {});
          } else if (!e.isIntersecting && !el.paused) {
            el.pause();
          }
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [src, autoplay]);

  const toggleMute = () => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
  };
  const togglePlay = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      el.play();
      setPlaying(true);
    } else {
      el.pause();
      setPlaying(false);
    }
  };

  // YouTube / Vimeo iframe path — 해당 호스트 player 의 native 컨트롤 사용.
  // autoplay 는 muted 일 때만 정책상 허용되므로 mute=1 강제.
  if (ytId) {
    const params = new URLSearchParams({
      autoplay: autoplay ? "1" : "0",
      mute: "1",
      loop: loop ? "1" : "0",
      ...(loop ? { playlist: ytId } : {}), // YouTube loop 은 playlist param 필요
      modestbranding: "1",
      rel: "0",
      playsinline: "1",
    });
    return (
      <div
        className="relative w-full overflow-hidden border border-line/60 bg-ink"
        style={{ aspectRatio: ratio }}
      >
        <iframe
          src={`https://www.youtube.com/embed/${ytId}?${params.toString()}`}
          title={caption ?? "intro film"}
          className="absolute inset-0 h-full w-full"
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
          allowFullScreen
          loading="lazy"
        />
        {caption && (
          <p className="pointer-events-none absolute bottom-3 left-3 right-3 font-mono text-[10px] tracking-[0.2em] text-paper/80">
            {caption}
          </p>
        )}
      </div>
    );
  }

  if (vimeoId) {
    const params = new URLSearchParams({
      autoplay: autoplay ? "1" : "0",
      muted: "1",
      loop: loop ? "1" : "0",
      title: "0",
      byline: "0",
      portrait: "0",
    });
    return (
      <div
        className="relative w-full overflow-hidden border border-line/60 bg-ink"
        style={{ aspectRatio: ratio }}
      >
        <iframe
          src={`https://player.vimeo.com/video/${vimeoId}?${params.toString()}`}
          title={caption ?? "intro film"}
          className="absolute inset-0 h-full w-full"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
        {caption && (
          <p className="pointer-events-none absolute bottom-3 left-3 right-3 font-mono text-[10px] tracking-[0.2em] text-paper/80">
            {caption}
          </p>
        )}
      </div>
    );
  }

  if (!src) {
    return (
      <div
        className="relative w-full overflow-hidden border border-line/60 bg-silver-100"
        style={{ aspectRatio: ratio }}
      >
        <div className="absolute inset-0 grid place-items-center text-mute">
          <div className="text-center">
            <p className="font-mono text-[11px] tracking-[0.3em]">
              VIDEO PLACEHOLDER
            </p>
            <p className="mt-2 text-xs">
              파일을 <code className="rounded bg-silver-200 px-1.5 py-0.5">/public/media/</code> 에 두고
              <br />
              <code className="rounded bg-silver-200 px-1.5 py-0.5">src</code> 속성으로 경로 전달
            </p>
          </div>
        </div>
        {caption && (
          <p className="absolute bottom-3 left-3 right-3 font-mono text-[10px] tracking-[0.2em] text-mute">
            {caption}
          </p>
        )}
      </div>
    );
  }

  return (
    <div
      className="relative w-full overflow-hidden border border-line/60 bg-ink"
      style={{ aspectRatio: ratio }}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted={muted}
        loop={loop}
        playsInline
        autoPlay={autoplay}
        className="h-full w-full object-cover"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onClick={togglePlay}
      />

      {/* Controls overlay */}
      <div className="pointer-events-none absolute inset-0 flex items-end justify-between p-3 md:p-4">
        <button
          onClick={togglePlay}
          className="pointer-events-auto inline-flex h-9 items-center gap-2 border border-paper/70 bg-paper/15 px-3 font-mono text-[10px] tracking-[0.25em] text-paper backdrop-blur transition-colors hover:bg-paper hover:text-ink md:h-10 md:text-[11px]"
        >
          <span>{playing ? "▮▮" : "▶"}</span>
          <span>{playing ? "PAUSE" : "PLAY"}</span>
        </button>
        <button
          onClick={toggleMute}
          className="pointer-events-auto inline-flex h-9 items-center gap-2 border border-paper/70 bg-paper/15 px-3 font-mono text-[10px] tracking-[0.25em] text-paper backdrop-blur transition-colors hover:bg-paper hover:text-ink md:h-10 md:text-[11px]"
        >
          <span>{muted ? "🔇" : "🔊"}</span>
          <span>{muted ? "SOUND ON" : "MUTE"}</span>
        </button>
      </div>

      {/* visibility hint */}
      {!visible && autoplay && (
        <span className="pointer-events-none absolute right-3 top-3 font-mono text-[10px] tracking-[0.2em] text-paper/80">
          ⏸ AUTO-PAUSED
        </span>
      )}

      {caption && (
        <p className="absolute bottom-16 left-3 right-3 font-mono text-[10px] tracking-[0.2em] text-paper/80 md:bottom-20">
          {caption}
        </p>
      )}
    </div>
  );
}
