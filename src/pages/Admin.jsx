import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import AdminLayout from "../layouts/AdminLayout"
function Admin() {

  const navigate = useNavigate()
  const [bookings, setBookings] = useState([])

  const assignTechnician = async (
  bookingId,
  technicianId
) => {

  if (!technicianId) return

  try {

    const response = await axios.put(
      `http://localhost:5000/api/admin/assign-technician/${bookingId}`,
      {
        technician_id: technicianId
      }
    )

    console.log(response.data)

    alert("Technician Assigned Successfully")

    fetchBookings()

  } catch (error) {

    console.log(error)

    alert("Assignment Failed")

  }

}

  const handleLogout = () => {

  localStorage.removeItem("token")

  localStorage.removeItem("user")

  navigate("/login")

}

  useEffect(() => {

    fetchBookings()

  }, [])

  const fetchBookings = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/all-bookings"
      )

      setBookings(response.data)

    } catch (error) {

      console.log(error)

    }

  }
  const updateStatus = async (id, status) => {

  try {

    await axios.put(

      `http://localhost:5000/api/update-status/${id}`,

      { status }

    )

    fetchBookings()

  } catch (error) {

    console.log(error)

  }

}

const [technicians, setTechnicians] = useState([])

useEffect(() => {

  axios
    .get("http://localhost:5000/api/admin/technicians")
    .then(res => setTechnicians(res.data))

}, [])

  return (
    <AdminLayout>

    <div className="min-h-screen bg-gray-100 p-8">

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
    <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-white p-6 rounded-2xl shadow-md">

            <h2 className="text-gray-500 text-lg">
              Total Bookings
            </h2>

            <p className="text-4xl font-bold text-blue-900 mt-3">
              {bookings.length}
            </p>

          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">

            <h2 className="text-gray-500 text-lg">
              Pending
            </h2>

            <p className="text-4xl font-bold text-yellow-500 mt-3">

              {
                bookings.filter(
                  booking =>
                    booking.status === "Pending"
                ).length
              }

            </p>

          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">

            <h2 className="text-gray-500 text-lg">
              Completed
            </h2>

            <p className="text-4xl font-bold text-green-500 mt-3">

              {
                bookings.filter(
                  booking =>
                    booking.status === "Completed"
                ).length
              }

            </p>

          </div>

        </div>

      <div className="overflow-x-auto">

        <table className="w-full bg-white rounded-2xl overflow-hidden shadow-lg">

          <thead className="bg-blue-900 text-white">

            <tr>

              <th className="p-4">ID</th>

              <th className="p-4">Cust_Name</th>

              <th className="p-4">Cust_Phone</th>

              <th className="p-4">Cust_Address</th>

              <th className="p-4">Service</th>

              <th className="p-4">Date</th>
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

          <tbody>

            {bookings.map((booking) => (

              <tr
                key={booking.id}
                className="text-center border-b hover:bg-gray-50 transition"
              >

                <td className="p-4">
                  {booking.id}
                </td>

                <td className="p-4">
                  {booking.full_name}
                </td>

                <td className="p-4">
                  {booking.phone}
                </td>

                <td className="p-4">
                  {booking.address}
                </td>

                <td className="p-4">
                  {booking.service_type}
                </td>

                <td className="p-4">
                  {new Date(
                    booking.created_at
                  ).toLocaleString()}
                </td>
                
                <td className="p-4">

                  <span
                    className={`
                      px-4 py-2 rounded-full text-white text-sm font-semibold

                      ${booking.status === "Pending"
                        ? "bg-yellow-500"
                        : booking.status === "Accepted"
                        ? "bg-blue-500"
                        : booking.status === "Completed"
                        ? "bg-green-500"
                        : "bg-red-500"}
                    `}
                  >
                    {booking.status}
                  </span>

                </td>
               <td className="p-4">

                  {booking.technician_name ? (

                    <span className="bg-blue-100 text-blue-900 px-3 py-2 rounded-lg font-semibold">
                      {booking.technician_name}
                    </span>

                  ) : booking.status === "Accepted" ? (

                    <select
                      onChange={(e) =>
                        assignTechnician(
                          booking.id,
                          e.target.value
                        )
                      }
                      className="border border-gray-300 rounded-lg p-2"
                    >

                      <option value="">
                        Select Technician
                      </option>

                      {technicians.map((tech) => (

                        <option
                          key={tech.id}
                          value={tech.id}
                        >
                          {tech.name}
                        </option>

                      ))}

                    </select>

                  ) : (

                    <span className="text-gray-400">
                      Not Assigned
                    </span>

                  )}

                </td>

                <td className="p-4">

                {booking.status === "Pending" && (

                  <div className="flex justify-center gap-2">

                    <button
                      onClick={() =>
                        updateStatus(
                          booking.id,
                          "Accepted"
                        )
                      }
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                      Accept
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(
                          booking.id,
                          "Rejected"
                        )
                      }
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                    >
                      Reject
                    </button>

                  </div>

                )}

                {booking.status === "Accepted" && (

                  <button
                    onClick={() =>
                      updateStatus(
                        booking.id,
                        "Completed"
                      )
                    }
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                  >
                    Complete
                  </button>

                )}

                {booking.status === "Completed" && (

                  <span className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-semibold">
                    Locked
                  </span>

                )}

                {booking.status === "Rejected" && (

                  <span className="bg-red-100 text-red-700 px-4 py-2 rounded-lg font-semibold">
                    Locked
                  </span>

                )}

              </td>
                    

              </tr>

            ))}

          </tbody>

        </table>
        

      </div>

    </div>
    </AdminLayout>

  )
}

export default Admin