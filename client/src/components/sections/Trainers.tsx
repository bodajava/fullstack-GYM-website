"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Instagram, Twitter, Linkedin } from "lucide-react";
import API from "@/lib/api";
import BookingModal from "../modals/BookingModal";

interface ITrainer {
    _id: string;
    name: string;
    specialty: string;
    bio: string;
    image?: string;
}

export default function Trainers() {
    const [trainers, setTrainers] = useState<ITrainer[]>([]);
    const [loading, setLoading] = useState(true);
    const [bookingItem, setBookingItem] = useState<{ id: string; name: string } | null>(null);

    useEffect(() => {
        const fetchTrainers = async () => {
            try {
                const { data } = await API.get("/trainers");
                setTrainers(data);
            } catch (error) {
                console.error("Error fetching trainers:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTrainers();
    }, []);

    if (loading) return null;

    return (
        <section id="trainers" className="py-24 px-6 bg-background">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <div className="space-y-4">
                        <span className="text-primary font-bold uppercase tracking-widest text-xs">The Elites</span>
                        <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter">
                            MEET OUR <span className="text-primary">COACHES</span>
                        </h2>
                    </div>
                    <p className="max-w-md text-muted-foreground uppercase text-xs tracking-[0.2em] italic">
                        Led by the industry's best, our trainers are here to guide your every move and maximize your true potential.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {trainers.length > 0 ? (
                        trainers.map((trainer, idx) => (
                            <motion.div
                                key={trainer._id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="group relative"
                            >
                                <div className="aspect-[3/4] bg-secondary/50 border border-primary/10 rounded-sm relative overflow-hidden mb-6 group-hover:border-primary/40 transition-colors">
                                    {trainer.image ? (
                                        <img
                                            src={trainer.image}
                                            alt={trainer.name}
                                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center border-b-4 border-primary/20 bg-gradient-to-t from-background to-transparent">
                                            <span className="text-primary/10 font-black text-6xl uppercase italic rotate-[-15deg] select-none">COACH</span>
                                        </div>
                                    )}

                                    {/* Social Overlay */}
                                    <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6 z-20">
                                        <button className="p-3 bg-background rounded-full hover:scale-110 transition-transform"><Instagram className="w-6 h-6 text-primary" /></button>
                                        <button className="p-3 bg-background rounded-full hover:scale-110 transition-transform"><Twitter className="w-6 h-6 text-primary" /></button>
                                        <button className="p-3 bg-background rounded-full hover:scale-110 transition-transform"><Linkedin className="w-6 h-6 text-primary" /></button>
                                    </div>
                                </div>

                                <div className="space-y-2 text-center md:text-left">
                                    <h4 className="text-2xl font-black uppercase italic tracking-tighter text-foreground group-hover:text-primary transition-colors">
                                        {trainer.name}
                                    </h4>
                                    <p className="text-primary text-[10px] font-bold uppercase tracking-[0.3em] mb-4">
                                        {trainer.specialty}
                                    </p>
                                    <div className="w-12 h-0.5 bg-primary/30 group-hover:w-full transition-all duration-500 mb-4 mx-auto md:mx-0"></div>
                                    <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto md:mx-0 mb-6">
                                        {trainer.bio}
                                    </p>
                                    <button
                                        onClick={() => setBookingItem({ id: trainer._id, name: trainer.name })}
                                        className="w-full md:w-auto px-6 py-2 bg-secondary border border-primary/20 text-foreground font-black uppercase italic text-[10px] tracking-widest hover:bg-primary hover:text-primary-foreground transition-all rounded-sm"
                                    >
                                        Book Session
                                    </button>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <p className="col-span-full text-center text-muted-foreground uppercase tracking-widest italic opacity-50 py-12">
                            Our elite trainers are currently being onboarded.
                        </p>
                    )}
                </div>
            </div>

            <BookingModal
                isOpen={!!bookingItem}
                onClose={() => setBookingItem(null)}
                type="trainer"
                itemId={bookingItem?.id || ""}
                itemName={bookingItem?.name || ""}
            />
        </section>
    );
}
