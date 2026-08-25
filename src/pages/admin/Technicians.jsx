import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../layouts/AdminLayout";

const API = import.meta.env.VITE_API_URL;

function Technicians() {
  const [technicians, setTechnicians] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTechnicians();
  }, []);

  // ==========================================
  // FETCH TECHNICIANS
  // ==========================================
  const fetchTechnicians = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        `${API}/api/admin/technicians`
      );

      setTechnicians(
        Array.isArray(response.data)
          ? response.data
          : []
      );
    } catch (error) {
      console.error("Fetch Technicians Error:", error);

      setError("Unable to load technicians.");
      setTechnicians([]);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // SEARCH
  // ==========================================
  const searchValue = search.toLowerCase().trim();

  const filteredTechnicians = technicians.filter((tech) => {
    return (
      tech.name?.toLowerCase().includes(searchValue) ||
      tech.email?.toLowerCase().includes(searchValue) ||
      tech.employee_code
        ?.toLowerCase()
        .includes(searchValue) ||
      tech.phone?.toString().includes(searchValue) ||
      tech.user_id?.toString().includes(searchValue)
    );
  });

  return (
    <AdminLayout>
      <div className="min-h-screen bg-slate-50">

        {/* ==========================================
            HEADER
        ========================================== */}
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-6">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

              {/* TITLE */}
              <div className="flex items-center gap-4">

                <div className="w-12 h-12 rounded-xl bg-blue-900 flex items-center justify-center shadow-sm">
                  <span className="text-white text-xl">
                    🔧
                  </span>
                </div>

                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                    Technicians
                  </h1>

                  <p className="text-sm text-slate-500 mt-1">
                    Manage and monitor your service technicians
                  </p>
                </div>

              </div>

              {/* SYSTEM STATUS */}
              <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full w-fit">

                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />

                <span className="text-sm font-semibold text-green-700">
                  System Online
                </span>

              </div>

            </div>

          </div>
        </div>

        {/* ==========================================
            MAIN
        ========================================== */}
        <main className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

          {/* ==========================================
              STATISTICS
          ========================================== */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">

            {/* TOTAL */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm hover:shadow-md transition">

              <div className="flex items-start justify-between">

                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Total Technicians
                  </p>

                  <p className="text-3xl font-bold text-slate-900 mt-2">
                    {technicians.length}
                  </p>
                </div>

                <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                  <span className="text-xl">
                    👨‍🔧
                  </span>
                </div>

              </div>

              <p className="text-xs text-slate-400 mt-4">
                Registered technicians
              </p>

            </div>

            {/* SEARCH RESULTS */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm hover:shadow-md transition">

              <div className="flex items-start justify-between">

                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Search Results
                  </p>

                  <p className="text-3xl font-bold text-blue-600 mt-2">
                    {filteredTechnicians.length}
                  </p>
                </div>

                <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                  <span className="text-xl">
                    🔎
                  </span>
                </div>

              </div>

              <p className="text-xs text-slate-400 mt-4">
                Matching technicians
              </p>

            </div>

            {/* TEAM STATUS */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm hover:shadow-md transition">

              <div className="flex items-start justify-between">

                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Team Status
                  </p>

                  <p className="text-3xl font-bold text-green-600 mt-2">
                    Active
                  </p>
                </div>

                <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center">
                  <span className="text-xl">
                    ✓
                  </span>
                </div>

              </div>

              <p className="text-xs text-slate-400 mt-4">
                Technician management system
              </p>

            </div>

          </div>

          {/* ==========================================
              TECHNICIAN TABLE
          ========================================== */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

            {/* TABLE HEADER */}
            <div className="px-5 sm:px-6 py-5 border-b border-slate-200">

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                    Technician Directory
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    View technician profiles and contact information
                  </p>
                </div>

                {/* SEARCH */}
                <div className="relative w-full lg:w-80">

                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    🔎
                  </span>

                  <input
                    type="text"
                    placeholder="Search technician..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="
                      w-full
                      border
                      border-slate-200
                      rounded-xl
                      pl-10
                      pr-4
                      py-2.5
                      text-sm
                      outline-none
                      bg-slate-50
                      focus:bg-white
                      focus:ring-2
                      focus:ring-blue-500/20
                      focus:border-blue-500
                      transition
                    "
                  />

                </div>

              </div>

            </div>

            {/* ==========================================
                ERROR
            ========================================== */}
            {error && !loading && (
              <div className="mx-5 sm:mx-6 mt-5 p-4 rounded-xl bg-red-50 border border-red-200">

                <div className="flex items-center justify-between gap-4">

                  <p className="text-sm font-medium text-red-700">
                    {error}
                  </p>

                  <button
                    onClick={fetchTechnicians}
                    className="text-sm font-semibold text-red-700 hover:text-red-900"
                  >
                    Retry
                  </button>

                </div>

              </div>
            )}

            {/* ==========================================
                LOADING
            ========================================== */}
            {loading ? (

              <div className="flex flex-col items-center justify-center py-20">

                <div
                  className="
                    w-10
                    h-10
                    border-4
                    border-blue-100
                    border-t-blue-700
                    rounded-full
                    animate-spin
                  "
                />

                <p className="text-sm text-slate-500 mt-4">
                  Loading technicians...
                </p>

              </div>

            ) : filteredTechnicians.length === 0 ? (

              /* ==========================================
                 EMPTY STATE
              ========================================== */
              <div className="text-center py-20 px-6">

                <div
                  className="
                    w-16
                    h-16
                    mx-auto
                    rounded-2xl
                    bg-slate-100
                    flex
                    items-center
                    justify-center
                    text-2xl
                  "
                >
                  🔧
                </div>

                <h3 className="text-lg font-semibold text-slate-900 mt-5">
                  No technicians found
                </h3>

                <p className="text-sm text-slate-500 mt-2">
                  {search
                    ? "Try changing your search."
                    : "No technicians are registered yet."
                  }
                </p>

              </div>

            ) : (

              /* ==========================================
                 TABLE
              ========================================== */
              <div className="w-full overflow-hidden">

                <table className="w-full table-fixed">

                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="w-[20%] px-4 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                        Technician
                      </th>

                      <th className="w-[12%] px-4 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                        User ID
                      </th>

                      <th className="w-[24%] px-4 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                        Email
                      </th>

                      <th className="w-[16%] px-4 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                        Employee Code
                      </th>

                      <th className="w-[16%] px-4 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                        Phone
                      </th>

                      <th className="w-[12%] px-4 py-4 text-center text-xs font-bold uppercase tracking-wider text-slate-500">
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">

                    {filteredTechnicians.map((tech) => (

                      <tr
                        key={
                          tech._id ||
                          tech.id ||
                          tech.user_id
                        }
                        className="hover:bg-slate-50/70 transition"
                      >

                        {/* TECHNICIAN */}
                        <td className="px-6 py-5">

                          <div className="flex items-center gap-3">

                            <div
                              className="
                                w-10
                                h-10
                                rounded-full
                                bg-blue-100
                                text-blue-800
                                flex
                                items-center
                                justify-center
                                font-bold
                                text-sm
                              "
                            >
                              {tech.name
                                ?.charAt(0)
                                ?.toUpperCase() || "T"}
                            </div>

                            <div>

                              <div className="font-semibold text-slate-900">
                                {tech.name || "Unknown"}
                              </div>

                              <div className="text-xs text-slate-400 mt-0.5">
                                Technician
                              </div>

                            </div>

                          </div>

                        </td>

                        {/* USER ID */}
                        <td className="px-6 py-5">

                          <span
                            className="
                              inline-flex
                              items-center
                              px-3
                              py-1.5
                              rounded-lg
                              bg-slate-100
                              text-slate-700
                              text-sm
                              font-semibold
                            "
                          >
                            #{tech.user_id || "-"}
                          </span>

                        </td>

                        {/* EMAIL */}
                        <td className="px-6 py-5">

                          <div
                            className="
                              text-sm
                              text-slate-700
                              font-medium
                            "
                          >
                            {tech.email || "-"}
                          </div>

                        </td>

                        {/* EMPLOYEE CODE */}
                        <td className="px-6 py-5">

                          <span
                            className="
                              inline-flex
                              items-center
                              px-3
                              py-1.5
                              rounded-lg
                              bg-blue-50
                              text-blue-700
                              text-sm
                              font-semibold
                            "
                          >
                            {tech.employee_code || "-"}
                          </span>

                        </td>

                        {/* PHONE */}
                        <td className="px-6 py-5">

                          {tech.phone ? (

                            <div
                              className="
                                flex
                                items-center
                                gap-2
                                text-sm
                                text-slate-700
                              "
                            >

                              <span
                                className="
                                  w-8
                                  h-8
                                  rounded-lg
                                  bg-green-50
                                  flex
                                  items-center
                                  justify-center
                                  text-sm
                                "
                              >
                                📞
                              </span>

                              {tech.phone}

                            </div>

                          ) : (

                            <span className="text-sm text-slate-400">
                              Not provided
                            </span>

                          )}

                        </td>

                        {/* STATUS */}
                        <td className="px-6 py-5 text-center">

                          <span
                            className="
                              inline-flex
                              items-center
                              gap-2
                              px-3
                              py-1.5
                              rounded-full
                              bg-green-50
                              text-green-700
                              text-xs
                              font-bold
                            "
                          >

                            <span
                              className="
                                w-1.5
                                h-1.5
                                rounded-full
                                bg-green-500
                              "
                            />

                            Active

                          </span>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            )}

            {/* ==========================================
                FOOTER
            ========================================== */}
            {!loading && filteredTechnicians.length > 0 && (

              <div
                className="
                  px-5
                  sm:px-6
                  py-4
                  border-t
                  border-slate-200
                  bg-slate-50
                  flex
                  flex-col
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                  gap-2
                "
              >

                <p className="text-sm text-slate-500">

                  Showing{" "}

                  <span className="font-semibold text-slate-700">
                    {filteredTechnicians.length}
                  </span>

                  {" "}of{" "}

                  <span className="font-semibold text-slate-700">
                    {technicians.length}
                  </span>

                  {" "}technicians

                </p>

                {search && (

                  <button
                    onClick={() => setSearch("")}
                    className="
                      text-sm
                      font-semibold
                      text-blue-700
                      hover:text-blue-900
                    "
                  >
                    Clear Search
                  </button>

                )}

              </div>

            )}

          </div>

        </main>

      </div>
    </AdminLayout>
  );
}

export default Technicians;