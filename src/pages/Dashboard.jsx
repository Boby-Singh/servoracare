import { useEffect, useState } from "react";
import axios from "axios";
import QRCode from "react-qr-code";
import { Helmet } from "react-helmet-async";

const API = import.meta.env.VITE_API_URL;

function Dashboard() {

  const [bookings, setBookings] = useState([]);
  const [showQR, setShowQR] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState("");

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  // ==========================================
  // FETCH BOOKINGS
  // ==========================================

  const fetchBookings = async () => {

    if (!user?.id) {
      return;
    }

    try {

      const response = await axios.get(
        `${API}/api/my-bookings/${user.id}`
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
  // LOAD BOOKINGS
  // ==========================================

  useEffect(() => {

    fetchBookings();

  }, []);

  // ==========================================
  // PAYMENT
  // ==========================================

  const makePayment = async (
    bookingId,
    amount
  ) => {

    try {

      const { data } = await axios.post(
        `${API}/api/create-payment`,
        {
          bookingId,
          amount
        }
      );

      if (!data.success) {

        alert(
          data.message ||
          "Payment failed"
        );

        return;

      }

      const isMobile =
        /Android|iPhone|iPad|iPod/i.test(
          navigator.userAgent
        );

      if (isMobile) {

        // Open UPI App

        window.location.href =
          data.paymentUrl;

      } else {

        // Show QR Code

        setPaymentUrl(
          data.paymentUrl
        );

        setShowQR(true);

      }

    } catch (error) {

      console.error(
        "Payment Error:",
        error
      );

      alert(
        "Unable to start payment"
      );

    }

  };

  return (

    <>

      {/* ==========================================
          SEO
      ========================================== */}

      <Helmet>

        <title>
          Customer Dashboard | ServoraCare
        </title>

        <meta
          name="robots"
          content="noindex,nofollow"
        />

        <meta
          name="description"
          content="Manage your ServoraCare bookings, track service status, assigned technicians and make secure payments."
        />

      </Helmet>


      {/* ==========================================
          DASHBOARD
      ========================================== */}

      <div className="min-h-screen bg-gray-100 p-10">


        {/* ==========================================
            HEADER
        ========================================== */}

        <div className="mb-10">

          <h1 className="text-5xl font-bold text-blue-900">

            Welcome, {user?.name}

          </h1>

          <p className="text-gray-600 mt-2">

            Customer Dashboard

          </p>

        </div>


        {/* ==========================================
            BOOKINGS
        ========================================== */}

        <div className="bg-white rounded-3xl shadow-lg p-8">

          <h2 className="text-3xl font-bold text-blue-900 mb-8">

            My Bookings

          </h2>


          <div className="overflow-x-auto">

            <table className="w-full">


              {/* ======================================
                  TABLE HEADER
              ====================================== */}

              <thead className="bg-blue-900 text-white">

                <tr>

                  <th className="p-4">
                    Booking ID
                  </th>

                  <th className="p-4">
                    Service
                  </th>

                  <th className="p-4">
                    Address
                  </th>

                  <th className="p-4">
                    Status
                  </th>

                  <th className="p-4">
                    Technician
                  </th>

                  <th className="p-4">
                    Technician Phone
                  </th>

                  <th className="p-4">
                    Accepted At
                  </th>

                  <th className="p-4">
                    Visit Date
                  </th>

                  <th className="p-4">
                    Visit Time
                  </th>

                  <th className="p-4">
                    Payment
                  </th>

                  <th className="p-4">
                    Technician Report
                  </th>

                </tr>

              </thead>


              {/* ======================================
                  TABLE BODY
              ====================================== */}

              <tbody>

                {bookings.length === 0 ? (

                  <tr>

                    <td
                      colSpan="11"
                      className="p-8 text-center text-gray-500"
                    >

                      No bookings found.

                    </td>

                  </tr>

                ) : (

                  bookings.map((booking) => (

                    <tr
                      key={booking._id}
                      className="border-b text-center hover:bg-gray-50"
                    >


                      {/* ==================================
                          6 DIGIT BOOKING ID
                      ================================== */}

                      <td className="p-4">

                        <span className="font-bold text-blue-900">

                          {booking.booking_id || "-"}

                        </span>

                      </td>


                      {/* SERVICE */}

                      <td className="p-4 font-medium">

                        {booking.service_type}

                      </td>


                      {/* ADDRESS */}

                      <td className="p-4">

                        {booking.address}

                      </td>


                      {/* STATUS */}

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
                          }

                          `}
                        >

                          {booking.status}

                        </span>

                      </td>


                      {/* TECHNICIAN */}

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


                      {/* TECHNICIAN PHONE */}

                      <td className="p-4">

                        {booking.technician_phone || "-"}

                      </td>


                      {/* ACCEPTED AT */}

                      <td className="p-4">

                        {booking.accepted_at

                          ? new Date(
                              booking.accepted_at
                            ).toLocaleString()

                          : "-"

                        }

                      </td>


                      {/* VISIT DATE */}

                      <td className="p-4">

                        {booking.visit_date
                          ? new Date(
                              booking.visit_date
                            ).toLocaleDateString()
                          : "-"
                        }

                      </td>


                      {/* VISIT TIME */}

                      <td className="p-4">

                        {booking.visit_time || "-"}

                      </td>


                      {/* ==================================
                          PAYMENT
                      ================================== */}

                      <td className="p-4">

                        {booking.payment_status === "Paid" ? (

                          <span className="text-green-600 font-semibold">

                            Paid

                          </span>

                        ) : (

                          <button

                            onClick={() =>
                              makePayment(
                                booking._id,
                                booking.amount
                              )
                            }

                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"

                          >

                            Pay Now

                          </button>

                        )}

                      </td>


                      {/* TECHNICIAN REPORT */}

                      <td className="p-4">

                        {booking.technician_comment || "-"}

                      </td>


                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </div>


        {/* ==========================================
            PAYMENT QR MODAL
        ========================================== */}

        {showQR && (

          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

            <div className="bg-white rounded-3xl shadow-2xl p-8 w-[420px]">


              <h2 className="text-3xl font-bold text-center text-blue-900">

                Scan & Pay

              </h2>


              <p className="text-center text-gray-500 mt-2">

                Scan using any UPI App

              </p>


              {/* QR */}

              <div className="flex justify-center my-8">

                <QRCode
                  value={paymentUrl}
                  size={220}
                />

              </div>


              {/* UPI */}

              <div className="bg-gray-100 rounded-xl p-4">

                <p className="text-sm text-gray-600">

                  UPI ID

                </p>


                <div className="flex justify-between items-center">

                  <span className="font-semibold">

                    7828908522@axl

                  </span>


                  <button

                    onClick={() => {

                      navigator.clipboard.writeText(
                        "7828908522@axl"
                      );

                      alert(
                        "UPI ID Copied"
                      );

                    }}

                    className="text-blue-600 font-semibold"

                  >

                    Copy

                  </button>

                </div>

              </div>


              {/* CLOSE */}

              <button

                onClick={() =>
                  setShowQR(false)
                }

                className="mt-6 w-full bg-blue-900 text-white py-3 rounded-xl hover:bg-blue-800"

              >

                Close

              </button>

            </div>

          </div>

        )}

      </div>

    </>

  );

}

export default Dashboard;