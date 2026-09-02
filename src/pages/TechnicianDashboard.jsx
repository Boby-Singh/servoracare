// import { useEffect, useMemo, useState } from "react";
// import axios from "axios";
// import { Navigate } from "react-router-dom";
// import { Helmet } from "react-helmet-async";

// import {
//   Wrench,
//   ClipboardList,
//   CheckCircle,
//   Clock,
//   MapPin,
//   Phone,
//   CalendarDays,
//   Search,
//   X,
//   FileText,
//   UserRound,
//   Loader2,
//   AlertCircle,
//   Check,
//   ShieldCheck,
//   IndianRupee,
//   TrendingUp,
//   BriefcaseBusiness,
//   RefreshCw,
//   ChevronRight,
//   Mail,
//   Headphones,
//   CircleHelp,
//   ThumbsUp,
//   ThumbsDown,
// } from "lucide-react";

// const API = import.meta.env.VITE_API_URL;

// function TechnicianDashboard() {
//   const user = JSON.parse(localStorage.getItem("user") || "null");

//   // =========================================================
//   // STATES
//   // =========================================================

//   const [jobs, setJobs] = useState([]);
//   const [search, setSearch] = useState("");

//   const [showModal, setShowModal] = useState(false);
//   const [showOTPModal, setShowOTPModal] = useState(false);

//   // ACCEPT / REJECT
//   const [showRejectModal, setShowRejectModal] = useState(false);
//   const [rejectionReason, setRejectionReason] = useState("");
//   const [responseLoading, setResponseLoading] = useState(false);
//   const [responseError, setResponseError] = useState("");

//   const [selectedJob, setSelectedJob] = useState(null);

//   const [workReport, setWorkReport] = useState("");
//   const [otp, setOtp] = useState("");

//   const [loading, setLoading] = useState(true);
//   const [otpLoading, setOtpLoading] = useState(false);
//   const [refreshing, setRefreshing] = useState(false);

//   const [error, setError] = useState("");
//   const [otpError, setOtpError] = useState("");

//   // =========================================================
//   // FETCH JOBS
//   // =========================================================

//   const fetchJobs = async (showRefreshLoader = false) => {
//     if (!user?.id) return;

//     try {
//       if (showRefreshLoader) {
//         setRefreshing(true);
//       } else {
//         setLoading(true);
//       }

//       setError("");

//       const res = await axios.get(
//         `${API}/api/technician-jobs/${user.id}`
//       );

//       setJobs(Array.isArray(res.data) ? res.data : []);
//     } catch (err) {
//       console.error("Fetch Technician Jobs Error:", err);

//       setError(
//         err.response?.data?.message ||
//           "Unable to load assigned jobs."
//       );

//       setJobs([]);
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   // =========================================================
//   // LOAD JOBS
//   // =========================================================

//   useEffect(() => {
//     if (user?.role === "technician" && user?.id) {
//       fetchJobs();
//     } else {
//       setLoading(false);
//     }
//   }, []);

//   // =========================================================
//   // GET JOB EARNING
//   // =========================================================

//   const getJobEarning = (job) => {
//     const amount =
//       job?.technician_earning ??
//       job?.technician_amount ??
//       job?.earning ??
//       job?.amount ??
//       0;

//     const parsed = Number(amount);

//     return Number.isFinite(parsed) ? parsed : 0;
//   };

//   // =========================================================
//   // STATISTICS
//   // =========================================================

//   const completedJobs = jobs.filter(
//     (job) => job.status === "Completed"
//   ).length;

//   const activeJobs = jobs.filter(
//     (job) =>
//       job.technician_response === "Accepted" &&
//       job.status === "Accepted"
//   ).length;

//   const pendingJobs = jobs.filter(
//     (job) =>
//       job.technician_response === "Pending"
//   ).length;

//   const rejectedJobs = jobs.filter(
//     (job) =>
//       job.technician_response === "Rejected"
//   ).length;

//   const totalEarnings = jobs
//     .filter((job) => job.status === "Completed")
//     .reduce(
//       (total, job) =>
//         total + getJobEarning(job),
//       0
//     );

//   const averageEarning =
//     completedJobs > 0
//       ? totalEarnings / completedJobs
//       : 0;

//   // =========================================================
//   // SEARCH
//   // =========================================================

//   const searchValue = search.toLowerCase().trim();

//   const filteredJobs = jobs.filter((job) => {
//     return (
//       job.booking_id
//         ?.toString()
//         .toLowerCase()
//         .includes(searchValue) ||
//       job.full_name
//         ?.toLowerCase()
//         .includes(searchValue) ||
//       job.phone
//         ?.toString()
//         .includes(searchValue) ||
//       job.service_type
//         ?.toLowerCase()
//         .includes(searchValue) ||
//       job.address
//         ?.toLowerCase()
//         .includes(searchValue)
//     );
//   });

//   // =========================================================
//   // EARNINGS GRAPH DATA
//   // =========================================================

//   const earningsData = useMemo(() => {
//     const completed = jobs
//       .filter(
//         (job) =>
//           job.status === "Completed" &&
//           getJobEarning(job) > 0
//       )
//       .sort((a, b) => {
//         const dateA = new Date(
//           a.completed_at ||
//             a.updatedAt ||
//             a.createdAt ||
//             a.visit_date ||
//             0
//         );

//         const dateB = new Date(
//           b.completed_at ||
//             b.updatedAt ||
//             b.createdAt ||
//             b.visit_date ||
//             0
//         );

//         return dateA - dateB;
//       });

//     if (completed.length === 0) {
//       return [];
//     }

//     return completed.slice(-7).map((job) => ({
//       id: job._id,
//       bookingId: job.booking_id,
//       amount: getJobEarning(job),
//       date:
//         job.completed_at ||
//         job.updatedAt ||
//         job.createdAt ||
//         job.visit_date,
//     }));
//   }, [jobs]);

//   const graphMax =
//     earningsData.length > 0
//       ? Math.max(
//           ...earningsData.map(
//             (item) => item.amount
//           ),
//           100
//         )
//       : 100;

//   // =========================================================
//   // FORMAT CURRENCY
//   // =========================================================

//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR",
//       maximumFractionDigits: 0,
//     }).format(Number(amount) || 0);
//   };

//   // =========================================================
//   // FORMAT DATE
//   // =========================================================

//   const formatDate = (date) => {
//     if (!date) return "-";

//     const parsedDate = new Date(date);

//     if (Number.isNaN(parsedDate.getTime())) {
//       return "-";
//     }

//     return parsedDate.toLocaleDateString(
//       "en-IN",
//       {
//         day: "2-digit",
//         month: "short",
//         year: "numeric",
//       }
//     );
//   };

//   // =========================================================
//   // DISPLAY STATUS
//   // =========================================================

//   const getDisplayStatus = (job) => {
//     if (
//       job.technician_response === "Rejected"
//     ) {
//       return "Rejected";
//     }

//     if (
//       job.technician_response === "Pending" &&
//       job.status === "Pending"
//     ) {
//       return "Awaiting Response";
//     }

//     if (
//       job.technician_response === "Accepted" &&
//       job.status === "Accepted"
//     ) {
//       return "Accepted";
//     }

//     if (job.status === "Completed") {
//       return "Completed";
//     }

//     if (job.status === "Rejected") {
//       return "Rejected";
//     }

//     return job.status || "Pending";
//   };

//   // =========================================================
//   // STATUS STYLE
//   // =========================================================

//   const getStatusStyle = (job) => {
//     const displayStatus =
//       getDisplayStatus(job);

//     switch (displayStatus) {
//       case "Accepted":
//         return {
//           wrapper:
//             "bg-blue-50 text-blue-700 border-blue-200",
//           dot: "bg-blue-500",
//         };

//       case "Completed":
//         return {
//           wrapper:
//             "bg-green-50 text-green-700 border-green-200",
//           dot: "bg-green-500",
//         };

//       case "Awaiting Response":
//         return {
//           wrapper:
//             "bg-yellow-50 text-yellow-700 border-yellow-200",
//           dot: "bg-yellow-500",
//         };

//       case "Rejected":
//         return {
//           wrapper:
//             "bg-red-50 text-red-700 border-red-200",
//           dot: "bg-red-500",
//         };

//       case "Pending":
//         return {
//           wrapper:
//             "bg-yellow-50 text-yellow-700 border-yellow-200",
//           dot: "bg-yellow-500",
//         };

//       default:
//         return {
//           wrapper:
//             "bg-slate-50 text-slate-700 border-slate-200",
//           dot: "bg-slate-500",
//         };
//     }
//   };

//   // =========================================================
//   // CHECK IF TECHNICIAN CAN RESPOND
//   // =========================================================

//   const canRespondToJob = (job) => {
//     return (
//       job?.technician_response === "Pending" &&
//       job?.status === "Pending"
//     );
//   };

//   // =========================================================
//   // ACCEPT JOB
//   // =========================================================

//   const acceptJob = async (job) => {
//     if (!job) return;

//     if (!canRespondToJob(job)) {
//       return;
//     }

