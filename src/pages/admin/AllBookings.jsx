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
    <div>
      {bookings.map((booking) => (
        <div key={booking.id}>
          {booking.full_name} - {booking.service_type}
        </div>
      ))}
    </div>
    </AdminLayout>
  );
}

export default AllBookings;