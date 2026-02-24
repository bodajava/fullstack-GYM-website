import AdminSidebar from "@/components/admin/Sidebar";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ProtectedRoute>
            <div className="flex min-h-screen bg-background text-foreground">
                <AdminSidebar />
                <div className="flex-grow flex flex-col">
                    <header className="h-20 border-b border-primary/10 flex items-center justify-between px-8 bg-background/50 backdrop-blur-md sticky top-0 z-40">
                        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground">
                            System Operational / <span className="text-primary italic">Live Data</span>
                        </h2>
                        <div className="flex items-center gap-4">
                            <div className="w-2 h-2 bg-primary rounded-full animate-ping shadow-[0_0_10px_var(--primary)]"></div>
                            <span className="text-[10px] uppercase font-black tracking-widest text-foreground">Admin Account</span>
                        </div>
                    </header>
                    <main className="p-8">
                        {children}
                    </main>
                </div>
            </div>
        </ProtectedRoute>
    );
}
