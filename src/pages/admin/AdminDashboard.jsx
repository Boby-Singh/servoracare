import React, { useMemo } from "react";

import RevenueByCity from "../../components/admin/RevenueByCity";
import RevenueByTechnician from "../../components/admin/RevenueByTechnician";

function AdminDashboard({ bookings = [] }) {
    // ==========================================
    // COMPLETED BOOKINGS
    // ==========================================

    const completedBookings = useMemo(() => {
        return bookings.filter(
            (booking) => booking.status === "Completed"
        );
    }, [bookings]);

    // ==========================================
    // TOTAL REVENUE
    // ==========================================

    const totalRevenue = useMemo(() => {
        return completedBookings.reduce((total, booking) => {
            return total + Number(booking.amount || 0);
        }, 0);
    }, [completedBookings]);

    // ==========================================
    // TOTAL BOOKINGS
    // ==========================================

    const totalBookings = bookings.length;

    // ==========================================
    // PENDING BOOKINGS
    // ==========================================

    const pendingBookings = bookings.filter(
        (booking) => booking.status === "Pending"
    ).length;

    // ==========================================
    // ACCEPTED BOOKINGS
    // ==========================================

    const acceptedBookings = bookings.filter(
        (booking) => booking.status === "Accepted"
    ).length;

    // ==========================================
    // COMPLETED COUNT
    // ==========================================

    const completedCount = completedBookings.length;

    // ==========================================
    // REJECTED COUNT
    // ==========================================

    const rejectedBookings = bookings.filter(
        (booking) => booking.status === "Rejected"
    ).length;

    // ==========================================
    // AVERAGE BOOKING VALUE
    // ==========================================

    const averageBookingValue =
        completedCount > 0
            ? totalRevenue / completedCount
            : 0;

    // ==========================================
    // FORMAT CURRENCY
    // ==========================================

    const formatCurrency = (value) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0
        }).format(value);
    };

    return (
        <div className="space-y-6">

            {/* ==========================================
                DASHBOARD HEADER
            ========================================== */}

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                        Business Analytics
                    </h2>

                    <p className="text-sm text-slate-500 mt-1">
                        Monitor revenue, bookings and technician performance
                    </p>
                </div>

                <div className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl shadow-sm">

                    <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>

                    <span className="text-sm font-medium text-slate-600">
                        Live Data
                    </span>

                </div>

            </div>


            {/* ==========================================
                REVENUE STATISTICS
            ========================================== */}

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

                {/* TOTAL REVENUE */}

                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">

                    <div className="flex items-center justify-between">

                        <div>
                            <p className="text-sm font-medium text-slate-500">
                                Total Revenue
                            </p>

                            <h3 className="text-2xl font-bold text-slate-900 mt-2">
                                {formatCurrency(totalRevenue)}
                            </h3>
                        </div>

                        <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center">
                            <span className="text-xl">
                                ₹
                            </span>
                        </div>

                    </div>

                    <p className="text-xs text-slate-400 mt-4">
                        From completed bookings
                    </p>

                </div>


                {/* TOTAL BOOKINGS */}

                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">

                    <div className="flex items-center justify-between">

                        <div>
                            <p className="text-sm font-medium text-slate-500">
                                Total Bookings
                            </p>

                            <h3 className="text-2xl font-bold text-slate-900 mt-2">
                                {totalBookings}
                            </h3>
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


                {/* COMPLETED JOBS */}

                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">

                    <div className="flex items-center justify-between">

                        <div>
                            <p className="text-sm font-medium text-slate-500">
                                Completed Jobs
                            </p>

                            <h3 className="text-2xl font-bold text-green-600 mt-2">
                                {completedCount}
                            </h3>
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


                {/* AVERAGE VALUE */}

                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">

                    <div className="flex items-center justify-between">

                        <div>
                            <p className="text-sm font-medium text-slate-500">
                                Average Job Value
                            </p>

                            <h3 className="text-2xl font-bold text-blue-600 mt-2">
                                {formatCurrency(averageBookingValue)}
                            </h3>
                        </div>

                        <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                            <span className="text-xl">
                                📈
                            </span>
                        </div>

                    </div>

                    <p className="text-xs text-slate-400 mt-4">
                        Average completed booking
                    </p>

                </div>

            </div>


            {/* ==========================================
                BOOKING STATUS SUMMARY
            ========================================== */}

            <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm">

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">

                    <div>
                        <h3 className="text-lg font-bold text-slate-900">
                            Booking Overview
                        </h3>

                        <p className="text-sm text-slate-500 mt-1">
                            Current status of all service requests
                        </p>
                    </div>

                </div>


                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                    {/* Pending */}

                    <div className="rounded-xl bg-yellow-50 border border-yellow-100 p-4">

                        <p className="text-xs font-semibold text-yellow-700 uppercase">
                            Pending
                        </p>

                        <p className="text-2xl font-bold text-yellow-700 mt-1">
                            {pendingBookings}
                        </p>

                    </div>


                    {/* Accepted */}

                    <div className="rounded-xl bg-blue-50 border border-blue-100 p-4">

                        <p className="text-xs font-semibold text-blue-700 uppercase">
                            Accepted
                        </p>

                        <p className="text-2xl font-bold text-blue-700 mt-1">
                            {acceptedBookings}
                        </p>

                    </div>


                    {/* Completed */}

                    <div className="rounded-xl bg-green-50 border border-green-100 p-4">

                        <p className="text-xs font-semibold text-green-700 uppercase">
                            Completed
                        </p>

                        <p className="text-2xl font-bold text-green-700 mt-1">
                            {completedCount}
                        </p>

                    </div>


                    {/* Rejected */}

                    <div className="rounded-xl bg-red-50 border border-red-100 p-4">

                        <p className="text-xs font-semibold text-red-700 uppercase">
                            Rejected
                        </p>

                        <p className="text-2xl font-bold text-red-700 mt-1">
                            {rejectedBookings}
                        </p>

                    </div>

                </div>

            </div>


            {/* ==========================================
                REVENUE BY CITY
            ========================================== */}

            <RevenueByCity bookings={bookings} />


            {/* ==========================================
                REVENUE BY TECHNICIAN
            ========================================== */}

            <RevenueByTechnician bookings={bookings} />


            {/* ==========================================
                FOOTER INFO
            ========================================== */}

            <div className="text-center py-4">

                <p className="text-xs text-slate-400">
                    Revenue is calculated from completed bookings only.
                </p>

            </div>

        </div>
    );
}

export default AdminDashboard;