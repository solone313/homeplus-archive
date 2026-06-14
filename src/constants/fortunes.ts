export type Fortune = {
  quote: string;
  speaker: string;
  source: string;
  architect: string;
  architectBio: string;
  saiConnection: string;
};

export const FORTUNES: readonly Fortune[] = [
  {
    "quote": "두 개의 벽을 세우면 그 사이는 길이 된다.",
    "speaker": "FHHH Friends",
    "source": "FHHH Friends 공식 웹사이트, 「집안에 골목」 프로젝트 소개문",
    "architect": "FHHH Friends",
    "architectBio": "윤한진, 한승재, 한양규가 2013년에 공동 설립한 건축사사무소. 일상적인 구조와 재료를 예상 밖의 방식으로 해석하며, 건축물 자체뿐 아니라 설계 과정에서 파생된 글과 이야기도 적극적으로 기록한다.",
    "saiConnection": "홈플러스의 두꺼운 구조체는 면적 손실이 아닌 사람이 머무는 장소로 전환된다."
  },
  {
    "quote": "건축은 대부분 사회생활을 위한 도구에 가깝다.",
    "speaker": "Herman Hertzberger",
    "source": "Architecture and Education, 「Interview with Herman Hertzberger (2017): Architecture as Visual and Social Connection」, 2017",
    "architect": "Herman Hertzberger",
    "architectBio": "헤르만 헤르츠버거(b. 1932, 네덜란드) — 네덜란드 구조주의(Structuralism)를 이끈 건축가. 사용자가 공간을 자기 것으로 만들 수 있도록 여백을 남기는 ‘미완성의 건축’을 주장했다. Centraal Beheer 사옥, Apollo Schools, Montessori School Delft 등에서 학습·노동·공동체를 위한 도구로서의 공간을 일관되게 설계해 왔다.",
    "saiConnection": "공유주방, 세탁실, 산책 동선, 복도, 안뜰은 혼자 사는 사람이 타인과 느슨하게 연결될 수 있도록 돕는 생활의 도구다."
  },
  {
    "quote": "규칙은 당신을 가두는 울타리가 아니라, 자유를 주는 장치가 될 수 있다.",
    "speaker": "Herman Hertzberger",
    "source": "Architecture and Education, 「Interview with Herman Hertzberger (2017): Architecture as Visual and Social Connection」, 2017",
    "architect": "Herman Hertzberger",
    "architectBio": "헤르만 헤르츠버거(b. 1932, 네덜란드) — 네덜란드 구조주의(Structuralism)를 이끈 건축가. 사용자가 공간을 자기 것으로 만들 수 있도록 여백을 남기는 ‘미완성의 건축’을 주장했다. Centraal Beheer 사옥, Apollo Schools, Montessori School Delft 등에서 학습·노동·공동체를 위한 도구로서의 공간을 일관되게 설계해 왔다.",
    "saiConnection": "사이집은 기존 대형마트의 그리드와 구조적 제약을 없애야 할 장애물로 보지 않았다. 일정한 규칙은 유닛, 발코니, 복도, 공유공간의 다양한 변형을 만들어 내는 출발점이 되었다."
  },
  {
    "quote": "공간을 인식한다는 것은 공동체 전체를 인식한다는 것이다.",
    "speaker": "Riken Yamamoto",
    "source": "The Pritzker Architecture Prize, 「Riken Yamamoto Receives the 2024 Pritzker Architecture Prize」, 2024",
    "architect": "Riken Yamamoto",
    "architectBio": "야마모토 리켄(山本理顕, b. 1945, 일본) — 2024 프리츠커상 수상 건축가. 평생 화두는 주거와 거리(街) 사이의 ‘문턱’으로, 사적 공간과 공동체가 만나는 경계를 두껍게 설계해 왔다. Hotakubo Housing, Shinonome Codan Court, 판교주택 등에서 자신이 제안한 ‘지역사회권(local community area)’ 이론에 기반한 거주 모델을 펼쳐 보였다.",
    "saiConnection": "사이집은 개별 유닛의 집합으로만 이뤄지지 않았다. 창, 복도, 안뜰, 브리지, 경사로를 통해 건물 전체를 거주자 모두의 집으로 설계했다."
  },
  {
    "quote": "모든 집은 마을 안에 있고, 모든 가족은 마을 사람들의 공동체 안에 있다. 마을과 집 사이의 문턱이 공동체를 오래 지속시킨다.",
    "speaker": "Riken Yamamoto",
    "source": "The Pritzker Architecture Prize, 「Community: The Architect as Catalyst for Change, the 2024 Laureate Lecture and Panel Discussion」, 2024",
    "architect": "Riken Yamamoto",
    "architectBio": "야마모토 리켄(山本理顕, b. 1945, 일본) — 2024 프리츠커상 수상 건축가. 평생 화두는 주거와 거리(街) 사이의 ‘문턱’으로, 사적 공간과 공동체가 만나는 경계를 두껍게 설계해 왔다. Hotakubo Housing, Shinonome Codan Court, 판교주택 등에서 자신이 제안한 ‘지역사회권(local community area)’ 이론에 기반한 거주 모델을 펼쳐 보였다.",
    "saiConnection": "사이집의 중요한 장소는 방의 안쪽이나 바깥쪽 어느 하나가 아니라 그 사이에 있다. 유닛과 복도 사이, 주거와 도시 사이, 안뜰과 경사로 사이의 문턱을 두껍게 만드는 설계와 연결된다."
  }
] as const;
