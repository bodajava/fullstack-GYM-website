"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import API from "@/lib/api";
import BookingModal from "../modals/BookingModal";

interface IMembership {
    _id: string;
    title: string;
    price: number;
    duration: string;
    features: string[];
}

export default function Membership() {
    const [memberships, setMemberships] = useState<IMembership[]>([]);
    const [loading, setLoading] = useState(true);
    const [bookingItem, setBookingItem] = useState<{ id: string; name: string } | null>(null);

    useEffect(() => {
        const fetchMemberships = async () => {
            try {
                const { data } = await API.get("/memberships");
                setMemberships(data);
            } catch (error) {
                console.error("Error fetching memberships:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMemberships();
    }, []);

    if (loading) return null;

    return (
        <section id="membership" className="py-24 px-6 bg-secondary/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px]"></div>

            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <span className="text-primary font-bold uppercase tracking-widest text-xs">Pricing Plans</span>
                    <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter">
                        CHOOSE YOUR <span className="text-primary">LEVEL</span>
                    </h2>
                    <p className="text-muted-foreground uppercase text-xs tracking-widest italic">
                        No hidden fees. Flexible options for every athlete.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {memberships.length > 0 ? (
                        memberships.map((plan, idx) => {
                            const popular = plan.title.toLowerCase().includes("pro");
                            return (
                                <motion.div
                                    key={plan._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className={cn(
                                        "relative bg-background border p-8 rounded-sm flex flex-col group",
                                        popular ? "border-primary shadow-[0_0_40px_rgba(var(--primary),0.15)] scale-105 z-10" : "border-primary/10"
                                    )}
                                >
                                    {popular && (
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-[0.3em] px-4 py-1 flex items-center gap-1">
                                            <Zap className="w-3 h-3 fill-current" /> Popular
                                        </div>
                                    )}

                                    <div className="mb-8">
                                        <h3 className="text-xl font-black uppercase italic tracking-tighter mb-4 text-foreground">
                                            {plan.title}
                                        </h3>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-4xl font-black text-primary">$</span>
                                            <span className="text-6xl font-black text-foreground italic tracking-tighter">{plan.price}</span>
                                            <span className="text-muted-foreground uppercase text-xs font-bold tracking-widest ml-1">
                                                / {plan.duration.toUpperCase()}
                                            </span>
                                        </div>
                                    </div>

                                    <ul className="space-y-4 mb-10 flex-grow">
                                        {plan.features.map((feature, fIdx) => (
                                            <li key={fIdx} className="flex items-center gap-3">
                                                <Check className="w-5 h-5 text-primary flex-shrink-0" />
                                                <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                                                    {feature}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>

                                    <button
                                        onClick={() => setBookingItem({ id: plan._id, name: plan.title })}
                                        className={cn(
                                            "w-full py-4 text-xs font-black uppercase tracking-[0.2em] transition-all",
                                            popular
                                                ? "bg-primary text-primary-foreground hover:shadow-[0_0_20px_var(--primary)]"
                                                : "bg-secondary text-foreground hover:bg-primary hover:text-primary-foreground"
                                        )}>
                                        Get Started
                                    </button>
                                </motion.div>
                            );
                        })
                    ) : (
                        <p className="col-span-full text-center text-muted-foreground uppercase tracking-widest italic opacity-50 py-12">
                            Flexible plans are being configured. Check back soon.
                        </p>
                    )}
                </div>
            </div>

            <BookingModal
                isOpen={!!bookingItem}
                onClose={() => setBookingItem(null)}
                type="program" // Mapping plan to program for the simplified booking system
                itemId={bookingItem?.id || ""}
                itemName={bookingItem?.name || ""}
            />
        </section>
    );
}
