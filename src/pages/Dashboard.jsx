import { useEffect, useState } from "react";
import axios from "axios";
import QRCode from "react-qr-code";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const [showQR, setShowQR] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState("");
  const [filter, setFilter] = useState("All");

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  // ==========================================
  // FETCH BOOKINGS
  // ==========================================

  const fetchBookings = async () => {
    if (!user?.id) return;

    try {
      const response = await axios.get(
        `${API}/api/my-bookings/${user.id}`
      );

      setBookings(response.data);
    } catch (error) {
      console.error("Fetch Bookings Error:", error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // ==========================================
  // PAYMENT
  // ==========================================

  const makePayment = async (bookingId, amount) => {
    try {
      const { data } = await axios.post(
        `${API}/api/create-payment`,
        {
          bookingId,
          amount,
        }
      );

      if (!data.success) {
        alert(data.message || "Payment failed");
        return;
      }

      const isMobile =
        /Android|iPhone|iPad|iPod/i.test(
          navigator.userAgent
        );

      if (isMobile) {
        window.location.href = data.paymentUrl;
      } else {
        setPaymentUrl(data.paymentUrl);
        setShowQR(true);
      }
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Unable to start payment");
    }
  };

  // ==========================================
  // STATS
  // ==========================================

  const totalBookings = bookings.length;

  const pendingBookings = bookings.filter(
    (booking) => booking.status === "Pending"
  ).length;

  const activeBookings = bookings.filter(
    (booking) => booking.status === "Accepted"
  ).length;

  const completedBookings = bookings.filter(
    (booking) => booking.status === "Completed"
  ).length;

  // ==========================================
  // FILTER
  // ==========================================

  const filteredBookings =
    filter === "All"
      ? bookings
      : bookings.filter(
          (booking) => booking.status === filter
        );

  // ==========================================
  // STATUS STYLE
  // ==========================================

  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return "bg-amber-50 text-amber-700 border border-amber-200";

      case "Accepted":
        return "bg-blue-50 text-blue-700 border border-blue-200";

      case "Completed":
        return "bg-emerald-50 text-emerald-700 border border-emerald-200";

      case "Rejected":
        return "bg-red-50 text-red-700 border border-red-200";

      default:
        return "bg-gray-50 text-gray-600 border border-gray-200";
    }
  };

  // ==========================================
  // SERVICE ICON
  // ==========================================

  const getServiceIcon = (service) => {
    const value = service?.toLowerCase() || "";

    if (value.includes("electric")) return "⚡";
    if (value.includes("plumb")) return "🔧";
    if (value.includes("ac")) return "❄️";
    if (value.includes("cctv")) return "📹";
    if (value.includes("paint")) return "🎨";
    if (value.includes("clean")) return "🧹";
    if (value.includes("appliance")) return "🔌";

    return "🛠️";
  };

  return (
    <>
      <Helmet>
        <title>
          Customer Dashboard | ServoraCare
        </title>

        <meta
          name="robots"
          content="noindex,nofollow"
        />

        <meta
          name="description"
          content="Manage your ServoraCare bookings, track service status, assigned technicians and make secure payments."
        />
      </Helmet>

      <div className="min-h-screen bg-slate-50">
        {/* =====================================================
            MAIN
        ===================================================== */}

        <main className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-8">

          {/* =================================================
              WELCOME SECTION
          ================================================= */}

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">

            <div>

              <p className="text-sm font-semibold text-blue-700 mb-1">
                CUSTOMER PORTAL
              </p>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                Welcome back, {user?.name || "Customer"} 👋
              </h1>

              <p className="text-slate-500 mt-2">
                Manage your home services and track your bookings.
              </p>

            </div>

            <Link
              to="/services"
              className="inline-flex items-center justify-center gap-2 bg-blue-900 hover:bg-blue-800 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-blue-900/10 transition"
            >
              <span className="text-lg">+</span>
              Book New Service
            </Link>

          </div>


          {/* =================================================
              STAT CARDS
          ================================================= */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

            {/* TOTAL */}

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Total Bookings
                  </p>

                  <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
                    {totalBookings}
                  </h2>

                  <p className="text-xs text-slate-400 mt-2">
                    All your service requests
                  </p>
                </div>

                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center text-xl">
                  📋
                </div>

              </div>

            </div>


            {/* PENDING */}

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Pending
                  </p>

                  <h2 className="text-3xl font-extrabold text-amber-600 mt-2">
                    {pendingBookings}
                  </h2>

                  <p className="text-xs text-slate-400 mt-2">
                    Awaiting confirmation
                  </p>
                </div>

                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl">
                  ⏳
                </div>

              </div>

            </div>


            {/* ACTIVE */}

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Active
                  </p>

                  <h2 className="text-3xl font-extrabold text-blue-600 mt-2">
                    {activeBookings}
                  </h2>

                  <p className="text-xs text-slate-400 mt-2">
                    Technician assigned
                  </p>
                </div>

                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl">
                  👨‍🔧
                </div>

              </div>

            </div>


            {/* COMPLETED */}

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Completed
                  </p>

                  <h2 className="text-3xl font-extrabold text-emerald-600 mt-2">
                    {completedBookings}
                  </h2>

                  <p className="text-xs text-slate-400 mt-2">
                    Successfully completed
                  </p>
                </div>

                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl">
                  ✓
                </div>

              </div>

            </div>

          </div>


          {/* =================================================
              BOOKINGS CARD
          ================================================= */}

          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

            {/* HEADER */}

            <div className="px-6 py-5 border-b border-slate-200">

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    My Bookings
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Track all your ServoraCare service requests.
                  </p>
                </div>


                {/* FILTER */}

                <div className="flex items-center gap-2 flex-wrap">

                  {[
                    "All",
                    "Pending",
                    "Accepted",
                    "Completed",
                    "Rejected",
                  ].map((status) => (

                    <button
                      key={status}
                      onClick={() => setFilter(status)}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                        filter === status
                          ? "bg-blue-900 text-white"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {status}
                    </button>

                  ))}

                </div>

              </div>

            </div>


            {/* =================================================
                DESKTOP TABLE
            ================================================= */}

            <div className="hidden lg:block overflow-x-auto">

              <table className="w-full">

                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">

                    <th className="text-left px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                      Booking
                    </th>

                    <th className="text-left px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                      Service
                    </th>

                    <th className="text-left px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                      Status
                    </th>

                    <th className="text-left px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                      Technician
                    </th>

                    <th className="text-left px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                      Visit
                    </th>

                    <th className="text-left px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                      Payment
                    </th>

                    <th className="text-left px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                      Report
                    </th>

                  </tr>
                </thead>


                <tbody>

                  {filteredBookings.length === 0 ? (

                    <tr>

                      <td
                        colSpan="7"
                        className="py-16 text-center"
                      >

                        <div className="text-4xl mb-3">
                          📋
                        </div>

                        <p className="font-semibold text-slate-700">
                          No bookings found
                        </p>

                        <p className="text-sm text-slate-500 mt-1">
                          Your service bookings will appear here.
                        </p>

                      </td>

                    </tr>

                  ) : (

                    filteredBookings.map((booking) => (

                      <tr
                        key={booking._id}
                        className="border-b border-slate-100 hover:bg-slate-50/70 transition"
                      >

                        {/* BOOKING */}

                        <td className="px-5 py-5">

                          <p className="font-bold text-blue-900">
                            #{booking.booking_id || "-"}
                          </p>

                          <p className="text-xs text-slate-400 mt-1">
                            Booking ID
                          </p>

                        </td>


                        {/* SERVICE */}

                        <td className="px-5 py-5">

                          <div className="flex items-center gap-3">

                            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                              {getServiceIcon(
                                booking.service_type
                              )}
                            </div>

                            <div>

                              <p className="font-semibold text-slate-800">
                                {booking.service_type || "-"}
                              </p>

                              <p className="text-xs text-slate-500 max-w-[180px] truncate">
                                {booking.address || "-"}
                              </p>

                            </div>

                          </div>

                        </td>


                        {/* STATUS */}

                        <td className="px-5 py-5">

                          <span
                            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold ${getStatusStyle(
                              booking.status
                            )}`}
                          >

                            <span className="w-1.5 h-1.5 rounded-full bg-current"></span>

                            {booking.status || "-"}
                          </span>

                        </td>


                        {/* TECHNICIAN */}

                        <td className="px-5 py-5">

                          {booking.technician_name ? (

                            <div>

                              <p className="font-semibold text-slate-800">
                                {booking.technician_name}
                              </p>

                              {booking.technician_phone && (
                                <a
                                  href={`tel:${booking.technician_phone}`}
                                  className="text-xs text-blue-600 hover:underline"
                                >
                                  📞 {booking.technician_phone}
                                </a>
                              )}

                            </div>

                          ) : (

                            <span className="text-sm text-slate-400">
                              Not assigned
                            </span>

                          )}

                        </td>


                        {/* VISIT */}

                        <td className="px-5 py-5">

                          {booking.visit_date ? (

                            <div>

                              <p className="font-medium text-slate-700">
                                📅{" "}
                                {new Date(
                                  booking.visit_date
                                ).toLocaleDateString()}
                              </p>

                              <p className="text-xs text-slate-500 mt-1">
                                🕐 {booking.visit_time || "-"}
                              </p>

                            </div>

                          ) : (

                            <span className="text-sm text-slate-400">
                              Not scheduled
                            </span>

                          )}

                        </td>


                        {/* PAYMENT */}

                        <td className="px-5 py-5">

                          {booking.payment_status === "Paid" ? (

                            <span className="inline-flex items-center gap-1.5 text-emerald-600 font-bold text-sm">
                              ✓ Paid
                            </span>

                          ) : (

                            <button
                              onClick={() =>
                                makePayment(
                                  booking._id,
                                  booking.amount
                                )
                              }
                              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition shadow-sm"
                            >
                              Pay Now
                            </button>

                          )}

                        </td>


                        {/* REPORT */}

                        <td className="px-5 py-5">

                          {booking.technician_comment ? (

                            <div
                              title={
                                booking.technician_comment
                              }
                              className="max-w-[180px]"
                            >

                              <p className="text-sm text-slate-600 truncate">
                                {booking.technician_comment}
                              </p>

                              <button
                                onClick={() =>
                                  alert(
                                    booking.technician_comment
                                  )
                                }
                                className="text-xs text-blue-600 font-semibold mt-1 hover:underline"
                              >
                                View Report
                              </button>

                            </div>

                          ) : (

                            <span className="text-sm text-slate-400">
                              Not available
                            </span>

                          )}

                        </td>

                      </tr>

                    ))

                  )}

                </tbody>

              </table>

            </div>


            {/* =================================================
                MOBILE / TABLET CARDS
            ================================================= */}

            <div className="lg:hidden p-4 space-y-4">

              {filteredBookings.length === 0 ? (

                <div className="py-12 text-center">

                  <div className="text-4xl mb-3">
                    📋
                  </div>

                  <p className="font-semibold text-slate-700">
                    No bookings found
                  </p>

                </div>

              ) : (

                filteredBookings.map((booking) => (

                  <div
                    key={booking._id}
                    className="border border-slate-200 rounded-2xl p-5 hover:shadow-md transition"
                  >

                    {/* CARD HEADER */}

                    <div className="flex justify-between items-start gap-3 mb-5">

                      <div>

                        <p className="text-xs text-slate-400 uppercase font-bold">
                          Booking ID
                        </p>

                        <p className="font-extrabold text-blue-900 text-lg">
                          #{booking.booking_id || "-"}
                        </p>

                      </div>

                      <span
                        className={`px-3 py-1.5 rounded-full text-xs font-bold ${getStatusStyle(
                          booking.status
                        )}`}
                      >
                        {booking.status}
                      </span>

                    </div>


                    {/* SERVICE */}

                    <div className="flex items-center gap-3 mb-5">

                      <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-xl">
                        {getServiceIcon(
                          booking.service_type
                        )}
                      </div>

                      <div>

                        <p className="font-bold text-slate-800">
                          {booking.service_type}
                        </p>

                        <p className="text-sm text-slate-500">
                          {booking.address}
                        </p>

                      </div>

                    </div>


                    {/* INFO */}

                    <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-4">

                      <div>

                        <p className="text-xs text-slate-400 font-semibold">
                          TECHNICIAN
                        </p>

                        <p className="text-sm font-semibold text-slate-700 mt-1">
                          {booking.technician_name ||
                            "Not Assigned"}
                        </p>

                      </div>

                      <div>

                        <p className="text-xs text-slate-400 font-semibold">
                          VISIT
                        </p>

                        <p className="text-sm font-semibold text-slate-700 mt-1">
                          {booking.visit_date
                            ? new Date(
                                booking.visit_date
                              ).toLocaleDateString()
                            : "Not scheduled"}
                        </p>

                      </div>

                    </div>


                    {/* PAYMENT */}

                    <div className="border-t border-slate-100 mt-4 pt-4 flex items-center justify-between">

                      <div>

                        <p className="text-xs text-slate-400 font-semibold">
                          PAYMENT
                        </p>

                        {booking.payment_status === "Paid" ? (

                          <p className="text-sm font-bold text-emerald-600 mt-1">
                            ✓ Paid
                          </p>

                        ) : (

                          <p className="text-sm font-bold text-amber-600 mt-1">
                            Payment Pending
                          </p>

                        )}

                      </div>

                      {booking.payment_status !== "Paid" && (

                        <button
                          onClick={() =>
                            makePayment(
                              booking._id,
                              booking.amount
                            )
                          }
                          className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg text-sm font-bold"
                        >
                          Pay Now
                        </button>

                      )}

                    </div>


                    {/* REPORT */}

                    {booking.technician_comment && (

                      <div className="border-t border-slate-100 mt-4 pt-4">

                        <p className="text-xs text-slate-400 font-semibold">
                          TECHNICIAN REPORT
                        </p>

                        <p className="text-sm text-slate-600 mt-1">
                          {booking.technician_comment}
                        </p>

                      </div>

                    )}

                  </div>

                ))

              )}

            </div>

          </section>


          {/* =================================================
              HELP SECTION
          ================================================= */}

          <div className="grid md:grid-cols-2 gap-5 mt-6">

            <div className="bg-blue-900 rounded-2xl p-6 text-white">

              <div className="flex items-start gap-4">

                <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center text-xl">
                  💬
                </div>

                <div>

                  <h3 className="font-bold text-lg">
                    Need help with your booking?
                  </h3>

                  <p className="text-blue-100 text-sm mt-1">
                    Our support team is ready to help you.
                  </p>

                  <Link
                    to="/contact"
                    className="inline-block mt-4 bg-white text-blue-900 px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-50 transition"
                  >
                    Contact Support
                  </Link>

                </div>

              </div>

            </div>


            <div className="bg-white border border-slate-200 rounded-2xl p-6">

              <div className="flex items-start gap-4">

                <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center text-xl">
                  🛡️
                </div>

                <div>

                  <h3 className="font-bold text-slate-800">
                    Trusted Home Services
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    Track your service, technician and payment
                    information from one place.
                  </p>

                  <p className="text-xs text-slate-400 mt-3">
                    ServoraCare • Trusted Home Services
                  </p>

                </div>

              </div>

            </div>

          </div>

        </main>


        {/* =====================================================
            PAYMENT QR MODAL
        ===================================================== */}

        {showQR && (

          <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">

            <div className="bg-white rounded-3xl shadow-2xl p-7 sm:p-8 w-full max-w-md">

              {/* MODAL HEADER */}

              <div className="flex items-center justify-between">

                <div>

                  <h2 className="text-2xl font-extrabold text-slate-900">
                    Scan & Pay
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Pay securely using any UPI app
                  </p>

                </div>

                <button
                  onClick={() => setShowQR(false)}
                  className="w-9 h-9 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
                >
                  ✕
                </button>

              </div>


              {/* QR */}

              <div className="flex justify-center my-7">

                <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm">

                  <QRCode
                    value={paymentUrl}
                    size={220}
                  />

                </div>

              </div>


              {/* UPI */}

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">

                <p className="text-xs font-semibold text-slate-500 uppercase">
                  UPI ID
                </p>

                <div className="flex items-center justify-between gap-3 mt-2">

                  <span className="font-bold text-slate-800">
                    7828908522@axl
                  </span>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        "7828908522@axl"
                      );

                      alert("UPI ID Copied");
                    }}
                    className="text-blue-700 font-bold text-sm hover:underline"
                  >
                    Copy
                  </button>

                </div>

              </div>


              <button
                onClick={() => setShowQR(false)}
                className="mt-5 w-full bg-blue-900 hover:bg-blue-800 text-white py-3 rounded-xl font-bold transition"
              >
                Done
              </button>

            </div>

          </div>

        )}

      </div>
    </>
  );
}

export default Dashboard;