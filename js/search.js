// 검색 및 필터링 기능

let allPosts = [];
let currentFilters = {
  searchQuery: "",
  category: "",
  tag: "",
};

// 게시글 데이터 설정
function setPostsData(posts) {
  allPosts = posts;
}

// 검색 및 필터링 로직
function filterPosts() {
  const { searchQuery, category, tag } = currentFilters;

  return allPosts.filter((post) => {
    // 검색어 필터
    const matchesSearch =
      !searchQuery ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) =>
        t.toLowerCase().includes(searchQuery.toLowerCase())
      );

    // 카테고리 필터
    const matchesCategory = !category || post.category === category;

    // 태그 필터
    const matchesTag = !tag || post.tags.includes(tag);

    return matchesSearch && matchesCategory && matchesTag;
  });
}

// 검색 입력 이벤트
function setupSearch() {
  const searchInput = document.getElementById("search-input");
  if (!searchInput) return;

  searchInput.addEventListener("input", (e) => {
    currentFilters.searchQuery = e.target.value.trim();
    updateDisplayedPosts();
  });
}

// 카테고리 필터 설정
function setupCategoryFilter(posts) {
  const categoryFilter = document.getElementById("category-filter");
  if (!categoryFilter) return;

  // 고유 카테고리 추출
  const categories = [
    ...new Set(posts.map((post) => post.category).filter(Boolean)),
  ];

  // 옵션 추가
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });

  // 변경 이벤트
  categoryFilter.addEventListener("change", (e) => {
    currentFilters.category = e.target.value;
    updateDisplayedPosts();
  });
}

// 태그 필터 설정
function setupTagsFilter(posts) {
  const tagsContainer = document.getElementById("tags-container");
  if (!tagsContainer) return;

  // 고유 태그 추출 및 빈도 계산
  const tagCounts = {};
  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  // 태그를 빈도순으로 정렬
  const sortedTags = Object.keys(tagCounts).sort(
    (a, b) => tagCounts[b] - tagCounts[a]
  );

  // 태그 버튼 생성
  sortedTags.forEach((tag) => {
    const button = document.createElement("button");
    button.className = "tag-button";
    button.textContent = `${tag} (${tagCounts[tag]})`;
    button.dataset.tag = tag;

    button.addEventListener("click", () => {
      // 이전 선택 해제
      document.querySelectorAll(".tag-button").forEach((btn) => {
        btn.classList.remove("active");
      });

      // 같은 태그를 다시 클릭하면 필터 해제
      if (currentFilters.tag === tag) {
        currentFilters.tag = "";
      } else {
        currentFilters.tag = tag;
        button.classList.add("active");
      }

      updateDisplayedPosts();
    });

    tagsContainer.appendChild(button);
  });
}

// 게시글 표시 업데이트
function updateDisplayedPosts() {
  const filteredPosts = filterPosts();
  const postsListElement = document.getElementById("posts-list");
  const noResultsElement = document.getElementById("no-results");

  if (!postsListElement) return;

  if (filteredPosts.length === 0) {
    postsListElement.style.display = "none";
    if (noResultsElement) {
      noResultsElement.style.display = "block";
    }
    return;
  }

  postsListElement.style.display = "grid";
  if (noResultsElement) {
    noResultsElement.style.display = "none";
  }

  // 게시글 카드 렌더링
  postsListElement.innerHTML = filteredPosts
    .map(
      (post) => `
    <div class="post-card" onclick="location.href='post.html?file=${encodeURIComponent(
      post.file
    )}'">
      <h2><a href="post.html?file=${encodeURIComponent(
        post.file
      )}">${escapeHtml(post.title)}</a></h2>
      <div class="post-meta">
        <time datetime="${post.date}">${formatDate(post.date)}</time>
        ${
          post.category
            ? `<span class="category">${escapeHtml(post.category)}</span>`
            : ""
        }
      </div>
      ${
        post.tags.length > 0
          ? `<div class="post-tags">
          ${post.tags
            .map((tag) => `<span class="tag">#${escapeHtml(tag)}</span>`)
            .join("")}
        </div>`
          : ""
      }
      ${
        post.description
          ? `<p class="post-description">${escapeHtml(post.description)}</p>`
          : ""
      }
      ${
        post.excerpt
          ? `<p class="post-excerpt">${escapeHtml(post.excerpt)}</p>`
          : ""
      }
    </div>
  `
    )
    .join("");
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
