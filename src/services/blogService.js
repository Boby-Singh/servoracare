const API_BASE = (
    import.meta.env.VITE_API_URL ||
    "https://servoracare-backend.onrender.com/api"
).replace(/\/+$/, "");

const BLOG_API = `${API_BASE}/blog`;

async function request(url, options = {}) {
    const response = await fetch(url, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(data.message || "Something went wrong.");
    }

    return data;
}

// Get published blog posts.
// Supports search, category, page, and limit.
export function getBlogs(params = {}) {
    const query = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
            query.set(key, String(value));
        }
    });

    const queryString = query.toString();

    return request(
            `${BLOG_API}${queryString ? `?${queryString}` : ""}`
  );
}

// Get a single published article using its slug.
export function getBlogBySlug(slug) {
  return request(`${BLOG_API}/${encodeURIComponent(slug)}`);
}

// Get categories for published articles.
export function getBlogCategories() {
  return request(`${BLOG_API}/categories`);
}

// Get all posts, including drafts (admin only).
export function getAdminBlogs() {
  return request(`${BLOG_API}/admin`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
    },
  });
}

// Create a blog post (admin only).
export function createBlog(blogData) {
  return request(`${BLOG_API}/admin`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
    },
    body: JSON.stringify(blogData),
  });
}

// Update a blog post (admin only).
export function updateBlog(id, blogData) {
  return request(`${BLOG_API}/admin/${encodeURIComponent(id)}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
    },
    body: JSON.stringify(blogData),
  });
}

// Delete a blog post (admin only).
export function deleteBlog(id) {
  return request(`${BLOG_API}/admin/${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
    },
  });
}

export default {
  getBlogs,
  getBlogBySlug,
  getBlogCategories,
  getAdminBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
};