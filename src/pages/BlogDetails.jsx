
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, CalendarDays, Clock3, BookOpen } from "lucide-react";
import { getBlogBySlug } from "../services/blogService";
const API_BASE = (
  import.meta.env.VITE_API_URL ||
  "https://servoracare-backend.onrender.com/api"
).replace(/\/+$/, "");

const BLOG_API = API_BASE.endsWith("/api")
  ? `${API_BASE}/blog`
  : `${API_BASE}/api/blog`;

export default function BlogDetails() {
  const { slug } = useParams();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchArticle() {
      try {
        setLoading(true);
        setError("");
        setPost(null);

        const response = await fetch(
          `${BLOG_API}/${encodeURIComponent(slug)}`,
          { signal: controller.signal }
        );

        if (response.status === 404) {
          throw new Error("This article could not be found.");
        }

        if (!response.ok) {
          throw new Error("Unable to load this article.");
        }

        const result = await response.json();
        const article = result.post || result.blog || result.data || result;

        if (!article?.title) {
          throw new Error("Invalid article response.");
        }

        setPost(article);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Unable to load article.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    if (slug) fetchArticle();

    return () => controller.abort();
  }, [slug]);

  const title = post?.metaTitle || post?.title || "Blog Article";
  const description =
    post?.metaDescription ||
    post?.excerpt ||
    "Home maintenance tips and guides from ServoraCare.";

  const image = post?.coverImage || post?.image;

  const readTime = post
    ? `${Math.max(
        1,
        Math.ceil(
          (post.content || "").trim().split(/\s+/).filter(Boolean).length /
            200
        )
      )} min read`
    : "";

  return (
    <>
      <Helmet>
        <title>{title} | ServoraCare</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />

        {post?.slug && (
          <link
            rel="canonical"
            href={`https://www.servoracare.in/blog/${post.slug}`}
          />
        )}

        {image && <meta property="og:image" content={image} />}
      </Helmet>

      <main className="min-h-screen bg-white px-4 py-10 text-gray-900 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900"
          >
            <ArrowLeft size={17} />
            Back to all articles
          </Link>

          {loading && (
            <div className="py-20 text-center" role="status">
              <p className="text-gray-600">Loading article...</p>
            </div>
          )}

          {!loading && error && (
            <section className="py-16 text-center" role="alert">
              <BookOpen size={42} className="mx-auto text-gray-400" />
              <h1 className="mt-4 text-2xl font-bold">
                Article unavailable
              </h1>
              <p className="mt-3 text-gray-600">{error}</p>
              <Link
                to="/blog"
                className="mt-6 inline-block rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white"
              >
                Browse articles
              </Link>
            </section>
          )}

          {!loading && !error && post && (
            <article className="mt-8">
              <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
                {post.category || "Home Care"}
              </p>

              <h1 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
                {post.title}
              </h1>

              {post.excerpt && (
                <p className="mt-5 text-lg leading-8 text-gray-600">
                  {post.excerpt}
                </p>
              )}

              <div className="mt-5 flex flex-wrap gap-4 text-sm text-gray-500">
                {post.publishedAt && (
                  <span className="inline-flex items-center gap-2">
                    <CalendarDays size={16} />
                    {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                )}

                <span className="inline-flex items-center gap-2">
                  <Clock3 size={16} />
                  {readTime}
                </span>

                {post.author && <span>By {post.author}</span>}
              </div>

              {image ? (
                <img
                  src={image}
                  alt={post.title}
                  width="1200"
                  height="675"
                  className="mt-8 aspect-video w-full rounded-2xl object-cover"
                />
              ) : (
                <div className="mt-8 flex aspect-video items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
                  <BookOpen size={48} />
                </div>
              )}

              <div className="mt-8 whitespace-pre-wrap break-words text-base leading-8 text-gray-700">
                {post.content}
              </div>

              {post.tags?.length > 0 && (
                <div className="mt-8 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-gray-100 px-3 py-1.5 text-sm text-gray-600"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-12 border-t border-gray-200 pt-6">
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 font-semibold text-blue-700"
                >
                  <ArrowLeft size={17} />
                  Explore more articles
                </Link>
              </div>
            </article>
          )}
        </div>
      </main>
    </>
  );
}
