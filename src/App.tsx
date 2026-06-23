import { useEffect, useRef, useState } from "react";
import {
  HashRouter,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { Nav } from "./components/Nav";
import { Story } from "./pages/Story";
import { Film } from "./pages/Film";
import { References } from "./pages/References";

// INTRO FILM YouTube — attract loop 용 fullscreen 임베드 URL.
// loop=1 + playlist=ID 조합이 YouTube 의 표준 무한반복 워크어라운드.
const ATTRACT_VIDEO_ID = "qckC2rvW8Kc";
const ATTRACT_VIDEO_URL =
  `https://www.youtube.com/embed/${ATTRACT_VIDEO_ID}` +
  `?autoplay=1&mute=1&loop=1&playlist=${ATTRACT_VIDEO_ID}` +
  `&controls=0&modestbranding=1&rel=0&showinfo=0&playsinline=1&iv_load_policy=3`;

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash]);
  return null;
}

/**
 * Idle attract — 입력 없으면 INTRO FILM 영상을 풀스크린 overlay 로 띄워
 * 무한 반복. 어떤 입력이든 overlay dismiss + 타이머 reset. 키오스크 /
 * 전시 모드용.
 *
 * 동작:
 *  - 입력 종류: scroll, mousemove, keydown, touchstart, click
 *  - 5분(기본) idle → overlay show (스크롤 위치는 손대지 않음 — sticky/
 *    framer-motion 같은 페이지 내부 scroll 로직과 충돌 회피)
 *  - overlay 가 뜬 상태에서 입력 들어오면 overlay hide + 타이머 재무장.
 *    dismiss 후 사용자가 보던 위치 그대로 유지.
 */
function IdleAttract({ idleMs = 5 * 60_000 }: { idleMs?: number }) {
  const timerRef = useRef<number | null>(null);
  const [overlayOn, setOverlayOn] = useState(false);
  const overlayRef = useRef(overlayOn);
  overlayRef.current = overlayOn;

  useEffect(() => {
    const fire = () => {
      setOverlayOn(true);
    };

    const arm = () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(fire, idleMs);
    };

    const onInput = () => {
      // overlay 떠 있는 상태에서 입력 → dismiss
      if (overlayRef.current) setOverlayOn(false);
      arm();
    };

    const events = ["scroll", "mousemove", "keydown", "touchstart", "click"] as const;
    events.forEach((ev) =>
      window.addEventListener(ev, onInput, { passive: true })
    );
    arm(); // arm on mount

    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      events.forEach((ev) => window.removeEventListener(ev, onInput));
    };
  }, [idleMs]);

  if (!overlayOn) return null;
  // 풀스크린 attract overlay. iframe key 로 overlay 재진입 시 깨끗하게 remount.
  return (
    <div
      className="fixed inset-0 z-[100] bg-paper"
      role="dialog"
      aria-label="attract — INTRO FILM 무한재생"
    >
      <iframe
        key={`attract-${overlayOn}`}
        src={ATTRACT_VIDEO_URL}
        title="사이집가양 INTRO FILM (idle attract loop)"
        className="absolute inset-0 h-full w-full"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
        frameBorder={0}
      />
      <p className="pointer-events-none absolute inset-x-0 bottom-6 text-center font-mono text-[11px] uppercase tracking-[0.3em] text-ink-soft/60">
        ↳ 클릭 또는 키 입력으로 돌아가기
      </p>
    </div>
  );
}

function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <IdleAttract idleMs={30_000} />
      <Nav />
      <Routes>
        <Route path="/" element={<Story />} />
        <Route path="/film" element={<Film />} />
        <Route path="/references" element={<References />} />
        <Route
          path="*"
          element={
            <main className="grid min-h-screen-d place-items-center px-4 py-24 text-center">
              <div>
                <p className="rule-dim justify-center">404</p>
                <h1 className="mt-2 text-4xl font-extrabold tracking-tight">
                  찾을 수 없는 페이지
                </h1>
              </div>
            </main>
          }
        />
      </Routes>
    </HashRouter>
  );
}

export default App;
