import AdminSidebar from "../components/AdminSidebar";

function AdminLayout({ children }) {
    return (
        <div className="min-h-screen bg-slate-50">

            {/* ================= FIXED SIDEBAR ================= */}
            <AdminSidebar />

            {/* ================= MAIN CONTENT ================= */}
            <div className="ml-72 min-h-screen">

                <main className="w-full px-4 sm:px-6 lg:px-8 py-6">
                    {children}
                </main>

            </div>

        </div>
    );
}

export default AdminLayout;