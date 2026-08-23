import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import {
  Wrench,
  ClipboardList,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  CalendarDays,
  Search,
  X,
  FileText,
  UserRound,
  Loader2,
  AlertCircle,
  Check,
} from "lucide-react";

const API = import.meta.env.VITE_API_URL;

function TechnicianDashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const [workReport, setWorkReport] = useState("");

  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState(false);
  const [error, setError] = useState("");

  // ==========================================
  // CHECK TECHNICIAN
  // ==========================================

  if (user?.role !== "technician") {
    return <Navigate to="/" replace />;
  }

  // ==========================================
  // FETCH JOBS
  // ==========================================

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get(
        `${API}/api/technician-jobs/${user.id}`
      );

      setJobs(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Fetch Technician Jobs Error:", error);

      setError(
        error.response?.data?.message ||
          "Unable to load assigned jobs."
      );

      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // LOAD JOBS
  // ==========================================

  useEffect(() => {
    fetchJobs();
  }, []);

  // ==========================================
  // COMPLETE JOB
  // ==========================================

  const completeJob = async () => {
    if (!workReport.trim()) {
      return;
    }

    if (!selectedJob) {
      return;
    }

    try {
      setCompleting(true);

      await axios.put(
        `${API}/api/update-status/${selectedJob._id}`,
        {
          status: "Completed",
          technician_comment: workReport.trim(),
        }
      );

      setShowModal(false);
      setWorkReport("");
      setSelectedJob(null);

      await fetchJobs();
    } catch (error) {
      console.error("Complete Job Error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to complete job."
      );
    } finally {
      setCompleting(false);
    }
  };

  // ==========================================
  // SEARCH
  // ==========================================

  const searchValue = search.toLowerCase().trim();

  const filteredJobs = jobs.filter((job) => {
    return (
      job.booking_id
        ?.toString()
        .toLowerCase()
        .includes(searchValue) ||

      job.full_name
        ?.toLowerCase()
        .includes(searchValue) ||

      job.phone
        ?.toString()
        .includes(searchValue) ||

      job.service_type
        ?.toLowerCase()
        .includes(searchValue) ||

      job.address
        ?.toLowerCase()
        .includes(searchValue)
    );
  });

  // ==========================================
  // STATISTICS
  // ==========================================

  const completedJobs = jobs.filter(
    (job) => job.status === "Completed"
  ).length;

  const activeJobs = jobs.filter(
    (job) => job.status === "Accepted"
  ).length;

  const pendingJobs = jobs.filter(
    (job) => job.status === "Pending"
  ).length;

  // ==========================================
  // STATUS UI
  // ==========================================

  const getStatusStyle = (status) => {
    switch (status) {
      case "Accepted":
        return "bg-blue-50 text-blue-700 border-blue-200";

      case "Completed":
        return "bg-green-50 text-green-700 border-green-200";

      case "Pending":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";

      case "Rejected":
        return "bg-red-50 text-red-700 border-red-200";

      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <>
      {/* ==========================================
          SEO
      ========================================== */}

      <Helmet>
        <title>
          Technician Dashboard | ServoraCare
        </title>

        <meta
          name="robots"
          content="noindex,nofollow"
        />

        <meta
          name="description"
          content="ServoraCare technician dashboard for managing assigned service jobs, customer details and completion reports."
        />
      </Helmet>

      <div className="min-h-screen bg-slate-50">

        {/* ==========================================
            HEADER
        ========================================== */}

        <header className="bg-white border-b border-slate-200">

          <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-6">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

              {/* PROFILE */}

              <div className="flex items-center gap-4">

                <div className="w-14 h-14 rounded-2xl bg-blue-900 flex items-center justify-center shadow-sm">

                  <Wrench
                    size={27}
                    className="text-white"
                  />

                </div>

                <div>

                  <p className="text-sm text-slate-500">
                    Technician Dashboard
                  </p>

                  <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">

                    Welcome, {user?.name || "Technician"}

                  </h1>

                </div>

              </div>

              {/* ONLINE STATUS */}

              <div className="flex items-center gap-3">

                <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full">

                  <span className="relative flex h-2.5 w-2.5">

                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />

                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />

                  </span>

                  <span className="text-sm font-semibold text-green-700">
                    Online
                  </span>

                </div>

              </div>

            </div>

          </div>

        </header>

        {/* ==========================================
            MAIN
        ========================================== */}

        <main className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

          {/* ==========================================
              STATISTICS
          ========================================== */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">

            {/* TOTAL */}

            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition">

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-sm font-medium text-slate-500">
                    Total Jobs
                  </p>

                  <h2 className="text-3xl font-bold text-slate-900 mt-2">
                    {jobs.length}
                  </h2>

                </div>

                <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">

                  <ClipboardList
                    size={21}
                    className="text-blue-700"
                  />

                </div>

              </div>

              <p className="text-xs text-slate-400 mt-4">
                All assigned service jobs
              </p>

            </div>

            {/* ACTIVE */}

            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition">

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-sm font-medium text-slate-500">
                    Active Jobs
                  </p>

                  <h2 className="text-3xl font-bold text-blue-600 mt-2">
                    {activeJobs}
                  </h2>

                </div>

                <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">

                  <Clock
                    size={21}
                    className="text-blue-600"
                  />

                </div>

              </div>

              <p className="text-xs text-slate-400 mt-4">
                Currently accepted
              </p>

            </div>

            {/* COMPLETED */}

            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition">

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-sm font-medium text-slate-500">
                    Completed
                  </p>

                  <h2 className="text-3xl font-bold text-green-600 mt-2">
                    {completedJobs}
                  </h2>

                </div>

                <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center">

                  <CheckCircle
                    size={21}
                    className="text-green-600"
                  />

                </div>

              </div>

              <p className="text-xs text-slate-400 mt-4">
                Successfully completed
              </p>

            </div>

            {/* PENDING */}

            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition">

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-sm font-medium text-slate-500">
                    Pending
                  </p>

                  <h2 className="text-3xl font-bold text-yellow-500 mt-2">
                    {pendingJobs}
                  </h2>

                </div>

                <div className="w-11 h-11 rounded-xl bg-yellow-50 flex items-center justify-center">

                  <Clock
                    size={21}
                    className="text-yellow-600"
                  />

                </div>

              </div>

              <p className="text-xs text-slate-400 mt-4">
                Awaiting confirmation
              </p>

            </div>

          </div>

          {/* ==========================================
              JOB SECTION
          ========================================== */}

          <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

            {/* SECTION HEADER */}

            <div className="px-5 sm:px-6 py-5 border-b border-slate-200">

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                <div>

                  <h2 className="text-xl font-bold text-slate-900">
                    Assigned Jobs
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Manage your assigned service requests
                  </p>

                </div>

                {/* SEARCH */}

                <div className="relative w-full lg:w-80">

                  <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    placeholder="Search booking, customer, service..."
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                    className="
                      w-full
                      border
                      border-slate-200
                      bg-slate-50
                      rounded-xl
                      pl-10
                      pr-4
                      py-2.5
                      text-sm
                      outline-none
                      focus:bg-white
                      focus:border-blue-500
                      focus:ring-2
                      focus:ring-blue-500/20
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

              <div className="mx-5 sm:mx-6 mt-5 p-4 bg-red-50 border border-red-200 rounded-xl">

                <div className="flex items-center justify-between gap-4">

                  <div className="flex items-center gap-2 text-red-700">

                    <AlertCircle size={18} />

                    <span className="text-sm font-medium">
                      {error}
                    </span>

                  </div>

                  <button
                    onClick={fetchJobs}
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

                <Loader2
                  size={38}
                  className="text-blue-700 animate-spin"
                />

                <p className="text-sm text-slate-500 mt-4">
                  Loading assigned jobs...
                </p>

              </div>

            ) : filteredJobs.length === 0 ? (

              /* ==========================================
                 EMPTY
              ========================================== */

              <div className="text-center py-24 px-6">

                <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-100 flex items-center justify-center">

                  <ClipboardList
                    size={28}
                    className="text-slate-400"
                  />

                </div>

                <h3 className="text-lg font-semibold text-slate-900 mt-5">
                  No jobs found
                </h3>

                <p className="text-sm text-slate-500 mt-2">
                  {search
                    ? "Try changing your search."
                    : "You don't have any assigned jobs yet."}
                </p>

              </div>

            ) : (

              /* ==========================================
                 TABLE
              ========================================== */

              <div className="overflow-x-auto">

                <table className="w-full min-w-[1250px]">

                  <thead className="bg-slate-50 border-b border-slate-200">

                    <tr>

                      <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                        Booking
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                        Customer
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                        Service
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                        Location
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                        Schedule
                      </th>

                      <th className="px-5 py-4 text-center text-xs font-bold uppercase tracking-wider text-slate-500">
                        Status
                      </th>

                      <th className="px-5 py-4 text-center text-xs font-bold uppercase tracking-wider text-slate-500">
                        Action
                      </th>

                    </tr>

                  </thead>

                  <tbody className="divide-y divide-slate-100">

                    {filteredJobs.map((job) => (

                      <tr
                        key={job._id}
                        className="hover:bg-slate-50/70 transition"
                      >

                        {/* BOOKING */}

                        <td className="px-5 py-5">

                          <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 font-bold text-sm">

                            #{job.booking_id || "-"}

                          </span>

                        </td>

                        {/* CUSTOMER */}

                        <td className="px-5 py-5">

                          <div className="flex items-center gap-3">

                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">

                              <UserRound
                                size={18}
                                className="text-slate-500"
                              />

                            </div>

                            <div>

                              <p className="font-semibold text-slate-900">
                                {job.full_name || "Unknown"}
                              </p>

                              <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">

                                <Phone size={12} />

                                {job.phone || "-"}

                              </div>

                            </div>

                          </div>

                        </td>

                        {/* SERVICE */}

                        <td className="px-5 py-5">

                          <div className="flex items-center gap-2">

                            <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center">

                              <Wrench
                                size={17}
                                className="text-orange-600"
                              />

                            </div>

                            <span className="font-medium text-slate-800">
                              {job.service_type || "-"}
                            </span>

                          </div>

                        </td>

                        {/* LOCATION */}

                        <td className="px-5 py-5 max-w-xs">

                          <div className="flex items-start gap-2">

                            <MapPin
                              size={17}
                              className="text-red-500 mt-0.5 shrink-0"
                            />

                            <span className="text-sm text-slate-600 line-clamp-2">
                              {job.address || "-"}
                            </span>

                          </div>

                        </td>

                        {/* SCHEDULE */}

                        <td className="px-5 py-5">

                          <div className="space-y-1">

                            <div className="flex items-center gap-2 text-sm font-medium text-slate-700">

                              <CalendarDays
                                size={15}
                                className="text-blue-600"
                              />

                              {job.visit_date
                                ? new Date(
                                    job.visit_date
                                  ).toLocaleDateString()
                                : "-"}

                            </div>

                            <div className="text-xs text-slate-500 ml-5">

                              {job.visit_time || "Time not specified"}

                            </div>

                          </div>

                        </td>

                        {/* STATUS */}

                        <td className="px-5 py-5 text-center">

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
                              ${getStatusStyle(job.status)}
                            `}
                          >

                            <span className="w-1.5 h-1.5 rounded-full bg-current" />

                            {job.status}

                          </span>

                        </td>

                        {/* ACTION */}

                        <td className="px-5 py-5 text-center">

                          {job.status === "Accepted" ? (

                            <button
                              onClick={() => {
                                setSelectedJob(job);
                                setShowModal(true);
                              }}
                              className="
                                inline-flex
                                items-center
                                gap-2
                                px-4
                                py-2.5
                                rounded-xl
                                bg-green-600
                                text-white
                                text-sm
                                font-semibold
                                hover:bg-green-700
                                active:scale-95
                                transition
                              "
                            >

                              <CheckCircle size={16} />

                              Complete

                            </button>

                          ) : job.status === "Completed" ? (

                            <span className="inline-flex items-center gap-1.5 text-green-600 font-semibold text-sm">

                              <Check size={17} />

                              Completed

                            </span>

                          ) : (

                            <span className="text-slate-400 text-sm">
                              No action
                            </span>

                          )}

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            )}

            {/* ==========================================
                FOOTER
            ========================================== */}

            {!loading && filteredJobs.length > 0 && (

              <div className="px-5 sm:px-6 py-4 border-t border-slate-200 bg-slate-50">

                <p className="text-sm text-slate-500">

                  Showing{" "}

                  <span className="font-semibold text-slate-700">
                    {filteredJobs.length}
                  </span>{" "}

                  of{" "}

                  <span className="font-semibold text-slate-700">
                    {jobs.length}
                  </span>{" "}

                  jobs

                </p>

              </div>

            )}

          </section>

        </main>

        {/* ==========================================
            COMPLETE JOB MODAL
        ========================================== */}

        {showModal && selectedJob && (

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

            {/* BACKDROP */}

            <div
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
              onClick={() => {
                if (!completing) {
                  setShowModal(false);
                  setWorkReport("");
                  setSelectedJob(null);
                }
              }}
            />

            {/* MODAL */}

            <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">

              {/* MODAL HEADER */}

              <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">

                    <FileText
                      size={20}
                      className="text-green-600"
                    />

                  </div>

                  <div>

                    <h2 className="text-lg font-bold text-slate-900">
                      Complete Job
                    </h2>

                    <p className="text-xs text-slate-500">
                      Booking #{selectedJob.booking_id}
                    </p>

                  </div>

                </div>

                <button
                  disabled={completing}
                  onClick={() => {
                    setShowModal(false);
                    setWorkReport("");
                    setSelectedJob(null);
                  }}
                  className="w-9 h-9 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-500 transition"
                >

                  <X size={20} />

                </button>

              </div>

              {/* MODAL BODY */}

              <div className="p-6">

                {/* JOB SUMMARY */}

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-5">

                  <div className="grid grid-cols-2 gap-4">

                    <div>

                      <p className="text-xs text-slate-500">
                        Customer
                      </p>

                      <p className="font-semibold text-slate-800 mt-1">
                        {selectedJob.full_name}
                      </p>

                    </div>

                    <div>

                      <p className="text-xs text-slate-500">
                        Service
                      </p>

                      <p className="font-semibold text-slate-800 mt-1">
                        {selectedJob.service_type}
                      </p>

                    </div>

                  </div>

                </div>

                <label className="block text-sm font-semibold text-slate-800 mb-2">

                  Work Completion Report

                  <span className="text-red-500 ml-1">
                    *
                  </span>

                </label>

                <textarea
                  value={workReport}
                  onChange={(e) =>
                    setWorkReport(e.target.value)
                  }
                  rows="7"
                  disabled={completing}
                  placeholder={`Example:

• Equipment inspected
• Fault identified
• Required repair completed
• Parts replaced
• Testing completed successfully`}
                  className="
                    w-full
                    border
                    border-slate-200
                    rounded-xl
                    p-4
                    text-sm
                    text-slate-700
                    outline-none
                    resize-none
                    focus:border-blue-500
                    focus:ring-2
                    focus:ring-blue-500/20
                    transition
                  "
                />

                <p className="text-xs text-slate-400 mt-2">
                  Please provide a clear summary of the work performed.
                </p>

              </div>

              {/* MODAL FOOTER */}

              <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">

                <button
                  disabled={completing}
                  onClick={() => {
                    setShowModal(false);
                    setWorkReport("");
                    setSelectedJob(null);
                  }}
                  className="
                    px-5
                    py-2.5
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    text-slate-700
                    text-sm
                    font-semibold
                    hover:bg-slate-100
                    transition
                  "
                >
                  Cancel
                </button>

                <button
                  disabled={
                    completing ||
                    !workReport.trim()
                  }
                  onClick={completeJob}
                  className="
                    inline-flex
                    items-center
                    gap-2
                    px-5
                    py-2.5
                    rounded-xl
                    bg-green-600
                    text-white
                    text-sm
                    font-semibold
                    hover:bg-green-700
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                    transition
                  "
                >

                  {completing ? (

                    <>
                      <Loader2
                        size={17}
                        className="animate-spin"
                      />

                      Completing...

                    </>

                  ) : (

                    <>
                      <CheckCircle size={17} />

                      Submit & Complete
                    </>

                  )}

                </button>

              </div>

            </div>

          </div>

        )}

      </div>
    </>
  );
}

export default TechnicianDashboard;