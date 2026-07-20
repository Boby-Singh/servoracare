import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Booking from "./pages/Booking"
import ServicesPage from "./pages/ServicesPage"
import Careers from "./pages/Careers";
import Admin from "./pages/Admin"
import Login from "./pages/Login"
import ProtectedRoute from "./components/ProtectedRoute"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import TechnicianDashboard from "./pages/TechnicianDashboard"
import AdminRoute from "./components/AdminRoute"
import Customers from "./pages/admin/Customers"
import Technicians from "./pages/admin/Technicians"
import AddTechnician from "./pages/admin/AddTechnician"
function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route 
        path="/careers" 
        element={<Careers />} 
        />

        <Route
          path="/book-service"
          element={
            <ProtectedRoute>
              <Booking />
            </ProtectedRoute>
          }
        />
        

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/services"
          element={<ServicesPage />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/technician"
          element={
              <TechnicianDashboard />
          }
        />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Admin />
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
          path="/admin/add-technician"
          element={
            <AdminRoute>
              <AddTechnician />
            </AdminRoute>
          }
        />
        
        

      </Routes>

    </BrowserRouter>
  )
}

export default App