import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  LayoutDashboard,
  LogOut,
  ChevronDown,
  UserCircle,
} from "lucide-react";
import { useEffect, useState } from "react";

import logo from "../assets/logo.jpeg";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // ==========================================
  // GET USER
  // ==========================================

  const getUser = () => {
    try {
      return JSON.parse(
        localStorage.getItem("user") || "null"
      );
    } catch (error) {
      console.error("User parsing error:", error);
      return null;
    }
  };

  const user = getUser();

  // ==========================================
  // DASHBOARD LINK
  // ==========================================

  const getDashboardLink = () => {
    if (!user) return "/login";

    switch (user.role) {
      case "admin":
        return "/admin";

      case "technician":
        return "/technician";

      default:
        return "/dashboard";
    }
  };

  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    setProfileOpen(false);
    setMenuOpen(false);

    navigate("/");
  };

  // ==========================================
  // CLOSE MOBILE MENU ON ROUTE CHANGE
  // ==========================================

  useEffect(() => {
    setMenuOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  // ==========================================
  // NAVIGATION LINKS
  // ==========================================

  const navLinks = [
    {
      name: "HOME",
      path: "/",
    },
    {
      name: "SERVICES",
      path: "/services",
    },
    {
      name: "CAREERS",
      path: "/careers",
    },
    {
      name: "ABOUT US",
      path: "/about",
    },
    {
      name: "CONTACT US",
      path: "/contact",
    },
  ];

  // ==========================================
  // ACTIVE LINK
  // ==========================================

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return location.pathname.startsWith(path);
  };


const isAdminPage = location.pathname.startsWith("/admin");

const handleMobileMenuClick = () => {
  if (isAdminPage) {
    window.dispatchEvent(new Event("toggle-admin-sidebar"));
  } else {
    setMenuOpen((prev) => !prev);
  }
};
  // ==========================================
  // USER INITIAL
  // ==========================================

  const userInitial =
    user?.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <nav className="bg-blue-900 text-white sticky top-0 z-50 shadow-xl">

      {/* =====================================================
          NAVBAR CONTAINER
      ===================================================== */}

      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center gap-3">


          {/* =================================================
              LOGO
          ================================================= */}

          <Link
            to="/"
            className="flex items-center gap-3 shrink-0"
          >

            <img
              src={logo}
              alt="ServoraCare Logo"
              className="h-14 w-14 sm:h-16 sm:w-16 object-contain"
            />

            <div className="leading-tight">

              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                ServoraCare
              </h1>

              <p className="text-sm text-orange-400 font-medium">
                Trusted Home Services
              </p>

            </div>

          </Link>


          {/* =================================================
              DESKTOP NAVIGATION
          ================================================= */}

          <ul className="hidden lg:flex items-center gap-7">

            {navLinks.map((link) => (

              <li key={link.path}>

                <Link
                  to={link.path}
                  className={`relative text-sm font-semibold tracking-wide transition ${
                    isActive(link.path)
                      ? "text-orange-300"
                      : "text-white hover:text-orange-300"
                  }`}
                >

                  {link.name}

                  {/* ACTIVE INDICATOR */}

                  {isActive(link.path) && (
                    <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-orange-400 rounded-full" />
                  )}

                </Link>

              </li>

            ))}

          </ul>


          {/* =================================================
              DESKTOP RIGHT SIDE
          ================================================= */}

          <div className="hidden lg:flex items-center gap-3">

            {!user ? (

              /* LOGIN */

              <Link to="/login">

                <button
                  className="border border-white/80 px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-white hover:text-blue-900 transition"
                >
                  LOGIN
                </button>

              </Link>

            ) : (

              <>

                {/* DASHBOARD */}

                <Link
                  to={getDashboardLink()}
                  className="flex items-center gap-2 border border-white/80 px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-white hover:text-blue-900 transition"
                >

                  <LayoutDashboard size={17} />

                  DASHBOARD

                </Link>


                {/* USER PROFILE */}

                <div className="relative">

                  <button
                    onClick={() =>
                      setProfileOpen(!profileOpen)
                    }
                    className="flex items-center gap-2 bg-blue-800 hover:bg-blue-700 px-3 py-2 rounded-xl transition"
                  >

                    <div className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center font-bold text-sm">
                      {userInitial}
                    </div>

                    <div className="text-left max-w-[130px]">

                      <p className="font-semibold text-sm truncate">
                        {user?.name || "User"}
                      </p>

                      <p className="text-[10px] text-blue-200 capitalize">
                        {user?.role || "customer"}
                      </p>

                    </div>

                    <ChevronDown
                      size={16}
                      className={`transition ${
                        profileOpen
                          ? "rotate-180"
                          : ""
                      }`}
                    />

                  </button>


                  {/* PROFILE DROPDOWN */}

                  {profileOpen && (

                    <div className="absolute right-0 mt-3 w-60 bg-white text-slate-800 rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">

                      {/* USER INFO */}

                      <div className="px-4 py-4 border-b border-slate-100">

                        <div className="flex items-center gap-3">

                          <div className="w-11 h-11 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">
                            {userInitial}
                          </div>

                          <div className="min-w-0">

                            <p className="font-bold truncate">
                              {user?.name || "User"}
                            </p>

                            <p className="text-xs text-slate-500 truncate">
                              {user?.email || ""}
                            </p>

                          </div>

                        </div>

                      </div>


                      {/* DASHBOARD */}

                      <Link
                        to={getDashboardLink()}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition"
                      >

                        <LayoutDashboard
                          size={18}
                          className="text-blue-700"
                        />

                        <span className="text-sm font-semibold">
                          Dashboard
                        </span>

                      </Link>


                      {/* PROFILE */}

                      <button
                        onClick={() => {
                          setProfileOpen(false);
                          navigate("/profile");
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition text-left"
                      >

                        <UserCircle
                          size={18}
                          className="text-slate-500"
                        />

                        <span className="text-sm font-semibold">
                          My Profile
                        </span>

                      </button>


                      {/* LOGOUT */}

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 border-t border-slate-100 text-red-600 hover:bg-red-50 transition text-left"
                      >

                        <LogOut size={18} />

                        <span className="text-sm font-semibold">
                          Logout
                        </span>

                      </button>

                    </div>

                  )}

                </div>

              </>

            )}

          </div>


          {/* =================================================
              MOBILE MENU BUTTON
          ================================================= */}

          <button
            className="lg:hidden w-11 h-11 rounded-xl bg-blue-800 hover:bg-blue-700 flex items-center justify-center transition"
            onClick={handleMobileMenuClick}
            aria-label={isAdminPage ? "Toggle admin menu" : "Toggle navigation menu"}
          >
            {isAdminPage ? (
              <Menu size={27} />
            ) : menuOpen ? (
              <X size={27} />
            ) : (
              <Menu size={27} />
            )}
          </button>

        </div>


        {/* =================================================
            MOBILE MENU
        ================================================= */}

        {menuOpen && !isAdminPage && (

          <div className="lg:hidden pb-5">

            <div className="bg-blue-800 rounded-2xl p-4 shadow-lg">

              {/* USER */}

              {user && (

                <div className="flex items-center gap-3 bg-blue-700 rounded-xl p-4 mb-4">

                  <div className="w-11 h-11 rounded-full bg-orange-500 flex items-center justify-center font-bold">
                    {userInitial}
                  </div>

                  <div className="min-w-0">

                    <p className="font-bold truncate">
                      {user?.name || "User"}
                    </p>

                    <p className="text-xs text-blue-200 capitalize">
                      {user?.role || "customer"}
                    </p>

                  </div>

                </div>

              )}


              {/* NAVIGATION */}

              <ul className="flex flex-col">

                {navLinks.map((link) => (

                  <li key={link.path}>

                    <Link
                      to={link.path}
                      onClick={() =>
                        setMenuOpen(false)
                      }
                      className={`block px-4 py-3 rounded-xl font-semibold text-sm transition ${
                        isActive(link.path)
                          ? "bg-white text-blue-900"
                          : "text-white hover:bg-blue-700 hover:text-orange-300"
                      }`}
                    >
                      {link.name}
                    </Link>

                  </li>

                ))}

              </ul>


              {/* USER ACTIONS */}

              <div className="border-t border-blue-700 mt-4 pt-4">

                {!user ? (

                  <Link
                    to="/login"
                    onClick={() =>
                      setMenuOpen(false)
                    }
                  >

                    <button
                      className="w-full border border-white px-5 py-3 rounded-xl font-bold hover:bg-white hover:text-blue-900 transition"
                    >
                      LOGIN
                    </button>

                  </Link>

                ) : (

                  <div className="space-y-3">

                    {/* DASHBOARD */}

                    <Link
                      to={getDashboardLink()}
                      onClick={() =>
                        setMenuOpen(false)
                      }
                      className="flex items-center justify-center gap-2 w-full bg-white text-blue-900 px-5 py-3 rounded-xl font-bold hover:bg-blue-50 transition"
                    >

                      <LayoutDashboard size={18} />

                      DASHBOARD

                    </Link>


                    {/* PROFILE */}

                    <Link
                      to="/profile"
                      onClick={() =>
                        setMenuOpen(false)
                      }
                      className="flex items-center justify-center gap-2 w-full bg-blue-700 text-white px-5 py-3 rounded-xl font-bold hover:bg-blue-600 transition"
                    >

                      <UserCircle size={18} />

                      MY PROFILE

                    </Link>


                    {/* LOGOUT */}

                    <button
                      onClick={handleLogout}
                      className="flex items-center justify-center gap-2 w-full bg-red-500 text-white px-5 py-3 rounded-xl font-bold hover:bg-red-600 transition"
                    >

                      <LogOut size={18} />

                      LOGOUT

                    </button>

                  </div>

                )}

              </div>

            </div>

          </div>

        )}

      </div>

    </nav>
  );
}

export default Navbar;