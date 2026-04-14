import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/features/landing/Hero";
import { CategoryScroller } from "@/components/features/landing/CategoryScroller";
import { RestoGrid } from "@/components/features/landing/RestoGrid";
import { TrustMarkers } from "@/components/features/landing/TrustMarkers";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <CategoryScroller />
        <RestoGrid />
        <TrustMarkers />
      </main>
      <Footer />
    </div>
  );
}