//     try {
//       setResponseLoading(true);
//       setResponseError("");

//       const response = await axios.put(
//         `${API}/api/technician-response/${job.booking_id}`,
//         {
//           technician_id: user.id,
//           response: "Accepted",
//         }
//       );

//       if (response.data?.success !== false) {
//         await fetchJobs();

//         alert(
//           "Job accepted successfully!"
//         );
//       }
//     } catch (err) {
//       console.error(
//         "Accept Job Error:",
//         err
//       );

//       setResponseError(
//         err.response?.data?.message ||
//           "Unable to accept this job."
//       );

//       alert(
//         err.response?.data?.message ||
//           "Unable to accept this job."
//       );
//     } finally {
//       setResponseLoading(false);
//     }
//   };

//   // =========================================================
//   // OPEN REJECT MODAL
//   // =========================================================

//   const openRejectModal = (job) => {
//     if (!job || !canRespondToJob(job)) {
//       return;
//     }

//     setSelectedJob(job);
//     setRejectionReason("");
//     setResponseError("");
//     setShowRejectModal(true);
//   };

//   // =========================================================
//   // CLOSE REJECT MODAL
//   // =========================================================

//   const closeRejectModal = () => {
//     if (responseLoading) return;

//     setShowRejectModal(false);
//     setRejectionReason("");
//     setResponseError("");
//     setSelectedJob(null);
//   };

//   // =========================================================
//   // REJECT JOB
//   // =========================================================

//   const rejectJob = async () => {
//     if (!selectedJob) return;

//     const reason =
//       rejectionReason.trim();

//     if (!reason) {
//       setResponseError(
//         "Please provide a reason for rejecting this job."
//       );
//       return;
//     }

//     if (reason.length < 5) {
//       setResponseError(
//         "Please provide a meaningful rejection reason."
//       );
//       return;
//     }

//     if (reason.length > 500) {
//       setResponseError(
//         "Rejection reason cannot exceed 500 characters."
//       );
//       return;
//     }

//     try {
//       setResponseLoading(true);
//       setResponseError("");

//       const response = await axios.put(
//         `${API}/api/technician-response/${selectedJob.booking_id}`,
//         {
//           technician_id: user.id,
//           response: "Rejected",
//           rejection_reason: reason,
//         }
//       );

//       if (response.data?.success !== false) {
//         setShowRejectModal(false);
//         setRejectionReason("");
//         setResponseError("");
//         setSelectedJob(null);

//         await fetchJobs();

//         alert(
//           "Job rejected successfully."
//         );
//       }
//     } catch (err) {
//       console.error(
//         "Reject Job Error:",
//         err
//       );

//       setResponseError(
//         err.response?.data?.message ||
//           "Unable to reject this job."
//       );
//     } finally {
//       setResponseLoading(false);
//     }
//   };

//   // =========================================================
//   // OPEN COMPLETE MODAL
//   // =========================================================

//   const openCompleteModal = (job) => {
//     if (
//       job?.technician_response !==
//         "Accepted" ||
//       job?.status !== "Accepted"
//     ) {
//       return;
//     }

//     setSelectedJob(job);
//     setWorkReport("");
//     setOtp("");
//     setOtpError("");
//     setShowModal(true);
//   };

//   // =========================================================
//   // CLOSE COMPLETE MODAL
//   // =========================================================

//   const closeCompleteModal = () => {
//     if (otpLoading) return;

//     setShowModal(false);
//     setWorkReport("");
//     setSelectedJob(null);
//   };

//   // =========================================================
//   // REQUEST CUSTOMER OTP
//   // =========================================================

//   const requestCompletionOTP = async () => {
//     if (!selectedJob) return;

//     if (!workReport.trim()) {
//       setOtpError(
//         "Please enter the work completion report."
//       );
//       return;
//     }

//     try {
//       setOtpLoading(true);
//       setOtpError("");

//       const response = await axios.post(
//         `${API}/api/bookings/${selectedJob._id}/request-completion-otp`
//       );

//       if (response.data.success) {
//         setShowModal(false);

//         setOtp("");
//         setOtpError("");

//         setShowOTPModal(true);
//       }
//     } catch (err) {
//       console.error(
//         "Request Completion OTP Error:",
//         err
//       );

//       setOtpError(
//         err.response?.data?.message ||
//           "Unable to send customer OTP."
//       );
//     } finally {
//       setOtpLoading(false);
//     }
//   };

//   // =========================================================
//   // VERIFY CUSTOMER OTP
//   // =========================================================

//   const verifyCompletionOTP = async () => {
//     if (!selectedJob) return;

//     if (otp.length !== 6) {
//       setOtpError(
//         "Please enter the 6-digit OTP."
//       );
//       return;
//     }

//     try {
//       setOtpLoading(true);
//       setOtpError("");

//       const response = await axios.post(
//         `${API}/api/bookings/${selectedJob._id}/verify-completion-otp`,
//         {
//           otp: otp,
//           technician_comment:
//             workReport.trim(),
//         }
//       );

//       if (response.data.success) {
//         setShowOTPModal(false);

//         setOtp("");
//         setWorkReport("");
//         setSelectedJob(null);
//         setOtpError("");

//         await fetchJobs();

//         alert(
//           "Service completed successfully!"
//         );
//       }
//     } catch (err) {
//       console.error(
//         "Verify Completion OTP Error:",
//         err
//       );

//       setOtpError(
//         err.response?.data?.message ||
//           "Invalid OTP. Please try again."
//       );
//     } finally {
//       setOtpLoading(false);
//     }
//   };

//   // =========================================================
//   // CLOSE OTP MODAL
//   // =========================================================

//   const closeOTPModal = () => {
//     if (otpLoading) return;

//     setShowOTPModal(false);
//     setOtp("");
//     setOtpError("");
//   };

//   // =========================================================
//   // TECHNICIAN CHECK
//   // IMPORTANT:
//   // This is AFTER all hooks/functions.
//   // =========================================================

//   if (user?.role !== "technician") {
//     return <Navigate to="/" replace />;
//   }

//   // =========================================================
//   // DASHBOARD
//   // =========================================================

//   return (
//     <>
//       <Helmet>
//         <title>
//           Technician Dashboard | ServoraCare
//         </title>

//         <meta
//           name="robots"
//           content="noindex,nofollow"
//         />

//         <meta
//           name="description"
//           content="ServoraCare technician dashboard for managing assigned service jobs, customer details, earnings and completion reports."
//         />
//       </Helmet>

//       <div className="min-h-screen bg-slate-50 text-slate-900">

//         {/* =====================================================
//             HEADER
//         ====================================================== */}

//         <header className="bg-white border-b border-slate-200 sticky top-0 z-30">

//           <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">

//             <div className="min-h-[76px] flex items-center justify-between gap-4">

//               {/* BRAND / PROFILE */}

//               <div className="flex items-center gap-3 sm:gap-4 min-w-0">

//                 <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-blue-900 flex items-center justify-center shadow-sm shrink-0">

//                   <Wrench
//                     size={22}
//                     className="text-white sm:w-7 sm:h-7"
//                   />

//                 </div>

//                 <div className="min-w-0">

//                   <p className="text-xs sm:text-sm font-medium text-slate-500">
//                     Welcome back, Partner
//                   </p>

//                   <h1 className="mt-0.5 text-lg sm:text-2xl font-bold text-slate-900 truncate">
//                     {user?.name || "Technician"}
//                   </h1>

//                 </div>

//               </div>

//               {/* RIGHT SIDE */}

//               <div className="flex items-center gap-2 sm:gap-4">

//                 <button
//                   onClick={() =>
//                     fetchJobs(true)
//                   }
//                   disabled={refreshing}
//                   title="Refresh jobs"
//                   className="
//                     w-10
//                     h-10
//                     rounded-xl
//                     border
//                     border-slate-200
//                     bg-white
//                     text-slate-600
//                     flex
//                     items-center
//                     justify-center
//                     hover:bg-slate-50
//                     transition
//                     disabled:opacity-50
//                   "
//                 >

//                   <RefreshCw
//                     size={17}
//                     className={
//                       refreshing
//                         ? "animate-spin"
//                         : ""
//                     }
//                   />

//                 </button>

//                 <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full">

//                   <span className="relative flex h-2.5 w-2.5">

//                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />

//                     <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />

//                   </span>

//                   <span className="text-sm font-semibold text-green-700">
//                     Online
//                   </span>

//                 </div>

//               </div>

//             </div>

//           </div>

//         </header>

//         {/* =====================================================
//             MAIN
//         ====================================================== */}

//         <main className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8">

//           {/* ===================================================
//               WELCOME BANNER
//           ==================================================== */}

//           <section className="mb-6 sm:mb-8">

//             <div className="rounded-2xl sm:rounded-3xl bg-blue-900 overflow-hidden relative">

//               <div className="absolute inset-0 opacity-10">

//                 <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full border-[50px] border-white" />

//                 <div className="absolute -left-20 -bottom-28 w-80 h-80 rounded-full border-[60px] border-white" />

//               </div>

