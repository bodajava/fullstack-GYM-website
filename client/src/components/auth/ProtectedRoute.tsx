"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import Cookies from "js-cookie";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const [authorized, setAuthorized] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get("token");
        const userInfo = localStorage.getItem("userInfo");

        if (!token || !userInfo) {
            router.push("/login");
            return;
        }

        const { role } = JSON.parse(userInfo);
        if (role !== "admin") {
            router.push("/");
            return;
        }

        setAuthorized(true);
    }, [router]);

    if (!authorized) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-6 text-primary p-6">
                <Loader2 className="w-16 h-16 animate-spin drop-shadow-[0_0_15px_var(--primary)]" />
                <div className="text-center space-y-2">
                    <h2 className="text-2xl font-black uppercase italic tracking-tighter">AUTHENTICATING ACCESS</h2>
                    <p className="text-[10px] uppercase font-black tracking-[0.3em] text-muted-foreground">Verifying security clearances...</p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
