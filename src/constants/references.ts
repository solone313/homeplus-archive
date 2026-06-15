export type ReferenceCategory = "PAPER" | "DOC" | "GUIDELINE";

export type ReferenceEntry = {
  id: string;
  num: string;
  category: ReferenceCategory;
  title: string;
  authors?: string;
  year: number;
  source: string;
  /** Optional external URL or local PDF path (e.g. `${BASE_URL}refs/foo.pdf`). */
  url?: string;
  /** A short personal note tying this material to the saijip design. */
  note?: string;
};

/**
 * 참고문헌 — placeholder entries. Replace authors/year/url as PDFs are uploaded.
 */
export const REFERENCES: readonly ReferenceEntry[] = [
  {
    id: "saijip-comm",
    num: "01",
    category: "PAPER",
    title: "공동주택 내 커뮤니티시설의 변용조사를 통한 시설 사용성 연구",
    year: 2024,
    source: "KCI",
    note: "공유주방·세탁실·복도 등 1인 가구 사이의 느슨한 접점을 어떻게 설계 도구로 다룰지에 대한 출발점.",
  },
  {
    id: "hertzberger",
    num: "02",
    category: "PAPER",
    title: "Interview with Herman Hertzberger — Architecture as Visual and Social Connection",
    authors: "Architecture and Education",
    year: 2017,
    source: "KCI",
    note: "‘미완성의 건축’ — 거주자가 공간을 자기 것으로 만들 수 있는 여백. 사이집의 그리드와 변형 유닛에 직접 연결.",
  },
  {
    id: "kci-2835968",
    num: "03",
    category: "PAPER",
    title: "공동체 주거의 일상 연결 매개로서의 공유 공간 연구",
    year: 2023,
    source: "KCI",
    note: "‘함께 쓰는 공간이 어디까지 일상에 침투할 수 있는가’ — 다섯 슬래브 사이 비움의 프로그램 근거.",
  },
  {
    id: "elderly-area",
    num: "04",
    category: "PAPER",
    title: "노인주택 면적계획을 위한 요소로서 행위면적 산출 연구",
    year: 2022,
    source: "대한건축학회",
    note: "유닛 14sqm 의 적정 행위면적 분배 — ‘잠자는 면적’ 과 ‘살아가는 면적’ 의 구분.",
  },
  {
    id: "who-sedentary",
    num: "05",
    category: "GUIDELINE",
    title: "WHO Guidelines on Physical Activity and Sedentary Behaviour",
    year: 2020,
    source: "World Health Organization",
    note: "1인 가구의 좌식 행동을 줄이는 동선 설계 — 산책 동선·계단·안뜰의 배치 논거.",
  },
  {
    id: "junggong-plan",
    num: "06",
    category: "DOC",
    title: "준공업지역 발전계획",
    year: 2024,
    source: "서울시",
    note: "가양 옛 홈플러스 부지가 속한 준공업지역의 정비 방향 — 부지 선정과 프로그램 합의의 근거.",
  },
];
