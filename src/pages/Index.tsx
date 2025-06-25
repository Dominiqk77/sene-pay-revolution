
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PaymentMethodsSection from "@/components/PaymentMethodsSection";
import FeaturesSection from "@/components/FeaturesSection";
import PricingSection from "@/components/PricingSection";
import DeveloperSection from "@/components/DeveloperSection";
import Footer from "@/components/Footer";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    // PWA Setup
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('SW registered: ', registration);
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <PaymentMethodsSection />
      <FeaturesSection />
      <PricingSection />
      <DeveloperSection />
      <Footer />
    </div>
  );
};

export default Index;
