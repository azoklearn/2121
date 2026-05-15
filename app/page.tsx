import Navbar from "@/components/Navbar";
import Loader from "@/components/Loader";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import Marquee from "@/components/Marquee";
import Collection from "@/components/Collection";
import Services from "@/components/Services";
import Instagram from "@/components/Instagram";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative bg-ivory text-ink">
      <Loader />
      <Navbar />
      <Hero />
      <Collection />
      <Manifesto />
      <Marquee />
      <Services />
      <Instagram />
      <Contact />
      <Footer />
    </main>
  );
}
