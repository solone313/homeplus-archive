import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

type Slide = {
  id: string;
  src: string;
  title?: string;
  caption?: string;
};

type Props = {
  slides: Slide[];
  ratio?: string;
};

export function SwipeGallery({ slides, ratio = "3/2" }: Props) {
  const [emblaRef, embla] = useEmblaCarousel({
    align: "start",
    loop: false,
    dragFree: false,
    skipSnaps: false,
    containScroll: "trimSnaps",
  });
  const [selected, setSelected] = useState(0);
  const [snapCount, setSnapCount] = useState(0);

  useEffect(() => {
    if (!embla) return;
    const onSelect = () => setSelected(embla.selectedScrollSnap());
    embla.on("select", onSelect);
    setSnapCount(embla.scrollSnapList().length);
    onSelect();
  }, [embla]);

  const scrollPrev = useCallback(() => embla?.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla?.scrollNext(), [embla]);
  const scrollTo = useCallback((i: number) => embla?.scrollTo(i), [embla]);

  return (
    <div className="relative w-full">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex gap-3 md:gap-6">
          {slides.map((s, i) => (
            <div
              key={s.id}
              className="min-w-0 shrink-0 grow-0 basis-[80%] md:basis-[44%] lg:basis-[32%]"
            >
              <div
                className="relative w-full overflow-hidden border border-line/60 bg-silver-100"
                style={{ aspectRatio: ratio }}
              >
                {s.src ? (
                  <img
                    src={s.src}
                    alt={s.title ?? `slide ${i + 1}`}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="absolute inset-0 grid place-items-center text-mute">
                    <span className="font-mono text-[10px] tracking-[0.3em]">
                      슬롯 {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                )}
                <div className="pointer-events-none absolute inset-x-0 top-0 flex items-baseline justify-between px-3 py-2 font-mono text-[10px] tracking-[0.2em] text-ink-soft">
                  <span>{s.title ?? `SCENE 0${i + 1}`}</span>
                  <span className="text-mute">
                    {(i + 1).toString().padStart(2, "0")} / {slides.length.toString().padStart(2, "0")}
                  </span>
                </div>
              </div>
              {s.caption && (
                <p className="mt-2 text-xs leading-relaxed text-ink-soft md:text-sm">
                  {s.caption}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-1.5">
          {Array.from({ length: snapCount }).map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              aria-label={`slide ${i + 1}`}
              className={`h-1 transition-all ${
                i === selected ? "w-8 bg-accent" : "w-4 bg-line hover:bg-mute"
              }`}
            />
          ))}
          <span className="ml-3 font-mono text-[10px] tracking-[0.2em] text-mute">
            {(selected + 1).toString().padStart(2, "0")} / {snapCount.toString().padStart(2, "0")}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={scrollPrev}
            disabled={selected === 0}
            className="grid h-9 w-9 place-items-center border border-line/70 bg-paper-soft font-mono text-sm transition-colors hover:border-ink hover:bg-ink hover:text-paper disabled:opacity-30 disabled:hover:bg-paper-soft disabled:hover:text-ink"
            aria-label="이전"
          >
            ←
          </button>
          <button
            onClick={scrollNext}
            disabled={selected >= snapCount - 1}
            className="grid h-9 w-9 place-items-center border border-line/70 bg-paper-soft font-mono text-sm transition-colors hover:border-ink hover:bg-ink hover:text-paper disabled:opacity-30 disabled:hover:bg-paper-soft disabled:hover:text-ink"
            aria-label="다음"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
