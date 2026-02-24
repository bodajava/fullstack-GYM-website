"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import API from "@/lib/api";
import { toast } from "react-hot-toast";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await API.post("/contact", formData);
            toast.success("MESSAGE SENT TO THE ELITE TEAM!");
            setFormData({ name: "", email: "", message: "" });
        } catch (error: any) {
            toast.error(error.response?.data?.message || "FAILED TO SEND MESSAGE");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="py-24 px-6 bg-background relative">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Info Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-12"
                    >
                        <div className="space-y-4">
                            <span className="text-primary font-bold uppercase tracking-widest text-xs">Get In Touch</span>
                            <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter">
                                READY TO <span className="text-primary">TRANSFORM?</span>
                            </h2>
                            <p className="text-muted-foreground text-lg uppercase tracking-wide italic">
                                Send us a message and our team will get back to you within 24 hours.
                            </p>
                        </div>

                        <div className="space-y-8">
                            <div className="flex items-start gap-6 group">
                                <div className="p-4 bg-primary/10 border border-primary/20 rounded-sm text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-foreground font-black uppercase tracking-widest text-sm mb-1">Our Location</h4>
                                    <p className="text-muted-foreground text-sm uppercase tracking-widest">123 Fitness Lane, Muscle City, MC 101</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6 group">
                                <div className="p-4 bg-primary/10 border border-primary/20 rounded-sm text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-foreground font-black uppercase tracking-widest text-sm mb-1">Call Us</h4>
                                    <p className="text-muted-foreground text-sm uppercase tracking-widest">+1 (234) 567-890</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6 group">
                                <div className="p-4 bg-primary/10 border border-primary/20 rounded-sm text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-foreground font-black uppercase tracking-widest text-sm mb-1">Email Us</h4>
                                    <p className="text-muted-foreground text-sm uppercase tracking-widest">info@elitegym.com</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Form Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-secondary/20 border border-primary/10 p-8 md:p-12 rounded-sm relative"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-1">Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Enter your name"
                                        className="w-full bg-background border border-primary/10 px-4 py-4 text-sm focus:outline-none focus:border-primary transition-all rounded-sm tracking-wider"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-1">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="Enter your email"
                                        className="w-full bg-background border border-primary/10 px-4 py-4 text-sm focus:outline-none focus:border-primary transition-all rounded-sm tracking-wider"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-1">Message</label>
                                <textarea
                                    rows={4}
                                    required
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    placeholder="How can we help you?"
                                    className="w-full bg-background border border-primary/10 px-4 py-4 text-sm focus:outline-none focus:border-primary transition-all rounded-sm resize-none tracking-wider"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-primary text-primary-foreground py-5 font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:shadow-[0_0_25px_var(--primary)] hover:scale-[1.02] transition-all disabled:opacity-50"
                            >
                                {loading ? "SENDING..." : "Send Message"} <Send className="w-5 h-5" />
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
