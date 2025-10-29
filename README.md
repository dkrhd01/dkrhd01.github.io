# 🚀 GitHub Pages 정적 블로그

순수 HTML, CSS, JavaScript로 만든 미니멀한 정적 블로그입니다.

## ✨ 주요 기능

- 📝 **마크다운 지원**: marked.js를 사용한 마크다운 → HTML 변환
- 🎨 **다크/라이트 모드**: CSS 변수 기반 테마 전환
- 🔍 **검색 및 필터**: 클라이언트 사이드 검색, 카테고리/태그 필터링
- 💬 **Giscus 댓글**: GitHub Discussions 기반 댓글 시스템
- 🎯 **코드 하이라이팅**: Prism.js를 사용한 구문 강조
- ⚡ **자동 배포**: GitHub Actions를 통한 자동 빌드 및 배포

## 📁 프로젝트 구조

```
/
├── .nojekyll              # Jekyll 비활성화 (필수!)
├── index.html             # 메인 페이지 (게시글 목록)
├── post.html              # 게시글 상세 페이지
├── css/
│   ├── style.css         # 메인 스타일
│   └── prism.css         # 코드 하이라이팅 테마
├── js/
│   ├── app.js            # 메인 애플리케이션 로직
│   ├── post-loader.js    # 마크다운 로딩 및 파싱
│   ├── search.js         # 검색 기능
│   └── theme.js          # 다크/라이트 모드 토글
├── pages/                 # 마크다운 게시글 폴더
│   ├── example.md
│   └── welcome.md
├── .github/
│   ├── workflows/
│   │   └── deploy.yml    # GitHub Pages 배포
│   └── scripts/
│       └── generate-posts.js  # posts.json 생성 스크립트
└── posts.json            # 게시글 메타데이터
```

## 🚀 시작하기

### 1. 저장소 생성

GitHub에서 `{your_username}.github.io` 이름으로 저장소를 생성합니다.

### 2. 코드 복사

이 프로젝트의 모든 파일을 저장소에 복사합니다:

```bash
git clone https://github.com/{your_username}/{your_username}.github.io.git
cd {your_username}.github.io

# 프로젝트 파일들을 여기에 복사

git add .
git commit -m "feat: 초기 블로그 구축"
git push origin main
```

### 3. GitHub Pages 설정

1. 저장소의 **Settings** > **Pages**로 이동
2. **Source**: "GitHub Actions" 선택
3. 저장

### 4. 배포 확인

몇 분 후 `https://{your_username}.github.io`에서 블로그를 확인할 수 있습니다!

## 📝 게시글 작성하기

### 1. 마크다운 파일 생성

`pages/` 디렉토리에 `.md` 파일을 생성합니다:

```markdown
---
title: "게시글 제목"
date: 2025-01-26
tags: ["JavaScript", "Web"]
category: "Development"
description: "게시글 설명"
---

# 제목

내용을 작성하세요...
```

### 2. Front Matter 필드

- `title`: 게시글 제목 (필수)
- `date`: 날짜 (YYYY-MM-DD 형식)
- `tags`: 태그 배열
- `category`: 카테고리
- `description`: 게시글 설명

### 3. 배포

```bash
git add pages/your-post.md
git commit -m "feat: 새 게시글 추가"
git push origin main
```

GitHub Actions가 자동으로 `posts.json`을 생성하고 배포합니다!

## 💬 Giscus 댓글 설정

### 1단계: Discussions 활성화

저장소 **Settings** > **General** > **Features**에서 **Discussions** 체크

### 2단계: Giscus 앱 설치

1. https://github.com/apps/giscus 방문
2. **Install** 클릭
3. 저장소 선택 및 설치

### 3단계: 설정 가져오기

1. https://giscus.app/ko 방문
2. 저장소 정보 입력: `{your_username}/{your_username}.github.io`
3. 설정:
   - **매핑**: `pathname`
   - **카테고리**: `General`
   - **테마**: `preferred_color_scheme`
4. 생성된 `data-repo-id`와 `data-category-id` 복사

### 4단계: 코드 업데이트

`js/post-loader.js` 파일에서 다음 부분을 수정:

```javascript
script.setAttribute("data-repo", "{your_username}/{your_username}.github.io");
script.setAttribute("data-repo-id", "YOUR_REPO_ID"); // 여기에 복사한 값
script.setAttribute("data-category-id", "YOUR_CATEGORY_ID"); // 여기에 복사한 값
```

### 5단계: 배포

```bash
git add js/post-loader.js
git commit -m "feat: Giscus 댓글 시스템 설정"
git push origin main
```

## 🎨 커스터마이징

### 색상 변경

`css/style.css`의 CSS 변수를 수정:

```css
:root {
  --accent-color: #228be6; /* 메인 색상 */
  --accent-hover: #1c7ed6; /* 호버 색상 */
}
```

### 블로그 제목 변경

`index.html`과 `post.html`의 `<h1>` 태그 수정:

```html
<h1><a href="index.html">개발 블로그</a></h1>
```

### 푸터 수정

`index.html`과 `post.html`의 `<footer>` 태그 수정

## ⚠️ 중요 사항

### .nojekyll 파일

**반드시 루트 디렉토리에 `.nojekyll` 빈 파일이 있어야 합니다!**

이 파일이 없으면 GitHub Pages가 Jekyll로 빌드하려고 시도하여 `pages/` 폴더의 마크다운 파일이 제대로 서빙되지 않습니다.

### posts.json 관리

`posts.json`은 GitHub Actions가 자동으로 생성하지만, Git에 커밋해야 합니다. `.gitignore`에 추가하지 마세요!

```bash
git add posts.json
git commit -m "chore: posts.json 업데이트"
git push origin main
```

## 🛠️ 로컬 개발

로컬에서 테스트하려면 간단한 HTTP 서버를 실행하세요:

### Python 3

```bash
python -m http.server 8000
```

### Node.js

```bash
npx http-server
```

그런 다음 브라우저에서 `http://localhost:8000`을 엽니다.

## 📦 기술 스택

- **HTML/CSS**: 기본 구조 및 스타일
- **Vanilla JavaScript**: 동적 기능
- **marked.js**: 마크다운 파싱
- **Prism.js**: 코드 하이라이팅
- **Giscus**: 댓글 시스템
- **GitHub Actions**: 자동 배포
- **GitHub Pages**: 호스팅

## 🤝 기여

이슈와 풀 리퀘스트는 언제나 환영합니다!

## 📄 라이선스

MIT License

---

**Happy Blogging! ✨**
