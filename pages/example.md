---
title: "블로그 시작하기"
date: 2025-01-26
tags: ["JavaScript", "Web", "GitHub Pages"]
category: "Development"
description: "GitHub Pages로 만든 정적 블로그에 오신 것을 환영합니다!"
---

# 블로그에 오신 것을 환영합니다! 🎉

이것은 **GitHub Pages**와 **순수 JavaScript**로 만든 정적 블로그의 첫 게시글입니다.

## 주요 기능

### 1. 마크다운 지원

마크다운 문법을 사용하여 글을 작성할 수 있습니다:

- **굵은 글씨**
- _기울임체_
- `인라인 코드`
- [링크](https://github.com)

### 2. 코드 하이라이팅

Prism.js를 사용한 아름다운 코드 하이라이팅을 지원합니다:

```javascript
// JavaScript 예시
function greet(name) {
  console.log(`Hello, ${name}!`);
}

greet("World");
```

```python
# Python 예시
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(10))
```

```css
/* CSS 예시 */
.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}
```

### 3. 다크/라이트 모드

오른쪽 상단의 버튼을 클릭하여 테마를 전환할 수 있습니다. 테마 설정은 자동으로 저장됩니다.

### 4. 검색 및 필터링

- 검색창을 통한 전체 텍스트 검색
- 카테고리별 필터링
- 태그별 필터링

### 5. Giscus 댓글 시스템

GitHub Discussions를 활용한 댓글 시스템이 통합되어 있습니다. (설정 후 활성화됩니다)

## 사용 방법

### 새 게시글 작성하기

1. `pages/` 디렉토리에 `.md` 파일을 생성합니다
2. Front Matter를 포함한 마크다운 내용을 작성합니다:

```markdown
---
title: "게시글 제목"
date: 2025-01-26
tags: ["태그1", "태그2"]
category: "카테고리"
description: "게시글 설명"
---

# 내용 시작

본문을 작성하세요...
```

3. Git에 커밋하고 푸시합니다:

```bash
git add pages/your-post.md
git commit -m "feat: 새 게시글 추가"
git push origin main
```

4. GitHub Actions가 자동으로 배포합니다!

## 기술 스택

이 블로그는 다음 기술을 사용하여 만들어졌습니다:

| 기술               | 용도                  |
| ------------------ | --------------------- |
| HTML/CSS           | 기본 구조 및 스타일링 |
| Vanilla JavaScript | 동적 기능 구현        |
| marked.js          | 마크다운 파싱         |
| Prism.js           | 코드 하이라이팅       |
| Giscus             | 댓글 시스템           |
| GitHub Actions     | 자동 배포             |
| GitHub Pages       | 호스팅                |

## 인용문

> "완벽함이란, 더 이상 더할 것이 없는 상태가 아니라 더 이상 뺄 것이 없는 상태이다."
>
> — 앙투안 드 생텍쥐페리

## 이미지 지원

마크다운 이미지 문법도 사용할 수 있습니다:

```markdown
![대체 텍스트](이미지_URL)
```

## 리스트

### 정렬된 리스트

1. 첫 번째 항목
2. 두 번째 항목
3. 세 번째 항목

### 정렬되지 않은 리스트

- 항목 A
- 항목 B
  - 하위 항목 1
  - 하위 항목 2
- 항목 C

## 마무리

이제 여러분의 이야기를 시작하세요! 🚀

이 예시 게시글을 수정하거나 삭제하고, 새로운 게시글을 작성해보세요.

---

**참고**: Giscus 댓글 시스템을 사용하려면 `js/post-loader.js` 파일에서 GitHub 저장소 정보를 업데이트해야 합니다.
