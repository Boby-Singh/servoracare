import { useEffect, useState } from "react"
import axios from "axios"
import {Link, Navigate, useNavigate } from "react-router-dom"

function TechnicianDashboard() {

  const navigate = useNavigate()

  const user = JSON.parse(
    localStorage.getItem("user")
  )

  const [jobs, setJobs] = useState([])
  const [showModal, setShowModal] = useState(false)

  const [selectedJob, setSelectedJob] = useState(null)

  const [workReport, setWorkReport] = useState("")

  if (user?.role !== "technician") {
    return <Navigate to="/" />
  }

  const handleLogout = () => {

    localStorage.removeItem("token")
    localStorage.removeItem("user")

    navigate("/login")

  }

  useEffect(() => {

    fetchJobs()

  }, [])

  const fetchJobs = async () => {

    try {

      const res = await axios.get(
        `http://localhost:5000/api/technician-jobs/${user.id}`
      )

      setJobs(res.data)

    } catch (error) {

      console.log(error)

    }

  }

 const completeJob = async () => {

  if (!workReport.trim()) {

    alert("Please enter work report")

    return

  }

  try {

    await axios.put(
      `http://localhost:5000/api/update-status/${selectedJob}`,
      {
        status: "Completed",
        technician_comment: workReport
      }
    )

    setShowModal(false)

    setWorkReport("")

    fetchJobs()

  } catch (error) {

    console.log(error)

  }

}

  return (

    <div className="min-h-screen bg-gray-100 p-8">

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

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-4xl font-bold text-blue-900">
            Welcome, {user?.name}
          </h1>

          <p className="text-gray-600 mt-2">
            Technician Dashboard
          </p>

        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600"
        >
          Logout
        </button>

      </div>

      {/* Statistics */}

      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white p-6 rounded-2xl shadow">

          <h2 className="text-4xl font-bold text-blue-900">
            {jobs.length}
          </h2>

          <p>Assigned Jobs</p>

        </div>

        <div className="bg-white p-6 rounded-2xl shadow">

          <h2 className="text-4xl font-bold text-green-600">
            {
              jobs.filter(
                job => job.status === "Completed"
              ).length
            }
          </h2>

          <p>Completed Jobs</p>

        </div>

        <div className="bg-white p-6 rounded-2xl shadow">

          <h2 className="text-4xl font-bold text-yellow-500">
            {
              jobs.filter(
                job => job.status === "Accepted"
              ).length
            }
          </h2>

          <p>Active Jobs</p>

        </div>

      </div>

      {/* Jobs Table */}

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

        <div className="bg-blue-900 text-white p-4">

          <h2 className="text-2xl font-bold">
            Assigned Jobs
          </h2>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-100">

              <tr>

                <th className="p-4">Customer</th>
                <th className="p-4">Cust_Phone</th>
                <th className="p-4">Cust_Address</th>
                <th className="p-4">Service</th>
                <th className="p-4">Status</th>
                <th className="p-4">Action</th>

              </tr>

            </thead>

            <tbody>

              {jobs.map((job) => (

                <tr
                  key={job.id}
                  className="border-b text-center"
                >

                  <td className="p-4">
                    {job.full_name}
                  </td>

                  <td className="p-4">
                    {job.phone}
                  </td>

                  <td className="p-4">
                    {job.address}
                  </td>

                  <td className="p-4">
                    {job.service_type}
                  </td>

                  <td className="p-4">

                    <span
                      className={`px-4 py-2 rounded-full text-white
                      ${
                        job.status === "Accepted"
                          ? "bg-blue-500"
                          : job.status === "Completed"
                          ? "bg-green-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {job.status}
                    </span>

                  </td>

                  <td className="p-4">

                    {job.status === "Accepted" ? (

                      <button
                        onClick={() => {

                          setSelectedJob(job.id)

                          setShowModal(true)

                        }}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                      >
                        Complete Job
                      </button>
                    ) : (

                      <span className="text-green-600 font-semibold">
                        Done
                      </span>

                    )}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

          {/* Complete Job Modal */}

{showModal && (

  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">

    <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6">

      <h2 className="text-2xl font-bold text-blue-900 mb-4">
        Complete Job
      </h2>

      <p className="text-gray-600 mb-4">
        Please enter the work report before completing this job.
      </p>

      <textarea
        value={workReport}
        onChange={(e) =>
          setWorkReport(e.target.value)
        }
        rows="6"
        placeholder="Example:
• Equipment inspected
• Fault repaired
• Parts replaced
• Testing completed successfully"
        className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex justify-end gap-3 mt-6">

        <button
          onClick={() => {

            setShowModal(false)

            setWorkReport("")

          }}
          className="px-5 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
        >
          Cancel
        </button>

        <button
          onClick={completeJob}
          className="px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Submit & Complete
        </button>

      </div>

    </div>

  </div>

)}

        </div>

      </div>

    </div>

  )

}

export default TechnicianDashboard