//               <div className="relative px-5 py-6 sm:px-8 sm:py-8">

//                 <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

//                   <div>

//                     <p className="text-blue-200 text-sm font-medium mb-1">
//                       ServoraCare Technician
//                     </p>

//                     <h2 className="text-2xl sm:text-3xl font-bold text-white">
//                       Manage your service jobs
//                     </h2>

//                     <p className="text-blue-100 text-sm sm:text-base mt-2 max-w-xl">
//                       Review assigned jobs, accept or reject
//                       requests, complete customer services and
//                       monitor your earnings from one professional
//                       dashboard.
//                     </p>

//                   </div>

//                   <div className="flex items-center gap-3">

//                     <div className="bg-white/10 border border-white/10 backdrop-blur-sm rounded-2xl px-5 py-4">

//                       <p className="text-blue-200 text-xs">
//                         Total Earnings
//                       </p>

//                       <p className="text-xl sm:text-2xl font-bold text-white mt-1">
//                         {formatCurrency(
//                           totalEarnings
//                         )}
//                       </p>

//                     </div>

//                   </div>

//                 </div>

//               </div>

//             </div>

//           </section>

//           {/* ===================================================
//               STATISTICS
//           ==================================================== */}

//           <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-6 sm:mb-8">

//             {/* TOTAL */}

//             <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm">

//               <div className="flex items-start justify-between gap-2">

//                 <div>

//                   <p className="text-xs sm:text-sm font-medium text-slate-500">
//                     Total Jobs
//                   </p>

//                   <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 sm:mt-2">
//                     {jobs.length}
//                   </h2>

//                 </div>

//                 <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-blue-50 flex items-center justify-center">

//                   <ClipboardList
//                     size={19}
//                     className="text-blue-700"
//                   />

//                 </div>

//               </div>

//               <p className="hidden sm:block text-xs text-slate-400 mt-4">
//                 All assigned jobs
//               </p>

//             </div>

//             {/* ACTIVE */}

//             <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm">

//               <div className="flex items-start justify-between gap-2">

//                 <div>

//                   <p className="text-xs sm:text-sm font-medium text-slate-500">
//                     Active Jobs
//                   </p>

//                   <h2 className="text-2xl sm:text-3xl font-bold text-blue-600 mt-1 sm:mt-2">
//                     {activeJobs}
//                   </h2>

//                 </div>

//                 <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-blue-50 flex items-center justify-center">

//                   <BriefcaseBusiness
//                     size={19}
//                     className="text-blue-600"
//                   />

//                 </div>

//               </div>

//               <p className="hidden sm:block text-xs text-slate-400 mt-4">
//                 Currently accepted
//               </p>

//             </div>

//             {/* COMPLETED */}

//             <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm">

//               <div className="flex items-start justify-between gap-2">

//                 <div>

//                   <p className="text-xs sm:text-sm font-medium text-slate-500">
//                     Completed
//                   </p>

//                   <h2 className="text-2xl sm:text-3xl font-bold text-green-600 mt-1 sm:mt-2">
//                     {completedJobs}
//                   </h2>

//                 </div>

//                 <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-green-50 flex items-center justify-center">

//                   <CheckCircle
//                     size={19}
//                     className="text-green-600"
//                   />

//                 </div>

//               </div>

//               <p className="hidden sm:block text-xs text-slate-400 mt-4">
//                 Successfully completed
//               </p>

//             </div>

//             {/* EARNINGS */}

//             <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm">

//               <div className="flex items-start justify-between gap-2">

//                 <div>

//                   <p className="text-xs sm:text-sm font-medium text-slate-500">
//                     Earnings
//                   </p>

//                   <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1 sm:mt-2 truncate">
//                     {formatCurrency(
//                       totalEarnings
//                     )}
//                   </h2>

//                 </div>

//                 <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-emerald-50 flex items-center justify-center">

//                   <IndianRupee
//                     size={19}
//                     className="text-emerald-600"
//                   />

//                 </div>

//               </div>

//               <p className="hidden sm:block text-xs text-slate-400 mt-4">
//                 From completed jobs
//               </p>

//             </div>

//           </section>

//           {/* ===================================================
//               EARNINGS + PERFORMANCE
//           ==================================================== */}

//           <section className="grid grid-cols-1 xl:grid-cols-3 gap-5 sm:gap-6 mb-6 sm:mb-8">

//             {/* EARNINGS GRAPH */}

//             <div className="xl:col-span-2 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

//               <div className="px-5 sm:px-6 py-5 border-b border-slate-200">

//                 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

//                   <div>

//                     <div className="flex items-center gap-2">

//                       <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center">

//                         <TrendingUp
//                           size={18}
//                           className="text-green-600"
//                         />

//                       </div>

//                       <h2 className="text-lg font-bold text-slate-900">
//                         Earnings Overview
//                       </h2>

//                     </div>

//                     <p className="text-sm text-slate-500 mt-2">
//                       Earnings from your latest completed jobs
//                     </p>

//                   </div>

//                   <div className="text-left sm:text-right">

//                     <p className="text-xs text-slate-500">
//                       Average per job
//                     </p>

//                     <p className="text-lg font-bold text-slate-900">
//                       {formatCurrency(
//                         averageEarning
//                       )}
//                     </p>

//                   </div>

//                 </div>

//               </div>

//               <div className="p-5 sm:p-6">

//                 {earningsData.length === 0 ? (

//                   <div className="h-64 flex flex-col items-center justify-center text-center">

//                     <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center">

//                       <TrendingUp
//                         size={25}
//                         className="text-slate-400"
//                       />

//                     </div>

//                     <p className="font-semibold text-slate-800 mt-4">
//                       No earnings data yet
//                     </p>

//                     <p className="text-sm text-slate-500 mt-1 max-w-sm">
//                       Earnings will appear here after you
//                       successfully complete service jobs.
//                     </p>

//                   </div>

//                 ) : (

//                   <div className="h-64">

//                     <div className="flex h-full gap-3">

//                       {/* Y AXIS */}

//                       <div className="w-12 flex flex-col justify-between text-[10px] sm:text-xs text-slate-400 text-right py-1">

//                         <span>
//                           {formatCurrency(
//                             graphMax
//                           )}
//                         </span>

//                         <span>
//                           {formatCurrency(
//                             graphMax * 0.75
//                           )}
//                         </span>

//                         <span>
//                           {formatCurrency(
//                             graphMax * 0.5
//                           )}
//                         </span>

//                         <span>
//                           {formatCurrency(
//                             graphMax * 0.25
//                           )}
//                         </span>

//                         <span>
//                           ₹0
//                         </span>

//                       </div>

//                       {/* GRAPH */}

//                       <div className="flex-1 relative">

//                         {/* GRID */}

//                         <div className="absolute inset-0 flex flex-col justify-between">

//                           {[0, 1, 2, 3, 4].map(
//                             (item) => (
//                               <div
//                                 key={item}
//                                 className="border-t border-dashed border-slate-200"
//                               />
//                             )
//                           )}

//                         </div>

//                         {/* BARS */}

//                         <div className="absolute inset-0 flex items-end justify-around gap-2 sm:gap-4 px-1 sm:px-4">

//                           {earningsData.map(
//                             (item) => {

//                               const height =
//                                 Math.max(
//                                   (item.amount /
//                                     graphMax) *
//                                     100,
//                                   5
//                                 );

//                               return (
//                                 <div
//                                   key={item.id}
//                                   className="h-full flex-1 flex flex-col items-center justify-end group relative"
//                                 >

//                                   <div
//                                     className="
//                                       absolute
//                                       text-[10px]
//                                       sm:text-xs
//                                       font-semibold
//                                       text-slate-700
//                                       opacity-0
//                                       group-hover:opacity-100
//                                       -top-1
//                                       -translate-y-full
//                                       transition
//                                       whitespace-nowrap
//                                     "
//                                   >
//                                     {formatCurrency(
//                                       item.amount
//                                     )}
//                                   </div>

//                                   <div
//                                     className="
//                                       w-full
//                                       max-w-[42px]
//                                       bg-blue-600
//                                       rounded-t-lg
//                                       transition-all
//                                       duration-500
//                                       group-hover:bg-blue-700
//                                     "
//                                     style={{
//                                       height: `${height}%`,
//                                     }}
//                                   />

//                                   <div className="mt-2 text-[9px] sm:text-xs text-slate-400 text-center truncate w-full">

//                                     {formatDate(
//                                       item.date
//                                     ).replace(
//                                       /\s\d{4}$/,
//                                       ""
//                                     )}

//                                   </div>

//                                 </div>
//                               );
//                             }
//                           )}

//                         </div>

//                       </div>

//                     </div>

//                   </div>

//                 )}

//               </div>

//             </div>

//             {/* PERFORMANCE */}

//             <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

//               <div className="px-5 py-5 border-b border-slate-200">

//                 <h2 className="text-lg font-bold text-slate-900">
//                   Performance
//                 </h2>

//                 <p className="text-sm text-slate-500 mt-1">
//                   Your current job overview
//                 </p>

