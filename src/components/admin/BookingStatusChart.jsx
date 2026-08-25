// src/components/admin/BookingStatusChart.jsx

import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend
} from "recharts";

function BookingStatusChart({ bookings = [] }) {

    const data = [
        {
            name: "Pending",
            value: bookings.filter(
                booking => booking.status === "Pending"
            ).length
        },
        {
            name: "Accepted",
            value: bookings.filter(
                booking => booking.status === "Accepted"
            ).length
        },
        {
            name: "Completed",
            value: bookings.filter(
                booking => booking.status === "Completed"
            ).length
        },
        {
            name: "Rejected",
            value: bookings.filter(
                booking => booking.status === "Rejected"
            ).length
        }
    ].filter(item => item.value > 0);

    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

            <div className="mb-4">

                <h2 className="text-lg font-bold text-slate-900">
                    Booking Status
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                    Current booking distribution
                </p>

            </div>

            <div className="h-[320px]">

                {data.length === 0 ? (

                    <div className="h-full flex items-center justify-center text-sm text-slate-400">
                        No booking data available
                    </div>

                ) : (

                    <ResponsiveContainer width="100%" height="100%">

                        <PieChart>

                            <Pie
                                data={data}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="45%"
                                innerRadius={70}
                                outerRadius={105}
                                paddingAngle={3}
                            >

                                {data.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                    />
                                ))}

                            </Pie>

                            <Tooltip />

                            <Legend />

                        </PieChart>

                    </ResponsiveContainer>

                )}

            </div>

        </div>
    );
}

export default BookingStatusChart;