import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    Users,
    UserCog,
    CalendarCheck,
    BriefcaseBusiness,
    UserPlus,
    Mail,
    LogOut,
    ShieldCheck,
    ChevronRight,
    X,
    CreditCard,
} from "lucide-react";

function AdminSidebar({ isOpen, onClose }) {
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
            name: "Payments",
            path: "/admin/payments",
            icon: CreditCard,
        },
        {
            name: "Support Inbox",
            path: "/admin/support",
            icon: Mail,
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

    // Close sidebar when pressing Escape
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, [onClose]);

    // Prevent background scrolling when mobile sidebar is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href = "/login";
    };

    return (
        <>
            {/* ==========================================
                MOBILE OVERLAY
            ========================================== */}
            {isOpen && (
                <div
                    onClick={onClose}
                    className="
                        fixed
                        inset-0
                        z-40
                        bg-black/50
                        backdrop-blur-[2px]
                        lg:hidden
                    "
                />
            )}

            {/* ==========================================
                SIDEBAR
            ========================================== */}
            <aside
                className={`
                    fixed
                    left-0
                    top-20
                    z-50
                    w-72
                    h-[calc(100vh-4rem)]
                    bg-gradient-to-b
                    from-blue-950
                    via-blue-900
                    to-blue-950
                    text-white
                    flex
                    flex-col
                    shadow-2xl

                    transform
                    transition-transform
                    duration-300
                    ease-in-out

                    ${isOpen ? "translate-x-0" : "-translate-x-full"}
                    lg:translate-x-0
                `}
            >
                {/* ==========================================
                    HEADER
                ========================================== */}
                <div className="px-5 sm:px-6 pt-5 sm:pt-7 pb-5 sm:pb-6 border-b border-blue-800/60">
                    <div className="flex items-center gap-3">
                        <div
                            className="
                                w-10
                                h-10
                                sm:w-11
                                sm:h-11
                                rounded-xl
                                bg-white
                                flex
                                items-center
                                justify-center
                                shadow-lg
                                shrink-0
                            "
                        >
                            <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-blue-900" />
                        </div>

                        <div className="min-w-0">
                            <h1 className="text-lg sm:text-xl font-bold tracking-tight truncate">
                                ServoraCare
                            </h1>

                            <p className="text-[11px] sm:text-xs text-blue-300 mt-0.5">
                                Admin Panel
                            </p>
                        </div>

                        {/* Mobile close button */}
                        <button
                            onClick={onClose}
                            className="
                                ml-auto
                                lg:hidden
                                w-9
                                h-9
                                rounded-lg
                                flex
                                items-center
                                justify-center
                                text-blue-200
                                hover:bg-blue-800
                                hover:text-white
                                transition
                                shrink-0
                            "
                            aria-label="Close menu"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* ==========================================
                    ADMIN PROFILE
                ========================================== */}
                <div className="px-4 sm:px-5 pt-5 sm:pt-6">
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
                                shrink-0
                            "
                        >
                            A
                        </div>

                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold truncate">
                                Administrator
                            </p>

                            <p className="text-xs text-blue-300 truncate">
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
                                shrink-0
                            "
                        />
                    </div>
                </div>

                {/* ==========================================
                    NAVIGATION
                ========================================== */}
                <nav className="flex-1 px-3 sm:px-4 pt-6 sm:pt-7 overflow-y-auto">
                    <p
                        className="
                            px-3
                            mb-3
                            text-[10px]
                            sm:text-[11px]
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
                                        onClick={onClose}
                                        className={({ isActive }) =>
                                            `
                                            group
                                            flex
                                            items-center
                                            gap-3
                                            px-3
                                            sm:px-4
                                            py-2.5
                                            sm:py-3
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
                                                        shrink-0
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
                                                <span className="flex-1 text-sm truncate">
                                                    {item.name}
                                                </span>

                                                {/* ARROW */}
                                                <ChevronRight
                                                    className={`
                                                        w-4
                                                        h-4
                                                        transition-all
                                                        shrink-0
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

                {/* ==========================================
                    BOTTOM
                ========================================== */}
                <div className="p-3 sm:p-4 border-t border-blue-800/60">
                    <button
                        onClick={handleLogout}
                        className="
                            w-full
                            flex
                            items-center
                            gap-3
                            px-3
                            sm:px-4
                            py-2.5
                            sm:py-3
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
                                shrink-0
                            "
                        >
                            <LogOut className="w-5 h-5" />
                        </div>

                        <span className="text-sm font-medium">
                            Logout
                        </span>
                    </button>

                    <p className="text-center text-[10px] text-blue-500 mt-3 sm:mt-4">
                        © 2026 ServoraCare
                    </p>
                </div>
            </aside>
        </>
    );
}

export default AdminSidebar;