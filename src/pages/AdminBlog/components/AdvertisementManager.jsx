import { useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  ExternalLink,
  Megaphone,
  MousePointerClick,
  BarChart3,
} from "lucide-react";

const initialAds = [
  {
    id: 1,
    title: "Premium Home Interior Services",
    advertiserName: "ABC Interiors",
    imageUrl:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800&q=80",
    targetUrl: "https://example.com",
    position: "article-middle",
    status: "Active",
    startDate: "2026-09-01",
    endDate: "2026-10-01",
    impressions: 1250,
    clicks: 86,
  },
  {
    id: 2,
    title: "Electrical & Hardware Store",
    advertiserName: "Gwalior Hardware",
    imageUrl:
      "https://images.unsplash.com/photo-1581147036324-c1c5a1e2a7c1?auto=format&fit=crop&w=800&q=80",
    targetUrl: "https://example.com",
    position: "blog-sidebar",
    status: "Inactive",
    startDate: "2026-08-01",
    endDate: "2026-08-31",
    impressions: 980,
    clicks: 42,
  },
];

function AdvertisementManager() {
  const [ads, setAds] = useState(initialAds);
  const [showForm, setShowForm] = useState(false);
  const [editingAd, setEditingAd] = useState(null);

  const [form, setForm] = useState({
    title: "",
    advertiserName: "",
    imageUrl: "",
    targetUrl: "",
    position: "article-middle",
    startDate: "",
    endDate: "",
    status: "Inactive",
  });

  const resetForm = () => {
    setForm({
      title: "",
      advertiserName: "",
      imageUrl: "",
      targetUrl: "",
      position: "article-middle",
      startDate: "",
      endDate: "",
      status: "Inactive",
    });

    setEditingAd(null);
    setShowForm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingAd) {
      setAds((prev) =>
        prev.map((ad) =>
          ad.id === editingAd.id
            ? {
                ...ad,
                ...form,
              }
            : ad
        )
      );
    } else {
      const newAd = {
        id: Date.now(),
        ...form,
        impressions: 0,
        clicks: 0,
      };

      setAds((prev) => [newAd, ...prev]);
    }

    resetForm();
  };

  const handleEdit = (ad) => {
    setEditingAd(ad);

    setForm({
      title: ad.title,
      advertiserName: ad.advertiserName,
      imageUrl: ad.imageUrl,
      targetUrl: ad.targetUrl,
      position: ad.position,
      startDate: ad.startDate,
      endDate: ad.endDate,
      status: ad.status,
    });

    setShowForm(true);
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this advertisement?"
    );

    if (!confirmed) return;

    setAds((prev) => prev.filter((ad) => ad.id !== id));
  };

  const toggleStatus = (id) => {
    setAds((prev) =>
      prev.map((ad) =>
        ad.id === id
          ? {
              ...ad,
              status: ad.status === "Active" ? "Inactive" : "Active",
            }
          : ad
      )
    );
  };

  const totalImpressions = ads.reduce(
    (sum, ad) => sum + ad.impressions,
    0
  );

  const totalClicks = ads.reduce((sum, ad) => sum + ad.clicks, 0);

  const activeAds = ads.filter((ad) => ad.status === "Active").length;

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Advertisement Management
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Manage advertisements displayed across your ServoraCare blog.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingAd(null);
            setShowForm(true);
          }}
          className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl font-semibold transition"
        >
          <Plus size={18} />
          Add Advertisement
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Active Ads
              </p>

              <p className="text-2xl font-bold text-slate-900 mt-1">
                {activeAds}
              </p>
            </div>

            <div className="p-3 bg-orange-50 rounded-xl">
              <Megaphone
                size={22}
                className="text-orange-500"
              />
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Total Impressions
              </p>

              <p className="text-2xl font-bold text-slate-900 mt-1">
                {totalImpressions.toLocaleString()}
              </p>
            </div>

            <div className="p-3 bg-blue-50 rounded-xl">
              <Eye
                size={22}
                className="text-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Total Clicks
              </p>

              <p className="text-2xl font-bold text-slate-900 mt-1">
                {totalClicks.toLocaleString()}
              </p>
            </div>

            <div className="p-3 bg-green-50 rounded-xl">
              <MousePointerClick
                size={22}
                className="text-green-500"
              />
            </div>
          </div>
        </div>

      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6">

          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                {editingAd
                  ? "Edit Advertisement"
                  : "Create Advertisement"}
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                Configure how the advertisement appears on your blog.
              </p>
            </div>

            <button
              onClick={resetForm}
              className="text-slate-500 hover:text-slate-900"
            >
              ✕
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >

            {/* Advertisement Title */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Advertisement Title
              </label>

              <input
                type="text"
                required
                value={form.title}
                onChange={(e) =>
                  setForm({
                    ...form,
                    title: e.target.value,
                  })
                }
                placeholder="e.g. Premium Interior Services"
                className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            {/* Advertiser */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Advertiser Name
              </label>

              <input
                type="text"
                required
                value={form.advertiserName}
                onChange={(e) =>
                  setForm({
                    ...form,
                    advertiserName: e.target.value,
                  })
                }
                placeholder="Business / Company name"
                className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            {/* Image */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Advertisement Image URL
              </label>

              <input
                type="url"
                required
                value={form.imageUrl}
                onChange={(e) =>
                  setForm({
                    ...form,
                    imageUrl: e.target.value,
                  })
                }
                placeholder="https://..."
                className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            {/* Target URL */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Advertisement Link
              </label>

              <input
                type="url"
                required
                value={form.targetUrl}
                onChange={(e) =>
                  setForm({
                    ...form,
                    targetUrl: e.target.value,
                  })
                }
                placeholder="https://advertiser-website.com"
                className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            {/* Position */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Advertisement Position
              </label>

              <select
                value={form.position}
                onChange={(e) =>
                  setForm({
                    ...form,
                    position: e.target.value,
                  })
                }
                className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option value="blog-top">
                  Blog Top
                </option>

                <option value="blog-middle">
                  Blog Middle
                </option>

                <option value="blog-sidebar">
                  Blog Sidebar
                </option>

                <option value="article-top">
                  Article Top
                </option>

                <option value="article-middle">
                  Article Middle
                </option>

                <option value="article-bottom">
                  Article Bottom
                </option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Status
              </label>

              <select
                value={form.status}
                onChange={(e) =>
                  setForm({
                    ...form,
                    status: e.target.value,
                  })
                }
                className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option value="Active">
                  Active
                </option>

                <option value="Inactive">
                  Inactive
                </option>
              </select>
            </div>

            {/* Start Date */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Start Date
              </label>

              <input
                type="date"
                required
                value={form.startDate}
                onChange={(e) =>
                  setForm({
                    ...form,
                    startDate: e.target.value,
                  })
                }
                className="w-full border border-slate-300 rounded-xl px-4 py-3"
              />
            </div>

            {/* End Date */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                End Date
              </label>

              <input
                type="date"
                required
                value={form.endDate}
                onChange={(e) =>
                  setForm({
                    ...form,
                    endDate: e.target.value,
                  })
                }
                className="w-full border border-slate-300 rounded-xl px-4 py-3"
              />
            </div>

            {/* Preview */}
            {form.imageUrl && (
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Advertisement Preview
                </label>

                <div className="border border-slate-200 rounded-xl overflow-hidden max-w-2xl">
                  <img
                    src={form.imageUrl}
                    alt="Advertisement preview"
                    className="w-full max-h-64 object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="md:col-span-2 flex flex-col sm:flex-row gap-3 pt-3">

              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold"
              >
                {editingAd
                  ? "Update Advertisement"
                  : "Create Advertisement"}
              </button>

              <button
                type="button"
                onClick={resetForm}
                className="border border-slate-300 hover:bg-slate-50 px-6 py-3 rounded-xl font-semibold"
              >
                Cancel
              </button>

            </div>

          </form>
        </div>
      )}

      {/* Advertisement Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">

        <div className="px-6 py-5 border-b border-slate-200">
          <h3 className="font-bold text-slate-900">
            Advertisements
          </h3>
        </div>

        {/* Desktop */}
        <div className="hidden lg:block overflow-x-auto">

          <table className="w-full">

            <thead className="bg-slate-50">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                  Advertisement
                </th>

                <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                  Position
                </th>

                <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                  Status
                </th>

                <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                  Performance
                </th>

                <th className="text-right px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">

              {ads.map((ad) => (
                <tr key={ad.id} className="hover:bg-slate-50">

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">

                      <img
                        src={ad.imageUrl}
                        alt={ad.title}
                        className="w-24 h-14 rounded-lg object-cover"
                      />

                      <div>
                        <p className="font-semibold text-slate-900">
                          {ad.title}
                        </p>

                        <p className="text-sm text-slate-500">
                          {ad.advertiserName}
                        </p>
                      </div>

                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600">
                      {ad.position}
                    </span>
                  </td>

                  <td className="px-6 py-4">

                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                        ad.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {ad.status}
                    </span>

                  </td>

                  <td className="px-6 py-4">

                    <div className="text-sm">
                      <p>
                        <span className="font-semibold">
                          {ad.impressions.toLocaleString()}
                        </span>{" "}
                        views
                      </p>

                      <p className="text-slate-500">
                        {ad.clicks} clicks
                      </p>
                    </div>

                  </td>

                  <td className="px-6 py-4">

                    <div className="flex justify-end gap-2">

                      <button
                        onClick={() => toggleStatus(ad.id)}
                        title={
                          ad.status === "Active"
                            ? "Deactivate"
                            : "Activate"
                        }
                        className="p-2 rounded-lg hover:bg-slate-100"
                      >
                        {ad.status === "Active" ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>

                      <button
                        onClick={() => handleEdit(ad)}
                        title="Edit"
                        className="p-2 rounded-lg hover:bg-slate-100"
                      >
                        <Pencil size={18} />
                      </button>

                      <a
                        href={ad.targetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Open advertisement"
                        className="p-2 rounded-lg hover:bg-slate-100"
                      >
                        <ExternalLink size={18} />
                      </a>

                      <button
                        onClick={() => handleDelete(ad.id)}
                        title="Delete"
                        className="p-2 rounded-lg hover:bg-red-50 text-red-500"
                      >
                        <Trash2 size={18} />
                      </button>

                    </div>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>
        </div>

        {/* Mobile */}
        <div className="lg:hidden divide-y divide-slate-100">

          {ads.map((ad) => (
            <div key={ad.id} className="p-5">

              <div className="flex gap-4">

                <img
                  src={ad.imageUrl}
                  alt={ad.title}
                  className="w-24 h-16 rounded-lg object-cover"
                />

                <div className="flex-1">

                  <h4 className="font-bold text-slate-900">
                    {ad.title}
                  </h4>

                  <p className="text-sm text-slate-500">
                    {ad.advertiserName}
                  </p>

                  <span
                    className={`inline-flex mt-2 px-2 py-1 rounded-full text-xs font-bold ${
                      ad.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {ad.status}
                  </span>

                </div>

              </div>

              <div className="grid grid-cols-2 gap-3 mt-4 text-sm">

                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="text-slate-500">
                    Impressions
                  </p>
                  <p className="font-bold">
                    {ad.impressions.toLocaleString()}
                  </p>
                </div>

                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="text-slate-500">
                    Clicks
                  </p>
                  <p className="font-bold">
                    {ad.clicks}
                  </p>
                </div>

              </div>

              <div className="flex gap-2 mt-4">

                <button
                  onClick={() => toggleStatus(ad.id)}
                  className="flex-1 border border-slate-300 rounded-lg py-2 text-sm font-semibold"
                >
                  {ad.status === "Active"
                    ? "Deactivate"
                    : "Activate"}
                </button>

                <button
                  onClick={() => handleEdit(ad)}
                  className="p-2 border border-slate-300 rounded-lg"
                >
                  <Pencil size={18} />
                </button>

                <button
                  onClick={() => handleDelete(ad.id)}
                  className="p-2 border border-red-200 text-red-500 rounded-lg"
                >
                  <Trash2 size={18} />
                </button>

              </div>

            </div>
          ))}

        </div>

        {ads.length === 0 && (
          <div className="py-16 text-center">

            <BarChart3
              size={40}
              className="mx-auto text-slate-300"
            />

            <p className="mt-3 font-semibold text-slate-700">
              No advertisements yet
            </p>

            <p className="text-sm text-slate-500">
              Create your first advertisement.
            </p>

          </div>
        )}

      </div>

    </div>
  );
}

export default AdvertisementManager;