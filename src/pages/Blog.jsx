
import React, { useMemo, useState } from "react";
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

const SITE_URL = "https://www.servoracare.in";
const BLOG_URL = `${SITE_URL}/blog`;

const blogPosts = [
  {
    id: 1,
    title: "10 Electrical Safety Tips Every Homeowner Should Know",
    slug: "10-electrical-safety-tips-every-homeowner-should-know",
    category: "Electrical",
    excerpt:
      "Simple electrical safety practices that can help keep your home, appliances and family safer.",
    date: "September 24, 2026",
    readTime: "5 min read",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    title: "How to Know When Your AC Needs Professional Repair",
    slug: "how-to-know-when-your-ac-needs-professional-repair",
    category: "AC Repair",
    excerpt:
      "Learn the common warning signs that your AC system may need professional attention.",
    date: "September 21, 2026",
    readTime: "4 min read",
    featured: false,
    image:
      "https://images.unsplash.com/photo-1631545806609-4b4d7f7d1c86?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    title: "5 Common Plumbing Problems and How to Prevent Them",
    slug: "5-common-plumbing-problems-and-how-to-prevent-them",
    category: "Plumbing",
    excerpt:
      "Identify common plumbing problems early and learn simple ways to prevent expensive repairs.",
    date: "September 18, 2026",
    readTime: "4 min read",
    featured: false,
    image:
      "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    title: "How Often Should You Deep Clean Your Home?",
    slug: "how-often-should-you-deep-clean-your-home",
    category: "Cleaning",
    excerpt:
      "A practical guide to planning regular cleaning and keeping your home fresh throughout the year.",
    date: "September 15, 2026",
    readTime: "3 min read",
    featured: false,
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 5,
    title: "CCTV Installation: What Homeowners Should Know",
    slug: "cctv-installation-what-homeowners-should-know",
    category: "CCTV & Security",
    excerpt:
      "Important things to consider before choosing and installing CCTV cameras for your home.",
    date: "September 11, 2026",
    readTime: "5 min read",
    featured: false,
    image:
      "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 6,
    title: "Simple Home Maintenance Checklist for Every Season",
    slug: "simple-home-maintenance-checklist-for-every-season",
    category: "Home Maintenance",
    excerpt:
      "Use this practical checklist to keep your home safe, comfortable and well maintained.",
    date: "September 7, 2026",
    readTime: "4 min read",
    featured: false,
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 7,
    title: "When Should You Call a Professional Electrician?",
    slug: "when-should-you-call-a-professional-electrician",
    category: "Electrical",
    excerpt:
      "Understand which electrical problems require professional inspection instead of a DIY fix.",
    date: "September 3, 2026",
    readTime: "4 min read",
    featured: false,
    image:
      "https://images.unsplash.com/photo-1555963966-b7ae5404b6ed?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 8,
    title: "Easy Ways to Keep Your Home Clean Every Day",
    slug: "easy-ways-to-keep-your-home-clean-every-day",
    category: "Cleaning",
    excerpt:
      "Small daily cleaning habits can make maintaining your home much easier.",
    date: "August 30, 2026",
    readTime: "3 min read",
    featured: false,
    image:
      "https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 9,
    title: "Things to Check Before Hiring a Home Service Professional",
    slug: "things-to-check-before-hiring-a-home-service-professional",
    category: "Home Improvement",
    excerpt:
      "A simple checklist to help you choose the right professional for your home service needs.",
    date: "August 26, 2026",
    readTime: "4 min read",
    featured: false,
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=900&q=80",
  },
];

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

