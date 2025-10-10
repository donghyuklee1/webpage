# Personal Website

심플하고 세련된 개인 웹사이트입니다. PC와 모바일 모두에서 최적화되어 있습니다.

## 특징

- ✨ 깔끔하고 미니멀한 디자인
- 📱 완벽한 반응형 레이아웃 (PC, 태블릿, 모바일)
- 🎨 현대적인 UI/UX
- ⚡ 빠른 로딩 속도
- 🔗 부드러운 스크롤 애니메이션
- 🔥 실시간 자동 새로고침 (Live Reload)

## 파일 구조

```
.
├── index.html      # 메인 HTML 파일
├── styles.css      # 스타일시트
├── script.js       # JavaScript 인터랙션
├── package.json    # 프로젝트 설정 및 의존성
└── README.md       # 프로젝트 설명
```

## 개발 환경 설정

### 1. 의존성 설치
프로젝트를 처음 시작할 때 한 번만 실행:
```bash
npm install
```

### 2. 개발 서버 시작
코드를 수정하면 자동으로 브라우저가 새로고침됩니다:
```bash
npm start
```
또는
```bash
npm run dev
```

개발 서버가 자동으로 브라우저를 열고 `http://localhost:3000`에서 실행됩니다.

### 3. 브라우저를 자동으로 열지 않고 서버만 실행:
```bash
npm run serve
```

## 커스터마이징

### 개인 정보 수정
`index.html` 파일에서 다음 내용을 수정하세요:
- 이름 (Your Name)
- 직책 및 소속
- 프로필 이미지 URL
- 바이오 내용
- 소셜 미디어 링크

### 색상 변경
`styles.css` 파일의 `:root` 섹션에서 색상 변수를 수정하세요:
```css
:root {
    --primary-color: #2c3e50;
    --link-color: #4A90E2;
    --text-color: #333;
    --bg-light: #f5f5f5;
}
```

### 프로필 이미지 추가
1. 이미지 파일을 프로젝트 폴더에 추가
2. `index.html`에서 이미지 URL 수정:
   ```html
   <img src="your-image.jpg" alt="Profile" class="profile-image">
   ```

## 반응형 브레이크포인트

- **Desktop**: > 968px
- **Tablet**: 768px - 968px
- **Mobile**: < 768px
- **Small Mobile**: < 480px

## 브라우저 호환성

- Chrome (최신)
- Firefox (최신)
- Safari (최신)
- Edge (최신)

## 라이선스

자유롭게 사용하세요!
