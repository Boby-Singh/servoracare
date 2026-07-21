import { Link } from "react-router-dom"

function AdminSidebar() {
  return (
    <div className="w-64 min-h-screen bg-blue-900 text-white p-6">

      <h1 className="text-3xl font-bold mb-10">
        Admin Panel
      </h1>

      <ul className="space-y-5">

        <li>
          <Link to="/admin">
            Dashboard
          </Link>
        </li>

        <li>
          <Link to="/admin/customers">
            Customers
          </Link>
        </li>

        <li>
          <Link to="/admin/technicians">
            Technicians
          </Link>
        </li>

        <li>
          <Link to="/admin/bookings">
            Bookings
          </Link>
        </li>

        <li>
          <Link to="/admin/jobs">
            Recruitment
          </Link>
        </li>

        <li>
          <Link to="/admin/add-technician">
            Add Technician
          </Link>
        </li>

      </ul>

    </div>
  )
}

export default AdminSidebar