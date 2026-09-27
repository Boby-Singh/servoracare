import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  FileText,
  CheckCircle,
  Clock,
  Star,
  MoreVertical,
  CalendarDays,
} from "lucide-react";
import AdvertisementManager from "./components/AdvertisementManager";

const initialArticles = [
  {
    id: 1,
    title: "10 Electrical Safety Tips Every Homeowner Should Know",
    slug: "10-electrical-safety-tips-every-homeowner-should-know",
    category: "Electrical",
    status: "Published",
    featured: true,
    author: "ServoraCare",
    date: "2026-09-25",
    image:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "How to Prevent Plumbing Problems at Home",
    slug: "how-to-prevent-plumbing-problems-at-home",
    category: "Plumbing",
    status: "Published",
    featured: false,
    author: "ServoraCare",
    date: "2026-09-23",
    image:
      "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "AC Maintenance Tips Before Summer",
    slug: "ac-maintenance-tips-before-summer",
    category: "AC & Cooling",
    status: "Draft",
    featured: false,
    author: "ServoraCare",
    date: "2026-09-20",
    image:
      "https://images.unsplash.com/photo-1631545806609-7f9e2b7b5c72?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "Simple Home Cleaning Habits That Make a Difference",
    slug: "simple-home-cleaning-habits-that-make-a-difference",
    category: "Cleaning",
    status: "Published",
    featured: true,
    author: "ServoraCare",
    date: "2026-09-18",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    title: "How CCTV Can Improve Home Security",
    slug: "how-cctv-can-improve-home-security",
    category: "Security",
    status: "Draft",
    featured: false,
    author: "ServoraCare",
    date: "2026-09-15",
    image:
      "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80",
  },
];

