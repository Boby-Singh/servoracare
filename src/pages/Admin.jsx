import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../layouts/AdminLayout";

const API = import.meta.env.VITE_API_URL;

function Admin() {

    const [bookings, setBookings] = useState([]);
    const [technicians, setTechnicians] = useState([]);

    const [selectedTechnician, setSelectedTechnician] = useState({});
    const [visitDate, setVisitDate] = useState({});
    const [visitTime, setVisitTime] = useState({});
    const [loading, setLoading] = useState(true);
    const [assigning, setAssigning] = useState({});


    // ==========================================
    // FETCH BOOKINGS
    // ==========================================

const fetchBookings = async () => {
    try {
        setLoading(true);

        const response = await axios.get(
            `${API}/api/all-bookings`
        );

        setBookings(response.data);

    } catch (error) {
        console.error(
            "Fetch Bookings Error:",
            error
        );
    } finally {
        setLoading(false);
    }
};


    // ==========================================
    // FETCH TECHNICIANS
    // ==========================================

    const fetchTechnicians = async () => {

        try {

            const response = await axios.get(
                `${API}/api/admin/technicians`
            );

            setTechnicians(response.data);

        } catch (error) {

            console.error(
                "Fetch Technicians Error:",
                error
            );

        }

    };


    // ==========================================
    // LOAD DATA
    // ==========================================

    useEffect(() => {

        fetchBookings();
        fetchTechnicians();

    }, []);


    // ==========================================
    // SELECT TECHNICIAN
    // ==========================================

    const assignTechnician = (
        mongoBookingId,
        technicianId
    ) => {

        setSelectedTechnician((prev) => ({

            ...prev,

            [mongoBookingId]:
                technicianId

        }));

    };


    // ==========================================
    // UPDATE STATUS
    // ==========================================

    const updateStatus = async (
        mongoBookingId,
        status
    ) => {

        try {

            await axios.put(

                `${API}/api/update-status/${mongoBookingId}`,

                {
                    status
                }

            );

            fetchBookings();

        } catch (error) {

            console.error(
                "Update Status Error:",
                error
            );

        }

    };


    // ==========================================
    // SCHEDULE VISIT
    // ==========================================

const scheduleVisit = async (
    bookingNumber,
    mongoBookingId
) => {

    const technicianId =
        selectedTechnician[mongoBookingId];

    const date =
        visitDate[mongoBookingId];

    const time =
        visitTime[mongoBookingId];

    if (!technicianId) {
        alert("Please select technician");
        return;
    }

    if (!date) {
        alert("Please select visit date");
        return;
    }

    if (!time) {
        alert("Please select visit time");
        return;
    }

    try {

        setAssigning((prev) => ({
            ...prev,
            [mongoBookingId]: true
        }));

        await axios.put(
            `${API}/api/admin/assign-technician/${bookingNumber}`,
            {
                technician_id: technicianId,
                visit_date: date,
                visit_time: time
            }
        );

        alert("Visit Scheduled Successfully");

        await fetchBookings();

    } catch (error) {

        console.error(
            "Assignment Error:",
            error
        );

        alert(
            error.response?.data?.message ||
            "Assignment Failed"
        );

    } finally {

        setAssigning((prev) => ({
            ...prev,
            [mongoBookingId]: false
        }));
    }
};


return (
    <AdminLayout>

        <div className="min-h-screen bg-slate-50">

            {/* ==========================================
                PAGE HEADER
            ========================================== */}

            <div className="bg-white border-b border-slate-200">

                <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-6">

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                        <div>

                            <div className="flex items-center gap-3">

                                <div className="w-11 h-11 rounded-xl bg-blue-900 flex items-center justify-center shadow-sm">
                                    <span className="text-white text-xl">
                                        ⚙️
                                    </span>
                                </div>

                                <div>
                                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                                        Admin Dashboard
                                    </h1>

                                    <p className="text-sm text-slate-500 mt-1">
                                        Manage bookings, technicians and service visits
                                    </p>
                                </div>

                            </div>

                        </div>

                        <div className="flex items-center gap-2">

                            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full">

                                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>

                                <span className="text-sm font-medium text-green-700">
                                    System Online
                                </span>

                            </div>

                        </div>

                    </div>

                </div>

            </div>


            {/* ==========================================
                MAIN CONTENT
            ========================================== */}

            <main className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">


                {/* ==========================================
                    STATISTICS
                ========================================== */}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">


                    {/* TOTAL */}

                    <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm hover:shadow-md transition">

                        <div className="flex items-start justify-between">

                            <div>

                                <p className="text-sm font-medium text-slate-500">
                                    Total Bookings
                                </p>

                                <p className="text-3xl font-bold text-slate-900 mt-2">
                                    {bookings.length}
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

                    <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm hover:shadow-md transition">

                        <div className="flex items-start justify-between">

                            <div>

                                <p className="text-sm font-medium text-slate-500">
                                    Pending
                                </p>

                                <p className="text-3xl font-bold text-yellow-500 mt-2">
                                    {
                                        bookings.filter(
                                            (booking) =>
                                                booking.status === "Pending"
                                        ).length
                                    }
                                </p>

                            </div>

                            <div className="w-11 h-11 rounded-xl bg-yellow-50 flex items-center justify-center">

                                <span className="text-xl">
                                    ⏳
                                </span>

                            </div>

                        </div>

                        <p className="text-xs text-slate-400 mt-4">
                            Awaiting assignment
                        </p>

                    </div>


                    {/* ACCEPTED */}

                    <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm hover:shadow-md transition">

                        <div className="flex items-start justify-between">

                            <div>

                                <p className="text-sm font-medium text-slate-500">
                                    Accepted
                                </p>

                                <p className="text-3xl font-bold text-blue-600 mt-2">
                                    {
                                        bookings.filter(
                                            (booking) =>
                                                booking.status === "Accepted"
                                        ).length
                                    }
                                </p>

                            </div>

                            <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">

                                <span className="text-xl">
                                    🔧
                                </span>

                            </div>

                        </div>

                        <p className="text-xs text-slate-400 mt-4">
                            Technician assigned
                        </p>

                    </div>


                    {/* COMPLETED */}

                    <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm hover:shadow-md transition">

                        <div className="flex items-start justify-between">

                            <div>

                                <p className="text-sm font-medium text-slate-500">
                                    Completed
                                </p>

                                <p className="text-3xl font-bold text-green-600 mt-2">
                                    {
                                        bookings.filter(
                                            (booking) =>
                                                booking.status === "Completed"
                                        ).length
                                    }
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

                </div>


                {/* ==========================================
                    BOOKINGS SECTION
                ========================================== */}

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">


                    {/* SECTION HEADER */}

                    <div className="px-5 sm:px-6 py-5 border-b border-slate-200">

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                            <div>

                                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                                    Service Bookings
                                </h2>

                                <p className="text-sm text-slate-500 mt-1">
                                    Review and manage customer service requests
                                </p>

                            </div>

                            <div className="text-sm text-slate-500">

                                {bookings.length} booking
                                {bookings.length !== 1 ? "s" : ""}

                            </div>

                        </div>

                    </div>


                    {/* ==========================================
                        LOADING
                    ========================================== */}

                    {loading ? (

                        <div className="flex flex-col items-center justify-center py-20">

                            <div className="w-10 h-10 border-4 border-blue-100 border-t-blue-700 rounded-full animate-spin"></div>

                            <p className="text-sm text-slate-500 mt-4">
                                Loading bookings...
                            </p>

                        </div>

                    ) : bookings.length === 0 ? (

                        /* ==========================================
                            EMPTY
                        ========================================== */

                        <div className="text-center py-20 px-6">

                            <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-100 flex items-center justify-center text-2xl">
                                📋
                            </div>

                            <h3 className="text-lg font-semibold text-slate-900 mt-5">
                                No bookings yet
                            </h3>

                            <p className="text-sm text-slate-500 mt-2">
                                New customer service requests will appear here.
                            </p>

                        </div>

                    ) : (

                        /* ==========================================
                            DESKTOP TABLE
                        ========================================== */

                        <div className="overflow-x-auto">

                            <table className="w-full min-w-[1400px]">

                                <thead className="bg-slate-50 border-b border-slate-200">

                                    <tr>

                                        <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                                            Booking
                                        </th>

                                        <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                                            Customer
                                        </th>

                                        <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                                            Service
                                        </th>

                                        <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                                            Created
                                        </th>

                                        <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                                            Status
                                        </th>

                                        <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                                            Technician
                                        </th>

                                        <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                                            Action
                                        </th>

                                    </tr>

                                </thead>


                                <tbody className="divide-y divide-slate-100">

                                    {bookings.map((booking) => {

                                        const mongoBookingId =
                                            booking._id;

                                        const bookingNumber =
                                            booking.booking_id;

                                        const isAssigning =
                                            assigning[mongoBookingId];

                                        return (

                                            <tr
                                                key={mongoBookingId}
                                                className="hover:bg-slate-50/70 transition"
                                            >


                                                {/* BOOKING */}

                                                <td className="px-5 py-5">

                                                    <div className="font-bold text-blue-900">
                                                        #{bookingNumber}
                                                    </div>

                                                    <div className="text-xs text-slate-400 mt-1">
                                                        Service Request
                                                    </div>

                                                </td>


                                                {/* CUSTOMER */}

                                                <td className="px-5 py-5">

                                                    <div className="font-semibold text-slate-900">
                                                        {booking.full_name}
                                                    </div>

                                                    <div className="text-sm text-slate-500 mt-1">
                                                        {booking.phone}
                                                    </div>

                                                    <div className="text-xs text-slate-400 mt-1 max-w-[220px] truncate">
                                                        {booking.address}
                                                    </div>

                                                </td>


                                                {/* SERVICE */}

                                                <td className="px-5 py-5">

                                                    <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-sm font-semibold">
                                                        {booking.service_type}
                                                    </span>

                                                </td>


                                                {/* DATE */}

                                                <td className="px-5 py-5">

                                                    <div className="text-sm font-medium text-slate-700">
                                                        {booking.created_at
                                                            ? new Date(
                                                                booking.created_at
                                                            ).toLocaleDateString()
                                                            : "-"
                                                        }
                                                    </div>

                                                    <div className="text-xs text-slate-400 mt-1">
                                                        {booking.created_at
                                                            ? new Date(
                                                                booking.created_at
                                                            ).toLocaleTimeString([], {
                                                                hour: "2-digit",
                                                                minute: "2-digit"
                                                            })
                                                            : ""
                                                        }
                                                    </div>

                                                </td>


                                                {/* STATUS */}

                                                <td className="px-5 py-5">

                                                    <span
                                                        className={`
                                                            inline-flex
                                                            items-center
                                                            gap-2
                                                            px-3
                                                            py-1.5
                                                            rounded-full
                                                            text-xs
                                                            font-bold
                                                            ${
                                                                booking.status === "Pending"
                                                                    ? "bg-yellow-50 text-yellow-700"
                                                                    : booking.status === "Accepted"
                                                                    ? "bg-blue-50 text-blue-700"
                                                                    : booking.status === "Completed"
                                                                    ? "bg-green-50 text-green-700"
                                                                    : "bg-red-50 text-red-700"
                                                            }
                                                        `}
                                                    >

                                                        <span
                                                            className={`
                                                                w-1.5
                                                                h-1.5
                                                                rounded-full
                                                                ${
                                                                    booking.status === "Pending"
                                                                        ? "bg-yellow-500"
                                                                        : booking.status === "Accepted"
                                                                        ? "bg-blue-500"
                                                                        : booking.status === "Completed"
                                                                        ? "bg-green-500"
                                                                        : "bg-red-500"
                                                                }
                                                            `}
                                                        />

                                                        {booking.status}

                                                    </span>

                                                </td>


                                                {/* TECHNICIAN */}

                                                <td className="px-5 py-5">

                                                    {booking.status === "Pending" ? (

                                                        <div className="space-y-2 w-[210px]">

                                                            <select
                                                                value={
                                                                    selectedTechnician[
                                                                        mongoBookingId
                                                                    ] || ""
                                                                }
                                                                onChange={(e) =>
                                                                    assignTechnician(
                                                                        mongoBookingId,
                                                                        e.target.value
                                                                    )
                                                                }
                                                                className="
                                                                    w-full
                                                                    border
                                                                    border-slate-200
                                                                    rounded-lg
                                                                    px-3
                                                                    py-2
                                                                    text-sm
                                                                    outline-none
                                                                    focus:ring-2
                                                                    focus:ring-blue-500/20
                                                                    focus:border-blue-500
                                                                    bg-white
                                                                "
                                                            >

                                                                <option value="">
                                                                    Select technician
                                                                </option>

                                                                {technicians.map(
                                                                    (tech) => (

                                                                        <option
                                                                            key={tech._id}
                                                                            value={tech._id}
                                                                        >
                                                                            {tech.name}
                                                                        </option>

                                                                    )
                                                                )}

                                                            </select>


                                                            <div className="grid grid-cols-2 gap-2">

                                                                <input
                                                                    type="date"
                                                                    value={
                                                                        visitDate[
                                                                            mongoBookingId
                                                                        ] || ""
                                                                    }
                                                                    onChange={(e) =>
                                                                        setVisitDate(
                                                                            (prev) => ({
                                                                                ...prev,
                                                                                [mongoBookingId]:
                                                                                    e.target.value
                                                                            })
                                                                        )
                                                                    }
                                                                    className="
                                                                        w-full
                                                                        border
                                                                        border-slate-200
                                                                        rounded-lg
                                                                        px-2
                                                                        py-2
                                                                        text-xs
                                                                        focus:ring-2
                                                                        focus:ring-blue-500/20
                                                                        focus:border-blue-500
                                                                        outline-none
                                                                    "
                                                                />

                                                                <input
                                                                    type="time"
                                                                    value={
                                                                        visitTime[
                                                                            mongoBookingId
                                                                        ] || ""
                                                                    }
                                                                    onChange={(e) =>
                                                                        setVisitTime(
                                                                            (prev) => ({
                                                                                ...prev,
                                                                                [mongoBookingId]:
                                                                                    e.target.value
                                                                            })
                                                                        )
                                                                    }
                                                                    className="
                                                                        w-full
                                                                        border
                                                                        border-slate-200
                                                                        rounded-lg
                                                                        px-2
                                                                        py-2
                                                                        text-xs
                                                                        focus:ring-2
                                                                        focus:ring-blue-500/20
                                                                        focus:border-blue-500
                                                                        outline-none
                                                                    "
                                                                />

                                                            </div>

                                                        </div>

                                                    ) : (

                                                        <div>

                                                            <div className="font-semibold text-slate-800">
                                                                {booking.technician_name ||
                                                                    "Not Assigned"}
                                                            </div>

                                                            {booking.technician_phone && (

                                                                <div className="text-sm text-slate-500 mt-1">
                                                                    {booking.technician_phone}
                                                                </div>

                                                            )}

                                                        </div>

                                                    )}

                                                </td>


                                                {/* ACTION */}

                                                <td className="px-5 py-5">

                                                    {booking.status === "Pending" && (

                                                        <div className="flex flex-col gap-2 w-[145px]">

                                                            <button
                                                                disabled={isAssigning}
                                                                onClick={() =>
                                                                    scheduleVisit(
                                                                        bookingNumber,
                                                                        mongoBookingId
                                                                    )
                                                                }
                                                                className="
                                                                    bg-blue-700
                                                                    hover:bg-blue-800
                                                                    disabled:bg-blue-300
                                                                    text-white
                                                                    px-4
                                                                    py-2.5
                                                                    rounded-lg
                                                                    text-sm
                                                                    font-semibold
                                                                    transition
                                                                "
                                                            >

                                                                {isAssigning
                                                                    ? "Assigning..."
                                                                    : "Assign & Accept"
                                                                }

                                                            </button>


                                                            <button
                                                                onClick={() =>
                                                                    updateStatus(
                                                                        mongoBookingId,
                                                                        "Rejected"
                                                                    )
                                                                }
                                                                className="
                                                                    border
                                                                    border-red-200
                                                                    text-red-600
                                                                    hover:bg-red-50
                                                                    px-4
                                                                    py-2.5
                                                                    rounded-lg
                                                                    text-sm
                                                                    font-semibold
                                                                    transition
                                                                "
                                                            >
                                                                Reject
                                                            </button>

                                                        </div>

                                                    )}


                                                    {booking.status === "Accepted" && (

                                                        <button
                                                            onClick={() =>
                                                                updateStatus(
                                                                    mongoBookingId,
                                                                    "Completed"
                                                                )
                                                            }
                                                            className="
                                                                bg-green-600
                                                                hover:bg-green-700
                                                                text-white
                                                                px-4
                                                                py-2.5
                                                                rounded-lg
                                                                text-sm
                                                                font-semibold
                                                                transition
                                                            "
                                                        >
                                                            Mark Completed
                                                        </button>

                                                    )}


                                                    {(booking.status === "Completed" ||
                                                        booking.status === "Rejected") && (

                                                        <span
                                                            className={`
                                                                inline-flex
                                                                items-center
                                                                px-3
                                                                py-2
                                                                rounded-lg
                                                                text-xs
                                                                font-bold
                                                                ${
                                                                    booking.status === "Completed"
                                                                        ? "bg-green-50 text-green-700"
                                                                        : "bg-red-50 text-red-700"
                                                                }
                                                            `}
                                                        >
                                                            ✓ {booking.status}
                                                        </span>

                                                    )}

                                                </td>

                                            </tr>

                                        );

                                    })}

                                </tbody>

                            </table>

                        </div>

                    )}

                </div>

            </main>

        </div>

    </AdminLayout>
);

}

export default Admin;