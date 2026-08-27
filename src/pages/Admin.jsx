// import { useEffect, useState } from "react";
// import axios from "axios";
// import AdminLayout from "../layouts/AdminLayout";
// import AdminDashboard from "./admin/AdminDashboard";

// const API = import.meta.env.VITE_API_URL;

// function Admin() {

//     const [bookings, setBookings] = useState([]);
//     const [technicians, setTechnicians] = useState([]);

//     const [selectedTechnician, setSelectedTechnician] = useState({});
//     const [visitDate, setVisitDate] = useState({});
//     const [visitTime, setVisitTime] = useState({});
//     const [loading, setLoading] = useState(true);
//     const [assigning, setAssigning] = useState({});
//     const [rejectModal, setRejectModal] = useState({
//         open: false,
//         bookingId: null,
//         bookingNumber: null
//     });

//     const [rejectionReason, setRejectionReason] = useState("");
//     const [rejecting, setRejecting] = useState(false);
//     const [completeModal, setCompleteModal] = useState({
//         open: false,
//         bookingId: null,
//         bookingNumber: null
//     });

//     const [completionComment, setCompletionComment] = useState("");

//     const [completing, setCompleting] = useState(false);

//     const completeBooking = async () => {

//     if (!completionComment.trim()) {
//         alert("Please enter a completion comment");
//         return;
//     }

//     try {

//         setCompleting(true);

//         await axios.put(
//             `${API}/api/update-status/${completeModal.bookingId}`,
//             {
//                 status: "Completed",
//                 completion_comment:
//                     completionComment.trim()
//             }
//         );

//         setCompleteModal({
//             open: false,
//             bookingId: null,
//             bookingNumber: null
//         });

//         setCompletionComment("");

//         await fetchBookings();

//     } catch (error) {

//         console.error(
//             "Complete Booking Error:",
//             error
//         );

//         alert(
//             error.response?.data?.message ||
//             "Failed to complete booking"
//         );

//     } finally {

//         setCompleting(false);
//     }
// };


//     const rejectBooking = async () => {

//     if (!rejectionReason.trim()) {
//         alert("Please enter a rejection reason");
//         return;
//     }

//     try {

//         setRejecting(true);

//         await axios.put(
//             `${API}/api/update-status/${rejectModal.bookingId}`,
//             {
//                 status: "Rejected",
//                 rejection_reason: rejectionReason.trim()
//             }
//         );

//         setRejectModal({
//             open: false,
//             bookingId: null,
//             bookingNumber: null
//         });

//         setRejectionReason("");

//         await fetchBookings();

//     } catch (error) {

//         console.error(
//             "Reject Booking Error:",
//             error
//         );

//         alert(
//             error.response?.data?.message ||
//             "Failed to reject booking"
//         );

//     } finally {

//         setRejecting(false);
//     }
// };


//     // ==========================================
//     // FETCH BOOKINGS
//     // ==========================================

// const fetchBookings = async () => {
//     try {
//         setLoading(true);

//         const response = await axios.get(
//             `${API}/api/all-bookings`
//         );

//         setBookings(response.data);

//     } catch (error) {
//         console.error(
//             "Fetch Bookings Error:",
//             error
//         );
//     } finally {
//         setLoading(false);
//     }
// };


//     // ==========================================
//     // FETCH TECHNICIANS
//     // ==========================================

//     const fetchTechnicians = async () => {

//         try {

//             const response = await axios.get(
//                 `${API}/api/admin/technicians`
//             );

//             setTechnicians(response.data);

//         } catch (error) {

//             console.error(
//                 "Fetch Technicians Error:",
//                 error
//             );

//         }

//     };


//     // ==========================================
//     // LOAD DATA
//     // ==========================================

//     useEffect(() => {

//         fetchBookings();
//         fetchTechnicians();

//     }, []);


//     // ==========================================
//     // SELECT TECHNICIAN
//     // ==========================================

//     const assignTechnician = (
//         mongoBookingId,
//         technicianId
//     ) => {

//         setSelectedTechnician((prev) => ({

//             ...prev,

//             [mongoBookingId]:
//                 technicianId

//         }));

//     };


//     // ==========================================
//     // UPDATE STATUS
//     // ==========================================

//     const updateStatus = async (
//         mongoBookingId,
//         status
//     ) => {

//         try {

//             await axios.put(

//                 `${API}/api/update-status/${mongoBookingId}`,

//                 {
//                     status
//                 }

//             );

//             fetchBookings();

//         } catch (error) {

//             console.error(
//                 "Update Status Error:",
//                 error
//             );

//         }

//     };


//     // ==========================================
//     // SCHEDULE VISIT
//     // ==========================================

// const scheduleVisit = async (
//     bookingNumber,
//     mongoBookingId
// ) => {

//     const technicianId =
//         selectedTechnician[mongoBookingId];

//     const date =
//         visitDate[mongoBookingId];

//     const time =
//         visitTime[mongoBookingId];

//     if (!technicianId) {
//         alert("Please select technician");
//         return;
//     }

//     if (!date) {
//         alert("Please select visit date");
//         return;
//     }

//     if (!time) {
//         alert("Please select visit time");
//         return;
//     }

//     try {

//         setAssigning((prev) => ({
//             ...prev,
//             [mongoBookingId]: true
//         }));

//         await axios.put(
//             `${API}/api/admin/assign-technician/${bookingNumber}`,
//             {
//                 technician_id: technicianId,
//                 visit_date: date,
//                 visit_time: time
//             }
//         );

//         alert("Visit Scheduled Successfully");

//         await fetchBookings();

//     } catch (error) {

//         console.error(
//             "Assignment Error:",
//             error
//         );

//         alert(
//             error.response?.data?.message ||
//             "Assignment Failed"
//         );

//     } finally {

//         setAssigning((prev) => ({
//             ...prev,
//             [mongoBookingId]: false
//         }));
//     }
// };


// return (
//     <AdminLayout>

//         <div className="min-h-screen bg-slate-50">

//             {/* ==========================================
//                 PAGE HEADER
//             ========================================== */}

//             <div className="bg-white border-b border-slate-200">

//                 <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-6">

//                     <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

//                         <div>

//                             <div className="flex items-center gap-3">

//                                 <div className="w-11 h-11 rounded-xl bg-blue-900 flex items-center justify-center shadow-sm">
//                                     <span className="text-white text-xl">
//                                         ⚙️
//                                     </span>
//                                 </div>

//                                 <div>
//                                     <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
//                                         Admin Dashboard
//                                     </h1>

//                                     <p className="text-sm text-slate-500 mt-1">
//                                         Manage bookings, technicians and service visits
//                                     </p>
//                                 </div>

//                             </div>

//                         </div>

//                         <div className="flex items-center gap-2">

//                             <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full">

//                                 <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>

//                                 <span className="text-sm font-medium text-green-700">
//                                     System Online
//                                 </span>

//                             </div>

//                         </div>

//                     </div>

//                 </div>

//             </div>


//             {/* ==========================================
//                 MAIN CONTENT
//             ========================================== */}

//             <main className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 overflow-x-hidden">

//                 <AdminDashboard bookings={bookings} />
//                 {/* ==========================================
//                     STATISTICS
//                 ========================================== */}

//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">


//                     {/* TOTAL */}

//                     <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm hover:shadow-md transition">

//                         <div className="flex items-start justify-between">

//                             <div>

//                                 <p className="text-sm font-medium text-slate-500">
//                                     Total Bookings
//                                 </p>

//                                 <p className="text-3xl font-bold text-slate-900 mt-2">
//                                     {bookings.length}
//                                 </p>

//                             </div>

//                             <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">

//                                 <span className="text-xl">
//                                     📋
//                                 </span>

//                             </div>

//                         </div>

//                         <p className="text-xs text-slate-400 mt-4">
//                             All service requests
//                         </p>

//                     </div>


//                     {/* PENDING */}

//                     <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm hover:shadow-md transition">

//                         <div className="flex items-start justify-between">

//                             <div>

//                                 <p className="text-sm font-medium text-slate-500">
//                                     Pending
//                                 </p>

//                                 <p className="text-3xl font-bold text-yellow-500 mt-2">
//                                     {
//                                         bookings.filter(
//                                             (booking) =>
//                                                 booking.status === "Pending"
//                                         ).length
//                                     }
//                                 </p>

//                             </div>

//                             <div className="w-11 h-11 rounded-xl bg-yellow-50 flex items-center justify-center">

//                                 <span className="text-xl">
//                                     ⏳
//                                 </span>

//                             </div>

//                         </div>

//                         <p className="text-xs text-slate-400 mt-4">
//                             Awaiting assignment
//                         </p>

//                     </div>


//                     {/* ACCEPTED */}

//                     <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm hover:shadow-md transition">

//                         <div className="flex items-start justify-between">

//                             <div>

//                                 <p className="text-sm font-medium text-slate-500">
//                                     Accepted
//                                 </p>

//                                 <p className="text-3xl font-bold text-blue-600 mt-2">
//                                     {
//                                         bookings.filter(
//                                             (booking) =>
//                                                 booking.status === "Accepted"
//                                         ).length
//                                     }
//                                 </p>

//                             </div>

//                             <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">

//                                 <span className="text-xl">
//                                     🔧
//                                 </span>

//                             </div>

//                         </div>

//                         <p className="text-xs text-slate-400 mt-4">
//                             Technician assigned
//                         </p>

//                     </div>


//                     {/* COMPLETED */}

//                     <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm hover:shadow-md transition">

//                         <div className="flex items-start justify-between">

//                             <div>

