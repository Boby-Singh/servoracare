import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

function RevenueByTechnician({ bookings = [] }) {

    /* ==========================================
       CALCULATE TECHNICIAN REVENUE
       ONLY COMPLETED BOOKINGS
    ========================================== */

    const technicianRevenue = {};

    bookings
        .filter((booking) => booking.status === "Completed")
        .forEach((booking) => {

            const technician =
                booking.technician_name?.trim() ||
                "Unassigned";

            const amount =
                Number(booking.amount) || 0;

            if (!technicianRevenue[technician]) {
                technicianRevenue[technician] = 0;
            }

            technicianRevenue[technician] += amount;
        });

    /* ==========================================
       CHART DATA
    ========================================== */

    const chartData = Object.entries(technicianRevenue)
        .map(([technician, revenue]) => ({
            technician,
            revenue,
        }))
        .sort((a, b) => b.revenue - a.revenue);

    /* ==========================================
       FORMAT CURRENCY
    ========================================== */

    const formatCurrency = (value) => {

        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(value);
    };

    /* ==========================================
       FORMAT Y AXIS
    ========================================== */

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
       SHORTEN TECHNICIAN NAME FOR X AXIS
    ========================================== */

    const shortenName = (name) => {

        if (name.length <= 14) {
            return name;
        }

        const parts = name.split(" ");

        if (parts.length >= 2) {
            return `${parts[0]} ${parts[1].charAt(0)}.`;
        }

        return `${name.substring(0, 12)}...`;
    };

    const formattedChartData = chartData.map((item) => ({
        ...item,
        displayName: shortenName(item.technician),
    }));

    /* ==========================================
       EMPTY STATE
    ========================================== */

    if (chartData.length === 0) {

        return (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

                <div className="px-5 sm:px-6 py-5 border-b border-slate-200">

                    <h3 className="text-lg font-bold text-slate-900">
                        Revenue by Technician
                    </h3>

                    <p className="text-sm text-slate-500 mt-1">
                        Technician performance based on completed services
                    </p>

                </div>

                <div className="h-[350px] flex flex-col items-center justify-center px-6">

                    <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-2xl">
                        👨‍🔧
                    </div>

                    <h4 className="text-sm font-semibold text-slate-700 mt-4">
                        No technician revenue yet
                    </h4>

                    <p className="text-xs text-slate-400 text-center mt-1 max-w-sm">
                        Technician revenue will appear after assigned
                        services are completed.
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
                            Revenue by Technician
                        </h3>

                        <p className="text-sm text-slate-500 mt-1">
                            Technician performance from completed services
                        </p>
                    </div>

                    <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-500">
                        <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
                        Revenue
                    </div>

                </div>

            </div>

            {/* ==========================================
                CHART
            ========================================== */}

            <div className="p-4 sm:p-6">

                <div className="w-full h-[350px]">

                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >

                        <BarChart
                            data={formattedChartData}
                            margin={{
                                top: 10,
                                right: 10,
                                left: 0,
                                bottom: 65,
                            }}
                            barCategoryGap="25%"
                        >

                            <CartesianGrid
                                strokeDasharray="3 3"
                                vertical={false}
                                stroke="#e2e8f0"
                            />

                            <XAxis
                                dataKey="displayName"
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
                                    formattedChartData.length > 3
                                        ? -35
                                        : 0
                                }
                                textAnchor={
                                    formattedChartData.length > 3
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
                                    fill: "rgba(79, 70, 229, 0.05)",
                                }}
                                formatter={(value) => [
                                    formatCurrency(value),
                                    "Revenue",
                                ]}
                                labelFormatter={(label, payload) => {

                                    const original =
                                        payload?.[0]?.payload?.technician;

                                    return `Technician: ${
                                        original || label
                                    }`;
                                }}
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
                                fill="#4f46e5"
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

export default RevenueByTechnician;