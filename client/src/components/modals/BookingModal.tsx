"use client";

import React, { useState } from "react";
import { X, Calendar, MessageSquare, Loader2, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import API from "@/lib/api";
import { toast } from "react-hot-toast";

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: "program" | "trainer";
    itemId: string;
    itemName: string;
}

export default function BookingModal({ isOpen, onClose, type, itemId, itemName }: BookingModalProps) {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        bookingDate: "",
        notes: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await API.post("/bookings", {
                [type]: itemId,
                bookingDate: formData.bookingDate,
                notes: formData.notes,
            });
            setSuccess(true);
            toast.success("BOOKING REQUEST SENT!");
            setTimeout(() => {
                setSuccess(false);
                onClose();
            }, 2000);
        } catch (error: any) {
            toast.error(error.response?.data?.message || "BOOKING FAILED. PLEASE LOGIN.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
                    ></motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="w-full max-w-md bg-secondary border border-primary/20 rounded-sm p-8 relative z-10 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-muted-foreground hover:text-primary transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {success ? (
                            <div className="py-12 flex flex-col items-center text-center space-y-4">
                                <CheckCircle2 className="w-20 h-20 text-primary animate-bounce" />
                                <h3 className="text-2xl font-black uppercase italic tracking-tighter">BOOKED SUCCESS!</h3>
                                <p className="text-muted-foreground text-xs uppercase tracking-widest">WE WILL CONTACT YOU SHORTLY TO CONFIRM.</p>
                            </div>
                        ) : (
                            <>
                                <div className="mb-8">
                                    <span className="text-primary font-bold uppercase tracking-widest text-[10px]">Reservation</span>
                                    <h3 className="text-2xl font-black uppercase italic tracking-tighter">
                                        BOOK <span className="text-primary">{type === "program" ? "PROGRAM" : "COACH"}</span>
                                    </h3>
                                    <p className="text-muted-foreground text-xs uppercase tracking-widest mt-1">Requesting: {itemName}</p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground flex items-center gap-2 ml-1">
                                            <Calendar className="w-3 h-3 text-primary" /> Preferred Date
                                        </label>
                                        <input
                                            required
                                            type="date"
                                            value={formData.bookingDate}
                                            onChange={(e) => setFormData({ ...formData, bookingDate: e.target.value })}
                                            className="w-full bg-background border border-primary/10 px-4 py-4 text-sm focus:outline-none focus:border-primary transition-all rounded-sm text-foreground"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground flex items-center gap-2 ml-1">
                                            <MessageSquare className="w-3 h-3 text-primary" /> Additional Notes
                                        </label>
                                        <textarea
                                            rows={3}
                                            value={formData.notes}
                                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                            placeholder="ANY SPECIAL REQUIREMENTS?"
                                            className="w-full bg-background border border-primary/10 px-4 py-4 text-sm focus:outline-none focus:border-primary transition-all rounded-sm resize-none text-foreground"
                                        ></textarea>
                                    </div>

                                    <button
                                        disabled={loading}
                                        type="submit"
                                        className="w-full bg-primary text-primary-foreground py-5 font-black uppercase tracking-[.3em] hover:shadow-[0_0_20px_var(--primary)] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Confirm Request"}
                                    </button>
                                </form>
                            </>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
