import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../layouts/AdminLayout";

import {
    FaUsers,
    FaUserCheck,
    FaCalendarCheck,
    FaUserFriends,
    FaSearch,
    FaSyncAlt,
    FaPhoneAlt,
    FaEnvelope,
    FaUser,
} from "react-icons/fa";

const API = import.meta.env.VITE_API_URL;

function Customers() {

    const [customers, setCustomers] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    // ==========================================
    // FETCH CUSTOMERS
    // ==========================================

    const fetchCustomers = async (isRefresh = false) => {

        try {

            if (isRefresh) {
                setRefreshing(true);
            } else {
                setLoading(true);
            }

            const response = await axios.get(
                `${API}/api/admin/customers`
            );

            setCustomers(response.data);

        } catch (error) {

            console.error(
                "Fetch Customers Error:",
                error
            );

        } finally {

            setLoading(false);
            setRefreshing(false);

        }
    };

    // ==========================================
    // LOAD CUSTOMERS
    // ==========================================

    useEffect(() => {
        fetchCustomers();
    }, []);

    // ==========================================
    // FILTER CUSTOMERS
    // ==========================================

    const filteredCustomers = customers.filter(
        (customer) => {

            const searchValue =
                search.toLowerCase().trim();

            return (
                customer.name
                    ?.toLowerCase()
                    .includes(searchValue) ||

                customer.email
                    ?.toLowerCase()
                    .includes(searchValue) ||

                customer.phone
                    ?.toString()
                    .includes(searchValue) ||

                customer.user_id
                    ?.toString()
                    .includes(searchValue)
            );
        }
    );

    // ==========================================
    // STATISTICS
    // ==========================================

    const totalCustomers =
        customers.length;

    const activeCustomers =
        customers.filter(
            (customer) =>
                customer.status === "Active"
        ).length;

    const totalBookings =
        customers.reduce(
            (sum, customer) =>
                sum +
                (customer.total_bookings || 0),
            0
        );

    const repeatCustomers =
        customers.filter(
            (customer) =>
                customer.total_bookings > 1
        ).length;

    // ==========================================
    // INITIALS
    // ==========================================

    const getInitials = (name) => {

        if (!name) return "U";

        return name
            .split(" ")
            .map((word) => word[0])
            .join("")
            .substring(0, 2)
            .toUpperCase();
    };

    return (

        <AdminLayout>

            <div className="min-h-screen bg-slate-50">

                {/* ==========================================
                    PAGE HEADER
                ========================================== */}

                <div className="bg-white border-b border-slate-200">

                    <div className="
                        max-w-[1800px]
                        mx-auto
                        px-4
                        sm:px-6
                        lg:px-8
                        py-6
                    ">

                        <div className="
                            flex
                            flex-col
                            md:flex-row
                            md:items-center
                            md:justify-between
                            gap-5
                        ">

                            {/* TITLE */}

                            <div>

                                <div className="
                                    flex
                                    items-center
                                    gap-3
                                ">

                                    <div className="
                                        w-11
                                        h-11
                                        rounded-xl
                                        bg-blue-900
                                        flex
                                        items-center
                                        justify-center
                                        shadow-sm
                                    ">

                                        <FaUsers
                                            className="text-white text-lg"
                                        />

                                    </div>

                                    <div>

                                        <h1 className="
                                            text-2xl
                                            sm:text-3xl
                                            font-bold
                                            text-slate-900
                                        ">
                                            Customers
                                        </h1>

                                        <p className="
                                            text-sm
                                            text-slate-500
                                            mt-1
                                        ">
                                            Manage registered customers
                                            and their service activity
                                        </p>

                                    </div>

                                </div>

                            </div>

                            {/* REFRESH */}

                            <button
                                onClick={() =>
                                    fetchCustomers(true)
                                }
                                disabled={refreshing}
                                className="
                                    inline-flex
                                    items-center
                                    justify-center
                                    gap-2
                                    px-4
                                    py-2.5
                                    rounded-xl
                                    border
                                    border-slate-200
                                    bg-white
                                    text-slate-700
                                    text-sm
                                    font-semibold
                                    hover:bg-slate-50
                                    disabled:opacity-60
                                    transition
                                    shadow-sm
                                "
                            >

                                <FaSyncAlt
                                    className={
                                        refreshing
                                            ? "animate-spin"
                                            : ""
                                    }
                                />

                                {refreshing
                                    ? "Refreshing..."
                                    : "Refresh"
                                }

                            </button>

                        </div>

                    </div>

                </div>


                {/* ==========================================
                    MAIN CONTENT
                ========================================== */}

                <main className="
                    max-w-[1800px]
                    mx-auto
                    px-4
                    sm:px-6
                    lg:px-8
                    py-6
                    sm:py-8
                ">


                    {/* ==========================================
                        STATISTICS
                    ========================================== */}

                    <div className="
                        grid
                        grid-cols-1
                        sm:grid-cols-2
                        xl:grid-cols-4
                        gap-4
                        sm:gap-6
                        mb-8
                    ">


                        {/* TOTAL CUSTOMERS */}

                        <div className="
                            bg-white
                            rounded-2xl
                            border
                            border-slate-200
                            p-5
                            sm:p-6
                            shadow-sm
                            hover:shadow-md
                            transition
                        ">

                            <div className="
                                flex
                                items-start
                                justify-between
                            ">

                                <div>

                                    <p className="
                                        text-sm
                                        font-medium
                                        text-slate-500
                                    ">
                                        Total Customers
                                    </p>

                                    <p className="
                                        text-3xl
                                        font-bold
                                        text-slate-900
                                        mt-2
                                    ">
                                        {totalCustomers}
                                    </p>

                                </div>

                                <div className="
                                    w-11
                                    h-11
                                    rounded-xl
                                    bg-blue-50
                                    flex
                                    items-center
                                    justify-center
                                ">

                                    <FaUsers
                                        className="
                                            text-blue-700
                                            text-lg
                                        "
                                    />

                                </div>

                            </div>

                            <p className="
                                text-xs
                                text-slate-400
                                mt-4
                            ">
                                Registered customers
                            </p>

                        </div>


                        {/* ACTIVE CUSTOMERS */}

                        <div className="
                            bg-white
                            rounded-2xl
                            border
                            border-slate-200
                            p-5
                            sm:p-6
                            shadow-sm
                            hover:shadow-md
                            transition
                        ">

                            <div className="
                                flex
                                items-start
                                justify-between
                            ">

                                <div>

                                    <p className="
                                        text-sm
                                        font-medium
                                        text-slate-500
                                    ">
                                        Active Customers
                                    </p>

                                    <p className="
                                        text-3xl
                                        font-bold
                                        text-green-600
                                        mt-2
                                    ">
                                        {activeCustomers}
                                    </p>

                                </div>

                                <div className="
                                    w-11
                                    h-11
                                    rounded-xl
                                    bg-green-50
                                    flex
                                    items-center
                                    justify-center
                                ">

                                    <FaUserCheck
                                        className="
                                            text-green-600
                                            text-lg
                                        "
                                    />

                                </div>

                            </div>

                            <p className="
                                text-xs
                                text-slate-400
                                mt-4
                            ">
                                Currently active accounts
                            </p>

                        </div>


                        {/* BOOKINGS */}

                        <div className="
                            bg-white
                            rounded-2xl
                            border
                            border-slate-200
                            p-5
                            sm:p-6
                            shadow-sm
                            hover:shadow-md
                            transition
                        ">

                            <div className="
                                flex
                                items-start
                                justify-between
                            ">

                                <div>

                                    <p className="
                                        text-sm
                                        font-medium
                                        text-slate-500
                                    ">
                                        Total Bookings
                                    </p>

                                    <p className="
                                        text-3xl
                                        font-bold
                                        text-yellow-500
                                        mt-2
                                    ">
                                        {totalBookings}
                                    </p>

                                </div>

                                <div className="
                                    w-11
                                    h-11
                                    rounded-xl
                                    bg-yellow-50
                                    flex
                                    items-center
                                    justify-center
                                ">

                                    <FaCalendarCheck
                                        className="
                                            text-yellow-600
                                            text-lg
                                        "
                                    />

                                </div>

                            </div>

                            <p className="
                                text-xs
                                text-slate-400
                                mt-4
                            ">
                                Service requests from customers
                            </p>

                        </div>


                        {/* REPEAT CUSTOMERS */}

                        <div className="
                            bg-white
                            rounded-2xl
                            border
                            border-slate-200
                            p-5
                            sm:p-6
                            shadow-sm
                            hover:shadow-md
                            transition
                        ">

                            <div className="
                                flex
                                items-start
                                justify-between
                            ">

                                <div>

                                    <p className="
                                        text-sm
                                        font-medium
                                        text-slate-500
                                    ">
                                        Repeat Customers
                                    </p>

                                    <p className="
                                        text-3xl
                                        font-bold
                                        text-purple-600
                                        mt-2
                                    ">
                                        {repeatCustomers}
                                    </p>

                                </div>

                                <div className="
                                    w-11
                                    h-11
                                    rounded-xl
                                    bg-purple-50
                                    flex
                                    items-center
                                    justify-center
                                ">

                                    <FaUserFriends
                                        className="
                                            text-purple-600
                                            text-lg
                                        "
                                    />

                                </div>

                            </div>

                            <p className="
                                text-xs
                                text-slate-400
                                mt-4
                            ">
                                Customers with multiple bookings
                            </p>

                        </div>

                    </div>


                    {/* ==========================================
                        CUSTOMER TABLE
                    ========================================== */}

                    <div className="
                        bg-white
                        rounded-2xl
                        border
                        border-slate-200
                        shadow-sm
                        overflow-hidden
                    ">


                        {/* TABLE HEADER */}

                        <div className="
                            px-5
                            sm:px-6
                            py-5
                            border-b
                            border-slate-200
                        ">

                            <div className="
                                flex
                                flex-col
                                lg:flex-row
                                lg:items-center
                                lg:justify-between
                                gap-4
                            ">

                                <div>

                                    <h2 className="
                                        text-lg
                                        sm:text-xl
                                        font-bold
                                        text-slate-900
                                    ">
                                        Customer Directory
                                    </h2>

                                    <p className="
                                        text-sm
                                        text-slate-500
                                        mt-1
                                    ">
                                        View and manage all registered customers
                                    </p>

                                </div>


                                {/* SEARCH */}

                                <div className="
                                    relative
                                    w-full
                                    lg:w-96
                                ">

                                    <FaSearch
                                        className="
                                            absolute
                                            left-3.5
                                            top-1/2
                                            -translate-y-1/2
                                            text-slate-400
                                        "
                                    />

                                    <input
                                        type="text"
                                        placeholder="Search by name, email, phone or ID..."
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                        className="
                                            w-full
                                            border
                                            border-slate-200
                                            rounded-xl
                                            pl-10
                                            pr-4
                                            py-3
                                            text-sm
                                            text-slate-700
                                            outline-none
                                            bg-slate-50
                                            focus:bg-white
                                            focus:ring-2
                                            focus:ring-blue-500/20
                                            focus:border-blue-500
                                            transition
                                        "
                                    />

                                </div>

                            </div>

                        </div>


                        {/* RESULT COUNT */}

                        {!loading && (

                            <div className="
                                px-5
                                sm:px-6
                                py-3
                                bg-slate-50
                                border-b
                                border-slate-100
                                flex
                                items-center
                                justify-between
                            ">

                                <p className="
                                    text-xs
                                    sm:text-sm
                                    text-slate-500
                                ">

                                    Showing{" "}

                                    <span className="
                                        font-semibold
                                        text-slate-700
                                    ">
                                        {filteredCustomers.length}
                                    </span>

                                    {" "}of{" "}

                                    <span className="
                                        font-semibold
                                        text-slate-700
                                    ">
                                        {customers.length}
                                    </span>

                                    {" "}customers

                                </p>

                                {search && (

                                    <button
                                        onClick={() =>
                                            setSearch("")
                                        }
                                        className="
                                            text-xs
                                            font-semibold
                                            text-blue-600
                                            hover:text-blue-800
                                        "
                                    >
                                        Clear search
                                    </button>

                                )}

                            </div>

                        )}


                        {/* ==========================================
                            LOADING
                        ========================================== */}

                        {loading ? (

                            <div className="
                                flex
                                flex-col
                                items-center
                                justify-center
                                py-20
                            ">

                                <div className="
                                    w-10
                                    h-10
                                    border-4
                                    border-blue-100
                                    border-t-blue-700
                                    rounded-full
                                    animate-spin
                                " />

                                <p className="
                                    text-sm
                                    text-slate-500
                                    mt-4
                                ">
                                    Loading customers...
                                </p>

                            </div>

                        ) : filteredCustomers.length === 0 ? (

                            /* ==========================================
                                EMPTY
                            ========================================== */

                            <div className="
                                text-center
                                py-20
                                px-6
                            ">

                                <div className="
                                    w-16
                                    h-16
                                    mx-auto
                                    rounded-2xl
                                    bg-slate-100
                                    flex
                                    items-center
                                    justify-center
                                ">

                                    <FaUsers
                                        className="
                                            text-slate-400
                                            text-2xl
                                        "
                                    />

                                </div>

                                <h3 className="
                                    text-lg
                                    font-semibold
                                    text-slate-900
                                    mt-5
                                ">
                                    No customers found
                                </h3>

                                <p className="
                                    text-sm
                                    text-slate-500
                                    mt-2
                                ">
                                    Try changing your search criteria.
                                </p>

                            </div>

                        ) : (

                            /* ==========================================
                                TABLE
                            ========================================== */

                            <div className="overflow-x-auto">

                                <table className="
                                    w-full
                                    min-w-[1050px]
                                ">

                                    <thead className="
                                        bg-slate-50
                                        border-b
                                        border-slate-200
                                    ">

                                        <tr>

                                            <th className="
                                                px-5
                                                py-4
                                                text-left
                                                text-xs
                                                font-bold
                                                uppercase
                                                tracking-wider
                                                text-slate-500
                                            ">
                                                Customer
                                            </th>

                                            <th className="
                                                px-5
                                                py-4
                                                text-left
                                                text-xs
                                                font-bold
                                                uppercase
                                                tracking-wider
                                                text-slate-500
                                            ">
                                                Contact
                                            </th>

                                            <th className="
                                                px-5
                                                py-4
                                                text-left
                                                text-xs
                                                font-bold
                                                uppercase
                                                tracking-wider
                                                text-slate-500
                                            ">
                                                User ID
                                            </th>

                                            <th className="
                                                px-5
                                                py-4
                                                text-center
                                                text-xs
                                                font-bold
                                                uppercase
                                                tracking-wider
                                                text-slate-500
                                            ">
                                                Bookings
                                            </th>

                                            <th className="
                                                px-5
                                                py-4
                                                text-center
                                                text-xs
                                                font-bold
                                                uppercase
                                                tracking-wider
                                                text-slate-500
                                            ">
                                                Status
                                            </th>

                                        </tr>

                                    </thead>


                                    <tbody className="
                                        divide-y
                                        divide-slate-100
                                    ">

                                        {filteredCustomers.map(
                                            (customer) => (

                                                <tr
                                                    key={
                                                        customer._id ||
                                                        customer.id ||
                                                        customer.user_id
                                                    }
                                                    className="
                                                        hover:bg-slate-50/70
                                                        transition
                                                    "
                                                >

                                                    {/* CUSTOMER */}

                                                    <td className="
                                                        px-5
                                                        py-5
                                                    ">

                                                        <div className="
                                                            flex
                                                            items-center
                                                            gap-3
                                                        ">

                                                            <div className="
                                                                w-11
                                                                h-11
                                                                rounded-xl
                                                                bg-blue-50
                                                                text-blue-700
                                                                flex
                                                                items-center
                                                                justify-center
                                                                font-bold
                                                                text-sm
                                                                shrink-0
                                                            ">

                                                                {getInitials(
                                                                    customer.name
                                                                )}

                                                            </div>

                                                            <div>

                                                                <div className="
                                                                    font-semibold
                                                                    text-slate-900
                                                                ">
                                                                    {customer.name ||
                                                                        "Unknown Customer"}
                                                                </div>

                                                                <div className="
                                                                    text-xs
                                                                    text-slate-400
                                                                    mt-1
                                                                ">
                                                                    Customer
                                                                    Account
                                                                </div>

                                                            </div>

                                                        </div>

                                                    </td>


                                                    {/* CONTACT */}

                                                    <td className="
                                                        px-5
                                                        py-5
                                                    ">

                                                        <div className="
                                                            space-y-1.5
                                                        ">

                                                            <div className="
                                                                flex
                                                                items-center
                                                                gap-2
                                                                text-sm
                                                                text-slate-700
                                                            ">

                                                                <FaEnvelope
                                                                    className="
                                                                        text-slate-400
                                                                        text-xs
                                                                    "
                                                                />

                                                                <span>
                                                                    {customer.email ||
                                                                        "-"}
                                                                </span>

                                                            </div>


                                                            <div className="
                                                                flex
                                                                items-center
                                                                gap-2
                                                                text-sm
                                                                text-slate-500
                                                            ">

                                                                <FaPhoneAlt
                                                                    className="
                                                                        text-slate-400
                                                                        text-xs
                                                                    "
                                                                />

                                                                <span>
                                                                    {customer.phone ||
                                                                        "Phone not available"}
                                                                </span>

                                                            </div>

                                                        </div>

                                                    </td>


                                                    {/* USER ID */}

                                                    <td className="
                                                        px-5
                                                        py-5
                                                    ">

                                                        <span className="
                                                            inline-flex
                                                            items-center
                                                            gap-2
                                                            px-3
                                                            py-1.5
                                                            rounded-lg
                                                            bg-slate-100
                                                            text-slate-700
                                                            text-sm
                                                            font-semibold
                                                        ">

                                                            <FaUser
                                                                className="
                                                                    text-slate-400
                                                                    text-xs
                                                                "
                                                            />

                                                            #{customer.user_id}

                                                        </span>

                                                    </td>


                                                    {/* BOOKINGS */}

                                                    <td className="
                                                        px-5
                                                        py-5
                                                        text-center
                                                    ">

                                                        <span className="
                                                            inline-flex
                                                            min-w-[42px]
                                                            justify-center
                                                            items-center
                                                            px-3
                                                            py-1.5
                                                            rounded-lg
                                                            bg-blue-50
                                                            text-blue-700
                                                            text-sm
                                                            font-bold
                                                        ">

                                                            {customer.total_bookings ||
                                                                0}

                                                        </span>

                                                    </td>


                                                    {/* STATUS */}

                                                    <td className="
                                                        px-5
                                                        py-5
                                                        text-center
                                                    ">

                                                        <span
                                                            className={`
                                                                inline-flex
                                                                items-center
                                                                gap-2
                                                                px-3
                                                                py-1.5
                                                                rounded-full
                                                                text-xs
                                                                font-bold

                                                                ${
                                                                    customer.status ===
                                                                    "Active"

                                                                        ? "bg-green-50 text-green-700"

                                                                        : "bg-slate-100 text-slate-600"
                                                                }
                                                            `}
                                                        >

                                                            <span
                                                                className={`
                                                                    w-1.5
                                                                    h-1.5
                                                                    rounded-full

                                                                    ${
                                                                        customer.status ===
                                                                        "Active"

                                                                            ? "bg-green-500"

                                                                            : "bg-slate-400"
                                                                    }
                                                                `}
                                                            />

                                                            {customer.status ||
                                                                "Inactive"}

                                                        </span>

                                                    </td>

                                                </tr>

                                            )
                                        )}

                                    </tbody>

                                </table>

                            </div>

                        )}

                    </div>

                </main>

            </div>

        </AdminLayout>
    );
}

export default Customers;