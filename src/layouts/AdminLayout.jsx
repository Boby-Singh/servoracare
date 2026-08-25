import AdminSidebar from "../components/AdminSidebar";

function AdminLayout({ children }) {
    return (
        <div className="min-h-screen bg-slate-50">

            {/* Admin Sidebar */}
            <AdminSidebar />

            {/* Admin Content */}
            <div className="ml-72 min-h-screen">

                <main className="px-4 sm:px-6 lg:px-8 py-6">
                    {children}
                </main>

            </div>

        </div>
    );
}

export default AdminLayout;