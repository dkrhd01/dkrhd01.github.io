---
title: "GitHub Pages 블로그 구축 가이드"
date: 2025-01-27
tags: ["GitHub", "Tutorial", "Static Site"]
category: "Tutorial"
description: "정적 블로그를 처음부터 끝까지 구축하는 방법을 알아봅니다."
---

# GitHub Pages 블로그 구축 가이드

이 가이드에서는 GitHub Pages를 사용하여 정적 블로그를 구축하는 방법을 단계별로 설명합니다.

## 왜 정적 블로그인가?

정적 블로그는 다음과 같은 장점이 있습니다:

- ⚡ **빠른 속도**: 서버 사이드 처리 없이 정적 파일만 제공
- 💰 **무료 호스팅**: GitHub Pages는 완전 무료
- 🔒 **보안**: 데이터베이스나 서버 취약점 없음
- 📝 **마크다운**: 간단하고 효율적인 글쓰기
- 🎨 **완전한 커스터마이징**: 모든 것을 직접 제어

## 프로젝트 구조

```
/
├── .nojekyll              # Jekyll 비활성화
├── index.html             # 메인 페이지
├── post.html              # 게시글 페이지
├── css/
│   ├── style.css         # 메인 스타일
│   └── prism.css         # 코드 하이라이팅
├── js/
│   ├── app.js            # 메인 로직
│   ├── post-loader.js    # 게시글 로더
│   ├── search.js         # 검색 기능
│   └── theme.js          # 테마 전환
├── pages/                 # 마크다운 게시글
│   └── *.md
└── .github/
    ├── workflows/
    │   └── deploy.yml    # 배포 워크플로우
    └── scripts/
        └── generate-posts.js
```

## 핵심 기능

### 1. 자동 배포

Git에 푸시하면 GitHub Actions가 자동으로:

1. `posts.json` 생성
2. GitHub Pages에 배포

### 2. 마크다운 파싱

`marked.js`를 사용하여 마크다운을 HTML로 변환합니다:

```javascript
const html = marked.parse(markdown);
```

### 3. Front Matter

각 게시글의 메타데이터는 Front Matter로 관리됩니다:

```yaml
---
title: "제목"
date: 2025-01-27
tags: ["태그1", "태그2"]
category: "카테고리"
description: "설명"
---
```

### 4. 검색 및 필터

클라이언트 사이드에서 다음을 지원합니다:

- 전체 텍스트 검색
- 카테고리 필터
- 태그 필터

## 배포하기

### 1단계: 저장소 생성

GitHub에서 `{username}.github.io` 이름으로 저장소를 생성합니다.

### 2단계: 파일 업로드

이 프로젝트의 모든 파일을 저장소에 푸시합니다.

### 3단계: GitHub Pages 설정

1. **Settings** > **Pages**로 이동
2. **Source**: GitHub Actions 선택
3. 저장

### 4단계: 첫 푸시

```bash
git add .
git commit -m "feat: 초기 블로그 구축"
git push origin main
```

몇 분 후 `https://{username}.github.io`에서 블로그를 확인할 수 있습니다!

## Giscus 댓글 설정

### 준비사항

1. 저장소에서 **Discussions** 활성화
2. [Giscus 앱](https://github.com/apps/giscus) 설치

### 설정

1. [giscus.app](https://giscus.app/ko)에서 설정
2. 저장소 정보 입력
3. 생성된 `data-repo-id`와 `data-category-id` 복사
4. `js/post-loader.js`에서 해당 값 업데이트

```javascript
script.setAttribute("data-repo", "username/username.github.io");
script.setAttribute("data-repo-id", "YOUR_REPO_ID");
script.setAttribute("data-category-id", "YOUR_CATEGORY_ID");
```

## 커스터마이징

### 색상 변경

`css/style.css`의 CSS 변수를 수정하세요:

```css
:root {
  --accent-color: #228be6; /* 원하는 색상으로 변경 */
  --accent-hover: #1c7ed6;
}
```

### 타이틀 변경

각 HTML 파일의 `<title>` 태그와 헤더의 `<h1>` 텍스트를 수정하세요.

## 문제 해결

### 게시글이 404 에러

- `.nojekyll` 파일이 있는지 확인
- `posts.json`이 Git에 커밋되었는지 확인

### Giscus가 로드되지 않음

- Discussions가 활성화되었는지 확인
- Giscus 앱이 설치되었는지 확인
- `data-repo-id`와 `data-category-id`가 올바른지 확인

### 스타일이 적용되지 않음

- 브라우저 캐시 삭제
- 파일 경로가 올바른지 확인

## 다음 단계

이제 블로그가 준비되었습니다! 다음을 시도해보세요:

- [ ] 프로필 페이지 추가
- [ ] RSS 피드 생성
- [ ] 검색 엔진 최적화 (SEO)
- [ ] 분석 도구 연동 (Google Analytics)
- [ ] 소셜 공유 버튼 추가

즐거운 블로깅 되세요! ✨