//               </div>

//               <div className="p-5 space-y-5">

//                 {/* COMPLETION */}

//                 <div>

//                   <div className="flex items-center justify-between mb-2">

//                     <span className="text-sm font-medium text-slate-600">
//                       Completion rate
//                     </span>

//                     <span className="text-sm font-bold text-green-600">

//                       {jobs.length > 0
//                         ? Math.round(
//                             (completedJobs /
//                               jobs.length) *
//                               100
//                           )
//                         : 0}
//                       %

//                     </span>

//                   </div>

//                   <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">

//                     <div
//                       className="h-full bg-green-500 rounded-full transition-all"
//                       style={{
//                         width: `${
//                           jobs.length > 0
//                             ? Math.round(
//                                 (completedJobs /
//                                   jobs.length) *
//                                   100
//                               )
//                             : 0
//                         }%`,
//                       }}
//                     />

//                   </div>

//                 </div>

//                 {/* ACTIVE */}

//                 <div className="flex items-center justify-between p-4 rounded-xl bg-blue-50 border border-blue-100">

//                   <div className="flex items-center gap-3">

//                     <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center">

//                       <BriefcaseBusiness
//                         size={17}
//                         className="text-blue-600"
//                       />

//                     </div>

//                     <div>

//                       <p className="text-xs text-slate-500">
//                         Active jobs
//                       </p>

//                       <p className="font-bold text-slate-900">
//                         {activeJobs}
//                       </p>

//                     </div>

//                   </div>

//                   <ChevronRight
//                     size={17}
//                     className="text-blue-400"
//                   />

//                 </div>

//                 {/* PENDING */}

//                 <div className="flex items-center justify-between p-4 rounded-xl bg-yellow-50 border border-yellow-100">

//                   <div className="flex items-center gap-3">

//                     <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center">

//                       <Clock
//                         size={17}
//                         className="text-yellow-600"
//                       />

//                     </div>

//                     <div>

//                       <p className="text-xs text-slate-500">
//                         Awaiting response
//                       </p>

//                       <p className="font-bold text-slate-900">
//                         {pendingJobs}
//                       </p>

//                     </div>

//                   </div>

//                   <ChevronRight
//                     size={17}
//                     className="text-yellow-500"
//                   />

//                 </div>

//                 {/* REJECTED */}

//                 <div className="flex items-center justify-between p-4 rounded-xl bg-red-50 border border-red-100">

//                   <div className="flex items-center gap-3">

//                     <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center">

//                       <X
//                         size={17}
//                         className="text-red-600"
//                       />

//                     </div>

//                     <div>

//                       <p className="text-xs text-slate-500">
//                         Rejected jobs
//                       </p>

//                       <p className="font-bold text-slate-900">
//                         {rejectedJobs}
//                       </p>

//                     </div>

//                   </div>

//                   <ChevronRight
//                     size={17}
//                     className="text-red-400"
//                   />

//                 </div>

//               </div>

//             </div>

//           </section>

//           {/* ===================================================
//               JOB SECTION
//           ==================================================== */}

//           <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

//             {/* SECTION HEADER */}

//             <div className="px-5 sm:px-6 py-5 border-b border-slate-200">

//               <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

//                 <div>

//                   <h2 className="text-xl font-bold text-slate-900">
//                     Assigned Jobs
//                   </h2>

//                   <p className="text-sm text-slate-500 mt-1">
//                     Review and respond to your assigned service requests
//                   </p>

//                 </div>

//                 {/* SEARCH */}

//                 <div className="relative w-full lg:w-96">

//                   <Search
//                     size={18}
//                     className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
//                   />

//                   <input
//                     type="text"
//                     placeholder="Search booking, customer, service..."
//                     value={search}
//                     onChange={(e) =>
//                       setSearch(
//                         e.target.value
//                       )
//                     }
//                     className="
//                       w-full
//                       border
//                       border-slate-200
//                       bg-slate-50
//                       rounded-xl
//                       pl-10
//                       pr-4
//                       py-3
//                       text-sm
//                       outline-none
//                       focus:bg-white
//                       focus:border-blue-500
//                       focus:ring-2
//                       focus:ring-blue-500/20
//                       transition
//                     "
//                   />

//                 </div>

//               </div>

//             </div>

//             {/* ERROR */}

//             {error && !loading && (

//               <div className="mx-5 sm:mx-6 mt-5 p-4 bg-red-50 border border-red-200 rounded-xl">

//                 <div className="flex items-start justify-between gap-4">

//                   <div className="flex items-start gap-2 text-red-700">

//                     <AlertCircle
//                       size={18}
//                       className="mt-0.5 shrink-0"
//                     />

//                     <span className="text-sm font-medium">
//                       {error}
//                     </span>

//                   </div>

//                   <button
//                     onClick={() =>
//                       fetchJobs()
//                     }
//                     className="text-sm font-semibold text-red-700 hover:text-red-900"
//                   >
//                     Retry
//                   </button>

//                 </div>

//               </div>

//             )}

//             {/* RESPONSE ERROR */}

//             {responseError &&
//               !showRejectModal && (

//                 <div className="mx-5 sm:mx-6 mt-5 p-4 bg-red-50 border border-red-200 rounded-xl">

//                   <div className="flex items-start gap-2 text-red-700">

//                     <AlertCircle
//                       size={18}
//                       className="mt-0.5 shrink-0"
//                     />

//                     <span className="text-sm font-medium">
//                       {responseError}
//                     </span>

//                   </div>

//                 </div>
//               )}

//             {/* LOADING */}

//             {loading ? (

//               <div className="flex flex-col items-center justify-center py-24">

//                 <Loader2
//                   size={38}
//                   className="text-blue-700 animate-spin"
//                 />

//                 <p className="text-sm text-slate-500 mt-4">
//                   Loading assigned jobs...
//                 </p>

//               </div>

//             ) : filteredJobs.length === 0 ? (

//               <div className="text-center py-20 sm:py-24 px-6">

//                 <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-100 flex items-center justify-center">

//                   <ClipboardList
//                     size={28}
//                     className="text-slate-400"
//                   />

//                 </div>

//                 <h3 className="text-lg font-semibold text-slate-900 mt-5">
//                   No jobs found
//                 </h3>

//                 <p className="text-sm text-slate-500 mt-2">

//                   {search
//                     ? "Try changing your search."
//                     : "You don't have any assigned jobs yet."}

//                 </p>

//               </div>

//             ) : (

//               <>

//                 {/* =================================================
//                     DESKTOP TABLE
//                 ================================================== */}

//                 <div className="hidden lg:block overflow-x-auto">

//                   <table className="w-full min-w-[1250px]">

//                     <thead className="bg-slate-50 border-b border-slate-200">

//                       <tr>

//                         <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
//                           Booking
//                         </th>

//                         <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
//                           Customer
//                         </th>

//                         <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
//                           Service
//                         </th>

//                         <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
//                           Location
//                         </th>

//                         <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
//                           Schedule
//                         </th>

//                         <th className="px-5 py-4 text-center text-xs font-bold uppercase tracking-wider text-slate-500">
//                           Status
//                         </th>

//                         <th className="px-5 py-4 text-center text-xs font-bold uppercase tracking-wider text-slate-500">
//                           Action
//                         </th>

//                       </tr>

//                     </thead>

//                     <tbody className="divide-y divide-slate-100">

//                       {filteredJobs.map((job) => {

//                         const status =
//                           getStatusStyle(job);

//                         return (

//                           <tr
//                             key={job._id}
//                             className="hover:bg-slate-50/70 transition"
//                           >

//                             {/* BOOKING */}

//                             <td className="px-5 py-5">

//                               <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 font-bold text-sm">
//                                 #{job.booking_id || "-"}
//                               </span>

//                             </td>

//                             {/* CUSTOMER */}

//                             <td className="px-5 py-5">

//                               <div className="flex items-center gap-3">

//                                 <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">

//                                   <UserRound
//                                     size={18}
//                                     className="text-slate-500"
//                                   />

//                                 </div>

//                                 <div>

//                                   <p className="font-semibold text-slate-900">
//                                     {job.full_name ||
//                                       "Unknown"}
//                                   </p>

//                                   <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">

//                                     <Phone size={12} />

//                                     {job.phone || "-"}

//                                   </div>

//                                 </div>

//                               </div>

//                             </td>

//                             {/* SERVICE */}

//                             <td className="px-5 py-5">

//                               <div className="flex items-center gap-2">

//                                 <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center">

//                                   <Wrench
//                                     size={17}
//                                     className="text-orange-600"
//                                   />

//                                 </div>

//                                 <span className="font-medium text-slate-800">
//                                   {job.service_type ||
//                                     "-"}
//                                 </span>

//                               </div>

//                             </td>

//                             {/* LOCATION */}

//                             <td className="px-5 py-5 max-w-xs">

//                               <div className="flex items-start gap-2">

//                                 <MapPin
//                                   size={17}
//                                   className="text-red-500 mt-0.5 shrink-0"
//                                 />

