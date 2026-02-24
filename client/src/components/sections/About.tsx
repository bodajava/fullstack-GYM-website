"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const features = [
    "Professional Training Plans",
    "Elite Performance Coaching",
    "Modern Gym Facilities",
    "Nutritional Guidance",
    "24/7 Gym Access",
    "Dynamic Fitness Community",
];

export default function About() {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (imageRef.current) {
            gsap.fromTo(imageRef.current,
                { scale: 1.2 },
                {
                    scale: 0.8,
                    ease: "none",
                    scrollTrigger: {
                        trigger: imageRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    }
                }
            );
        }
    }, { scope: containerRef });

    return (
        <section ref={containerRef} id="about" className="py-24 px-6 bg-background relative overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative"
                >
                    <div ref={imageRef} className="aspect-square bg-secondary/50 border border-primary/20 rounded-sm relative overflow-hidden group">
                        <img
                            src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2070&auto=format&fit=crop"
                            alt="Gym Facility"
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-tr from-background via-transparent to-transparent z-10 opacity-60"></div>
                        <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div className="bg-primary/90 text-primary-foreground px-6 py-2 font-black uppercase italic tracking-[.2em]">Our Facility</div>
                        </div>
                    </div>
                    <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-accent/20 border border-accent/30 p-8 flex flex-col justify-center rounded-sm z-30">
                        <span className="text-4xl font-black text-foreground italic">10+</span>
                        <span className="text-[10px] text-muted-foreground uppercase tracking-[0.2em]">Years of Excellence</span>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="space-y-8"
                >
                    <div className="space-y-4">
                        <span className="text-primary font-bold uppercase tracking-widest text-xs">Our Story</span>
                        <h2 className="text-4xl md:text-5xl font-black uppercase italic leading-tight">
                            WE ARE MORE THAN JUST A <span className="text-primary">GYM</span>
                        </h2>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            Founded on the principles of discipline and community, EliteGYM is where champions are made. Our state-of-the-art facility is designed to push you beyond your perceived limits.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-3 group">
                                <CheckCircle2 className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                                <span className="text-sm font-medium text-foreground tracking-wide uppercase">{feature}</span>
                            </div>
                        ))}
                    </div>

                    <button className="px-10 py-4 border-2 border-primary text-primary font-bold uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-all">
                        Learn More
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
