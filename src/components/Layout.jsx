import Navbar from "./Navbar";
import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen overflow-x-hidden">
        <AdminSidebar />

        <main className="ml-64 min-h-[calc(100vh-5rem)]">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default AdminLayout;