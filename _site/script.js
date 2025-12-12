// ====== NAV + RECENT POSTS + CODE TOGGLE ======

document.addEventListener("DOMContentLoaded", () => {
  const currentPage = document.body.dataset.page; // "home" | "blogs" | "tutorials"
  const navItems = document.querySelectorAll(".nav-item");

  // ===== NAV ACTIVE HIGHLIGHT =====
  navItems.forEach((link) => {
    const href = link.getAttribute("href") || "";

    if (
      (currentPage === "home" && href === "/") ||
      (currentPage === "blogs" && href.startsWith("/blog")) ||
      (currentPage === "tutorials" && href.startsWith("/tutorials"))
    ) {
      link.classList.add("active");
    }
  });

  // ===== HOME: RECENT POSTS =====
  if (currentPage === "home") {
    loadRecentPosts();
  }

  // ===== BLOG/TUTORIAL DETAIL: TOGGLE CODE BLOCKS =====
  setupCodeToggles();
});

/**
 * Fetches the content/blogs.json file, sorts by date (newest first),
 * and injects the top 3 posts into the "Most recent" list on the homepage.
 */
async function loadRecentPosts() {
  const list = document.getElementById("hero-recent-list");
  if (!list) return;

  try {
    // absolute path so it works reliably
    const response = await fetch("/content/blogs.json");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const posts = await response.json();

    // Sort by date descending (newest first)
    posts.sort((a, b) => {
      const dateA = new Date(a.date || "1970-01-01");
      const dateB = new Date(b.date || "1970-01-01");
      return dateB - dateA;
    });

    // Take only top 3
    const latest = posts.slice(0, 3);

    if (latest.length === 0) {
      list.innerHTML =
        "<li>No posts yet. Add some entries in content/blogs.json.</li>";
      return;
    }

    list.innerHTML = latest
      .map((post) => {
        const typeLabel = post.type ? post.type : "Post";
        const tagLabel = post.tag ? ` – ${post.tag}` : "";
        const dateLabel = post.date ? ` (${post.date})` : "";

        return `<li>${typeLabel}${tagLabel}: ${post.title}${dateLabel}</li>`;
      })
      .join("");
  } catch (error) {
    console.error("Error loading recent posts:", error);
    list.innerHTML = "<li>Unable to load recent posts right now.</li>";
  }
}

/**
 * Toggle show/hide for code blocks on blog/tutorial detail pages.
 */
function setupCodeToggles() {
  const buttons = document.querySelectorAll(".toggle-code-btn");
  if (!buttons.length) return;

  buttons.forEach((btn) => {
    const targetId = btn.dataset.target;
    const codeBlock = document.getElementById(targetId);
    if (!codeBlock) return;

    btn.addEventListener("click", () => {
      const isHidden = codeBlock.classList.toggle("is-hidden");
      btn.textContent = isHidden ? "Show code snippet" : "Hide code snippet";
    });
  });
}