//                                 <span className="text-sm text-slate-600 line-clamp-2">
//                                   {job.address || "-"}
//                                 </span>

//                               </div>

//                             </td>

//                             {/* SCHEDULE */}

//                             <td className="px-5 py-5">

//                               <div className="space-y-1">

//                                 <div className="flex items-center gap-2 text-sm font-medium text-slate-700">

//                                   <CalendarDays
//                                     size={15}
//                                     className="text-blue-600"
//                                   />

//                                   {job.visit_date
//                                     ? formatDate(
//                                         job.visit_date
//                                       )
//                                     : "-"}

//                                 </div>

//                                 <div className="text-xs text-slate-500 ml-5">
//                                   {job.visit_time ||
//                                     "Time not specified"}
//                                 </div>

//                               </div>

//                             </td>

//                             {/* STATUS */}

//                             <td className="px-5 py-5 text-center">

//                               <span
//                                 className={`
//                                   inline-flex
//                                   items-center
//                                   gap-2
//                                   px-3
//                                   py-1.5
//                                   rounded-full
//                                   border
//                                   text-xs
//                                   font-bold
//                                   ${status.wrapper}
//                                 `}
//                               >

//                                 <span
//                                   className={`
//                                     w-1.5
//                                     h-1.5
//                                     rounded-full
//                                     ${status.dot}
//                                   `}
//                                 />

//                                 {getDisplayStatus(
//                                   job
//                                 )}

//                               </span>

//                               {job.technician_response ===
//                                 "Rejected" &&
//                                 job.technician_rejection_reason && (

//                                   <p className="text-[11px] text-red-500 mt-2 max-w-[180px] mx-auto line-clamp-2">
//                                     {job.technician_rejection_reason}
//                                   </p>
//                                 )}

//                             </td>

//                             {/* ACTION */}

//                             <td className="px-5 py-5">

//                               {/* ACCEPT / REJECT */}

//                               {canRespondToJob(
//                                 job
//                               ) ? (

//                                 <div className="flex items-center justify-center gap-2">

//                                   <button
//                                     onClick={() =>
//                                       acceptJob(
//                                         job
//                                       )
//                                     }
//                                     disabled={
//                                       responseLoading
//                                     }
//                                     className="
//                                       inline-flex
//                                       items-center
//                                       justify-center
//                                       gap-1.5
//                                       px-3.5
//                                       py-2.5
//                                       rounded-xl
//                                       bg-green-600
//                                       text-white
//                                       text-xs
//                                       font-semibold
//                                       hover:bg-green-700
//                                       active:scale-95
//                                       transition
//                                       disabled:opacity-50
//                                       disabled:cursor-not-allowed
//                                     "
//                                   >

//                                     {responseLoading ? (
//                                       <Loader2
//                                         size={15}
//                                         className="animate-spin"
//                                       />
//                                     ) : (
//                                       <ThumbsUp
//                                         size={15}
//                                       />
//                                     )}

//                                     Accept

//                                   </button>

//                                   <button
//                                     onClick={() =>
//                                       openRejectModal(
//                                         job
//                                       )
//                                     }
//                                     disabled={
//                                       responseLoading
//                                     }
//                                     className="
//                                       inline-flex
//                                       items-center
//                                       justify-center
//                                       gap-1.5
//                                       px-3.5
//                                       py-2.5
//                                       rounded-xl
//                                       border
//                                       border-red-200
//                                       bg-red-50
//                                       text-red-700
//                                       text-xs
//                                       font-semibold
//                                       hover:bg-red-100
//                                       active:scale-95
//                                       transition
//                                       disabled:opacity-50
//                                       disabled:cursor-not-allowed
//                                     "
//                                   >

//                                     <ThumbsDown
//                                       size={15}
//                                     />

//                                     Reject

//                                   </button>

//                                 </div>

//                               ) : job.status ===
//                                 "Accepted" &&
//                                 job.technician_response ===
//                                   "Accepted" ? (

//                                 <div className="flex justify-center">

//                                   <button
//                                     onClick={() =>
//                                       openCompleteModal(
//                                         job
//                                       )
//                                     }
//                                     className="
//                                       inline-flex
//                                       items-center
//                                       gap-2
//                                       px-4
//                                       py-2.5
//                                       rounded-xl
//                                       bg-green-600
//                                       text-white
//                                       text-sm
//                                       font-semibold
//                                       hover:bg-green-700
//                                       active:scale-95
//                                       transition
//                                     "
//                                   >

//                                     <CheckCircle
//                                       size={16}
//                                     />

//                                     Complete

//                                   </button>

//                                 </div>

//                               ) : job.status ===
//                                 "Completed" ? (

//                                 <div className="flex justify-center">

//                                   <span className="inline-flex items-center gap-1.5 text-green-600 font-semibold text-sm">

//                                     <Check
//                                       size={17}
//                                     />

//                                     Completed

//                                   </span>

//                                 </div>

//                               ) : job.technician_response ===
//                                 "Rejected" ? (

//                                 <div className="text-center">

//                                   <span className="inline-flex items-center gap-1.5 text-red-600 font-semibold text-sm">

//                                     <X
//                                       size={16}
//                                     />

//                                     Rejected

//                                   </span>

//                                   <p className="text-[11px] text-slate-400 mt-1">
//                                     Waiting for reassignment
//                                   </p>

//                                 </div>

//                               ) : (

//                                 <div className="text-center">

//                                   <span className="text-slate-400 text-sm">
//                                     No action
//                                   </span>

//                                 </div>

//                               )}

//                             </td>

//                           </tr>

//                         );
//                       })}

//                     </tbody>

//                   </table>

//                 </div>

//                 {/* =================================================
//                     MOBILE / TABLET CARDS
//                 ================================================== */}

//                 <div className="lg:hidden divide-y divide-slate-100">

//                   {filteredJobs.map((job) => {

//                     const status =
//                       getStatusStyle(job);

//                     return (

//                       <article
//                         key={job._id}
//                         className="p-4 sm:p-5"
//                       >

//                         {/* TOP */}

//                         <div className="flex items-start justify-between gap-3">

//                           <div className="flex items-center gap-3 min-w-0">

//                             <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">

//                               <Wrench
//                                 size={20}
//                                 className="text-blue-700"
//                               />

//                             </div>

//                             <div className="min-w-0">

//                               <div className="flex items-center gap-2 flex-wrap">

//                                 <span className="font-bold text-blue-700">
//                                   #{job.booking_id || "-"}
//                                 </span>

//                                 <span
//                                   className={`
//                                     inline-flex
//                                     items-center
//                                     gap-1.5
//                                     px-2.5
//                                     py-1
//                                     rounded-full
//                                     border
//                                     text-[10px]
//                                     font-bold
//                                     ${status.wrapper}
//                                   `}
//                                 >

//                                   <span
//                                     className={`
//                                       w-1.5
//                                       h-1.5
//                                       rounded-full
//                                       ${status.dot}
//                                     `}
//                                   />

//                                   {getDisplayStatus(
//                                     job
//                                   )}

//                                 </span>

//                               </div>

//                               <p className="font-semibold text-slate-900 mt-1 truncate">
//                                 {job.service_type ||
//                                   "Service"}
//                               </p>

//                             </div>

//                           </div>

//                         </div>

//                         {/* CUSTOMER */}

//                         <div className="mt-5 flex items-center gap-3">

//                           <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center shrink-0">

//                             <UserRound
//                               size={17}
//                               className="text-slate-500"
//                             />

//                           </div>

//                           <div className="min-w-0">

//                             <p className="text-xs text-slate-500">
//                               Customer
//                             </p>

//                             <p className="text-sm font-semibold text-slate-900 truncate">
//                               {job.full_name ||
//                                 "Unknown"}
//                             </p>

//                           </div>

//                           {job.phone && (

//                             <a
//                               href={`tel:${job.phone}`}
//                               className="ml-auto w-9 h-9 rounded-lg bg-green-50 text-green-600 flex items-center justify-center"
//                               aria-label="Call customer"
//                             >

//                               <Phone size={16} />

//                             </a>

//                           )}

//                         </div>

//                         {/* DETAILS */}

//                         <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">

//                           <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">

//                             <div className="flex items-start gap-2">

//                               <MapPin
//                                 size={16}
//                                 className="text-red-500 mt-0.5 shrink-0"
//                               />

//                               <div className="min-w-0">

//                                 <p className="text-[11px] text-slate-400 uppercase font-bold tracking-wide">
//                                   Location
//                                 </p>

//                                 <p className="text-sm text-slate-700 mt-1 line-clamp-2">
//                                   {job.address || "-"}
//                                 </p>

//                               </div>

//                             </div>

//                           </div>

//                           <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">

//                             <div className="flex items-start gap-2">

//                               <CalendarDays
//                                 size={16}
//                                 className="text-blue-600 mt-0.5 shrink-0"
//                               />

//                               <div>

//                                 <p className="text-[11px] text-slate-400 uppercase font-bold tracking-wide">
//                                   Schedule
//                                 </p>

