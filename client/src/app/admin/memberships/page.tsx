"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Loader2, CreditCard } from "lucide-react";
import API from "@/lib/api";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

interface IMembership {
    _id: string;
    title: string;
    price: number;
    duration: string;
    features: string[];
}

export default function AdminMemberships() {
    const [memberships, setMemberships] = useState<IMembership[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchMemberships = async () => {
        try {
            const { data } = await API.get("/memberships");
            setMemberships(data);
        } catch (error) {
            toast.error("FAILED TO FETCH PLANS");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMemberships();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("REMOVE THIS MEMBERSHIP PLAN?")) return;
        try {
            await API.delete(`/memberships/${id}`);
            toast.success("PLAN REMOVED");
            fetchMemberships();
        } catch (error) {
            toast.error("DELETE FAILED");
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black uppercase italic tracking-tighter text-foreground mb-2">
                        PRICING <span className="text-primary">LEVELS</span>
                    </h1>
                    <p className="text-muted-foreground text-xs uppercase tracking-widest italic">Configure membership tiers and pricing.</p>
                </div>
                <button className="bg-primary text-primary-foreground px-6 py-3 font-black uppercase tracking-widest text-xs flex items-center gap-2 hover:shadow-[0_0_20px_var(--primary)] transition-all">
                    <Plus className="w-4 h-4" /> Create Plan
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AnimatePresence>
                    {loading ? (
                        <div className="col-span-full flex flex-col items-center gap-4 py-12 text-primary">
                            <Loader2 className="w-8 h-8 animate-spin" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Syncing Data...</span>
                        </div>
                    ) : memberships.length > 0 ? (
                        memberships.map((plan, idx) => (
                            <motion.div
                                key={plan._id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-secondary/20 border border-primary/10 p-8 rounded-sm group hover:border-primary/40 transition-colors"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="p-3 bg-primary/10 border border-primary/20 rounded-sm text-primary">
                                            <CreditCard className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black uppercase italic tracking-tighter">{plan.title}</h3>
                                            <p className="text-[10px] text-primary font-bold uppercase tracking-widest">${plan.price} / {plan.duration}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-2 bg-background border border-primary/20 rounded-sm text-muted-foreground hover:text-primary transition-colors">
                                            <Pencil className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(plan._id)}
                                            className="p-2 bg-background border border-primary/20 rounded-sm text-muted-foreground hover:text-destructive transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">Included Features:</div>
                                    {plan.features.map((f, i) => (
                                        <div key={i} className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground italic">
                                            <div className="w-1 h-1 bg-primary rounded-full"></div> {f}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full py-12 text-center text-muted-foreground text-[10px] uppercase tracking-widest italic opacity-50">
                            No pricing levels configured.
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
