import { useEffect, useMemo, useState } from "react";
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
  ShieldCheck,
  IndianRupee,
  TrendingUp,
  BriefcaseBusiness,
  RefreshCw,
  ChevronRight,
  Mail,
  Headphones,
  CircleHelp,
} from "lucide-react";

const API = import.meta.env.VITE_API_URL;

function TechnicianDashboard() {

  // =====================================================
  // USER
  // =====================================================

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  // =====================================================
  // JOB STATES
  // =====================================================

  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");

  // =====================================================
  // COMPLETION MODALS
  // =====================================================

  const [showModal, setShowModal] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);

  const [selectedJob, setSelectedJob] = useState(null);

  const [workReport, setWorkReport] = useState("");
  const [otp, setOtp] = useState("");

  // =====================================================
  // REJECT MODAL
  // =====================================================

  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  // =====================================================
  // LOADING
  // =====================================================

  const [loading, setLoading] = useState(true);
  const [otpLoading, setOtpLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [responseLoading, setResponseLoading] = useState(false);

  // =====================================================
  // ERRORS
  // =====================================================

  const [error, setError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [responseError, setResponseError] = useState("");

  // =====================================================
  // FETCH TECHNICIAN JOBS
  // =====================================================

  const fetchJobs = async (showRefreshLoader = false) => {
    try {

      if (showRefreshLoader) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const res = await axios.get(
        `${API}/api/technician-jobs/${user.id}`
      );

      setJobs(
        Array.isArray(res.data)
          ? res.data
          : []
      );

    } catch (err) {

      console.error(
        "Fetch Technician Jobs Error:",
        err
      );

      setError(
        err.response?.data?.message ||
        "Unable to load assigned jobs."
      );

      setJobs([]);

    } finally {

      setLoading(false);
      setRefreshing(false);

    }
  };

  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {

    if (
      user?.role === "technician" &&
      user?.id
    ) {
      fetchJobs();
    }

  }, []);

  // =====================================================
  // EARNING HELPER
  // =====================================================

  const getJobEarning = (job) => {

    const amount =
      job?.technician_earning ??
      job?.technician_amount ??
      job?.earning ??
      job?.amount ??
      0;

    const parsed = Number(amount);

    return Number.isFinite(parsed)
      ? parsed
      : 0;
  };

  // =====================================================
  // STATISTICS
  // =====================================================

  const completedJobs = jobs.filter(
    (job) =>
      job.status === "Completed"
  ).length;

  const activeJobs = jobs.filter(
    (job) =>
      job.technician_response === "Accepted" &&
      job.status === "Accepted"
  ).length;

  const pendingJobs = jobs.filter(
    (job) =>
      job.technician_response === "Pending"
  ).length;

  const rejectedJobs = jobs.filter(
    (job) =>
      job.technician_response === "Rejected"
  ).length;

  const totalEarnings = jobs
    .filter(
      (job) =>
        job.status === "Completed"
    )
    .reduce(
      (total, job) =>
        total + getJobEarning(job),
      0
    );

  // =====================================================
  // SEARCH
  // =====================================================

  const filteredJobs = useMemo(() => {

    const searchValue =
      search
        .toLowerCase()
        .trim();

    if (!searchValue) {
      return jobs;
    }

    return jobs.filter((job) => {

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

  }, [jobs, search]);

  // =====================================================
  // DISPLAY STATUS
  // =====================================================

  const getDisplayStatus = (job) => {

    if (
      job.technician_response === "Pending"
    ) {
      return "Awaiting Response";
    }

    if (
      job.technician_response === "Rejected"
    ) {
      return "Rejected";
    }

    return job.status;
  };

  // =====================================================
  // STATUS STYLE
  // =====================================================

  const getStatusStyle = (status) => {

    switch (status) {

      case "Accepted":

        return {
          bg: "bg-blue-50",
          text: "text-blue-700",
          border: "border-blue-200",
          dot: "bg-blue-500"
        };

      case "Completed":

        return {
          bg: "bg-emerald-50",
          text: "text-emerald-700",
          border: "border-emerald-200",
          dot: "bg-emerald-500"
        };

      case "Awaiting Response":
      case "Pending":

        return {
          bg: "bg-amber-50",
          text: "text-amber-700",
          border: "border-amber-200",
          dot: "bg-amber-500"
        };

      case "Rejected":

        return {
          bg: "bg-red-50",
          text: "text-red-700",
          border: "border-red-200",
          dot: "bg-red-500"
        };

      default:

        return {
          bg: "bg-slate-50",
          text: "text-slate-700",
          border: "border-slate-200",
          dot: "bg-slate-400"
        };
    }
  };

  // =====================================================
  // ACCEPT JOB
  // =====================================================

  const acceptJob = async (job) => {

    if (!job) return;

    try {

      setResponseLoading(true);
      setResponseError("");

      const response = await axios.put(
        `${API}/api/technician-response/${job.booking_id}`,
        {
          technician_id: user.id,
          response: "Accepted"
        }
      );

      if (response.data.success) {

        await fetchJobs();

        alert(
          "Job accepted successfully!"
        );
      }

    } catch (err) {

      console.error(
        "Accept Job Error:",
        err
      );

      setResponseError(
        err.response?.data?.message ||
        "Unable to accept this job."
      );

    } finally {

      setResponseLoading(false);

    }
  };

  // =====================================================
  // OPEN REJECT MODAL
  // =====================================================

  const openRejectModal = (job) => {

    setSelectedJob(job);
    setRejectionReason("");
    setResponseError("");
    setShowRejectModal(true);

  };

  // =====================================================
  // CLOSE REJECT MODAL
  // =====================================================

  const closeRejectModal = () => {

    if (responseLoading) return;

    setShowRejectModal(false);
    setRejectionReason("");
    setResponseError("");
    setSelectedJob(null);

  };

  // =====================================================
  // REJECT JOB
  // =====================================================

  const rejectJob = async () => {

    if (!selectedJob) return;

    const reason =
      rejectionReason.trim();

    if (!reason) {

      setResponseError(
        "Please provide a reason for rejecting this job."
      );

      return;
    }

    if (reason.length > 500) {

      setResponseError(
        "Rejection reason cannot exceed 500 characters."
      );

      return;
    }

    try {

      setResponseLoading(true);
      setResponseError("");

      const response = await axios.put(
        `${API}/api/technician-response/${selectedJob.booking_id}`,
        {
          technician_id: user.id,
          response: "Rejected",
          rejection_reason: reason
        }
      );

      if (response.data.success) {

        setShowRejectModal(false);
        setRejectionReason("");
        setSelectedJob(null);
        setResponseError("");

        await fetchJobs();

        alert(
          "Job rejected successfully."
        );
      }

    } catch (err) {

      console.error(
        "Reject Job Error:",
        err
      );

      setResponseError(
        err.response?.data?.message ||
        "Unable to reject this job."
      );

    } finally {

      setResponseLoading(false);

    }
  };

  // =====================================================
  // OPEN COMPLETE MODAL
  // =====================================================

  const openCompleteModal = (job) => {

    setSelectedJob(job);
    setWorkReport("");
    setOtp("");
    setOtpError("");
    setShowModal(true);

  };

  // =====================================================
  // CLOSE COMPLETE MODAL
  // =====================================================

  const closeCompleteModal = () => {

    if (otpLoading) return;

    setShowModal(false);
    setWorkReport("");
    setSelectedJob(null);

  };

  // =====================================================
  // REQUEST COMPLETION OTP
  // =====================================================

  const requestCompletionOTP = async () => {

    if (!selectedJob) return;

    if (!workReport.trim()) {

      setOtpError(
        "Please enter the work completion report."
      );

      return;
    }

    try {

      setOtpLoading(true);
      setOtpError("");

      const response = await axios.post(
        `${API}/api/bookings/${selectedJob._id}/request-completion-otp`
      );

      if (response.data.success) {

        setShowModal(false);
        setOtp("");
        setOtpError("");
        setShowOTPModal(true);

      }

    } catch (err) {

      console.error(
        "Request Completion OTP Error:",
        err
      );

      setOtpError(
        err.response?.data?.message ||
        "Unable to send customer OTP."
      );

    } finally {

      setOtpLoading(false);

    }
  };

  // =====================================================
  // VERIFY COMPLETION OTP
  // =====================================================

  const verifyCompletionOTP = async () => {

    if (!selectedJob) return;

    if (otp.length !== 6) {

      setOtpError(
        "Please enter the 6-digit OTP."
      );

      return;
    }

    try {

      setOtpLoading(true);
      setOtpError("");

      const response = await axios.post(
        `${API}/api/bookings/${selectedJob._id}/verify-completion-otp`,
        {
          otp: otp,
          technician_comment:
            workReport.trim(),
        }
      );

      if (response.data.success) {

        setShowOTPModal(false);
        setOtp("");
        setWorkReport("");
        setSelectedJob(null);
        setOtpError("");

        await fetchJobs();

        alert(
          "Service completed successfully!"
        );
      }

    } catch (err) {

      console.error(
        "Verify Completion OTP Error:",
        err
      );

      setOtpError(
        err.response?.data?.message ||
        "Invalid OTP. Please try again."
      );

    } finally {

      setOtpLoading(false);

    }
  };

  // =====================================================
  // CLOSE OTP MODAL
  // =====================================================

  const closeOTPModal = () => {

    if (otpLoading) return;

    setShowOTPModal(false);
    setOtp("");
    setOtpError("");

  };

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {

    if (!date) return "Not scheduled";

    try {

      return new Date(date).toLocaleDateString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric"
        }
      );

    } catch {

      return date;
    }
  };

  // =====================================================
  // PROTECT ROUTE
  // =====================================================

  if (user?.role !== "technician") {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <>
      <Helmet>

        <title>
          Technician Dashboard | ServoraCare
        </title>

        <meta
          name="description"
          content="ServoraCare technician dashboard for managing assigned service jobs."
        />

      </Helmet>

      <div className="min-h-screen bg-slate-50">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="h-16 flex items-center justify-between">

              <div className="flex items-center gap-3 min-w-0">

                <div className="h-10 w-10 shrink-0 rounded-xl bg-blue-600 flex items-center justify-center shadow-sm">

                  <Wrench
                    size={21}
                    className="text-white"
                  />

                </div>

                <div className="min-w-0">

                  <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
                    ServoraCare
                  </p>

                  <h1 className="text-sm sm:text-base font-bold text-slate-900 truncate">
                    Technician Dashboard
                  </h1>

                </div>

              </div>

              <button
                type="button"
                onClick={() => fetchJobs(true)}
                disabled={refreshing}
                className="h-10 w-10 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-slate-50 transition disabled:opacity-50"
                title="Refresh"
              >

                <RefreshCw
                  size={18}
                  className={
                    refreshing
                      ? "animate-spin"
                      : ""
                  }
                />

              </button>

            </div>

          </div>

        </header>

        {/* =====================================================
            MAIN
        ===================================================== */}

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

          {/* =====================================================
              WELCOME
          ===================================================== */}

          <section className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-blue-600 to-blue-700 text-white p-5 sm:p-7 lg:p-8 shadow-lg">

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

              <div>

                <div className="flex items-center gap-2 text-blue-100 text-sm font-medium mb-2">

                  <ShieldCheck size={17} />

                  Verified Service Partner

                </div>

                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">

                  Welcome,{" "}
                  {user?.name || "Technician"}

                </h2>

                <p className="mt-2 max-w-2xl text-sm sm:text-base text-blue-100 leading-6">

                  Manage your assigned service jobs,
                  respond to new assignments and
                  complete services securely.

                </p>

              </div>

              <div className="shrink-0 rounded-2xl bg-white/10 border border-white/20 px-5 py-4">

                <p className="text-xs text-blue-100">
                  Technician ID
                </p>

                <p className="mt-1 font-bold text-lg">
                  {user?.employee_code ||
                    user?.id ||
                    "—"}
                </p>

              </div>

            </div>

          </section>

          {/* =====================================================
              ERROR
          ===================================================== */}

          {error && (

            <div className="mt-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">

              <AlertCircle
                size={19}
                className="mt-0.5 shrink-0 text-red-600"
              />

              <div className="min-w-0">

                <p className="text-sm font-semibold text-red-700">
                  Unable to load jobs
                </p>

                <p className="mt-1 text-sm text-red-600">
                  {error}
                </p>

              </div>

            </div>

          )}

          {/* =====================================================
              EARNINGS + QUICK STATS
          ===================================================== */}

          <section className="mt-6 grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">

            {/* Earnings */}

            <div className="col-span-2 lg:col-span-1 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">

              <div className="flex items-center justify-between">

                <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center">

                  <IndianRupee
                    size={19}
                    className="text-blue-600"
                  />

                </div>

                <TrendingUp
                  size={17}
                  className="text-emerald-500"
                />

              </div>

              <p className="mt-4 text-xs sm:text-sm text-slate-500 font-medium">
                Completed Earnings
              </p>

              <p className="mt-1 text-xl sm:text-2xl font-bold text-slate-900">

                ₹
                {totalEarnings.toLocaleString(
                  "en-IN"
                )}

              </p>

            </div>

            {/* Pending */}

            <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">

              <div className="h-10 w-10 rounded-xl bg-amber-50 flex items-center justify-center">

                <Clock
                  size={19}
                  className="text-amber-600"
                />

              </div>

              <p className="mt-4 text-xs sm:text-sm text-slate-500 font-medium">
                Pending
              </p>

              <p className="mt-1 text-xl sm:text-2xl font-bold text-slate-900">
                {pendingJobs}
              </p>

            </div>

            {/* Active */}

            <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">

              <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center">

                <BriefcaseBusiness
                  size={19}
                  className="text-blue-600"
                />

              </div>

              <p className="mt-4 text-xs sm:text-sm text-slate-500 font-medium">
                Active
              </p>

              <p className="mt-1 text-xl sm:text-2xl font-bold text-slate-900">
                {activeJobs}
              </p>

            </div>

            {/* Completed */}

            <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">

              <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center">

                <CheckCircle
                  size={19}
                  className="text-emerald-600"
                />

              </div>

              <p className="mt-4 text-xs sm:text-sm text-slate-500 font-medium">
                Completed
              </p>

              <p className="mt-1 text-xl sm:text-2xl font-bold text-slate-900">
                {completedJobs}
              </p>

            </div>

            {/* Rejected */}

            <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">

              <div className="h-10 w-10 rounded-xl bg-red-50 flex items-center justify-center">

                <X
                  size={19}
                  className="text-red-600"
                />

              </div>

              <p className="mt-4 text-xs sm:text-sm text-slate-500 font-medium">
                Rejected
              </p>

              <p className="mt-1 text-xl sm:text-2xl font-bold text-slate-900">
                {rejectedJobs}
              </p>

            </div>

          </section>

          {/* =====================================================
              PERFORMANCE STRIP
          ===================================================== */}

          <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

              <div>

                <div className="flex items-center gap-2">

                  <TrendingUp
                    size={19}
                    className="text-blue-600"
                  />

                  <h3 className="font-bold text-slate-900">
                    Your Performance
                  </h3>

                </div>

                <p className="mt-1 text-sm text-slate-500">
                  Keep accepting jobs and completing services on time.
                </p>

              </div>

              <div className="flex items-center gap-6">

                <div>

                  <p className="text-xs text-slate-500">
                    Total Jobs
                  </p>

                  <p className="text-xl font-bold text-slate-900">
                    {jobs.length}
                  </p>

                </div>

                <div className="h-10 w-px bg-slate-200" />

                <div>

                  <p className="text-xs text-slate-500">
                    Completion
                  </p>

                  <p className="text-xl font-bold text-emerald-600">

                    {jobs.length
                      ? Math.round(
                          (completedJobs /
                            jobs.length) *
                            100
                        )
                      : 0}
                    %

                  </p>

                </div>

              </div>

            </div>

            <div className="mt-5 h-2 rounded-full bg-slate-100 overflow-hidden">

              <div
                className="h-full rounded-full bg-blue-600 transition-all"
                style={{
                  width: `${
                    jobs.length
                      ? Math.min(
                          100,
                          Math.round(
                            (completedJobs /
                              jobs.length) *
                              100
                          )
                        )
                      : 0
                  }%`
                }}
              />

            </div>

          </section>

          {/* =====================================================
              ASSIGNED JOBS HEADER
          ===================================================== */}

          <section className="mt-8">

            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">

              <div>

                <div className="flex items-center gap-2">

                  <ClipboardList
                    size={20}
                    className="text-blue-600"
                  />

                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                    Assigned Jobs
                  </h2>

                </div>

                <p className="mt-1 text-sm text-slate-500">
                  Review assignments and respond before starting work.
                </p>

              </div>

              {/* Search */}

              <div className="relative w-full lg:w-80">

                <Search
                  size={17}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search booking, customer, service..."
                  className="w-full h-11 rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />

              </div>

            </div>

          </section>

          {/* =====================================================
              LOADING
          ===================================================== */}

          {loading ? (

            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-12 flex flex-col items-center justify-center">

              <Loader2
                size={30}
                className="animate-spin text-blue-600"
              />

              <p className="mt-4 text-sm font-medium text-slate-600">
                Loading your assigned jobs...
              </p>

            </div>

          ) : filteredJobs.length === 0 ? (

            /* =====================================================
               EMPTY STATE
            ===================================================== */

            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-10 sm:p-14 text-center">

              <div className="mx-auto h-16 w-16 rounded-2xl bg-slate-100 flex items-center justify-center">

                <ClipboardList
                  size={28}
                  className="text-slate-400"
                />

              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900">
                {search
                  ? "No jobs found"
                  : "No assigned jobs"}
              </h3>

              <p className="mt-2 max-w-md mx-auto text-sm leading-6 text-slate-500">

                {search
                  ? "Try searching with another booking number, customer name or service."
                  : "New service assignments will appear here when the administrator assigns a job to you."}

              </p>

            </div>

          ) : (

            <>
              {/* =====================================================
                  DESKTOP TABLE
              ===================================================== */}

              <div className="hidden lg:block mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">

                <div className="overflow-x-auto">

                  <table className="w-full">

                    <thead className="bg-slate-50 border-b border-slate-200">

                      <tr>

                        <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                          Booking
                        </th>

                        <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                          Customer
                        </th>

                        <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                          Service
                        </th>

                        <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                          Schedule
                        </th>

                        <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                          Amount
                        </th>

                        <th className="px-5 py-4 text-center text-xs font-bold uppercase tracking-wide text-slate-500">
                          Status
                        </th>

                        <th className="px-5 py-4 text-center text-xs font-bold uppercase tracking-wide text-slate-500">
                          Action
                        </th>

                      </tr>

                    </thead>

                    <tbody className="divide-y divide-slate-100">

                      {filteredJobs.map((job) => {

                        const status =
                          getDisplayStatus(job);

                        const style =
                          getStatusStyle(status);

                        return (

                          <tr
                            key={job._id}
                            className="hover:bg-slate-50/70 transition"
                          >

                            {/* Booking */}

                            <td className="px-5 py-5">

                              <p className="font-bold text-slate-900">
                                #{job.booking_id}
                              </p>

                              <p className="mt-1 text-xs text-slate-400">
                                {formatDate(
                                  job.created_at
                                )}
                              </p>

                            </td>

                            {/* Customer */}

                            <td className="px-5 py-5">

                              <div className="flex items-start gap-3">

                                <div className="h-9 w-9 shrink-0 rounded-lg bg-slate-100 flex items-center justify-center">

                                  <UserRound
                                    size={17}
                                    className="text-slate-500"
                                  />

                                </div>

                                <div className="min-w-0">

                                  <p className="font-semibold text-sm text-slate-900">
                                    {job.full_name}
                                  </p>

                                  {job.phone && (

                                    <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">

                                      <Phone size={12} />

                                      {job.phone}

                                    </p>

                                  )}

                                </div>

                              </div>

                            </td>

                            {/* Service */}

                            <td className="px-5 py-5">

                              <p className="text-sm font-semibold text-slate-900">
                                {job.service_type}
                              </p>

                              {job.address && (

                                <p className="mt-1 max-w-[220px] text-xs text-slate-500 truncate">

                                  {job.address}

                                </p>

                              )}

                            </td>

                            {/* Schedule */}

                            <td className="px-5 py-5">

                              {job.visit_date ||
                              job.visit_time ? (

                                <div>

                                  <p className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">

                                    <CalendarDays
                                      size={13}
                                    />

                                    {job.visit_date
                                      ? formatDate(
                                          job.visit_date
                                        )
                                      : "Date not set"}

                                  </p>

                                  {job.visit_time && (

                                    <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">

                                      <Clock
                                        size={13}
                                      />

                                      {job.visit_time}

                                    </p>

                                  )}

                                </div>

                              ) : (

                                <span className="text-xs text-slate-400">
                                  Not scheduled
                                </span>

                              )}

                            </td>

                            {/* Amount */}

                            <td className="px-5 py-5">

                              <p className="flex items-center text-sm font-bold text-slate-900">

                                <IndianRupee
                                  size={14}
                                />

                                {getJobEarning(
                                  job
                                ).toLocaleString(
                                  "en-IN"
                                )}

                              </p>

                            </td>

                            {/* Status */}

                            <td className="px-5 py-5 text-center">

                              <span
                                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${style.bg} ${style.text} ${style.border}`}
                              >

                                <span
                                  className={`h-1.5 w-1.5 rounded-full ${style.dot}`}
                                />

                                {status}

                              </span>

                            </td>

                            {/* Action */}

                            <td className="px-5 py-5">

                              {job.technician_response ===
                              "Pending" ? (

                                <div className="flex items-center justify-center gap-2">

                                  <button
                                    type="button"
                                    onClick={() =>
                                      acceptJob(job)
                                    }
                                    disabled={
                                      responseLoading
                                    }
                                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                  >

                                    {responseLoading ? (

                                      <Loader2
                                        size={14}
                                        className="animate-spin"
                                      />

                                    ) : (

                                      <Check
                                        size={14}
                                      />

                                    )}

                                    Accept

                                  </button>

                                  <button
                                    type="button"
                                    onClick={() =>
                                      openRejectModal(
                                        job
                                      )
                                    }
                                    disabled={
                                      responseLoading
                                    }
                                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-red-200 bg-red-50 text-red-700 text-xs font-semibold hover:bg-red-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                  >

                                    <X
                                      size={14}
                                    />

                                    Reject

                                  </button>

                                </div>

                              ) : job.status ===
                                  "Accepted" &&
                                job.technician_response ===
                                  "Accepted" ? (

                                <button
                                  type="button"
                                  onClick={() =>
                                    openCompleteModal(
                                      job
                                    )
                                  }
                                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition"
                                >

                                  <CheckCircle
                                    size={15}
                                  />

                                  Complete

                                </button>

                              ) : job.status ===
                                "Completed" ? (

                                <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-semibold">

                                  <CheckCircle
                                    size={14}
                                  />

                                  Completed

                                </span>

                              ) : job.technician_response ===
                                "Rejected" ? (

                                <div className="text-center">

                                  <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-red-50 text-red-700 text-xs font-semibold">

                                    <X
                                      size={14}
                                    />

                                    Rejected

                                  </span>

                                  {job.technician_rejection_reason && (

                                    <p className="mt-1 max-w-[180px] mx-auto text-[11px] text-slate-500 line-clamp-2">

                                      {
                                        job.technician_rejection_reason
                                      }

                                    </p>

                                  )}

                                </div>

                              ) : (

                                <span className="text-xs text-slate-400">
                                  No action
                                </span>

                              )}

                            </td>

                          </tr>

                        );

                      })}

                    </tbody>

                  </table>

                </div>

              </div>

              {/* =====================================================
                  MOBILE / TABLET CARDS
              ===================================================== */}

              <div className="lg:hidden mt-6 space-y-4">

                {filteredJobs.map((job) => {

                  const status =
                    getDisplayStatus(job);

                  const style =
                    getStatusStyle(status);

                  return (

                    <article
                      key={job._id}
                      className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden"
                    >

                      {/* Card Header */}

                      <div className="p-4 sm:p-5 border-b border-slate-100">

                        <div className="flex items-start justify-between gap-3">

                          <div className="min-w-0">

                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                              Booking
                            </p>

                            <h3 className="mt-1 text-lg font-bold text-slate-900">
                              #{job.booking_id}
                            </h3>

                          </div>

                          <span
                            className={`shrink-0 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${style.bg} ${style.text} ${style.border}`}
                          >

                            <span
                              className={`h-1.5 w-1.5 rounded-full ${style.dot}`}
                            />

                            {status}

                          </span>

                        </div>

                      </div>

                      {/* Customer */}

                      <div className="p-4 sm:p-5">

                        <div className="flex items-start gap-3">

                          <div className="h-11 w-11 shrink-0 rounded-xl bg-blue-50 flex items-center justify-center">

                            <UserRound
                              size={19}
                              className="text-blue-600"
                            />

                          </div>

                          <div className="min-w-0">

                            <p className="text-xs text-slate-400 font-medium">
                              Customer
                            </p>

                            <p className="mt-0.5 font-bold text-slate-900 truncate">
                              {job.full_name}
                            </p>

                            {job.phone && (

                              <a
                                href={`tel:${job.phone}`}
                                className="mt-1 inline-flex items-center gap-1.5 text-sm text-blue-600 font-medium"
                              >

                                <Phone
                                  size={14}
                                />

                                {job.phone}

                              </a>

                            )}

                          </div>

                        </div>

                        {/* Service */}

                        <div className="mt-5 rounded-xl bg-slate-50 p-4">

                          <div className="flex items-start gap-3">

                            <BriefcaseBusiness
                              size={18}
                              className="mt-0.5 shrink-0 text-blue-600"
                            />

                            <div className="min-w-0">

                              <p className="text-xs text-slate-400 font-medium">
                                Service
                              </p>

                              <p className="mt-1 text-sm font-bold text-slate-900">
                                {job.service_type}
                              </p>

                            </div>

                          </div>

                        </div>

                        {/* Address */}

                        {job.address && (

                          <div className="mt-4 flex items-start gap-3">

                            <MapPin
                              size={17}
                              className="mt-0.5 shrink-0 text-slate-400"
                            />

                            <div>

                              <p className="text-xs text-slate-400 font-medium">
                                Service Address
                              </p>

                              <p className="mt-1 text-sm text-slate-700 leading-5">
                                {job.address}
                              </p>

                            </div>

                          </div>

                        )}

                        {/* Schedule + Amount */}

                        <div className="mt-5 grid grid-cols-2 gap-3">

                          <div className="rounded-xl border border-slate-200 p-3">

                            <div className="flex items-center gap-2 text-slate-400">

                              <CalendarDays
                                size={15}
                              />

                              <span className="text-[11px] font-semibold uppercase">
                                Schedule
                              </span>

                            </div>

                            <p className="mt-2 text-xs font-semibold text-slate-800">

                              {job.visit_date
                                ? formatDate(
                                    job.visit_date
                                  )
                                : "Not set"}

                            </p>

                            {job.visit_time && (

                              <p className="mt-1 text-xs text-slate-500">
                                {job.visit_time}
                              </p>

                            )}

                          </div>

                          <div className="rounded-xl border border-slate-200 p-3">

                            <div className="flex items-center gap-2 text-slate-400">

                              <IndianRupee
                                size={15}
                              />

                              <span className="text-[11px] font-semibold uppercase">
                                Amount
                              </span>

                            </div>

                            <p className="mt-2 text-sm font-bold text-slate-900">

                              ₹
                              {getJobEarning(
                                job
                              ).toLocaleString(
                                "en-IN"
                              )}

                            </p>

                          </div>

                        </div>

                        {/* =====================================================
                            ACCEPT / REJECT
                        ===================================================== */}

                        {job.technician_response ===
                          "Pending" && (

                          <div className="mt-5 grid grid-cols-2 gap-3">

                            <button
                              type="button"
                              onClick={() =>
                                acceptJob(job)
                              }
                              disabled={
                                responseLoading
                              }
                              className="min-h-[46px] flex items-center justify-center gap-2 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >

                              {responseLoading ? (

                                <Loader2
                                  size={17}
                                  className="animate-spin"
                                />

                              ) : (

                                <Check
                                  size={17}
                                />

                              )}

                              Accept Job

                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                openRejectModal(
                                  job
                                )
                              }
                              disabled={
                                responseLoading
                              }
                              className="min-h-[46px] flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 text-red-700 text-sm font-semibold hover:bg-red-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >

                              <X
                                size={17}
                              />

                              Reject

                            </button>

                          </div>

                        )}

                        {/* =====================================================
                            COMPLETE
                        ===================================================== */}

                        {job.status ===
                          "Accepted" &&
                          job.technician_response ===
                            "Accepted" && (

                          <button
                            type="button"
                            onClick={() =>
                              openCompleteModal(
                                job
                              )
                            }
                            className="mt-5 w-full min-h-[48px] flex items-center justify-center gap-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition"
                          >

                            <CheckCircle
                              size={18}
                            />

                            Complete Service

                          </button>

                        )}

                        {/* =====================================================
                            COMPLETED
                        ===================================================== */}

                        {job.status ===
                          "Completed" && (

                          <div className="mt-5 flex items-center justify-center gap-2 min-h-[48px] rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-semibold">

                            <CheckCircle
                              size={18}
                            />

                            Service Completed

                          </div>

                        )}

                        {/* =====================================================
                            REJECTED
                        ===================================================== */}

                        {job.technician_response ===
                          "Rejected" &&
                          job.status !==
                            "Completed" && (

                          <div className="mt-5 rounded-xl border border-red-100 bg-red-50 p-4">

                            <div className="flex items-center gap-3">

                              <div className="h-9 w-9 rounded-lg bg-red-100 flex items-center justify-center">

                                <X
                                  size={17}
                                  className="text-red-600"
                                />

                              </div>

                              <div>

                                <p className="text-sm font-bold text-red-700">
                                  Job Rejected
                                </p>

                                <p className="text-xs text-red-600">
                                  Waiting for admin reassignment
                                </p>

                              </div>

                            </div>

                            {job.technician_rejection_reason && (

                              <div className="mt-4">

                                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                                  Reason
                                </p>

                                <p className="mt-1 text-sm leading-5 text-slate-700">
                                  {
                                    job.technician_rejection_reason
                                  }
                                </p>

                              </div>

                            )}

                          </div>

                        )}

                      </div>

                    </article>

                  );

                })}

              </div>

            </>
          )}

        </main>

        {/* =====================================================
            FOOTER
        ===================================================== */}

        <footer className="border-t border-slate-200 bg-white mt-10">

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

              <div className="text-center sm:text-left">

                <p className="text-sm font-semibold text-slate-800">
                  ServoraCare
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Professional home services you can trust.
                </p>

              </div>

              <div className="flex items-center gap-4 text-xs text-slate-500">

                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck
                    size={14}
                    className="text-emerald-600"
                  />
                  Verified Partner
                </span>

                <span className="hidden sm:inline text-slate-300">
                  |
                </span>

                <span>
                  © {new Date().getFullYear()} ServoraCare
                </span>

              </div>

            </div>

          </div>

        </footer>

      </div>

      {/* =====================================================
          REJECT JOB MODAL
      ===================================================== */}

      {showRejectModal &&
        selectedJob && (

        <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center">

          <div
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            onClick={closeRejectModal}
          />

          <div className="relative w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] overflow-y-auto">

            {/* Header */}

            <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">

              <div className="flex items-center gap-3">

                <div className="h-10 w-10 rounded-xl bg-red-50 flex items-center justify-center">

                  <X
                    size={20}
                    className="text-red-600"
                  />

                </div>

                <div>

                  <h2 className="text-lg font-bold text-slate-900">
                    Reject Job
                  </h2>

                  <p className="text-xs text-slate-500">
                    Booking #{selectedJob.booking_id}
                  </p>

                </div>

              </div>

              <button
                type="button"
                onClick={closeRejectModal}
                disabled={responseLoading}
                className="h-9 w-9 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 transition disabled:opacity-50"
              >

                <X size={19} />

              </button>

            </div>

            {/* Body */}

            <div className="p-5">

              {/* Job Preview */}

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">

                <div className="flex items-start gap-3">

                  <BriefcaseBusiness
                    size={18}
                    className="mt-0.5 text-blue-600"
                  />

                  <div className="min-w-0">

                    <p className="text-sm font-bold text-slate-900">
                      {selectedJob.service_type}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Customer:{" "}
                      {selectedJob.full_name}
                    </p>

                    {selectedJob.address && (

                      <p className="mt-1 text-xs text-slate-500 line-clamp-2">
                        {selectedJob.address}
                      </p>

                    )}

                  </div>

                </div>

              </div>

              {/* Warning */}

              <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4">

                <div className="flex gap-3">

                  <AlertCircle
                    size={18}
                    className="mt-0.5 shrink-0 text-amber-600"
                  />

                  <p className="text-xs leading-5 text-amber-800">

                    Please provide a clear reason for rejecting this job.
                    The administrator can use your reason when reviewing
                    the assignment and assigning another technician.

                  </p>

                </div>

              </div>

              {/* Reason */}

              <div className="mt-5">

                <div className="flex items-center justify-between mb-2">

                  <label
                    htmlFor="rejectionReason"
                    className="text-sm font-semibold text-slate-800"
                  >

                    Rejection Reason

                    <span className="text-red-500">
                      {" "}*
                    </span>

                  </label>

                  <span className="text-xs text-slate-400">
                    {rejectionReason.length}/500
                  </span>

                </div>

                <textarea
                  id="rejectionReason"
                  value={rejectionReason}
                  maxLength={500}
                  rows={5}
                  onChange={(e) => {

                    setRejectionReason(
                      e.target.value
                    );

                    setResponseError("");

                  }}
                  placeholder="Explain why you cannot accept this job..."
                  disabled={responseLoading}
                  className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:bg-slate-100"
                />

              </div>

              {/* Error */}

              {responseError && (

                <div className="mt-4 flex gap-2 rounded-xl border border-red-200 bg-red-50 p-3">

                  <AlertCircle
                    size={17}
                    className="mt-0.5 shrink-0 text-red-600"
                  />

                  <p className="text-sm text-red-700">
                    {responseError}
                  </p>

                </div>

              )}

              {/* Buttons */}

              <div className="mt-6 grid grid-cols-2 gap-3">

                <button
                  type="button"
                  onClick={closeRejectModal}
                  disabled={responseLoading}
                  className="min-h-[46px] rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-semibold hover:bg-slate-50 transition disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={rejectJob}
                  disabled={
                    responseLoading ||
                    !rejectionReason.trim()
                  }
                  className="min-h-[46px] rounded-xl bg-red-600 text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >

                  {responseLoading ? (

                    <Loader2
                      size={18}
                      className="animate-spin"
                    />

                  ) : (

                    <X size={18} />

                  )}

                  Reject Job

                </button>

              </div>

            </div>

          </div>

        </div>

      )}

      {/* =====================================================
          COMPLETE SERVICE MODAL
      ===================================================== */}

      {showModal &&
        selectedJob && (

        <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center">

          <div
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            onClick={closeCompleteModal}
          />

          <div className="relative w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] overflow-y-auto">

            {/* Header */}

            <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">

              <div className="flex items-center gap-3">

                <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center">

                  <CheckCircle
                    size={20}
                    className="text-blue-600"
                  />

                </div>

                <div>

                  <h2 className="text-lg font-bold text-slate-900">
                    Complete Service
                  </h2>

                  <p className="text-xs text-slate-500">
                    Booking #{selectedJob.booking_id}
                  </p>

                </div>

              </div>

              <button
                type="button"
                onClick={closeCompleteModal}
                disabled={otpLoading}
                className="h-9 w-9 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 transition disabled:opacity-50"
              >

                <X size={19} />

              </button>

            </div>

            {/* Body */}

            <div className="p-5">

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">

                <div className="flex items-start gap-3">

                  <BriefcaseBusiness
                    size={18}
                    className="mt-0.5 text-blue-600"
                  />

                  <div>

                    <p className="text-sm font-bold text-slate-900">
                      {selectedJob.service_type}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Customer:{" "}
                      {selectedJob.full_name}
                    </p>

                  </div>

                </div>

              </div>

              <div className="mt-5">

                <label
                  htmlFor="workReport"
                  className="text-sm font-semibold text-slate-800"
                >
                  Work Completion Report
                  <span className="text-red-500">
                    {" "}*
                  </span>
                </label>

                <textarea
                  id="workReport"
                  value={workReport}
                  rows={5}
                  onChange={(e) => {

                    setWorkReport(
                      e.target.value
                    );

                    setOtpError("");

                  }}
                  placeholder="Describe the work completed, parts replaced, observations, etc."
                  disabled={otpLoading}
                  className="mt-2 w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:bg-slate-100"
                />

              </div>

              {otpError && (

                <div className="mt-4 flex gap-2 rounded-xl border border-red-200 bg-red-50 p-3">

                  <AlertCircle
                    size={17}
                    className="mt-0.5 shrink-0 text-red-600"
                  />

                  <p className="text-sm text-red-700">
                    {otpError}
                  </p>

                </div>

              )}

              <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50 p-4">

                <div className="flex gap-3">

                  <ShieldCheck
                    size={18}
                    className="mt-0.5 shrink-0 text-blue-600"
                  />

                  <p className="text-xs leading-5 text-blue-800">

                    A 6-digit OTP will be sent to the customer's registered
                    email. Entering the customer's OTP confirms that the
                    service has been completed.

                  </p>

                </div>

              </div>

              <button
                type="button"
                onClick={requestCompletionOTP}
                disabled={
                  otpLoading ||
                  !workReport.trim()
                }
                className="mt-6 w-full min-h-[48px] rounded-xl bg-blue-600 text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >

                {otpLoading ? (

                  <Loader2
                    size={18}
                    className="animate-spin"
                  />

                ) : (

                  <Mail size={18} />

                )}

                Send Customer OTP

              </button>

            </div>

          </div>

        </div>

      )}

      {/* =====================================================
          OTP MODAL
      ===================================================== */}

      {showOTPModal &&
        selectedJob && (

        <div className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center">

          <div
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            onClick={closeOTPModal}
          />

          <div className="relative w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden">

            {/* Header */}

            <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">

              <div className="flex items-center gap-3">

                <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center">

                  <ShieldCheck
                    size={20}
                    className="text-emerald-600"
                  />

                </div>

                <div>

                  <h2 className="text-lg font-bold text-slate-900">
                    Customer Verification
                  </h2>

                  <p className="text-xs text-slate-500">
                    Booking #{selectedJob.booking_id}
                  </p>

                </div>

              </div>

              <button
                type="button"
                onClick={closeOTPModal}
                disabled={otpLoading}
                className="h-9 w-9 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 transition disabled:opacity-50"
              >

                <X size={19} />

              </button>

            </div>

            {/* Body */}

            <div className="p-5">

              <div className="text-center">

                <div className="mx-auto h-14 w-14 rounded-2xl bg-blue-50 flex items-center justify-center">

                  <Mail
                    size={25}
                    className="text-blue-600"
                  />

                </div>

                <h3 className="mt-4 text-lg font-bold text-slate-900">
                  Enter Customer OTP
                </h3>

                <p className="mt-2 text-sm leading-5 text-slate-500">

                  A 6-digit verification code has been sent to the customer's
                  registered email address.

                </p>

              </div>

              <div className="mt-6">

                <label
                  htmlFor="completionOtp"
                  className="text-sm font-semibold text-slate-800"
                >
                  Verification OTP
                </label>

                <input
                  id="completionOtp"
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => {

                    const value =
                      e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 6);

                    setOtp(value);
                    setOtpError("");

                  }}
                  placeholder="Enter 6-digit OTP"
                  disabled={otpLoading}
                  className="mt-2 w-full h-14 rounded-xl border border-slate-300 px-4 text-center text-2xl font-bold tracking-[0.45em] text-slate-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:bg-slate-100"
                />

              </div>

              {otpError && (

                <div className="mt-4 flex gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-left">

                  <AlertCircle
                    size={17}
                    className="mt-0.5 shrink-0 text-red-600"
                  />

                  <p className="text-sm text-red-700">
                    {otpError}
                  </p>

                </div>

              )}

              <div className="mt-5 rounded-xl bg-amber-50 border border-amber-100 p-3">

                <div className="flex gap-2">

                  <Clock
                    size={16}
                    className="mt-0.5 shrink-0 text-amber-600"
                  />

                  <p className="text-xs leading-5 text-amber-800">

                    The OTP is valid for 5 minutes. Do not mark the service
                    completed without customer verification.

                  </p>

                </div>

              </div>

              <button
                type="button"
                onClick={verifyCompletionOTP}
                disabled={
                  otpLoading ||
                  otp.length !== 6
                }
                className="mt-6 w-full min-h-[48px] rounded-xl bg-emerald-600 text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-emerald-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >

                {otpLoading ? (

                  <Loader2
                    size={18}
                    className="animate-spin"
                  />

                ) : (

                  <CheckCircle
                    size={18}
                  />

                )}

                Verify & Complete Service

              </button>

              <button
                type="button"
                onClick={() => {

                  if (!otpLoading) {
                    setShowOTPModal(false);
                    setShowModal(true);
                    setOtpError("");
                  }

                }}
                disabled={otpLoading}
                className="mt-3 w-full min-h-[44px] rounded-xl border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition disabled:opacity-50"
              >
                Back
              </button>

            </div>

          </div>

        </div>

      )}

    </>
  );
}

export default TechnicianDashboard;