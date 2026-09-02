import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../layouts/AdminLayout";
import {
    Mail,
    MailOpen,
    RefreshCw,
    Search,
    Trash2,
    CheckCircle,
    X,
} from "lucide-react";

const API = import.meta.env.VITE_API_URL;

function SupportInbox() {
    const [emails, setEmails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");

    const fetchEmails = async () => {
        try {
            setLoading(true);

            const response = await axios.get(
                `${API}/api/support-emails`
            );

            setEmails(response.data.emails || []);

        } catch (error) {
            console.error("Failed to fetch support emails:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmails();
    }, []);

    const markAsRead = async (id) => {
        try {
            await axios.put(
                `${API}/api/support-emails/${id}/read`
            );

            setEmails((prev) =>
                prev.map((email) =>
                    email._id === id
                        ? { ...email, status: "read" }
                        : email
                )
            );

            if (selectedEmail?._id === id) {
                setSelectedEmail((prev) => ({
                    ...prev,
                    status: "read",
                }));
            }

        } catch (error) {
            console.error("Failed to mark email as read:", error);
        }
    };

    const markAsReplied = async (id) => {
        try {
            await axios.put(
                `${API}/api/support-emails/${id}/replied`
            );

            setEmails((prev) =>
                prev.map((email) =>
                    email._id === id
                        ? { ...email, status: "replied" }
                        : email
                )
            );

            if (selectedEmail?._id === id) {
                setSelectedEmail((prev) => ({
                    ...prev,
                    status: "replied",
                }));
            }

        } catch (error) {
            console.error("Failed to mark email as replied:", error);
        }
    };

    const deleteEmail = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this email?"
        );

        if (!confirmDelete) return;

        try {
            await axios.delete(
                `${API}/api/support-emails/${id}`
            );

            setEmails((prev) =>
                prev.filter((email) => email._id !== id)
            );

            setSelectedEmail(null);

        } catch (error) {
            console.error("Failed to delete email:", error);
        }
    };

    const openEmail = async (email) => {
        setSelectedEmail(email);

        if (email.status === "new") {
            await markAsRead(email._id);
        }
    };

    const filteredEmails = emails.filter((email) => {
        const searchText = search.toLowerCase();

        const matchesSearch =
            email.from?.toLowerCase().includes(searchText) ||
            email.subject?.toLowerCase().includes(searchText) ||
            email.text?.toLowerCase().includes(searchText);

        const matchesFilter =
            filter === "all" ||
            email.status === filter;

        return matchesSearch && matchesFilter;
    });

    const newCount = emails.filter(
        (email) => email.status === "new"
    ).length;

    const repliedCount = emails.filter(
        (email) => email.status === "replied"
    ).length;

    return (
        <AdminLayout>
            <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">

                {/* HEADER */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                            Support Inbox
                        </h1>

                        <p className="text-sm text-slate-500 mt-1">
                            Manage customer support emails
                        </p>
                    </div>

                    <button
                        onClick={fetchEmails}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Refresh
                    </button>

                </div>

                {/* STATS */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">

                    <div className="bg-white rounded-2xl border border-slate-200 p-5">
                        <p className="text-sm text-slate-500">
                            Total Emails
                        </p>

                        <p className="text-2xl font-bold text-slate-900 mt-1">
                            {emails.length}
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200 p-5">
                        <p className="text-sm text-slate-500">
                            New
                        </p>

                        <p className="text-2xl font-bold text-blue-600 mt-1">
                            {newCount}
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200 p-5">
                        <p className="text-sm text-slate-500">
                            Replied
                        </p>

                        <p className="text-2xl font-bold text-green-600 mt-1">
                            {repliedCount}
                        </p>
                    </div>

                </div>

                {/* SEARCH + FILTER */}
                <div className="bg-white border border-slate-200 rounded-2xl p-4 mb-6">

                    <div className="flex flex-col sm:flex-row gap-3">

                        <div className="relative flex-1">

                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                            <input
                                type="text"
                                placeholder="Search emails..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                            />

                        </div>

                        <select
                            value={filter}
                            onChange={(e) =>
                                setFilter(e.target.value)
                            }
                            className="px-4 py-2.5 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">
                                All Emails
                            </option>

                            <option value="new">
                                New
                            </option>

                            <option value="read">
                                Read
                            </option>

                            <option value="replied">
                                Replied
                            </option>
                        </select>

                    </div>

                </div>

                {/* EMAIL LIST */}
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">

                    {loading ? (

                        <div className="p-10 text-center text-slate-500">
                            Loading emails...
                        </div>

                    ) : filteredEmails.length === 0 ? (

                        <div className="p-10 text-center">

                            <Mail className="w-10 h-10 mx-auto text-slate-300 mb-3" />

                            <p className="font-medium text-slate-700">
                                No support emails found
                            </p>

                            <p className="text-sm text-slate-400 mt-1">
                                Customer emails will appear here.
                            </p>

                        </div>

                    ) : (

                        <div className="divide-y divide-slate-100">

                            {filteredEmails.map((email) => (

                                <button
                                    key={email._id}
                                    onClick={() => openEmail(email)}
                                    className={`w-full text-left p-4 sm:p-5 hover:bg-slate-50 transition ${
                                        email.status === "new"
                                            ? "bg-blue-50/40"
                                            : ""
                                    }`}
                                >

                                    <div className="flex items-start gap-3">

                                        <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">

                                            {email.status === "new" ? (
                                                <Mail className="w-5 h-5" />
                                            ) : (
                                                <MailOpen className="w-5 h-5" />
                                            )}

                                        </div>

                                        <div className="flex-1 min-w-0">

                                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">

                                                <p className="font-semibold text-slate-900 truncate">
                                                    {email.from}
                                                </p>

                                                <span className="text-xs text-slate-400">
                                                    {email.receivedAt
                                                        ? new Date(
                                                              email.receivedAt
                                                          ).toLocaleString()
                                                        : ""}
                                                </span>

                                            </div>

                                            <p className="font-medium text-slate-800 truncate mt-1">
                                                {email.subject ||
                                                    "(No subject)"}
                                            </p>

                                            <p className="text-sm text-slate-500 truncate mt-1">
                                                {email.text ||
                                                    "No message content"}
                                            </p>

                                        </div>

                                        {email.status === "new" && (
                                            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0 mt-2" />
                                        )}

                                    </div>

                                </button>

                            ))}

                        </div>

                    )}

                </div>

                {/* EMAIL MODAL */}
                {selectedEmail && (

                    <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4">

                        <div className="bg-white w-full max-w-3xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col">

                            {/* MODAL HEADER */}
                            <div className="flex items-center justify-between gap-4 p-5 border-b">

                                <div className="min-w-0">

                                    <h2 className="font-bold text-lg text-slate-900 truncate">
                                        {selectedEmail.subject ||
                                            "(No subject)"}
                                    </h2>

                                    <p className="text-sm text-slate-500 truncate mt-1">
                                        {selectedEmail.from}
                                    </p>

                                </div>

                                <button
                                    onClick={() =>
                                        setSelectedEmail(null)
                                    }
                                    className="w-9 h-9 rounded-lg hover:bg-slate-100 flex items-center justify-center shrink-0"
                                >
                                    <X className="w-5 h-5" />
                                </button>

                            </div>

                            {/* MESSAGE */}
                            <div className="p-5 overflow-y-auto flex-1">

                                <div className="text-xs text-slate-400 mb-5">
                                    {selectedEmail.receivedAt
                                        ? new Date(
                                              selectedEmail.receivedAt
                                          ).toLocaleString()
                                        : ""}
                                </div>

                                <div className="whitespace-pre-wrap text-sm text-slate-700 leading-7">
                                    {selectedEmail.text ||
                                        "No text content available."}
                                </div>

                            </div>

                            {/* ACTIONS */}
                            <div className="p-4 border-t bg-slate-50 flex flex-wrap gap-2">

                                <a
                                    href={`mailto:${selectedEmail.from}`}
                                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
                                >
                                    <Mail className="w-4 h-4" />
                                    Reply
                                </a>

                                {selectedEmail.status !== "replied" && (
                                    <button
                                        onClick={() =>
                                            markAsReplied(
                                                selectedEmail._id
                                            )
                                        }
                                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-green-600 text-white hover:bg-green-700"
                                    >
                                        <CheckCircle className="w-4 h-4" />
                                        Mark Replied
                                    </button>
                                )}

                                <button
                                    onClick={() =>
                                        deleteEmail(
                                            selectedEmail._id
                                        )
                                    }
                                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Delete
                                </button>

                            </div>

                        </div>

                    </div>

                )}

            </div>
        </AdminLayout>
    );
}

export default SupportInbox;