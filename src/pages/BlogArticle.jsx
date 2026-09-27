import React from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock3,
} from "lucide-react";

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
    image:
      "https://images.unsplash.com/photo-1631545806609-4b4d7f7d1c86?auto=format&fit=crop&w=1200&q=80",
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
    image:
      "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function BlogArticle() {
  const { slug } = useParams();

  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    return (
      <>
        <Helmet>
          <title>Article Not Found | ServoraCare</title>
        </Helmet>

        <main className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Article Not Found
            </h1>

            <p className="mt-3 text-gray-600">
              The article you are looking for does not exist.
            </p>

            <Link
              to="/blog"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
            >
              <ArrowLeft size={18} />
              Back to Blog
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title} | ServoraCare</title>

        <meta
          name="description"
          content={post.excerpt}
        />

        <link
          rel="canonical"
          href={`https://www.servoracare.in/blog/${post.slug}`}
        />

        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />
        <meta property="og:type" content="article" />
      </Helmet>

      <main className="min-h-screen bg-white">
        {/* Header */}
        <section className="bg-gray-50">
          <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              <ArrowLeft size={17} />
              Back to Blog
            </Link>

            <div className="mt-8">
              <span className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-xs font-bold text-blue-600">
                {post.category}
              </span>

              <h1 className="mt-5 text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
                {post.title}
              </h1>

              <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-600">
                {post.excerpt}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-gray-500">
                <span className="flex items-center gap-2">
                  <CalendarDays size={16} />
                  {post.date}
                </span>

                <span className="flex items-center gap-2">
                  <Clock3 size={16} />
                  {post.readTime}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        <section className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl">
            <img
              src={post.image}
              alt={post.title}
              className="h-auto max-h-[600px] w-full object-cover"
            />
          </div>
        </section>

        {/* Advertisement */}
        <div className="mx-auto my-10 hidden max-w-4xl px-4 md:block">
          <div className="flex min-h-[90px] items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50">
            <span className="text-xs uppercase tracking-widest text-gray-400">
              Advertisement
            </span>
          </div>
        </div>

        {/* Article Content */}
        <article className="mx-auto max-w-3xl px-4 pb-16 sm:px-6 lg:px-8">
          {post.id === 1 && (
            <>
              <p className="text-lg leading-8 text-gray-700">
                Electrical systems are an important part of every modern
                home. From lighting and appliances to power outlets and
                electronic devices, electricity makes everyday life easier.
              </p>

              <h2 className="mt-10 text-2xl font-bold text-gray-900">
                1. Avoid overloaded sockets
              </h2>

              <p className="mt-4 leading-8 text-gray-700">
                Plugging too many high-power appliances into one outlet can
                cause excessive heating. Use appropriate sockets and avoid
                overloading extension boards.
              </p>

              <h2 className="mt-10 text-2xl font-bold text-gray-900">
                2. Replace damaged wires
              </h2>

              <p className="mt-4 leading-8 text-gray-700">
                Damaged, exposed or frayed electrical wires should not be
                ignored. Replace them or have them inspected by a qualified
                professional.
              </p>

              <h2 className="mt-10 text-2xl font-bold text-gray-900">
                3. Keep electrical equipment away from water
              </h2>

              <p className="mt-4 leading-8 text-gray-700">
                Water and electricity can create dangerous situations. Keep
                electrical appliances and connections away from wet areas
                unless they are specifically designed for such environments.
              </p>

              <h2 className="mt-10 text-2xl font-bold text-gray-900">
                4. Do not ignore repeated circuit breaker trips
              </h2>

              <p className="mt-4 leading-8 text-gray-700">
                A circuit breaker that repeatedly trips may indicate
                overloading, a short circuit or another electrical issue.
                Professional inspection is recommended.
              </p>

              <h2 className="mt-10 text-2xl font-bold text-gray-900">
                5. Get professional help for major electrical work
              </h2>

              <p className="mt-4 leading-8 text-gray-700">
                Electrical installations, rewiring and major repairs should
                be handled by qualified professionals rather than attempted
                as DIY projects.
              </p>
            </>
          )}

          {post.id === 2 && (
            <>
              <p className="text-lg leading-8 text-gray-700">
                Your AC often gives warning signs before a major problem
                occurs. Recognizing these signs early can help prevent
                further damage and uncomfortable breakdowns.
              </p>

              <h2 className="mt-10 text-2xl font-bold text-gray-900">
                Weak cooling
              </h2>

              <p className="mt-4 leading-8 text-gray-700">
                If your AC is running but the room is not cooling properly,
                the system may require inspection.
              </p>

              <h2 className="mt-10 text-2xl font-bold text-gray-900">
                Unusual sounds
              </h2>

              <p className="mt-4 leading-8 text-gray-700">
                Grinding, rattling or unusual buzzing noises can indicate a
                mechanical or electrical problem.
              </p>
            </>
          )}

          {post.id === 3 && (
            <>
              <p className="text-lg leading-8 text-gray-700">
                Plumbing problems can start small and become expensive if
                they are ignored. Regular inspection and timely maintenance
                can help prevent many common issues.
              </p>

              <h2 className="mt-10 text-2xl font-bold text-gray-900">
                Leaking taps
              </h2>

              <p className="mt-4 leading-8 text-gray-700">
                A leaking tap may waste water and can sometimes indicate a
                worn-out washer, seal or internal component.
              </p>

              <h2 className="mt-10 text-2xl font-bold text-gray-900">
                Blocked drains
              </h2>

              <p className="mt-4 leading-8 text-gray-700">
                Avoid putting grease, large food particles and unsuitable
                materials down drains to reduce the chance of blockages.
              </p>
            </>
          )}

          {/* CTA */}
          <div className="mt-14 rounded-2xl bg-gray-900 p-7 text-center sm:p-10">
            <h2 className="text-2xl font-bold text-white">
              Need professional home service?
            </h2>

            <p className="mt-3 text-gray-300">
              Book a professional through ServoraCare for your home service
              needs.
            </p>

            <Link
              to="/services"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-700"
            >
              Book a Service
              <ArrowRight size={18} />
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}