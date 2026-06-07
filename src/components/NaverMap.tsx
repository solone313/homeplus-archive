import { useEffect, useRef, useState } from "react";
import {
  NAVER_CLIENT_ID,
  SITE_COORDS,
  SITE_ADDRESS,
  SITE_PLACE_ID,
} from "../constants/site";

type Props = {
  ratio?: string;
  zoom?: number;
};

declare global {
  interface Window {
    naver?: {
      maps: {
        Map: new (
          el: HTMLElement | string,
          opts: Record<string, unknown>,
        ) => unknown;
        LatLng: new (lat: number, lng: number) => unknown;
        Marker: new (opts: Record<string, unknown>) => unknown;
        Size: new (w: number, h: number) => unknown;
        MapTypeId?: {
          NORMAL: string;
          TERRAIN: string;
          SATELLITE: string;
          HYBRID: string;
        };
        Event?: {
          addListener: (target: unknown, event: string, fn: (...args: unknown[]) => void) => unknown;
          trigger: (target: unknown, event: string) => void;
        };
        Position?: { TOP_RIGHT?: number };
      };
    };
    __NAVER_MAP_LOADER__?: Promise<void>;
    navermap_authFailure?: () => void;
  }
}

type NaverMapInstance = {
  setMapTypeId: (id: string) => void;
};

