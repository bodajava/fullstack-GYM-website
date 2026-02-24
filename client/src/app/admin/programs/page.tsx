"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Search, Loader2 } from "lucide-react";
import API from "@/lib/api";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

interface IProgram {
    _id: string;
    name: string;
    description: string;
    difficulty: string;
}

export default function AdminPrograms() {
    const [programs, setPrograms] = useState<IProgram[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchPrograms = async () => {
        try {
            const { data } = await API.get("/programs");
            setPrograms(data);
        } catch (error) {
            toast.error("FAILED TO FETCH PROGRAMS");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPrograms();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("ARE YOU SURE YOU WANT TO DELETE THIS PROGRAM?")) return;
        try {
            await API.delete(`/programs/${id}`);
            toast.success("PROGRAM DELETED");
            fetchPrograms();
        } catch (error) {
            toast.error("DELETE FAILED");
        }
    };

    const filtered = programs.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black uppercase italic tracking-tighter text-foreground mb-2">
                        MANAGE <span className="text-primary">PROGRAMS</span>
                    </h1>
                    <p className="text-muted-foreground text-xs uppercase tracking-widest italic">Maintain training routines and schedules.</p>
                </div>
                <button className="bg-primary text-primary-foreground px-6 py-3 font-black uppercase tracking-widest text-xs flex items-center gap-2 hover:shadow-[0_0_20px_var(--primary)] transition-all">
                    <Plus className="w-4 h-4" /> Add Program
                </button>
            </div>

            <div className="bg-secondary/20 border border-primary/10 p-6 rounded-sm">
                <div className="relative mb-6">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="SEARCH PROGRAMS..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-background border border-primary/10 pl-12 pr-4 py-3 text-xs uppercase tracking-widest focus:outline-none focus:border-primary transition-all rounded-sm"
                    />
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-primary/10">
                                <th className="pb-4 text-[10px] uppercase font-black tracking-[0.2em] text-muted-foreground">Name</th>
                                <th className="pb-4 text-[10px] uppercase font-black tracking-[0.2em] text-muted-foreground">Difficulty</th>
                                <th className="pb-4 text-[10px] uppercase font-black tracking-[0.2em] text-muted-foreground">Description</th>
                                <th className="pb-4 text-[10px] uppercase font-black tracking-[0.2em] text-muted-foreground text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-primary/5">
                            <AnimatePresence>
                                {loading ? (
                                    <tr>
                                        <td colSpan={4} className="py-12">
                                            <div className="flex flex-col items-center gap-4 text-primary">
                                                <Loader2 className="w-8 h-8 animate-spin" />
                                                <span className="text-[10px] font-black uppercase tracking-widest">Accessing Systems...</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : filtered.length > 0 ? (
                                    filtered.map((prog) => (
                                        <motion.tr
                                            key={prog._id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="group hover:bg-primary/5 transition-colors"
                                        >
                                            <td className="py-6 text-sm font-black uppercase italic tracking-tight">{prog.name}</td>
                                            <td className="py-6">
                                                <span className="text-[9px] font-black uppercase border border-primary/20 px-2 py-1 text-primary">
                                                    {prog.difficulty}
                                                </span>
                                            </td>
                                            <td className="py-6 text-xs text-muted-foreground uppercase tracking-wider max-w-xs truncate">
                                                {prog.description}
                                            </td>
                                            <td className="py-6 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button className="p-2 text-muted-foreground hover:text-primary transition-colors">
                                                        <Pencil className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(prog._id)}
                                                        className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="py-12 text-center text-muted-foreground text-[10px] uppercase tracking-widest italic opacity-50">
                                            No matching records found.
                                        </td>
                                    </tr>
                                )}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
