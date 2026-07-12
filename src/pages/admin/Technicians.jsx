import { useEffect, useState } from "react"
import axios from "axios"
import AdminLayout from "../../layouts/AdminLayout"
const API = import.meta.env.VITE_API_URL;
function Technicians() {

  const [technicians, setTechnicians] = useState([])

  useEffect(() => {
    fetchTechnicians()
  }, [])

  const fetchTechnicians = async () => {

    try {

      const response = await axios.get(
        `${API}/api/admin/technicians`
      )

      setTechnicians(response.data)

    } catch (error) {

      console.log(error)

    }

  }

  return (
    <AdminLayout>
    <div className="p-10">

      <h1 className="text-4xl font-bold text-blue-900 mb-8">
        Technicians
      </h1>

      <table className="w-full bg-white shadow-lg rounded-xl">

        <thead className="bg-blue-900 text-white">

          <tr>

            <th className="p-4">ID</th>
            <th className="p-4">Name</th>
            <th className="p-4">Email</th>
            <th className="p-4">Employee_Code</th>
            <th className="p-4">Employee_Phone</th>

          </tr>

        </thead>

        <tbody>

          {technicians.map((tech) => (

            <tr
              key={tech.id}
              className="text-center border-b"
            >

              <td className="p-4">
                {tech.id}
              </td>

              <td className="p-4">
                {tech.name}
              </td>

              <td className="p-4">
                {tech.email}
              </td>
              <td className="p-4">
                {tech.employee_code}
              </td>
              <td className="p-4">
                {tech.phone}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  </AdminLayout>
  )

}

export default Technicians