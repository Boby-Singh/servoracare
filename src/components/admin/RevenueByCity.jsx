import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

function RevenueByCity({ bookings = [] }) {

    /* ==========================================
       GET CITY FROM BOOKING
    ========================================== */

    const getCity = (booking) => {

        // Preferred: separate city field
        if (booking.city?.trim()) {
            return booking.city.trim();
        }

        // Fallback: try to extract city from address
        if (booking.address?.trim()) {

            const parts = booking.address
                .split(",")
                .map((part) => part.trim())
                .filter(Boolean);

            if (parts.length >= 2) {
                return parts[parts.length - 2];
            }

            if (parts.length === 1) {
                return parts[0];
            }
        }

        return "Unknown";
    };

    /* ==========================================
       CALCULATE REVENUE
       ONLY COMPLETED BOOKINGS
    ========================================== */

    const cityRevenue = {};

    bookings
        .filter((booking) => booking.status === "Completed")
        .forEach((booking) => {

            const city = getCity(booking);

            const amount = Number(booking.amount) || 0;

            if (!cityRevenue[city]) {
                cityRevenue[city] = 0;
            }

            cityRevenue[city] += amount;
        });

    /* ==========================================
       CHART DATA
    ========================================== */

    const chartData = Object.entries(cityRevenue)
        .map(([city, revenue]) => ({
            city,
            revenue,
        }))
        .sort((a, b) => b.revenue - a.revenue);

    /* ==========================================
       FORMATTERS
    ========================================== */

    const formatCurrency = (value) => {

        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(value);
    };

    const formatYAxis = (value) => {

        if (value >= 10000000) {
            return `₹${(value / 10000000).toFixed(1)}Cr`;
        }

        if (value >= 100000) {
            return `₹${(value / 100000).toFixed(1)}L`;
        }

        if (value >= 1000) {
            return `₹${(value / 1000).toFixed(1)}K`;
        }

        return `₹${value}`;
    };

    /* ==========================================
       EMPTY STATE
    ========================================== */

    if (chartData.length === 0) {

        return (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

                <div className="px-5 sm:px-6 py-5 border-b border-slate-200">

                    <h3 className="text-lg font-bold text-slate-900">
                        Revenue by City
                    </h3>

                    <p className="text-sm text-slate-500 mt-1">
                        Completed service revenue across cities
                    </p>

                </div>

                <div className="h-[350px] flex flex-col items-center justify-center px-6">

                    <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-2xl">
                        📊
                    </div>

                    <h4 className="text-sm font-semibold text-slate-700 mt-4">
                        No revenue data yet
                    </h4>

                    <p className="text-xs text-slate-400 text-center mt-1 max-w-sm">
                        Revenue will appear here after completed bookings
                        are recorded.
                    </p>

                </div>

            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

            {/* ==========================================
                HEADER
            ========================================== */}

            <div className="px-5 sm:px-6 py-5 border-b border-slate-200">

                <div className="flex items-start justify-between gap-4">

                    <div>
                        <h3 className="text-lg font-bold text-slate-900">
                            Revenue by City
                        </h3>

                        <p className="text-sm text-slate-500 mt-1">
                            Completed service revenue across cities
                        </p>
                    </div>

                    <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-500">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                        Revenue
                    </div>

                </div>

            </div>

            {/* ==========================================
                CHART
            ========================================== */}

            <div className="p-4 sm:p-6">

                <div className="w-full h-[350px]">

                    <ResponsiveContainer width="100%" height="100%">

                        <BarChart
                            data={chartData}
                            margin={{
                                top: 10,
                                right: 10,
                                left: 0,
                                bottom: 55,
                            }}
                            barCategoryGap="25%"
                        >

                            <CartesianGrid
                                strokeDasharray="3 3"
                                vertical={false}
                                stroke="#e2e8f0"
                            />

                            <XAxis
                                dataKey="city"
                                tick={{
                                    fontSize: 11,
                                    fill: "#64748b",
                                }}
                                axisLine={{
                                    stroke: "#cbd5e1",
                                }}
                                tickLine={false}
                                interval={0}
                                angle={
                                    chartData.length > 4
                                        ? -35
                                        : 0
                                }
                                textAnchor={
                                    chartData.length > 4
                                        ? "end"
                                        : "middle"
                                }
                            />

                            <YAxis
                                tick={{
                                    fontSize: 11,
                                    fill: "#64748b",
                                }}
                                axisLine={false}
                                tickLine={false}
                                tickFormatter={formatYAxis}
                                width={65}
                            />

                            <Tooltip
                                cursor={{
                                    fill: "rgba(59, 130, 246, 0.05)",
                                }}
                                formatter={(value) => [
                                    formatCurrency(value),
                                    "Revenue",
                                ]}
                                labelFormatter={(label) =>
                                    `City: ${label}`
                                }
                                contentStyle={{
                                    borderRadius: "12px",
                                    border: "1px solid #e2e8f0",
                                    boxShadow:
                                        "0 10px 25px rgba(15, 23, 42, 0.08)",
                                    padding: "10px 12px",
                                }}
                            />

                            <Bar
                                dataKey="revenue"
                                name="Revenue"
                                fill="#2563eb"
                                radius={[
                                    6,
                                    6,
                                    0,
                                    0,
                                ]}
                                maxBarSize={55}
                            />

                        </BarChart>

                    </ResponsiveContainer>

                </div>

            </div>

        </div>
    );
}

export default RevenueByCity;