//                                 <p className="text-sm font-medium text-slate-500">
//                                     Completed
//                                 </p>

//                                 <p className="text-3xl font-bold text-green-600 mt-2">
//                                     {
//                                         bookings.filter(
//                                             (booking) =>
//                                                 booking.status === "Completed"
//                                         ).length
//                                     }
//                                 </p>

//                             </div>

//                             <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center">

//                                 <span className="text-xl">
//                                     ✓
//                                 </span>

//                             </div>

//                         </div>

//                         <p className="text-xs text-slate-400 mt-4">
//                             Successfully completed
//                         </p>

//                     </div>

//                 </div>


//                 {/* ==========================================
//                     BOOKINGS SECTION
//                 ========================================== */}

//                 <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">


//                     {/* SECTION HEADER */}

//                     <div className="px-5 sm:px-6 py-5 border-b border-slate-200">

//                         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

//                             <div>

//                                 <h2 className="text-lg sm:text-xl font-bold text-slate-900">
//                                     Service Bookings
//                                 </h2>

//                                 <p className="text-sm text-slate-500 mt-1">
//                                     Review and manage customer service requests
//                                 </p>

//                             </div>

//                             <div className="text-sm text-slate-500">

//                                 {bookings.length} booking
//                                 {bookings.length !== 1 ? "s" : ""}

//                             </div>

//                         </div>

//                     </div>


//                     {/* ==========================================
//                         LOADING
//                     ========================================== */}

//                     {loading ? (

//                         <div className="flex flex-col items-center justify-center py-20">

//                             <div className="w-10 h-10 border-4 border-blue-100 border-t-blue-700 rounded-full animate-spin"></div>

//                             <p className="text-sm text-slate-500 mt-4">
//                                 Loading bookings...
//                             </p>

//                         </div>

//                     ) : bookings.length === 0 ? (

//                         /* ==========================================
//                             EMPTY
//                         ========================================== */

//                         <div className="text-center py-20 px-6">

//                             <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-100 flex items-center justify-center text-2xl">
//                                 📋
//                             </div>

//                             <h3 className="text-lg font-semibold text-slate-900 mt-5">
//                                 No bookings yet
//                             </h3>

//                             <p className="text-sm text-slate-500 mt-2">
//                                 New customer service requests will appear here.
//                             </p>

//                         </div>

//                     ) : (

//                         /* ==========================================
//                             DESKTOP TABLE
//                         ========================================== */

//                         <div className="overflow-x-auto">

//                             <table className="w-full min-w-[1400px]">

//                                 <thead className="bg-slate-50 border-b border-slate-200">

//                                     <tr>

//                                         <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
//                                             Booking
//                                         </th>

//                                         <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
//                                             Customer
//                                         </th>

//                                         <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
//                                             Service
//                                         </th>

//                                         <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
//                                             Created
//                                         </th>

//                                         <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
//                                             Status
//                                         </th>

//                                         <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
//                                             Technician
//                                         </th>

//                                         <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
//                                             Action
//                                         </th>

//                                     </tr>

//                                 </thead>


//                                 <tbody className="divide-y divide-slate-100">

//                                     {bookings.map((booking) => {

//                                         const mongoBookingId =
//                                             booking._id;

//                                         const bookingNumber =
//                                             booking.booking_id;

//                                         const isAssigning =
//                                             assigning[mongoBookingId];

//                                         return (

//                                             <tr
//                                                 key={mongoBookingId}
//                                                 className="hover:bg-slate-50/70 transition"
//                                             >


//                                                 {/* BOOKING */}

//                                                 <td className="px-5 py-5">

//                                                     <div className="font-bold text-blue-900">
//                                                         #{bookingNumber}
//                                                     </div>

//                                                     <div className="text-xs text-slate-400 mt-1">
//                                                         Service Request
//                                                     </div>

//                                                 </td>


//                                                 {/* CUSTOMER */}

//                                                 <td className="px-5 py-5">

//                                                     <div className="font-semibold text-slate-900">
//                                                         {booking.full_name}
//                                                     </div>

//                                                     <div className="text-sm text-slate-500 mt-1">
//                                                         {booking.phone}
//                                                     </div>

//                                                     <div className="text-xs text-slate-400 mt-1 max-w-[220px] truncate">
//                                                         {booking.address}
//                                                     </div>

//                                                 </td>


//                                                 {/* SERVICE */}

//                                                 <td className="px-5 py-5">

//                                                     <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-sm font-semibold">
//                                                         {booking.service_type}
//                                                     </span>

//                                                 </td>


//                                                 {/* DATE */}

//                                                 <td className="px-5 py-5">

//                                                     <div className="text-sm font-medium text-slate-700">
//                                                         {booking.created_at
//                                                             ? new Date(
//                                                                 booking.created_at
//                                                             ).toLocaleDateString()
//                                                             : "-"
//                                                         }
//                                                     </div>

//                                                     <div className="text-xs text-slate-400 mt-1">
//                                                         {booking.created_at
//                                                             ? new Date(
//                                                                 booking.created_at
//                                                             ).toLocaleTimeString([], {
//                                                                 hour: "2-digit",
//                                                                 minute: "2-digit"
//                                                             })
//                                                             : ""
//                                                         }
//                                                     </div>

//                                                 </td>


//                                                 {/* STATUS */}

//                                                 <td className="px-5 py-5">

//                                                     <span
//                                                         className={`
//                                                             inline-flex
//                                                             items-center
//                                                             gap-2
//                                                             px-3
//                                                             py-1.5
//                                                             rounded-full
//                                                             text-xs
//                                                             font-bold
//                                                             ${
//                                                                 booking.status === "Pending"
//                                                                     ? "bg-yellow-50 text-yellow-700"
//                                                                     : booking.status === "Accepted"
//                                                                     ? "bg-blue-50 text-blue-700"
//                                                                     : booking.status === "Completed"
//                                                                     ? "bg-green-50 text-green-700"
//                                                                     : "bg-red-50 text-red-700"
//                                                             }
//                                                         `}
//                                                     >

//                                                         <span
//                                                             className={`
//                                                                 w-1.5
//                                                                 h-1.5
//                                                                 rounded-full
//                                                                 ${
//                                                                     booking.status === "Pending"
//                                                                         ? "bg-yellow-500"
//                                                                         : booking.status === "Accepted"
//                                                                         ? "bg-blue-500"
//                                                                         : booking.status === "Completed"
//                                                                         ? "bg-green-500"
//                                                                         : "bg-red-500"
//                                                                 }
//                                                             `}
//                                                         />

//                                                         {booking.status}

//                                                     </span>

//                                                 </td>


//                                                 {/* TECHNICIAN */}

//                                                 <td className="px-5 py-5">

//                                                     {booking.status === "Pending" ? (

//                                                         <div className="space-y-2 w-[210px]">

//                                                             <select
//                                                                 value={
//                                                                     selectedTechnician[
//                                                                         mongoBookingId
//                                                                     ] || ""
//                                                                 }
//                                                                 onChange={(e) =>
//                                                                     assignTechnician(
//                                                                         mongoBookingId,
//                                                                         e.target.value
//                                                                     )
//                                                                 }
//                                                                 className="
//                                                                     w-full
//                                                                     border
//                                                                     border-slate-200
//                                                                     rounded-lg
//                                                                     px-3
//                                                                     py-2
//                                                                     text-sm
//                                                                     outline-none
//                                                                     focus:ring-2
//                                                                     focus:ring-blue-500/20
//                                                                     focus:border-blue-500
//                                                                     bg-white
//                                                                 "
//                                                             >

//                                                                 <option value="">
//                                                                     Select technician
//                                                                 </option>

//                                                                 {technicians.map(
//                                                                     (tech) => (

//                                                                         <option
//                                                                             key={tech.id}
//                                                                             value={tech.id}
//                                                                         >
//                                                                             {tech.name}
//                                                                         </option>

//                                                                     )
//                                                                 )}

//                                                             </select>


//                                                             <div className="grid grid-cols-2 gap-2">

//                                                                 <input
//                                                                     type="date"
//                                                                     value={
//                                                                         visitDate[
//                                                                             mongoBookingId
//                                                                         ] || ""
//                                                                     }
//                                                                     onChange={(e) =>
//                                                                         setVisitDate(
//                                                                             (prev) => ({
//                                                                                 ...prev,
//                                                                                 [mongoBookingId]:
//                                                                                     e.target.value
//                                                                             })
//                                                                         )
//                                                                     }
//                                                                     className="
//                                                                         w-full
//                                                                         border
//                                                                         border-slate-200
//                                                                         rounded-lg
//                                                                         px-2
//                                                                         py-2
//                                                                         text-xs
//                                                                         focus:ring-2
//                                                                         focus:ring-blue-500/20
//                                                                         focus:border-blue-500
//                                                                         outline-none
//                                                                     "
//                                                                 />

//                                                                 <input
//                                                                     type="time"
//                                                                     value={
//                                                                         visitTime[
//                                                                             mongoBookingId
//                                                                         ] || ""
//                                                                     }
//                                                                     onChange={(e) =>
//                                                                         setVisitTime(
//                                                                             (prev) => ({
//                                                                                 ...prev,
//                                                                                 [mongoBookingId]:
//                                                                                     e.target.value
//                                                                             })
//                                                                         )
//                                                                     }
//                                                                     className="
//                                                                         w-full
//                                                                         border
//                                                                         border-slate-200
//                                                                         rounded-lg
//                                                                         px-2
//                                                                         py-2
//                                                                         text-xs
//                                                                         focus:ring-2
//                                                                         focus:ring-blue-500/20
//                                                                         focus:border-blue-500
//                                                                         outline-none
//                                                                     "
//                                                                 />

