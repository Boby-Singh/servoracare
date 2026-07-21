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

        <table className="min-w-[1800px] bg-white rounded-xl shadow">

            <thead className="bg-blue-900 text-white">
            <tr>
                <th className="px-6 py-4 whitespace-nowrap">Name</th>
                <th className="px-6 py-4 whitespace-nowrap">Phone</th>
                <th className="px-6 py-4 whitespace-nowrap">Email</th>
                <th className="px-6 py-4 whitespace-nowrap">City</th>
                <th className="px-6 py-4 whitespace-nowrap">Position</th>
                <th className="px-6 py-4 whitespace-nowrap">Experience</th>
                <th className="px-6 py-4 whitespace-nowrap">Aadhaar</th>
                <th className="px-6 py-4 whitespace-nowrap">PAN</th>
                <th className="px-6 py-4 whitespace-nowrap">Resume</th>
                <th className="px-6 py-4 whitespace-nowrap">Aadhaar File</th>
                <th className="px-6 py-4 whitespace-nowrap">Photo</th>
                <th className="px-6 py-4 whitespace-nowrap">Applied On</th>
                <th className="px-6 py-4 whitespace-nowrap">Status</th>
                <th className="px-6 py-4 whitespace-nowrap">Action</th>
            </tr>
            </thead>

            <tbody>

            {applications.map((job) => (

                <tr
                key={job.id}
                className="border-b hover:bg-gray-50 text-center"
                >

                <td className="px-6 py-4 whitespace-nowrap font-semibold">
                    {job.full_name}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                    {job.phone}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                    {job.email}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                    {job.city}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                    {job.position}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                    {job.experience}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                    {job.aadhaar}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                    {job.pan}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                    <a
                    href={`${API}/uploads/${job.resume}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline"
                    >
                    View Resume
                    </a>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                    <a
                    href={`${API}/uploads/${job.aadhaar_file}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline"
                    >
                    View Aadhaar
                    </a>
                </td>

                <td className="px-6 py-4">
                    <img
                    src={`${API}/uploads/${job.photo}`}
                    alt=""
                    className="w-16 h-16 rounded-full object-cover mx-auto border"
                    />
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(job.created_at).toLocaleDateString()}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                    <span
                    className={`px-3 py-1 rounded-full text-white
                        ${
                        job.status === "Applied"
                            ? "bg-yellow-500"
                            : job.status === "Shortlisted"
                            ? "bg-blue-600"
                            : job.status === "Selected"
                            ? "bg-green-600"
                            : "bg-red-500"
                        }`}
                    >
                    {job.status}
                    </span>
                </td>

                <td className="px-6 py-4 whitespace-nowrap space-x-2">

                    <button
                    onClick={() => updateStatus(job.id, "Shortlisted")}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                    >
                    Shortlist
                    </button>

                    <button
                    onClick={() => updateStatus(job.id, "Selected")}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                    >
                    Select
                    </button>

                    <button
                    onClick={() => updateStatus(job.id, "Rejected")}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                    >
                    Reject
                    </button>

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