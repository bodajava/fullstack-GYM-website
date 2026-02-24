"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { LogIn, Dumbbell, ArrowLeft, Loader2 } from "lucide-react";
import API from "@/lib/api";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Cookies from "js-cookie";

const loginSchema = z.object({
    email: z.string().email("INVALID EMAIL ADDRESS"),
    password: z.string().min(6, "PASSWORD MUST BE AT LEAST 6 CHARACTERS"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (values: LoginFormValues) => {
        setLoading(true);
        try {
            const { data } = await API.post("/auth/login", values);

            // Set token in Cookies (expires in 30 days to match backend)
            Cookies.set("token", data.token, { expires: 30 });
            localStorage.setItem("userInfo", JSON.stringify(data));

            toast.success(`WELCOME BACK, ${data.name.toUpperCase()}!`);

            if (data.role === "admin") {
                router.push("/admin");
            } else {
                router.push("/");
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || "LOGIN FAILED. CHECK CREDENTIALS.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]"></div>
            </div>

            <div className="w-full max-w-md relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-secondary/20 border border-primary/20 p-8 md:p-12 rounded-sm"
                >
                    <div className="flex flex-col items-center mb-8">
                        <Link href="/" className="mb-6 group">
                            <Dumbbell className="w-12 h-12 text-primary group-hover:rotate-12 transition-transform" />
                        </Link>
                        <h1 className="text-3xl font-black uppercase italic tracking-tighter text-foreground text-center">
                            WELCOME <span className="text-primary">BACK</span>
                        </h1>
                        <p className="text-muted-foreground text-xs uppercase tracking-widest mt-2">Enter your credentials below</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <div className="space-y-1">
                            <label className="text-[10px] uppercase font-black tracking-[0.2em] text-muted-foreground ml-1">Email Address</label>
                            <input
                                {...register("email")}
                                type="email"
                                className={`w-full bg-background border ${errors.email ? 'border-destructive' : 'border-primary/10'} px-4 py-4 text-sm focus:outline-none focus:border-primary transition-all rounded-sm tracking-wider`}
                                placeholder="email@example.com"
                            />
                            {errors.email && <p className="text-[9px] text-destructive font-black uppercase tracking-widest mt-1 ml-1">{errors.email.message}</p>}
                        </div>

                        <div className="space-y-1">
                            <div className="flex justify-between">
                                <label className="text-[10px] uppercase font-black tracking-[0.2em] text-muted-foreground ml-1">Password</label>
                                <Link href="#" className="text-[10px] uppercase font-black tracking-[0.2em] text-primary hover:underline">Forgot?</Link>
                            </div>
                            <input
                                {...register("password")}
                                type="password"
                                className={`w-full bg-background border ${errors.password ? 'border-destructive' : 'border-primary/10'} px-4 py-4 text-sm focus:outline-none focus:border-primary transition-all rounded-sm tracking-wider`}
                                placeholder="********"
                            />
                            {errors.password && <p className="text-[9px] text-destructive font-black uppercase tracking-widest mt-1 ml-1">{errors.password.message}</p>}
                        </div>

                        <button
                            disabled={loading}
                            className="w-full bg-primary text-primary-foreground py-5 font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:shadow-[0_0_20px_var(--primary)] transition-all disabled:opacity-50"
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Login Now"} <LogIn className="w-5 h-5" />
                        </button>
                    </form>

                    <div className="mt-8 text-center space-y-4">
                        <p className="text-xs uppercase tracking-widest text-muted-foreground">
                            Don't have an account?{" "}
                            <Link href="/register" className="text-primary font-black hover:underline ml-1">Sign Up</Link>
                        </p>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" /> Back to Home
                        </Link>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