function loadScript(clientId: string): Promise<void> {
  if (typeof window === "undefined") return Promise.reject();
  if (window.naver?.maps) return Promise.resolve();
  if (window.__NAVER_MAP_LOADER__) return window.__NAVER_MAP_LOADER__;
  window.__NAVER_MAP_LOADER__ = new Promise((resolve, reject) => {
    const s = document.createElement("script");
    // VPC 환경에서 발급된 Client ID 는 `ncpKeyId` 파라미터를 사용한다.
    // (Classic 환경은 `ncpClientId`)
    s.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${clientId}`;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("naver maps script failed"));
    document.head.appendChild(s);
  });
  return window.__NAVER_MAP_LOADER__;
}

export function NaverMap({ ratio = "16/9", zoom = 16 }: Props) {
  const mapEl = useRef<HTMLDivElement>(null);
  const mapRef = useRef<NaverMapInstance | null>(null);
  const [state, setState] = useState<
    "idle" | "loading" | "ready" | "error" | "no-key" | "auth-failed"
  >("idle");
  const [mapType, setMapType] = useState<"normal" | "hybrid">("normal");

  useEffect(() => {
    if (!NAVER_CLIENT_ID) {
      setState("no-key");
      return;
    }
    // Naver Maps v3 calls this global when auth/whitelist check fails.
    window.navermap_authFailure = () => setState("auth-failed");

    setState("loading");
    loadScript(NAVER_CLIENT_ID)
      .then(() => {
        const el = mapEl.current;
        if (!el || !window.naver?.maps) return;
        const w = el.clientWidth;
        const h = el.clientHeight;
        const center = new window.naver.maps.LatLng(
          SITE_COORDS.lat,
          SITE_COORDS.lng,
        );
        const map = new window.naver.maps.Map(el, {
          center,
          zoom,
          minZoom: 13,
          maxZoom: 19,
          scaleControl: false,
          logoControl: true,
          // 페이지 스크롤이 지도 줌으로 가로채이지 않도록.
          scrollWheel: false,
          disableDoubleClickZoom: true,
          disableTwoFingerTapZoom: true,
          // explicit size avoids tile-position drift when aspectRatio hasn't computed yet
          size: w && h ? new window.naver.maps.Size(w, h) : undefined,
        });
        mapRef.current = map as NaverMapInstance;
        const marker = new window.naver.maps.Marker({
          position: center,
          map,
          title: "HOME+",
        }) as { setPosition: (p: unknown) => void };

        // DEV: click anywhere on the map to relocate the marker and log coords.
        // Copy the printed value into SITE_COORDS in src/constants/site.ts.
        if (import.meta.env.DEV && window.naver.maps.Event) {
          window.naver.maps.Event.addListener(map, "click", (e: unknown) => {
            const ev = e as { coord: { _lat: number; _lng: number } };
            const lat = ev.coord._lat;
            const lng = ev.coord._lng;
            marker.setPosition(ev.coord);
            // eslint-disable-next-line no-console
            console.log(
              `%c[NaverMap] SITE_COORDS = { lat: ${lat.toFixed(6)}, lng: ${lng.toFixed(6)} }`,
              "color:#ec4899;font-weight:bold",
            );
          });
        }
        // re-trigger size resolve after layout settles (handles aspectRatio race)
        const settle = () => {
          if (!mapEl.current || !window.naver?.maps?.Event) return;
          window.naver.maps.Event.trigger(map, "resize");
        };
        requestAnimationFrame(() => requestAnimationFrame(settle));
        setTimeout(settle, 500);
        // give the auth check a moment; if no auth_failed fires, mark ready
        setTimeout(() => {
          setState((s) => (s === "auth-failed" ? s : "ready"));
        }, 800);
      })
      .catch(() => setState("error"));
  }, [zoom]);

  // Switch map type id when user toggles the segmented control.
  useEffect(() => {
    if (state !== "ready" || !mapRef.current || !window.naver?.maps?.MapTypeId) {
      return;
    }
    const ids = window.naver.maps.MapTypeId;
    mapRef.current.setMapTypeId(mapType === "hybrid" ? ids.HYBRID : ids.NORMAL);
  }, [mapType, state]);

  return (
    <div
      className="naver-map relative w-full overflow-hidden border border-line/60 bg-silver-100"
      style={{ aspectRatio: ratio }}
    >
      <div ref={mapEl} className="absolute inset-0" />

      {/* Status overlays */}
      {state !== "ready" && (
        <div className="absolute inset-0 grid place-items-center bg-silver-100 px-6 text-center text-mute">
          <div>
            <p className="font-mono text-[11px] tracking-[0.3em] text-ink">
              {state === "no-key" && "NAVER MAPS · CLIENT ID 대기 중"}
              {state === "loading" && "지도 로딩 중…"}
              {state === "error" && "지도 로드 실패"}
              {state === "auth-failed" && "AUTH FAILED · URL 미등록"}
              {state === "idle" && "NAVER MAPS"}
            </p>
            <p className="mt-2 text-xs">
              {SITE_ADDRESS} · place {SITE_PLACE_ID}
            </p>
            {state === "auth-failed" && (
              <div className="mx-auto mt-3 max-w-md space-y-2 text-left text-[10px] leading-relaxed">
                <p className="text-mute">
                  Naver 응답:{" "}
                  <span className="font-mono text-ink">
                    Authentication Failed — Invalid authentication information
                  </span>
                </p>
                <p className="text-mute">
                  현재 origin{" "}
                  <code className="rounded bg-silver-200 px-1.5 py-0.5 font-mono text-ink">
                    {typeof window !== "undefined" ? window.location.origin : "?"}
                  </code>{" "}
                  이 Naver Cloud 콘솔 Application → Maps → <b>Web 서비스 URL</b> 에 등록되어
                  있어야 합니다.
                </p>
              </div>
            )}
            {state === "error" && (
              <p className="mx-auto mt-3 max-w-md text-[10px] leading-relaxed">
                네이버 클라우드 콘솔 → Application → Maps → <b>Web 서비스 URL</b> 에<br />
                <code className="rounded bg-silver-200 px-1.5 py-0.5">{typeof window !== "undefined" ? window.location.origin : "http://localhost:5173"}</code>{" "}
                를 추가하면 타일이 표시됩니다.
              </p>
            )}
            {state === "no-key" && (
              <p className="mt-2 text-[10px] leading-relaxed">
                Client ID 받으면{" "}
                <code className="rounded bg-silver-200 px-1.5 py-0.5">
                  src/constants/site.ts
                </code>
                <br />
                또는 <code className="rounded bg-silver-200 px-1.5 py-0.5">.env</code> 의{" "}
                <code className="rounded bg-silver-200 px-1.5 py-0.5">VITE_NAVER_CLIENT_ID</code>{" "}
                에 채우세요
              </p>
            )}
            <a
              href={`https://map.naver.com/p/entry/place/${SITE_PLACE_ID}`}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-4 inline-flex items-center gap-2 border border-ink bg-ink px-3 py-2 font-mono text-[10px] tracking-[0.25em] text-paper hover:bg-accent hover:border-accent"
            >
              <span>네이버 지도로 보기</span>
              <span aria-hidden>↗</span>
            </a>
          </div>
        </div>
      )}

      {/* Address chip — always visible */}
      <div className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-2 border border-ink/30 bg-paper/85 px-2 py-1 font-mono text-[10px] tracking-[0.2em] text-ink backdrop-blur">
        <span className="block h-1 w-1 rounded-full bg-accent" />
        {SITE_ADDRESS}
      </div>

      {/* Top-right controls: map type toggle + external link */}
      <div className="absolute right-3 top-3 flex flex-col items-end gap-2">
        {/* 일반/항공 토글 */}
        <div
          role="group"
          aria-label="지도 종류"
          className="inline-flex overflow-hidden border border-ink/30 bg-paper/85 font-mono text-[10px] tracking-[0.2em] backdrop-blur"
        >
          {(
            [
              { id: "normal", label: "지도" },
              { id: "hybrid", label: "항공" },
            ] as const
          ).map((opt) => {
            const active = mapType === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setMapType(opt.id)}
                aria-pressed={active}
                className={`px-2.5 py-1.5 transition-colors ${
                  active
                    ? "bg-ink text-paper"
                    : "text-ink hover:bg-ink/10"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        {/* External link to Naver Maps */}
        <a
          href={`https://map.naver.com/p/entry/place/${SITE_PLACE_ID}`}
          target="_blank"
          rel="noreferrer noopener"
          className="group inline-flex items-center gap-2 border border-ink/30 bg-paper/85 px-2.5 py-1.5 font-mono text-[10px] tracking-[0.2em] text-ink backdrop-blur transition-colors hover:border-accent hover:bg-ink hover:text-accent"
          aria-label="네이버 지도에서 새 창으로 보기"
        >
          <span>네이버 지도로 보기</span>
          <span aria-hidden className="transition-transform group-hover:translate-x-0.5">↗</span>
        </a>
      </div>
    </div>
  );
}