//                                 <p className="text-sm font-medium text-slate-700 mt-1">
//                                   {job.visit_date
//                                     ? formatDate(
//                                         job.visit_date
//                                       )
//                                     : "-"}
//                                 </p>

//                                 <p className="text-xs text-slate-500 mt-0.5">
//                                   {job.visit_time ||
//                                     "Time not specified"}
//                                 </p>

//                               </div>

//                             </div>

//                           </div>

//                         </div>

//                         {/* REJECTION REASON */}

//                         {job.technician_response ===
//                           "Rejected" &&
//                           job.technician_rejection_reason && (

//                             <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-100">

//                               <div className="flex items-start gap-2">

//                                 <AlertCircle
//                                   size={16}
//                                   className="text-red-600 mt-0.5 shrink-0"
//                                 />

//                                 <div>

//                                   <p className="text-[11px] text-red-500 uppercase font-bold tracking-wide">
//                                     Rejection Reason
//                                   </p>

//                                   <p className="text-sm text-red-700 mt-1 leading-relaxed">
//                                     {job.technician_rejection_reason}
//                                   </p>

//                                 </div>

//                               </div>

//                             </div>
//                           )}

//                         {/* EARNING */}

//                         {job.status ===
//                           "Completed" && (

//                           <div className="mt-3 flex items-center justify-between p-3 rounded-xl bg-green-50 border border-green-100">

//                             <div className="flex items-center gap-2">

//                               <IndianRupee
//                                 size={16}
//                                 className="text-green-600"
//                               />

//                               <span className="text-sm font-medium text-green-700">
//                                 Job earning
//                               </span>

//                             </div>

//                             <span className="font-bold text-green-700">
//                               {formatCurrency(
//                                 getJobEarning(
//                                   job
//                                 )
//                               )}
//                             </span>

//                           </div>

//                         )}

//                         {/* =================================================
//                             MOBILE ACTIONS
//                         ================================================== */}

//                         {canRespondToJob(
//                           job
//                         ) && (

//                           <div className="mt-4 grid grid-cols-2 gap-3">

//                             <button
//                               onClick={() =>
//                                 acceptJob(
//                                   job
//                                 )
//                               }
//                               disabled={
//                                 responseLoading
//                               }
//                               className="
//                                 w-full
//                                 inline-flex
//                                 items-center
//                                 justify-center
//                                 gap-2
//                                 px-4
//                                 py-3
//                                 rounded-xl
//                                 bg-green-600
//                                 text-white
//                                 text-sm
//                                 font-semibold
//                                 hover:bg-green-700
//                                 active:scale-[0.99]
//                                 transition
//                                 disabled:opacity-50
//                                 disabled:cursor-not-allowed
//                               "
//                             >

//                               {responseLoading ? (
//                                 <Loader2
//                                   size={17}
//                                   className="animate-spin"
//                                 />
//                               ) : (
//                                 <ThumbsUp
//                                   size={17}
//                                 />
//                               )}

//                               Accept

//                             </button>

//                             <button
//                               onClick={() =>
//                                 openRejectModal(
//                                   job
//                                 )
//                               }
//                               disabled={
//                                 responseLoading
//                               }
//                               className="
//                                 w-full
//                                 inline-flex
//                                 items-center
//                                 justify-center
//                                 gap-2
//                                 px-4
//                                 py-3
//                                 rounded-xl
//                                 bg-red-50
//                                 border
//                                 border-red-200
//                                 text-red-700
//                                 text-sm
//                                 font-semibold
//                                 hover:bg-red-100
//                                 active:scale-[0.99]
//                                 transition
//                                 disabled:opacity-50
//                                 disabled:cursor-not-allowed
//                               "
//                             >

//                               <ThumbsDown
//                                 size={17}
//                               />

//                               Reject

//                             </button>

//                           </div>

//                         )}

//                         {job.status ===
//                           "Accepted" &&
//                           job.technician_response ===
//                             "Accepted" && (

//                           <button
//                             onClick={() =>
//                               openCompleteModal(
//                                 job
//                               )
//                             }
//                             className="
//                               w-full
//                               mt-4
//                               inline-flex
//                               items-center
//                               justify-center
//                               gap-2
//                               px-4
//                               py-3
//                               rounded-xl
//                               bg-green-600
//                               text-white
//                               text-sm
//                               font-semibold
//                               hover:bg-green-700
//                               active:scale-[0.99]
//                               transition
//                             "
//                           >

//                             <CheckCircle
//                               size={17}
//                             />

//                             Complete Service

//                           </button>

//                         )}

//                         {job.status ===
//                           "Completed" && (

//                           <div className="mt-4 flex items-center justify-center gap-2 py-2 text-green-600 text-sm font-semibold">

//                             <Check size={17} />

//                             Service Completed

//                           </div>

//                         )}

//                         {job.technician_response ===
//                           "Rejected" && (

//                           <div className="mt-4 flex items-center justify-center gap-2 py-2 text-red-600 text-sm font-semibold">

//                             <X size={17} />

//                             Rejected — Waiting for reassignment

//                           </div>

//                         )}

//                       </article>

//                     );
//                   })}

//                 </div>

//               </>

//             )}

//             {/* FOOTER COUNT */}

//             {!loading &&
//               filteredJobs.length > 0 && (

//                 <div className="px-5 sm:px-6 py-4 border-t border-slate-200 bg-slate-50">

//                   <p className="text-sm text-slate-500">

//                     Showing{" "}

//                     <span className="font-semibold text-slate-700">
//                       {filteredJobs.length}
//                     </span>{" "}

//                     of{" "}

//                     <span className="font-semibold text-slate-700">
//                       {jobs.length}
//                     </span>{" "}

//                     jobs

//                   </p>

//                 </div>

//               )}

//           </section>

//         </main>

//         {/* =====================================================
//             REJECT JOB MODAL
//         ====================================================== */}

//         {showRejectModal &&
//           selectedJob && (

//           <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center">

//             <div
//               className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
//               onClick={closeRejectModal}
//             />

//             <div className="
//               relative
//               w-full
//               sm:max-w-lg
//               bg-white
//               rounded-t-3xl
//               sm:rounded-2xl
//               shadow-2xl
//               overflow-hidden
//               max-h-[92vh]
//               overflow-y-auto
//             ">

//               {/* HEADER */}

//               <div className="px-5 sm:px-6 py-5 border-b border-slate-200 flex items-center justify-between">

//                 <div className="flex items-center gap-3">

//                   <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">

//                     <ThumbsDown
//                       size={20}
//                       className="text-red-600"
//                     />

//                   </div>

//                   <div>

//                     <h2 className="text-lg font-bold text-slate-900">
//                       Reject Job
//                     </h2>

//                     <p className="text-xs text-slate-500">
//                       Booking #{selectedJob.booking_id}
//                     </p>

//                   </div>

//                 </div>

//                 <button
//                   onClick={
//                     closeRejectModal
//                   }
//                   disabled={
//                     responseLoading
//                   }
//                   className="
//                     w-9
//                     h-9
//                     rounded-lg
//                     hover:bg-slate-100
//                     flex
//                     items-center
//                     justify-center
//                     text-slate-500
//                     transition
//                     disabled:opacity-50
//                   "
//                 >

//                   <X size={20} />

//                 </button>

//               </div>

//               {/* BODY */}

//               <div className="p-5 sm:p-6">

//                 <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-5">

//                   <div className="flex items-start gap-3">

//                     <AlertCircle
//                       size={18}
//                       className="text-yellow-600 mt-0.5 shrink-0"
//                     />

//                     <p className="text-sm text-yellow-800 leading-relaxed">

//                       Please provide a reason for rejecting
//                       this job. Your reason will be visible to
//                       the administrator.

//                     </p>

//                   </div>

//                 </div>

//                 {/* JOB SUMMARY */}

//                 <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-5">

//                   <div className="grid grid-cols-2 gap-4">

//                     <div>

//                       <p className="text-xs text-slate-500">
//                         Customer
//                       </p>

//                       <p className="font-semibold text-slate-800 mt-1 truncate">
//                         {selectedJob.full_name}
//                       </p>

//                     </div>

//                     <div>

//                       <p className="text-xs text-slate-500">
//                         Service
//                       </p>

//                       <p className="font-semibold text-slate-800 mt-1 truncate">
//                         {selectedJob.service_type}
//                       </p>

//                     </div>

//                   </div>

//                 </div>

//                 {/* REASON */}

//                 <label className="block text-sm font-semibold text-slate-800 mb-2">

//                   Reason for Rejection

//                   <span className="text-red-500 ml-1">
//                     *
//                   </span>

//                 </label>

//                 <textarea
//                   value={
//                     rejectionReason
//                   }
//                   onChange={(e) => {

//                     setRejectionReason(
//                       e.target.value.slice(
//                         0,
//                         500
//                       )
//                     );

//                     setResponseError("");

