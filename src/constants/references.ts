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
 * 참고문헌 — 외부 원문/공식 페이지로 연결.
 * authors / year / source 는 실제 학술 메타데이터에 맞춰 검증된 상태.
 */
export const REFERENCES: readonly ReferenceEntry[] = [
  {
    id: "saijip-comm",
    num: "01",
    category: "PAPER",
    title:
      "공동주택 내 커뮤니티시설의 변용조사를 통한 시설 사용성 향상에 대한 연구 — 판교지역 LH공사의 공공임대아파트를 중심으로",
    authors: "김민규",
    year: 2018,
    source: "한국주거학회논문집 29(6)",
    url: "https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART002430083",
    note: "공유주방·세탁실·복도 등 1인 가구 사이의 느슨한 접점을 어떻게 설계 도구로 다룰지에 대한 출발점.",
  },
  {
    id: "hertzberger",
    num: "02",
    category: "PAPER",
    title:
      "Interview with Herman Hertzberger — Architecture as Visual and Social Connection",
    authors: "Architecture and Education",
    year: 2017,
    source: "Architecture and Education",
    url: "https://architectureandeducation.org/2017/08/29/interview-with-herman-hertzberger-2017-architecture-as-visual-and-social-connection/",
    note: "‘미완성의 건축’ — 거주자가 공간을 자기 것으로 만들 수 있는 여백. 사이집의 그리드와 변형 유닛에 직접 연결.",
  },
  {
    id: "kci-2835968",
    num: "03",
    category: "PAPER",
    title:
      "아파트 거주민의 사회적 관계 활성화를 위한 공유공간 연구 — 동탄2신도시를 중심으로",
    authors: "신준희 · 장영호 · 이재규",
    year: 2022,
    source: "한국공간디자인학회 논문집 17(3)",
    url: "https://www.kci.go.kr/kciportal/landing/article.kci?arti_id=ART002835968",
    note: "‘함께 쓰는 공간이 어디까지 일상에 침투할 수 있는가’ — 다섯 슬래브 사이 비움의 프로그램 근거.",
  },
  {
    id: "elderly-area",
    num: "04",
    category: "PAPER",
    title: "노인주택 면적계획을 위한 요소로서 행위면적 산출 연구",
    authors: "이윤재 · 이현수",
    year: 2009,
    source: "한국주거학회논문집 20(1)",
    url: "https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART001319660",
    note: "유닛 14m² 의 적정 행위면적 분배 — ‘잠자는 면적’ 과 ‘살아가는 면적’ 의 구분.",
  },
  {
    id: "who-sedentary",
    num: "05",
    category: "GUIDELINE",
    title: "WHO Guidelines on Physical Activity and Sedentary Behaviour",
    year: 2020,
    source: "World Health Organization",
    url: "https://www.who.int/publications/i/item/9789240015128",
    note: "1인 가구의 좌식 행동을 줄이는 동선 설계 — 산책 동선·계단·안뜰의 배치 논거.",
  },
  {
    id: "junggong-plan",
    num: "06",
    category: "DOC",
    title: "2040 준공업지역 종합발전계획",
    year: 2022,
    source: "서울시",
    url: "https://opengov.seoul.go.kr/scholarship/23283754",
    note: "가양 옛 홈플러스 부지가 속한 준공업지역의 정비 방향 — 부지 선정과 프로그램 합의의 근거.",
  },
];
