import { NavLink, useNavigate } from "react-router-dom";

import {
  FaHome,
  FaUsers,
  FaUserTie,
  FaClipboardList,
  FaBriefcase,
  FaUserPlus,
  FaSignOutAlt,
  FaTools,
} from "react-icons/fa";

function AdminSidebar() {
  const navigate = useNavigate();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: <FaHome />,
    },
    {
      name: "Customers",
      path: "/admin/customers",
      icon: <FaUsers />,
    },
    {
      name: "Technicians",
      path: "/admin/technicians",
      icon: <FaUserTie />,
    },
    {
      name: "Bookings",
      path: "/admin/all-bookings",
      icon: <FaClipboardList />,
    },
    {
      name: "Recruitment",
      path: "/admin/jobs",
      icon: <FaBriefcase />,
    },
    {
      name: "Add Technician",
      path: "/admin/add-technician",
      icon: <FaUserPlus />,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-64 flex-col bg-slate-950 text-white shadow-2xl">

      {/* =========================================
          BRAND
      ========================================= */}
      <div className="border-b border-white/10 px-6 py-6">

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500 shadow-lg shadow-orange-500/20">
            <FaTools className="text-xl text-white" />
          </div>

          <div>
            <h1 className="text-xl font-extrabold tracking-tight">
              Servora<span className="text-orange-500">Care</span>
            </h1>

            <p className="mt-0.5 text-[11px] font-medium uppercase tracking-widest text-slate-400">
              Admin Portal
            </p>
          </div>

        </div>

      </div>


      {/* =========================================
          NAVIGATION
      ========================================= */}
      <div className="flex-1 overflow-y-auto px-4 py-7">

        <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
          Main Menu
        </p>

        <nav className="space-y-1.5">

          {menuItems.map((item) => (

            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/admin"}
              className={({ isActive }) =>
                `
                group flex items-center gap-3 rounded-xl px-4 py-3
                text-sm font-medium transition-all duration-200
                ${
                  isActive
                    ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }
                `
              }
            >

              <span className="flex w-5 justify-center text-lg">
                {item.icon}
              </span>

              <span>{item.name}</span>

            </NavLink>

          ))}

        </nav>


        {/* =========================================
            MANAGEMENT SECTION
        ========================================= */}

        <p className="mb-3 mt-9 px-3 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
          Management
        </p>

        <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold">
              A
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">
                Administrator
              </p>

              <p className="truncate text-xs text-slate-400">
                Super Admin
              </p>
            </div>

          </div>

        </div>

      </div>


      {/* =========================================
          LOGOUT
      ========================================= */}

      <div className="border-t border-white/10 p-4">

        <button
          onClick={handleLogout}
          className="
            flex w-full items-center gap-3
            rounded-xl px-4 py-3
            text-sm font-medium
            text-slate-300
            transition-all duration-200
            hover:bg-red-500/10
            hover:text-red-400
          "
        >

          <FaSignOutAlt className="text-lg" />

          <span>Logout</span>

        </button>

      </div>

    </aside>
  );
}

export default AdminSidebar;