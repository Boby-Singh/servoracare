import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../layouts/AdminLayout";

const API = import.meta.env.VITE_API_URL;

function AdminJobs() {

  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {

    try {

      const res = await axios.get(
        `${API}/api/admin/job-applications`
      );

      setApplications(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  const updateStatus = async (id, status) => {

    try {

      await axios.put(
        `${API}/api/admin/job-status/${id}`,
        { status }
      );

      fetchApplications();

    } catch (err) {

      console.log(err);

    }

  };

  return (

    <AdminLayout>

      <div className="p-8">

        <h1 className="text-4xl font-bold text-blue-900 mb-8">

          Job Applications

        </h1>

        <div className="overflow-x-auto">

          <table className="w-full bg-white rounded-xl shadow">

            <thead className="bg-blue-900 text-white">

              <tr>

                <th className="p-4">Name</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Position</th>
                <th className="p-4">Experience</th>
                <th className="p-4">Resume</th>
                <th className="p-4">Status</th>
                <th className="p-4">Action</th>

              </tr>

            </thead>

            <tbody>

              {applications.map((app) => (

                <tr
                  key={app.id}
                  className="text-center border-b"
                >

                  <td className="p-4">{app.full_name}</td>

                  <td>{app.phone}</td>

                  <td>{app.position}</td>

                  <td>{app.experience}</td>

                  <td>

                    <a

                      href={`${API}/uploads/${app.resume}`}

                      target="_blank"

                      className="text-blue-600"

                    >

                      View Resume

                    </a>

                  </td>

                  <td>

                    <span className="font-semibold">

                      {app.status}

                    </span>

                  </td>

                  <td>

                    <div className="flex justify-center gap-2">

                      <button

                        onClick={() =>
                          updateStatus(
                            app.id,
                            "Shortlisted"
                          )
                        }

                        className="bg-blue-500 text-white px-3 py-2 rounded"

                      >

                        Shortlist

                      </button>

                      <button

                        onClick={() =>
                          updateStatus(
                            app.id,
                            "Selected"
                          )
                        }

                        className="bg-green-500 text-white px-3 py-2 rounded"

                      >

                        Select

                      </button>

                      <button

                        onClick={() =>
                          updateStatus(
                            app.id,
                            "Rejected"
                          )
                        }

                        className="bg-red-500 text-white px-3 py-2 rounded"

                      >

                        Reject

                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </AdminLayout>

  );

}

export default AdminJobs;