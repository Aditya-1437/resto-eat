import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/features/landing/Hero";
import { FeaturedRestaurants } from "@/components/features/landing/FeaturedRestaurants";
import { TrustMarkers } from "@/components/features/landing/TrustMarkers";
import { DualCTAs } from "@/components/features/landing/DualCTAs";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <FeaturedRestaurants />
        <TrustMarkers />
        <DualCTAs />
      </main>
      <Footer />
    </div>
  );
}
