import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  Send,
  Image as ImageIcon,
  Upload,
  X,
  Star,
  Search,
  FileText,
  Trash2,
} from "lucide-react";

const categories = [
  "Electrical",
  "Plumbing",
  "AC & Cooling",
  "Cleaning",
  "Security",
  "Painting",
  "Home Maintenance",
  "Home Improvement",
  "Other",
];

/*
  TEMPORARY MOCK DATA

  Later this will come from:
  GET /api/admin/blog/:id
*/
const mockArticles = [
  {
    id: 1,
    title: "10 Electrical Safety Tips Every Homeowner Should Know",
    slug: "10-electrical-safety-tips-every-homeowner-should-know",
    category: "Electrical",
    excerpt:
      "Learn practical electrical safety tips that every homeowner should follow.",
    content: `
      <h2>Why Electrical Safety Matters</h2>
      <p>
        Electrical safety is an important part of maintaining a safe home.
        Small electrical problems can become serious if they are ignored.
      </p>

      <h3>1. Check Damaged Wires</h3>
      <p>
        Never ignore exposed, damaged or overheated electrical wires.
      </p>

      <h3>2. Avoid Overloading Sockets</h3>
      <p>
        Connecting too many high-power appliances to one socket can create
        excessive electrical load.
      </p>

      <h3>3. Hire a Qualified Electrician</h3>
      <p>
        Electrical installation and repair work should be handled by a
        qualified professional.
      </p>
    `,
    seoTitle:
      "10 Electrical Safety Tips Every Homeowner Should Know",
    metaDescription:
      "Discover important electrical safety tips to help keep your home and family safe from common electrical hazards.",
    tags: "electrical safety, electrician, home safety",
    featured: true,
    status: "Published",
    image:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    title: "How to Prevent Plumbing Problems at Home",
    slug: "how-to-prevent-plumbing-problems-at-home",
    category: "Plumbing",
    excerpt:
      "Simple maintenance habits that can help prevent common plumbing problems.",
    content:
      "<h2>Preventing Plumbing Problems</h2><p>Regular plumbing maintenance can prevent expensive repairs.</p>",
    seoTitle: "How to Prevent Plumbing Problems at Home",
    metaDescription:
      "Learn simple plumbing maintenance tips that can help prevent leaks, blockages and other common household plumbing problems.",
    tags: "plumbing, plumbing tips, home maintenance",
    featured: false,
    status: "Published",
    image:
      "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function EditArticle() {
  const navigate = useNavigate();
  const { id } = useParams();

  const fileInputRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [articleNotFound, setArticleNotFound] = useState(false);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    category: "Home Maintenance",
    excerpt: "",
    content: "",
    seoTitle: "",
    metaDescription: "",
    tags: "",
    featured: false,
    status: "Draft",
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  /*
    Load article.

    TEMPORARY:
    Uses mockArticles.

    LATER:
    Replace with axios GET request.
  */
  useEffect(() => {
    const article = mockArticles.find(
      (item) => String(item.id) === String(id)
    );

    if (!article) {
      setArticleNotFound(true);
      setLoading(false);
      return;
    }

    setForm({
      title: article.title || "",
      slug: article.slug || "",
      category: article.category || "Home Maintenance",
      excerpt: article.excerpt || "",
      content: article.content || "",
      seoTitle: article.seoTitle || "",
      metaDescription: article.metaDescription || "",
      tags: article.tags || "",
      featured: Boolean(article.featured),
      status: article.status || "Draft",
    });

    setImagePreview(article.image || "");

    setLoading(false);
  }, [id]);

  const characterCount = useMemo(
    () => form.metaDescription.length,
    [form.metaDescription]
  );

  const updateField = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((current) => ({
        ...current,
        [field]: "",
      }));
    }
  };

  const generateSlug = (value) => {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const handleTitleChange = (value) => {
    setForm((current) => ({
      ...current,
      title: value,
    }));

    if (errors.title) {
      setErrors((current) => ({
        ...current,
        title: "",
      }));
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrors((current) => ({
        ...current,
        image: "Please select a valid image.",
      }));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors((current) => ({
        ...current,
        image: "Image must be smaller than 5 MB.",
      }));
      return;
    }

    setImage(file);
    setImagePreview(URL.createObjectURL(file));

    setErrors((current) => ({
      ...current,
      image: "",
    }));
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.title.trim()) {
      newErrors.title = "Article title is required.";
    }

    if (!form.slug.trim()) {
      newErrors.slug = "URL slug is required.";
    }

    if (!form.category) {
      newErrors.category = "Category is required.";
    }

    if (!form.excerpt.trim()) {
      newErrors.excerpt = "Short description is required.";
    }

    if (!form.content.trim()) {
      newErrors.content = "Article content is required.";
    }

    if (form.metaDescription.length > 160) {
      newErrors.metaDescription =
        "Meta description must be 160 characters or less.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const saveArticle = async (newStatus) => {
    if (!validateForm()) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    setSaving(true);

    const updatedArticle = {
      id,
      ...form,
      status: newStatus,
      image: imagePreview,
      tags: form.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    };

    console.log("UPDATED ARTICLE:", updatedArticle);

    /*
      TEMPORARY

      Backend integration will replace this with:

      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("slug", form.slug);
      formData.append("category", form.category);
      formData.append("excerpt", form.excerpt);
      formData.append("content", form.content);
      formData.append("seoTitle", form.seoTitle);
      formData.append(
        "metaDescription",
        form.metaDescription
      );
      formData.append("tags", form.tags);
      formData.append("featured", form.featured);
      formData.append("status", newStatus);

      if (image) {
        formData.append("image", image);
      }

      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/admin/blog/${id}`,
        formData
      );
    */

    setTimeout(() => {
      setSaving(false);

      alert(
        newStatus === "Published"
          ? "Article updated and published successfully!"
          : "Article updated and saved as draft!"
      );

      navigate("/admin/blog");
    }, 500);
  };

  const deleteArticle = async () => {
    setSaving(true);

    console.log("DELETE ARTICLE:", id);

    /*
      LATER:

      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/admin/blog/${id}`
      );
    */

    setTimeout(() => {
      setSaving(false);
      setShowDeleteModal(false);

      alert("Article deleted successfully.");

      navigate("/admin/blog");
    }, 500);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />

          <p className="mt-4 text-sm text-gray-500">
            Loading article...
          </p>
        </div>
      </div>
    );
  }

  if (articleNotFound) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <FileText className="mx-auto h-12 w-12 text-gray-300" />

          <h1 className="mt-4 text-xl font-bold text-gray-900">
            Article Not Found
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            The article you are trying to edit could not be found.
          </p>

          <button
            onClick={() => navigate("/admin/blog")}
            className="mt-6 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Back to Blog Management
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-30 border-b border-gray-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <button
              onClick={() => navigate("/admin/blog")}
              className="rounded-xl p-2 text-gray-600 hover:bg-gray-100"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>

            <div className="min-w-0">
              <h1 className="truncate text-lg font-bold text-gray-900 md:text-xl">
                Edit Article
              </h1>

              <p className="hidden text-xs text-gray-500 sm:block">
                Update your ServoraCare blog article
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => setShowPreview(true)}
              className="hidden items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 sm:flex"
            >
              <EyeIcon />
              Preview
            </button>

            <button
              type="button"
              disabled={saving}
              onClick={() => saveArticle("Draft")}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save className="h-4 w-4" />

              <span className="hidden sm:inline">
                Save Draft
              </span>
            </button>

            <button
              type="button"
              disabled={saving}
              onClick={() => saveArticle("Published")}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Send className="h-4 w-4" />
              Publish
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:py-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          {/* Main Column */}
          <div className="space-y-6">
            {/* Article Information */}
            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">
              <SectionHeading
                icon={<FileText className="h-5 w-5" />}
                title="Article Information"
                description="Update the main information of your article."
              />

              <div className="mt-6 space-y-5">
                <FormField
                  label="Article Title"
                  required
                  error={errors.title}
                >
                  <input
                    value={form.title}
                    onChange={(e) =>
                      handleTitleChange(e.target.value)
                    }
                    className={inputClass(errors.title)}
                  />
                </FormField>

                <FormField
                  label="URL Slug"
                  required
                  error={errors.slug}
                  hint="This becomes the public article URL."
                >
                  <div className="flex overflow-hidden rounded-xl border border-gray-200 bg-gray-50 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
                    <span className="hidden items-center border-r border-gray-200 px-3 text-xs text-gray-400 sm:flex">
                      /blog/
                    </span>

                    <input
                      value={form.slug}
                      onChange={(e) =>
                        updateField(
                          "slug",
                          generateSlug(e.target.value)
                        )
                      }
                      className="w-full bg-transparent px-4 py-3 text-sm outline-none"
                    />
                  </div>
                </FormField>

                <FormField
                  label="Category"
                  required
                  error={errors.category}
                >
                  <select
                    value={form.category}
                    onChange={(e) =>
                      updateField("category", e.target.value)
                    }
                    className={inputClass(errors.category)}
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </FormField>

                <FormField
                  label="Short Description"
                  required
                  error={errors.excerpt}
                >
                  <textarea
                    value={form.excerpt}
                    onChange={(e) =>
                      updateField("excerpt", e.target.value)
                    }
                    rows={4}
                    maxLength={300}
                    className={inputClass(errors.excerpt)}
                  />

                  <p className="mt-1 text-right text-xs text-gray-400">
                    {form.excerpt.length}/300
                  </p>
                </FormField>
              </div>
            </section>

            {/* Content */}
            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">
              <SectionHeading
                icon={<FileText className="h-5 w-5" />}
                title="Article Content"
                description="Edit the complete article."
              />

              <div className="mt-6">
                <FormField
                  label="Content"
                  required
                  error={errors.content}
                >
                  <div
                    className={`overflow-hidden rounded-xl border ${
                      errors.content
                        ? "border-red-300"
                        : "border-gray-200"
                    }`}
                  >
                    <div className="flex flex-wrap gap-1 border-b border-gray-200 bg-gray-50 p-2">
                      <ToolbarButton
                        label="B"
                        onClick={() =>
                          addHTML(
                            form.content,
                            updateField,
                            "<strong>",
                            "</strong>"
                          )
                        }
                      />

                      <ToolbarButton
                        label="I"
                        onClick={() =>
                          addHTML(
                            form.content,
                            updateField,
                            "<em>",
                            "</em>"
                          )
                        }
                      />

                      <ToolbarButton
                        label="H2"
                        onClick={() =>
                          addHTML(
                            form.content,
                            updateField,
                            "<h2>",
                            "</h2>"
                          )
                        }
                      />

                      <ToolbarButton
                        label="H3"
                        onClick={() =>
                          addHTML(
                            form.content,
                            updateField,
                            "<h3>",
                            "</h3>"
                          )
                        }
                      />

                      <ToolbarButton
                        label="• List"
                        onClick={() =>
                          addHTML(
                            form.content,
                            updateField,
                            "<ul><li>",
                            "</li></ul>"
                          )
                        }
                      />

                      <ToolbarButton
                        label="1. List"
                        onClick={() =>
                          addHTML(
                            form.content,
                            updateField,
                            "<ol><li>",
                            "</li></ol>"
                          )
                        }
                      />

                      <ToolbarButton
                        label="Quote"
                        onClick={() =>
                          addHTML(
                            form.content,
                            updateField,
                            "<blockquote>",
                            "</blockquote>"
                          )
                        }
                      />
                    </div>

                    <textarea
                      value={form.content}
                      onChange={(e) =>
                        updateField("content", e.target.value)
                      }
                      rows={20}
                      className="w-full resize-y px-4 py-4 text-sm leading-7 outline-none"
                    />
                  </div>
                </FormField>
              </div>
            </section>

            {/* SEO */}
            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">
              <SectionHeading
                icon={<Search className="h-5 w-5" />}
                title="SEO Settings"
                description="Improve how this article appears in search engines."
              />

              <div className="mt-6 space-y-5">
                <FormField
                  label="SEO Title"
                  hint="Recommended: 50–60 characters."
                >
                  <input
                    value={form.seoTitle}
                    onChange={(e) =>
                      updateField("seoTitle", e.target.value)
                    }
                    maxLength={70}
                    className={inputClass()}
                  />

                  <p className="mt-1 text-right text-xs text-gray-400">
                    {form.seoTitle.length}/70
                  </p>
                </FormField>

                <FormField
                  label="Meta Description"
                  error={errors.metaDescription}
                  hint="Recommended: 150–160 characters."
                >
                  <textarea
                    value={form.metaDescription}
                    onChange={(e) =>
                      updateField(
                        "metaDescription",
                        e.target.value
                      )
                    }
                    rows={4}
                    maxLength={160}
                    className={inputClass(
                      errors.metaDescription
                    )}
                  />

                  <p className="mt-1 text-right text-xs text-gray-400">
                    {characterCount}/160
                  </p>
                </FormField>

                <FormField
                  label="Tags"
                  hint="Separate each tag using a comma."
                >
                  <input
                    value={form.tags}
                    onChange={(e) =>
                      updateField("tags", e.target.value)
                    }
                    placeholder="electrical safety, electrician, home safety"
                    className={inputClass()}
                  />
                </FormField>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Article Options */}
            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <SectionHeading
                icon={<Star className="h-5 w-5" />}
                title="Article Options"
                description="Control article visibility."
              />

              <label className="mt-5 flex cursor-pointer items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-4">
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Featured Article
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Highlight this article on the blog.
                  </p>
                </div>

                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) =>
                    updateField("featured", e.target.checked)
                  }
                  className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </label>

              <div className="mt-4 rounded-xl border border-gray-200 p-4">
                <p className="text-xs font-medium text-gray-500">
                  Current Status
                </p>

                <div className="mt-2 flex items-center justify-between">
                  <StatusBadge status={form.status} />

                  <span className="text-xs text-gray-400">
                    {form.status === "Published"
                      ? "Live on website"
                      : "Not publicly visible"}
                  </span>
                </div>
              </div>
            </section>

            {/* Image */}
            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <SectionHeading
                icon={<ImageIcon className="h-5 w-5" />}
                title="Featured Image"
                description="Recommended: 1200 × 630 px."
              />

              <div className="mt-5">
                {imagePreview ? (
                  <div className="relative overflow-hidden rounded-xl border border-gray-200">
                    <img
                      src={imagePreview}
                      alt={form.title}
                      className="aspect-video w-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute right-2 top-2 rounded-full bg-black/70 p-2 text-white hover:bg-black"
                      title="Remove image"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      fileInputRef.current?.click()
                    }
                    className="flex aspect-video w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 text-center hover:border-blue-400 hover:bg-blue-50"
                  >
                    <Upload className="h-6 w-6 text-blue-600" />

                    <p className="mt-3 text-sm font-semibold text-gray-800">
                      Upload New Image
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      JPG, PNG or WebP • Max 5 MB
                    </p>
                  </button>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleImageChange}
                  className="hidden"
                />

                {errors.image && (
                  <p className="mt-2 text-xs text-red-600">
                    {errors.image}
                  </p>
                )}
              </div>
            </section>

            {/* Google Preview */}
            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2">
                <Search className="h-5 w-5 text-blue-600" />

                <h3 className="font-semibold text-gray-900">
                  Google Preview
                </h3>
              </div>

              <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
                <p className="truncate text-xs text-green-700">
                  servoracare.in › blog ›{" "}
                  {form.slug || "article-slug"}
                </p>

                <h4 className="mt-1 line-clamp-2 text-base font-medium text-blue-700">
                  {form.seoTitle ||
                    form.title ||
                    "Article SEO Title"}
                </h4>

                <p className="mt-1 line-clamp-3 text-xs leading-5 text-gray-600">
                  {form.metaDescription ||
                    form.excerpt ||
                    "Article meta description"}
                </p>
              </div>
            </section>

            {/* Danger Zone */}
            <section className="rounded-2xl border border-red-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2">
                <Trash2 className="h-5 w-5 text-red-600" />

                <h3 className="font-semibold text-gray-900">
                  Danger Zone
                </h3>
              </div>

              <p className="mt-2 text-xs leading-5 text-gray-500">
                Deleting this article permanently removes it from
                the blog.
              </p>

              <button
                type="button"
                onClick={() => setShowDeleteModal(true)}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
                Delete Article
              </button>
            </section>
          </aside>
        </div>
      </main>

      {/* Preview */}
      {showPreview && (
        <ArticlePreview
          form={form}
          imagePreview={imagePreview}
          onClose={() => setShowPreview(false)}
        />
      )}

      {/* Delete Confirmation */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <Trash2 className="h-6 w-6 text-red-600" />
            </div>

            <h2 className="mt-4 text-center text-xl font-bold text-gray-900">
              Delete Article?
            </h2>

            <p className="mt-2 text-center text-sm text-gray-500">
              This will permanently delete:
            </p>

            <p className="mt-2 text-center font-semibold text-gray-900">
              "{form.title}"
            </p>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                disabled={saving}
                className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={deleteArticle}
                disabled={saving}
                className="flex-1 rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60"
              >
                {saving ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* -------------------------------- */
/* Components */
/* -------------------------------- */

function SectionHeading({ icon, title, description }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
        {icon}
      </div>

      <div>
        <h2 className="font-semibold text-gray-900">
          {title}
        </h2>

        <p className="mt-0.5 text-xs text-gray-500">
          {description}
        </p>
      </div>
    </div>
  );
}

function FormField({
  label,
  required,
  error,
  hint,
  children,
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="text-sm font-semibold text-gray-800">
          {label}

          {required && (
            <span className="ml-1 text-red-500">*</span>
          )}
        </label>

        {hint && (
          <span className="hidden text-xs text-gray-400 md:block">
            {hint}
          </span>
        )}
      </div>

      {children}

      {hint && (
        <p className="mt-1 text-xs text-gray-400 md:hidden">
          {hint}
        </p>
      )}

      {error && (
        <p className="mt-1 text-xs text-red-600">{error}</p>
      )}
    </div>
  );
}

function ToolbarButton({ label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-lg px-3 py-2 text-xs font-semibold text-gray-600 hover:bg-white hover:text-blue-600"
    >
      {label}
    </button>
  );
}

function StatusBadge({ status }) {
  const published = status === "Published";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
        published
          ? "bg-green-50 text-green-700"
          : "bg-yellow-50 text-yellow-700"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          published ? "bg-green-500" : "bg-yellow-500"
        }`}
      />

      {status}
    </span>
  );
}

function EyeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-4 w-4"
    >
      <path d="M2.062 12.348a1 1 0 0 1 0-.696C3.423 7.27 7.356 4 12 4c4.644 0 8.577 3.27 9.938 7.652a1 1 0 0 1 0 .696C20.577 16.73 16.644 20 12 20c-4.644 0-8.577-3.27-9.938-7.652Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function inputClass(error) {
  return `w-full rounded-xl border ${
    error ? "border-red-300" : "border-gray-200"
  } bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100`;
}

function addHTML(
  currentValue,
  updateField,
  startTag,
  endTag
) {
  const value = `${currentValue}${
    currentValue ? "\n\n" : ""
  }${startTag}Write your content here${endTag}`;

  updateField("content", value);
}

function ArticlePreview({
  form,
  imagePreview,
  onClose,
}) {
  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-black/60 p-4">
      <div className="mx-auto my-6 max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <h2 className="font-bold text-gray-900">
            Article Preview
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <article className="p-5 md:p-10">
          {imagePreview && (
            <img
              src={imagePreview}
              alt={form.title}
              className="mb-8 aspect-[16/8] w-full rounded-2xl object-cover"
            />
          )}

          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            {form.category}
          </span>

          <h1 className="mt-5 text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
            {form.title}
          </h1>

          <p className="mt-4 text-lg leading-8 text-gray-600">
            {form.excerpt}
          </p>

          <div
            className="prose mt-8 max-w-none"
            dangerouslySetInnerHTML={{
              __html:
                form.content ||
                "<p>No article content yet.</p>",
            }}
          />
        </article>
      </div>
    </div>
  );
}