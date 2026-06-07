import { NavLink, Link } from "react-router-dom";

const ROUTES = [
  { to: "/", label: "STORY" },
  { to: "/drawings", label: "DRAWINGS" },
  { to: "/film", label: "FILM" },
];

export function Nav() {
  return (
    <>
      {/* Top bar — both mobile and desktop */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-line/60 bg-paper/85 backdrop-blur supports-[backdrop-filter]:bg-paper/70">
        <div className="mx-auto flex h-12 max-w-[1440px] items-center justify-between px-4 md:h-14 md:px-8">
          <Link
            to="/"
            className="group flex items-center gap-1.5 font-extrabold tracking-[-0.03em] text-ink"
            aria-label="HOME+ 메인으로"
          >
            <span className="text-base md:text-lg">HOME</span>
            <span className="inline-grid h-4 w-4 place-items-center md:h-5 md:w-5">
              <span className="absolute h-4 w-[2px] bg-accent md:h-5" />
              <span className="absolute h-[2px] w-4 bg-accent md:w-5" />
            </span>
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
                    isActive ? "text-ink" : "text-mute hover:text-ink"
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
        className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-3 border-t border-line/60 bg-paper/95 backdrop-blur md:hidden"
        aria-label="주요 페이지"
      >
        {ROUTES.map((r) => (
          <NavLink
            key={r.to}
            to={r.to}
            end={r.to === "/"}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-0.5 py-2.5 font-mono text-[10px] tracking-[0.2em] transition-colors ${
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
