"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, User, Search, Filter, CheckCircle, XCircle, Clock } from "lucide-react";
import API from "@/lib/api";
import { toast } from "react-hot-toast";

interface IBooking {
    _id: string;
    user: { name: string; email: string };
    trainer?: { name: string };
    program?: { name: string };
    bookingDate: string;
    status: string;
    notes?: string;
    createdAt: string;
}

export default function BookingsManagement() {
    const [bookings, setBookings] = useState<IBooking[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchBookings = async () => {
        try {
            const { data } = await API.get("/bookings");
            setBookings(data);
        } catch (error) {
            console.error("Error fetching bookings:", error);
            toast.error("FAILED TO LOAD BOOKINGS");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Confirmed": return "text-primary bg-primary/10 border-primary/20";
            case "Cancelled": return "text-red-500 bg-red-500/10 border-red-500/20";
            default: return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20";
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black uppercase italic tracking-tighter text-foreground mb-2">
                        BOOKING <span className="text-primary">REQUESTS</span>
                    </h1>
                    <p className="text-muted-foreground text-xs uppercase tracking-widest italic">Manage training sessions and program enrollments.</p>
                </div>

                <div className="flex gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            placeholder="SEARCH REQUESTS..."
                            className="bg-secondary/40 border border-primary/10 rounded-sm pl-10 pr-4 py-2 text-xs uppercase tracking-widest focus:outline-none focus:border-primary transition-all w-full md:w-64"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-secondary/20 border border-primary/10 rounded-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-primary/5 border-b border-primary/10">
                                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">User / Contact</th>
                                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Training Target</th>
                                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Requested Date</th>
                                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Status</th>
                                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-primary/5">
                            {bookings.length > 0 ? (
                                bookings.map((booking) => (
                                    <tr key={booking._id} className="hover:bg-primary/5 transition-colors group">
                                        <td className="p-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black uppercase text-xs border border-primary/20">
                                                    {booking.user.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-xs font-black uppercase tracking-widest text-foreground italic">{booking.user.name}</p>
                                                    <p className="text-[10px] text-muted-foreground uppercase">{booking.user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <div>
                                                <p className="text-xs font-bold uppercase tracking-widest text-foreground">
                                                    {booking.trainer ? `COACH: ${booking.trainer.name}` : `PROGRAM: ${booking.program?.name}`}
                                                </p>
                                                {booking.notes && (
                                                    <p className="text-[10px] text-muted-foreground uppercase italic mt-1 line-clamp-1">"{booking.notes}"</p>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <Calendar className="w-3 h-3 text-primary" />
                                                <span className="text-[10px] font-bold uppercase tracking-widest">
                                                    {new Date(booking.bookingDate).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest border rounded-full ${getStatusColor(booking.status)}`}>
                                                {booking.status}
                                            </span>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-2 hover:text-primary transition-colors text-muted-foreground" title="Confirm"><CheckCircle className="w-4 h-4" /></button>
                                                <button className="p-2 hover:text-red-500 transition-colors text-muted-foreground" title="Cancel"><XCircle className="w-4 h-4" /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="p-12 text-center">
                                        <div className="flex flex-col items-center space-y-3 opacity-30">
                                            <Clock className="w-12 h-12 text-muted-foreground" />
                                            <p className="text-xs uppercase font-black italic tracking-widest">No active bookings found</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
