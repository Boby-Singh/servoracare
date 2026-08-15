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


    // ==========================================
    // FETCH BOOKINGS
    // ==========================================

    const fetchBookings = async () => {

        try {

            const response = await axios.get(
                `${API}/api/all-bookings`
            );

            setBookings(response.data);

        } catch (error) {

            console.error(
                "Fetch Bookings Error:",
                error
            );

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

            alert(
                "Please select technician"
            );

            return;

        }


        if (!date) {

            alert(
                "Please select visit date"
            );

            return;

        }


        if (!time) {

            alert(
                "Please select visit time"
            );

            return;

        }


        try {

            console.log(
                "Assigning MongoDB Booking:",
                mongoBookingId
            );

            console.log(
                "Technician:",
                technicianId
            );


           await axios.put(
               `${API}/api/admin/assign-technician/${bookingNumber}`,

                {

                    technician_id:
                        technicianId,

                    visit_date:
                        date,

                    visit_time:
                        time

                }

            );


            alert(
                "Visit Scheduled Successfully"
            );


            fetchBookings();


        } catch (error) {

            console.error(
                "Assignment Error:",
                error
            );


            alert(

                error.response?.data?.message ||

                "Assignment Failed"

            );

        }

    };


    return (

        <AdminLayout>

            <div className="min-h-screen bg-gray-100 p-8">


                {/* ==========================================
                    HEADER
                ========================================== */}

                <div className="flex justify-between items-center mb-10">

                    <h1 className="text-5xl font-bold text-blue-900">

                        Admin Dashboard

                    </h1>

                </div>


                {/* ==========================================
                    DASHBOARD CARDS
                ========================================== */}

                <div className="grid md:grid-cols-3 gap-6 mb-10">


                    {/* TOTAL */}

                    <div className="bg-white p-6 rounded-2xl shadow-md">

                        <h2 className="text-gray-500 text-lg">

                            Total Bookings

                        </h2>

                        <p className="text-4xl font-bold text-blue-900 mt-3">

                            {bookings.length}

                        </p>

                    </div>


                    {/* PENDING */}

                    <div className="bg-white p-6 rounded-2xl shadow-md">

                        <h2 className="text-gray-500 text-lg">

                            Pending

                        </h2>

                        <p className="text-4xl font-bold text-yellow-500 mt-3">

                            {
                                bookings.filter(

                                    (booking) =>
                                        booking.status ===
                                        "Pending"

                                ).length
                            }

                        </p>

                    </div>


                    {/* COMPLETED */}

                    <div className="bg-white p-6 rounded-2xl shadow-md">

                        <h2 className="text-gray-500 text-lg">

                            Completed

                        </h2>

                        <p className="text-4xl font-bold text-green-500 mt-3">

                            {
                                bookings.filter(

                                    (booking) =>
                                        booking.status ===
                                        "Completed"

                                ).length
                            }

                        </p>

                    </div>

                </div>


                {/* ==========================================
                    BOOKINGS TABLE
                ========================================== */}

                <div className="overflow-x-auto">

                    <table className="w-full bg-white rounded-2xl overflow-hidden shadow-lg">


                        {/* TABLE HEADER */}

                        <thead className="bg-blue-900 text-white">

                            <tr>

                                <th className="p-4">
                                    Booking ID
                                </th>

                                <th className="p-4">
                                    Cust_Name
                                </th>

                                <th className="p-4">
                                    Cust_Phone
                                </th>

                                <th className="p-4">
                                    Cust_Address
                                </th>

                                <th className="p-4">
                                    Service
                                </th>

                                <th className="p-4">
                                    Date
                                </th>

                                <th className="p-4">
                                    Status
                                </th>

                                <th className="p-4">
                                    Technician
                                </th>

                                <th className="p-4">
                                    Action
                                </th>

                            </tr>

                        </thead>


                        {/* TABLE BODY */}

                        <tbody>

                            {bookings.map((booking) => {

                                // ==========================================
                                // TWO DIFFERENT IDs
                                // ==========================================

                                const mongoBookingId =
                                    booking._id;

                                const bookingNumber =
                                    booking.booking_id;


                                return (

                                    <tr

                                        key={
                                            mongoBookingId
                                        }

                                        className="text-center border-b hover:bg-gray-50 transition"

                                    >


                                        {/* ==================================
                                            6 DIGIT BOOKING ID
                                        ================================== */}

                                        <td className="p-4">

                                            <span className="font-bold text-blue-900">

                                                {bookingNumber}

                                            </span>

                                        </td>


                                        {/* CUSTOMER NAME */}

                                        <td className="p-4">

                                            {booking.full_name}

                                        </td>


                                        {/* CUSTOMER PHONE */}

                                        <td className="p-4">

                                            {booking.phone}

                                        </td>


                                        {/* ADDRESS */}

                                        <td className="p-4">

                                            {booking.address}

                                        </td>


                                        {/* SERVICE */}

                                        <td className="p-4">

                                            {booking.service_type}

                                        </td>


                                        {/* CREATED DATE */}

                                        <td className="p-4">

                                            {booking.created_at

                                                ? new Date(
                                                    booking.created_at
                                                ).toLocaleString()

                                                : "-"

                                            }

                                        </td>


                                        {/* STATUS */}

                                        <td className="p-4">

                                            <span

                                                className={`px-4 py-2 rounded-full text-white text-sm font-semibold

                                                ${
                                                    booking.status ===
                                                    "Pending"

                                                        ? "bg-yellow-500"

                                                        : booking.status ===
                                                          "Accepted"

                                                        ? "bg-blue-500"

                                                        : booking.status ===
                                                          "Completed"

                                                        ? "bg-green-500"

                                                        : "bg-red-500"
                                                }

                                                `}

                                            >

                                                {booking.status}

                                            </span>

                                        </td>


                                        {/* ==================================
                                            TECHNICIAN
                                        ================================== */}

                                        <td className="p-4">


                                            {booking.status ===
                                            "Pending" ? (

                                                <div className="space-y-2">


                                                    {/* TECHNICIAN SELECT */}

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

                                                        className="border rounded-lg p-2 w-full"

                                                    >

                                                        <option value="">

                                                            Select Technician

                                                        </option>


                                                        {technicians.map(
                                                            (tech) => (

                                                                <option

                                                                    key={
                                                                        tech.id
                                                                    }

                                                                    value={
                                                                        tech.id
                                                                    }

                                                                >

                                                                    {tech.name}

                                                                </option>

                                                            )
                                                        )}

                                                    </select>


                                                    {/* VISIT DATE */}

                                                    <input

                                                        type="date"

                                                        className="border rounded-lg p-2 w-full"

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

                                                    />


                                                    {/* VISIT TIME */}

                                                    <input

                                                        type="time"

                                                        className="border rounded-lg p-2 w-full"

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

                                                    />

                                                </div>

                                            ) : (

                                                <div>

                                                    <div className="font-semibold text-blue-900">

                                                        {
                                                            booking.technician_name ||
                                                            "Not Assigned"
                                                        }

                                                    </div>

                                                    <div className="text-sm text-gray-500">

                                                        {
                                                            booking.technician_phone ||
                                                            ""
                                                        }

                                                    </div>

                                                </div>

                                            )}

                                        </td>


                                        {/* ==================================
                                            ACTION
                                        ================================== */}

                                        <td className="p-4">


                                            {/* PENDING */}

                                            {booking.status ===
                                            "Pending" && (

                                                <div className="flex flex-col gap-2">


                                                    {/* ASSIGN */}

                                                    <button

                                                        onClick={() =>

                                                            scheduleVisit(
                                                                bookingNumber,
                                                                mongoBookingId
                                                            )

                                                        }

                                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"

                                                    >

                                                        Assign & Accept

                                                    </button>


                                                    {/* REJECT */}

                                                    <button

                                                        onClick={() =>

                                                            updateStatus(

                                                                mongoBookingId,

                                                                "Rejected"

                                                            )

                                                        }

                                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"

                                                    >

                                                        Reject

                                                    </button>

                                                </div>

                                            )}


                                            {/* ACCEPTED */}

                                            {booking.status ===
                                            "Accepted" && (

                                                <button

                                                    onClick={() =>

                                                        updateStatus(

                                                            mongoBookingId,

                                                            "Completed"

                                                        )

                                                    }

                                                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"

                                                >

                                                    Mark Completed

                                                </button>

                                            )}


                                            {/* COMPLETED / REJECTED */}

                                            {(booking.status ===
                                                "Completed" ||

                                                booking.status ===
                                                "Rejected") && (

                                                <span

                                                    className={`px-4 py-2 rounded-lg text-white

                                                    ${
                                                        booking.status ===
                                                        "Completed"

                                                            ? "bg-green-600"

                                                            : "bg-red-600"
                                                    }

                                                    `}

                                                >

                                                    Locked

                                                </span>

                                            )}

                                        </td>

                                    </tr>

                                );

                            })}

                        </tbody>

                    </table>

                </div>

            </div>

        </AdminLayout>

    );

}

export default Admin;