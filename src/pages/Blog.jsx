
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  Search,
  Sparkles,
  BookOpen,
  X,
} from "lucide-react";
import {
  getBlogs,
  getBlogCategories,
} from "../services/blogService";
const SITE_URL = "https://www.servoracare.in";

const API_BASE = (
  import.meta.env.VITE_API_URL ||
  "https://servoracare-backend.onrender.com/api"
).replace(/\/+$/, "");

const BLOG_API = API_BASE.endsWith("/api")
  ? `${API_BASE}/blog`
  : `${API_BASE}/api/blog`;

const categoryOrder = [
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

function getImage(post) {
  return post.coverImage || post.image || "";
}

function getReadTime(post) {
  if (post.readTime) return post.readTime;

  const words = (post.content || post.excerpt || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return `${Math.max(1, Math.ceil(words / 200))} min read`;
}

function getDate(post) {
  const date = post.publishedAt || post.date;

  if (!date) return "";

  const parsed = new Date(date);

  return Number.isNaN(parsed.getTime())
    ? String(date)
    : parsed.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
}

function ArticleMeta({ post }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500">
      {getDate(post) && (
        <span className="inline-flex items-center gap-1.5">
          <CalendarDays size={14} aria-hidden="true" />
          <time dateTime={post.publishedAt || undefined}>
            {getDate(post)}
          </time>
        </span>
      )}

      <span className="inline-flex items-center gap-1.5">
        <Clock3 size={14} aria-hidden="true" />
        {getReadTime(post)}
      </span>
    </div>
  );
}

function BlogCard({ post }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Link
        to={`/blog/${post.slug}`}
        aria-label={`Read ${post.title}`}
        className="relative block aspect-[16/9] overflow-hidden bg-gray-100"
      >
        {getImage(post) ? (
          <img
            src={getImage(post)}
            alt={post.title}
            loading="lazy"
            decoding="async"
            width="900"
            height="506"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400">
            <BookOpen size={40} />
          </div>
        )}

        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-gray-800 shadow-sm">
          {post.category}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <ArticleMeta post={post} />

        <h3 className="mt-3 text-lg font-bold leading-snug text-gray-900 group-hover:text-blue-700">
          <Link
            to={`/blog/${post.slug}`}
            className="focus-visible:outline-blue-600"
          >
            {post.title}
          </Link>
        </h3>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          {post.excerpt}
        </p>

        <Link
          to={`/blog/${post.slug}`}
          className="mt-auto inline-flex w-fit items-center gap-2 pt-5 text-sm font-semibold text-blue-700 hover:gap-3"
        >
          Read article <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchBlogs() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(BLOG_API, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(
            response.status === 503
              ? "The blog service is temporarily unavailable."
              : "Unable to load articles. Please try again."
          );
        }

        const result = await response.json();
        const posts = Array.isArray(result)
          ? result
          : result.posts || result.blogs || result.data || [];

        if (!Array.isArray(posts)) {
          throw new Error("Invalid response from the blog server.");
        }

        setBlogPosts(posts);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Unable to load articles.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchBlogs();

    return () => controller.abort();
  }, []);

  const categories = useMemo(() => {
    const available = new Set(
      blogPosts.map((post) => post.category).filter(Boolean)
    );

    return [
      "All",
      ...categoryOrder.filter((category) => available.has(category)),
      ...[...available].filter(
        (category) => !categoryOrder.includes(category)
      ),
    ];
  }, [blogPosts]);

  const featuredPost = blogPosts.find((post) => post.featured);

  const filteredPosts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return blogPosts.filter((post) => {
      const matchesCategory =
        activeCategory === "All" || post.category === activeCategory;

      const searchableText = [
        post.title,
        post.excerpt,
        post.category,
        ...(post.tags || []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return matchesCategory && (!query || searchableText.includes(query));
    });
  }, [blogPosts, search, activeCategory]);

  const showFeatured =
    activeCategory === "All" &&
    !search.trim() &&
    Boolean(featuredPost) &&
    filteredPosts.some((post) => post._id === featuredPost._id);

  const latestPosts = showFeatured
    ? filteredPosts.filter((post) => post._id !== featuredPost._id)
    : filteredPosts;

  const clearFilters = () => {
    setSearch("");
    setActiveCategory("All");
  };

  const displayedCount =
    latestPosts.length + (showFeatured ? 1 : 0);

  return (
    <>
      <Helmet>
        <title>ServoraCare Blog | Home Maintenance Tips & Guides</title>
        <meta
          name="description"
          content="Explore practical home maintenance guides, electrical safety advice, plumbing tips, AC care and cleaning guidance from ServoraCare."
        />
        <link rel="canonical" href={`${SITE_URL}/blog`} />
        <meta
          property="og:title"
          content="ServoraCare Blog | Home Maintenance Tips & Guides"
        />
        <meta
          property="og:description"
          content="Practical guides to help you maintain, protect and improve your home."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}/blog`} />
        <meta
          property="og:image"
          content={getImage(featuredPost || {}) || `${SITE_URL}/og-image.jpg`}
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <main className="min-h-screen bg-white text-gray-900">
        <section className="relative overflow-hidden bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-blue-700">
                <Sparkles size={15} aria-hidden="true" />
                ServoraCare Knowledge Centre
              </div>

              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                Smart Tips for a{" "}
                <span className="text-blue-700">Better Home</span>
              </h1>

              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
                Practical home maintenance guides, safety advice and helpful
                information to make caring for your home easier.
              </p>

              <form
                className="mx-auto mt-8 max-w-xl"
                role="search"
                onSubmit={(event) => event.preventDefault()}
              >
                <label htmlFor="blog-search" className="sr-only">
                  Search articles
                </label>

                <div className="relative">
                  <Search
                    size={20}
                    aria-hidden="true"
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="blog-search"
                    type="search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search electrical, plumbing, cleaning..."
                    className="h-14 w-full rounded-2xl border border-gray-200 bg-white pl-12 pr-12 text-sm shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />

                  {search && (
                    <button
                      type="button"
                      onClick={() => setSearch("")}
                      aria-label="Clear search"
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-gray-500 hover:bg-gray-100"
                    >
                      <X size={17} />
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </section>

        <nav
          aria-label="Filter articles by category"
          className="border-b border-gray-100 bg-white"
        >
          <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {categories.map((category) => {
                const active = activeCategory === category;

                return (
                  <button
                    key={category}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setActiveCategory(category)}
                    className={`whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-medium transition ${
                      active
                        ? "bg-blue-700 text-white"
                        : "border border-gray-200 bg-white text-gray-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
        </nav>

        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          {loading && (
            <div className="py-16 text-center" role="status">
              <p className="text-gray-600">Loading articles...</p>
            </div>
          )}

          {!loading && error && (
            <div
              className="rounded-2xl border border-red-200 bg-red-50 px-6 py-10 text-center"
              role="alert"
            >
              <h2 className="text-xl font-bold text-red-800">
                Unable to load articles
              </h2>
              <p className="mt-2 text-sm text-red-700">{error}</p>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-5 rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white"
              >
                Try again
              </button>
            </div>
          )}

          {!loading && !error && blogPosts.length === 0 && (
            <div className="rounded-2xl border border-gray-200 px-6 py-14 text-center">
              <BookOpen size={36} className="mx-auto text-gray-400" />
              <h2 className="mt-4 text-xl font-bold">
                No articles published yet
              </h2>
              <p className="mt-2 text-gray-600">
                Please check back soon for helpful home care guides.
              </p>
            </div>
          )}

          {!loading && !error && blogPosts.length > 0 && (
            <>
              {showFeatured && (
                <section
                  aria-labelledby="featured-heading"
                  className="mb-14"
                >
                  <div className="mb-6">
                    <p className="text-sm font-bold uppercase tracking-wider text-blue-700">
                      Editor's pick
                    </p>
                    <h2
                      id="featured-heading"
                      className="mt-1 text-2xl font-bold sm:text-3xl"
                    >
                      Featured article
                    </h2>
                  </div>

                  <article className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
                    <div className="grid lg:grid-cols-2">
                      <Link
                        to={`/blog/${featuredPost.slug}`}
                        aria-label={`Read ${featuredPost.title}`}
                        className="relative block min-h-[260px] overflow-hidden bg-gray-100 sm:min-h-[350px]"
                      >
                        {getImage(featuredPost) ? (
                          <img
                            src={getImage(featuredPost)}
                            alt={featuredPost.title}
                            width="1200"
                            height="675"
                            fetchPriority="high"
                            decoding="async"
                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-gray-400">
                            <BookOpen size={48} />
                          </div>
                        )}
                      </Link>

                      <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-12">
                        <span className="mb-4 w-fit rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-800">
                          {featuredPost.category}
                        </span>

                        <ArticleMeta post={featuredPost} />

                        <h2 className="mt-4 text-2xl font-extrabold leading-tight sm:text-3xl">
                          {featuredPost.title}
                        </h2>

                        <p className="mt-4 leading-7 text-gray-600">
                          {featuredPost.excerpt}
                        </p>

                        <Link
                          to={`/blog/${featuredPost.slug}`}
                          className="mt-6 inline-flex w-fit items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800"
                        >
                          Read article{" "}
                          <ArrowRight size={17} aria-hidden="true" />
                        </Link>
                      </div>
                    </div>
                  </article>
                </section>
              )}

              <section aria-labelledby="articles-heading">
                <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-wider text-blue-700">
                      Home care resources
                    </p>
                    <h2
                      id="articles-heading"
                      className="mt-1 text-2xl font-bold sm:text-3xl"
                    >
                      {search.trim() || activeCategory !== "All"
                        ? "Matching articles"
                        : "Explore our articles"}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-gray-600 sm:text-base">
                      Browse guides and practical advice for looking after your
                      home.
                    </p>
                  </div>

                  <p className="text-sm text-gray-500" aria-live="polite">
                    {displayedCount}{" "}
                    {displayedCount === 1 ? "article" : "articles"}
                  </p>
                </div>

                {latestPosts.length > 0 ? (
                  <div className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {latestPosts.map((post) => (
                      <BlogCard key={post._id || post.slug} post={post} />
                    ))}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-14 text-center">
                    <BookOpen
                      size={36}
                      className="mx-auto text-gray-400"
                      aria-hidden="true"
                    />
                    <h3 className="mt-4 text-lg font-bold">
                      No articles found
                    </h3>
                    <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-600">
                      Try a different search term or choose another category.
                    </p>
                    <button
                      type="button"
                      onClick={clearFilters}
                      className="mt-5 rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-800"
                    >
                      Clear filters
                    </button>
                  </div>
                )}
              </section>

              <section className="mt-14 overflow-hidden rounded-3xl bg-gray-900">
                <div className="px-6 py-10 text-center sm:px-10 sm:py-12 lg:px-16">
                  <p className="text-sm font-bold uppercase tracking-wider text-blue-300">
                    ServoraCare · Gwalior
                  </p>
                  <h2 className="mt-3 text-2xl font-extrabold text-white sm:text-3xl">
                    Need help maintaining your home?
                  </h2>
                  <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-300 sm:text-base">
                    Explore available home services and check the booking
                    details before choosing the service you need.
                  </p>
                  <Link
                    to="/services"
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white hover:bg-blue-500"
                  >
                    Explore services{" "}
                    <ArrowRight size={18} aria-hidden="true" />
                  </Link>
                </div>
              </section>
            </>
          )}
        </div>
      </main>
    </>
  );
}
