import Image from "next/image";
import Header from "@/components/Header";
import ImageCarousel from "@/components/ImageCarousel";
import Hero from "@/components/Hero";
import FeaturedRituals from "@/components/FeaturedRituals";
import HowItWorks from "@/components/HowItWorks";
import TrustSignals from "@/components/TrustSignals";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import AnimatedBannerCarousel from "@/components/creatives/AnimatedBannerCarousel";
import LanguageToggle from "@/components/LanguageToggle";

export default function Home() {
  return (
    <div className="min-h-screen sacred-bg page-load">
      <Header />
      <LanguageToggle />
      
      {/* Animated Service Banners - Creative 1 & 2 of 5 */}
      <section className="w-full px-4 py-8">
        <AnimatedBannerCarousel />
      </section>
      
      <main>
        <Hero />
        
        
        <FeaturedRituals />
        <HowItWorks />
        <TrustSignals />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
