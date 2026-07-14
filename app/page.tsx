import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import BeforeAfter from "@/components/BeforeAfter";
import WhyChoose from "@/components/WhyChoose";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import Booking from "@/components/Booking";
import Footer from "@/components/Footer";
import MobileBookBar from "@/components/MobileBookBar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <BeforeAfter />
        <WhyChoose />
        <Services />
        <Gallery />
        <Booking />
      </main>
      <Footer />
      <MobileBookBar />
      {/* spacer so the mobile sticky bar never covers footer content */}
      <div className="h-20 md:hidden" aria-hidden="true" />
    </>
  );
}
