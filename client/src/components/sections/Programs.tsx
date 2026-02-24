"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Dumbbell, Flame, Zap, Timer } from "lucide-react";
import API from "@/lib/api";
import BookingModal from "../modals/BookingModal";

const iconMap: Record<string, React.ReactNode> = {
    "Dumbbell": <Dumbbell className="w-8 h-8" />,
    "Flame": <Flame className="w-8 h-8" />,
    "Zap": <Zap className="w-8 h-8" />,
    "Timer": <Timer className="w-8 h-8" />,
};

interface IProgram {
    _id: string;
    name: string;
    description: string;
    difficulty: string;
    image?: string;
}

export default function Programs() {
    const [programs, setPrograms] = useState<IProgram[]>([]);
    const [loading, setLoading] = useState(true);
    const [bookingItem, setBookingItem] = useState<{ id: string; name: string } | null>(null);

    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const { data } = await API.get("/programs");
                setPrograms(data);
            } catch (error) {
                console.error("Error fetching programs:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPrograms();
    }, []);

    if (loading) return null;

    return (
        <section id="programs" className="py-24 px-6 bg-secondary/20 relative">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <span className="text-primary font-bold uppercase tracking-widest text-xs">Our Expertise</span>
                    <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter">
                        DOMINATE EVERY <span className="text-primary">PROGRAM</span>
                    </h2>
                    <div className="w-24 h-1 bg-primary mx-auto shadow-[0_0_10px_var(--primary)]"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {programs.length > 0 ? (
                        programs.map((prog, idx) => (
                            <motion.div
                                key={prog._id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="group bg-background border border-primary/10 rounded-sm hover:border-primary/40 hover:shadow-[0_0_30px_rgba(var(--primary),0.1)] transition-all relative overflow-hidden flex flex-col"
                            >
                                <div className="aspect-video w-full overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-500">
                                    {prog.image ? (
                                        <img
                                            src={prog.image}
                                            alt={prog.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-secondary/50 flex items-center justify-center">
                                            <Dumbbell className="w-12 h-12 text-primary/20" />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60"></div>
                                </div>

                                <div className="p-8 space-y-4 flex flex-grow flex-col">
                                    <div className="text-primary transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                                        <Dumbbell className="w-6 h-6" />
                                    </div>

                                    <h3 className="text-xl font-bold uppercase italic text-foreground tracking-tight">
                                        {prog.name}
                                    </h3>

                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        {prog.description}
                                    </p>

                                    <div className="flex items-center justify-between mt-auto pt-4">
                                        <span className="text-[10px] uppercase tracking-widest font-black text-primary border border-primary/20 px-2 py-1">
                                            {prog.difficulty}
                                        </span>
                                        <button
                                            onClick={() => setBookingItem({ id: prog._id, name: prog.name })}
                                            className="text-xs uppercase font-bold tracking-widest text-foreground hover:text-primary transition-colors flex items-center gap-1 group/btn"
                                        >
                                            Join <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <p className="col-span-full text-center text-muted-foreground uppercase tracking-widest italic opacity-50 py-12">
                            No programs found in the system yet.
                        </p>
                    )}
                </div>
            </div>

            <BookingModal
                isOpen={!!bookingItem}
                onClose={() => setBookingItem(null)}
                type="program"
                itemId={bookingItem?.id || ""}
                itemName={bookingItem?.name || ""}
            />
        </section>
    );
}
