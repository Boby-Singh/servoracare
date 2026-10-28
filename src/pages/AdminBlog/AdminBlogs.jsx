
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  RefreshCw,
} from "lucide-react";
import {
  getAdminBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../../services/blogService";
const API_BASE = (
  import.meta.env.VITE_API_URL ||
  "https://servoracare-backend.onrender.com/api"
).replace(/\/+$/, "");

const BLOG_API = API_BASE.endsWith("/api")
  ? `${API_BASE}/blog`
  : `${API_BASE}/api/blog`;

const EMPTY_FORM = {
  title: "",
  excerpt: "",
  content: "",
  coverImage: "",
  category: "Home Maintenance",
  tags: "",
  author: "ServoraCare Team",
  featured: false,
  status: "draft",
  metaTitle: "",
  metaDescription: "",
};

const CATEGORIES = [
  "Home Maintenance",
  "Electrical",
  "Plumbing",
  "AC Repair",
  "Cleaning",
  "CCTV & Security",
  "Painting",
  "Home Improvement",
  "ServoraCare Updates",
];

export default function AdminBlogs() {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const getToken = () => localStorage.getItem("token");

  const apiRequest = async (url, options = {}) => {
    const token = getToken();

    if (!token) {
      throw new Error("Please sign in as an administrator.");
    }

    const response = await fetch(url, {
      ...options,
      headers: {
        ...(options.body ? { "Content-Type": "application/json" } : {}),
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.message || "Request failed.");
    }

    return data;
  };

  const loadPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await apiRequest(`${BLOG_API}/admin`);
      setPosts(Array.isArray(data.posts) ? data.posts : []);
    } catch (err) {
      setError(err.message || "Unable to load blog posts.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const updateField = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setError("");
    setNotice("");
  };

  const editPost = (post) => {
    setEditingId(post._id);
    setNotice("");
    setError("");

    setForm({
      title: post.title || "",
      excerpt: post.excerpt || "",
      content: post.content || "",
      coverImage: post.coverImage || "",
      category: post.category || "Home Maintenance",
      tags: (post.tags || []).join(", "),
      author: post.author || "ServoraCare Team",
      featured: Boolean(post.featured),
      status: post.status || "draft",
      metaTitle: post.metaTitle || "",
      metaDescription: post.metaDescription || "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submitForm = async (event) => {
    event.preventDefault();
    setError("");
    setNotice("");

    try {
      setSaving(true);

      const payload = {
        ...form,
        tags: form.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      };

      const url = editingId
        ? `${BLOG_API}/admin/${editingId}`
        : `${BLOG_API}/admin`;

      const data = await apiRequest(url, {
        method: editingId ? "PUT" : "POST",
        body: JSON.stringify(payload),
      });

      setNotice(data.message || "Article saved successfully.");
      setForm(EMPTY_FORM);
      setEditingId(null);

      await loadPosts();
    } catch (err) {
      setError(err.message || "Unable to save article.");
    } finally {
      setSaving(false);
    }
  };

  const togglePublish = async (post) => {
    const nextStatus =
      post.status === "published" ? "draft" : "published";

    const confirmed = window.confirm(
      nextStatus === "published"
        ? `Publish "${post.title}"?`
        : `Unpublish "${post.title}"?`
    );

    if (!confirmed) return;

    setError("");
    setNotice("");

    try {
      const data = await apiRequest(`${BLOG_API}/admin/${post._id}`, {
        method: "PUT",
        body: JSON.stringify({ status: nextStatus }),
      });

      setNotice(data.message || "Article status updated.");
      await loadPosts();
    } catch (err) {
      setError(err.message || "Unable to update status.");
    }
  };

  const deletePost = async (post) => {
    const confirmed = window.confirm(
      `Permanently delete "${post.title}"? This cannot be undone.`
    );

    if (!confirmed) return;

    setError("");
    setNotice("");

    try {
      const data = await apiRequest(`${BLOG_API}/admin/${post._id}`, {
        method: "DELETE",
      });

      setNotice(data.message || "Article deleted.");

      if (editingId === post._id) resetForm();

      await loadPosts();
    } catch (err) {
      setError(err.message || "Unable to delete article.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">
              Blog Management
            </h1>
            <p className="mt-2 text-gray-600">
              Create articles, manage drafts, and publish home care guides.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={loadPosts}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 font-semibold text-gray-700 hover:bg-gray-50"
            >
              <RefreshCw size={17} />
              Refresh
            </button>

            <button
              type="button"
              onClick={resetForm}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-4 py-3 font-semibold text-white hover:bg-blue-800"
            >
              <Plus size={17} />
              New article
            </button>
          </div>
        </div>

        {error && (
          <div
            className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-red-800"
            role="alert"
          >
            {error}
          </div>
        )}

        {notice && (
          <div
            className="mb-5 rounded-xl border border-green-200 bg-green-50 p-4 text-green-800"
            role="status"
          >
            {notice}
          </div>
        )}

        <section className="mb-10 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
          <h2 className="mb-6 text-xl font-bold">
            {editingId ? "Edit article" : "Create article"}
          </h2>

          <form onSubmit={submitForm} className="space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold" htmlFor="title">
                  Article title *
                </label>
                <input
                  id="title"
                  name="title"
                  value={form.title}
                  onChange={updateField}
                  maxLength={200}
                  required
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  placeholder="10 Electrical Safety Tips Every Homeowner Should Know"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold" htmlFor="category">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={form.category}
                  onChange={updateField}
                  required
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3"
                >
                  {CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold" htmlFor="excerpt">
                Short description *
              </label>
              <textarea
                id="excerpt"
                name="excerpt"
                value={form.excerpt}
                onChange={updateField}
                maxLength={500}
                rows={3}
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3"
                placeholder="Briefly describe what readers will learn."
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold" htmlFor="content">
                Article content *
              </label>
              <textarea
                id="content"
                name="content"
                value={form.content}
                onChange={updateField}
                rows={14}
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 leading-7"
                placeholder={"Write your complete article here.\n\nUse blank lines to separate paragraphs."}
              />
              <p className="mt-2 text-xs text-gray-500">
                This editor saves plain text with paragraph breaks.
              </p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold" htmlFor="coverImage">
                Cover image URL
              </label>
              <input
                id="coverImage"
                name="coverImage"
                type="url"
                value={form.coverImage}
                onChange={updateField}
                className="w-full rounded-xl border border-gray-300 px-4 py-3"
                placeholder="https://example.com/article-cover.jpg"
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold" htmlFor="tags">
                  Tags
                </label>
                <input
                  id="tags"
                  name="tags"
                  value={form.tags}
                  onChange={updateField}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3"
                  placeholder="electrical, safety, home"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold" htmlFor="author">
                  Author
                </label>
                <input
                  id="author"
                  name="author"
                  value={form.author}
                  onChange={updateField}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3"
                />
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold" htmlFor="metaTitle">
                  SEO title
                </label>
                <input
                  id="metaTitle"
                  name="metaTitle"
                  value={form.metaTitle}
                  onChange={updateField}
                  maxLength={200}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3"
                  placeholder="Optional search-engine title"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold" htmlFor="metaDescription">
                  SEO description
                </label>
                <textarea
                  id="metaDescription"
                  name="metaDescription"
                  value={form.metaDescription}
                  onChange={updateField}
                  maxLength={320}
                  rows={2}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3"
                  placeholder="Optional search-engine description"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6">
              <label className="flex items-center gap-2 text-sm font-medium">
                <input
                  type="checkbox"
                  name="featured"
                  checked={form.featured}
                  onChange={updateField}
                  className="h-4 w-4"
                />
                Feature this article
              </label>

              <label className="flex items-center gap-3 text-sm font-medium">
                Status
                <select
                  name="status"
                  value={form.status}
                  onChange={updateField}
                  className="rounded-lg border border-gray-300 bg-white px-3 py-2"
                >
                  <option value="draft">Save as draft</option>
                  <option value="published">Publish now</option>
                </select>
              </label>
            </div>

            <div className="flex flex-wrap gap-3 border-t border-gray-100 pt-5">
              <button
                type="submit"
                disabled={saving}
                className="rounded-xl bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800 disabled:opacity-60"
              >
                {saving
                  ? "Saving..."
                  : editingId
                    ? "Update article"
                    : "Create article"}
              </button>

              <button
                type="button"
                onClick={resetForm}
                className="rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </section>

        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-5 py-4 sm:px-6">
            <h2 className="text-xl font-bold">All articles</h2>
            <p className="mt-1 text-sm text-gray-500">
              {posts.length} total {posts.length === 1 ? "article" : "articles"}
            </p>
          </div>

          {loading ? (
            <p className="p-8 text-center text-gray-600">Loading articles...</p>
          ) : posts.length === 0 ? (
            <p className="p-8 text-center text-gray-600">
              No articles yet. Create your first article above.
            </p>
          ) : (
            <div className="divide-y divide-gray-100">
              {posts.map((post) => (
                <article
                  key={post._id}
                  className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-bold text-gray-900">{post.title}</h3>
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          post.status === "published"
                            ? "bg-green-100 text-green-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {post.status}
                      </span>
                      {post.featured && (
                        <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-800">
                          Featured
                        </span>
                      )}
                    </div>

                    <p className="mt-1 text-sm text-gray-500">
                      {post.category} · Updated{" "}
                      {post.updatedAt
                        ? new Date(post.updatedAt).toLocaleDateString("en-IN")
                        : "—"}
                    </p>

                    {post.status === "published" && (
                      <Link
                        to={`/blog/${post.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 inline-block text-sm font-semibold text-blue-700 hover:underline"
                      >
                        View article
                      </Link>
                    )}
                  </div>

                  <div className="flex shrink-0 flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => editPost(post)}
                      className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-semibold hover:bg-gray-50"
                    >
                      <Pencil size={15} />
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => togglePublish(post)}
                      className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-semibold hover:bg-gray-50"
                    >
                      {post.status === "published" ? (
                        <>
                          <EyeOff size={15} />
                          Unpublish
                        </>
                      ) : (
                        <>
                          <Eye size={15} />
                          Publish
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => deletePost(post)}
                      className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-50"
                    >
                      <Trash2 size={15} />
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
