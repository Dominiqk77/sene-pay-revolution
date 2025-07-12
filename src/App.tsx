
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/hooks/useAuth";
import ChatBot from "@/components/ChatBot";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Documentation from "./pages/Documentation";
import Dashboard from "./pages/Dashboard";
import AnalyticsDashboard from "./pages/AnalyticsDashboard";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import Auth from "./pages/Auth";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";
import Investors from "./pages/Investors";
import ProtectedRoute from "./components/ProtectedRoute";

// Legal Pages
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";

// Product Pages
import ApiDocumentation from "./pages/ApiDocumentation";
import SDKs from "./pages/SDKs";
import Plugins from "./pages/Plugins";
import Webhook from "./pages/Webhook";
import Sandbox from "./pages/Sandbox";

// Solutions Pages
import EcommerceSolution from "./pages/EcommerceSolution";
import MarketplaceSolution from "./pages/MarketplaceSolution";
import SaaSSolution from "./pages/SaaSSolution";
import MobileAppsSolution from "./pages/MobileAppsSolution";
import SubscriptionsSolution from "./pages/SubscriptionsSolution";

// Resources Pages
import Guides from "./pages/Guides";
import BlogTech from "./pages/BlogTech";
import StatusPage from "./pages/StatusPage";
import Changelog from "./pages/Changelog";

// Company Pages
import Careers from "./pages/Careers";
import Partners from "./pages/Partners";
import Press from "./pages/Press";

// SEO Landing Pages
import PaiementMobileSenegal from "./pages/PaiementMobileSenegal";
import ApiOrangeMoneySenegal from "./pages/ApiOrangeMoneySenegal";
import ApiWaveSenegal from "./pages/ApiWaveSenegal";
import PasgarellePaiementSenegal from "./pages/PasgarellePaiementSenegal";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/checkout/:paymentId" element={<Checkout />} />
            <Route path="/investors" element={<Investors />} />
            
            {/* Protected Routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/super-admin" 
              element={
                <ProtectedRoute>
                  <SuperAdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/analytics" 
              element={
                <ProtectedRoute>
                  <AnalyticsDashboard />
                </ProtectedRoute>
              } 
            />

            {/* Legal Pages */}
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />

            {/* Product Pages */}
            <Route path="/api-documentation" element={<ApiDocumentation />} />
            <Route path="/sdks" element={<SDKs />} />
            <Route path="/plugins" element={<Plugins />} />
            <Route path="/webhook" element={<Webhook />} />
            <Route path="/sandbox" element={<Sandbox />} />

            {/* Solutions Pages */}
            <Route path="/ecommerce-solution" element={<EcommerceSolution />} />
            <Route path="/marketplace-solution" element={<MarketplaceSolution />} />
            <Route path="/saas-solution" element={<SaaSSolution />} />
            <Route path="/mobile-apps-solution" element={<MobileAppsSolution />} />
            <Route path="/subscriptions-solution" element={<SubscriptionsSolution />} />

            {/* Resources Pages */}
            <Route path="/guides" element={<Guides />} />
            <Route path="/blog-tech" element={<BlogTech />} />
            <Route path="/status-page" element={<StatusPage />} />
            <Route path="/changelog" element={<Changelog />} />

            {/* Company Pages */}
            <Route path="/careers" element={<Careers />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/press" element={<Press />} />

            {/* SEO Landing Pages */}
            <Route path="/paiement-mobile-senegal" element={<PaiementMobileSenegal />} />
            <Route path="/api-orange-money-senegal" element={<ApiOrangeMoneySenegal />} />
            <Route path="/api-wave-senegal" element={<ApiWaveSenegal />} />
            <Route path="/passerelle-paiement-senegal" element={<PasgarellePaiementSenegal />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
          {/* ChatBot maintenant dans le contexte Router */}
          <ChatBot />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </HelmetProvider>
</QueryClientProvider>
);

export default App;
