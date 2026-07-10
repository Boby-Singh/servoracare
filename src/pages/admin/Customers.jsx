import { useEffect, useState } from "react"
import axios from "axios"
import AdminLayout from "../../layouts/AdminLayout"

function Customers() {

  const [customers, setCustomers] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {

    axios
      .get("http://localhost:5000/api/admin/customers")
      .then((res) => setCustomers(res.data))
      .catch((err) => console.log(err))

  }, [])

  const filteredCustomers =
    customers.filter((customer) =>
      customer.name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      customer.email
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      customer.phone
        ?.toString()
        .includes(search)
    )

  return (

    <AdminLayout>

      <div className="min-h-screen bg-gray-100 p-8">

        {/* Statistics */}

        <div className="grid md:grid-cols-4 gap-6 mb-8">

          <div className="bg-white p-6 rounded-2xl shadow">

            <h2 className="text-gray-500">
              Total Customers
            </h2>

            <p className="text-4xl font-bold text-blue-900 mt-2">
              {customers.length}
            </p>

          </div>

          <div className="bg-white p-6 rounded-2xl shadow">

            <h2 className="text-gray-500">
              With Phone
            </h2>

            <p className="text-4xl font-bold text-green-600 mt-2">
              {
                customers.filter(
                  c => c.phone
                ).length
              }
            </p>

          </div>

          <div className="bg-white p-6 rounded-2xl shadow">

            <h2 className="text-gray-500">
              Total Bookings
            </h2>

            <p className="text-4xl font-bold text-yellow-500 mt-2">
              {
                customers.reduce(
                  (sum, customer) =>
                    sum + (customer.total_bookings || 0),
                  0
                )
              }
            </p>

          </div>

          <div className="bg-white p-6 rounded-2xl shadow">

            <h2 className="text-gray-500">
              Repeat Customers
            </h2>

            <p className="text-4xl font-bold text-purple-600 mt-2">
              {
                customers.filter(
                  customer =>
                    customer.total_bookings > 1
                ).length
              }
            </p>

          </div>

        </div>

        {/* Customer Table */}

        <div className="bg-white rounded-3xl shadow-lg p-8">

          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">

            <div>

              <h1 className="text-4xl font-bold text-blue-900">
                Customers
              </h1>

              <p className="text-gray-500 mt-2">
                Manage all registered customers
              </p>

            </div>

            <input
              type="text"
              placeholder="Search customer..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="border border-gray-300 p-3 rounded-xl w-full md:w-80"
            />

          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="bg-blue-900 text-white">

                  <th className="p-4 text-left">
                    ID
                  </th>

                  <th className="p-4 text-left">
                    Name
                  </th>

                  <th className="p-4 text-left">
                    Email
                  </th>

                  <th className="p-4 text-left">
                    Phone
                  </th>

                  <th className="p-4 text-center">
                    Bookings
                  </th>

                  <th className="p-4 text-center">
                    Status
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredCustomers.map((customer) => (

                  <tr
                    key={customer.id}
                    className="border-b hover:bg-gray-50 transition"
                  >

                    <td className="p-4">
                      {customer.id}
                    </td>

                    <td className="p-4 font-medium">
                      {customer.name}
                    </td>

                    <td className="p-4">
                      {customer.email}
                    </td>

                    <td className="p-4">
                      {customer.phone || "-"}
                    </td>

                    <td className="p-4 text-center">
                      {customer.total_bookings || 0}
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-4 py-2 rounded-full text-white ${
                          customer.status === "Active"
                            ? "bg-green-500"
                            : "bg-gray-500"
                        }`}
                      >
                        {customer.status}
                      </span>
                    </td>

                  </tr>

                ))}

                {filteredCustomers.length === 0 && (

                  <tr>

                    <td
                      colSpan="6"
                      className="text-center p-6 text-gray-500"
                    >
                      No customers found
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </AdminLayout>

  )

}

export default Customers