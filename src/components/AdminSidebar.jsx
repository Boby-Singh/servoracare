import { NavLink } from "react-router-dom";

import {
    LayoutDashboard,
    Users,
    UserCog,
    CalendarCheck,
    BriefcaseBusiness,
    UserPlus,
    LogOut,
    ShieldCheck,
    ChevronRight,
} from "lucide-react";

function AdminSidebar() {
    const menuItems = [
        {
            name: "Dashboard",
            path: "/admin",
            icon: LayoutDashboard,
        },
        {
            name: "Customers",
            path: "/admin/customers",
            icon: Users,
        },
        {
            name: "Technicians",
            path: "/admin/technicians",
            icon: UserCog,
        },
        {
            name: "Bookings",
            path: "/admin/all-bookings",
            icon: CalendarCheck,
        },
        {
            name: "Recruitment",
            path: "/admin/jobs",
            icon: BriefcaseBusiness,
        },
        {
            name: "Add Technician",
            path: "/admin/add-technician",
            icon: UserPlus,
        },
    ];

    const handleLogout = () => {
        // Add your existing logout logic here
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href = "/login";
    };

    return (
        <aside
            className="
                fixed
                left-0
                top-10
                z-50
                w-72
                h-screen
                bg-gradient-to-b
                from-blue-950
                via-blue-900
                to-blue-950
                text-white
                flex
                flex-col
                shadow-2xl
            "
        >

            {/* ================= HEADER ================= */}

            <div className="px-6 pt-7 pb-6 border-b border-blue-800/60">

                <div className="flex items-center gap-3">

                    <div
                        className="
                            w-11
                            h-11
                            rounded-xl
                            bg-white
                            flex
                            items-center
                            justify-center
                            shadow-lg
                        "
                    >
                        <ShieldCheck className="w-6 h-6 text-blue-900" />
                    </div>

                    <div>
                        <h1 className="text-xl font-bold tracking-tight">
                            ServoraCare
                        </h1>

                        <p className="text-xs text-blue-300 mt-0.5">
                            Admin Panel
                        </p>
                    </div>

                </div>

            </div>

            {/* ================= ADMIN PROFILE ================= */}

            <div className="px-5 pt-6">

                <div
                    className="
                        flex
                        items-center
                        gap-3
                        p-3
                        rounded-xl
                        bg-blue-800/40
                        border
                        border-blue-700/40
                    "
                >

                    <div
                        className="
                            w-10
                            h-10
                            rounded-full
                            bg-blue-500
                            flex
                            items-center
                            justify-center
                            font-bold
                            text-lg
                            shadow-md
                        "
                    >
                        A
                    </div>

                    <div className="flex-1 min-w-0">

                        <p className="text-sm font-semibold truncate">
                            Administrator
                        </p>

                        <p className="text-xs text-blue-300">
                            System Admin
                        </p>

                    </div>

                    <div
                        className="
                            w-2
                            h-2
                            rounded-full
                            bg-green-400
                            shadow-[0_0_8px_rgba(74,222,128,0.8)]
                        "
                    />

                </div>

            </div>

            {/* ================= NAVIGATION ================= */}

            <nav className="flex-1 px-4 pt-7 overflow-y-auto">

                <p
                    className="
                        px-3
                        mb-3
                        text-[11px]
                        font-semibold
                        uppercase
                        tracking-widest
                        text-blue-400
                    "
                >
                    Management
                </p>

                <ul className="space-y-1.5">

                    {menuItems.map((item) => {

                        const Icon = item.icon;

                        return (
                            <li key={item.path}>

                                <NavLink
                                    to={item.path}
                                    end={item.path === "/admin"}
                                    className={({ isActive }) =>
                                        `
                                        group
                                        flex
                                        items-center
                                        gap-3
                                        px-4
                                        py-3
                                        rounded-xl
                                        transition-all
                                        duration-200

                                        ${
                                            isActive
                                                ? "bg-white text-blue-900 shadow-lg shadow-blue-950/30 font-semibold"
                                                : "text-blue-100 hover:bg-blue-800/70 hover:text-white"
                                        }
                                        `
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            {/* ICON */}

                                            <div
                                                className={`
                                                    w-9
                                                    h-9
                                                    rounded-lg
                                                    flex
                                                    items-center
                                                    justify-center
                                                    transition-all

                                                    ${
                                                        isActive
                                                            ? "bg-blue-100 text-blue-700"
                                                            : "bg-blue-800/60 text-blue-300 group-hover:bg-blue-700 group-hover:text-white"
                                                    }
                                                `}
                                            >
                                                <Icon className="w-5 h-5" />
                                            </div>

                                            {/* TEXT */}

                                            <span className="flex-1 text-sm">
                                                {item.name}
                                            </span>

                                            {/* ARROW */}

                                            <ChevronRight
                                                className={`
                                                    w-4
                                                    h-4
                                                    transition-all

                                                    ${
                                                        isActive
                                                            ? "opacity-100 text-blue-600"
                                                            : "opacity-0 group-hover:opacity-100 text-blue-300"
                                                    }
                                                `}
                                            />

                                        </>
                                    )}
                                </NavLink>

                            </li>
                        );
                    })}

                </ul>

            </nav>

            {/* ================= BOTTOM ================= */}

            <div className="p-4 border-t border-blue-800/60">

                <button
                    onClick={handleLogout}
                    className="
                        w-full
                        flex
                        items-center
                        gap-3
                        px-4
                        py-3
                        rounded-xl
                        text-blue-200
                        hover:bg-red-500/10
                        hover:text-red-300
                        transition-all
                        duration-200
                    "
                >

                    <div
                        className="
                            w-9
                            h-9
                            rounded-lg
                            bg-blue-800/60
                            flex
                            items-center
                            justify-center
                        "
                    >
                        <LogOut className="w-5 h-5" />
                    </div>

                    <span className="text-sm font-medium">
                        Logout
                    </span>

                </button>

                <p className="text-center text-[10px] text-blue-500 mt-4">
                    © 2026 ServoraCare
                </p>

            </div>

        </aside>
    );
}

export default AdminSidebar;