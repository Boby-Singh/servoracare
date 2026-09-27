import React from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  Clock3,
  Copy,
  Facebook,
  Linkedin,
  MessageCircle,
} from "lucide-react";

// -----------------------------------------------------------------------------
// MOCK DATA
// Later this will come from GET /api/blog/:slug
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
    image:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1400&q=85",

    content: (
      <>
        <p>
          Electricity is an essential part of modern homes, but electrical
          problems can become dangerous when wiring, sockets or appliances are
          not maintained properly. A few simple precautions can significantly
          improve electrical safety at home.
        </p>

        <h2>1. Check Electrical Wiring Regularly</h2>

        <p>
          Old, damaged or exposed wiring can create serious safety risks.
          Check visible cables and electrical points regularly for signs of
          damage, overheating or deterioration.
        </p>

        <h2>2. Avoid Overloading Electrical Sockets</h2>

        <p>
          Connecting too many high-power appliances to one socket or extension
          board can cause overheating. Distribute appliances across suitable
          electrical points instead.
        </p>

        <h2>3. Keep Electrical Appliances Away From Water</h2>

        <p>
          Water and electricity are a dangerous combination. Keep electrical
          appliances, plugs and extension boards away from sinks, bathrooms
          and wet areas.
        </p>

        <h2>4. Replace Damaged Cables</h2>

        <p>
          Do not continue using appliances with cracked, exposed or damaged
          power cables. Replace damaged cables or have the appliance inspected
          by a qualified professional.
        </p>

        <h2>5. Make Sure Your Home Has Proper Earthing</h2>

        <p>
          Proper earthing is an important part of electrical protection.
          If you experience repeated shocks from appliances or other unusual
          electrical behaviour, arrange for a professional inspection.
        </p>

        <h2>6. Use Appropriate Safety Devices</h2>

        <p>
          Protective devices such as MCBs and suitable residual-current
          protection can help reduce the risk associated with electrical
          faults. These devices should be installed and checked by qualified
          professionals.
        </p>

        <h2>7. Keep Children Away From Electrical Points</h2>

        <p>
          Electrical sockets should be installed and protected appropriately,
          especially in homes with young children. Keep loose cables and
          electrical equipment out of reach.
        </p>

        <h2>8. Do Not Ignore Burning Smells or Sparks</h2>

        <p>
          Burning smells, unusual buzzing, sparks or repeated tripping can
          indicate an electrical problem. Switch off the affected equipment
          when safe to do so and get professional assistance.
        </p>

        <h2>9. Avoid DIY Electrical Repairs</h2>

        <p>
          Electrical repairs can involve serious safety risks. If you are not
          qualified to work on electrical systems, avoid opening electrical
          panels or attempting repairs yourself.
        </p>

        <h2>10. Schedule Professional Inspection When Needed</h2>

        <p>
          If your home has old wiring, repeated electrical faults or unusual
          power issues, a professional inspection can help identify potential
          problems before they become more serious.
        </p>

        <div className="my-8 rounded-2xl border border-blue-100 bg-blue-50 p-6">
          <h3 className="text-lg font-bold text-gray-900">
            Need professional electrical help?
          </h3>

          <p className="mt-2 text-sm leading-6 text-gray-600">
            ServoraCare can connect you with professionals for electrical and
            other home-service requirements.
          </p>

          <Link
            to="/services"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Book a Service
            <ArrowRight size={16} />
          </Link>
        </div>
      </>
    ),
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
    image:
      "https://images.unsplash.com/photo-1631545806609-4b4d7f7d1c86?auto=format&fit=crop&w=1400&q=85",
    content: (
      <>
        <p>
          Your air conditioner can show several warning signs before a small
          problem turns into a major repair. Recognising these signs early can
          help you arrange professional maintenance.
        </p>

        <h2>Unusual Sounds</h2>

        <p>
          Grinding, rattling, buzzing or unusual clicking sounds may indicate
          that the AC system needs inspection.
        </p>

        <h2>Poor Cooling</h2>

        <p>
          If your AC is running but the room is not cooling properly, several
          factors could be responsible, including airflow or system issues.
        </p>

        <h2>Water Leakage</h2>

        <p>
          Water around an indoor AC unit should not simply be ignored. A
          professional can identify the cause and recommend the appropriate
          repair.
        </p>

        <h2>Frequent Cycling</h2>

        <p>
          If the system repeatedly switches on and off unusually often, it may
          require professional inspection.
        </p>
      </>
    ),
  },

  {
    id: 3,
    title: "5 Common Plumbing Problems and How to Prevent Them",
    slug: "5-common-plumbing-problems-and-how-to-prevent-them",
    category: "Plumbing",
    excerpt:
      "Learn how to identify common plumbing problems before they become expensive repairs.",
    date: "September 18, 2026",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=1400&q=85",
    content: (
      <>
        <p>
          Plumbing problems can start small but become disruptive when they
          are ignored. Regular attention can help prevent many common issues.
        </p>

        <h2>1. Leaking Taps</h2>
        <p>
          A dripping tap may indicate a worn component that needs replacement.
        </p>

        <h2>2. Slow Drains</h2>
        <p>
          Slow drainage can be an early sign of a developing blockage.
        </p>

        <h2>3. Low Water Pressure</h2>
        <p>
          Unexpected changes in water pressure may require professional
          inspection.
        </p>

        <h2>4. Running Toilets</h2>
        <p>
          A constantly running toilet can waste water and may indicate a faulty
          internal component.
        </p>

        <h2>5. Pipe Leaks</h2>
        <p>
          Visible moisture, damp walls or unexplained water marks can indicate
          a plumbing leak.
        </p>
      </>
    ),
  },
];

