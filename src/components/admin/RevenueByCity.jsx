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

function RevenueByCity({ bookings = [] }) {

    // ==========================================
    // PROCESS CITY REVENUE
    // ==========================================

    const cityData = useMemo(() => {

        const cityMap = {};

        bookings
            .filter(
                (booking) =>
                    booking.status === "Completed"
            )
            .forEach((booking) => {

                let city = "Unknown";

                if (booking.address) {

                    const parts = booking.address
                        .split(",")
                        .map((part) => part.trim())
                        .filter(Boolean);

                    /*
                     * Assumption:
                     *
                     * Customer address:
                     *
                     * House, Area, City, State, PIN
                     *
                     * City is normally third-last/second-last
                     * depending on the address format.
                     */

                    if (parts.length >= 3) {
                        city = parts[parts.length - 3];
                    } else if (parts.length >= 2) {
                        city = parts[parts.length - 2];
                    } else if (parts.length === 1) {
                        city = parts[0];
                    }

                }

                city = city || "Unknown";

                if (!cityMap[city]) {

                    cityMap[city] = {
                        city,
                        revenue: 0,
                        bookings: 0
                    };

                }

                cityMap[city].revenue += Number(
                    booking.amount || 0
                );

                cityMap[city].bookings += 1;

            });

        return Object.values(cityMap)
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

    if (cityData.length === 0) {

        return (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">

                <div className="mb-6">

                    <h3 className="text-lg font-bold text-slate-900">
                        Revenue by City
                    </h3>

                    <p className="text-sm text-slate-500 mt-1">
                        Revenue generated from completed services
                    </p>

                </div>

                <div className="h-72 flex items-center justify-center">

                    <div className="text-center">

                        <div className="text-4xl mb-3">
                            📊
                        </div>

                        <p className="text-sm font-medium text-slate-600">
                            No completed bookings yet
                        </p>

                        <p className="text-xs text-slate-400 mt-1">
                            City revenue will appear here
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
                        Revenue by City
                    </h3>

                    <p className="text-sm text-slate-500 mt-1">
                        Top cities by completed service revenue
                    </p>

                </div>

                <div className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-xs font-semibold">
                    Top {cityData.length} Cities
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
                        data={cityData}
                        margin={{
                            top: 10,
                            right: 20,
                            left: 10,
                            bottom: 10
                        }}
                    >

                        <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                        />

                        <XAxis
                            dataKey="city"
                            tick={{
                                fontSize: 12
                            }}
                            axisLine={false}
                            tickLine={false}
                        />

                        <YAxis
                            tick={{
                                fontSize: 12
                            }}
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={(value) =>
                                `₹${value}`
                            }
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
                                `City: ${label}`
                            }
                        />

                        <Bar
                            dataKey="revenue"
                            name="Revenue"
                            radius={[
                                8,
                                8,
                                0,
                                0
                            ]}
                            maxBarSize={55}
                        >

                            {cityData.map(
                                (entry, index) => (
                                    <Cell
                                        key={`city-${index}`}
                                    />
                                )
                            )}

                        </Bar>

                    </BarChart>

                </ResponsiveContainer>

            </div>


            {/* ==========================================
                CITY SUMMARY
            ========================================== */}

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">

                {cityData.slice(0, 6).map((city) => (

                    <div
                        key={city.city}
                        className="border border-slate-100 rounded-xl p-3 bg-slate-50"
                    >

                        <div className="flex items-center justify-between">

                            <span className="text-sm font-semibold text-slate-700 truncate">
                                {city.city}
                            </span>

                            <span className="text-xs text-slate-400">
                                {city.bookings} job
                                {city.bookings !== 1 ? "s" : ""}
                            </span>

                        </div>

                        <p className="text-sm font-bold text-slate-900 mt-1">
                            {formatCurrency(city.revenue)}
                        </p>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default RevenueByCity;