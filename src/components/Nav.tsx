import { NavLink, Link, useLocation } from "react-router-dom";

const ROUTES = [
  { to: "/", label: "STORY" },
  { to: "/drawings", label: "DRAWINGS" },
  { to: "/film", label: "FILM" },
  { to: "/references", label: "REFERENCES" },
];

export function Nav() {
  const { pathname } = useLocation();
  // 같은 경로(STORY 첫 화면)에서 로고를 누르면 React Router 가 navigation 을 무시 →
  // 명시적으로 scroll-to-top 호출. 다른 페이지에서는 Link 가 / 로 이동하고
  // ScrollToTop 이 처리.
  const handleLogoClick = () => {
    if (pathname === "/") {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  };
  return (
    <>
      {/* Top bar — both mobile and desktop */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-line/60 bg-paper/85 backdrop-blur supports-[backdrop-filter]:bg-paper/70">
        <div className="mx-auto flex h-12 max-w-[1440px] items-center justify-between px-4 md:h-14 md:px-8">
          <Link
            to="/"
            onClick={handleLogoClick}
            className="group flex items-center text-ink"
            aria-label="사이집 메인으로"
          >
            <img
              src={`${import.meta.env.BASE_URL}saijip-wordmark-light.png`}
              alt="사이집"
              className="block h-5 w-auto md:h-6"
            />
          </Link>

          {/* Desktop links */}
          <nav className="hidden items-center gap-1 md:flex">
            {ROUTES.map((r) => (
              <NavLink
                key={r.to}
                to={r.to}
                end={r.to === "/"}
                className={({ isActive }) =>
                  `relative px-3 py-1.5 font-mono text-[11px] tracking-[0.25em] transition-colors ${
                    isActive ? "font-semibold text-ink" : "text-mute hover:text-ink"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {r.label}
                    <span
                      className={`absolute inset-x-3 -bottom-0.5 h-px transition-colors ${
                        isActive ? "bg-accent" : "bg-transparent"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <span className="hidden font-mono text-[10px] tracking-[0.25em] text-mute md:inline">
            졸업설계 2026 · 김지수
          </span>
        </div>
      </header>

      {/* Bottom tab bar — mobile only */}
      <nav
        className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-4 border-t border-line/60 bg-paper/95 backdrop-blur md:hidden"
        aria-label="주요 페이지"
      >
        {ROUTES.map((r) => (
          <NavLink
            key={r.to}
            to={r.to}
            end={r.to === "/"}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 py-3 font-mono text-[11px] tracking-[0.2em] transition-colors ${
                isActive ? "text-accent" : "text-mute"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={`h-1 w-1 rounded-full transition-colors ${
                    isActive ? "bg-accent" : "bg-mute/40"
                  }`}
                />
                <span>{r.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </>
  );
}
