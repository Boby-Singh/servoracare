import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../layouts/AdminLayout"

const API = import.meta.env.VITE_API_URL;

function AllBookings() {

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(`${API}/api/all-bookings`);
      setBookings(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
  <AdminLayout>
    <div className="p-8">

      <h1 className="text-3xl font-bold text-blue-900 mb-8">
        All Bookings
      </h1>

      <div className="overflow-x-auto bg-white rounded-2xl shadow-lg">

        <table className="w-full">

          <thead className="bg-blue-900 text-white">

            <tr>
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Phone</th>
              <th className="p-4 text-left">Service</th>
              <th className="p-4 text-left">Address</th>
              <th className="p-4 text-left">Amount</th>
            </tr>

          </thead>

          <tbody>

            {bookings.length > 0 ? (

              bookings.map((booking) => (

                <tr
                  key={booking.id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="p-4">{booking.id}</td>

                  <td className="p-4 font-medium">
                    {booking.full_name}
                  </td>

                  <td className="p-4">
                    {booking.phone}
                  </td>

                  <td className="p-4">
                    {booking.service_type}
                  </td>

                  <td className="p-4">
                    {booking.address}
                  </td>

                  <td className="p-4 font-bold text-orange-500">
                    ₹{booking.amount}
                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="6"
                  className="text-center p-10 text-gray-500"
                >
                  No bookings found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  </AdminLayout>
);
}

export default AllBookings;