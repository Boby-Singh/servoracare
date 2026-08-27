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