import RevenueByCity from "../../components/admin/RevenueByCity";
import RevenueByTechnician from "../../components/admin/RevenueByTechnician";

function AdminDashboard({ bookings = [] }) {
    // ==========================================
    // NORMALIZE BOOKINGS
    // ==========================================

    const safeBookings = Array.isArray(bookings) ? bookings : [];

    // ==========================================
    // BOOKING STATUS
    // ==========================================

    const pendingBookings = safeBookings.filter(
        (booking) => (booking.status || "Pending") === "Pending"
    );

    const acceptedBookings = safeBookings.filter(
        (booking) => booking.status === "Accepted"
    );

    const completedBookings = safeBookings.filter(
        (booking) => booking.status === "Completed"
    );

    const rejectedBookings = safeBookings.filter(
        (booking) => booking.status === "Rejected"
    );

    // ==========================================
    // REVENUE
    // ==========================================

    const totalRevenue = completedBookings.reduce(
        (total, booking) => {
            const amount = Number(booking.amount || 0);
            return total + amount;
        },
        0
    );

    // ==========================================
    // SERVORACARE EARNINGS
    // 20% PLATFORM SHARE
    // ==========================================

    const servoraCareEarnings = totalRevenue * 0.2;

    // ==========================================
    // TECHNICIAN EARNINGS
    // 80% TECHNICIAN SHARE
    // ==========================================

    const technicianEarnings = totalRevenue * 0.8;

    // ==========================================
    // FORMAT CURRENCY
    // ==========================================

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(amount || 0);
    };

    // ==========================================
    // AVERAGE COMPLETED BOOKING VALUE
    // ==========================================

    const averageBookingValue =
        completedBookings.length > 0
            ? totalRevenue / completedBookings.length
            : 0;

    // ==========================================
    // TOTAL BOOKING VALUE
    // ==========================================

    const totalBookingValue = safeBookings.reduce(
        (total, booking) => {
            return total + Number(booking.amount || 0);
        },
        0
    );

    // ==========================================
    // COMPLETION RATE
    // ==========================================

    const completionRate =
        safeBookings.length > 0
            ? (completedBookings.length / safeBookings.length) * 100
            : 0;

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

                    <span className="w-2 h-2 rounded-full bg-blue-600" />

                    <span className="text-sm font-semibold text-blue-700">
                        Revenue from completed services
                    </span>

                </div>
            </div>

            {/* ==========================================
                MAIN ANALYTICS CARDS
            ========================================== */}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                {/* TOTAL REVENUE */}

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 hover:shadow-md transition">

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
                            <span className="text-lg text-green-700">
                                ₹
                            </span>
                        </div>

                    </div>

                    <p className="text-xs text-slate-400 mt-3">
                        Revenue from completed services
                    </p>

                </div>

                {/* PENDING */}

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 hover:shadow-md transition">

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

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 hover:shadow-md transition">

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

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 hover:shadow-md transition">

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
                EARNINGS SUMMARY
            ========================================== */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                {/* SERVORACARE */}

                <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5">

                    <div className="flex items-center justify-between">

                        <div>
                            <p className="text-sm font-semibold text-blue-700">
                                ServoraCare Earnings
                            </p>

                            <p className="text-xs text-blue-500 mt-1">
                                Platform share • 20%
                            </p>
                        </div>

                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
                            <span className="font-bold text-blue-700">
                                ₹
                            </span>
                        </div>

                    </div>

                    <p className="text-2xl font-bold text-blue-800 mt-4">
                        {formatCurrency(servoraCareEarnings)}
                    </p>

                    <div className="mt-4 h-2 bg-blue-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-blue-600 rounded-full"
                            style={{ width: "20%" }}
                        />
                    </div>

                </div>

                {/* TECHNICIAN */}

                <div className="rounded-2xl border border-green-200 bg-green-50 p-5">

                    <div className="flex items-center justify-between">

                        <div>
                            <p className="text-sm font-semibold text-green-700">
                                Technician Earnings
                            </p>

                            <p className="text-xs text-green-600 mt-1">
                                Technician share • 80%
                            </p>
                        </div>

                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
                            <span className="font-bold text-green-700">
                                ₹
                            </span>
                        </div>

                    </div>

                    <p className="text-2xl font-bold text-green-800 mt-4">
                        {formatCurrency(technicianEarnings)}
                    </p>

                    <div className="mt-4 h-2 bg-green-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-green-600 rounded-full"
                            style={{ width: "80%" }}
                        />
                    </div>

                </div>

                {/* AVERAGE */}

                <div className="rounded-2xl border border-orange-200 bg-orange-50 p-5">

                    <div className="flex items-center justify-between">

                        <div>
                            <p className="text-sm font-semibold text-orange-700">
                                Average Booking
                            </p>

                            <p className="text-xs text-orange-600 mt-1">
                                Per completed service
                            </p>
                        </div>

                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
                            <span className="font-bold text-orange-700">
                                ₹
                            </span>
                        </div>

                    </div>

                    <p className="text-2xl font-bold text-orange-800 mt-4">
                        {formatCurrency(averageBookingValue)}
                    </p>

                    <p className="text-xs text-orange-600 mt-3">
                        Based on {completedBookings.length} completed service
                        {completedBookings.length !== 1 ? "s" : ""}
                    </p>

                </div>

            </div>

            {/* ==========================================
                REVENUE CHARTS
            ========================================== */}

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

                {/* REVENUE BY CITY */}

                <RevenueByCity bookings={safeBookings} />

                {/* REVENUE BY TECHNICIAN */}

                <RevenueByTechnician bookings={safeBookings} />

            </div>

            {/* ==========================================
                BOOKING OVERVIEW
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

                        Total:

                        <span className="font-bold text-slate-900 ml-1">
                            {safeBookings.length}
                        </span>

                    </div>

                </div>

                {/* STATUS CARDS */}

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">

                    {/* PENDING */}

                    <div className="rounded-xl bg-yellow-50 border border-yellow-100 p-4">

                        <p className="text-xs font-semibold text-yellow-700">
                            Pending
                        </p>

                        <p className="text-2xl font-bold text-yellow-800 mt-1">
                            {pendingBookings.length}
                        </p>

                        <p className="text-xs text-yellow-600 mt-1">
                            Awaiting action
                        </p>

                    </div>

                    {/* ACCEPTED */}

                    <div className="rounded-xl bg-blue-50 border border-blue-100 p-4">

                        <p className="text-xs font-semibold text-blue-700">
                            Accepted
                        </p>

                        <p className="text-2xl font-bold text-blue-800 mt-1">
                            {acceptedBookings.length}
                        </p>

                        <p className="text-xs text-blue-600 mt-1">
                            Active services
                        </p>

                    </div>

                    {/* COMPLETED */}

                    <div className="rounded-xl bg-green-50 border border-green-100 p-4">

                        <p className="text-xs font-semibold text-green-700">
                            Completed
                        </p>

                        <p className="text-2xl font-bold text-green-800 mt-1">
                            {completedBookings.length}
                        </p>

                        <p className="text-xs text-green-600 mt-1">
                            Finished services
                        </p>

                    </div>

                    {/* REJECTED */}

                    <div className="rounded-xl bg-red-50 border border-red-100 p-4">

                        <p className="text-xs font-semibold text-red-700">
                            Rejected
                        </p>

                        <p className="text-2xl font-bold text-red-800 mt-1">
                            {rejectedBookings.length}
                        </p>

                        <p className="text-xs text-red-600 mt-1">
                            Declined requests
                        </p>

                    </div>

                </div>

            </div>

            {/* ==========================================
                FINANCIAL OVERVIEW
            ========================================== */}

            <div className="bg-slate-900 rounded-2xl shadow-lg p-5 sm:p-6 text-white">

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                    <div>

                        <h3 className="text-lg font-bold">
                            Financial Overview
                        </h3>

                        <p className="text-sm text-slate-400 mt-1">
                            Overall booking and platform performance
                        </p>

                    </div>

                    <div className="px-3 py-1.5 rounded-lg bg-white/10 text-xs font-semibold">
                        {completionRate.toFixed(1)}% Completion Rate
                    </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">

                    {/* TOTAL BOOKING VALUE */}

                    <div className="rounded-xl bg-white/5 border border-white/10 p-4">

                        <p className="text-xs text-slate-400">
                            Total Booking Value
                        </p>

                        <p className="text-xl font-bold mt-2">
                            {formatCurrency(totalBookingValue)}
                        </p>

                    </div>

                    {/* PLATFORM EARNING */}

                    <div className="rounded-xl bg-white/5 border border-white/10 p-4">

                        <p className="text-xs text-slate-400">
                            ServoraCare Share
                        </p>

                        <p className="text-xl font-bold text-blue-400 mt-2">
                            {formatCurrency(servoraCareEarnings)}
                        </p>

                        <p className="text-xs text-slate-500 mt-1">
                            20% of completed revenue
                        </p>

                    </div>

                    {/* TECHNICIAN PAYOUT */}

                    <div className="rounded-xl bg-white/5 border border-white/10 p-4">

                        <p className="text-xs text-slate-400">
                            Technician Payout
                        </p>

                        <p className="text-xl font-bold text-green-400 mt-2">
                            {formatCurrency(technicianEarnings)}
                        </p>

                        <p className="text-xs text-slate-500 mt-1">
                            80% of completed revenue
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default AdminDashboard;