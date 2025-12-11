document.addEventListener("DOMContentLoaded", () => {
  // ====== NAV ACTIVE HIGHLIGHT ======
  const currentPage = document.body.dataset.page; // "home" | "blogs" | "tutorials"
  const navItems = document.querySelectorAll(".nav-item");

  navItems.forEach((link) => {
    const href = link.getAttribute("href") || "";
    if (
      (currentPage === "home" && href.includes("index.html")) ||
      (currentPage === "blogs" && href.includes("blog.html")) ||
      (currentPage === "tutorials" && href.includes("tutorials.html"))
    ) {
      link.classList.add("active");
    }
  });

  // ====== LOAD RECENT POSTS FOR HOME HERO CARD ======
  if (currentPage === "home") {
    loadRecentPosts();
  }
});

/**
 * Fetches the content/blogs.json file, sorts by date (newest first),
 * and injects the top 3 posts into the "Today's focus" list on the homepage.
 */
async function loadRecentPosts() {
  const list = document.getElementById("hero-recent-list");
  if (!list) return;

  try {
    const response = await fetch("content/blogs.json");
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
      list.innerHTML = "<li>No posts yet. Add some entries in content/blogs.json.</li>";
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



// for new added blog pages
document.addEventListener("DOMContentLoaded", () => {
  const currentPage = document.body.dataset.page; // "home" | "blogs" | "tutorials"
  const navItems = document.querySelectorAll(".nav-item");

  // ===== NAV ACTIVE =====
  navItems.forEach((link) => {
    const href = link.getAttribute("href") || "";
    if (
      (currentPage === "home" && href.includes("index.html")) ||
      (currentPage === "blogs" && href.includes("blog.html")) ||
      (currentPage === "tutorials" && href.includes("tutorials.html"))
    ) {
      link.classList.add("active");
    }
  });

  // ===== HOME: RECENT POSTS (if you already have this) =====
  if (currentPage === "home") {
    loadRecentPosts?.();
  }

  // ===== BLOG DETAIL: TOGGLE CODE BLOCKS =====
  setupCodeToggles();
});

/**
 * Toggle show/hide for code blocks on blog detail pages.
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
