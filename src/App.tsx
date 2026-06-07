import { useEffect } from "react";
import {
  HashRouter,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { useLenis } from "./hooks/useLenis";
import { Nav } from "./components/Nav";
import { Story } from "./pages/Story";
import { Drawings } from "./pages/Drawings";
import { Film } from "./pages/Film";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash]);
  return null;
}

function App() {
  useLenis();

  return (
    <HashRouter>
      <ScrollToTop />
      <Nav />
      <Routes>
        <Route path="/" element={<Story />} />
        <Route path="/drawings" element={<Drawings />} />
        <Route path="/film" element={<Film />} />
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
