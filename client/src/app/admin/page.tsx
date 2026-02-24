"use client";

import { motion } from "framer-motion";
import { Users, Dumbbell, Mail, TrendingUp, ArrowUpRight } from "lucide-react";

const stats = [
    { label: "Total Members", value: "842", change: "+12%", icon: Users },
    { label: "Active Programs", value: "18", change: "+2", icon: Dumbbell },
    { label: "New Messages", value: "24", change: "5 New", icon: Mail },
    { label: "Active Bookings", value: "12", change: "+3", icon: Calendar },
    { label: "Revenue", value: "$42.5k", change: "+18%", icon: TrendingUp },
];

import { Calendar } from "lucide-react";

export default function AdminDashboard() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-black uppercase italic tracking-tighter text-foreground mb-2">
                    DASHBOARD <span className="text-primary">OVERVIEW</span>
                </h1>
                <p className="text-muted-foreground text-xs uppercase tracking-widest italic">Welcome back. Here is what is happening today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-secondary/20 border border-primary/10 p-6 rounded-sm relative group hover:border-primary/40 transition-colors"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-primary/10 border border-primary/20 rounded-sm text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                                <stat.icon className="w-5 h-5" />
                            </div>
                            <span className="text-[10px] font-black text-primary bg-primary/5 px-2 py-1 rounded-full flex items-center gap-1">
                                {stat.change} <ArrowUpRight className="w-3 h-3" />
                            </span>
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-3xl font-black text-foreground italic">{stat.value}</h3>
                            <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">{stat.label}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-secondary/20 border border-primary/10 p-8 rounded-sm">
                    <h3 className="text-lg font-black uppercase italic tracking-tighter mb-6 border-b border-primary/10 pb-4">
                        RECENT <span className="text-primary">ACTIVITIES</span>
                    </h3>
                    <div className="space-y-6">
                        {[1, 2, 3, 4].map((item) => (
                            <div key={item} className="flex gap-4 items-center p-3 hover:bg-primary/5 transition-colors border-l-2 border-primary/20">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">J</div>
                                <div className="flex-grow">
                                    <p className="text-xs text-foreground font-bold uppercase tracking-widest">New member: John Doe joined Pro Plan</p>
                                    <p className="text-[10px] text-muted-foreground uppercase mt-1 italic">2 hours ago</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-secondary/20 border border-primary/10 p-8 rounded-sm">
                    <h3 className="text-lg font-black uppercase italic tracking-tighter mb-6 border-b border-primary/10 pb-4">
                        ACTIVE <span className="text-primary">TRAINERS</span>
                    </h3>
                    <div className="space-y-6">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="flex justify-between items-center p-3 border border-primary/5 hover:border-primary/20 transition-all">
                                <div className="flex gap-4 items-center">
                                    <div className="w-10 h-10 bg-primary/20 rounded-sm"></div>
                                    <div>
                                        <p className="text-xs text-foreground font-black uppercase tracking-widest italic">Coach Alex</p>
                                        <p className="text-[10px] text-primary font-bold uppercase tracking-widest">Bodybuilding</p>
                                    </div>
                                </div>
                                <div className="text-[10px] uppercase text-muted-foreground font-black tracking-widest italic">6 Sessions Today</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
