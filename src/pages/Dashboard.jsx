import { useEffect, useState } from "react"
import axios from "axios"
const API = import.meta.env.VITE_API_URL;
import { Link, useNavigate } from "react-router-dom"

function Dashboard() {

  const navigate = useNavigate()

  const [bookings, setBookings] = useState([])

  const user =
    JSON.parse(localStorage.getItem("user"))

  useEffect(() => {

    fetchBookings()

  }, [])

  const fetchBookings = async () => {

    try {

      const response = await axios.get(

        `${API}/api/my-bookings/${user.id}`

      )

      setBookings(response.data)

    } catch (error) {

      console.log(error)

    }

  }

  const handleLogout = () => {

    localStorage.removeItem("token")

    localStorage.removeItem("user")

    navigate("/login")

  }

  const makePayment = async (bookingId, amount) => {

  try {

    const { data } = await axios.post(
      `${API}/api/create-payment`,
      {
        bookingId,
        amount
      }
    )

    if (data.success) {

      window.open(
        data.redirectUrl,
        "_self"
      )

    } else {

      alert(data.message)

    }

  } catch (error) {

    console.log(error)

    alert("Unable to start payment")

  }

}

  return (

    <div className="min-h-screen bg-gray-100 p-10">

       <div className="mb-8">

        <Link
          to="/"
          className="text-blue-700 hover:text-orange-500 font-medium"
        >
          Home
        </Link>

        <span className="mx-2 text-gray-500">/</span>

        <span className="text-gray-600">
          Dashboard
        </span>

      </div>

      <div className="flex justify-between items-center mb-10">

        <div>

          <h1 className="text-5xl font-bold text-blue-900">
            Welcome, {user.name}
          </h1>

          <p className="text-gray-600 mt-2">
            Customer Dashboard
          </p>

        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600"
        >
          Logout
        </button>

      </div>

      <div className="bg-white rounded-3xl shadow-lg p-8">

        <h2 className="text-3xl font-bold text-blue-900 mb-8">
          My Bookings
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-blue-900 text-white">
            <tr>
                <th className="p-4">Service</th>
                <th className="p-4">Address</th>
                <th className="p-4">Status</th>
                <th className="p-4">Technician</th>
                <th className="p-4">Technician Phone</th>
                <th className="p-4">Assigned On</th>
                <th className="p-4">Visit Date</th>
                <th className="p-4">Visit Time</th>
                <th className="p-4">Payment</th>
                <th className="p-4">Technician Report</th>
            </tr>
            </thead>

            <tbody>

            {bookings.map((booking) => (

            <tr
                key={booking.id}
                className="border-b text-center hover:bg-gray-50"
            >

                <td className="p-4 font-medium">
                    {booking.service_type}
                </td>

                <td className="p-4">
                    {booking.address}
                </td>

                <td className="p-4">

                    <span
                        className={`px-4 py-2 rounded-full text-white text-sm

                        ${
                            booking.status === "Pending"
                                ? "bg-yellow-500"

                                : booking.status === "Accepted"
                                ? "bg-blue-600"

                                : booking.status === "Completed"
                                ? "bg-green-600"

                                : "bg-red-500"
                        }`}
                    >
                        {booking.status}
                    </span>

                </td>

                <td className="p-4">

                    {booking.technician_name ? (

                        <div>

                            <div className="font-semibold">
                                {booking.technician_name}
                            </div>

                        </div>

                    ) : (

                        <span className="text-gray-500">
                            Not Assigned
                        </span>

                    )}

                </td>

                <td className="p-4">

                    {booking.technician_phone || "-"}

                </td>

                <td className="p-4">

                    {booking.assigned_at

                        ? new Date(
                              booking.assigned_at
                          ).toLocaleString()

                        : "-"}

                </td>

                <td className="p-4">

                    {booking.visit_date || "-"}

                </td>

                <td className="p-4">

                    {booking.visit_time || "-"}

                </td>

                <td className="p-4">

                    {booking.payment_status === "Paid" ? (

                        <span className="text-green-600 font-semibold">
                            Paid
                        </span>

                    ) : (

                        <button
                            onClick={() =>
                                makePayment(
                                    booking.id,
                                    booking.amount
                                )
                            }
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                        >
                            Pay Now
                        </button>

                    )}

                </td>

                <td className="p-4">

                    {booking.technician_comment || "-"}

                </td>

            </tr>

            ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  )
}

export default Dashboard