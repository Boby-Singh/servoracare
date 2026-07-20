import { Link, useNavigate } from "react-router-dom"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import logo from "../assets/logo.jpeg"

function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false)

  const navigate = useNavigate()

  const user = JSON.parse(localStorage.getItem("user"))

  const handleLogout = () => {

    localStorage.removeItem("user")
    localStorage.removeItem("token")

    navigate("/")

  }

  const getDashboardLink = () => {

    if (!user) return "/login"

    switch (user.role) {

      case "admin":
        return "/admin"

      case "technician":
        return "/technician"

      default:
        return "/dashboard"

    }

  }

  return (

    <nav className="bg-blue-900 text-white px-8 py-4 sticky top-0 z-50 shadow-xl">

      <div className="flex justify-between items-center">

        {/* Logo */}

        <Link to="/" className="flex items-center gap-3">

          <img
            src={logo}
            alt="ServoraCare"
            className="h-20 w-20 rounded-full bg-white p-1 shadow-md"
          />

          <div>
            <h1 className="text-3xl font-extrabold leading-none tracking-wide">
              ServoraCare
            </h1>

            <p className="text-sm text-orange-300">
              Trusted Home Services
            </p>
          </div>

        </Link>

        {/* Desktop Menu */}

        <ul className="hidden md:flex gap-10 text-lg items-center">

          <Link to="/">
            <li className="hover:text-orange-400 transition">
              Home
            </li>
          </Link>

          <Link to="/services">
            <li className="hover:text-orange-400 transition">
              Services
            </li>
          </Link>

          <Link to="/careers">
            <li className="hover:text-orange-400 transition">
              Careers
            </li>
          </Link>

          <Link to="/about">
            <li className="hover:text-orange-400 transition">
              About
            </li>
          </Link>

          <Link to="/contact">
            <li className="hover:text-orange-400 transition">
              Contact
            </li>
          </Link>

        </ul>

        {/* Desktop Right Side */}

        <div className="hidden md:flex items-center gap-4">

          <Link to="/book-service">
            <button className="bg-orange-500 px-5 py-2 rounded-lg hover:bg-orange-600 transition">
              Book Now
            </button>
          </Link>

          {!user ? (

            <Link to="/login">
              <button className="border border-white px-5 py-2 rounded-lg hover:bg-white hover:text-blue-900 transition">
                Login
              </button>
            </Link>

          ) : (

            <>
              {/* User */}

              <div className="flex items-center gap-3 bg-blue-800 px-4 py-2 rounded-full">

                <div className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center font-bold">

                  {user?.name?.charAt(0)?.toUpperCase() || "U"}

                </div>

                <span className="font-medium">
                  {user.name}
                </span>

              </div>

              {/* Dashboard */}

              <Link to={getDashboardLink()}>
                <button className="border border-white px-5 py-2 rounded-lg hover:bg-white hover:text-blue-900 transition">
                  Dashboard
                </button>
              </Link>

              {/* Logout */}

              <button
                onClick={handleLogout}
                className="bg-red-500 px-5 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>

            </>

          )}

        </div>

        {/* Mobile Menu Button */}

        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >

          {menuOpen ? <X size={32} /> : <Menu size={32} />}

        </button>

      </div>

      {/* Mobile Menu */}

      {menuOpen && (

        <div className="md:hidden mt-5 bg-blue-800 rounded-xl p-5 shadow-lg">

          <ul className="flex flex-col gap-5 text-lg">

            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
            >
              <li className="hover:text-orange-400">
                Home
              </li>
            </Link>

            <Link
              to="/services"
              onClick={() => setMenuOpen(false)}
            >
              <li className="hover:text-orange-400">
                Services
              </li>
            </Link>

            <Link
              to="/careers"
              onClick={() => setMenuOpen(false)}
            >
              <li className="hover:text-orange-400">
                Careers
              </li>
            </Link>

            <Link
              to="/about"
              onClick={() => setMenuOpen(false)}
            >
              <li className="hover:text-orange-400">
                About
              </li>
            </Link>

            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
            >
              <li className="hover:text-orange-400">
                Contact
              </li>
            </Link>

            <Link
              to="/book-service"
              onClick={() => setMenuOpen(false)}
            >
              <button className="bg-orange-500 px-5 py-2 rounded-lg w-full hover:bg-orange-600 transition">
                Book Now
              </button>
            </Link>

            {!user ? (

              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
              >

                <button className="border border-white px-5 py-2 rounded-lg w-full hover:bg-white hover:text-blue-900 transition">
                  Login
                </button>

              </Link>

            ) : (

              <>

                <div className="flex items-center justify-center gap-3 bg-blue-700 rounded-lg py-3">

                  <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center font-bold">

                    {user.name.charAt(0).toUpperCase()}

                  </div>

                  <span className="font-semibold">
                    {user.name}
                  </span>

                </div>

                <Link
                  to={getDashboardLink()}
                  onClick={() => setMenuOpen(false)}
                >

                  <button className="border border-white px-5 py-2 rounded-lg w-full hover:bg-white hover:text-blue-900 transition">
                    Dashboard
                  </button>

                </Link>

                <button
                  onClick={handleLogout}
                  className="bg-red-500 px-5 py-2 rounded-lg w-full hover:bg-red-600 transition"
                >
                  Logout
                </button>

              </>

            )}

          </ul>

        </div>

      )}

    </nav>

  )

}

export default Navbar