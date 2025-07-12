
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PaymentMethodsSection from "@/components/PaymentMethodsSection";
import FeaturesSection from "@/components/FeaturesSection";
import PricingSection from "@/components/PricingSection";
import DeveloperSection from "@/components/DeveloperSection";
import Footer from "@/components/Footer";
import PWAInstallButton from "@/components/PWAInstallButton";
import SEOFAQSection from "@/components/SEOFAQSection";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

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
      <Helmet>
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="sitemap" href="/sitemap.xml" />
        <meta property="article:publisher" content="https://senepay.sn" />
        <meta name="format-detection" content="telephone=yes" />
        <meta name="apple-mobile-web-app-title" content="SenePay API" />
        <meta name="application-name" content="SenePay" />
      </Helmet>
      <Header />
      <HeroSection />
      <PaymentMethodsSection />
      <FeaturesSection />
      <SEOFAQSection />
      <PricingSection />
      <DeveloperSection />
      <Footer />
      <PWAInstallButton />
    </div>
  );
};

export default Index;