function ArticleMeta({ post }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500">
      <span className="inline-flex items-center gap-1.5">
        <CalendarDays size={14} aria-hidden="true" />
        <time>{post.date}</time>
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Clock3 size={14} aria-hidden="true" />
        {post.readTime}
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
        <img
          src={post.image}
          alt={`Illustration for ${post.title}`}
          loading="lazy"
          decoding="async"
          width="900"
          height="506"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-gray-800 shadow-sm">
          {post.category}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <ArticleMeta post={post} />

        <h3 className="mt-3 text-lg font-bold leading-snug text-gray-900 group-hover:text-blue-700">
          <Link to={`/blog/${post.slug}`} className="focus-visible:outline-blue-600">
            {post.title}
          </Link>
        </h3>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          {post.excerpt}
        </p>

        <Link
          to={`/blog/${post.slug}`}
          className="mt-auto inline-flex w-fit items-center gap-2 pt-5 text-sm font-semibold text-blue-700 hover:gap-3 focus-visible:outline-blue-600"
        >
          Read article <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

export default function Blog() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(() => {
    const available = new Set(blogPosts.map((post) => post.category));
    return [
      "All",
      ...categoryOrder.filter((category) => available.has(category)),
    ];
  }, []);

  const featuredPost = blogPosts.find((post) => post.featured);

  const filteredPosts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return blogPosts.filter((post) => {
      const matchesCategory =
        activeCategory === "All" || post.category === activeCategory;

      const searchableText =
        `${post.title} ${post.excerpt} ${post.category}`.toLowerCase();

      return matchesCategory && (!query || searchableText.includes(query));
    });
  }, [search, activeCategory]);

  // Show the featured article separately only when it matches the current view.
  const showFeatured =
    activeCategory === "All" &&
    !search.trim() &&
    Boolean(featuredPost) &&
    filteredPosts.some((post) => post.id === featuredPost.id);

  // Never hide a matching article during search or category filtering.
  const latestPosts = showFeatured
    ? filteredPosts.filter((post) => post.id !== featuredPost.id)
    : filteredPosts;

  const displayedCount =
    latestPosts.length + (showFeatured ? 1 : 0);

  const clearFilters = () => {
    setSearch("");
    setActiveCategory("All");
  };

  return (
    <>
      <Helmet>
        <title>ServoraCare Blog | Home Maintenance Tips & Guides</title>
        <meta
          name="description"
          content="Explore practical home maintenance guides, electrical safety advice, plumbing tips, AC care and cleaning guidance from ServoraCare."
        />
        <link rel="canonical" href={BLOG_URL} />

        <meta property="og:title" content="ServoraCare Blog | Home Maintenance Tips & Guides" />
        <meta
          property="og:description"
          content="Practical guides to help you maintain, protect and improve your home."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={BLOG_URL} />
        <meta
          property="og:image"
          content={featuredPost?.image || `${SITE_URL}/og-image.jpg`}
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <main className="min-h-screen bg-white text-gray-900">
        {/* Hero */}
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

        {/* Categories */}
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
                    className={`whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
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
          {/* Featured article */}
          {showFeatured && (
            <section aria-labelledby="featured-heading" className="mb-14">
              <div className="mb-6">
                <p className="text-sm font-bold uppercase tracking-wider text-blue-700">
                  Editor's pick
                </p>
                <h2 id="featured-heading" className="mt-1 text-2xl font-bold sm:text-3xl">
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
                    <img
                      src={featuredPost.image}
                      alt={`Illustration for ${featuredPost.title}`}
                      width="1200"
                      height="675"
                      fetchPriority="high"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
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
                      className="mt-6 inline-flex w-fit items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      Read article <ArrowRight size={17} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </article>
            </section>
          )}

          {/* Article listing */}
          <section aria-labelledby="articles-heading">
            <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-blue-700">
                  Home care resources
                </p>
                <h2 id="articles-heading" className="mt-1 text-2xl font-bold sm:text-3xl">
                  {search.trim() || activeCategory !== "All"
                    ? "Matching articles"
                    : "Explore our articles"}
                </h2>
                <p className="mt-2 text-sm leading-6 text-gray-600 sm:text-base">
                  Browse guides and practical advice for looking after your home.
                </p>
              </div>

              <p className="text-sm text-gray-500" aria-live="polite">
                {displayedCount} {displayedCount === 1 ? "article" : "articles"}
              </p>
            </div>

            {latestPosts.length > 0 ? (
              <div className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {latestPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-14 text-center">
                <BookOpen size={36} className="mx-auto text-gray-400" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-bold">No articles found</h3>
                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-600">
                  Try a different search term or choose another category to explore our home care guides.
                </p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-5 rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                  Clear filters
                </button>
              </div>
            )}
          </section>

          {/* Service call to action */}
          <section className="mt-14 overflow-hidden rounded-3xl bg-gray-900">
            <div className="px-6 py-10 text-center sm:px-10 sm:py-12 lg:px-16">
              <p className="text-sm font-bold uppercase tracking-wider text-blue-300">
                ServoraCare · Gwalior
              </p>
              <h2 className="mt-3 text-2xl font-extrabold text-white sm:text-3xl">
                Need help maintaining your home?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-300 sm:text-base">
                Explore available home services and check the booking details
                before choosing the service you need.
              </p>
              <Link
                to="/services"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
              >
                Explore services <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
