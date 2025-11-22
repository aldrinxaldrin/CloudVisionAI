import { Hero } from "@/components/Hero";
import { UploadSection } from "@/components/UploadSection";
import { AboutSection } from "@/components/AboutSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Hero />
      <UploadSection />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default Index;