export default function AdminBlog() {
  const navigate = useNavigate();

  const [articles, setArticles] = useState(initialArticles);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [openMenu, setOpenMenu] = useState(null);
  const [deleteArticle, setDeleteArticle] = useState(null);

  const categories = [
    "All",
    ...new Set(initialArticles.map((article) => article.category)),
  ];

  const stats = useMemo(() => {
    return {
      total: articles.length,
      published: articles.filter((a) => a.status === "Published").length,
      drafts: articles.filter((a) => a.status === "Draft").length,
      featured: articles.filter((a) => a.featured).length,
    };
  }, [articles]);

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesSearch =
        article.title.toLowerCase().includes(search.toLowerCase()) ||
        article.category.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || article.category === category;

      const matchesStatus =
        status === "All" || article.status === status;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [articles, search, category, status]);

  const toggleStatus = (id) => {
    setArticles((current) =>
      current.map((article) =>
        article.id === id
          ? {
              ...article,
              status:
                article.status === "Published" ? "Draft" : "Published",
            }
          : article
      )
    );

    setOpenMenu(null);
  };

  const toggleFeatured = (id) => {
    setArticles((current) =>
      current.map((article) =>
        article.id === id
          ? { ...article, featured: !article.featured }
          : article
      )
    );

    setOpenMenu(null);
  };

  const confirmDelete = () => {
    if (!deleteArticle) return;

    setArticles((current) =>
      current.filter((article) => article.id !== deleteArticle.id)
    );

    setDeleteArticle(null);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <FileText className="h-7 w-7 text-blue-600" />

            <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
              Blog Management
            </h1>
          </div>

          <p className="mt-1 text-sm text-gray-500">
            Create, manage and publish ServoraCare blog articles.
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/blog/add")}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          <Plus className="h-5 w-5" />
          Add New Article
        </button>
      </div>
      <AdvertisementManager />

      {/* Stats */}
      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          title="Total Articles"
          value={stats.total}
          icon={<FileText className="h-5 w-5" />}
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
        />

        <StatCard
          title="Published"
          value={stats.published}
          icon={<CheckCircle className="h-5 w-5" />}
          iconBg="bg-green-100"
          iconColor="text-green-600"
        />

        <StatCard
          title="Drafts"
          value={stats.drafts}
          icon={<Clock className="h-5 w-5" />}
          iconBg="bg-yellow-100"
          iconColor="text-yellow-600"
        />

        <StatCard
          title="Featured"
          value={stats.featured}
          icon={<Star className="h-5 w-5" />}
          iconBg="bg-purple-100"
          iconColor="text-purple-600"
        />
      </div>

      {/* Filters */}
      <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles..."
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Category */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-blue-500"
          >
            {categories.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          {/* Status */}
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-blue-500"
          >
            <option value="All">All Status</option>
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Article
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Category
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Status
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Date
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredArticles.map((article) => (
                <tr
                  key={article.id}
                  className="transition hover:bg-gray-50"
                >
                  {/* Article */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="h-14 w-20 rounded-lg object-cover"
                      />

                      <div className="max-w-md">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-gray-900">
                            {article.title}
                          </p>

                          {article.featured && (
                            <Star className="h-4 w-4 fill-current text-yellow-500" />
                          )}
                        </div>

                        <p className="mt-1 text-xs text-gray-400">
                          /blog/{article.slug}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                      {article.category}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <StatusBadge status={article.status} />
                  </td>

                  {/* Date */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CalendarDays className="h-4 w-4 text-gray-400" />
                      {formatDate(article.date)}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() =>
                          navigate(`/blog/${article.slug}`)
                        }
                        className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
                        title="View"
                      >
                        <Eye className="h-4 w-4" />
                      </button>

                      <button
                        onClick={() =>
                          navigate(`/admin/blog/edit/${article.id}`)
                        }
                        className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-50"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </button>

                      <button
                        onClick={() => toggleStatus(article.id)}
                        className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100"
                        title={
                          article.status === "Published"
                            ? "Unpublish"
                            : "Publish"
                        }
                      >
                        {article.status === "Published" ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <CheckCircle className="h-4 w-4" />
                        )}
                      </button>

                      <button
                        onClick={() => setDeleteArticle(article)}
                        className="rounded-lg p-2 text-red-500 transition hover:bg-red-50"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="space-y-4 md:hidden">
        {filteredArticles.map((article) => (
          <div
            key={article.id}
            className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
          >
            <div className="flex gap-3">
              <img
                src={article.image}
                alt={article.title}
                className="h-20 w-24 rounded-xl object-cover"
              />

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="line-clamp-2 text-sm font-semibold text-gray-900">
                    {article.title}
                  </h3>

                  <button
                    onClick={() =>
                      setOpenMenu(
                        openMenu === article.id ? null : article.id
                      )
                    }
                    className="shrink-0 rounded-lg p-1 text-gray-500 hover:bg-gray-100"
                  >
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-blue-50 px-2 py-1 text-[11px] font-medium text-blue-700">
                    {article.category}
                  </span>

                  <StatusBadge status={article.status} />
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
              <span className="text-xs text-gray-500">
                {formatDate(article.date)}
              </span>

              <div className="flex gap-1">
                <button
                  onClick={() =>
                    navigate(`/blog/${article.slug}`)
                  }
                  className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
                >
                  <Eye className="h-4 w-4" />
                </button>

                <button
                  onClick={() =>
                    navigate(`/admin/blog/edit/${article.id}`)
                  }
                  className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                >
                  <Edit className="h-4 w-4" />
                </button>

                <button
                  onClick={() => setDeleteArticle(article)}
                  className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            {openMenu === article.id && (
              <div className="mt-3 rounded-xl border border-gray-200 bg-gray-50 p-2">
                <button
                  onClick={() => toggleStatus(article.id)}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm hover:bg-white"
                >
                  {article.status === "Published" ? (
                    <>
                      <EyeOff className="h-4 w-4" />
                      Unpublish
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4" />
                      Publish
                    </>
                  )}
                </button>

                <button
                  onClick={() => toggleFeatured(article.id)}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm hover:bg-white"
                >
                  <Star className="h-4 w-4" />
                  {article.featured
                    ? "Remove Featured"
                    : "Make Featured"}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredArticles.length === 0 && (
        <div className="rounded-2xl border border-gray-200 bg-white py-16 text-center">
          <FileText className="mx-auto h-12 w-12 text-gray-300" />

          <h3 className="mt-4 text-lg font-semibold text-gray-900">
            No articles found
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Try changing your search or filters.
          </p>
        </div>
      )}

      {/* Delete Modal */}
      {deleteArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <Trash2 className="h-6 w-6 text-red-600" />
            </div>

            <h2 className="mt-4 text-center text-xl font-bold text-gray-900">
              Delete Article?
            </h2>

            <p className="mt-2 text-center text-sm text-gray-500">
              Are you sure you want to delete:
            </p>

            <p className="mt-2 text-center font-semibold text-gray-900">
              "{deleteArticle.title}"
            </p>

            <p className="mt-3 text-center text-xs text-red-500">
              This action cannot be undone.
            </p>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setDeleteArticle(null)}
                className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="flex-1 rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white hover:bg-red-700"
              >
                Delete Article
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  iconBg,
  iconColor,
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm md:p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-gray-500 md:text-sm">
            {title}
          </p>

          <p className="mt-1 text-2xl font-bold text-gray-900 md:text-3xl">
            {value}
          </p>
        </div>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconBg} ${iconColor}`}
        >
          {icon}
        </div>
      </div>
    </div>
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