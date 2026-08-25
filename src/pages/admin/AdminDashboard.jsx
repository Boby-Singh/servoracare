import RevenueByCity from "../../components/admin/RevenueByCity";
import RevenueByTechnician from "../../components/admin/RevenueByTechnician";

function AdminDashboard({ bookings = [] }) {
    const completedBookings = bookings.filter(
        (booking) => booking.status === "Completed"
    );

    const pendingBookings = bookings.filter(
        (booking) => booking.status === "Pending"
    );

    const acceptedBookings = bookings.filter(
        (booking) => booking.status === "Accepted"
    );

    const rejectedBookings = bookings.filter(
        (booking) => booking.status === "Rejected"
    );

    const totalRevenue = completedBookings.reduce(
        (total, booking) => {
            const amount = Number(booking.amount) || 0;
            return total + amount;
        },
        0
    );

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <div className="w-full space-y-6 mb-8">

            {/* ==========================================
                ANALYTICS HEADER
            ========================================== */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                        Business Analytics
                    </h2>

                    <p className="text-sm text-slate-500 mt-1">
                        Monitor revenue, bookings and technician performance
                    </p>
                </div>

                <div className="inline-flex items-center gap-2 self-start lg:self-auto px-4 py-2 rounded-xl bg-blue-50 border border-blue-100">
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>

                    <span className="text-sm font-semibold text-blue-700">
                        Revenue from completed services
                    </span>
                </div>
            </div>

            {/* ==========================================
                ANALYTICS SUMMARY
            ========================================== */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

                {/* REVENUE */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
                    <div className="flex items-start justify-between gap-3">

                        <div>
                            <p className="text-xs sm:text-sm font-medium text-slate-500">
                                Total Revenue
                            </p>

                            <p className="text-xl sm:text-2xl font-bold text-slate-900 mt-2">
                                {formatCurrency(totalRevenue)}
                            </p>
                        </div>

                        <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                            <span className="text-lg">
                                ₹
                            </span>
                        </div>
                    </div>

                    <p className="text-xs text-slate-400 mt-3">
                        {completedBookings.length} completed service
                        {completedBookings.length !== 1 ? "s" : ""}
                    </p>
                </div>

                {/* PENDING */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
                    <div className="flex items-start justify-between gap-3">

                        <div>
                            <p className="text-xs sm:text-sm font-medium text-slate-500">
                                Pending
                            </p>

                            <p className="text-xl sm:text-2xl font-bold text-yellow-600 mt-2">
                                {pendingBookings.length}
                            </p>
                        </div>

                        <div className="w-10 h-10 rounded-xl bg-yellow-50 flex items-center justify-center shrink-0">
                            <span className="text-lg">
                                ⏳
                            </span>
                        </div>
                    </div>

                    <p className="text-xs text-slate-400 mt-3">
                        Awaiting assignment
                    </p>
                </div>

                {/* ACCEPTED */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
                    <div className="flex items-start justify-between gap-3">

                        <div>
                            <p className="text-xs sm:text-sm font-medium text-slate-500">
                                Accepted
                            </p>

                            <p className="text-xl sm:text-2xl font-bold text-blue-600 mt-2">
                                {acceptedBookings.length}
                            </p>
                        </div>

                        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                            <span className="text-lg">
                                🔧
                            </span>
                        </div>
                    </div>

                    <p className="text-xs text-slate-400 mt-3">
                        Active service visits
                    </p>
                </div>

                {/* COMPLETED */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
                    <div className="flex items-start justify-between gap-3">

                        <div>
                            <p className="text-xs sm:text-sm font-medium text-slate-500">
                                Completed
                            </p>

                            <p className="text-xl sm:text-2xl font-bold text-green-600 mt-2">
                                {completedBookings.length}
                            </p>
                        </div>

                        <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                            <span className="text-lg">
                                ✓
                            </span>
                        </div>
                    </div>

                    <p className="text-xs text-slate-400 mt-3">
                        Successfully completed
                    </p>
                </div>
            </div>

            {/* ==========================================
                REVENUE CHARTS
            ========================================== */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

                {/* REVENUE BY CITY */}
                <RevenueByCity bookings={bookings} />

                {/* REVENUE BY TECHNICIAN */}
                <RevenueByTechnician bookings={bookings} />

            </div>

            {/* ==========================================
                ADDITIONAL BUSINESS OVERVIEW
            ========================================== */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6">

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                    <div>
                        <h3 className="text-lg font-bold text-slate-900">
                            Booking Overview
                        </h3>

                        <p className="text-sm text-slate-500 mt-1">
                            Current booking distribution
                        </p>
                    </div>

                    <div className="text-sm text-slate-500">
                        Total:{" "}
                        <span className="font-bold text-slate-900">
                            {bookings.length}
                        </span>
                    </div>

                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">

                    <div className="rounded-xl bg-yellow-50 border border-yellow-100 p-4">
                        <p className="text-xs font-semibold text-yellow-700">
                            Pending
                        </p>

                        <p className="text-2xl font-bold text-yellow-800 mt-1">
                            {pendingBookings.length}
                        </p>
                    </div>

                    <div className="rounded-xl bg-blue-50 border border-blue-100 p-4">
                        <p className="text-xs font-semibold text-blue-700">
                            Accepted
                        </p>

                        <p className="text-2xl font-bold text-blue-800 mt-1">
                            {acceptedBookings.length}
                        </p>
                    </div>

                    <div className="rounded-xl bg-green-50 border border-green-100 p-4">
                        <p className="text-xs font-semibold text-green-700">
                            Completed
                        </p>

                        <p className="text-2xl font-bold text-green-800 mt-1">
                            {completedBookings.length}
                        </p>
                    </div>

                    <div className="rounded-xl bg-red-50 border border-red-100 p-4">
                        <p className="text-xs font-semibold text-red-700">
                            Rejected
                        </p>

                        <p className="text-2xl font-bold text-red-800 mt-1">
                            {rejectedBookings.length}
                        </p>
                    </div>

                </div>
            </div>

        </div>
    );
}

export default AdminDashboard;