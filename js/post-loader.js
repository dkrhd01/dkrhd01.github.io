// 게시글 로딩 및 파싱

// URL 파라미터에서 파일명 가져오기
function getPostFileFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("file");
}

// Front Matter 파싱
function parseFrontMatter(content) {
  const frontMatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontMatterRegex);

  if (!match) {
    return { metadata: {}, content: content };
  }

  const frontMatter = match[1];
  const postContent = match[2];
  const metadata = {};

  // Front Matter 라인별 파싱
  frontMatter.split("\n").forEach((line) => {
    const colonIndex = line.indexOf(":");
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();

      // 따옴표 제거
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }

      // 배열 파싱 (tags)
      if (key === "tags" && value.startsWith("[") && value.endsWith("]")) {
        try {
          value = JSON.parse(value);
        } catch {
          value = value
            .slice(1, -1)
            .split(",")
            .map((tag) => tag.trim().replace(/^['"]|['"]$/g, ""));
        }
      }

      metadata[key] = value;
    }
  });

  return { metadata, content: postContent };
}

// 마크다운을 HTML로 변환
function renderMarkdown(markdown) {
  if (typeof marked === "undefined") {
    throw new Error("marked.js 라이브러리가 로드되지 않았습니다.");
  }

  // marked 옵션 설정
  marked.setOptions({
    breaks: true,
    gfm: true,
    headerIds: true,
  });

  return marked.parse(markdown);
}

// 게시글 헤더 표시
function displayPostHeader(metadata) {
  const titleElement = document.getElementById("post-title");
  const dateElement = document.getElementById("post-date");
  const categoryElement = document.getElementById("post-category");
  const tagsElement = document.getElementById("post-tags");
  const headerElement = document.getElementById("post-header");

  if (titleElement && metadata.title) {
    titleElement.textContent = metadata.title;
    document.title = metadata.title + " - 개발 블로그";
  }

  if (dateElement && metadata.date) {
    dateElement.textContent = formatDate(metadata.date);
    dateElement.setAttribute("datetime", metadata.date);
  }

  if (categoryElement && metadata.category) {
    categoryElement.textContent = metadata.category;
    categoryElement.className = "post-meta category";
  } else if (categoryElement) {
    categoryElement.style.display = "none";
  }

  if (tagsElement && metadata.tags && Array.isArray(metadata.tags)) {
    tagsElement.innerHTML = metadata.tags
      .map((tag) => `<span class="tag">#${escapeHtml(tag)}</span>`)
      .join("");
  }

  if (headerElement) {
    headerElement.style.display = "block";
  }
}

// 게시글 본문 표시
function displayPostBody(html) {
  const bodyElement = document.getElementById("post-body");
  if (bodyElement) {
    bodyElement.innerHTML = html;

    // 코드 하이라이팅 적용
    if (typeof Prism !== "undefined") {
      Prism.highlightAllUnder(bodyElement);
    }
  }
}

// 로딩 상태 숨기기
function hideLoading() {
  const loadingElement = document.getElementById("loading");
  if (loadingElement) {
    loadingElement.style.display = "none";
  }
}

// 에러 표시
function showError(message) {
  hideLoading();
  const errorElement = document.getElementById("error");
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.style.display = "block";
  }
}

// Giscus 댓글 시스템 로드
function loadGiscus() {
  const commentsSection = document.getElementById("comments");
  if (!commentsSection) return;

  const script = document.createElement("script");
  script.src = "https://giscus.app/client.js";
  script.setAttribute(
    "data-repo",
    "{your_github_username}/{your_github_username}.github.io"
  );
  script.setAttribute("data-repo-id", "YOUR_REPO_ID"); // Giscus 설정에서 가져오기
  script.setAttribute("data-category", "General");
  script.setAttribute("data-category-id", "YOUR_CATEGORY_ID"); // Giscus 설정에서 가져오기
  script.setAttribute("data-mapping", "pathname");
  script.setAttribute("data-strict", "0");
  script.setAttribute("data-reactions-enabled", "1");
  script.setAttribute("data-emit-metadata", "1");
  script.setAttribute("data-input-position", "top");
  script.setAttribute("data-theme", "preferred_color_scheme");
  script.setAttribute("data-lang", "ko");
  script.setAttribute("data-loading", "lazy");
  script.crossOrigin = "anonymous";
  script.async = true;

  commentsSection.appendChild(script);
}

// 게시글 로드
async function loadPost() {
  const filename = getPostFileFromUrl();

  if (!filename) {
    showError("게시글 파일이 지정되지 않았습니다.");
    return;
  }

  try {
    const response = await fetch(`pages/${filename}`);

    if (!response.ok) {
      throw new Error(`게시글을 찾을 수 없습니다. (${response.status})`);
    }

    const content = await response.text();
    const { metadata, content: markdown } = parseFrontMatter(content);

    // 헤더 표시
    displayPostHeader(metadata);

    // 본문 렌더링
    const html = renderMarkdown(markdown);
    displayPostBody(html);

    // 로딩 숨기기
    hideLoading();

    // Giscus 댓글 로드
    loadGiscus();
  } catch (error) {
    console.error("게시글 로드 오류:", error);
    showError(error.message);
  }
}

// 날짜 포맷팅
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// HTML 이스케이프
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// 페이지 로드 시 실행
document.addEventListener("DOMContentLoaded", loadPost);
