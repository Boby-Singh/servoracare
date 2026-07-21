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
                <th className="p-3">Name</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Email</th>
                <th className="p-3">City</th>
                <th className="p-3">Position</th>
                <th className="p-3">Experience</th>
                <th className="p-3">Aadhaar</th>
                <th className="p-3">PAN</th>
                <th className="p-3">Resume</th>
                <th className="p-3">Aadhaar File</th>
                <th className="p-3">Photo</th>
                <th className="p-3">Applied On</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
            </tr>
            </thead>

            <tbody>

            {applications.map((job) => (

            <tr
                key={job.id}
                className="border-b text-center hover:bg-gray-50"
            >

            <td>{job.full_name}</td>

            <td>{job.phone}</td>

            <td>{job.email}</td>

            <td>{job.city}</td>

            <td>{job.position}</td>

            <td>{job.experience}</td>

            <td>{job.aadhaar}</td>

            <td>{job.pan}</td>

            <td>
                <a
                    href={`${API}/uploads/${job.resume}`}
                    target="_blank"
                    className="text-blue-600 underline"
                >
                    Resume
                </a>
            </td>

            <td>
                <a
                    href={`${API}/uploads/${job.aadhaar_file}`}
                    target="_blank"
                    className="text-blue-600 underline"
                >
                    Aadhaar
                </a>
            </td>

            <td>

            <img
                src={`${API}/uploads/${job.photo}`}
                alt=""
                className="w-12 h-12 rounded-full object-cover mx-auto"
            />

            </td>

            <td>

            {new Date(job.created_at).toLocaleDateString()}

            </td>

            <td>

            <span
            className={`px-3 py-1 rounded-full text-white
            ${
            job.status==="Applied"
            ?"bg-yellow-500"
            :job.status==="Shortlisted"
            ?"bg-blue-600"
            :job.status==="Selected"
            ?"bg-green-600"
            :"bg-red-500"
            }`}
            >

            {job.status}

            </span>

            </td>

            <td>

            <button className="bg-blue-500 text-white px-3 py-1 rounded">
            Shortlist
            </button>

            <button className="bg-green-600 text-white px-3 py-1 rounded ml-2">
            Select
            </button>

            <button className="bg-red-500 text-white px-3 py-1 rounded ml-2">
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