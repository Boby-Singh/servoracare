
import { useCallback, useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";

function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    const handleToggleSidebar = () => {
      toggleSidebar();
    };

    window.addEventListener("toggle-admin-sidebar", handleToggleSidebar);

    return () => {
      window.removeEventListener(
        "toggle-admin-sidebar",
        handleToggleSidebar
      );
    };
  }, [toggleSidebar]);

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={closeSidebar}
      />

      <div className="ml-0 min-h-screen lg:ml-72">
        <main className="px-4 pb-6 pt-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
