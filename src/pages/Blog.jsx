import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  Search,
  Sparkles,
} from "lucide-react";

// -----------------------------------------------------------------------------
// MOCK BLOG DATA
// Later this will come from GET /api/blog
// -----------------------------------------------------------------------------

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

const categories = [
  "All",
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

// -----------------------------------------------------------------------------
// BLOG CARD
// -----------------------------------------------------------------------------

function BlogCard({ post }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link to={`/blog/${post.slug}`} className="block">
        <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
          <img
            src={post.image}
            alt={post.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          <div className="absolute left-4 top-4">
            <span className="rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-gray-800 shadow-sm backdrop-blur">
              {post.category}
            </span>
          </div>
        </div>
      </Link>

      <div className="p-5">
        <div className="mb-3 flex items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1.5">
            <CalendarDays size={14} />
            {post.date}
          </span>

          <span className="flex items-center gap-1.5">
            <Clock3 size={14} />
            {post.readTime}
          </span>
        </div>

        <Link to={`/blog/${post.slug}`}>
          <h3 className="line-clamp-2 text-lg font-bold leading-snug text-gray-900 transition-colors group-hover:text-blue-600">
            {post.title}
          </h3>
        </Link>

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
          {post.excerpt}
        </p>

        <Link
          to={`/blog/${post.slug}`}
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition-all hover:gap-3"
        >
          Read Article
          <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
}

// -----------------------------------------------------------------------------
// ADVERTISEMENT PLACEHOLDER
// -----------------------------------------------------------------------------

function BlogAdSlot() {
  return (
    <div className="mx-auto my-10 hidden max-w-4xl md:block">
      <div className="flex min-h-[90px] items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50">
        <span className="text-xs uppercase tracking-widest text-gray-400">
          Advertisement
        </span>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// MAIN BLOG PAGE
// -----------------------------------------------------------------------------

export default function Blog() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return blogPosts.filter((post) => {
      const matchesCategory =
        activeCategory === "All" || post.category === activeCategory;

      const matchesSearch =
        !searchValue ||
        post.title.toLowerCase().includes(searchValue) ||
        post.excerpt.toLowerCase().includes(searchValue) ||
        post.category.toLowerCase().includes(searchValue);

      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  const featuredPost = blogPosts.find((post) => post.featured);

  const latestPosts = filteredPosts.filter(
    (post) => post.id !== featuredPost?.id
  );

  return (
    <>
      <Helmet>
        <title>ServoraCare Blog | Home Service Tips & Advice</title>

        <meta name="google-adsense-account" content="ca-pub-4296116100694649"></meta>

        <meta
          name="description"
          content="Helpful home maintenance tips, electrical advice, plumbing guides, AC care, cleaning tips and more from ServoraCare."
        />

        <meta
          property="og:title"
          content="ServoraCare Blog | Home Service Tips & Advice"
        />

        <meta
          property="og:description"
          content="Helpful home maintenance tips and practical home-service advice from ServoraCare."
        />

        <meta property="og:type" content="website" />

        <meta
          name="twitter:card"
          content="summary_large_image"
        />
      </Helmet>

      <main className="min-h-screen bg-white">

        {/* ================================================================
            HERO
        ================================================================= */}

        <section className="relative overflow-hidden bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">

            <div className="mx-auto max-w-3xl text-center">

              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-blue-600">
                <Sparkles size={15} />
                ServoraCare Blog
              </div>

              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                Smart Tips for a{" "}
                <span className="text-blue-600">Better Home</span>
              </h1>

              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
                Helpful home maintenance tips, expert advice and practical
                guides to help you maintain, protect and improve your home.
              </p>

              {/* Search */}
              <div className="mx-auto mt-8 max-w-xl">
                <div className="relative">
                  <Search
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search articles..."
                    aria-label="Search blog articles"
                    className="h-14 w-full rounded-2xl border border-gray-200 bg-white pl-12 pr-5 text-sm text-gray-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ================================================================
            CATEGORIES
        ================================================================= */}

        <section className="border-b border-gray-100 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">

            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">

              {categories.map((category) => {
                const active = activeCategory === category;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-medium transition ${
                      active
                        ? "bg-blue-600 text-white shadow-sm"
                        : "border border-gray-200 bg-white text-gray-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}

            </div>
          </div>
        </section>

        {/* ================================================================
            CONTENT
        ================================================================= */}

        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">

          {/* ==============================================================
              FEATURED ARTICLE
          ============================================================== */}

          {featuredPost &&
            activeCategory === "All" &&
            !search.trim() && (
              <section className="mb-16">

                <div className="mb-7">
                  <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
                    Featured
                  </p>

                  <h2 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
                    Featured Article
                  </h2>
                </div>

                <article className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">

                  <div className="grid lg:grid-cols-2">

                    <Link
                      to={`/blog/${featuredPost.slug}`}
                      className="group relative min-h-[280px] overflow-hidden lg:min-h-[430px]"
                    >
                      <img
                        src={featuredPost.image}
                        alt={featuredPost.title}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                      <div className="absolute left-5 top-5">
                        <span className="rounded-full bg-white px-4 py-2 text-xs font-bold text-gray-800 shadow">
                          {featuredPost.category}
                        </span>
                      </div>
                    </Link>

                    <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">

                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1.5">
                          <CalendarDays size={16} />
                          {featuredPost.date}
                        </span>

                        <span className="flex items-center gap-1.5">
                          <Clock3 size={16} />
                          {featuredPost.readTime}
                        </span>
                      </div>

                      <h2 className="mt-5 text-2xl font-extrabold leading-tight text-gray-900 sm:text-3xl lg:text-4xl">
                        {featuredPost.title}
                      </h2>

                      <p className="mt-5 text-base leading-7 text-gray-600">
                        {featuredPost.excerpt}
                      </p>

                      <Link
                        to={`/blog/${featuredPost.slug}`}
                        className="mt-7 inline-flex w-fit items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                      >
                        Read Article
                        <ArrowRight size={17} />
                      </Link>

                    </div>
                  </div>

                </article>
              </section>
            )}

          <BlogAdSlot />

          {/* ==============================================================
              LATEST ARTICLES
          ============================================================== */}

          <section>

            <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">

              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
                  Knowledge Center
                </p>

                <h2 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
                  Latest Articles
                </h2>

                <p className="mt-2 text-sm text-gray-600 sm:text-base">
                  Practical advice for maintaining and improving your home.
                </p>
              </div>

              <p className="text-sm text-gray-500">
                {filteredPosts.length}{" "}
                {filteredPosts.length === 1 ? "article" : "articles"}
              </p>

            </div>

            {latestPosts.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {latestPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-16 text-center">

                <Search
                  size={35}
                  className="mx-auto text-gray-400"
                />

                <h3 className="mt-4 text-lg font-bold text-gray-900">
                  No articles found
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Try another search term or choose a different category.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setActiveCategory("All");
                  }}
                  className="mt-5 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Clear Filters
                </button>

              </div>
            )}

          </section>

          {/* ==============================================================
              BOTTOM CTA
          ============================================================== */}

          <section className="mt-16 overflow-hidden rounded-3xl bg-gray-900">
            <div className="px-6 py-12 text-center sm:px-10 lg:px-16">

              <p className="text-sm font-bold uppercase tracking-wider text-blue-400">
                Need a helping hand?
              </p>

              <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">
                Need help with your home?
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-300 sm:text-base">
                Book a professional for electrical, plumbing, AC repair,
                cleaning and other home services through ServoraCare.
              </p>

              <Link
                to="/services"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-blue-700"
              >
                Book a Service
                <ArrowRight size={18} />
              </Link>

            </div>
          </section>

        </div>
      </main>
    </>
  );
}