//                   }}
//                   rows={6}
//                   disabled={
//                     responseLoading
//                   }
//                   maxLength={500}
//                   placeholder="Example: I am unavailable on the scheduled date and cannot attend this service request."
//                   className="
//                     w-full
//                     border
//                     border-slate-200
//                     rounded-xl
//                     p-4
//                     text-sm
//                     text-slate-700
//                     outline-none
//                     resize-none
//                     focus:border-red-400
//                     focus:ring-2
//                     focus:ring-red-500/20
//                     transition
//                     disabled:bg-slate-50
//                   "
//                 />

//                 <div className="flex items-center justify-between mt-2">

//                   <p className="text-xs text-slate-400">
//                     Minimum 5 characters
//                   </p>

//                   <p className="text-xs text-slate-400">
//                     {rejectionReason.length}/500
//                   </p>

//                 </div>

//                 {/* ERROR */}

//                 {responseError && (

//                   <div className="flex items-start gap-2 mt-3 text-red-600">

//                     <AlertCircle
//                       size={16}
//                       className="mt-0.5 shrink-0"
//                     />

//                     <p className="text-sm">
//                       {responseError}
//                     </p>

//                   </div>

//                 )}

//               </div>

//               {/* FOOTER */}

//               <div className="px-5 sm:px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col-reverse sm:flex-row gap-3">

