"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Dumbbell,
    Users,
    Mail,
    Settings,
    LogOut,
    Calendar,
    CreditCard
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Programs", href: "/admin/programs", icon: Dumbbell },
    { name: "Trainers", href: "/admin/trainers", icon: Users },
    { name: "Membership", href: "/admin/memberships", icon: CreditCard },
    { name: "Bookings", href: "/admin/bookings", icon: Calendar },
    { name: "Messages", href: "/admin/messages", icon: Mail },
];

export default function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-secondary/20 border-r border-primary/20 flex flex-col h-screen sticky top-0">
            <div className="p-8 border-b border-primary/10">
                <Link href="/" className="flex items-center gap-2 group">
                    <Dumbbell className="w-8 h-8 text-primary group-hover:rotate-12 transition-transform" />
                    <span className="text-xl font-bold tracking-tighter text-foreground uppercase italic">
                        Elite<span className="text-primary">ADMIN</span>
                    </span>
                </Link>
            </div>

            <nav className="flex-grow p-4 space-y-2 overflow-y-auto">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-sm transition-all group",
                                isActive
                                    ? "bg-primary text-primary-foreground shadow-[0_0_15px_var(--primary)]"
                                    : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
                            )}
                        >
                            <item.icon className={cn("w-5 h-5", isActive ? "" : "group-hover:scale-110 transition-transform")} />
                            <span className="text-xs font-black uppercase tracking-widest">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-primary/10">
                <button className="flex items-center gap-3 px-4 py-3 w-full rounded-sm text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all group">
                    <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-xs font-black uppercase tracking-widest">Logout</span>
                </button>
            </div>
        </aside>
    );
}
