// 메인 페이지 애플리케이션 로직

// 게시글 데이터 로드
async function loadPosts() {
  try {
    const response = await fetch("posts.json");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const posts = await response.json();

    // 검색 모듈에 데이터 전달
    if (typeof setPostsData === "function") {
      setPostsData(posts);
    }

    // 필터 설정
    if (typeof setupCategoryFilter === "function") {
      setupCategoryFilter(posts);
    }

    if (typeof setupTagsFilter === "function") {
      setupTagsFilter(posts);
    }

    // 게시글 표시
    if (typeof updateDisplayedPosts === "function") {
      updateDisplayedPosts();
    }
  } catch (error) {
    console.error("게시글을 불러오는 중 오류가 발생했습니다:", error);

    const postsListElement = document.getElementById("posts-list");
    if (postsListElement) {
      postsListElement.innerHTML = `
        <div class="error">
          <p>게시글을 불러오는 중 오류가 발생했습니다.</p>
          <p style="font-size: 0.9rem; color: var(--text-tertiary);">
            ${error.message}
          </p>
        </div>
      `;
    }
  }
}

// 페이지 로드 시 실행
document.addEventListener("DOMContentLoaded", () => {
  // 검색 기능 초기화
  if (typeof setupSearch === "function") {
    setupSearch();
  }

  // 게시글 로드
  loadPosts();
});