//                 <button
//                   disabled={
//                     responseLoading
//                   }
//                   onClick={
//                     closeRejectModal
//                   }
//                   className="
//                     flex-1
//                     px-5
//                     py-3
//                     rounded-xl
//                     border
//                     border-slate-200
//                     bg-white
//                     text-slate-700
//                     text-sm
//                     font-semibold
//                     hover:bg-slate-100
//                     transition
//                     disabled:opacity-50
//                   "
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   disabled={
//                     responseLoading ||
//                     !rejectionReason.trim()
//                   }
//                   onClick={rejectJob}
//                   className="
//                     flex-1
//                     inline-flex
//                     items-center
//                     justify-center
//                     gap-2
//                     px-5
//                     py-3
//                     rounded-xl
//                     bg-red-600
//                     text-white
//                     text-sm
//                     font-semibold
//                     hover:bg-red-700
//                     disabled:opacity-50
//                     disabled:cursor-not-allowed
//                     transition
//                   "
//                 >

//                   {responseLoading ? (

//                     <>
//                       <Loader2
//                         size={17}
//                         className="animate-spin"
//                       />

//                       Rejecting...
//                     </>

//                   ) : (

//                     <>
//                       <ThumbsDown
//                         size={17}
//                       />

//                       Confirm Rejection
//                     </>

//                   )}

//                 </button>

//               </div>

//             </div>

//           </div>

//         )}

//         {/* =====================================================
//             COMPLETE JOB MODAL
//         ====================================================== */}

//         {showModal &&
//           selectedJob && (

//           <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">

//             <div
//               className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
//               onClick={closeCompleteModal}
//             />

//             <div className="
//               relative
//               w-full
//               sm:max-w-lg
//               bg-white
//               rounded-t-3xl
//               sm:rounded-2xl
//               shadow-2xl
//               overflow-hidden
//               max-h-[92vh]
//               overflow-y-auto
//             ">

//               {/* HEADER */}

//               <div className="px-5 sm:px-6 py-5 border-b border-slate-200 flex items-center justify-between">

//                 <div className="flex items-center gap-3">

//                   <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">

//                     <FileText
//                       size={20}
//                       className="text-green-600"
//                     />

//                   </div>

//                   <div>

//                     <h2 className="text-lg font-bold text-slate-900">
//                       Complete Job
//                     </h2>

//                     <p className="text-xs text-slate-500">
//                       Booking #{selectedJob.booking_id}
//                     </p>

//                   </div>

//                 </div>

//                 <button
//                   onClick={
//                     closeCompleteModal
//                   }
//                   disabled={otpLoading}
//                   className="w-9 h-9 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-500 transition"
//                 >

//                   <X size={20} />

//                 </button>

//               </div>

//               {/* BODY */}

//               <div className="p-5 sm:p-6">

//                 {/* SUMMARY */}

//                 <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-5">

//                   <div className="grid grid-cols-2 gap-4">

//                     <div>

//                       <p className="text-xs text-slate-500">
//                         Customer
//                       </p>

//                       <p className="font-semibold text-slate-800 mt-1 truncate">
//                         {selectedJob.full_name}
//                       </p>

//                     </div>

//                     <div>

//                       <p className="text-xs text-slate-500">
//                         Service
//                       </p>

//                       <p className="font-semibold text-slate-800 mt-1 truncate">
//                         {selectedJob.service_type}
//                       </p>

//                     </div>

//                   </div>

//                 </div>

//                 {/* REPORT */}

//                 <label className="block text-sm font-semibold text-slate-800 mb-2">

//                   Work Completion Report

//                   <span className="text-red-500 ml-1">
//                     *
//                   </span>

//                 </label>

//                 <textarea
//                   value={workReport}
//                   onChange={(e) =>
//                     setWorkReport(
//                       e.target.value
//                     )
//                   }
//                   rows={7}
//                   disabled={otpLoading}
//                   placeholder={`Example:

// • Equipment inspected
// • Fault identified
// • Required repair completed
// • Parts replaced
// • Testing completed successfully`}
//                   className="
//                     w-full
//                     border
//                     border-slate-200
//                     rounded-xl
//                     p-4
//                     text-sm
//                     text-slate-700
//                     outline-none
//                     resize-none
//                     focus:border-blue-500
//                     focus:ring-2
//                     focus:ring-blue-500/20
//                     transition
//                   "
//                 />

//                 <p className="text-xs text-slate-400 mt-2">
//                   Please provide a clear summary of the
//                   work performed.
//                 </p>

//                 {otpError && (

//                   <div className="flex items-start gap-2 mt-3 text-red-600">

//                     <AlertCircle
//                       size={16}
//                       className="mt-0.5 shrink-0"
//                     />

//                     <p className="text-sm">
//                       {otpError}
//                     </p>

//                   </div>

//                 )}

//               </div>

//               {/* FOOTER */}

//               <div className="px-5 sm:px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col-reverse sm:flex-row gap-3">

//                 <button
//                   disabled={otpLoading}
//                   onClick={
//                     closeCompleteModal
//                   }
//                   className="
//                     flex-1
//                     px-5
//                     py-3
//                     rounded-xl
//                     border
//                     border-slate-200
//                     bg-white
//                     text-slate-700
//                     text-sm
//                     font-semibold
//                     hover:bg-slate-100
//                     transition
//                   "
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   disabled={
//                     otpLoading ||
//                     !workReport.trim()
//                   }
//                   onClick={
//                     requestCompletionOTP
//                   }
//                   className="
//                     flex-1
//                     inline-flex
//                     items-center
//                     justify-center
//                     gap-2
//                     px-5
//                     py-3
//                     rounded-xl
//                     bg-green-600
//                     text-white
//                     text-sm
//                     font-semibold
//                     hover:bg-green-700
//                     disabled:opacity-50
//                     disabled:cursor-not-allowed
//                     transition
//                   "
//                 >

//                   {otpLoading ? (

//                     <>
//                       <Loader2
//                         size={17}
//                         className="animate-spin"
//                       />

//                       Sending OTP...
//                     </>

//                   ) : (

//                     <>
//                       <ShieldCheck size={17} />

//                       Request Customer OTP
//                     </>

//                   )}

//                 </button>

//               </div>

//             </div>

//           </div>

//         )}

//         {/* =====================================================
//             CUSTOMER OTP MODAL
//         ====================================================== */}

//         {showOTPModal &&
//           selectedJob && (

//           <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center">

//             <div
//               className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
//               onClick={closeOTPModal}
//             />

//             <div className="
//               relative
//               w-full
//               sm:max-w-md
//               bg-white
//               rounded-t-3xl
//               sm:rounded-2xl
//               shadow-2xl
//               overflow-hidden
//               max-h-[92vh]
//               overflow-y-auto
//             ">

//               {/* HEADER */}

//               <div className="px-5 sm:px-6 py-5 border-b border-slate-200">

//                 <div className="flex items-center justify-between">

//                   <div className="flex items-center gap-3">

//                     <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">

//                       <ShieldCheck
//                         size={22}
//                         className="text-blue-600"
//                       />

//                     </div>

//                     <div>

//                       <h2 className="text-lg font-bold text-slate-900">
//                         Customer Verification
//                       </h2>

//                       <p className="text-xs text-slate-500 mt-1">
//                         Booking #{selectedJob.booking_id}
//                       </p>

//                     </div>

//                   </div>

//                   <button
//                     onClick={
//                       closeOTPModal
//                     }
//                     disabled={otpLoading}
//                     className="w-9 h-9 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-500"
//                   >

//                     <X size={19} />

//                   </button>

//                 </div>

//               </div>

//               {/* BODY */}

//               <div className="p-5 sm:p-6">

//                 {/* INFORMATION */}

//                 <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-5">

//                   <div className="flex items-start gap-3">

//                     <ShieldCheck
//                       size={18}
//                       className="text-blue-600 mt-0.5 shrink-0"
//                     />

//                     <p className="text-sm text-blue-800 leading-relaxed">

//                       Ask the customer for the{" "}
//                       <strong>6-digit OTP</strong>{" "}
//                       sent to their registered contact.

//                     </p>

//                   </div>

//                 </div>

//                 {/* CUSTOMER */}

//                 <div className="flex items-center gap-3 mb-5">

//                   <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">

//                     <UserRound
//                       size={18}
//                       className="text-slate-500"
//                     />

//                   </div>

//                   <div>

//                     <p className="text-xs text-slate-500">
//                       Customer
//                     </p>

//                     <p className="font-semibold text-slate-900">
//                       {selectedJob.full_name}
//                     </p>

//                   </div>

//                 </div>

//                 {/* OTP */}

//                 <label className="block text-sm font-semibold text-slate-800 mb-2">

//                   Customer OTP

//                 </label>

//                 <input
//                   type="text"
//                   inputMode="numeric"
//                   autoComplete="one-time-code"
//                   maxLength={6}
//                   value={otp}
//                   disabled={otpLoading}
//                   autoFocus
//                   onChange={(e) => {

//                     const value =
//                       e.target.value
//                         .replace(/\D/g, "")
//                         .slice(0, 6);

//                     setOtp(value);
//                     setOtpError("");

//                   }}
//                   placeholder="Enter 6-digit OTP"
//                   className="
//                     w-full
//                     border
//                     border-slate-200
//                     rounded-xl
//                     px-4
//                     py-4
//                     text-center
//                     text-2xl
//                     font-bold
//                     tracking-[0.5em]
//                     outline-none
//                     focus:border-blue-500
//                     focus:ring-2
//                     focus:ring-blue-500/20
//                     transition
//                   "
//                 />

//                 {/* ERROR */}

//                 {otpError && (

//                   <div className="flex items-start gap-2 mt-3 text-red-600">

//                     <AlertCircle
//                       size={16}
//                       className="mt-0.5 shrink-0"
//                     />

//                     <p className="text-sm">
//                       {otpError}
//                     </p>

//                   </div>

//                 )}

//                 <p className="text-xs text-slate-400 mt-3 text-center">
//                   OTP is valid for 5 minutes.
//                 </p>

//               </div>

//               {/* FOOTER */}

//               <div className="px-5 sm:px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col-reverse sm:flex-row gap-3">

//                 <button
//                   disabled={otpLoading}
//                   onClick={
//                     closeOTPModal
//                   }
//                   className="
//                     flex-1
//                     px-4
//                     py-3
//                     rounded-xl
//                     border
//                     border-slate-200
//                     bg-white
//                     text-slate-700
//                     text-sm
//                     font-semibold
//                     hover:bg-slate-100
//                     transition
//                   "
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   disabled={
//                     otpLoading ||
//                     otp.length !== 6
//                   }
//                   onClick={
//                     verifyCompletionOTP
//                   }
//                   className="
//                     flex-1
//                     inline-flex
//                     items-center
//                     justify-center
//                     gap-2
//                     px-4
//                     py-3
//                     rounded-xl
//                     bg-green-600
//                     text-white
//                     text-sm
//                     font-semibold
//                     hover:bg-green-700
//                     disabled:opacity-50
//                     disabled:cursor-not-allowed
//                     transition
//                   "
//                 >

//                   {otpLoading ? (

//                     <>
//                       <Loader2
//                         size={17}
//                         className="animate-spin"
//                       />

//                       Verifying...
//                     </>

//                   ) : (

//                     <>
//                       <Check size={17} />

//                       Verify & Complete
//                     </>

//                   )}

//                 </button>

//               </div>

//             </div>

//           </div>

//         )}
//         {/* =====================================================
//             PROFESSIONAL FOOTER
//         ====================================================== */}

//         <footer className="mt-10 sm:mt-14 bg-slate-950 text-slate-300">

//           <div className="max-w-[1800px] mx-auto px-5 sm:px-6 lg:px-8">

//             {/* MAIN FOOTER */}

//             <div className="py-10 sm:py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

//               {/* BRAND */}

//               <div className="lg:col-span-2">

//                 <div className="flex items-center gap-3">

//                   <div className="w-11 h-11 rounded-xl bg-blue-700 flex items-center justify-center">

//                     <Wrench
//                       size={21}
//                       className="text-white"
//                     />

//                   </div>

//                   <div>

//                     <h3 className="text-xl font-bold text-white">
//                       ServoraCare
//                     </h3>

//                     <p className="text-xs text-slate-400">
//                       Professional Home Services
//                     </p>

//                   </div>

//                 </div>

//                 <p className="text-sm text-slate-400 leading-relaxed mt-5 max-w-md">

//                   Empowering service professionals with
//                   reliable tools to manage jobs, serve
//                   customers and grow their earnings.

//                 </p>

//               </div>

//               {/* SUPPORT */}

//               <div>

//                 <h4 className="text-sm font-bold text-white uppercase tracking-wider">
//                   Technician Support
//                 </h4>

//                 <div className="mt-4 space-y-3">

//                   <a
//                     href="mailto:support@servoracare.in"
//                     className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition"
//                   >

//                     <Mail size={15} />

//                     support@servoracare.in

//                   </a>

//                   <a
//                     href="tel:+917828908522"
//                     className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition"
//                   >

//                     <Phone size={15} />

//                     +91 78289 08522

//                   </a>

//                 </div>

//               </div>

//               {/* HELP */}

//               <div>

//                 <h4 className="text-sm font-bold text-white uppercase tracking-wider">
//                   Quick Help
//                 </h4>

//                 <div className="mt-4 space-y-3">

//                   <div className="flex items-center gap-2 text-sm text-slate-400">

//                     <Headphones size={15} />

//                     Technician Support

//                   </div>

//                   <div className="flex items-center gap-2 text-sm text-slate-400">

//                     <CircleHelp size={15} />

//                     Job & OTP Assistance

//                   </div>

//                   <div className="flex items-center gap-2 text-sm text-slate-400">

//                     <ShieldCheck size={15} />

//                     Secure Customer Verification

//                   </div>

//                 </div>

//               </div>

//             </div>

//             {/* BOTTOM */}

//             <div className="py-5 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">

//               <p className="text-xs text-slate-500 text-center sm:text-left">

//                 © {new Date().getFullYear()} ServoraCare.
//                 All rights reserved.

//               </p>

//               <div className="flex items-center gap-2 text-xs text-slate-500">

//                 <ShieldCheck size={14} />

//                 Secure Technician Portal

//               </div>

//             </div>

//           </div>

//         </footer>


//       </div>
//     </>
//   );
// }

// export default TechnicianDashboard;


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
            PROFESSIONAL FOOTER
        ====================================================== */}

        <footer className="mt-10 sm:mt-14 bg-slate-950 text-slate-300">

          <div className="max-w-[1800px] mx-auto px-5 sm:px-6 lg:px-8">

            {/* MAIN FOOTER */}

            <div className="py-10 sm:py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

              {/* BRAND */}

              <div className="lg:col-span-2">

                <div className="flex items-center gap-3">

                  <div className="w-11 h-11 rounded-xl bg-blue-700 flex items-center justify-center">

                    <Wrench
                      size={21}
                      className="text-white"
                    />

                  </div>

                  <div>

                    <h3 className="text-xl font-bold text-white">
                      ServoraCare
                    </h3>

                    <p className="text-xs text-slate-400">
                      Professional Home Services
                    </p>

                  </div>

                </div>

                <p className="text-sm text-slate-400 leading-relaxed mt-5 max-w-md">

                  Empowering service professionals with
                  reliable tools to manage jobs, serve
                  customers and grow their earnings.

                </p>

              </div>

              {/* SUPPORT */}

              <div>

                <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                  Technician Support
                </h4>

                <div className="mt-4 space-y-3">

                  <a
                    href="mailto:support@servoracare.in"
                    className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition"
                  >

                    <Mail size={15} />

                    support@servoracare.in

                  </a>

                  <a
                    href="tel:+917828908522"
                    className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition"
                  >

                    <Phone size={15} />

                    +91 78289 08522

                  </a>

                </div>

              </div>

              {/* HELP */}

              <div>

                <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                  Quick Help
                </h4>

                <div className="mt-4 space-y-3">

                  <div className="flex items-center gap-2 text-sm text-slate-400">

                    <Headphones size={15} />

                    Technician Support

                  </div>

                  <div className="flex items-center gap-2 text-sm text-slate-400">

                    <CircleHelp size={15} />

                    Job & OTP Assistance

                  </div>

                  <div className="flex items-center gap-2 text-sm text-slate-400">

                    <ShieldCheck size={15} />

                    Secure Customer Verification

                  </div>

                </div>

              </div>

            </div>

            {/* BOTTOM */}

            <div className="py-5 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">

              <p className="text-xs text-slate-500 text-center sm:text-left">

                © {new Date().getFullYear()} ServoraCare.
                All rights reserved.

              </p>

              <div className="flex items-center gap-2 text-xs text-slate-500">

                <ShieldCheck size={14} />

                Secure Technician Portal

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

