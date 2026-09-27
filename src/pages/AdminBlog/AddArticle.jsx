import React, { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  Send,
  Image as ImageIcon,
  Upload,
  X,
  Star,
  Eye,
  FileText,
  Tag,
  Search,
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

export default function AddArticle() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

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
  const [showPreview, setShowPreview] = useState(false);

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

  const generateSlug = (title) => {
    return title
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
      slug: current.slug ? current.slug : generateSlug(value),
      seoTitle: current.seoTitle ? current.seoTitle : value,
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
        image: "Please select a valid image file.",
      }));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors((current) => ({
        ...current,
        image: "Image size must be less than 5 MB.",
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
      newErrors.slug = "Slug is required.";
    }

    if (!form.category) {
      newErrors.category = "Please select a category.";
    }

    if (!form.excerpt.trim()) {
      newErrors.excerpt = "Short description is required.";
    }

    if (!form.content.trim()) {
      newErrors.content = "Article content is required.";
    }

    if (form.metaDescription.length > 160) {
      newErrors.metaDescription =
        "Meta description should be 160 characters or less.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const saveArticle = (status) => {
    const valid = validateForm();

    if (!valid) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    const article = {
      id: Date.now(),
      ...form,
      status,
      image: imagePreview,
      author: "ServoraCare",
      date: new Date().toISOString(),
      tags: form.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    };

    console.log("ARTICLE TO SAVE:", article);

    /*
      TEMPORARY LOCAL IMPLEMENTATION

      Backend integration will replace this section with:

      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("slug", form.slug);
      formData.append("category", form.category);
      formData.append("excerpt", form.excerpt);
      formData.append("content", form.content);
      formData.append("seoTitle", form.seoTitle);
      formData.append("metaDescription", form.metaDescription);
      formData.append("tags", form.tags);
      formData.append("featured", form.featured);
      formData.append("status", status);

      if (image) {
        formData.append("image", image);
      }

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/admin/blog`,
        formData
      );
    */

    alert(
      status === "Published"
        ? "Article published successfully!"
        : "Article saved as draft!"
    );

    navigate("/admin/blog");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-30 border-b border-gray-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/admin/blog")}
              className="rounded-xl p-2 text-gray-600 transition hover:bg-gray-100"
              title="Back"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>

            <div>
              <h1 className="text-lg font-bold text-gray-900 md:text-xl">
                Add New Article
              </h1>

              <p className="hidden text-xs text-gray-500 sm:block">
                Create a professional ServoraCare blog article
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowPreview(true)}
              className="hidden items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 sm:flex"
            >
              <Eye className="h-4 w-4" />
              Preview
            </button>

            <button
              type="button"
              onClick={() => saveArticle("Draft")}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              <Save className="h-4 w-4" />
              <span className="hidden sm:inline">Save Draft</span>
              <span className="sm:hidden">Save</span>
            </button>

            <button
              type="button"
              onClick={() => saveArticle("Published")}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              <Send className="h-4 w-4" />
              Publish
            </button>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:py-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          {/* Main Editor */}
          <div className="space-y-6">
            {/* Basic Information */}
            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">
              <SectionHeading
                icon={<FileText className="h-5 w-5" />}
                title="Article Information"
                description="Add the main information for your article."
              />

              <div className="mt-6 space-y-5">
                {/* Title */}
                <FormField
                  label="Article Title"
                  required
                  error={errors.title}
                >
                  <input
                    value={form.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. 10 Electrical Safety Tips Every Homeowner Should Know"
                    className={inputClass(errors.title)}
                  />
                </FormField>

                {/* Slug */}
                <FormField
                  label="URL Slug"
                  required
                  error={errors.slug}
                  hint="Used in the article URL."
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
                      placeholder="your-article-slug"
                      className="w-full bg-transparent px-4 py-3 text-sm outline-none"
                    />
                  </div>
                </FormField>

                {/* Category */}
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
                    {categories.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </FormField>

                {/* Excerpt */}
                <FormField
                  label="Short Description"
                  required
                  error={errors.excerpt}
                  hint="A short summary displayed on blog cards and search results."
                >
                  <textarea
                    value={form.excerpt}
                    onChange={(e) =>
                      updateField("excerpt", e.target.value)
                    }
                    rows={4}
                    maxLength={300}
                    placeholder="Write a short, engaging description of your article..."
                    className={inputClass(errors.excerpt)}
                  />

                  <div className="mt-1 text-right text-xs text-gray-400">
                    {form.excerpt.length}/300
                  </div>
                </FormField>
              </div>
            </section>

            {/* Content Editor */}
            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">
              <SectionHeading
                icon={<FileText className="h-5 w-5" />}
                title="Article Content"
                description="Write the complete article content."
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
                    {/* Toolbar */}
                    <div className="flex flex-wrap items-center gap-1 border-b border-gray-200 bg-gray-50 p-2">
                      <EditorButton
                        label="B"
                        title="Bold"
                        onClick={() =>
                          insertFormatting(
                            "content",
                            form.content,
                            updateField,
                            "<strong>",
                            "</strong>"
                          )
                        }
                      />

                      <EditorButton
                        label="I"
                        title="Italic"
                        onClick={() =>
                          insertFormatting(
                            "content",
                            form.content,
                            updateField,
                            "<em>",
                            "</em>"
                          )
                        }
                      />

                      <EditorButton
                        label="H2"
                        title="Heading"
                        onClick={() =>
                          insertFormatting(
                            "content",
                            form.content,
                            updateField,
                            "<h2>",
                            "</h2>"
                          )
                        }
                      />

                      <EditorButton
                        label="H3"
                        title="Subheading"
                        onClick={() =>
                          insertFormatting(
                            "content",
                            form.content,
                            updateField,
                            "<h3>",
                            "</h3>"
                          )
                        }
                      />

                      <EditorButton
                        label="• List"
                        title="Bullet List"
                        onClick={() =>
                          insertFormatting(
                            "content",
                            form.content,
                            updateField,
                            "<ul><li>",
                            "</li></ul>"
                          )
                        }
                      />

                      <EditorButton
                        label="1. List"
                        title="Numbered List"
                        onClick={() =>
                          insertFormatting(
                            "content",
                            form.content,
                            updateField,
                            "<ol><li>",
                            "</li></ol>"
                          )
                        }
                      />

                      <EditorButton
                        label='"Quote"'
                        title="Quote"
                        onClick={() =>
                          insertFormatting(
                            "content",
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
                      rows={18}
                      placeholder={`Start writing your article here...

Example:

<h2>Why Electrical Safety Matters</h2>

<p>Electrical safety is an important part of maintaining a safe home...</p>

<h3>1. Check Damaged Wires</h3>

<p>Never ignore exposed or damaged electrical wires...</p>`}
                      className="w-full resize-y px-4 py-4 text-sm leading-7 outline-none"
                    />
                  </div>
                </FormField>

                <p className="mt-2 text-xs text-gray-400">
                  The editor currently supports basic HTML formatting.
                  We will replace this with a full rich-text editor in the
                  next step.
                </p>
              </div>
            </section>

            {/* SEO */}
            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">
              <SectionHeading
                icon={<Search className="h-5 w-5" />}
                title="SEO Settings"
                description="Optimize this article for Google and other search engines."
              />

              <div className="mt-6 space-y-5">
                <FormField
                  label="SEO Title"
                  hint="Recommended: around 50–60 characters."
                >
                  <input
                    value={form.seoTitle}
                    onChange={(e) =>
                      updateField("seoTitle", e.target.value)
                    }
                    maxLength={70}
                    placeholder="SEO optimized article title"
                    className={inputClass()}
                  />

                  <div className="mt-1 text-right text-xs text-gray-400">
                    {form.seoTitle.length}/70
                  </div>
                </FormField>

                <FormField
                  label="Meta Description"
                  error={errors.metaDescription}
                  hint="Recommended: around 150–160 characters."
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
                    placeholder="Write a compelling description for Google search results..."
                    className={inputClass(errors.metaDescription)}
                  />

                  <div
                    className={`mt-1 text-right text-xs ${
                      characterCount > 160
                        ? "text-red-500"
                        : "text-gray-400"
                    }`}
                  >
                    {characterCount}/160
                  </div>
                </FormField>

                <FormField
                  label="Tags"
                  hint="Separate tags using commas."
                >
                  <div className="relative">
                    <Tag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                    <input
                      value={form.tags}
                      onChange={(e) =>
                        updateField("tags", e.target.value)
                      }
                      placeholder="electrical safety, home safety, electrician"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </FormField>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Featured */}
            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <SectionHeading
                icon={<Star className="h-5 w-5" />}
                title="Article Options"
                description="Control how this article appears."
              />

              <label className="mt-5 flex cursor-pointer items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-4">
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Featured Article
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Show this article prominently on the blog.
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
            </section>

            {/* Featured Image */}
            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <SectionHeading
                icon={<ImageIcon className="h-5 w-5" />}
                title="Featured Image"
                description="Recommended image size: 1200 × 630 px."
              />

              <div className="mt-5">
                {imagePreview ? (
                  <div className="relative overflow-hidden rounded-xl border border-gray-200">
                    <img
                      src={imagePreview}
                      alt="Article preview"
                      className="aspect-video w-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute right-2 top-2 rounded-full bg-black/70 p-2 text-white transition hover:bg-black"
                      title="Remove image"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex aspect-video w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 px-4 text-center transition hover:border-blue-400 hover:bg-blue-50"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                      <Upload className="h-5 w-5" />
                    </div>

                    <p className="mt-3 text-sm font-semibold text-gray-800">
                      Upload Featured Image
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      JPG, PNG or WebP
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      Maximum 5 MB
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

            {/* Publishing */}
            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <SectionHeading
                icon={<Send className="h-5 w-5" />}
                title="Publishing"
                description="Choose how to save the article."
              />

              <div className="mt-5 space-y-3">
                <button
                  type="button"
                  onClick={() => saveArticle("Draft")}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  <Save className="h-4 w-4" />
                  Save as Draft
                </button>

                <button
                  type="button"
                  onClick={() => saveArticle("Published")}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  <Send className="h-4 w-4" />
                  Publish Article
                </button>
              </div>
            </section>

            {/* SEO Preview */}
            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2">
                <Search className="h-5 w-5 text-blue-600" />

                <h3 className="font-semibold text-gray-900">
                  Google Preview
                </h3>
              </div>

              <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
                <p className="truncate text-sm text-green-700">
                  servoracare.in › blog ›{" "}
                  {form.slug || "article-slug"}
                </p>

                <h4 className="mt-1 line-clamp-2 text-base font-medium text-blue-700">
                  {form.seoTitle ||
                    form.title ||
                    "Your Article SEO Title"}
                </h4>

                <p className="mt-1 line-clamp-3 text-xs leading-5 text-gray-600">
                  {form.metaDescription ||
                    form.excerpt ||
                    "Your article meta description will appear here."}
                </p>
              </div>
            </section>
          </aside>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <ArticlePreview
          form={form}
          imagePreview={imagePreview}
          onClose={() => setShowPreview(false)}
        />
      )}
    </div>
  );
}

/* ---------------------------------- */
/* Helper Components */
/* ---------------------------------- */

function SectionHeading({ icon, title, description }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
        {icon}
      </div>

      <div>
        <h2 className="font-semibold text-gray-900">{title}</h2>

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
      <div className="mb-2 flex items-center justify-between gap-3">
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

function EditorButton({ label, title, onClick }) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className="rounded-lg px-3 py-2 text-xs font-semibold text-gray-600 transition hover:bg-white hover:text-blue-600"
    >
      {label}
    </button>
  );
}

function inputClass(error) {
  return `w-full rounded-xl border ${
    error ? "border-red-300" : "border-gray-200"
  } bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100`;
}

function insertFormatting(
  field,
  currentValue,
  updateField,
  startTag,
  endTag
) {
  const newValue = `${currentValue}${currentValue ? "\n\n" : ""}${startTag}Write your content here${endTag}`;

  updateField(field, newValue);
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

        <article className="p-5 md:p-8">
          {imagePreview && (
            <img
              src={imagePreview}
              alt={form.title}
              className="mb-8 aspect-[16/8] w-full rounded-2xl object-cover"
            />
          )}

          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              {form.category}
            </span>

            {form.featured && (
              <span className="flex items-center gap-1 rounded-full bg-yellow-50 px-3 py-1 text-xs font-semibold text-yellow-700">
                <Star className="h-3 w-3 fill-current" />
                Featured
              </span>
            )}
          </div>

          <h1 className="text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
            {form.title || "Your Article Title"}
          </h1>

          <p className="mt-4 text-lg leading-8 text-gray-600">
            {form.excerpt ||
              "Your article short description will appear here."}
          </p>

          <div
            className="prose mt-8 max-w-none"
            dangerouslySetInnerHTML={{
              __html:
                form.content ||
                "<p>Your article content will appear here.</p>",
            }}
          />
        </article>
      </div>
    </div>
  );
}