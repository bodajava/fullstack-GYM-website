"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, Dumbbell, User } from "lucide-react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Programs", href: "#programs" },
    { name: "Trainers", href: "#trainers" },
    { name: "Membership", href: "#membership" },
    { name: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navRef = useRef<HTMLDivElement>(null);
    const lastScrollY = useRef(0);
    const sideNavRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setScrolled(currentScrollY > 20);

            if (navRef.current) {
                if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
                    // Scrolling down
                    gsap.to(navRef.current, { y: -100, duration: 0.3, ease: "power2.inOut" });
                } else {
                    // Scrolling up
                    gsap.to(navRef.current, { y: 0, duration: 0.3, ease: "power2.inOut" });
                }
            }
            lastScrollY.current = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useGSAP(() => {
        if (isOpen) {
            gsap.to(sideNavRef.current, { x: 0, duration: 0.5, ease: "power3.out" });
            gsap.from(".mobile-link", { x: 50, opacity: 0, stagger: 0.1, duration: 0.4, delay: 0.2 });
        } else {
            gsap.to(sideNavRef.current, { x: "100%", duration: 0.5, ease: "power3.in" });
        }
    }, [isOpen]);

    return (
        <>
            <nav
                ref={navRef}
                className={cn(
                    "fixed top-0 w-full z-50 transition-colors duration-300 px-6 py-4",
                    scrolled ? "bg-background/80 backdrop-blur-md border-b border-primary/20 shadow-lg shadow-primary/5" : "bg-transparent"
                )}
            >
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-2 group">
                        <Dumbbell className="w-8 h-8 text-primary group-hover:rotate-12 transition-transform duration-300" />
                        <span className="text-2xl font-bold tracking-tighter text-foreground uppercase italic underline-offset-4 decoration-primary decoration-4">
                            Elite<span className="text-primary italic">GYM</span>
                        </span>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium uppercase tracking-widest text-foreground hover:text-primary transition-colors relative group"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full shadow-[0_0_8px_var(--primary)]"></span>
                            </Link>
                        ))}
                        <Link
                            href="/login"
                            className="px-6 py-2 bg-primary text-primary-foreground font-bold uppercase tracking-tighter rounded-sm hover:scale-105 transition-transform shadow-[0_0_15px_var(--primary)] text-sm flex items-center gap-2"
                        >
                            <User className="w-4 h-4" /> Join Now
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden text-foreground hover:text-primary transition-colors z-[60]"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                    </button>
                </div>
            </nav>

            {/* GSAP Mobile Side Drawer */}
            <div
                ref={sideNavRef}
                className="fixed top-0 right-0 h-screen w-[300px] bg-secondary border-l border-primary/20 z-[55] flex flex-col p-10 space-y-8 translate-x-full shadow-[-20px_0_50px_rgba(0,0,0,0.5)]"
            >
                <div className="mt-12 space-y-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="mobile-link block text-2xl font-black uppercase italic tracking-tighter text-foreground hover:text-primary transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        href="/login"
                        className="mobile-link block w-full py-4 bg-primary text-primary-foreground text-center font-black uppercase tracking-widest italic rounded-sm shadow-[0_0_20px_var(--primary)]"
                        onClick={() => setIsOpen(false)}
                    >
                        Join Now
                    </Link>
                </div>

                <div className="absolute bottom-10 left-10">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">EliteGYM / Performance First</p>
                </div>
            </div>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-background/50 backdrop-blur-sm z-[50]"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}
        </>
    );
}