//                                                             </div>

//                                                         </div>

//                                                     ) : (

//                                                         <div>

//                                                             <div className="font-semibold text-slate-800">
//                                                                 {booking.technician_name ||
//                                                                     "Not Assigned"}
//                                                             </div>

//                                                             {booking.technician_phone && (

//                                                                 <div className="text-sm text-slate-500 mt-1">
//                                                                     {booking.technician_phone}
//                                                                 </div>

//                                                             )}

//                                                         </div>

//                                                     )}

//                                                 </td>


//                                                 {/* ACTION */}

//                                                 <td className="px-5 py-5">

//                                                     {booking.status === "Pending" && (

//                                                         <div className="flex flex-col gap-2 w-[145px]">

//                                                             <button
//                                                                 disabled={isAssigning}
//                                                                 onClick={() =>
//                                                                     scheduleVisit(
//                                                                         bookingNumber,
//                                                                         mongoBookingId
//                                                                     )
//                                                                 }
//                                                                 className="
//                                                                     bg-blue-700
//                                                                     hover:bg-blue-800
//                                                                     disabled:bg-blue-300
//                                                                     text-white
//                                                                     px-4
//                                                                     py-2.5
//                                                                     rounded-lg
//                                                                     text-sm
//                                                                     font-semibold
//                                                                     transition
//                                                                 "
//                                                             >

//                                                                 {isAssigning
//                                                                     ? "Assigning..."
//                                                                     : "Assign & Accept"
//                                                                 }

//                                                             </button>


//                                                             <button
//                                                                 onClick={() => {
//                                                                     setRejectModal({
//                                                                         open: true,
//                                                                         bookingId: mongoBookingId,
//                                                                         bookingNumber: bookingNumber
//                                                                     });

//                                                                     setRejectionReason("");
//                                                                 }}
//                                                                 className="
//                                                                     border
//                                                                     border-red-200
//                                                                     text-red-600
//                                                                     hover:bg-red-50
//                                                                     px-4
//                                                                     py-2.5
//                                                                     rounded-lg
//                                                                     text-sm
//                                                                     font-semibold
//                                                                     transition
//                                                                 "
//                                                             >
//                                                                 Reject
//                                                             </button>

//                                                         </div>

//                                                     )}


//                                                     {booking.status === "Accepted" && (
//                                                         <button
//                                                             onClick={() => {
//                                                                 setCompleteModal({
//                                                                     open: true,
//                                                                     bookingId: mongoBookingId,
//                                                                     bookingNumber: bookingNumber
//                                                                 });

//                                                                 setCompletionComment("");
//                                                             }}
//                                                             className="
//                                                                 bg-green-600
//                                                                 hover:bg-green-700
//                                                                 text-white
//                                                                 px-4
//                                                                 py-2.5
//                                                                 rounded-lg
//                                                                 text-sm
//                                                                 font-semibold
//                                                                 transition
//                                                             "
//                                                         >
//                                                             Mark Completed
//                                                         </button>
//                                                     )}


//                                                     {(booking.status === "Completed" ||
//                                                         booking.status === "Rejected") && (

//                                                         <span
//                                                             className={`
//                                                                 inline-flex
//                                                                 items-center
//                                                                 px-3
//                                                                 py-2
//                                                                 rounded-lg
//                                                                 text-xs
//                                                                 font-bold
//                                                                 ${
//                                                                     booking.status === "Completed"
//                                                                         ? "bg-green-50 text-green-700"
//                                                                         : "bg-red-50 text-red-700"
//                                                                 }
//                                                             `}
//                                                         >
//                                                             ✓ {booking.status}
//                                                         </span>

//                                                     )}

//                                                 </td>

//                                             </tr>

//                                         );

//                                     })}

//                                 </tbody>

//                             </table>

//                         </div>

//                     )}

//                 </div>

//             </main>

//         </div>
//         {/* ==========================================
//     REJECTION MODAL
// ========================================== */}

// {rejectModal.open && (

//     <div className="
//         fixed
//         inset-0
//         z-50
//         flex
//         items-center
//         justify-center
//         bg-black/50
//         backdrop-blur-sm
//         px-4
//     ">

//         <div className="
//             bg-white
//             w-full
//             max-w-lg
//             rounded-2xl
//             shadow-2xl
//             overflow-hidden
//         ">

//             {/* HEADER */}

//             <div className="
//                 px-6
//                 py-5
//                 border-b
//                 border-slate-200
//                 flex
//                 items-center
//                 justify-between
//             ">

//                 <div>

//                     <h2 className="
//                         text-xl
//                         font-bold
//                         text-slate-900
//                     ">
//                         Reject Booking
//                     </h2>

//                     <p className="
//                         text-sm
//                         text-slate-500
//                         mt-1
//                     ">
//                         Booking #{rejectModal.bookingNumber}
//                     </p>

//                 </div>

//                 <button
//                     onClick={() => {
//                         setRejectModal({
//                             open: false,
//                             bookingId: null,
//                             bookingNumber: null
//                         });

//                         setRejectionReason("");
//                     }}
//                     className="
//                         w-9
//                         h-9
//                         rounded-lg
//                         hover:bg-slate-100
//                         text-slate-500
//                         text-xl
//                     "
//                 >
//                     ×
//                 </button>

//             </div>


//             {/* BODY */}

//             <div className="p-6">

//                 <label className="
//                     block
//                     text-sm
//                     font-semibold
//                     text-slate-700
//                     mb-2
//                 ">
//                     Reason for rejection
//                 </label>

//                 <textarea
//                     value={rejectionReason}
//                     onChange={(e) =>
//                         setRejectionReason(e.target.value)
//                     }
//                     rows={5}
//                     placeholder="Enter the reason for rejecting this booking..."
//                     className="
//                         w-full
//                         border
//                         border-slate-200
//                         rounded-xl
//                         px-4
//                         py-3
//                         text-sm
//                         resize-none
//                         outline-none
//                         focus:ring-2
//                         focus:ring-red-500/20
//                         focus:border-red-500
//                     "
//                 />

//                 <p className="
//                     text-xs
//                     text-slate-400
//                     mt-2
//                 ">
//                     This reason will be visible to the customer.
//                 </p>


//                 {/* QUICK REASONS */}

//                 <div className="mt-4">

//                     <p className="
//                         text-xs
//                         font-semibold
//                         text-slate-500
//                         mb-2
//                     ">
//                         Quick reasons
//                     </p>

//                     <div className="flex flex-wrap gap-2">

//                         {[
//                             "Technician unavailable",
//                             "Service not available in this area",
//                             "Requested time unavailable",
//                             "Duplicate booking",
//                             "Incorrect booking details"
//                         ].map((reason) => (

//                             <button
//                                 key={reason}
//                                 type="button"
//                                 onClick={() =>
//                                     setRejectionReason(reason)
//                                 }
//                                 className="
//                                     px-3
//                                     py-1.5
//                                     rounded-lg
//                                     bg-slate-100
//                                     hover:bg-slate-200
//                                     text-xs
//                                     text-slate-600
//                                     transition
//                                 "
//                             >
//                                 {reason}
//                             </button>

//                         ))}

//                     </div>

//                 </div>

//             </div>


//             {/* FOOTER */}

//             <div className="
//                 px-6
//                 py-4
//                 bg-slate-50
//                 border-t
//                 border-slate-200
//                 flex
//                 justify-end
//                 gap-3
//             ">

//                 <button
//                     onClick={() => {
//                         setRejectModal({
//                             open: false,
//                             bookingId: null,
//                             bookingNumber: null
//                         });

//                         setRejectionReason("");
//                     }}
//                     className="
//                         px-5
//                         py-2.5
//                         rounded-lg
//                         border
//                         border-slate-200
//                         bg-white
//                         text-slate-600
//                         text-sm
//                         font-semibold
//                         hover:bg-slate-100
//                     "
//                 >
//                     Cancel
//                 </button>

//                 <button
//                     onClick={rejectBooking}
//                     disabled={
//                         rejecting ||
//                         !rejectionReason.trim()
//                     }
//                     className="
//                         px-5
//                         py-2.5
//                         rounded-lg
//                         bg-red-600
//                         hover:bg-red-700
//                         disabled:bg-red-300
//                         text-white
//                         text-sm
//                         font-semibold
//                     "
//                 >
//                     {rejecting
//                         ? "Rejecting..."
//                         : "Confirm Rejection"
//                     }
//                 </button>

//             </div>

//         </div>

//     </div>

// )}

// {completeModal.open && (
//     <div className="
//         fixed
//         inset-0
//         z-50
//         flex
//         items-center
//         justify-center
//         bg-black/50
//         backdrop-blur-sm
//         px-4
//     ">

//         <div className="
//             bg-white
//             w-full
//             max-w-lg
//             rounded-2xl
//             shadow-2xl
//             overflow-hidden
//         ">

//             {/* HEADER */}

//             <div className="
//                 px-6
//                 py-5
//                 border-b
//                 border-slate-200
//                 flex
//                 items-center
//                 justify-between
//             ">

//                 <div>

//                     <h2 className="
//                         text-xl
//                         font-bold
//                         text-slate-900
//                     ">
//                         Complete Booking
//                     </h2>

//                     <p className="
//                         text-sm
//                         text-slate-500
//                         mt-1
//                     ">
//                         Booking #{completeModal.bookingNumber}
//                     </p>

//                 </div>

//                 <button
//                     onClick={() => {
//                         setCompleteModal({
//                             open: false,
//                             bookingId: null,
//                             bookingNumber: null
//                         });

