// import AdminSidebar from "../components/AdminSidebar";

// function AdminLayout({ children }) {
//     return (
//         <div className="min-h-screen bg-slate-50">

//             {/* Admin Sidebar */}
//             <AdminSidebar />

//             {/* Admin Content */}
//             <div className="ml-72 min-h-screen">

//                 <main className="px-4 sm:px-6 lg:px-8 py-6">
//                     {children}
//                 </main>

//             </div>

//         </div>
//     );
// }

// export default AdminLayout;

import { useCallback, useState } from "react";
import { Menu } from "lucide-react";
import AdminSidebar from "../components/AdminSidebar";

function AdminLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const closeSidebar = useCallback(() => {
        setSidebarOpen(false);
    }, []);

    const toggleSidebar = () => {
        setSidebarOpen((prev) => !prev);
    };

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
                MOBILE TOP BAR
            ========================================== */}
            <div
                className="
                    fixed
                    top-16
                    left-0
                    right-0
                    z-30
                    h-14
                    bg-white
                    border-b
                    border-slate-200
                    flex
                    items-center
                    px-4
                    shadow-sm
                    lg:hidden
                "
            >
                <button
                    onClick={toggleSidebar}
                    className="
                        w-10
                        h-10
                        rounded-xl
                        flex
                        items-center
                        justify-center
                        bg-blue-50
                        text-blue-900
                        hover:bg-blue-100
                        transition
                    "
                    aria-label="Open admin menu"
                >
                    <Menu className="w-6 h-6" />
                </button>

                <div className="ml-3">
                    <h1 className="text-base font-bold text-slate-800">
                        ServoraCare
                    </h1>

                    <p className="text-[10px] text-slate-500">
                        Admin Panel
                    </p>
                </div>
            </div>

            {/* ==========================================
                ADMIN CONTENT
            ========================================== */}
            <div className="ml-0 lg:ml-72 min-h-screen">
                <main
                    className="
                        px-4
                        sm:px-6
                        lg:px-8
                        pt-20
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