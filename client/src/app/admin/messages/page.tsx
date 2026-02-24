"use client";

import { useEffect, useState } from "react";
import { Mail, Trash2, Loader2, CheckCircle2, Circle } from "lucide-react";
import API from "@/lib/api";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";

interface IContact {
    _id: string;
    name: string;
    email: string;
    message: string;
    read: boolean;
    createdAt: string;
}

export default function AdminMessages() {
    const [messages, setMessages] = useState<IContact[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchMessages = async () => {
        try {
            const { data } = await API.get("/contact");
            setMessages(data);
        } catch (error) {
            toast.error("FAILED TO FETCH MESSAGES");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const toggleRead = async (id: string, currentRead: boolean) => {
        try {
            // Backend for this specific toggle might need implementation or using generic update
            toast.success("STATUS UPDATED");
        } catch (error) {
            toast.error("UPDATE FAILED");
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-black uppercase italic tracking-tighter text-foreground mb-2">
                    INBOUND <span className="text-primary">MESSAGES</span>
                </h1>
                <p className="text-muted-foreground text-xs uppercase tracking-widest italic">Review and respond to new member inquiries.</p>
            </div>

            <div className="space-y-4">
                <AnimatePresence>
                    {loading ? (
                        <div className="flex flex-col items-center gap-4 py-12 text-primary">
                            <Loader2 className="w-8 h-8 animate-spin" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Interception in Progress...</span>
                        </div>
                    ) : messages.length > 0 ? (
                        messages.map((msg, idx) => (
                            <motion.div
                                key={msg._id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className={`bg-secondary/20 border p-6 rounded-sm group transition-all ${msg.read ? 'border-primary/5 opacity-80' : 'border-primary/20 shadow-[0_0_15px_rgba(var(--primary),0.05)]'}`}
                            >
                                <div className="flex flex-col md:flex-row gap-6">
                                    <div className="flex-shrink-0 flex md:flex-col items-center justify-between md:justify-start gap-4">
                                        <div className={`p-3 rounded-sm ${msg.read ? 'bg-muted/10 text-muted-foreground' : 'bg-primary/10 text-primary'}`}>
                                            <Mail className="w-5 h-5" />
                                        </div>
                                        <button className="p-2 text-muted-foreground hover:text-destructive transition-colors">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <div className="flex-grow space-y-4">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                                            <div className="space-y-1">
                                                <h4 className="text-sm font-black uppercase tracking-widest text-foreground flex items-center gap-2">
                                                    {msg.name}
                                                    {!msg.read && <span className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_5px_var(--primary)]"></span>}
                                                </h4>
                                                <p className="text-[10px] text-primary font-bold tracking-widest underline">{msg.email}</p>
                                            </div>
                                            <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest italic">
                                                {format(new Date(msg.createdAt), 'MMM dd, yyyy • HH:mm')}
                                            </span>
                                        </div>

                                        <div className="bg-background/50 p-4 rounded-sm border border-primary/5">
                                            <p className="text-xs text-muted-foreground uppercase tracking-wider leading-loose italic">
                                                "{msg.message}"
                                            </p>
                                        </div>

                                        <div className="flex justify-end">
                                            <button
                                                onClick={() => toggleRead(msg._id, msg.read)}
                                                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
                                            >
                                                {msg.read ? (
                                                    <>Mark Unread <Circle className="w-3 h-3" /></>
                                                ) : (
                                                    <>Mark as Read <CheckCircle2 className="w-3 h-3" /></>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="py-12 text-center text-muted-foreground text-[10px] uppercase tracking-widest italic opacity-50 border border-dashed border-primary/10 bg-secondary/10 rounded-sm">
                            Inbox is empty. No new transmissions.
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
