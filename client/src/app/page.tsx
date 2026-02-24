import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Programs from "@/components/sections/Programs";
import Trainers from "@/components/sections/Trainers";
import Membership from "@/components/sections/Membership";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Programs />
      <Trainers />
      <Membership />
      <Contact />
      <Footer />
    </main>
  );
}
