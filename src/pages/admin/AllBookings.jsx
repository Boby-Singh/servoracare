import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import AdminLayout from "../../layouts/AdminLayout";

const API = import.meta.env.VITE_API_URL;

function AllBookings() {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);

  // ==========================================
  // FETCH BOOKINGS
  // ==========================================

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(`${API}/api/all-bookings`);

      setBookings(
        Array.isArray(response.data) ? response.data : []
      );
    } catch (err) {
      console.error("Fetch Bookings Error:", err);

      setError("Unable to load bookings.");
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // FILTER BOOKINGS
  // ==========================================

  const filteredBookings = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    return bookings.filter((booking) => {
      const matchesSearch =
        !searchValue ||
        booking.full_name
          ?.toLowerCase()
          .includes(searchValue) ||
        booking.phone
          ?.toString()
          .includes(searchValue) ||
        booking.service_type
          ?.toLowerCase()
          .includes(searchValue) ||
        booking.address
          ?.toLowerCase()
          .includes(searchValue) ||
        booking.booking_id
          ?.toString()
          .includes(searchValue) ||
        booking._id
          ?.toString()
          .includes(searchValue);

      const bookingStatus = booking.status || "Pending";

      const matchesStatus =
        statusFilter === "All" ||
        bookingStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [bookings, search, statusFilter]);

  // ==========================================
  // STATISTICS
  // ==========================================

  const totalBookings = bookings.length;

  const pendingBookings = bookings.filter(
    (booking) =>
      (booking.status || "Pending") === "Pending"
  ).length;

  const acceptedBookings = bookings.filter(
    (booking) => booking.status === "Accepted"
  ).length;

  const completedBookings = bookings.filter(
    (booking) => booking.status === "Completed"
  ).length;

  const rejectedBookings = bookings.filter(
    (booking) => booking.status === "Rejected"
  ).length;

  const totalRevenue = bookings.reduce(
    (total, booking) =>
      total + Number(booking.amount || 0),
    0
  );

  // ==========================================
  // STATUS STYLE
  // ==========================================

  const getStatusStyle = (status) => {
    switch (status) {
      case "Accepted":
        return {
          wrapper:
            "bg-blue-50 text-blue-700 border-blue-200",
          dot: "bg-blue-500",
        };

      case "Completed":
        return {
          wrapper:
            "bg-green-50 text-green-700 border-green-200",
          dot: "bg-green-500",
        };

      case "Rejected":
        return {
          wrapper:
            "bg-red-50 text-red-700 border-red-200",
          dot: "bg-red-500",
        };

      default:
        return {
          wrapper:
            "bg-amber-50 text-amber-700 border-amber-200",
          dot: "bg-amber-500",
        };
    }
  };

  // ==========================================
  // CLEAR FILTERS
  // ==========================================

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("All");
  };

  // ==========================================
  // CLOSE MODAL WITH ESC
  // ==========================================

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setSelectedBooking(null);
      }
    };

    if (selectedBooking) {
      document.addEventListener(
        "keydown",
        handleEscape
      );
    }

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [selectedBooking]);

  return (
    <AdminLayout>
      <div className="min-h-screen bg-slate-50">

        {/* ==========================================
            HEADER
        ========================================== */}

        <div className="bg-white border-b border-slate-200">
          <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-6">

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

              {/* TITLE */}

              <div className="flex items-center gap-4">

                <div className="w-12 h-12 rounded-xl bg-blue-900 flex items-center justify-center shadow-sm">
                  <span className="text-white text-xl">
                    📋
                  </span>
                </div>

                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                    All Bookings
                  </h1>

                  <p className="text-sm text-slate-500 mt-1">
                    Manage and monitor all customer service bookings
                  </p>
                </div>

              </div>

              {/* REFRESH */}

              <button
                onClick={fetchBookings}
                disabled={loading}
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  px-4
                  py-2.5
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  text-sm
                  font-semibold
                  text-slate-700
                  hover:bg-slate-50
                  hover:border-slate-300
                  transition
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                "
              >
                <span
                  className={loading ? "animate-spin" : ""}
                >
                  ↻
                </span>

                Refresh
              </button>

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

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4 sm:gap-6 mb-8">

            {/* TOTAL */}

            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition">

              <div className="flex items-start justify-between">

                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Total Bookings
                  </p>

                  <p className="text-3xl font-bold text-slate-900 mt-2">
                    {totalBookings}
                  </p>
                </div>

                <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                  <span className="text-xl">
                    📋
                  </span>
                </div>

              </div>

              <p className="text-xs text-slate-400 mt-4">
                All service requests
              </p>

            </div>

            {/* PENDING */}

            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition">

              <div className="flex items-start justify-between">

                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Pending
                  </p>

                  <p className="text-3xl font-bold text-amber-600 mt-2">
                    {pendingBookings}
                  </p>
                </div>

                <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center">
                  <span className="text-xl">
                    ⏳
                  </span>
                </div>

              </div>

              <p className="text-xs text-slate-400 mt-4">
                Awaiting action
              </p>

            </div>

            {/* ACCEPTED */}

            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition">

              <div className="flex items-start justify-between">

                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Accepted
                  </p>

                  <p className="text-3xl font-bold text-blue-600 mt-2">
                    {acceptedBookings}
                  </p>
                </div>

                <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                  <span className="text-xl">
                    ✓
                  </span>
                </div>

              </div>

              <p className="text-xs text-slate-400 mt-4">
                Approved bookings
              </p>

            </div>

            {/* COMPLETED */}

            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition">

              <div className="flex items-start justify-between">

                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Completed
                  </p>

                  <p className="text-3xl font-bold text-green-600 mt-2">
                    {completedBookings}
                  </p>
                </div>

                <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center">
                  <span className="text-xl">
                    ✓
                  </span>
                </div>

              </div>

              <p className="text-xs text-slate-400 mt-4">
                Successfully completed
              </p>

            </div>

            {/* REVENUE */}

            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition">

              <div className="flex items-start justify-between">

                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Booking Value
                  </p>

                  <p className="text-2xl font-bold text-orange-600 mt-2">
                    ₹{totalRevenue.toLocaleString("en-IN")}
                  </p>
                </div>

                <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center">
                  <span className="text-xl">
                    ₹
                  </span>
                </div>

              </div>

              <p className="text-xs text-slate-400 mt-4">
                Total booking amount
              </p>

            </div>

          </div>

          {/* ==========================================
              BOOKING TABLE CARD
          ========================================== */}

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

            {/* TABLE HEADER */}

            <div className="px-5 sm:px-6 py-5 border-b border-slate-200">

              <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">

                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                    Booking Directory
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    View customer, service and booking details
                  </p>
                </div>

                {/* SEARCH + FILTER */}

                <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto">

                  {/* SEARCH */}

                  <div className="relative w-full sm:w-80">

                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                      🔎
                    </span>

                    <input
                      type="text"
                      value={search}
                      onChange={(e) =>
                        setSearch(e.target.value)
                      }
                      placeholder="Search bookings..."
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

                  {/* STATUS FILTER */}

                  <select
                    value={statusFilter}
                    onChange={(e) =>
                      setStatusFilter(e.target.value)
                    }
                    className="
                      border
                      border-slate-200
                      rounded-xl
                      px-4
                      py-2.5
                      text-sm
                      font-medium
                      text-slate-700
                      bg-slate-50
                      outline-none
                      focus:bg-white
                      focus:ring-2
                      focus:ring-blue-500/20
                      focus:border-blue-500
                    "
                  >
                    <option value="All">
                      All Status
                    </option>

                    <option value="Pending">
                      Pending
                    </option>

                    <option value="Accepted">
                      Accepted
                    </option>

                    <option value="Completed">
                      Completed
                    </option>

                    <option value="Rejected">
                      Rejected
                    </option>
                  </select>

                </div>

              </div>

            </div>

            {/* ERROR */}

            {error && !loading && (
              <div className="mx-5 sm:mx-6 mt-5 p-4 rounded-xl bg-red-50 border border-red-200">

                <div className="flex items-center justify-between gap-4">

                  <p className="text-sm font-medium text-red-700">
                    {error}
                  </p>

                  <button
                    onClick={fetchBookings}
                    className="text-sm font-semibold text-red-700 hover:text-red-900"
                  >
                    Retry
                  </button>

                </div>

              </div>
            )}

            {/* LOADING */}

            {loading ? (
              <div className="p-6">

                <div className="animate-pulse space-y-4">

                  <div className="h-12 bg-slate-100 rounded-xl" />
                  <div className="h-16 bg-slate-100 rounded-xl" />
                  <div className="h-16 bg-slate-100 rounded-xl" />
                  <div className="h-16 bg-slate-100 rounded-xl" />
                  <div className="h-16 bg-slate-100 rounded-xl" />

                </div>

              </div>
            ) : filteredBookings.length === 0 ? (

              /* EMPTY STATE */

              <div className="text-center py-20 px-6">

                <div
                  className="
                    w-16
                    h-16
                    mx-auto
                    rounded-2xl
                    bg-slate-100
                    flex
                    items-center
                    justify-center
                    text-2xl
                  "
                >
                  📋
                </div>

                <h3 className="text-lg font-semibold text-slate-900 mt-5">
                  No bookings found
                </h3>

                <p className="text-sm text-slate-500 mt-2">
                  {search || statusFilter !== "All"
                    ? "Try changing your search or filter."
                    : "No customer bookings are available yet."
                  }
                </p>

                {(search || statusFilter !== "All") && (
                  <button
                    onClick={clearFilters}
                    className="
                      mt-5
                      text-sm
                      font-semibold
                      text-blue-700
                      hover:text-blue-900
                    "
                  >
                    Clear Filters
                  </button>
                )}

              </div>
            ) : (

              /* TABLE */

              <div className="overflow-x-auto">

                <table className="w-full min-w-[1200px]">

                  <thead className="bg-slate-50 border-b border-slate-200">

                    <tr>

                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                        Booking
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                        Customer
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                        Contact
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                        Service
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                        Address
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                        Amount
                      </th>

                      <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-slate-500">
                        Status
                      </th>

                    </tr>

                  </thead>

                  <tbody className="divide-y divide-slate-100">

                    {filteredBookings.map((booking) => {

                      const status =
                        booking.status || "Pending";

                      const statusStyle =
                        getStatusStyle(status);

                      return (
                        <tr
                          key={
                            booking._id ||
                            booking.booking_id
                          }
                          className="hover:bg-slate-50/70 transition"
                        >

                          {/* BOOKING */}

                          <td className="px-6 py-5">

                            <span
                              className="
                                inline-flex
                                items-center
                                px-3
                                py-1.5
                                rounded-lg
                                bg-slate-100
                                text-slate-700
                                text-sm
                                font-bold
                              "
                            >
                              #
                              {booking.booking_id ||
                                booking._id ||
                                "-"}
                            </span>

                          </td>

                          {/* CUSTOMER */}

                          <td className="px-6 py-5">

                            <div className="flex items-center gap-3">

                              <div
                                className="
                                  w-10
                                  h-10
                                  rounded-full
                                  bg-blue-100
                                  text-blue-800
                                  flex
                                  items-center
                                  justify-center
                                  font-bold
                                  text-sm
                                  shrink-0
                                "
                              >
                                {booking.full_name
                                  ?.charAt(0)
                                  ?.toUpperCase() || "C"}
                              </div>

                              <div>

                                <div className="font-semibold text-slate-900">
                                  {booking.full_name ||
                                    "Unknown Customer"}
                                </div>

                                <div className="text-xs text-slate-400 mt-0.5">
                                  Customer
                                </div>

                              </div>

                            </div>

                          </td>

                          {/* CONTACT */}

                          <td className="px-6 py-5">

                            {booking.phone ? (

                              <a
                                href={`tel:${booking.phone}`}
                                className="
                                  inline-flex
                                  items-center
                                  gap-2
                                  text-sm
                                  font-medium
                                  text-slate-700
                                  hover:text-blue-700
                                  transition
                                "
                              >

                                <span
                                  className="
                                    w-8
                                    h-8
                                    rounded-lg
                                    bg-green-50
                                    flex
                                    items-center
                                    justify-center
                                  "
                                >
                                  📞
                                </span>

                                {booking.phone}

                              </a>

                            ) : (

                              <span className="text-sm text-slate-400">
                                Not provided
                              </span>

                            )}

                          </td>

                          {/* SERVICE */}

                          <td className="px-6 py-5">

                            <span
                              className="
                                inline-flex
                                items-center
                                px-3
                                py-1.5
                                rounded-lg
                                bg-blue-50
                                text-blue-700
                                text-sm
                                font-semibold
                                whitespace-nowrap
                              "
                            >
                              {booking.service_type || "-"}
                            </span>

                          </td>

                          {/* ADDRESS */}

                          <td className="px-6 py-5">

                            <div
                              className="
                                max-w-[280px]
                                text-sm
                                text-slate-600
                                leading-relaxed
                              "
                              title={booking.address}
                            >
                              {booking.address || "-"}
                            </div>

                          </td>

                          {/* AMOUNT */}

                          <td className="px-6 py-5">

                            <button
                              type="button"
                              onClick={() =>
                                setSelectedBooking(
                                  booking
                                )
                              }
                              className="
                                inline-flex
                                items-center
                                gap-2
                                px-3
                                py-2
                                rounded-xl
                                bg-orange-50
                                border
                                border-orange-200
                                text-orange-700
                                text-sm
                                font-bold
                                hover:bg-orange-100
                                hover:border-orange-300
                                transition
                                cursor-pointer
                              "
                            >
                              ₹
                              {Number(
                                booking.amount || 0
                              ).toLocaleString("en-IN")}

                              <span className="text-xs">
                                ↗
                              </span>

                            </button>

                          </td>

                          {/* STATUS */}

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
                                ${statusStyle.wrapper}
                              `}
                            >

                              <span
                                className={`
                                  w-1.5
                                  h-1.5
                                  rounded-full
                                  ${statusStyle.dot}
                                `}
                              />

                              {status}

                            </span>

                          </td>

                        </tr>
                      );
                    })}

                  </tbody>

                </table>

              </div>
            )}

            {/* FOOTER */}

            {!loading &&
              filteredBookings.length > 0 && (

                <div
                  className="
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
                  "
                >

                  <p className="text-sm text-slate-500">

                    Showing{" "}

                    <span className="font-semibold text-slate-700">
                      {filteredBookings.length}
                    </span>

                    {" "}of{" "}

                    <span className="font-semibold text-slate-700">
                      {bookings.length}
                    </span>

                    {" "}bookings

                  </p>

                  {(search ||
                    statusFilter !== "All") && (

                    <button
                      onClick={clearFilters}
                      className="
                        text-sm
                        font-semibold
                        text-blue-700
                        hover:text-blue-900
                      "
                    >
                      Clear Filters
                    </button>

                  )}

                </div>
              )}

          </div>

        </main>
      </div>

      {/* ==========================================
          BOOKING EARNINGS MODAL
      ========================================== */}

      {selectedBooking && (

        <div
          className="
            fixed
            inset-0
            z-50
            bg-black/50
            backdrop-blur-sm
            flex
            items-center
            justify-center
            p-4
          "
          onClick={() =>
            setSelectedBooking(null)
          }
        >

          <div
            className="
              w-full
              max-w-2xl
              bg-white
              rounded-3xl
              shadow-2xl
              overflow-hidden
              max-h-[90vh]
              overflow-y-auto
            "
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* MODAL HEADER */}

            <div className="bg-blue-900 px-6 py-6 text-white">

              <div className="flex items-start justify-between gap-4">

                <div>

                  <p className="text-blue-200 text-sm font-medium">
                    Booking Earnings
                  </p>

                  <h2 className="text-2xl font-bold mt-1">
                    #{selectedBooking.booking_id}
                  </h2>

                  <p className="text-blue-200 text-sm mt-1">
                    {selectedBooking.service_type}
                  </p>

                </div>

                <button
                  type="button"
                  onClick={() =>
                    setSelectedBooking(null)
                  }
                  className="
                    w-9
                    h-9
                    rounded-xl
                    bg-white/10
                    hover:bg-white/20
                    flex
                    items-center
                    justify-center
                    text-xl
                    transition
                  "
                >
                  ×
                </button>

              </div>

            </div>

            {/* MODAL BODY */}

            <div className="p-6">

              {/* BOOKING INFORMATION */}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">

                {/* CUSTOMER */}

                <div className="bg-slate-50 rounded-2xl p-4">

                  <p className="text-xs text-slate-500">
                    Customer
                  </p>

                  <p className="font-semibold text-slate-900 mt-1">
                    {selectedBooking.full_name ||
                      "Unknown"}
                  </p>

                </div>

                {/* SERVICE */}

                <div className="bg-slate-50 rounded-2xl p-4">

                  <p className="text-xs text-slate-500">
                    Service
                  </p>

                  <p className="font-semibold text-slate-900 mt-1">
                    {selectedBooking.service_type ||
                      "-"}
                  </p>

                </div>

                {/* TECHNICIAN */}

                <div className="bg-slate-50 rounded-2xl p-4">

                  <p className="text-xs text-slate-500">
                    Technician
                  </p>

                  <p className="font-semibold text-slate-900 mt-1">
                    {selectedBooking.technician_name ||
                      "Not Assigned"}
                  </p>

                  {selectedBooking.employee_code && (
                    <p className="text-xs text-slate-500 mt-1">
                      Employee Code:{" "}
                      {selectedBooking.employee_code}
                    </p>
                  )}

                </div>

                {/* STATUS */}

                <div className="bg-slate-50 rounded-2xl p-4">

                  <p className="text-xs text-slate-500">
                    Booking Status
                  </p>

                  <p
                    className={`
                      inline-flex
                      mt-2
                      px-3
                      py-1
                      rounded-full
                      text-xs
                      font-bold
                      ${
                        selectedBooking.status ===
                        "Completed"
                          ? "bg-green-100 text-green-700"
                          : selectedBooking.status ===
                            "Accepted"
                          ? "bg-blue-100 text-blue-700"
                          : selectedBooking.status ===
                            "Rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-amber-100 text-amber-700"
                      }
                    `}
                  >
                    {selectedBooking.status ||
                      "Pending"}
                  </p>

                </div>

              </div>

              {/* TOTAL BOOKING VALUE */}

              <div
                className="
                  rounded-2xl
                  bg-slate-900
                  text-white
                  p-6
                  mb-5
                "
              >

                <p className="text-sm text-slate-300">
                  Total Booking Value
                </p>

                <p className="text-4xl font-bold mt-2">
                  ₹
                  {Number(
                    selectedBooking.amount || 0
                  ).toLocaleString("en-IN")}
                </p>

              </div>

              {/* EARNINGS BREAKDOWN */}

              <div className="mb-3">

                <h3 className="text-lg font-bold text-slate-900">
                  Earnings Breakdown
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  Booking value distribution
                </p>

              </div>

              {/* CALCULATE EARNINGS */}

              {(() => {
                const amount =
                  Number(
                    selectedBooking.amount || 0
                  );

                const servoraEarning =
                  amount * 0.2;

                const technicianEarning =
                  amount * 0.8;

                return (
                  <div className="space-y-4">

                    {/* SERVORACARE */}

                    <div
                      className="
                        rounded-2xl
                        border
                        border-blue-200
                        bg-blue-50
                        p-5
                      "
                    >

                      <div className="flex items-center justify-between gap-4">

                        <div>

                          <p className="text-sm font-medium text-blue-700">
                            ServoraCare Earnings
                          </p>

                          <p className="text-xs text-blue-500 mt-1">
                            Platform share • 20%
                          </p>

                        </div>

                        <p className="text-2xl font-bold text-blue-700">
                          ₹
                          {servoraEarning.toLocaleString(
                            "en-IN",
                            {
                              maximumFractionDigits: 2,
                            }
                          )}
                        </p>

                      </div>

                      <div className="mt-4 h-2 bg-blue-100 rounded-full overflow-hidden">

                        <div
                          className="h-full bg-blue-600 rounded-full"
                          style={{
                            width: "20%",
                          }}
                        />

                      </div>

                    </div>

                    {/* TECHNICIAN */}

                    <div
                      className="
                        rounded-2xl
                        border
                        border-green-200
                        bg-green-50
                        p-5
                      "
                    >

                      <div className="flex items-center justify-between gap-4">

                        <div>

                          <p className="text-sm font-medium text-green-700">
                            Technician Earnings
                          </p>

                          <p className="text-xs text-green-600 mt-1">
                            Technician share • 80%
                          </p>

                        </div>

                        <p className="text-2xl font-bold text-green-700">
                          ₹
                          {technicianEarning.toLocaleString(
                            "en-IN",
                            {
                              maximumFractionDigits: 2,
                            }
                          )}
                        </p>

                      </div>

                      <div className="mt-4 h-2 bg-green-100 rounded-full overflow-hidden">

                        <div
                          className="h-full bg-green-600 rounded-full"
                          style={{
                            width: "80%",
                          }}
                        />

                      </div>

                    </div>

                    {/* SUMMARY */}

                    <div
                      className="
                        border-t
                        border-slate-200
                        pt-5
                        mt-5
                      "
                    >

                      <div className="flex justify-between text-sm">

                        <span className="text-slate-500">
                          ServoraCare
                        </span>

                        <span className="font-semibold text-slate-900">
                          20%
                        </span>

                      </div>

                      <div className="flex justify-between text-sm mt-3">

                        <span className="text-slate-500">
                          Technician
                        </span>

                        <span className="font-semibold text-slate-900">
                          80%
                        </span>

                      </div>

                      <div className="flex justify-between text-base mt-4 pt-4 border-t">

                        <span className="font-bold text-slate-900">
                          Total
                        </span>

                        <span className="font-bold text-slate-900">
                          ₹
                          {(
                            servoraEarning +
                            technicianEarning
                          ).toLocaleString(
                            "en-IN",
                            {
                              maximumFractionDigits: 2,
                            }
                          )}
                        </span>

                      </div>

                    </div>

                  </div>
                );
              })()}

              {/* CLOSE BUTTON */}

              <button
                type="button"
                onClick={() =>
                  setSelectedBooking(null)
                }
                className="
                  w-full
                  mt-6
                  py-3
                  rounded-xl
                  bg-slate-100
                  hover:bg-slate-200
                  text-slate-700
                  font-semibold
                  transition
                "
              >
                Close
              </button>

            </div>

          </div>

        </div>
      )}

    </AdminLayout>
  );
}

export default AllBookings;