import Link from "next/link";
import { Dumbbell, Instagram, Facebook, Twitter, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-background border-t border-primary/20 py-16 px-6 relative overflow-hidden">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[100px]"></div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
                <div className="space-y-6">
                    <Link href="/" className="flex items-center gap-2">
                        <Dumbbell className="w-8 h-8 text-primary" />
                        <span className="text-2xl font-bold tracking-tighter text-foreground uppercase italic">
                            Elite<span className="text-primary italic">GYM</span>
                        </span>
                    </Link>
                    <p className="text-muted-foreground leading-relaxed">
                        Elevate your fitness journey with high-performance coaching and state-of-the-art facilities. Join the elite community today.
                    </p>
                    <div className="flex gap-4">
                        <Link href="#" className="p-2 border border-primary/20 rounded-sm hover:bg-primary/10 transition-colors group">
                            <Instagram className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                        </Link>
                        <Link href="#" className="p-2 border border-primary/20 rounded-sm hover:bg-primary/10 transition-colors group">
                            <Facebook className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                        </Link>
                        <Link href="#" className="p-2 border border-primary/20 rounded-sm hover:bg-primary/10 transition-colors group">
                            <Twitter className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                        </Link>
                    </div>
                </div>

                <div className="space-y-6">
                    <h4 className="text-lg font-bold uppercase tracking-widest text-foreground">Quick Links</h4>
                    <ul className="space-y-4">
                        <li><Link href="#about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
                        <li><Link href="#programs" className="text-muted-foreground hover:text-primary transition-colors">Programs</Link></li>
                        <li><Link href="#trainers" className="text-muted-foreground hover:text-primary transition-colors">Our Trainers</Link></li>
                        <li><Link href="#membership" className="text-muted-foreground hover:text-primary transition-colors">Membership</Link></li>
                    </ul>
                </div>

                <div className="space-y-6">
                    <h4 className="text-lg font-bold uppercase tracking-widest text-foreground">Contact</h4>
                    <ul className="space-y-4">
                        <li className="flex items-center gap-3 text-muted-foreground">
                            <MapPin className="w-5 h-5 text-primary" />
                            123 Fitness Lane, Muscle City
                        </li>
                        <li className="flex items-center gap-3 text-muted-foreground">
                            <Phone className="w-5 h-5 text-primary" />
                            +1 (234) 567-890
                        </li>
                        <li className="flex items-center gap-3 text-muted-foreground">
                            <Mail className="w-5 h-5 text-primary" />
                            info@elitegym.com
                        </li>
                    </ul>
                </div>

                <div className="space-y-6">
                    <h4 className="text-lg font-bold uppercase tracking-widest text-foreground">Newsletter</h4>
                    <p className="text-muted-foreground">Get tips and exclusive offers.</p>
                    <div className="flex bg-secondary/50 rounded-sm overflow-hidden border border-primary/10">
                        <input
                            type="email"
                            placeholder="Email address"
                            className="bg-transparent px-4 py-3 text-sm focus:outline-none w-full"
                        />
                        <button className="bg-primary px-4 py-3 text-primary-foreground font-bold hover:brightness-110 transition-all">
                            Join
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-primary/10 text-center">
                <p className="text-muted-foreground text-sm uppercase tracking-widest italic">
                    &copy; {new Date().getFullYear()} ELITE GYM. ALL RIGHTS RESERVED.
                </p>
            </div>
        </footer>
    );
}
