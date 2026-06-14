/**
 * Central place for site-wide values. Update when assets arrive.
 */

// Naver Cloud Platform — Web Dynamic Map Client ID.
// Web Dynamic Map은 브라우저 노출 전제 (실제 보안은 NCP 콘솔의 Web 서비스 URL 화이트리스트).
// Secret 키(X-NCP-APIGW-API-KEY)는 절대 여기 두지 말 것 — 그건 서버 API 용도.
export const NAVER_CLIENT_ID: string = "5x00r3vn3h";

// 홈플러스 가양점 · 양천로 431 (네이버 플레이스 626133525)
export const SITE_COORDS = { lat: 37.564264, lng: 126.84996 } as const;
export const SITE_ADDRESS = "서울 강서구 양천로 431";
export const SITE_PLACE_ID = "626133525";

// Media URLs — drop assets in /public/media/ and put the path here.
export const STORY_INTRO_VIDEO = ""; // e.g. "/media/story-intro.mp4"
export const STORY_INTRO_POSTER = ""; // e.g. "/media/story-intro-poster.jpg"
export const FILM_VIDEO = ""; // e.g. "/media/film.mp4"
export const FILM_POSTER = ""; // e.g. "/media/film-poster.jpg"
export const DRAWINGS_PDF = ""; // e.g. "/media/drawings.pdf"
export const HERO_IMAGE = "/hero-main.png";

// LIFE BEYOND THE ROOM — 4 location renders (fill once assets arrive)
export const LIFE_SCENES: { id: string; src: string; title: string; caption: string }[] = [
  { id: "1", src: "", title: "위치 01", caption: "캡션 — 자료 도착 시 교체" },
  { id: "2", src: "", title: "위치 02", caption: "캡션 — 자료 도착 시 교체" },
  { id: "3", src: "", title: "위치 03", caption: "캡션 — 자료 도착 시 교체" },
  { id: "4", src: "", title: "위치 04", caption: "캡션 — 자료 도착 시 교체" },
];

// SITE — 철거 / 보존 / 신설 3-layer (PNG×3 with transparent bg or SVG)
export const SITE_LAYERS: { id: "demolish" | "preserve" | "new"; label: string; src: string }[] = [
  { id: "demolish", label: "철거", src: "" },
  { id: "preserve", label: "보존", src: "" },
  { id: "new", label: "신설", src: "" },
];

// UNIT
export const UNIT_ELEVATION = "";
export const UNIT_SECTION = "";
export const UNIT_INTERIOR = "";
