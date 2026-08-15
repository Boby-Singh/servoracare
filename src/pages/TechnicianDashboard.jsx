import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const API = import.meta.env.VITE_API_URL;

function TechnicianDashboard() {

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const [jobs, setJobs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [workReport, setWorkReport] = useState("");

  // ==========================================
  // CHECK TECHNICIAN
  // ==========================================

  if (user?.role !== "technician") {
    return <Navigate to="/" />;
  }

  // ==========================================
  // FETCH JOBS
  // ==========================================

  const fetchJobs = async () => {

    try {

      const res = await axios.get(
        `${API}/api/technician-jobs/${user.id}`
      );

      setJobs(res.data);

    } catch (error) {

      console.error(
        "Fetch Technician Jobs Error:",
        error
      );

    }

  };

  // ==========================================
  // LOAD JOBS
  // ==========================================

  useEffect(() => {

    fetchJobs();

  }, []);

  // ==========================================
  // COMPLETE JOB
  // ==========================================

  const completeJob = async () => {

    if (!workReport.trim()) {

      alert("Please enter work report");

      return;

    }

    try {

      await axios.put(

        `${API}/api/update-status/${selectedJob}`,

        {
          status: "Completed",
          technician_comment: workReport
        }

      );

      alert("Job Completed Successfully");

      setShowModal(false);

      setWorkReport("");

      setSelectedJob(null);

      fetchJobs();

    } catch (error) {

      console.error(
        "Complete Job Error:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Failed to complete job"
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
          Technician Dashboard | ServoraCare
        </title>

        <meta
          name="robots"
          content="noindex,nofollow"
        />

        <meta
          name="description"
          content="ServoraCare technician dashboard to manage assigned service jobs, update work status and submit completion reports."
        />

      </Helmet>


      <div className="min-h-screen bg-gray-100 p-8">


        {/* ==========================================
            HEADER
        ========================================== */}

        <div className="flex justify-between items-center mb-8">

          <div>

            <h1 className="text-4xl font-bold text-blue-900">

              Welcome, {user?.name}

            </h1>

            <p className="text-gray-600 mt-2">

              Technician Dashboard

            </p>

          </div>

        </div>


        {/* ==========================================
            STATISTICS
        ========================================== */}

        <div className="grid md:grid-cols-3 gap-6 mb-8">


          {/* ASSIGNED */}

          <div className="bg-white p-6 rounded-2xl shadow">

            <h2 className="text-4xl font-bold text-blue-900">

              {jobs.length}

            </h2>

            <p>
              Assigned Jobs
            </p>

          </div>


          {/* COMPLETED */}

          <div className="bg-white p-6 rounded-2xl shadow">

            <h2 className="text-4xl font-bold text-green-600">

              {
                jobs.filter(
                  job =>
                    job.status === "Completed"
                ).length
              }

            </h2>

            <p>
              Completed Jobs
            </p>

          </div>


          {/* ACTIVE */}

          <div className="bg-white p-6 rounded-2xl shadow">

            <h2 className="text-4xl font-bold text-yellow-500">

              {
                jobs.filter(
                  job =>
                    job.status === "Accepted"
                ).length
              }

            </h2>

            <p>
              Active Jobs
            </p>

          </div>

        </div>


        {/* ==========================================
            JOBS TABLE
        ========================================== */}

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">


          <div className="bg-blue-900 text-white p-4">

            <h2 className="text-2xl font-bold">

              Assigned Jobs

            </h2>

          </div>


          <div className="overflow-x-auto">

            <table className="w-full">


              {/* TABLE HEADER */}

              <thead className="bg-gray-100">

                <tr>

                  <th className="p-4">
                    Booking ID
                  </th>

                  <th className="p-4">
                    Customer
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
                    Visit Date
                  </th>

                  <th className="p-4">
                    Visit Time
                  </th>

                  <th className="p-4">
                    Status
                  </th>

                  <th className="p-4">
                    Action
                  </th>

                </tr>

              </thead>


              {/* TABLE BODY */}

              <tbody>

                {jobs.length === 0 ? (

                  <tr>

                    <td
                      colSpan="9"
                      className="p-8 text-center text-gray-500"
                    >

                      No jobs assigned yet.

                    </td>

                  </tr>

                ) : (

                  jobs.map((job) => (

                    <tr
                      key={job._id}
                      className="border-b text-center hover:bg-gray-50"
                    >


                      {/* ==================================
                          6 DIGIT BOOKING ID
                      ================================== */}

                      <td className="p-4">

                        <span className="font-bold text-blue-900">

                          {job.booking_id || "-"}

                        </span>

                      </td>


                      {/* CUSTOMER */}

                      <td className="p-4">

                        {job.full_name}

                      </td>


                      {/* PHONE */}

                      <td className="p-4">

                        {job.phone}

                      </td>


                      {/* ADDRESS */}

                      <td className="p-4">

                        {job.address}

                      </td>


                      {/* SERVICE */}

                      <td className="p-4">

                        {job.service_type}

                      </td>


                      {/* VISIT DATE */}

                      <td className="p-4">

                        {job.visit_date
                          ? new Date(
                              job.visit_date
                            ).toLocaleDateString()
                          : "-"
                        }

                      </td>


                      {/* VISIT TIME */}

                      <td className="p-4">

                        {job.visit_time || "-"}

                      </td>


                      {/* STATUS */}

                      <td className="p-4">

                        <span
                          className={`px-4 py-2 rounded-full text-white

                          ${
                            job.status === "Accepted"

                              ? "bg-blue-500"

                              : job.status === "Completed"

                              ? "bg-green-500"

                              : "bg-yellow-500"
                          }

                          `}
                        >

                          {job.status}

                        </span>

                      </td>


                      {/* ACTION */}

                      <td className="p-4">

                        {job.status === "Accepted" ? (

                          <button

                            onClick={() => {

                              setSelectedJob(
                                job._id
                              );

                              setShowModal(true);

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

                  ))

                )}

              </tbody>

            </table>

          </div>


          {/* ==========================================
              COMPLETE JOB MODAL
          ========================================== */}

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
                    setWorkReport(
                      e.target.value
                    )
                  }

                  rows="6"

                  placeholder={`Example:
• Equipment inspected
• Fault repaired
• Parts replaced
• Testing completed successfully`}

                  className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"

                />


                <div className="flex justify-end gap-3 mt-6">


                  {/* CANCEL */}

                  <button

                    onClick={() => {

                      setShowModal(false);

                      setWorkReport("");

                      setSelectedJob(null);

                    }}

                    className="px-5 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"

                  >

                    Cancel

                  </button>


                  {/* COMPLETE */}

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

    </>

  );

}

export default TechnicianDashboard;