//                         setCompletionComment("");
//                     }}
//                     className="
//                         w-9
//                         h-9
//                         rounded-lg
//                         hover:bg-slate-100
//                         text-slate-500
//                         text-xl
//                     "
//                 >
//                     ×
//                 </button>

//             </div>


//             {/* BODY */}

//             <div className="p-6">

//                 <div className="
//                     p-4
//                     rounded-xl
//                     bg-green-50
//                     border
//                     border-green-100
//                     mb-5
//                 ">

//                     <p className="
//                         text-sm
//                         font-semibold
//                         text-green-800
//                     ">
//                         Service completion note
//                     </p>

//                     <p className="
//                         text-xs
//                         text-green-700
//                         mt-1
//                     ">
//                         Add a brief comment about the completed service.
//                     </p>

//                 </div>


//                 <label className="
//                     block
//                     text-sm
//                     font-semibold
//                     text-slate-700
//                     mb-2
//                 ">
//                     Completion Comment
//                 </label>


//                 <textarea
//                     value={completionComment}
//                     onChange={(e) =>
//                         setCompletionComment(e.target.value)
//                     }
//                     rows={5}
//                     placeholder="Example: Electrical repair completed successfully. Faulty MCB was replaced and the system was tested."
//                     className="
//                         w-full
//                         border
//                         border-slate-200
//                         rounded-xl
//                         px-4
//                         py-3
//                         text-sm
//                         resize-none
//                         outline-none
//                         focus:ring-2
//                         focus:ring-green-500/20
//                         focus:border-green-500
//                     "
//                 />


//                 <p className="
//                     text-xs
//                     text-slate-400
//                     mt-2
//                 ">
//                     This comment will be saved with the booking.
//                 </p>


//                 {/* QUICK COMMENTS */}

//                 <div className="mt-4">

//                     <p className="
//                         text-xs
//                         font-semibold
//                         text-slate-500
//                         mb-2
//                     ">
//                         Quick comments
//                     </p>

//                     <div className="
//                         flex
//                         flex-wrap
//                         gap-2
//                     ">

//                         {[
//                             "Service completed successfully",
//                             "Issue resolved and tested",
//                             "Repair completed successfully",
//                             "Installation completed and tested",
//                             "Customer service completed"
//                         ].map((comment) => (

//                             <button
//                                 key={comment}
//                                 type="button"
//                                 onClick={() =>
//                                     setCompletionComment(comment)
//                                 }
//                                 className="
//                                     px-3
//                                     py-1.5
//                                     rounded-lg
//                                     bg-slate-100
//                                     hover:bg-slate-200
//                                     text-xs
//                                     text-slate-600
//                                     transition
//                                 "
//                             >
//                                 {comment}
//                             </button>

//                         ))}

//                     </div>

//                 </div>

//             </div>


//             {/* FOOTER */}

//             <div className="
//                 px-6
//                 py-4
//                 bg-slate-50
//                 border-t
//                 border-slate-200
//                 flex
//                 justify-end
//                 gap-3
//             ">

//                 <button
//                     onClick={() => {

//                         setCompleteModal({
//                             open: false,
//                             bookingId: null,
//                             bookingNumber: null
//                         });

//                         setCompletionComment("");

//                     }}
//                     className="
//                         px-5
//                         py-2.5
//                         rounded-lg
//                         border
//                         border-slate-200
//                         bg-white
//                         text-slate-600
//                         text-sm
//                         font-semibold
//                         hover:bg-slate-100
//                     "
//                 >
//                     Cancel
//                 </button>


//                 <button
//                     onClick={completeBooking}
//                     disabled={
//                         completing ||
//                         !completionComment.trim()
//                     }
//                     className="
//                         px-5
//                         py-2.5
//                         rounded-lg
//                         bg-green-600
//                         hover:bg-green-700
//                         disabled:bg-green-300
//                         text-white
//                         text-sm
//                         font-semibold
//                     "
//                 >
//                     {completing
//                         ? "Completing..."
//                         : "Confirm Completion"
//                     }
//                 </button>

//             </div>

//         </div>

//     </div>
// )}

//     </AdminLayout>
// );

// }

// export default Admin;




import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../layouts/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";

const API = import.meta.env.VITE_API_URL;

