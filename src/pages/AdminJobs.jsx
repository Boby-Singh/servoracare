import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import AdminLayout from "../layouts/AdminLayout";

const API = import.meta.env.VITE_API_URL;

function AdminJobs() {
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [error, setError] = useState("");

  // ==========================================
  // FETCH APPLICATIONS
  // ==========================================
  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get(
        `${API}/api/admin/job-applications`
      );

      setApplications(
        Array.isArray(res.data) ? res.data : []
      );
    } catch (err) {
      console.error("Fetch Job Applications Error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to load job applications."
      );

      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // UPDATE STATUS
  // ==========================================
  const updateStatus = async (id, status) => {
    try {
      setUpdatingId(id);
      setError("");

      await axios.put(
        `${API}/api/admin/job-status/${id}`,
        { status }
      );

      await fetchApplications();
    } catch (err) {
      console.error("Update Job Status Error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to update application status."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  // ==========================================
  // SEARCH
  // ==========================================
  const filteredApplications = useMemo(() => {
    const value = search.toLowerCase().trim();

    if (!value) return applications;

    return applications.filter((job) => {
      return (
        job.full_name
          ?.toLowerCase()
          .includes(value) ||
        job.email
          ?.toLowerCase()
          .includes(value) ||
        job.phone
          ?.toString()
          .includes(value) ||
        job.city
          ?.toLowerCase()
          .includes(value) ||
        job.position
          ?.toLowerCase()
          .includes(value) ||
        job.aadhaar
          ?.toString()
          .includes(value) ||
        job.pan
          ?.toLowerCase()
          .includes(value)
      );
    });
  }, [applications, search]);

  // ==========================================
  // STATISTICS
  // ==========================================
  const totalApplications = applications.length;

  const appliedCount = applications.filter(
    (job) => job.status === "Applied"
  ).length;

  const shortlistedCount = applications.filter(
    (job) => job.status === "Shortlisted"
  ).length;

  const selectedCount = applications.filter(
    (job) => job.status === "Selected"
  ).length;

  const rejectedCount = applications.filter(
    (job) => job.status === "Rejected"
  ).length;

  // ==========================================
  // STATUS STYLE
  // ==========================================
  const getStatusStyle = (status) => {
    switch (status) {
      case "Applied":
        return "bg-amber-50 text-amber-700 border-amber-200";

      case "Shortlisted":
        return "bg-blue-50 text-blue-700 border-blue-200";

      case "Selected":
        return "bg-green-50 text-green-700 border-green-200";

      case "Rejected":
        return "bg-red-50 text-red-700 border-red-200";

      default:
        return "bg-slate-50 text-slate-600 border-slate-200";
    }
  };

  // ==========================================
  // CONFIRM STATUS
  // ==========================================
  const handleStatusChange = (job, status) => {
    const name = job.full_name || "this applicant";

    if (status === "Rejected") {
      const confirmed = window.confirm(
        `Are you sure you want to reject ${name}'s application?`
      );

      if (!confirmed) return;
    }

    if (status === "Selected") {
      const confirmed = window.confirm(
        `Are you sure you want to select ${name}?`
      );

      if (!confirmed) return;
    }

    updateStatus(job.id || job._id, status);
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-slate-50">

        {/* ==========================================
            HEADER
        ========================================== */}
        <div className="bg-white border-b border-slate-200">

          <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-6">

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

              <div className="flex items-center gap-4">

                <div className="w-12 h-12 rounded-xl bg-blue-900 flex items-center justify-center shadow-sm">
                  <span className="text-white text-xl">
                    💼
                  </span>
                </div>

                <div>

                  <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                    Job Applications
                  </h1>

                  <p className="text-sm text-slate-500 mt-1">
                    Review and manage ServoraCare job applications
                  </p>

                </div>

              </div>

              {/* SYSTEM STATUS */}
              <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full w-fit">

                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />

                <span className="text-sm font-semibold text-green-700">
                  Recruitment System Online
                </span>

              </div>

            </div>

          </div>

        </div>

        {/* ==========================================
            MAIN
        ========================================== */}
        <main className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

          {/* ==========================================
              STATISTICS
          ========================================== */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4 mb-8">

            {/* TOTAL */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition">

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-sm font-medium text-slate-500">
                    Total Applications
                  </p>

                  <p className="text-3xl font-bold text-slate-900 mt-2">
                    {totalApplications}
                  </p>

                </div>

                <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                  <span className="text-xl">
                    👥
                  </span>
                </div>

              </div>

            </div>

            {/* APPLIED */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition">

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-sm font-medium text-slate-500">
                    Applied
                  </p>

                  <p className="text-3xl font-bold text-amber-600 mt-2">
                    {appliedCount}
                  </p>

                </div>

                <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center">
                  <span className="text-xl">
                    📝
                  </span>
                </div>

              </div>

            </div>

            {/* SHORTLISTED */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition">

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-sm font-medium text-slate-500">
                    Shortlisted
                  </p>

                  <p className="text-3xl font-bold text-blue-600 mt-2">
                    {shortlistedCount}
                  </p>

                </div>

                <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                  <span className="text-xl">
                    ⭐
                  </span>
                </div>

              </div>

            </div>

            {/* SELECTED */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition">

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-sm font-medium text-slate-500">
                    Selected
                  </p>

                  <p className="text-3xl font-bold text-green-600 mt-2">
                    {selectedCount}
                  </p>

                </div>

                <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center">
                  <span className="text-xl">
                    ✓
                  </span>
                </div>

              </div>

            </div>

            {/* REJECTED */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition">

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-sm font-medium text-slate-500">
                    Rejected
                  </p>

                  <p className="text-3xl font-bold text-red-600 mt-2">
                    {rejectedCount}
                  </p>

                </div>

                <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center">
                  <span className="text-xl">
                    ✕
                  </span>
                </div>

              </div>

            </div>

          </div>

          {/* ==========================================
              APPLICATION TABLE CARD
          ========================================== */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

            {/* TABLE HEADER */}
            <div className="px-5 sm:px-6 py-5 border-b border-slate-200">

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                <div>

                  <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                    Applicant Directory
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Review candidate information and application status
                  </p>

                </div>

                {/* SEARCH */}
                <div className="relative w-full lg:w-96">

                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    🔎
                  </span>

                  <input
                    type="text"
                    placeholder="Search name, email, city, position..."
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                    className="
                      w-full
                      border
                      border-slate-200
                      rounded-xl
                      pl-10
                      pr-4
                      py-2.5
                      text-sm
                      outline-none
                      bg-slate-50
                      focus:bg-white
                      focus:ring-2
                      focus:ring-blue-500/20
                      focus:border-blue-500
                      transition
                    "
                  />

                </div>

              </div>

            </div>

            {/* ==========================================
                ERROR
            ========================================== */}
            {error && !loading && (

              <div className="mx-5 sm:mx-6 mt-5 p-4 rounded-xl bg-red-50 border border-red-200">

                <div className="flex items-center justify-between gap-4">

                  <p className="text-sm font-medium text-red-700">
                    {error}
                  </p>

                  <button
                    onClick={fetchApplications}
                    className="text-sm font-semibold text-red-700 hover:text-red-900"
                  >
                    Retry
                  </button>

                </div>

              </div>

            )}

            {/* ==========================================
                LOADING
            ========================================== */}
            {loading ? (

              <div className="flex flex-col items-center justify-center py-24">

                <div
                  className="
                    w-10
                    h-10
                    border-4
                    border-blue-100
                    border-t-blue-700
                    rounded-full
                    animate-spin
                  "
                />

                <p className="text-sm text-slate-500 mt-4">
                  Loading applications...
                </p>

              </div>

            ) : filteredApplications.length === 0 ? (

              /* ==========================================
                  EMPTY STATE
              ========================================== */
              <div className="text-center py-24 px-6">

                <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-100 flex items-center justify-center text-2xl">
                  💼
                </div>

                <h3 className="text-lg font-semibold text-slate-900 mt-5">
                  No applications found
                </h3>

                <p className="text-sm text-slate-500 mt-2">
                  {search
                    ? "Try changing your search."
                    : "No job applications have been received yet."}
                </p>

                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="mt-4 text-sm font-semibold text-blue-700 hover:text-blue-900"
                  >
                    Clear Search
                  </button>
                )}

              </div>

            ) : (

              /* ==========================================
                  TABLE
              ========================================== */
              <div className="overflow-x-auto">

                <table className="w-full min-w-[1800px]">

                  <thead className="bg-slate-50 border-b border-slate-200">

                    <tr>

                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                        Applicant
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                        Contact
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                        Location
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                        Position
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                        Experience
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                        Documents
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                        Applied
                      </th>

                      <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-slate-500">
                        Status
                      </th>

                      <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-slate-500">
                        Actions
                      </th>

                    </tr>

                  </thead>

                  <tbody className="divide-y divide-slate-100">

                    {filteredApplications.map((job) => {

                      const jobId = job.id || job._id;

                      const isUpdating =
                        updatingId === jobId;

                      return (

                        <tr
                          key={jobId}
                          className="hover:bg-slate-50/70 transition"
                        >

                          {/* ==================================
                              APPLICANT
                          ================================== */}
                          <td className="px-6 py-5">

                            <div className="flex items-center gap-3">

                              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-sm">

                                {job.full_name
                                  ?.charAt(0)
                                  ?.toUpperCase() || "A"}

                              </div>

                              <div>

                                <div className="font-semibold text-slate-900">
                                  {job.full_name || "-"}
                                </div>

                                <div className="text-xs text-slate-400 mt-0.5">
                                  Candidate
                                </div>

                              </div>

                            </div>

                          </td>

                          {/* ==================================
                              CONTACT
                          ================================== */}
                          <td className="px-6 py-5">

                            <div className="space-y-1">

                              <div className="text-sm text-slate-700 font-medium">
                                {job.email || "-"}
                              </div>

                              <div className="text-xs text-slate-500">
                                📞 {job.phone || "Not provided"}
                              </div>

                            </div>

                          </td>

                          {/* ==================================
                              LOCATION
                          ================================== */}
                          <td className="px-6 py-5">

                            <div className="flex items-center gap-2 text-sm text-slate-700">

                              <span>
                                📍
                              </span>

                              {job.city || "-"}

                            </div>

                          </td>

                          {/* ==================================
                              POSITION
                          ================================== */}
                          <td className="px-6 py-5">

                            <span className="inline-flex px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-sm font-semibold">
                              {job.position || "-"}
                            </span>

                          </td>

                          {/* ==================================
                              EXPERIENCE
                          ================================== */}
                          <td className="px-6 py-5">

                            <span className="text-sm text-slate-700 font-medium">
                              {job.experience || "-"}
                            </span>

                          </td>

                          {/* ==================================
                              DOCUMENTS
                          ================================== */}
                          <td className="px-6 py-5">

                            <div className="flex flex-col gap-2">

                              {job.resume && (
                                <a
                                  href={`${API}/uploads/${job.resume}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="
                                    inline-flex
                                    items-center
                                    gap-2
                                    text-sm
                                    font-semibold
                                    text-blue-700
                                    hover:text-blue-900
                                  "
                                >
                                  📄 View Resume
                                </a>
                              )}

                              {job.aadhaar_file && (
                                <a
                                  href={`${API}/uploads/${job.aadhaar_file}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="
                                    inline-flex
                                    items-center
                                    gap-2
                                    text-sm
                                    font-semibold
                                    text-slate-600
                                    hover:text-slate-900
                                  "
                                >
                                  🪪 View Aadhaar
                                </a>
                              )}

                              {job.photo && (
                                <a
                                  href={`${API}/uploads/${job.photo}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="
                                    inline-flex
                                    items-center
                                    gap-2
                                    text-sm
                                    font-semibold
                                    text-purple-600
                                    hover:text-purple-800
                                  "
                                >
                                  🖼️ View Photo
                                </a>
                              )}

                            </div>

                          </td>

                          {/* ==================================
                              APPLIED DATE
                          ================================== */}
                          <td className="px-6 py-5">

                            <div className="text-sm text-slate-700 font-medium">
                              {job.created_at
                                ? new Date(
                                    job.created_at
                                  ).toLocaleDateString(
                                    "en-IN",
                                    {
                                      day: "2-digit",
                                      month: "short",
                                      year: "numeric",
                                    }
                                  )
                                : "-"}
                            </div>

                          </td>

                          {/* ==================================
                              STATUS
                          ================================== */}
                          <td className="px-6 py-5 text-center">

                            <span
                              className={`
                                inline-flex
                                items-center
                                gap-2
                                px-3
                                py-1.5
                                rounded-full
                                border
                                text-xs
                                font-bold
                                ${getStatusStyle(
                                  job.status
                                )}
                              `}
                            >

                              <span className="w-1.5 h-1.5 rounded-full bg-current" />

                              {job.status || "Applied"}

                            </span>

                          </td>

                          {/* ==================================
                              ACTIONS
                          ================================== */}
                          <td className="px-6 py-5">

                            <div className="flex items-center justify-center gap-2">

                              {job.status !==
                                "Shortlisted" &&
                                job.status !==
                                  "Selected" &&
                                job.status !==
                                  "Rejected" && (

                                  <button
                                    disabled={isUpdating}
                                    onClick={() =>
                                      handleStatusChange(
                                        job,
                                        "Shortlisted"
                                      )
                                    }
                                    className="
                                      px-3
                                      py-2
                                      rounded-lg
                                      bg-blue-600
                                      text-white
                                      text-xs
                                      font-semibold
                                      hover:bg-blue-700
                                      transition
                                      disabled:opacity-50
                                      disabled:cursor-not-allowed
                                    "
                                  >
                                    {isUpdating
                                      ? "Updating..."
                                      : "Shortlist"}
                                  </button>

                                )}

                              {job.status !==
                                "Selected" &&
                                job.status !==
                                  "Rejected" && (

                                  <button
                                    disabled={isUpdating}
                                    onClick={() =>
                                      handleStatusChange(
                                        job,
                                        "Selected"
                                      )
                                    }
                                    className="
                                      px-3
                                      py-2
                                      rounded-lg
                                      bg-green-600
                                      text-white
                                      text-xs
                                      font-semibold
                                      hover:bg-green-700
                                      transition
                                      disabled:opacity-50
                                      disabled:cursor-not-allowed
                                    "
                                  >
                                    {isUpdating
                                      ? "Updating..."
                                      : "Select"}
                                  </button>

                                )}

                              {job.status !==
                                "Rejected" &&
                                job.status !==
                                  "Selected" && (

                                  <button
                                    disabled={isUpdating}
                                    onClick={() =>
                                      handleStatusChange(
                                        job,
                                        "Rejected"
                                      )
                                    }
                                    className="
                                      px-3
                                      py-2
                                      rounded-lg
                                      bg-red-50
                                      text-red-700
                                      border
                                      border-red-200
                                      text-xs
                                      font-semibold
                                      hover:bg-red-100
                                      transition
                                      disabled:opacity-50
                                      disabled:cursor-not-allowed
                                    "
                                  >
                                    Reject
                                  </button>

                                )}

                            </div>

                          </td>

                        </tr>

                      );
                    })}

                  </tbody>

                </table>

              </div>

            )}

            {/* ==========================================
                FOOTER
            ========================================== */}
            {!loading &&
              filteredApplications.length > 0 && (

                <div className="
                  px-5
                  sm:px-6
                  py-4
                  border-t
                  border-slate-200
                  bg-slate-50
                  flex
                  flex-col
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                  gap-2
                ">

                  <p className="text-sm text-slate-500">

                    Showing{" "}

                    <span className="font-semibold text-slate-700">
                      {filteredApplications.length}
                    </span>

                    {" "}of{" "}

                    <span className="font-semibold text-slate-700">
                      {applications.length}
                    </span>

                    {" "}applications

                  </p>

                  {search && (

                    <button
                      onClick={() => setSearch("")}
                      className="
                        text-sm
                        font-semibold
                        text-blue-700
                        hover:text-blue-900
                      "
                    >
                      Clear Search
                    </button>

                  )}

                </div>

              )}

          </div>

        </main>

      </div>
    </AdminLayout>
  );
}

export default AdminJobs;