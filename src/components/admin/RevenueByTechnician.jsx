import React, { useMemo } from "react";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from "recharts";

function RevenueByTechnician({ bookings = [] }) {

    // ==========================================
    // PROCESS TECHNICIAN REVENUE
    // ==========================================

    const technicianData = useMemo(() => {

        const technicianMap = {};

        bookings
            .filter(
                (booking) =>
                    booking.status === "Completed"
            )
            .forEach((booking) => {

                const technician =
                    booking.technician_name?.trim() ||
                    "Unassigned";

                if (!technicianMap[technician]) {

                    technicianMap[technician] = {
                        technician,
                        revenue: 0,
                        bookings: 0
                    };

                }

                technicianMap[technician].revenue += Number(
                    booking.amount || 0
                );

                technicianMap[technician].bookings += 1;

            });


        return Object.values(technicianMap)
            .sort(
                (a, b) =>
                    b.revenue - a.revenue
            )
            .slice(0, 10);

    }, [bookings]);


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


    // ==========================================
    // EMPTY STATE
    // ==========================================

    if (technicianData.length === 0) {

        return (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">

                <div className="mb-6">

                    <h3 className="text-lg font-bold text-slate-900">
                        Revenue by Technician
                    </h3>

                    <p className="text-sm text-slate-500 mt-1">
                        Technician contribution based on completed services
                    </p>

                </div>


                <div className="h-72 flex items-center justify-center">

                    <div className="text-center">

                        <div className="text-4xl mb-3">
                            🔧
                        </div>

                        <p className="text-sm font-medium text-slate-600">
                            No technician revenue yet
                        </p>

                        <p className="text-xs text-slate-400 mt-1">
                            Completed technician jobs will appear here
                        </p>

                    </div>

                </div>

            </div>
        );

    }


    return (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm">

            {/* ==========================================
                HEADER
            ========================================== */}

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">

                <div>

                    <h3 className="text-lg font-bold text-slate-900">
                        Revenue by Technician
                    </h3>

                    <p className="text-sm text-slate-500 mt-1">
                        Top technicians by completed service revenue
                    </p>

                </div>

                <div className="px-3 py-1.5 rounded-lg bg-green-50 text-green-700 text-xs font-semibold">
                    Top {technicianData.length} Technicians
                </div>

            </div>


            {/* ==========================================
                CHART
            ========================================== */}

            <div className="w-full h-[360px]">

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >

                    <BarChart
                        data={technicianData}
                        layout="vertical"
                        margin={{
                            top: 10,
                            right: 30,
                            left: 20,
                            bottom: 10
                        }}
                    >

                        <CartesianGrid
                            strokeDasharray="3 3"
                            horizontal={false}
                        />

                        <XAxis
                            type="number"
                            tick={{
                                fontSize: 12
                            }}
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={(value) =>
                                `₹${value}`
                            }
                        />

                        <YAxis
                            type="category"
                            dataKey="technician"
                            width={120}
                            tick={{
                                fontSize: 12
                            }}
                            axisLine={false}
                            tickLine={false}
                        />

                        <Tooltip
                            cursor={{
                                fill: "rgba(15, 23, 42, 0.04)"
                            }}
                            formatter={(value, name) => {

                                if (name === "revenue") {
                                    return [
                                        formatCurrency(value),
                                        "Revenue"
                                    ];
                                }

                                return [
                                    value,
                                    "Bookings"
                                ];

                            }}
                            labelFormatter={(label) =>
                                `Technician: ${label}`
                            }
                        />

                        <Bar
                            dataKey="revenue"
                            name="Revenue"
                            radius={[
                                0,
                                8,
                                8,
                                0
                            ]}
                            maxBarSize={35}
                        >

                            {technicianData.map(
                                (entry, index) => (
                                    <Cell
                                        key={`technician-${index}`}
                                    />
                                )
                            )}

                        </Bar>

                    </BarChart>

                </ResponsiveContainer>

            </div>


            {/* ==========================================
                TECHNICIAN SUMMARY
            ========================================== */}

            <div className="mt-6 overflow-x-auto">

                <div className="min-w-[500px]">

                    <div className="grid grid-cols-3 px-4 py-3 bg-slate-50 rounded-lg text-xs font-bold uppercase tracking-wider text-slate-500">

                        <span>
                            Technician
                        </span>

                        <span className="text-center">
                            Jobs
                        </span>

                        <span className="text-right">
                            Revenue
                        </span>

                    </div>


                    <div className="divide-y divide-slate-100">

                        {technicianData.map(
                            (technician, index) => (

                                <div
                                    key={technician.technician}
                                    className="grid grid-cols-3 items-center px-4 py-3"
                                >

                                    <div className="flex items-center gap-3">

                                        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-xs font-bold text-blue-700">
                                            {index + 1}
                                        </div>

                                        <span className="text-sm font-semibold text-slate-700 truncate">
                                            {technician.technician}
                                        </span>

                                    </div>


                                    <div className="text-center text-sm text-slate-500">
                                        {technician.bookings}
                                    </div>


                                    <div className="text-right text-sm font-bold text-slate-900">
                                        {formatCurrency(
                                            technician.revenue
                                        )}
                                    </div>

                                </div>

                            )
                        )}

                    </div>

                </div>

            </div>

        </div>
    );
}

export default RevenueByTechnician;