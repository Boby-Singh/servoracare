import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";

const API = import.meta.env.VITE_API_URL;

function Admin() {

  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [technicians, setTechnicians] = useState([]);

  const [selectedTechnician, setSelectedTechnician] = useState({});
  const [visitDate, setVisitDate] = useState({});
  const [visitTime, setVisitTime] = useState({});


  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");

  };


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
    bookingId,
    technicianId
  ) => {

    setSelectedTechnician((prev) => ({

      ...prev,

      [bookingId]: technicianId

    }));

  };


  // ==========================================
  // UPDATE STATUS
  // ==========================================

  const updateStatus = async (
    bookingId,
    status
  ) => {

    try {

      await axios.put(

        `${API}/api/update-status/${bookingId}`,

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

  const scheduleVisit = async (bookingId) => {

    const technicianId =
      selectedTechnician[bookingId];

    const date =
      visitDate[bookingId];

    const time =
      visitTime[bookingId];


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

      console.log(
        "Assigning Booking:",
        bookingId
      );

      console.log(
        "Technician:",
        technicianId
      );


      await axios.put(

        `${API}/api/admin/assign-technician/${bookingId}`,

        {

          technician_id: technicianId,

          visit_date: date,

          visit_time: time

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


          <button

            onClick={handleLogout}

            className="bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600"

          >

            Logout

          </button>

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
                    booking.status === "Pending"

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
                    booking.status === "Completed"

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
                  ID
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
                // IMPORTANT
                // MongoDB uses _id instead of id
                // ==========================================

                const bookingId =
                  booking._id;


                return (

                  <tr

                    key={bookingId}

                    className="text-center border-b hover:bg-gray-50 transition"

                  >


                    {/* BOOKING ID */}

                    <td className="p-4">

                      {bookingId}

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
                          booking.status === "Pending"

                            ? "bg-yellow-500"

                            : booking.status === "Accepted"

                            ? "bg-blue-500"

                            : booking.status === "Completed"

                            ? "bg-green-500"

                            : "bg-red-500"

                        }

                        `}

                      >

                        {booking.status}

                      </span>

                    </td>



                    {/* ======================================
                        TECHNICIAN
                    ====================================== */}

                    <td className="p-4">


                      {booking.status === "Pending" ? (


                        <div className="space-y-2">


                          {/* TECHNICIAN SELECT */}

                          <select

                            value={
                              selectedTechnician[
                                bookingId
                              ] || ""
                            }

                            onChange={(e) =>

                              assignTechnician(

                                bookingId,

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

                                key={tech._id}

                                value={tech._id}

                              >

                                {tech.name}

                              </option>

                            ))}

                          </select>



                          {/* VISIT DATE */}

                          <input

                            type="date"

                            className="border rounded-lg p-2 w-full"

                            value={
                              visitDate[
                                bookingId
                              ] || ""
                            }

                            onChange={(e) =>

                              setVisitDate(
                                (prev) => ({

                                  ...prev,

                                  [bookingId]:
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
                                bookingId
                              ] || ""
                            }

                            onChange={(e) =>

                              setVisitTime(
                                (prev) => ({

                                  ...prev,

                                  [bookingId]:
                                    e.target.value

                                })
                              )

                            }

                          />

                        </div>


                      ) : (


                        <div>


                          <div className="font-semibold text-blue-900">

                            {booking.technician_name ||
                              "Not Assigned"}

                          </div>


                          <div className="text-sm text-gray-500">

                            {booking.technician_phone ||
                              ""}

                          </div>

                        </div>

                      )}

                    </td>



                    {/* ======================================
                        ACTION
                    ====================================== */}

                    <td className="p-4">


                      {/* PENDING */}

                      {booking.status === "Pending" && (

                        <div className="flex flex-col gap-2">


                          {/* ASSIGN */}

                          <button

                            onClick={() =>

                              scheduleVisit(
                                bookingId
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

                                bookingId,

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

                      {booking.status === "Accepted" && (

                        <button

                          onClick={() =>

                            updateStatus(

                              bookingId,

                              "Completed"

                            )

                          }

                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"

                        >

                          Mark Completed

                        </button>

                      )}



                      {/* COMPLETED / REJECTED */}

                      {(booking.status === "Completed" ||
                        booking.status === "Rejected") && (

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