// -----------------------------------------------------------------------------
// SHARE BUTTON
// -----------------------------------------------------------------------------

function ShareButton({ href, icon: Icon, label, onClick }) {
  return (
    <a
      href={href}
      target={href !== "#" ? "_blank" : undefined}
      rel={href !== "#" ? "noopener noreferrer" : undefined}
      onClick={onClick}
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
    >
      <Icon size={17} />
    </a>
  );
}

// -----------------------------------------------------------------------------
// ADVERTISEMENT
// -----------------------------------------------------------------------------

function BlogAdSlot() {
  return (
    <div className="my-10 hidden md:block">
      <div className="flex min-h-[90px] items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50">
        <span className="text-xs uppercase tracking-widest text-gray-400">
          Advertisement
        </span>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// RELATED ARTICLE CARD
// -----------------------------------------------------------------------------

function RelatedArticle({ post }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group block overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="aspect-[16/9] overflow-hidden bg-gray-100">
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-5">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
          {post.category}
        </span>

        <h3 className="mt-2 line-clamp-2 font-bold leading-6 text-gray-900 group-hover:text-blue-600">
          {post.title}
        </h3>

        <div className="mt-4 flex items-center gap-3 text-xs text-gray-500">
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>
      </div>
    </Link>
  );
}

// -----------------------------------------------------------------------------
// MAIN ARTICLE PAGE
// -----------------------------------------------------------------------------

export default function BlogArticle() {
  const { slug } = useParams();

  const [copied, setCopied] = React.useState(false);

  const post = blogPosts.find((article) => article.slug === slug);

  // ---------------------------------------------------------------------------
  // ARTICLE NOT FOUND
  // ---------------------------------------------------------------------------

  if (!post) {
    return (
      <main className="min-h-[70vh] bg-white">
        <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-24 text-center">

          <div className="rounded-full bg-blue-50 p-5 text-blue-600">
            <SearchIcon />
          </div>

          <h1 className="mt-6 text-3xl font-bold text-gray-900">
            Article Not Found
          </h1>

          <p className="mt-3 max-w-md text-gray-600">
            The article you are looking for may have been removed or the link
            may be incorrect.
          </p>

          <Link
            to="/blog"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            <ArrowLeft size={17} />
            Back to Blog
          </Link>

        </div>
      </main>
    );
  }

  // ---------------------------------------------------------------------------
  // RELATED ARTICLES
  // ---------------------------------------------------------------------------

  const relatedArticles = blogPosts
    .filter(
      (article) =>
        article.id !== post.id &&
        article.category === post.category
    )
    .slice(0, 3);

  // If same-category articles aren't available,
  // use other articles.
  const fallbackRelated =
    relatedArticles.length > 0
      ? relatedArticles
      : blogPosts
          .filter((article) => article.id !== post.id)
          .slice(0, 3);

  // ---------------------------------------------------------------------------
  // SHARE URL
  // ---------------------------------------------------------------------------

  const currentUrl =
    typeof window !== "undefined" ? window.location.href : "";

  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(post.title);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Unable to copy link:", error);
    }
  };

  // ---------------------------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------------------------

  return (
    <>
      <Helmet>

        <title>
          {post.title} | ServoraCare Blog
        </title>

        <meta
          name="description"
          content={post.excerpt}
        />

        <link
          rel="canonical"
          href={`https://www.servoracare.in/blog/${post.slug}`}
        />

        <meta
          property="og:title"
          content={post.title}
        />

        <meta
          property="og:description"
          content={post.excerpt}
        />

        <meta
          property="og:image"
          content={post.image}
        />

        <meta
          property="og:url"
          content={`https://www.servoracare.in/blog/${post.slug}`}
        />

        <meta
          property="og:type"
          content="article"
        />

        <meta
          name="twitter:card"
          content="summary_large_image"
        />

        <meta
          name="twitter:title"
          content={post.title}
        />

        <meta
          name="twitter:description"
          content={post.excerpt}
        />

        <meta
          name="twitter:image"
          content={post.image}
        />

        {/* Article structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            image: [post.image],
            datePublished: post.date,
            dateModified: post.date,
            author: {
              "@type": "Organization",
              name: "ServoraCare",
            },
            publisher: {
              "@type": "Organization",
              name: "ServoraCare",
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://www.servoracare.in/blog/${post.slug}`,
            },
          })}
        </script>

      </Helmet>

      <main className="min-h-screen bg-white">

        {/* ===================================================================
            ARTICLE HEADER
        ==================================================================== */}

        <section className="bg-gray-50">

          <div className="mx-auto max-w-5xl px-4 pb-12 pt-10 sm:px-6 lg:px-8 lg:pb-16 lg:pt-14">

            {/* Breadcrumb */}
            <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-gray-500">

              <Link
                to="/"
                className="hover:text-blue-600"
              >
                Home
              </Link>

              <span>/</span>

              <Link
                to="/blog"
                className="hover:text-blue-600"
              >
                Blog
              </Link>

              <span>/</span>

              <span className="text-gray-700">
                {post.category}
              </span>

            </nav>

            <div className="max-w-4xl">

              <span className="inline-flex rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-600">
                {post.category}
              </span>

              <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
                {post.title}
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-7 text-gray-600 sm:text-lg">
                {post.excerpt}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-gray-500">

                <span className="flex items-center gap-2">
                  <CalendarDays size={17} />
                  {post.date}
                </span>

                <span className="flex items-center gap-2">
                  <Clock3 size={17} />
                  {post.readTime}
                </span>

                <span>
                  By{" "}
                  <strong className="font-semibold text-gray-700">
                    ServoraCare
                  </strong>
                </span>

              </div>

            </div>
          </div>
        </section>

        {/* ===================================================================
            FEATURED IMAGE
        ==================================================================== */}

        <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

          <div className="-mt-2 overflow-hidden rounded-2xl shadow-xl sm:rounded-3xl">

            <img
              src={post.image}
              alt={post.title}
              className="aspect-[16/8] w-full object-cover"
            />

          </div>

        </section>

        {/* ===================================================================
            ARTICLE BODY
        ==================================================================== */}

        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">

          <div className="grid lg:grid-cols-[minmax(0,760px)_280px] lg:gap-14">

            {/* Main Content */}

            <article>

              <div
                className="
                  prose
                  prose-lg
                  max-w-none

                  prose-headings:font-extrabold
                  prose-headings:text-gray-900

                  prose-h2:mb-4
                  prose-h2:mt-10
                  prose-h2:text-2xl

                  prose-h3:mb-3
                  prose-h3:mt-8

                  prose-p:leading-8
                  prose-p:text-gray-700

                  prose-li:text-gray-700

                  prose-a:text-blue-600
                  prose-a:no-underline
                  hover:prose-a:underline

                  prose-blockquote:border-blue-600
                  prose-blockquote:text-gray-700
                "
              >
                {post.content}
              </div>

              {/* Tags */}

              <div className="mt-10 border-t border-gray-200 pt-7">

                <div className="flex flex-wrap items-center gap-2">

                  <span className="mr-2 text-sm font-semibold text-gray-700">
                    Tags:
                  </span>

                  <span className="rounded-full bg-gray-100 px-3 py-1.5 text-xs text-gray-600">
                    {post.category}
                  </span>

                  <span className="rounded-full bg-gray-100 px-3 py-1.5 text-xs text-gray-600">
                    Home Services
                  </span>

                  <span className="rounded-full bg-gray-100 px-3 py-1.5 text-xs text-gray-600">
                    ServoraCare
                  </span>

                </div>

              </div>

              {/* Share */}

              <div className="mt-7 flex flex-wrap items-center gap-3">

                <span className="mr-2 text-sm font-semibold text-gray-700">
                  Share:
                </span>

                <ShareButton
                  href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
                  icon={MessageCircle}
                  label="Share on WhatsApp"
                />

                <ShareButton
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                  icon={Facebook}
                  label="Share on Facebook"
                />

                <ShareButton
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                  icon={Linkedin}
                  label="Share on LinkedIn"
                />

                <button
                  type="button"
                  onClick={copyLink}
                  aria-label="Copy article link"
                  className="flex h-10 items-center gap-2 rounded-full border border-gray-200 bg-white px-4 text-sm text-gray-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                >
                  {copied ? (
                    <>
                      <Check size={16} />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      Copy Link
                    </>
                  )}
                </button>

              </div>

            </article>

            {/* =================================================================
                SIDEBAR
            ================================================================== */}

            <aside className="mt-12 lg:mt-0">

              <div className="sticky top-24 space-y-6">

                {/* CTA */}

                <div className="rounded-2xl bg-gray-900 p-6">

                  <p className="text-xs font-bold uppercase tracking-wider text-blue-400">
                    ServoraCare
                  </p>

                  <h3 className="mt-3 text-xl font-bold text-white">
                    Need help with your home?
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-gray-300">
                    Book a professional for electrical, plumbing, AC repair,
                    cleaning and other home services.
                  </p>

                  <Link
                    to="/services"
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white hover:bg-blue-700"
                  >
                    Book a Service
                    <ArrowRight size={16} />
                  </Link>

                </div>

                {/* Advertisement */}

                <div className="hidden rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-5 lg:block">

                  <div className="flex min-h-[250px] items-center justify-center">

                    <span className="text-xs uppercase tracking-widest text-gray-400">
                      Advertisement
                    </span>

                  </div>

                </div>

              </div>

            </aside>

          </div>

          <BlogAdSlot />

        </section>

        {/* ===================================================================
            RELATED ARTICLES
        ==================================================================== */}

        {fallbackRelated.length > 0 && (
          <section className="border-t border-gray-100 bg-gray-50">

            <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">

              <div className="mb-8">

                <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
                  Continue Reading
                </p>

                <h2 className="mt-1 text-2xl font-extrabold text-gray-900 sm:text-3xl">
                  Related Articles
                </h2>

              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                {fallbackRelated.map((article) => (
                  <RelatedArticle
                    key={article.id}
                    post={article}
                  />
                ))}

              </div>

            </div>

          </section>
        )}

        {/* ===================================================================
            BOTTOM CTA
        ==================================================================== */}

        <section className="bg-white">

          <div className="mx-auto max-w-6xl px-4 py-14 text-center sm:px-6 lg:px-8">

            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              <ArrowLeft size={17} />
              Back to all articles
            </Link>

          </div>

        </section>

      </main>
    </>
  );
}

// Small icon used for 404 state
function SearchIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
