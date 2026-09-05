import { useEffect, useMemo, useState } from "react";
import {
    CreditCard,
    Search,
    CheckCircle2,
    XCircle,
    Clock3,
    IndianRupee,
    RefreshCw,
    Eye,
    X,
    AlertCircle,
} from "lucide-react";

const API = import.meta.env.VITE_API_URL;

function Payments() {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");

    const [selectedPayment, setSelectedPayment] = useState(null);
    const [showDetails, setShowDetails] = useState(false);

    const [showRejectModal, setShowRejectModal] = useState(false);
    const [rejectionReason, setRejectionReason] = useState("");
    const [processingId, setProcessingId] = useState(null);

    // =====================================================
    // FETCH PAYMENTS
    // =====================================================

    const fetchPayments = async () => {
        try {
            setRefreshing(true);

            /*
             * We use the existing all-bookings endpoint because
             * payment information belongs to the Booking document.
             */
            const response = await fetch(`${API}/api/all-bookings`);

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to fetch payments"
                );
            }

            const bookings = Array.isArray(data)
                ? data
                : data.bookings || [];

            /*
             * Only show bookings which have payment information.
             */
            const paymentBookings = bookings.filter(
                (booking) =>
                    booking.payment_status ||
                    booking.payment_utr ||
                    booking.payment_reference
            );

            setPayments(paymentBookings);
        } catch (error) {
            console.error("FETCH PAYMENTS ERROR:", error);
            alert(error.message || "Unable to load payments");
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchPayments();
    }, []);

    // =====================================================
    // FILTER + SEARCH
    // =====================================================

    const filteredPayments = useMemo(() => {
        return payments.filter((payment) => {
            const status =
                payment.payment_status || "Pending";

            const matchesFilter =
                filter === "All" || status === filter;

            const searchText = search.toLowerCase();

            const matchesSearch =
                String(payment.booking_id || "")
                    .toLowerCase()
                    .includes(searchText) ||
                String(payment.full_name || "")
                    .toLowerCase()
                    .includes(searchText) ||
                String(payment.phone || "")
                    .toLowerCase()
                    .includes(searchText) ||
                String(payment.payment_utr || "")
                    .toLowerCase()
                    .includes(searchText) ||
                String(payment.payment_reference || "")
                    .toLowerCase()
                    .includes(searchText);

            return matchesFilter && matchesSearch;
        });
    }, [payments, filter, search]);

    // =====================================================
    // STATISTICS
    // =====================================================

    const stats = useMemo(() => {
        const submitted = payments.filter(
            (p) => p.payment_status === "Submitted"
        );

        const paid = payments.filter(
            (p) => p.payment_status === "Paid"
        );

        const rejected = payments.filter(
            (p) => p.payment_status === "Rejected"
        );

        const paidAmount = paid.reduce(
            (total, payment) =>
                total + Number(payment.amount || 0),
            0
        );

        const submittedAmount = submitted.reduce(
            (total, payment) =>
                total + Number(payment.amount || 0),
            0
        );

        return {
            submitted: submitted.length,
            paid: paid.length,
            rejected: rejected.length,
            paidAmount,
            submittedAmount,
        };
    }, [payments]);

    // =====================================================
    // VERIFY PAYMENT
    // =====================================================

    const verifyPayment = async (payment) => {
        const confirmed = window.confirm(
            `Verify payment of ₹${Number(
                payment.amount || 0
            ).toLocaleString("en-IN")} for Booking #${
                payment.booking_id
            }?`
        );

        if (!confirmed) return;

        try {
            setProcessingId(payment._id);

            const response = await fetch(
                `${API}/api/admin/verify-payment`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        bookingId: payment.booking_id,
                        action: "approve",
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Payment verification failed"
                );
            }

            alert("Payment verified successfully.");

            setShowDetails(false);
            setSelectedPayment(null);

            await fetchPayments();
        } catch (error) {
            console.error("VERIFY PAYMENT ERROR:", error);
            alert(
                error.message ||
                    "Unable to verify payment"
            );
        } finally {
            setProcessingId(null);
        }
    };

    // =====================================================
    // REJECT PAYMENT
    // =====================================================

    const openRejectModal = (payment) => {
        setSelectedPayment(payment);
        setRejectionReason("");
        setShowRejectModal(true);
    };

    const rejectPayment = async () => {
        if (!selectedPayment) return;

        if (!rejectionReason.trim()) {
            alert("Please enter a rejection reason.");
            return;
        }

        try {
            setProcessingId(selectedPayment._id);

            const response = await fetch(
                `${API}/api/admin/verify-payment`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        bookingId:
                            selectedPayment.booking_id,
                        action: "reject",
                        rejectionReason:
                            rejectionReason.trim(),
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Payment rejection failed"
                );
            }

            alert("Payment rejected.");

            setShowRejectModal(false);
            setShowDetails(false);
            setSelectedPayment(null);
            setRejectionReason("");

            await fetchPayments();
        } catch (error) {
            console.error("REJECT PAYMENT ERROR:", error);

            alert(
                error.message ||
                    "Unable to reject payment"
            );
        } finally {
            setProcessingId(null);
        }
    };

    // =====================================================
    // STATUS BADGE
    // =====================================================

    const StatusBadge = ({ status }) => {
        if (status === "Paid") {
            return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Paid
                </span>
            );
        }

        if (status === "Submitted") {
            return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                    <Clock3 className="w-3.5 h-3.5" />
                    Awaiting Verification
                </span>
            );
        }

        if (status === "Rejected") {
            return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200">
                    <XCircle className="w-3.5 h-3.5" />
                    Rejected
                </span>
            );
        }

        return (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                <AlertCircle className="w-3.5 h-3.5" />
                Pending
            </span>
        );
    };

    // =====================================================
    // FORMAT DATE
    // =====================================================

    const formatDate = (date) => {
        if (!date) return "—";

        return new Date(date).toLocaleString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            }
        );
    };

    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-center">
                    <RefreshCw className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-3" />

                    <p className="text-sm text-slate-500">
                        Loading payment records...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* =====================================================
                HEADER
            ===================================================== */}

            <div className="bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-3">
                                <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                                    <CreditCard className="w-6 h-6" />
                                </div>

                                <div>
                                    <h1 className="text-2xl font-bold text-slate-900">
                                        Payments
                                    </h1>

                                    <p className="text-sm text-slate-500 mt-0.5">
                                        Manage and verify customer payments
                                    </p>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={fetchPayments}
                            disabled={refreshing}
                            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 disabled:opacity-60 transition"
                        >
                            <RefreshCw
                                className={`w-4 h-4 ${
                                    refreshing
                                        ? "animate-spin"
                                        : ""
                                }`}
                            />

                            Refresh
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* =====================================================
                    STAT CARDS
                ===================================================== */}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Awaiting Verification
                                </p>

                                <p className="text-2xl font-bold text-slate-900 mt-2">
                                    {stats.submitted}
                                </p>
                            </div>

                            <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                                <Clock3 className="w-5 h-5" />
                            </div>
                        </div>

                        <p className="text-xs text-slate-500 mt-3">
                            ₹
                            {stats.submittedAmount.toLocaleString(
                                "en-IN"
                            )}{" "}
                            awaiting review
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Paid
                                </p>

                                <p className="text-2xl font-bold text-green-600 mt-2">
                                    {stats.paid}
                                </p>
                            </div>

                            <div className="w-11 h-11 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
                                <CheckCircle2 className="w-5 h-5" />
                            </div>
                        </div>

                        <p className="text-xs text-slate-500 mt-3">
                            ₹
                            {stats.paidAmount.toLocaleString(
                                "en-IN"
                            )}{" "}
                            verified
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Rejected
                                </p>

                                <p className="text-2xl font-bold text-red-600 mt-2">
                                    {stats.rejected}
                                </p>
                            </div>

                            <div className="w-11 h-11 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                                <XCircle className="w-5 h-5" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Verified Revenue
                                </p>

                                <p className="text-2xl font-bold text-blue-700 mt-2">
                                    ₹
                                    {stats.paidAmount.toLocaleString(
                                        "en-IN"
                                    )}
                                </p>
                            </div>

                            <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                                <IndianRupee className="w-5 h-5" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* =====================================================
                    SEARCH + FILTER
                ===================================================== */}

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 mb-6">
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                            <input
                                type="text"
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                placeholder="Search booking, customer, phone, UTR..."
                                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div className="flex gap-2 overflow-x-auto">
                            {[
                                "All",
                                "Submitted",
                                "Paid",
                                "Rejected",
                            ].map((status) => (
                                <button
                                    key={status}
                                    onClick={() =>
                                        setFilter(status)
                                    }
                                    className={`whitespace-nowrap px-4 py-2.5 rounded-xl text-sm font-semibold transition ${
                                        filter === status
                                            ? "bg-blue-600 text-white shadow-sm"
                                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                    }`}
                                >
                                    {status ===
                                    "Submitted"
                                        ? "Awaiting Verification"
                                        : status}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* =====================================================
                    DESKTOP TABLE
                ===================================================== */}

                <div className="hidden lg:block bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                        <div>
                            <h2 className="font-bold text-slate-900">
                                Payment Records
                            </h2>

                            <p className="text-xs text-slate-500 mt-1">
                                {filteredPayments.length} payment
                                {filteredPayments.length !== 1
                                    ? "s"
                                    : ""}{" "}
                                found
                            </p>
                        </div>
                    </div>

                    {filteredPayments.length === 0 ? (
                        <div className="py-16 text-center">
                            <CreditCard className="w-10 h-10 text-slate-300 mx-auto mb-3" />

                            <p className="font-semibold text-slate-600">
                                No payment records found
                            </p>

                            <p className="text-sm text-slate-400 mt-1">
                                Try changing your search or filter.
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-slate-50 border-b border-slate-200">
                                    <tr>
                                        <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                                            Booking
                                        </th>

                                        <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                                            Customer
                                        </th>

                                        <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                                            Amount
                                        </th>

                                        <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                                            UTR
                                        </th>

                                        <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                                            Status
                                        </th>

                                        <th className="text-right px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-slate-100">
                                    {filteredPayments.map(
                                        (payment) => (
                                            <tr
                                                key={
                                                    payment._id
                                                }
                                                className="hover:bg-slate-50 transition"
                                            >
                                                <td className="px-6 py-4">
                                                    <p className="font-bold text-blue-700">
                                                        #
                                                        {
                                                            payment.booking_id
                                                        }
                                                    </p>

                                                    <p className="text-xs text-slate-400 mt-1">
                                                        {
                                                            payment.service_type
                                                        }
                                                    </p>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <p className="font-semibold text-slate-800">
                                                        {
                                                            payment.full_name
                                                        }
                                                    </p>

                                                    <p className="text-xs text-slate-500 mt-1">
                                                        {
                                                            payment.phone
                                                        }
                                                    </p>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <p className="font-bold text-slate-900">
                                                        ₹
                                                        {Number(
                                                            payment.amount ||
                                                                0
                                                        ).toLocaleString(
                                                            "en-IN"
                                                        )}
                                                    </p>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <span className="font-mono text-xs text-slate-600">
                                                        {payment.payment_utr ||
                                                            "—"}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <StatusBadge
                                                        status={
                                                            payment.payment_status ||
                                                            "Pending"
                                                        }
                                                    />
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button
                                                            onClick={() => {
                                                                setSelectedPayment(
                                                                    payment
                                                                );
                                                                setShowDetails(
                                                                    true
                                                                );
                                                            }}
                                                            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-blue-600 transition"
                                                            title="View details"
                                                        >
                                                            <Eye className="w-4 h-4" />
                                                        </button>

                                                        {payment.payment_status ===
                                                            "Submitted" && (
                                                            <>
                                                                <button
                                                                    onClick={() =>
                                                                        verifyPayment(
                                                                            payment
                                                                        )
                                                                    }
                                                                    disabled={
                                                                        processingId ===
                                                                        payment._id
                                                                    }
                                                                    className="px-3 py-2 rounded-lg bg-green-600 text-white text-xs font-semibold hover:bg-green-700 disabled:opacity-50 transition"
                                                                >
                                                                    Verify
                                                                </button>

                                                                <button
                                                                    onClick={() =>
                                                                        openRejectModal(
                                                                            payment
                                                                        )
                                                                    }
                                                                    disabled={
                                                                        processingId ===
                                                                        payment._id
                                                                    }
                                                                    className="px-3 py-2 rounded-lg bg-red-50 text-red-600 border border-red-200 text-xs font-semibold hover:bg-red-100 disabled:opacity-50 transition"
                                                                >
                                                                    Reject
                                                                </button>
                                                            </>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* =====================================================
                    MOBILE CARDS
                ===================================================== */}

                <div className="lg:hidden space-y-4">
                    {filteredPayments.length === 0 ? (
                        <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center">
                            <CreditCard className="w-10 h-10 text-slate-300 mx-auto mb-3" />

                            <p className="font-semibold text-slate-600">
                                No payment records found
                            </p>
                        </div>
                    ) : (
                        filteredPayments.map((payment) => (
                            <div
                                key={payment._id}
                                className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <p className="font-bold text-blue-700">
                                            Booking #
                                            {
                                                payment.booking_id
                                            }
                                        </p>

                                        <p className="text-sm font-semibold text-slate-800 mt-1">
                                            {
                                                payment.full_name
                                            }
                                        </p>

                                        <p className="text-xs text-slate-500 mt-1">
                                            {
                                                payment.service_type
                                            }
                                        </p>
                                    </div>

                                    <StatusBadge
                                        status={
                                            payment.payment_status ||
                                            "Pending"
                                        }
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4 mt-5 pt-4 border-t border-slate-100">
                                    <div>
                                        <p className="text-xs text-slate-400">
                                            Amount
                                        </p>

                                        <p className="font-bold text-slate-900 mt-1">
                                            ₹
                                            {Number(
                                                payment.amount ||
                                                    0
                                            ).toLocaleString(
                                                "en-IN"
                                            )}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-slate-400">
                                            UTR
                                        </p>

                                        <p className="font-mono text-xs text-slate-700 mt-1 break-all">
                                            {payment.payment_utr ||
                                                "—"}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-2 mt-5">
                                    <button
                                        onClick={() => {
                                            setSelectedPayment(
                                                payment
                                            );
                                            setShowDetails(
                                                true
                                            );
                                        }}
                                        className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-sm font-semibold hover:bg-slate-200 transition"
                                    >
                                        View Details
                                    </button>

                                    {payment.payment_status ===
                                        "Submitted" && (
                                        <>
                                            <button
                                                onClick={() =>
                                                    verifyPayment(
                                                        payment
                                                    )
                                                }
                                                disabled={
                                                    processingId ===
                                                    payment._id
                                                }
                                                className="px-4 py-2.5 rounded-xl bg-green-600 text-white text-sm font-semibold hover:bg-green-700 disabled:opacity-50 transition"
                                            >
                                                Verify
                                            </button>

                                            <button
                                                onClick={() =>
                                                    openRejectModal(
                                                        payment
                                                    )
                                                }
                                                disabled={
                                                    processingId ===
                                                    payment._id
                                                }
                                                className="px-4 py-2.5 rounded-xl bg-red-50 text-red-600 border border-red-200 text-sm font-semibold hover:bg-red-100 disabled:opacity-50 transition"
                                            >
                                                Reject
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* =====================================================
                PAYMENT DETAILS MODAL
            ===================================================== */}

            {showDetails && selectedPayment && (
                <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
                        <div className="px-5 sm:px-6 py-5 border-b border-slate-200 flex items-center justify-between">
                            <div>
                                <h3 className="font-bold text-lg text-slate-900">
                                    Payment Details
                                </h3>

                                <p className="text-xs text-slate-500 mt-1">
                                    Booking #
                                    {
                                        selectedPayment.booking_id
                                    }
                                </p>
                            </div>

                            <button
                                onClick={() => {
                                    setShowDetails(false);
                                    setSelectedPayment(null);
                                }}
                                className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-slate-100 text-slate-500"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-5 sm:p-6 space-y-5">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-500">
                                    Status
                                </span>

                                <StatusBadge
                                    status={
                                        selectedPayment.payment_status ||
                                        "Pending"
                                    }
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-50 rounded-xl p-4">
                                    <p className="text-xs text-slate-500">
                                        Customer
                                    </p>

                                    <p className="font-semibold text-slate-900 mt-1">
                                        {
                                            selectedPayment.full_name
                                        }
                                    </p>
                                </div>

                                <div className="bg-slate-50 rounded-xl p-4">
                                    <p className="text-xs text-slate-500">
                                        Phone
                                    </p>

                                    <p className="font-semibold text-slate-900 mt-1">
                                        {
                                            selectedPayment.phone
                                        }
                                    </p>
                                </div>
                            </div>

                            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                                <p className="text-xs text-blue-600 font-semibold">
                                    Payment Amount
                                </p>

                                <p className="text-2xl font-bold text-blue-900 mt-1">
                                    ₹
                                    {Number(
                                        selectedPayment.amount ||
                                            0
                                    ).toLocaleString(
                                        "en-IN"
                                    )}
                                </p>
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between gap-4">
                                    <span className="text-sm text-slate-500">
                                        Payment Reference
                                    </span>

                                    <span className="text-sm font-mono text-slate-800 text-right break-all">
                                        {selectedPayment.payment_reference ||
                                            "—"}
                                    </span>
                                </div>

                                <div className="flex justify-between gap-4">
                                    <span className="text-sm text-slate-500">
                                        UTR
                                    </span>

                                    <span className="text-sm font-mono font-semibold text-slate-800 text-right break-all">
                                        {selectedPayment.payment_utr ||
                                            "—"}
                                    </span>
                                </div>

                                <div className="flex justify-between gap-4">
                                    <span className="text-sm text-slate-500">
                                        Submitted
                                    </span>

                                    <span className="text-sm text-slate-800 text-right">
                                        {formatDate(
                                            selectedPayment.payment_submitted_at
                                        )}
                                    </span>
                                </div>

                                <div className="flex justify-between gap-4">
                                    <span className="text-sm text-slate-500">
                                        Verified
                                    </span>

                                    <span className="text-sm text-slate-800 text-right">
                                        {formatDate(
                                            selectedPayment.payment_verified_at
                                        )}
                                    </span>
                                </div>

                                {selectedPayment.payment_rejection_reason && (
                                    <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                                        <p className="text-xs font-semibold text-red-600">
                                            Rejection Reason
                                        </p>

                                        <p className="text-sm text-red-800 mt-1">
                                            {
                                                selectedPayment.payment_rejection_reason
                                            }
                                        </p>
                                    </div>
                                )}
                            </div>

                            {selectedPayment.payment_status ===
                                "Submitted" && (
                                <div className="flex gap-3 pt-2">
                                    <button
                                        onClick={() =>
                                            verifyPayment(
                                                selectedPayment
                                            )
                                        }
                                        disabled={
                                            processingId ===
                                            selectedPayment._id
                                        }
                                        className="flex-1 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 disabled:opacity-50 transition"
                                    >
                                        <span className="inline-flex items-center gap-2">
                                            <CheckCircle2 className="w-4 h-4" />
                                            Verify Payment
                                        </span>
                                    </button>

                                    <button
                                        onClick={() =>
                                            openRejectModal(
                                                selectedPayment
                                            )
                                        }
                                        disabled={
                                            processingId ===
                                            selectedPayment._id
                                        }
                                        className="px-5 py-3 rounded-xl bg-red-50 text-red-600 border border-red-200 font-semibold hover:bg-red-100 disabled:opacity-50 transition"
                                    >
                                        Reject
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* =====================================================
                REJECT MODAL
            ===================================================== */}

            {showRejectModal && selectedPayment && (
                <div className="fixed inset-0 z-[110] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl">
                        <div className="px-5 py-5 border-b border-slate-200 flex items-center justify-between">
                            <div>
                                <h3 className="font-bold text-lg text-slate-900">
                                    Reject Payment
                                </h3>

                                <p className="text-xs text-slate-500 mt-1">
                                    Booking #
                                    {
                                        selectedPayment.booking_id
                                    }
                                </p>
                            </div>

                            <button
                                onClick={() =>
                                    setShowRejectModal(false)
                                }
                                className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-slate-100"
                            >
                                <X className="w-5 h-5 text-slate-500" />
                            </button>
                        </div>

                        <div className="p-5">
                            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-5">
                                <div className="flex gap-3">
                                    <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />

                                    <div>
                                        <p className="text-sm font-semibold text-amber-800">
                                            Payment will be marked as rejected
                                        </p>

                                        <p className="text-xs text-amber-700 mt-1">
                                            The customer will need to
                                            submit a valid payment again.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Rejection Reason
                            </label>

                            <textarea
                                value={rejectionReason}
                                onChange={(e) =>
                                    setRejectionReason(
                                        e.target.value
                                    )
                                }
                                rows={4}
                                placeholder="Example: UTR could not be verified in the bank statement."
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none resize-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                            />

                            <div className="flex gap-3 mt-5">
                                <button
                                    onClick={() => {
                                        setShowRejectModal(
                                            false
                                        );
                                        setRejectionReason("");
                                    }}
                                    className="flex-1 py-3 rounded-xl bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 transition"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={rejectPayment}
                                    disabled={
                                        !rejectionReason.trim() ||
                                        processingId ===
                                            selectedPayment._id
                                    }
                                    className="flex-1 py-3 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 disabled:opacity-50 transition"
                                >
                                    Reject Payment
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Payments;