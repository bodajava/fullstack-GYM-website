"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function Hero() {
    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Background with Grid & Glow */}
            {/* Background with Grid, Image & Glow */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-background/80 z-10"></div>
                <img
                    src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop"
                    alt="Hero Background"
                    className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background z-10"></div>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] z-20"></div>
                <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse z-0"></div>
                <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px] z-0"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-bold tracking-[0.3em] uppercase mb-8 shadow-[0_0_15px_rgba(var(--primary),0.1)]">
                        Elevate Your Performance
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase italic leading-[0.9] mb-8"
                >
                    PUSH YOUR <br />
                    <span className="text-primary drop-shadow-[0_0_15px_rgba(var(--primary),0.5)]">LIMITS</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="max-w-2xl mx-auto text-muted-foreground text-lg md:text-xl mb-12 uppercase tracking-wide"
                >
                    High-intensity training, elite-level coaching, and a community built to win. Experience the next level of fitness.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-6 justify-center"
                >
                    <Link
                        href="#membership"
                        className="group px-8 py-4 bg-primary text-primary-foreground font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:scale-105 transition-transform shadow-[0_0_20px_var(--primary)]"
                    >
                        Start Training
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                        href="#programs"
                        className="px-8 py-4 border-2 border-primary/40 text-foreground font-bold uppercase tracking-widest hover:bg-primary/5 transition-all"
                    >
                        Explore Programs
                    </Link>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 pt-12 border-t border-primary/10"
                >
                    {[
                        { label: "Elite Trainers", value: "20+" },
                        { label: "Active Members", value: "500+" },
                        { label: "Monthly Programs", value: "15+" },
                        { label: "Global Locations", value: "05" },
                    ].map((stat, idx) => (
                        <div key={idx} className="text-center">
                            <div className="text-3xl font-black text-foreground">{stat.value}</div>
                            <div className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
