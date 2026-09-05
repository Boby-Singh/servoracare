import { useEffect, useState } from "react";
import axios from "axios";
import QRCode from "react-qr-code";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

const UPI_ID = "7828908522@axl";

function Dashboard() {
  const [bookings, setBookings] = useState([]);

  const [showQR, setShowQR] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState("");
  const [paymentBooking, setPaymentBooking] = useState(null);

  const [showUTR, setShowUTR] = useState(false);
  const [utr, setUtr] = useState("");

  const [filter, setFilter] = useState("All");
  const [selectedBooking, setSelectedBooking] = useState(null);

  const [loading, setLoading] = useState(false);
  const [submittingPayment, setSubmittingPayment] =
    useState(false);

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  // =====================================================
  // FETCH BOOKINGS
  // =====================================================

  const fetchBookings = async () => {
    if (!user?.id) return;

    try {
      setLoading(true);

      const response = await axios.get(
        `${API}/api/my-bookings/${user.id}`
      );

      setBookings(response.data || []);
    } catch (error) {
      alert("Unable to load your bookings.",error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // =====================================================
  // CREATE UPI PAYMENT
  // =====================================================

  const makePayment = async (booking) => {
    try {
      if (!booking?.booking_id) {
        alert("Invalid booking ID.");
        return;
      }

      if (booking.status !== "Accepted") {
        alert(
          "Payment is available only after your booking is accepted."
        );
        return;
      }

      if (booking.payment_status === "Paid") {
        alert("This booking has already been paid.");
        return;
      }

      setLoading(true);

      const { data } = await axios.post(
        `${API}/api/create-payment`,
        {
          bookingId: booking.booking_id,
          userId: user.id,
        }
      );

      if (!data.success) {
        alert(
          data.message ||
            "Unable to create payment."
        );
        return;
      }

      setPaymentBooking({
        ...booking,
        booking_id: data.bookingId,
        amount: data.amount,
        payment_reference:
          data.paymentReference,
      });

      setPaymentUrl(data.paymentUrl);

      const isMobile =
        /Android|iPhone|iPad|iPod/i.test(
          navigator.userAgent
        );

      // -------------------------------------------------
      // MOBILE
      // -------------------------------------------------

      if (isMobile) {
        window.location.href = data.paymentUrl;

        // NOTE:
        // UPI app opening DOES NOT mean payment is complete.
        // User must return and click "I Have Paid".
      } else {
        // -------------------------------------------------
        // DESKTOP
        // -------------------------------------------------

        setShowQR(true);
      }
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Unable to start payment."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // OPEN UTR FORM
  // =====================================================

  const openPaymentSubmittedForm = () => {
    if (!paymentBooking) {
      alert("Payment booking not found.");
      return;
    }

    setShowQR(false);

    setUtr("");

    setShowUTR(true);
  };

  // =====================================================
  // SUBMIT PAYMENT
  // =====================================================

  const submitPayment = async () => {
    if (!paymentBooking?.booking_id) {
      alert("Booking information is missing.");
      return;
    }

    try {
      setSubmittingPayment(true);

      const { data } = await axios.post(
        `${API}/api/submit-payment`,
        {
          bookingId:
            paymentBooking.booking_id,

          userId: user.id,

          utr: utr.trim() || null,
        }
      );

      if (!data.success) {
        alert(
          data.message ||
            "Unable to submit payment."
        );
        return;
      }

      alert(
        "Payment submitted successfully. ServoraCare will verify your payment."
      );

      setShowUTR(false);

      setShowQR(false);

      setPaymentUrl("");

      setPaymentBooking(null);

      setUtr("");

      setSelectedBooking(null);

      await fetchBookings();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Unable to submit payment."
      );
    } finally {
      setSubmittingPayment(false);
    }
  };

  // =====================================================
  // STATS
  // =====================================================

  const totalBookings = bookings.length;

  const pendingBookings = bookings.filter(
    (booking) =>
      booking.status === "Pending"
  ).length;

  const activeBookings = bookings.filter(
    (booking) =>
      booking.status === "Accepted"
  ).length;

  const completedBookings = bookings.filter(
    (booking) =>
      booking.status === "Completed"
  ).length;

  // =====================================================
  // FILTER
  // =====================================================

  const filteredBookings =
    filter === "All"
      ? bookings
      : bookings.filter(
          (booking) =>
            booking.status === filter
        );

  // =====================================================
  // STATUS STYLE
  // =====================================================

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

  // =====================================================
  // PAYMENT STYLE
  // =====================================================

  const getPaymentStyle = (status) => {
    switch (status) {
      case "Paid":
        return "text-emerald-600";

      case "Submitted":
        return "text-blue-600";

      case "Rejected":
        return "text-red-600";

      default:
        return "text-amber-600";
    }
  };

  // =====================================================
  // PAYMENT TEXT
  // =====================================================

  const getPaymentText = (status) => {
    switch (status) {
      case "Paid":
        return "✓ Paid";

      case "Submitted":
        return "Verification Pending";

      case "Rejected":
        return "Payment Rejected";

      default:
        return "Payment Unpaid";
    }
  };

  // =====================================================
  // SERVICE ICON
  // =====================================================

  const getServiceIcon = (service) => {
    const value =
      service?.toLowerCase() || "";

    if (value.includes("electric"))
      return "⚡";

    if (value.includes("plumb"))
      return "🔧";

    if (value.includes("ac"))
      return "❄️";

    if (value.includes("cctv"))
      return "📹";

    if (value.includes("paint"))
      return "🎨";

    if (value.includes("clean"))
      return "🧹";

    if (value.includes("appliance"))
      return "🔌";

    return "🛠️";
  };

  // =====================================================
  // PAYMENT BUTTON
  // =====================================================

  const PaymentButton = ({ booking }) => {
    if (booking.payment_status === "Paid") {
      return (
        <span className="inline-flex items-center gap-1.5 text-emerald-600 font-bold text-sm">
          ✓ Paid
        </span>
      );
    }

    if (
      booking.payment_status ===
      "Submitted"
    ) {
      return (
        <span className="inline-flex items-center gap-1.5 text-blue-600 font-bold text-sm">
          ⏳ Verification Pending
        </span>
      );
    }

    if (
      booking.payment_status ===
      "Rejected"
    ) {
      return (
        <div>
          <span className="block text-red-600 font-bold text-sm mb-2">
            ✕ Payment Rejected
          </span>

          {booking.status === "Accepted" && (
            <button
              onClick={() =>
                makePayment(booking)
              }
              disabled={loading}
              className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm font-bold transition"
            >
              Pay Again
            </button>
          )}
        </div>
      );
    }

    if (booking.status === "Accepted") {
      return (
        <button
          onClick={() =>
            makePayment(booking)
          }
          disabled={loading}
          className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm font-bold transition shadow-sm"
        >
          Pay Now
        </button>
      );
    }

    return (
      <span className="text-sm text-slate-400">
        Payment unavailable
      </span>
    );
  };

  // =====================================================
  // CLOSE DETAILS
  // =====================================================

  const closeBookingDetails = () => {
    setSelectedBooking(null);
  };

  // =====================================================
  // RETURN
  // =====================================================

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
        <main className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-8">

          {/* =====================================================
              WELCOME
          ===================================================== */}

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                Welcome back,{" "}
                {user?.name || "Customer"} 👋
              </h1>

              <p className="text-slate-500 mt-2">
                Manage your home services and
                track your bookings.
              </p>
            </div>

            <Link
              to="/services"
              className="inline-flex items-center justify-center gap-2 bg-blue-900 hover:bg-blue-800 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-blue-900/10 transition"
            >
              <span className="text-lg">
                +
              </span>

              Book New Service
            </Link>
          </div>

          {/* =====================================================
              STATS
          ===================================================== */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
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

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
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

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <p className="text-sm font-medium text-slate-500">
                Active
              </p>

              <h2 className="text-3xl font-extrabold text-blue-600 mt-2">
                {activeBookings}
              </h2>

              <p className="text-xs text-slate-400 mt-2">
                Accepted bookings
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
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

          </div>

          {/* =====================================================
              BOOKINGS
          ===================================================== */}

          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

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
                      onClick={() =>
                        setFilter(status)
                      }
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
                DESKTOP
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
                      Details
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
                    filteredBookings.map(
                      (booking) => (
                        <tr
                          key={booking._id}
                          className="border-b border-slate-100 hover:bg-slate-50/70 transition"
                        >

                          {/* BOOKING */}

                          <td className="px-5 py-5">
                            <p className="font-bold text-blue-900">
                              #
                              {booking.booking_id ||
                                "-"}
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
                                  {booking.service_type ||
                                    "-"}
                                </p>

                                <p className="text-xs text-slate-500 max-w-[180px] truncate">
                                  {booking.address ||
                                    "-"}
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
                              <span className="w-1.5 h-1.5 rounded-full bg-current" />

                              {booking.status ||
                                "-"}
                            </span>
                          </td>

                          {/* TECHNICIAN */}

                          <td className="px-5 py-5">

                            {booking.technician_name ? (
                              <div>

                                <p className="font-semibold text-slate-800">
                                  {
                                    booking.technician_name
                                  }
                                </p>

                                {booking.technician_phone && (
                                  <a
                                    href={`tel:${booking.technician_phone}`}
                                    className="text-xs text-blue-600 hover:underline"
                                  >
                                    📞{" "}
                                    {
                                      booking.technician_phone
                                    }
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
                                  🕐{" "}
                                  {booking.visit_time ||
                                    "-"}
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
                            <PaymentButton
                              booking={booking}
                            />
                          </td>

                          {/* DETAILS */}

                          <td className="px-5 py-5">
                            <button
                              onClick={() =>
                                setSelectedBooking(
                                  booking
                                )
                              }
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 text-sm font-bold transition"
                            >
                              View Details
                            </button>
                          </td>

                        </tr>
                      )
                    )
                  )}

                </tbody>

              </table>

            </div>

            {/* =================================================
                MOBILE
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
                filteredBookings.map(
                  (booking) => (
                    <div
                      key={booking._id}
                      className="border border-slate-200 rounded-2xl p-5 hover:shadow-md transition"
                    >

                      <div className="flex justify-between items-start gap-3 mb-5">

                        <div>
                          <p className="text-xs text-slate-400 uppercase font-bold">
                            Booking ID
                          </p>

                          <p className="font-extrabold text-blue-900 text-lg">
                            #
                            {booking.booking_id ||
                              "-"}
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
                            {
                              booking.service_type
                            }
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

                      <div className="border-t border-slate-100 mt-4 pt-4">

                        <div className="flex items-center justify-between gap-3">

                          <div>
                            <p className="text-xs text-slate-400 font-semibold">
                              PAYMENT
                            </p>

                            <p
                              className={`text-sm font-bold mt-1 ${getPaymentStyle(
                                booking.payment_status
                              )}`}
                            >
                              {getPaymentText(
                                booking.payment_status
                              )}
                            </p>
                          </div>

                          <PaymentButton
                            booking={booking}
                          />

                        </div>

                        {booking.payment_status ===
                          "Rejected" &&
                          booking.payment_rejection_reason && (
                            <p className="text-xs text-red-500 mt-3">
                              {
                                booking.payment_rejection_reason
                              }
                            </p>
                          )}

                      </div>

                      {/* REPORT */}

                      {booking.technician_comment && (
                        <div className="border-t border-slate-100 mt-4 pt-4">

                          <p className="text-xs text-slate-400 font-semibold">
                            TECHNICIAN REPORT
                          </p>

                          <p className="text-sm text-slate-600 mt-1">
                            {
                              booking.technician_comment
                            }
                          </p>

                        </div>
                      )}

                      {/* REJECTION */}

                      {booking.status ===
                        "Rejected" && (
                        <div className="border-t border-red-100 mt-4 pt-4">

                          <p className="text-xs text-red-500 font-bold">
                            REJECTION REASON
                          </p>

                          <p className="text-sm text-red-600 mt-1">
                            {booking.rejection_reason?.trim()
                              ? booking.rejection_reason
                              : "No rejection reason provided."}
                          </p>

                        </div>
                      )}

                      <button
                        onClick={() =>
                          setSelectedBooking(
                            booking
                          )
                        }
                        className="w-full mt-5 border border-blue-200 text-blue-700 hover:bg-blue-50 py-2.5 rounded-xl text-sm font-bold transition"
                      >
                        View Booking Details
                      </button>

                    </div>
                  )
                )
              )}

            </div>

          </section>

          {/* =====================================================
              HELP
          ===================================================== */}

          <div className="grid md:grid-cols-2 gap-5 mt-6">

            <div className="bg-blue-900 rounded-2xl p-6 text-white">

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

            <div className="bg-white border border-slate-200 rounded-2xl p-6">

              <h3 className="font-bold text-slate-800">
                Trusted Home Services
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                Track your service, technician
                and payment information from
                one place.
              </p>

              <p className="text-xs text-slate-400 mt-3">
                ServoraCare • Trusted Home Services
              </p>

            </div>

          </div>

        </main>

        {/* =====================================================
            BOOKING DETAILS MODAL
        ===================================================== */}

        {selectedBooking && (
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={closeBookingDetails}
          >

            <div
              className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) =>
                e.stopPropagation()
              }
            >

              {/* HEADER */}

              <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-5 flex items-center justify-between z-10">

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                    Booking Details
                  </p>

                  <h2 className="text-2xl font-extrabold text-slate-900 mt-1">
                    #
                    {selectedBooking.booking_id ||
                      "-"}
                  </h2>
                </div>

                <button
                  onClick={
                    closeBookingDetails
                  }
                  className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 text-lg transition"
                >
                  ✕
                </button>

              </div>

              <div className="p-6 space-y-6">

                {/* STATUS */}

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">

                  <div className="flex items-center justify-between gap-4">

                    <div>
                      <p className="text-xs font-bold uppercase text-slate-400">
                        Current Status
                      </p>

                      <p className="text-lg font-bold text-slate-800 mt-1">
                        {
                          selectedBooking.status
                        }
                      </p>
                    </div>

                    <span
                      className={`px-4 py-2 rounded-full text-sm font-bold ${getStatusStyle(
                        selectedBooking.status
                      )}`}
                    >
                      {
                        selectedBooking.status
                      }
                    </span>

                  </div>

                </div>

                {/* REJECTION */}

                {selectedBooking.status ===
                  "Rejected" && (
                  <div className="bg-red-50 border border-red-200 rounded-2xl p-5">

                    <p className="text-xs font-bold uppercase text-red-500">
                      Reason for Rejection
                    </p>

                    <p className="text-sm leading-6 text-red-700 mt-1">
                      {selectedBooking.rejection_reason?.trim()
                        ? selectedBooking.rejection_reason
                        : "No rejection reason was provided."}
                    </p>

                  </div>
                )}

                {/* SERVICE */}

                <div>

                  <h3 className="text-sm font-bold text-slate-900 mb-3">
                    Service Information
                  </h3>

                  <div className="grid sm:grid-cols-2 gap-4">

                    <div className="border border-slate-200 rounded-xl p-4">

                      <p className="text-xs font-semibold text-slate-400 uppercase">
                        Service
                      </p>

                      <p className="font-bold text-slate-800 mt-2">
                        {
                          selectedBooking.service_type ||
                          "-"
                        }
                      </p>

                    </div>

                    <div className="border border-slate-200 rounded-xl p-4">

                      <p className="text-xs font-semibold text-slate-400 uppercase">
                        Amount
                      </p>

                      <p className="text-xl font-extrabold text-slate-900 mt-2">
                        ₹
                        {selectedBooking.amount ||
                          "0"}
                      </p>

                    </div>

                  </div>

                </div>

                {/* CUSTOMER */}

                <div>

                  <h3 className="text-sm font-bold text-slate-900 mb-3">
                    Customer Information
                  </h3>

                  <div className="grid sm:grid-cols-2 gap-4">

                    <div className="bg-slate-50 rounded-xl p-4">

                      <p className="text-xs font-semibold text-slate-400 uppercase">
                        Name
                      </p>

                      <p className="font-semibold text-slate-800 mt-1">
                        {
                          selectedBooking.full_name ||
                          user?.name ||
                          "-"
                        }
                      </p>

                    </div>

                    <div className="bg-slate-50 rounded-xl p-4">

                      <p className="text-xs font-semibold text-slate-400 uppercase">
                        Phone
                      </p>

                      <p className="font-semibold text-slate-800 mt-1">
                        {
                          selectedBooking.phone ||
                          "-"
                        }
                      </p>

                    </div>

                  </div>

                  <div className="bg-slate-50 rounded-xl p-4 mt-4">

                    <p className="text-xs font-semibold text-slate-400 uppercase">
                      Service Address
                    </p>

                    <p className="font-semibold text-slate-800 mt-1">
                      {
                        selectedBooking.address ||
                        "-"
                      }
                    </p>

                  </div>

                </div>

                {/* TECHNICIAN */}

                <div>

                  <h3 className="text-sm font-bold text-slate-900 mb-3">
                    Technician
                  </h3>

                  <div className="border border-slate-200 rounded-2xl p-5">

                    {selectedBooking.technician_name ? (
                      <div className="flex items-center justify-between gap-4">

                        <div>

                          <p className="font-bold text-slate-800">
                            {
                              selectedBooking.technician_name
                            }
                          </p>

                          <p className="text-sm text-slate-500">
                            ServoraCare Technician
                          </p>

                        </div>

                        {selectedBooking.technician_phone && (
                          <a
                            href={`tel:${selectedBooking.technician_phone}`}
                            className="px-4 py-2 rounded-lg bg-blue-50 text-blue-700 font-bold text-sm"
                          >
                            📞 Call
                          </a>
                        )}

                      </div>
                    ) : (
                      <div className="text-center py-4">

                        <div className="text-3xl mb-2">
                          👨‍🔧
                        </div>

                        <p className="font-semibold text-slate-700">
                          Technician Not Assigned
                        </p>

                        <p className="text-sm text-slate-500 mt-1">
                          A technician will be assigned soon.
                        </p>

                      </div>
                    )}

                  </div>

                </div>

                {/* VISIT */}

                <div>

                  <h3 className="text-sm font-bold text-slate-900 mb-3">
                    Scheduled Visit
                  </h3>

                  <div className="grid sm:grid-cols-2 gap-4">

                    <div className="bg-slate-50 rounded-xl p-4">

                      <p className="text-xs font-semibold text-slate-400 uppercase">
                        Date
                      </p>

                      <p className="font-bold text-slate-800 mt-1">
                        {selectedBooking.visit_date
                          ? new Date(
                              selectedBooking.visit_date
                            ).toLocaleDateString()
                          : "Not scheduled"}
                      </p>

                    </div>

                    <div className="bg-slate-50 rounded-xl p-4">

                      <p className="text-xs font-semibold text-slate-400 uppercase">
                        Time
                      </p>

                      <p className="font-bold text-slate-800 mt-1">
                        {
                          selectedBooking.visit_time ||
                          "Not scheduled"
                        }
                      </p>

                    </div>

                  </div>

                </div>

                {/* PAYMENT */}

                <div>

                  <h3 className="text-sm font-bold text-slate-900 mb-3">
                    Payment
                  </h3>

                  <div className="bg-slate-50 rounded-xl p-5">

                    <div className="flex items-center justify-between gap-4">

                      <div>

                        <p className="text-xs font-semibold text-slate-400 uppercase">
                          Payment Status
                        </p>

                        <p
                          className={`font-bold mt-1 ${getPaymentStyle(
                            selectedBooking.payment_status
                          )}`}
                        >
                          {getPaymentText(
                            selectedBooking.payment_status
                          )}
                        </p>

                      </div>

                      {selectedBooking.payment_status !==
                        "Paid" &&
                        selectedBooking.payment_status !==
                          "Submitted" &&
                        selectedBooking.status ===
                          "Accepted" && (
                          <button
                            onClick={() => {
                              setSelectedBooking(
                                null
                              );

                              makePayment(
                                selectedBooking
                              );
                            }}
                            disabled={loading}
                            className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white px-5 py-2.5 rounded-lg font-bold text-sm"
                          >
                            Pay Now
                          </button>
                        )}

                    </div>

                    {selectedBooking.payment_status ===
                      "Rejected" &&
                      selectedBooking.payment_rejection_reason && (
                        <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-4">

                          <p className="text-xs font-bold text-red-500 uppercase">
                            Payment Rejection Reason
                          </p>

                          <p className="text-sm text-red-700 mt-1">
                            {
                              selectedBooking.payment_rejection_reason
                            }
                          </p>

                        </div>
                      )}

                  </div>

                </div>

                {/* TECHNICIAN REPORT */}

                {selectedBooking.technician_comment && (
                  <div>

                    <h3 className="text-sm font-bold text-slate-900 mb-3">
                      Technician Report
                    </h3>

                    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">

                      <p className="text-sm leading-6 text-slate-700">
                        {
                          selectedBooking.technician_comment
                        }
                      </p>

                    </div>

                  </div>
                )}

              </div>

              <div className="border-t border-slate-200 px-6 py-4">

                <button
                  onClick={
                    closeBookingDetails
                  }
                  className="w-full bg-blue-900 hover:bg-blue-800 text-white py-3 rounded-xl font-bold transition"
                >
                  Close
                </button>

              </div>

            </div>

          </div>
        )}

        {/* =====================================================
            QR PAYMENT MODAL
        ===================================================== */}

        {showQR && paymentBooking && (
          <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">

            <div className="bg-white rounded-3xl shadow-2xl p-7 sm:p-8 w-full max-w-md">

              <div className="flex items-center justify-between">

                <div>

                  <h2 className="text-2xl font-extrabold text-slate-900">
                    Scan & Pay
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Pay using any UPI app
                  </p>

                </div>

                <button
                  onClick={() =>
                    setShowQR(false)
                  }
                  className="w-9 h-9 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
                >
                  ✕
                </button>

              </div>

              {/* AMOUNT */}

              <div className="text-center mt-6">

                <p className="text-xs uppercase font-bold text-slate-400">
                  Amount
                </p>

                <p className="text-3xl font-extrabold text-slate-900 mt-1">
                  ₹
                  {paymentBooking.amount}
                </p>

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

              {/* REFERENCE */}

              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-4">

                <p className="text-xs font-bold text-blue-600 uppercase">
                  Payment Reference
                </p>

                <p className="font-bold text-blue-900 mt-1 break-all">
                  {
                    paymentBooking.payment_reference
                  }
                </p>

              </div>

              {/* UPI */}

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">

                <p className="text-xs font-semibold text-slate-500 uppercase">
                  UPI ID
                </p>

                <div className="flex items-center justify-between gap-3 mt-2">

                  <span className="font-bold text-slate-800">
                    {UPI_ID}
                  </span>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        UPI_ID
                      );

                      alert(
                        "UPI ID copied"
                      );
                    }}
                    className="text-blue-700 font-bold text-sm hover:underline"
                  >
                    Copy
                  </button>

                </div>

              </div>

              <div className="mt-5 space-y-3">

                <button
                  onClick={
                    openPaymentSubmittedForm
                  }
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold transition"
                >
                  ✓ I Have Paid
                </button>

                <button
                  onClick={() =>
                    setShowQR(false)
                  }
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-xl font-bold transition"
                >
                  Close
                </button>

              </div>

            </div>

          </div>
        )}

        {/* =====================================================
            PAYMENT SUBMISSION / UTR MODAL
        ===================================================== */}

        {showUTR && paymentBooking && (
          <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center z-[60] p-4">

            <div className="bg-white rounded-3xl shadow-2xl p-7 sm:p-8 w-full max-w-md">

              <div className="text-center">

                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-50 flex items-center justify-center text-2xl">
                  ✓
                </div>

                <h2 className="text-2xl font-extrabold text-slate-900 mt-4">
                  Payment Completed?
                </h2>

                <p className="text-sm text-slate-500 mt-2">
                  Confirm that you have completed
                  the UPI payment.
                </p>

              </div>

              {/* BOOKING */}

              <div className="bg-slate-50 rounded-xl p-4 mt-6">

                <div className="flex justify-between">

                  <span className="text-sm text-slate-500">
                    Booking
                  </span>

                  <span className="font-bold text-blue-900">
                    #
                    {
                      paymentBooking.booking_id
                    }
                  </span>

                </div>

                <div className="flex justify-between mt-2">

                  <span className="text-sm text-slate-500">
                    Amount
                  </span>

                  <span className="font-bold">
                    ₹
                    {paymentBooking.amount}
                  </span>

                </div>

              </div>

              {/* UTR */}

              <div className="mt-5">

                <label className="block text-sm font-bold text-slate-700 mb-2">
                  UTR / Transaction ID
                  <span className="font-normal text-slate-400">*</span>
                </label>

                <input
                  type="text"
                  value={utr}
                  onChange={(e) =>
                    setUtr(e.target.value)
                  }
                  placeholder="Enter UTR / Transaction ID"
                  required
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />

                <p className="text-xs text-slate-400 mt-2">
                  Enter the UTR / Transaction ID from your UPI payment history.
                </p>

              </div>

              {/* WARNING */}

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-5">

                <p className="text-sm text-amber-800">
                  ServoraCare will verify your payment
                  before marking this booking as Paid.
                </p>

              </div>

              {/* BUTTONS */}

              <div className="mt-6 space-y-3">

                <button
                  onClick={submitPayment}
                  disabled={
                    submittingPayment
                  }
                  className="w-full bg-blue-900 hover:bg-blue-800 disabled:opacity-50 text-white py-3 rounded-xl font-bold transition"
                >
                  {submittingPayment
                    ? "Submitting..."
                    : "Submit Payment"}
                </button>

                <button
                  onClick={() =>
                    setShowUTR(false)
                  }
                  disabled={
                    submittingPayment
                  }
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-xl font-bold"
                >
                  Cancel
                </button>

              </div>

            </div>

          </div>
        )}

      </div>
    </>
  );
}

export default Dashboard;