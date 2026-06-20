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
export const HERO_IMAGE = `${import.meta.env.BASE_URL}hero-main-v2.png`;

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

// STREETVIEW TIMELINE — 가양 홈플러스 15년의 퇴색
// 사진은 /public/streetview/{01..10}.jpg 캡처 시간순. 연도 매핑은 추정.
export type StreetviewFrame = {
  year: number;
  src: string;
  /** 한 줄 컨텍스트 — 헤더에서 연도 옆에 표시 */
  context: string;
};

const sv = (n: number) =>
  `${import.meta.env.BASE_URL}streetview/${String(n).padStart(2, "0")}.jpg`;

export const STREETVIEW_FRAMES: StreetviewFrame[] = [
  { year: 2010, src: sv(1), context: "개장 직후" },
  { year: 2012, src: sv(2), context: "자리 잡힘" },
  { year: 2014, src: sv(3), context: "동네의 부엌" },
  { year: 2016, src: sv(4), context: "정점" },
  { year: 2018, src: sv(5), context: "여전한 일상" },
  { year: 2020, src: sv(6), context: "변화의 그늘" },
  { year: 2022, src: sv(7), context: "발길이 줄어" },
  { year: 2024, src: sv(8), context: "마지막 손님" },
  { year: 2025, src: sv(9), context: "폐점 직전" },
  { year: 2025, src: sv(10), context: "간판이 사라진 뒤" },
];
