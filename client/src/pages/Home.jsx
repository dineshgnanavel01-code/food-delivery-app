/**
 * Wanderpost — Home page (assignment brief)
 * Navbar → HeroSection → SearchBox → DestinationSection → PackageSection →
 * WhyChooseUs → AboutSection → Testimonials → Newsletter → Footer + bonus.
 */
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SearchBox from "@/components/SearchBox";
import DestinationSection from "@/components/DestinationSection";
import PackageSection from "@/components/PackageSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import AboutSection from "@/components/AboutSection";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackToTop from "@/components/BackToTop";
import { useReveal } from "@/hooks/useReveal";

export default function Home() {
  useReveal();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <HeroSection />
        <SearchBox />
        <DestinationSection />
        <PackageSection />
        <WhyChooseUs />
        <AboutSection />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
      <WhatsAppButton />
      <BackToTop />
    </div>
  );
}
