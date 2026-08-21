import { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import {
  User,
  Mail,
  Phone,
  ShieldCheck,
  Edit3,
  Lock,
  LogOut,
  Save,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);

  // ==========================================
  // LOAD USER
  // ==========================================

  useEffect(() => {
    try {
      const storedUser = JSON.parse(
        localStorage.getItem("user") || "null"
      );

      if (!storedUser) {
        navigate("/login");
        return;
      }

      setUser(storedUser);

      setFormData({
        name: storedUser.name || "",
        phone: storedUser.phone || "",
      });
    } catch (error) {
      console.error("User loading error:", error);
      navigate("/login");
    }
  }, [navigate]);

  // ==========================================
  // INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ==========================================
  // UPDATE PROFILE
  // ==========================================

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Please enter your name");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await axios.put(
        `${API}/api/update-profile/${user.id}`,
        {
          name: formData.name,
          phone: formData.phone,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        const updatedUser = {
          ...user,
          name: formData.name,
          phone: formData.phone,
        };

        localStorage.setItem(
          "user",
          JSON.stringify(updatedUser)
        );

        setUser(updatedUser);
        setEditing(false);

        alert("Profile updated successfully");
      } else {
        alert(
          response.data.message ||
            "Unable to update profile"
        );
      }
    } catch (error) {
      console.error("Update Profile Error:", error);

      alert(
        error.response?.data?.message ||
          "Unable to update profile"
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    navigate("/");
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-slate-500 font-medium">
          Loading profile...
        </div>
      </div>
    );
  }

  const initial =
    user?.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <>
      <Helmet>
        <title>My Profile | ServoraCare</title>

        <meta
          name="robots"
          content="noindex,nofollow"
        />

        <meta
          name="description"
          content="Manage your ServoraCare customer profile and account information."
        />
      </Helmet>

      <div className="min-h-screen bg-slate-50">

        {/* ==========================================
            HEADER
        ========================================== */}

        <div className="bg-blue-900 text-white">

          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10">

            <p className="text-sm font-semibold text-orange-300">
              CUSTOMER ACCOUNT
            </p>

            <h1 className="text-3xl sm:text-4xl font-extrabold mt-2">
              My Profile
            </h1>

            <p className="text-blue-200 mt-2">
              Manage your personal information and account.
            </p>

          </div>

        </div>


        {/* ==========================================
            MAIN
        ========================================== */}

        <main className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8">

          <div className="grid lg:grid-cols-3 gap-6">

            {/* ======================================
                PROFILE CARD
            ====================================== */}

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

              <div className="bg-blue-900 h-28"></div>

              <div className="px-6 pb-6">

                {/* AVATAR */}

                <div className="-mt-12 mb-5">

                  <div className="w-24 h-24 rounded-full bg-orange-500 border-4 border-white shadow-lg flex items-center justify-center text-white text-3xl font-extrabold">

                    {initial}

                  </div>

                </div>


                <h2 className="text-xl font-bold text-slate-900">
                  {user.name}
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  {user.email}
                </p>


                {/* ROLE */}

                <div className="mt-5">

                  <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1.5 rounded-full text-xs font-bold capitalize">

                    <ShieldCheck size={15} />

                    {user.role || "Customer"}

                  </span>

                </div>


                {/* ACCOUNT INFO */}

                <div className="border-t border-slate-100 mt-6 pt-5">

                  <p className="text-xs text-slate-400 font-semibold uppercase">
                    Account Status
                  </p>

                  <div className="flex items-center gap-2 mt-2">

                    <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></span>

                    <span className="text-sm font-semibold text-emerald-600">
                      Active
                    </span>

                  </div>

                </div>

              </div>

            </div>


            {/* ======================================
                PERSONAL INFORMATION
            ====================================== */}

            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm">

              {/* HEADER */}

              <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between gap-4">

                <div>

                  <h2 className="text-xl font-bold text-slate-900">
                    Personal Information
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Your account details
                  </p>

                </div>


                {!editing && (

                  <button
                    onClick={() => setEditing(true)}
                    className="inline-flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white px-4 py-2.5 rounded-xl text-sm font-bold transition"
                  >

                    <Edit3 size={16} />

                    Edit

                  </button>

                )}

              </div>


              {/* FORM */}

              <form
                onSubmit={handleUpdate}
                className="p-6"
              >

                <div className="grid md:grid-cols-2 gap-5">

                  {/* NAME */}

                  <div>

                    <label className="text-sm font-semibold text-slate-700">
                      Full Name
                    </label>

                    <div className="relative mt-2">

                      <User
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={!editing}
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border outline-none transition ${
                          editing
                            ? "border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                            : "border-slate-200 bg-slate-50 text-slate-600"
                        }`}
                      />

                    </div>

                  </div>


                  {/* EMAIL */}

                  <div>

                    <label className="text-sm font-semibold text-slate-700">
                      Email Address
                    </label>

                    <div className="relative mt-2">

                      <Mail
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        type="email"
                        value={user.email || ""}
                        disabled
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-500"
                      />

                    </div>

                    <p className="text-xs text-slate-400 mt-1">
                      Email cannot be changed here.
                    </p>

                  </div>


                  {/* PHONE */}

                  <div>

                    <label className="text-sm font-semibold text-slate-700">
                      Phone Number
                    </label>

                    <div className="relative mt-2">

                      <Phone
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={!editing}
                        placeholder="Enter phone number"
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border outline-none transition ${
                          editing
                            ? "border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                            : "border-slate-200 bg-slate-50 text-slate-600"
                        }`}
                      />

                    </div>

                  </div>


                  {/* ROLE */}

                  <div>

                    <label className="text-sm font-semibold text-slate-700">
                      Account Type
                    </label>

                    <div className="relative mt-2">

                      <ShieldCheck
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        type="text"
                        value={
                          user.role
                            ? user.role
                                .charAt(0)
                                .toUpperCase() +
                              user.role.slice(1)
                            : "Customer"
                        }
                        disabled
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-500"
                      />

                    </div>

                  </div>

                </div>


                {/* EDIT ACTIONS */}

                {editing && (

                  <div className="flex flex-col sm:flex-row justify-end gap-3 mt-7 pt-6 border-t border-slate-100">

                    <button
                      type="button"
                      onClick={() => {
                        setEditing(false);

                        setFormData({
                          name: user.name || "",
                          phone: user.phone || "",
                        });
                      }}
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-300 text-slate-700 font-bold hover:bg-slate-50 transition"
                    >

                      <X size={17} />

                      Cancel

                    </button>


                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-900 text-white font-bold hover:bg-blue-800 disabled:opacity-60 transition"
                    >

                      <Save size={17} />

                      {loading
                        ? "Saving..."
                        : "Save Changes"}

                    </button>

                  </div>

                )}

              </form>

            </div>

          </div>


          {/* ==========================================
              SECURITY
          ========================================== */}

          <div className="mt-6 bg-white rounded-2xl border border-slate-200 shadow-sm">

            <div className="p-6">

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

                <div className="flex items-start gap-4">

                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">

                    <Lock size={21} />

                  </div>

                  <div>

                    <h3 className="font-bold text-slate-900">
                      Account Security
                    </h3>

                    <p className="text-sm text-slate-500 mt-1">
                      Keep your ServoraCare account secure.
                    </p>

                  </div>

                </div>


                <button
                  onClick={() =>
                    navigate("/forgot-password")
                  }
                  className="inline-flex items-center justify-center gap-2 border border-slate-300 px-5 py-2.5 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition"
                >

                  <Lock size={16} />

                  Change Password

                </button>

              </div>

            </div>

          </div>


          {/* ==========================================
              LOGOUT
          ========================================== */}

          <div className="mt-6 bg-red-50 border border-red-100 rounded-2xl p-6">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

              <div>

                <h3 className="font-bold text-red-800">
                  Sign out of your account
                </h3>

                <p className="text-sm text-red-600 mt-1">
                  You can sign in again anytime.
                </p>

              </div>


              <button
                onClick={handleLogout}
                className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition"
              >

                <LogOut size={17} />

                Logout

              </button>

            </div>

          </div>

        </main>

      </div>
    </>
  );
}

export default Profile;