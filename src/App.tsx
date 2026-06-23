import { useEffect, useRef } from "react";
import {
  HashRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Nav } from "./components/Nav";
import { Story } from "./pages/Story";
import { Film } from "./pages/Film";
import { References } from "./pages/References";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash]);
  return null;
}

/**
 * Idle landing — 입력 없으면 STORY 첫 화면으로 복귀 (기본 5분).
 * 키오스크 / 전시 모드를 위한 attract loop. 입력 종류는 scroll, mousemove,
 * keydown, touchstart, click — 어떤 시그널이든 타이머 reset. 이미 / 의 최상단에
 * 있다면 no-op. */
function IdleReset({ idleMs = 5 * 60_000 }: { idleMs?: number }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const timerRef = useRef<number | null>(null);
  const pathRef = useRef(pathname);
  pathRef.current = pathname;

  useEffect(() => {
    const reset = () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => {
        // 이미 STORY 첫 화면 최상단이면 no-op
        if (pathRef.current === "/" && window.scrollY < 4) return;
        if (pathRef.current !== "/") {
          navigate("/");
          requestAnimationFrame(() =>
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
          );
        } else {
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }
      }, idleMs);
    };

    const events = ["scroll", "mousemove", "keydown", "touchstart", "click"] as const;
    events.forEach((ev) =>
      window.addEventListener(ev, reset, { passive: true })
    );
    reset(); // arm on mount

    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      events.forEach((ev) => window.removeEventListener(ev, reset));
    };
  }, [idleMs, navigate]);

  return null;
}

function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <IdleReset idleMs={5 * 60_000} />
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
