# 임시 배포 가이드 — HOME+

## 현재 상태
- Vite dev 서버가 `http://localhost:5173` 에서 실행 중 (HMR 활성)
- 모든 섹션 검증 완료 (Hero ~ Mass)

## ngrok 무료 배포 (3분)

### 1) 인증 토큰 발급
1. https://dashboard.ngrok.com/signup — 이메일/구글로 무료 가입 (30초)
2. https://dashboard.ngrok.com/get-started/your-authtoken — 토큰 복사

### 2) 토큰 등록 (1회만)
```bash
ngrok config add-authtoken <YOUR_TOKEN>
```

### 3) 터널 열기
```bash
# dev 서버를 그대로 노출
ngrok http 5173
```

또는 prod 빌드를 노출하면 더 빠릅니다:
```bash
cd /Users/hojin/go/test/homeplus-presentation
npm run build
npx serve dist -p 4173 &
ngrok http 4173
```

### 4) 결과 URL
ngrok이 `https://xxxx-xxx-xx-xxx.ngrok-free.app` 형태의 임시 주소를 출력합니다.
이 주소를 발표 자료를 보여줄 사람과 공유하세요.

---

## 대안 — 가입 없는 옵션

### Cloudflare Tunnel
```bash
brew install cloudflared
cloudflared tunnel --url http://localhost:5173
```

### LocalTunnel (npm)
```bash
npx localtunnel --port 5173
```

---

## 주의사항
- ngrok 무료는 세션을 닫으면 URL이 사라집니다. 발표 직전에 켜세요.
- 무료 플랜은 동시 1개 터널, 분당 60 요청 제한.
- Vite의 `server.allowedHosts: true` 가 이미 설정돼 있어 ngrok host는 통과됩니다.
