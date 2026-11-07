
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Keep shared layout and route protection loaded normally
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

// Lazy load public pages
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const Careers = lazy(() => import("./pages/Careers"));
const ApplyJob = lazy(() => import("./pages/ApplyJob"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogDetails = lazy(() => import("./pages/BlogDetails"));

// Lazy load authentication pages
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const VerifyOTP = lazy(() => import("./pages/VerifyOTP"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));

// Lazy load customer and technician pages
const Booking = lazy(() => import("./pages/Booking"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const TechnicianDashboard = lazy(
  () => import("./pages/TechnicianDashboard")
);
const Profile = lazy(() => import("./pages/Profile"));

// Lazy load admin pages
const Admin = lazy(() => import("./pages/Admin"));
const AllBookings = lazy(() => import("./pages/admin/AllBookings"));
const Customers = lazy(() => import("./pages/admin/Customers"));
const Technicians = lazy(() => import("./pages/admin/Technicians"));
const AdminJobs = lazy(() => import("./pages/AdminJobs"));
const AddTechnician = lazy(() => import("./pages/admin/AddTechnician"));
const SupportInbox = lazy(() => import("./pages/admin/SupportInbox"));
const Payments = lazy(() => import("./pages/admin/Payments"));
const AdminBlogs = lazy(() => import("./pages/admin/AdminBlogs"));

// Loading screen
function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-orange-500 border-t-transparent"></div>
        <p className="mt-4 text-sm font-medium text-gray-600">
          Loading ServoraCare...
        </p>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* GLOBAL NAVBAR AND LAYOUT */}
          <Route element={<Layout />}>

            {/* PUBLIC PAGES */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<ServicesPage />} />

            {/* BLOG */}
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogDetails />} />

            {/* CAREERS */}
            <Route path="/careers" element={<Careers />} />
            <Route path="/apply-job" element={<ApplyJob />} />

            {/* AUTHENTICATION */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verify-otp" element={<VerifyOTP />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* CUSTOMER BOOKING */}
            <Route
              path="/book-service"
              element={
                <ProtectedRoute>
                  <Booking />
                </ProtectedRoute>
              }
            />

            {/* CUSTOMER DASHBOARD */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            {/* TECHNICIAN DASHBOARD */}
            <Route
              path="/technician"
              element={
                <ProtectedRoute>
                  <TechnicianDashboard />
                </ProtectedRoute>
              }
            />

            {/* ADMIN DASHBOARD */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <Admin />
                </AdminRoute>
              }
            />

            <Route
              path="/admin/support"
              element={
                <AdminRoute>
                  <SupportInbox />
                </AdminRoute>
              }
            />

            <Route
              path="/admin/customers"
              element={
                <AdminRoute>
                  <Customers />
                </AdminRoute>
              }
            />

            <Route
              path="/admin/technicians"
              element={
                <AdminRoute>
                  <Technicians />
                </AdminRoute>
              }
            />

            <Route
              path="/admin/all-bookings"
              element={
                <AdminRoute>
                  <AllBookings />
                </AdminRoute>
              }
            />

            <Route
              path="/admin/payments"
              element={
                <AdminRoute>
                  <Payments />
                </AdminRoute>
              }
            />

            <Route
              path="/admin/jobs"
              element={
                <AdminRoute>
                  <AdminJobs />
                </AdminRoute>
              }
            />

            <Route
              path="/admin/add-technician"
              element={
                <AdminRoute>
                  <AddTechnician />
                </AdminRoute>
              }
            />

            <Route
              path="/admin/blog"
              element={
                <AdminRoute>
                  <AdminBlogs />
                </AdminRoute>
              }
            />

          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