function Admin() {
    const [bookings, setBookings] = useState([]);
    const [technicians, setTechnicians] = useState([]);

    const [selectedTechnician, setSelectedTechnician] = useState({});
    const [visitDate, setVisitDate] = useState({});
    const [visitTime, setVisitTime] = useState({});

    const [loading, setLoading] = useState(true);
    const [assigning, setAssigning] = useState({});

    const [rejectModal, setRejectModal] = useState({
        open: false,
        bookingId: null,
        bookingNumber: null,
    });

    const [rejectionReason, setRejectionReason] = useState("");
    const [rejecting, setRejecting] = useState(false);

    const [completeModal, setCompleteModal] = useState({
        open: false,
        bookingId: null,
        bookingNumber: null,
    });

    const [completionComment, setCompletionComment] = useState("");
    const [completing, setCompleting] = useState(false);

    // ==========================================
    // FETCH BOOKINGS
    // ==========================================

    const fetchBookings = async () => {
        try {
            setLoading(true);

            const response = await axios.get(
                `${API}/api/all-bookings`
            );

            setBookings(response.data);
        } catch (error) {
            console.error(
                "Fetch Bookings Error:",
                error
            );
        } finally {
            setLoading(false);
        }
    };

    // ==========================================
    // FETCH TECHNICIANS
    // ==========================================

    const fetchTechnicians = async () => {
        try {
            const response = await axios.get(
                `${API}/api/admin/technicians`
            );

            setTechnicians(response.data);
        } catch (error) {
            console.error(
                "Fetch Technicians Error:",
                error
            );
        }
    };

    // ==========================================
    // LOAD DATA
    // ==========================================

    useEffect(() => {
        fetchBookings();
        fetchTechnicians();
    }, []);

    // ==========================================
    // SELECT TECHNICIAN
    // ==========================================

    const assignTechnician = (
        mongoBookingId,
        technicianId
    ) => {
        setSelectedTechnician((prev) => ({
            ...prev,
            [mongoBookingId]: technicianId,
        }));
    };

    // ==========================================
    // SELECT DATE
    // ==========================================

    const changeVisitDate = (
        mongoBookingId,
        value
    ) => {
        setVisitDate((prev) => ({
            ...prev,
            [mongoBookingId]: value,
        }));
    };

    // ==========================================
    // SELECT TIME
    // ==========================================

    const changeVisitTime = (
        mongoBookingId,
        value
    ) => {
        setVisitTime((prev) => ({
            ...prev,
            [mongoBookingId]: value,
        }));
    };

    // ==========================================
    // UPDATE STATUS
    // ==========================================

    const updateStatus = async (
        mongoBookingId,
        status
    ) => {
        try {
            await axios.put(
                `${API}/api/update-status/${mongoBookingId}`,
                {
                    status,
                }
            );

            await fetchBookings();
        } catch (error) {
            console.error(
                "Update Status Error:",
                error
            );
        }
    };

    // ==========================================
    // SCHEDULE VISIT / ASSIGN TECHNICIAN
    // ==========================================

    const scheduleVisit = async (
        bookingNumber,
        mongoBookingId
    ) => {
        const technicianId =
            selectedTechnician[mongoBookingId];

        const date =
            visitDate[mongoBookingId];

        const time =
            visitTime[mongoBookingId];

        if (!technicianId) {
            alert("Please select technician");
            return;
        }

        if (!date) {
            alert("Please select visit date");
            return;
        }

        if (!time) {
            alert("Please select visit time");
            return;
        }

        try {
            setAssigning((prev) => ({
                ...prev,
                [mongoBookingId]: true,
            }));

            await axios.put(
                `${API}/api/admin/assign-technician/${bookingNumber}`,
                {
                    technician_id: technicianId,
                    visit_date: date,
                    visit_time: time,
                }
            );

            alert("Visit Scheduled Successfully");

            await fetchBookings();
        } catch (error) {
            console.error(
                "Assignment Error:",
                error
            );

            alert(
                error.response?.data?.message ||
                    "Assignment Failed"
            );
        } finally {
            setAssigning((prev) => ({
                ...prev,
                [mongoBookingId]: false,
            }));
        }
    };

    // ==========================================
    // REJECT BOOKING
    // ==========================================

    const rejectBooking = async () => {
        if (!rejectionReason.trim()) {
            alert("Please enter a rejection reason");
            return;
        }

        try {
            setRejecting(true);

            await axios.put(
                `${API}/api/update-status/${rejectModal.bookingId}`,
                {
                    status: "Rejected",
                    rejection_reason:
                        rejectionReason.trim(),
                }
            );

            setRejectModal({
                open: false,
                bookingId: null,
                bookingNumber: null,
            });

            setRejectionReason("");

            await fetchBookings();
        } catch (error) {
            console.error(
                "Reject Booking Error:",
                error
            );

            alert(
                error.response?.data?.message ||
                    "Failed to reject booking"
            );
        } finally {
            setRejecting(false);
        }
    };

    // ==========================================
    // COMPLETE BOOKING
    // ==========================================

    const completeBooking = async () => {
        if (!completionComment.trim()) {
            alert("Please enter a completion comment");
            return;
        }

        try {
            setCompleting(true);

            await axios.put(
                `${API}/api/update-status/${completeModal.bookingId}`,
                {
                    status: "Completed",
                    completion_comment:
                        completionComment.trim(),
                }
            );

            setCompleteModal({
                open: false,
                bookingId: null,
                bookingNumber: null,
            });

            setCompletionComment("");

            await fetchBookings();
        } catch (error) {
            console.error(
                "Complete Booking Error:",
                error
            );

            alert(
                error.response?.data?.message ||
                    "Failed to complete booking"
            );
        } finally {
            setCompleting(false);
        }
    };

    // ==========================================
    // OPEN REJECT MODAL
    // ==========================================

    const openRejectModal = (
        bookingId,
        bookingNumber
    ) => {
        setRejectModal({
            open: true,
            bookingId,
            bookingNumber,
        });

        setRejectionReason("");
    };

    // ==========================================
    // CLOSE REJECT MODAL
    // ==========================================

    const closeRejectModal = () => {
        setRejectModal({
            open: false,
            bookingId: null,
            bookingNumber: null,
        });

        setRejectionReason("");
    };

    // ==========================================
    // OPEN COMPLETE MODAL
    // ==========================================

    const openCompleteModal = (
        bookingId,
        bookingNumber
    ) => {
        setCompleteModal({
            open: true,
            bookingId,
            bookingNumber,
        });

        setCompletionComment("");
    };

    // ==========================================
    // CLOSE COMPLETE MODAL
    // ==========================================

    const closeCompleteModal = () => {
        setCompleteModal({
            open: false,
            bookingId: null,
            bookingNumber: null,
        });

        setCompletionComment("");
    };

    // ==========================================
    // STATUS BADGE
    // ==========================================

    const getStatusClasses = (status) => {
        if (status === "Pending") {
            return "bg-yellow-50 text-yellow-700 border-yellow-100";
        }

        if (status === "Accepted") {
            return "bg-blue-50 text-blue-700 border-blue-100";
        }

        if (status === "Completed") {
            return "bg-green-50 text-green-700 border-green-100";
        }

        return "bg-red-50 text-red-700 border-red-100";
    };

    const getStatusDot = (status) => {
        if (status === "Pending") {
            return "bg-yellow-500";
        }

        if (status === "Accepted") {
            return "bg-blue-500";
        }

        if (status === "Completed") {
            return "bg-green-500";
        }

        return "bg-red-500";
    };

    // ==========================================
    // FORMAT DATE
    // ==========================================

    const formatDate = (date) => {
        if (!date) return "-";

        return new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }
        );
    };

    // ==========================================
    // FORMAT TIME
    // ==========================================

    const formatTime = (date) => {
        if (!date) return "";

        return new Date(date).toLocaleTimeString(
            "en-IN",
            {
                hour: "2-digit",
                minute: "2-digit",
            }
        );
    };

    // ==========================================
    // TECHNICIAN FORM
    // ==========================================

    const TechnicianAssignment = ({
        booking,
        mobile = false,
    }) => {
        const mongoBookingId = booking._id;

        const isAssigning =
            assigning[mongoBookingId];

        if (booking.status !== "Pending") {
            return (
                <div
                    className={
                        mobile
                            ? "mt-2"
                            : ""
                    }
                >
                    <p className="text-sm font-semibold text-slate-800">
                        {booking.technician_name ||
                            "Not Assigned"}
                    </p>

                    {booking.technician_phone && (
                        <p className="text-xs text-slate-500 mt-1">
                            {booking.technician_phone}
                        </p>
                    )}

                    {booking.visit_date && (
                        <p className="text-xs text-slate-400 mt-1">
                            Visit:{" "}
                            {formatDate(
                                booking.visit_date
                            )}
                            {booking.visit_time
                                ? ` • ${booking.visit_time}`
                                : ""}
                        </p>
                    )}
                </div>
            );
        }

        return (
            <div
                className={
                    mobile
                        ? "space-y-3"
                        : "space-y-2 w-[210px]"
                }
            >
                <select
                    value={
                        selectedTechnician[
                            mongoBookingId
                        ] || ""
                    }
                    onChange={(e) =>
                        assignTechnician(
                            mongoBookingId,
                            e.target.value
                        )
                    }
                    className="
                        w-full
                        border border-slate-200
                        rounded-xl
                        px-3 py-2.5
                        text-sm
                        outline-none
                        bg-white
                        text-slate-700
                        focus:ring-2
                        focus:ring-blue-500/20
                        focus:border-blue-500
                    "
                >
                    <option value="">
                        Select technician
                    </option>

                    {technicians.map((tech) => (
                        <option
                            key={tech.id}
                            value={tech.id}
                        >
                            {tech.name}
                        </option>
                    ))}
                </select>

                <div className="grid grid-cols-2 gap-2">
                    <input
                        type="date"
                        value={
                            visitDate[
                                mongoBookingId
                            ] || ""
                        }
                        onChange={(e) =>
                            changeVisitDate(
                                mongoBookingId,
                                e.target.value
                            )
                        }
                        className="
                            w-full
                            min-w-0
                            border border-slate-200
                            rounded-xl
                            px-2.5 py-2.5
                            text-xs
                            text-slate-700
                            outline-none
                            focus:ring-2
                            focus:ring-blue-500/20
                            focus:border-blue-500
                        "
                    />

                    <input
                        type="time"
                        value={
                            visitTime[
                                mongoBookingId
                            ] || ""
                        }
                        onChange={(e) =>
                            changeVisitTime(
                                mongoBookingId,
                                e.target.value
                            )
                        }
                        className="
                            w-full
                            min-w-0
                            border border-slate-200
                            rounded-xl
                            px-2.5 py-2.5
                            text-xs
                            text-slate-700
                            outline-none
                            focus:ring-2
                            focus:ring-blue-500/20
                            focus:border-blue-500
                        "
                    />
                </div>

                {mobile && (
                    <button
                        disabled={isAssigning}
                        onClick={() =>
                            scheduleVisit(
                                booking.booking_id,
                                mongoBookingId
                            )
                        }
                        className="
                            w-full
                            bg-blue-700
                            hover:bg-blue-800
                            disabled:bg-blue-300
                            text-white
                            px-4 py-3
                            rounded-xl
                            text-sm
                            font-semibold
                            transition
                            active:scale-[0.98]
                        "
                    >
                        {isAssigning
                            ? "Assigning..."
                            : "Assign & Accept"}
                    </button>
                )}
            </div>
        );
    };

    // ==========================================
    // ACTION BUTTONS
    // ==========================================

    const BookingActions = ({
        booking,
        mobile = false,
    }) => {
        const mongoBookingId = booking._id;

        const isAssigning =
            assigning[mongoBookingId];

        if (booking.status === "Pending") {
            return (
                <div
                    className={
                        mobile
                            ? "grid grid-cols-2 gap-2 mt-4"
                            : "flex flex-col gap-2 w-[145px]"
                    }
                >
                    {!mobile && (
                        <button
                            disabled={isAssigning}
                            onClick={() =>
                                scheduleVisit(
                                    booking.booking_id,
                                    mongoBookingId
                                )
                            }
                            className="
                                w-full
                                bg-blue-700
                                hover:bg-blue-800
                                disabled:bg-blue-300
                                text-white
                                px-4 py-2.5
                                rounded-xl
                                text-sm
                                font-semibold
                                transition
                            "
                        >
                            {isAssigning
                                ? "Assigning..."
                                : "Assign & Accept"}
                        </button>
                    )}

                    <button
                        onClick={() =>
                            openRejectModal(
                                mongoBookingId,
                                booking.booking_id
                            )
                        }
                        className="
                            w-full
                            border border-red-200
                            text-red-600
                            hover:bg-red-50
                            px-4 py-2.5
                            rounded-xl
                            text-sm
                            font-semibold
                            transition
                        "
                    >
                        Reject
                    </button>
                </div>
            );
        }

        if (booking.status === "Accepted") {
            return (
                <button
                    onClick={() =>
                        openCompleteModal(
                            mongoBookingId,
                            booking.booking_id
                        )
                    }
                    className="
                        w-full
                        bg-green-600
                        hover:bg-green-700
                        text-white
                        px-4 py-2.5
                        rounded-xl
                        text-sm
                        font-semibold
                        transition
                    "
                >
                    Mark Completed
                </button>
            );
        }

        if (
            booking.status === "Completed" ||
            booking.status === "Rejected"
        ) {
            return (
                <span
                    className={`
                        inline-flex
                        items-center
                        justify-center
                        px-3 py-2
                        rounded-xl
                        text-xs
                        font-bold
                        border
                        ${getStatusClasses(
                            booking.status
                        )}
                    `}
                >
                    {booking.status ===
                    "Completed"
                        ? "✓ Completed"
                        : "✕ Rejected"}
                </span>
            );
        }

        return null;
    };

    // ==========================================
    // MOBILE BOOKING CARD
    // ==========================================

    const MobileBookingCard = ({
        booking,
    }) => {
        return (
            <div
                className="
                    bg-white
                    border border-slate-200
                    rounded-2xl
                    shadow-sm
                    overflow-hidden
                "
            >
                {/* CARD HEADER */}

                <div
                    className="
                        px-4 py-4
                        bg-slate-50
                        border-b border-slate-200
                    "
                >
                    <div className="flex items-start justify-between gap-3">
                        <div>
                            <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">
                                Booking
                            </p>

                            <p className="text-lg font-bold text-blue-900 mt-1">
                                #{booking.booking_id}
                            </p>
                        </div>

                        <span
                            className={`
                                inline-flex
                                items-center
                                gap-1.5
                                px-3 py-1.5
                                rounded-full
                                text-xs
                                font-bold
                                border
                                ${getStatusClasses(
                                    booking.status
                                )}
                            `}
                        >
                            <span
                                className={`
                                    w-1.5 h-1.5
                                    rounded-full
                                    ${getStatusDot(
                                        booking.status
                                    )}
                                `}
                            />

                            {booking.status}
                        </span>
                    </div>
                </div>

                {/* CUSTOMER */}

                <div className="p-4 space-y-4">
                    <div>
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5">
                            Customer
                        </p>

                        <p className="text-base font-bold text-slate-900">
                            {booking.full_name}
                        </p>

                        <a
                            href={`tel:${booking.phone}`}
                            className="inline-flex items-center text-sm text-blue-600 mt-1"
                        >
                            📞 {booking.phone}
                        </a>

                        {booking.address && (
                            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                                {booking.address}
                            </p>
                        )}
                    </div>

                    {/* SERVICE */}

                    <div
                        className="
                            flex
                            items-center
                            justify-between
                            gap-3
                            py-3
                            border-y
                            border-slate-100
                        "
                    >
                        <div>
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                                Service
                            </p>

                            <p className="text-sm font-semibold text-slate-800 mt-1">
                                {booking.service_type}
                            </p>
                        </div>

                        {booking.amount !==
                            undefined &&
                            booking.amount !== null && (
                                <div className="text-right">
                                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                                        Amount
                                    </p>

                                    <p className="text-sm font-bold text-slate-900 mt-1">
                                        ₹
                                        {Number(
                                            booking.amount
                                        ).toLocaleString(
                                            "en-IN"
                                        )}
                                    </p>
                                </div>
                            )}
                    </div>

                    {/* CREATED */}

                    <div>
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                            Created
                        </p>

                        <p className="text-sm font-medium text-slate-700 mt-1">
                            {formatDate(
                                booking.created_at
                            )}
                            {booking.created_at && (
                                <span className="text-slate-400 ml-2">
                                    {formatTime(
                                        booking.created_at
                                    )}
                                </span>
                            )}
                        </p>
                    </div>

                    {/* TECHNICIAN */}

                    <div>
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
                            Technician
                        </p>

                        <TechnicianAssignment
                            booking={booking}
                            mobile={true}
                        />
                    </div>

                    {/* ACTION */}

                    {booking.status !== "Pending" && (
                        <div className="pt-1">
                            <BookingActions
                                booking={booking}
                                mobile={true}
                            />
                        </div>
                    )}

                    {booking.status === "Pending" && (
                        <BookingActions
                            booking={booking}
                            mobile={true}
                        />
                    )}
                </div>
            </div>
        );
    };

    return (
        <AdminLayout>
            <div className="min-h-screen bg-slate-50 overflow-x-hidden">

                {/* ==========================================
                    PAGE HEADER
                ========================================== */}

                <header className="bg-white border-b border-slate-200">
                    <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                            <div className="min-w-0">
                                <div className="flex items-center gap-3">

                                    <div className="
                                        w-10 h-10
                                        sm:w-11 sm:h-11
                                        shrink-0
                                        rounded-xl
                                        bg-blue-900
                                        flex items-center justify-center
                                        shadow-sm
                                    ">
                                        <span className="text-white text-lg sm:text-xl">
                                            ⚙️
                                        </span>
                                    </div>

                                    <div className="min-w-0">
                                        <h1 className="
                                            text-xl
                                            sm:text-2xl
                                            lg:text-3xl
                                            font-bold
                                            text-slate-900
                                        ">
                                            Admin Dashboard
                                        </h1>

                                        <p className="
                                            text-xs
                                            sm:text-sm
                                            text-slate-500
                                            mt-1
                                        ">
                                            Manage bookings, technicians and service visits
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="self-start sm:self-auto">
                                <div className="
                                    inline-flex
                                    items-center
                                    gap-2
                                    px-3 sm:px-4
                                    py-2
                                    bg-green-50
                                    border border-green-200
                                    rounded-full
                                ">
                                    <span className="
                                        w-2 h-2
                                        sm:w-2.5 sm:h-2.5
                                        rounded-full
                                        bg-green-500
                                        animate-pulse
                                    " />

                                    <span className="
                                        text-xs
                                        sm:text-sm
                                        font-medium
                                        text-green-700
                                    ">
                                        System Online
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* ==========================================
                    MAIN
                ========================================== */}

                <main className="
                    w-full
                    max-w-[1800px]
                    mx-auto
                    px-3
                    sm:px-6
                    lg:px-8
                    py-4
                    sm:py-6
                    lg:py-8
                ">

                    {/* EXISTING DASHBOARD */}

                    <AdminDashboard
                        bookings={bookings}
                    />

                    {/* ==========================================
                        STATISTICS
                    ========================================== */}

                    <div className="
                        grid
                        grid-cols-2
                        lg:grid-cols-4
                        gap-3
                        sm:gap-4
                        lg:gap-6
                        mb-6
                        sm:mb-8
                    ">

                        {/* TOTAL */}

                        <div className="
                            bg-white
                            rounded-2xl
                            border border-slate-200
                            p-4
                            sm:p-5
                            lg:p-6
                            shadow-sm
                        ">
                            <div className="flex items-start justify-between gap-2">

                                <div>
                                    <p className="
                                        text-xs
                                        sm:text-sm
                                        font-medium
                                        text-slate-500
                                    ">
                                        Total
                                    </p>

                                    <p className="
                                        text-2xl
                                        sm:text-3xl
                                        font-bold
                                        text-slate-900
                                        mt-1 sm:mt-2
                                    ">
                                        {bookings.length}
                                    </p>
                                </div>

                                <div className="
                                    w-9 h-9
                                    sm:w-11 sm:h-11
                                    shrink-0
                                    rounded-xl
                                    bg-blue-50
                                    flex items-center justify-center
                                ">
                                    <span className="text-lg sm:text-xl">
                                        📋
                                    </span>
                                </div>
                            </div>

                            <p className="
                                hidden
                                sm:block
                                text-xs
                                text-slate-400
                                mt-4
                            ">
                                All service requests
                            </p>
                        </div>

                        {/* PENDING */}

                        <div className="
                            bg-white
                            rounded-2xl
                            border border-slate-200
                            p-4
                            sm:p-5
                            lg:p-6
                            shadow-sm
                        ">
                            <div className="flex items-start justify-between gap-2">

                                <div>
                                    <p className="
                                        text-xs
                                        sm:text-sm
                                        font-medium
                                        text-slate-500
                                    ">
                                        Pending
                                    </p>

                                    <p className="
                                        text-2xl
                                        sm:text-3xl
                                        font-bold
                                        text-yellow-500
                                        mt-1 sm:mt-2
                                    ">
                                        {
                                            bookings.filter(
                                                (booking) =>
                                                    booking.status ===
                                                    "Pending"
                                            ).length
                                        }
                                    </p>
                                </div>

                                <div className="
                                    w-9 h-9
                                    sm:w-11 sm:h-11
                                    shrink-0
                                    rounded-xl
                                    bg-yellow-50
                                    flex items-center justify-center
                                ">
                                    <span className="text-lg sm:text-xl">
                                        ⏳
                                    </span>
                                </div>
                            </div>

                            <p className="
                                hidden
                                sm:block
                                text-xs
                                text-slate-400
                                mt-4
                            ">
                                Awaiting assignment
                            </p>
                        </div>

                        {/* ACCEPTED */}

                        <div className="
                            bg-white
                            rounded-2xl
                            border border-slate-200
                            p-4
                            sm:p-5
                            lg:p-6
                            shadow-sm
                        ">
                            <div className="flex items-start justify-between gap-2">

                                <div>
                                    <p className="
                                        text-xs
                                        sm:text-sm
                                        font-medium
                                        text-slate-500
                                    ">
                                        Accepted
                                    </p>

                                    <p className="
                                        text-2xl
                                        sm:text-3xl
                                        font-bold
                                        text-blue-600
                                        mt-1 sm:mt-2
                                    ">
                                        {
                                            bookings.filter(
                                                (booking) =>
                                                    booking.status ===
                                                    "Accepted"
                                            ).length
                                        }
                                    </p>
                                </div>

                                <div className="
                                    w-9 h-9
                                    sm:w-11 sm:h-11
                                    shrink-0
                                    rounded-xl
                                    bg-blue-50
                                    flex items-center justify-center
                                ">
                                    <span className="text-lg sm:text-xl">
                                        🔧
                                    </span>
                                </div>
                            </div>

                            <p className="
                                hidden
                                sm:block
                                text-xs
                                text-slate-400
                                mt-4
                            ">
                                Technician assigned
                            </p>
                        </div>

                        {/* COMPLETED */}

                        <div className="
                            bg-white
                            rounded-2xl
                            border border-slate-200
                            p-4
                            sm:p-5
                            lg:p-6
                            shadow-sm
                        ">
                            <div className="flex items-start justify-between gap-2">

                                <div>
                                    <p className="
                                        text-xs
                                        sm:text-sm
                                        font-medium
                                        text-slate-500
                                    ">
                                        Completed
                                    </p>

                                    <p className="
                                        text-2xl
                                        sm:text-3xl
                                        font-bold
                                        text-green-600
                                        mt-1 sm:mt-2
                                    ">
                                        {
                                            bookings.filter(
                                                (booking) =>
                                                    booking.status ===
                                                    "Completed"
                                            ).length
                                        }
                                    </p>
                                </div>

                                <div className="
                                    w-9 h-9
                                    sm:w-11 sm:h-11
                                    shrink-0
                                    rounded-xl
                                    bg-green-50
                                    flex items-center justify-center
                                ">
                                    <span className="text-lg sm:text-xl">
                                        ✓
                                    </span>
                                </div>
                            </div>

                            <p className="
                                hidden
                                sm:block
                                text-xs
                                text-slate-400
                                mt-4
                            ">
                                Successfully completed
                            </p>
                        </div>
                    </div>

                    {/* ==========================================
                        BOOKINGS SECTION
                    ========================================== */}

                    <section className="
                        bg-white
                        rounded-2xl
                        border border-slate-200
                        shadow-sm
                        overflow-hidden
                    ">

                        {/* SECTION HEADER */}

                        <div className="
                            px-4
                            sm:px-6
                            py-4
                            sm:py-5
                            border-b border-slate-200
                        ">
                            <div className="
                                flex
                                flex-col
                                sm:flex-row
                                sm:items-center
                                sm:justify-between
                                gap-2
                            ">

                                <div>
                                    <h2 className="
                                        text-lg
                                        sm:text-xl
                                        font-bold
                                        text-slate-900
                                    ">
                                        Service Bookings
                                    </h2>

                                    <p className="
                                        text-xs
                                        sm:text-sm
                                        text-slate-500
                                        mt-1
                                    ">
                                        Review and manage customer service requests
                                    </p>
                                </div>

                                <div className="
                                    text-xs
                                    sm:text-sm
                                    text-slate-500
                                ">
                                    {bookings.length} booking
                                    {bookings.length !== 1
                                        ? "s"
                                        : ""}
                                </div>
                            </div>
                        </div>

                        {/* ==========================================
                            LOADING
                        ========================================== */}

                        {loading ? (
                            <div className="
                                flex
                                flex-col
                                items-center
                                justify-center
                                py-20
                                px-4
                            ">
                                <div className="
                                    w-10 h-10
                                    border-4
                                    border-blue-100
                                    border-t-blue-700
                                    rounded-full
                                    animate-spin
                                " />

                                <p className="
                                    text-sm
                                    text-slate-500
                                    mt-4
                                ">
                                    Loading bookings...
                                </p>
                            </div>
                        ) : bookings.length === 0 ? (

                            /* ==========================================
                                EMPTY
                            ========================================== */

                            <div className="
                                text-center
                                py-16
                                sm:py-20
                                px-6
                            ">
                                <div className="
                                    w-16 h-16
                                    mx-auto
                                    rounded-2xl
                                    bg-slate-100
                                    flex items-center justify-center
                                    text-2xl
                                ">
                                    📋
                                </div>

                                <h3 className="
                                    text-lg
                                    font-semibold
                                    text-slate-900
                                    mt-5
                                ">
                                    No bookings yet
                                </h3>

                                <p className="
                                    text-sm
                                    text-slate-500
                                    mt-2
                                    max-w-sm
                                    mx-auto
                                ">
                                    New customer service requests will appear here.
                                </p>
                            </div>

                        ) : (

                            <>
                                {/* ==========================================
                                    MOBILE VIEW
                                ========================================== */}

                                <div className="
                                    block
                                    lg:hidden
                                    p-3
                                    sm:p-4
                                    space-y-3
                                    sm:space-y-4
                                    bg-slate-50/50
                                ">
                                    {bookings.map(
                                        (booking) => (
                                            <MobileBookingCard
                                                key={
                                                    booking._id
                                                }
                                                booking={
                                                    booking
                                                }
                                            />
                                        )
                                    )}
                                </div>

                                {/* ==========================================
                                    DESKTOP TABLE
                                ========================================== */}

                                <div className="
                                    hidden
                                    lg:block
                                    overflow-x-auto
                                ">
                                    <table className="
                                        w-full
                                        min-w-[1200px]
                                    ">
                                        <thead className="
                                            bg-slate-50
                                            border-b border-slate-200
                                        ">
                                            <tr>

                                                <th className="
                                                    px-5 py-4
                                                    text-left
                                                    text-xs
                                                    font-bold
                                                    uppercase
                                                    tracking-wider
                                                    text-slate-500
                                                ">
                                                    Booking
                                                </th>

                                                <th className="
                                                    px-5 py-4
                                                    text-left
                                                    text-xs
                                                    font-bold
                                                    uppercase
                                                    tracking-wider
                                                    text-slate-500
                                                ">
                                                    Customer
                                                </th>

                                                <th className="
                                                    px-5 py-4
                                                    text-left
                                                    text-xs
                                                    font-bold
                                                    uppercase
                                                    tracking-wider
                                                    text-slate-500
                                                ">
                                                    Service
                                                </th>

                                                <th className="
                                                    px-5 py-4
                                                    text-left
                                                    text-xs
                                                    font-bold
                                                    uppercase
                                                    tracking-wider
                                                    text-slate-500
                                                ">
                                                    Created
                                                </th>

                                                <th className="
                                                    px-5 py-4
                                                    text-left
                                                    text-xs
                                                    font-bold
                                                    uppercase
                                                    tracking-wider
                                                    text-slate-500
                                                ">
                                                    Status
                                                </th>

                                                <th className="
                                                    px-5 py-4
                                                    text-left
                                                    text-xs
                                                    font-bold
                                                    uppercase
                                                    tracking-wider
                                                    text-slate-500
                                                ">
                                                    Technician
                                                </th>

                                                <th className="
                                                    px-5 py-4
                                                    text-left
                                                    text-xs
                                                    font-bold
                                                    uppercase
                                                    tracking-wider
                                                    text-slate-500
                                                ">
                                                    Action
                                                </th>

                                            </tr>
                                        </thead>

                                        <tbody className="
                                            divide-y
                                            divide-slate-100
                                        ">
                                            {bookings.map(
                                                (booking) => (
                                                    <tr
                                                        key={
                                                            booking._id
                                                        }
                                                        className="
                                                            hover:bg-slate-50/70
                                                            transition
                                                        "
                                                    >

                                                        {/* BOOKING */}

                                                        <td className="px-5 py-5">
                                                            <div className="
                                                                font-bold
                                                                text-blue-900
                                                            ">
                                                                #
                                                                {
                                                                    booking.booking_id
                                                                }
                                                            </div>

                                                            <div className="
                                                                text-xs
                                                                text-slate-400
                                                                mt-1
                                                            ">
                                                                Service Request
                                                            </div>
                                                        </td>

                                                        {/* CUSTOMER */}

                                                        <td className="px-5 py-5">
                                                            <div className="
                                                                font-semibold
                                                                text-slate-900
                                                            ">
                                                                {
                                                                    booking.full_name
                                                                }
                                                            </div>

                                                            <div className="
                                                                text-sm
                                                                text-slate-500
                                                                mt-1
                                                            ">
                                                                {
                                                                    booking.phone
                                                                }
                                                            </div>

                                                            <div className="
                                                                text-xs
                                                                text-slate-400
                                                                mt-1
                                                                max-w-[220px]
                                                                truncate
                                                            ">
                                                                {
                                                                    booking.address
                                                                }
                                                            </div>
                                                        </td>

                                                        {/* SERVICE */}

                                                        <td className="px-5 py-5">
                                                            <div className="
                                                                inline-flex
                                                                items-center
                                                                px-3 py-1.5
                                                                rounded-lg
                                                                bg-blue-50
                                                                text-blue-700
                                                                text-sm
                                                                font-semibold
                                                            ">
                                                                {
                                                                    booking.service_type
                                                                }
                                                            </div>

                                                            {booking.amount !==
                                                                undefined &&
                                                                booking.amount !==
                                                                    null && (
                                                                    <div className="
                                                                        text-xs
                                                                        text-slate-500
                                                                        mt-2
                                                                    ">
                                                                        ₹
                                                                        {Number(
                                                                            booking.amount
                                                                        ).toLocaleString(
                                                                            "en-IN"
                                                                        )}
                                                                    </div>
                                                                )}
                                                        </td>

                                                        {/* CREATED */}

                                                        <td className="px-5 py-5">
                                                            <div className="
                                                                text-sm
                                                                font-medium
                                                                text-slate-700
                                                            ">
                                                                {formatDate(
                                                                    booking.created_at
                                                                )}
                                                            </div>

                                                            <div className="
                                                                text-xs
                                                                text-slate-400
                                                                mt-1
                                                            ">
                                                                {formatTime(
                                                                    booking.created_at
                                                                )}
                                                            </div>
                                                        </td>

                                                        {/* STATUS */}

                                                        <td className="px-5 py-5">
                                                            <span
                                                                className={`
                                                                    inline-flex
                                                                    items-center
                                                                    gap-2
                                                                    px-3 py-1.5
                                                                    rounded-full
                                                                    text-xs
                                                                    font-bold
                                                                    border
                                                                    ${getStatusClasses(
                                                                        booking.status
                                                                    )}
                                                                `}
                                                            >
                                                                <span
                                                                    className={`
                                                                        w-1.5
                                                                        h-1.5
                                                                        rounded-full
                                                                        ${getStatusDot(
                                                                            booking.status
                                                                        )}
                                                                    `}
                                                                />

                                                                {
                                                                    booking.status
                                                                }
                                                            </span>
                                                        </td>

                                                        {/* TECHNICIAN */}

                                                        <td className="px-5 py-5">
                                                            <TechnicianAssignment
                                                                booking={
                                                                    booking
                                                                }
                                                            />
                                                        </td>

                                                        {/* ACTION */}

                                                        <td className="px-5 py-5">
                                                            <BookingActions
                                                                booking={
                                                                    booking
                                                                }
                                                            />
                                                        </td>

                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        )}
                    </section>
                </main>

                {/* ==========================================
                    REJECTION MODAL
                ========================================== */}

                {rejectModal.open && (
                    <div className="
                        fixed
                        inset-0
                        z-50
                        flex
                        items-center
                        justify-center
                        bg-black/50
                        backdrop-blur-sm
                        p-3
                        sm:p-4
                    ">
                        <div className="
                            bg-white
                            w-full
                            max-w-lg
                            max-h-[90vh]
                            overflow-y-auto
                            rounded-2xl
                            shadow-2xl
                            overflow-hidden
                        ">

                            {/* HEADER */}

                            <div className="
                                px-4
                                sm:px-6
                                py-4
                                sm:py-5
                                border-b border-slate-200
                                flex
                                items-center
                                justify-between
                                gap-3
                            ">
                                <div className="min-w-0">
                                    <h2 className="
                                        text-lg
                                        sm:text-xl
                                        font-bold
                                        text-slate-900
                                    ">
                                        Reject Booking
                                    </h2>

                                    <p className="
                                        text-xs
                                        sm:text-sm
                                        text-slate-500
                                        mt-1
                                    ">
                                        Booking #
                                        {
                                            rejectModal.bookingNumber
                                        }
                                    </p>
                                </div>

                                <button
                                    onClick={
                                        closeRejectModal
                                    }
                                    className="
                                        shrink-0
                                        w-9 h-9
                                        rounded-lg
                                        hover:bg-slate-100
                                        text-slate-500
                                        text-xl
                                    "
                                >
                                    ×
                                </button>
                            </div>

                            {/* BODY */}

                            <div className="p-4 sm:p-6">

                                <label className="
                                    block
                                    text-sm
                                    font-semibold
                                    text-slate-700
                                    mb-2
                                ">
                                    Reason for rejection
                                </label>

                                <textarea
                                    value={
                                        rejectionReason
                                    }
                                    onChange={(e) =>
                                        setRejectionReason(
                                            e.target.value
                                        )
                                    }
                                    rows={5}
                                    placeholder="Enter the reason for rejecting this booking..."
                                    className="
                                        w-full
                                        border border-slate-200
                                        rounded-xl
                                        px-4 py-3
                                        text-sm
                                        resize-none
                                        outline-none
                                        focus:ring-2
                                        focus:ring-red-500/20
                                        focus:border-red-500
                                    "
                                />

                                <p className="
                                    text-xs
                                    text-slate-400
                                    mt-2
                                ">
                                    This reason will be visible to the customer.
                                </p>

                                {/* QUICK REASONS */}

                                <div className="mt-5">
                                    <p className="
                                        text-xs
                                        font-semibold
                                        text-slate-500
                                        mb-2
                                    ">
                                        Quick reasons
                                    </p>

                                    <div className="
                                        flex
                                        flex-wrap
                                        gap-2
                                    ">
                                        {[
                                            "Technician unavailable",
                                            "Service not available in this area",
                                            "Requested time unavailable",
                                            "Duplicate booking",
                                            "Incorrect booking details",
                                        ].map(
                                            (reason) => (
                                                <button
                                                    key={
                                                        reason
                                                    }
                                                    type="button"
                                                    onClick={() =>
                                                        setRejectionReason(
                                                            reason
                                                        )
                                                    }
                                                    className="
                                                        px-3 py-2
                                                        rounded-lg
                                                        bg-slate-100
                                                        hover:bg-slate-200
                                                        text-xs
                                                        text-slate-600
                                                        transition
                                                        text-left
                                                    "
                                                >
                                                    {reason}
                                                </button>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* FOOTER */}

                            <div className="
                                px-4
                                sm:px-6
                                py-4
                                bg-slate-50
                                border-t border-slate-200
                                flex
                                flex-col-reverse
                                sm:flex-row
                                sm:justify-end
                                gap-2
                            ">
                                <button
                                    onClick={
                                        closeRejectModal
                                    }
                                    className="
                                        w-full
                                        sm:w-auto
                                        px-5 py-2.5
                                        rounded-lg
                                        border border-slate-200
                                        bg-white
                                        text-slate-600
                                        text-sm
                                        font-semibold
                                        hover:bg-slate-100
                                    "
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={
                                        rejectBooking
                                    }
                                    disabled={
                                        rejecting ||
                                        !rejectionReason.trim()
                                    }
                                    className="
                                        w-full
                                        sm:w-auto
                                        px-5 py-2.5
                                        rounded-lg
                                        bg-red-600
                                        hover:bg-red-700
                                        disabled:bg-red-300
                                        text-white
                                        text-sm
                                        font-semibold
                                    "
                                >
                                    {rejecting
                                        ? "Rejecting..."
                                        : "Confirm Rejection"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* ==========================================
                    COMPLETE MODAL
                ========================================== */}

                {completeModal.open && (
                    <div className="
                        fixed
                        inset-0
                        z-50
                        flex
                        items-center
                        justify-center
                        bg-black/50
                        backdrop-blur-sm
                        p-3
                        sm:p-4
                    ">
                        <div className="
                            bg-white
                            w-full
                            max-w-lg
                            max-h-[90vh]
                            overflow-y-auto
                            rounded-2xl
                            shadow-2xl
                            overflow-hidden
                        ">

                            {/* HEADER */}

                            <div className="
                                px-4
                                sm:px-6
                                py-4
                                sm:py-5
                                border-b border-slate-200
                                flex
                                items-center
                                justify-between
                                gap-3
                            ">
                                <div className="min-w-0">
                                    <h2 className="
                                        text-lg
                                        sm:text-xl
                                        font-bold
                                        text-slate-900
                                    ">
                                        Complete Booking
                                    </h2>

                                    <p className="
                                        text-xs
                                        sm:text-sm
                                        text-slate-500
                                        mt-1
                                    ">
                                        Booking #
                                        {
                                            completeModal.bookingNumber
                                        }
                                    </p>
                                </div>

                                <button
                                    onClick={
                                        closeCompleteModal
                                    }
                                    className="
                                        shrink-0
                                        w-9 h-9
                                        rounded-lg
                                        hover:bg-slate-100
                                        text-slate-500
                                        text-xl
                                    "
                                >
                                    ×
                                </button>
                            </div>

                            {/* BODY */}

                            <div className="p-4 sm:p-6">

                                <div className="
                                    p-4
                                    rounded-xl
                                    bg-green-50
                                    border border-green-100
                                    mb-5
                                ">
                                    <p className="
                                        text-sm
                                        font-semibold
                                        text-green-800
                                    ">
                                        Service completion note
                                    </p>

                                    <p className="
                                        text-xs
                                        text-green-700
                                        mt-1
                                    ">
                                        Add a brief comment about the completed service.
                                    </p>
                                </div>

                                <label className="
                                    block
                                    text-sm
                                    font-semibold
                                    text-slate-700
                                    mb-2
                                ">
                                    Completion Comment
                                </label>

                                <textarea
                                    value={
                                        completionComment
                                    }
                                    onChange={(e) =>
                                        setCompletionComment(
                                            e.target.value
                                        )
                                    }
                                    rows={5}
                                    placeholder="Example: Electrical repair completed successfully. Faulty MCB was replaced and the system was tested."
                                    className="
                                        w-full
                                        border border-slate-200
                                        rounded-xl
                                        px-4 py-3
                                        text-sm
                                        resize-none
                                        outline-none
                                        focus:ring-2
                                        focus:ring-green-500/20
                                        focus:border-green-500
                                    "
                                />

                                <p className="
                                    text-xs
                                    text-slate-400
                                    mt-2
                                ">
                                    This comment will be saved with the booking.
                                </p>

                                {/* QUICK COMMENTS */}

                                <div className="mt-5">
                                    <p className="
                                        text-xs
                                        font-semibold
                                        text-slate-500
                                        mb-2
                                    ">
                                        Quick comments
                                    </p>

                                    <div className="
                                        flex
                                        flex-wrap
                                        gap-2
                                    ">
                                        {[
                                            "Service completed successfully",
                                            "Issue resolved and tested",
                                            "Repair completed successfully",
                                            "Installation completed and tested",
                                            "Customer service completed",
                                        ].map(
                                            (comment) => (
                                                <button
                                                    key={
                                                        comment
                                                    }
                                                    type="button"
                                                    onClick={() =>
                                                        setCompletionComment(
                                                            comment
                                                        )
                                                    }
                                                    className="
                                                        px-3 py-2
                                                        rounded-lg
                                                        bg-slate-100
                                                        hover:bg-slate-200
                                                        text-xs
                                                        text-slate-600
                                                        transition
                                                        text-left
                                                    "
                                                >
                                                    {comment}
                                                </button>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* FOOTER */}

                            <div className="
                                px-4
                                sm:px-6
                                py-4
                                bg-slate-50
                                border-t border-slate-200
                                flex
                                flex-col-reverse
                                sm:flex-row
                                sm:justify-end
                                gap-2
                            ">
                                <button
                                    onClick={
                                        closeCompleteModal
                                    }
                                    className="
                                        w-full
                                        sm:w-auto
                                        px-5 py-2.5
                                        rounded-lg
                                        border border-slate-200
                                        bg-white
                                        text-slate-600
                                        text-sm
                                        font-semibold
                                        hover:bg-slate-100
                                    "
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={
                                        completeBooking
                                    }
                                    disabled={
                                        completing ||
                                        !completionComment.trim()
                                    }
                                    className="
                                        w-full
                                        sm:w-auto
                                        px-5 py-2.5
                                        rounded-lg
                                        bg-green-600
                                        hover:bg-green-700
                                        disabled:bg-green-300
                                        text-white
                                        text-sm
                                        font-semibold
                                    "
                                >
                                    {completing
                                        ? "Completing..."
                                        : "Confirm Completion"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}

export default Admin;