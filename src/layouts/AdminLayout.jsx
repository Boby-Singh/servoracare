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

        window.addEventListener(
            "toggle-admin-sidebar",
            handleToggleSidebar
        );

        return () => {
            window.removeEventListener(
                "toggle-admin-sidebar",
                handleToggleSidebar
            );
        };
    }, [toggleSidebar]);

    return (
        <div className="min-h-screen bg-slate-50">

            {/* ==========================================
                ADMIN SIDEBAR
            ========================================== */}
            <AdminSidebar
                isOpen={sidebarOpen}
                onClose={closeSidebar}
            />

            {/* ==========================================
                ADMIN CONTENT
            ========================================== */}
            <div className="ml-0 lg:ml-72 min-h-screen">

                <main
                    className="
                        px-4
                        sm:px-6
                        lg:px-8
                        pt-6
                        lg:pt-6
                        pb-6
                    "
                >
                    {children}
                </main>

            </div>
        </div>
    );
}

export default AdminLayout;