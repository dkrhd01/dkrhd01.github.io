// 다크/라이트 모드 전환 기능

// 저장된 테마 가져오기 또는 시스템 설정 사용
function getInitialTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    return savedTheme;
  }

  // 시스템 다크 모드 설정 확인
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  }

  return "light";
}

// 테마 적용
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}

// 테마 토글
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  applyTheme(newTheme);
}

// 초기 테마 적용 (페이지 로드 시 깜빡임 방지)
applyTheme(getInitialTheme());

// DOM 로드 후 이벤트 리스너 추가
document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");

  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }
});

// 시스템 다크 모드 변경 감지
if (window.matchMedia) {
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      // 사용자가 수동으로 설정하지 않았을 경우에만 시스템 설정 따르기
      if (!localStorage.getItem("theme")) {
        applyTheme(e.matches ? "dark" : "light");
      }
    });
}
