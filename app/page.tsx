import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Reviews from "@/components/Reviews";
import WhyChoose from "@/components/WhyChoose";
import Services from "@/components/Services";
import Booking from "@/components/Booking";
import Footer from "@/components/Footer";
import MobileBookBar from "@/components/MobileBookBar";

// Statically prerendered for fast responses on shared hosting, revalidated
// hourly so copy tweaks can propagate without a full redeploy. The earlier
// `force-dynamic` was a workaround for a *suspected* CDN cache — the real cause
// was a stale runtime symlink on Hostinger (see DEPLOY.md), now fixed, so we
// serve fast static HTML again instead of rendering every request.
export const revalidate = 3600;

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Reviews />
        <WhyChoose />
        <Services />
        <Booking />
      </main>
      <Footer />
      <MobileBookBar />
      {/* spacer so the mobile sticky bar never covers footer content */}
      <div className="h-20 md:hidden" aria-hidden="true" />
    </>
  );
}
