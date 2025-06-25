
import { Button } from "@/components/ui/button";
import { ArrowDown, Shield, Zap, Globe } from "lucide-react";

const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen bg-gradient-hero text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.05\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
      
      <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-senepay text-sm font-medium">
                🚀 La révolution des paiements en Afrique
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                <span className="gradient-text">SenePay</span>
                <br />
                <span className="text-white">Passerelle de</span>
                <br />
                <span className="gradient-text">Paiement #1</span>
              </h1>
              
              <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                La solution de paiement ultra-puissante qui connecte tous les moyens de paiement 
                sénégalais et internationaux en une seule API révolutionnaire. 
                <strong className="text-senepay-gold">Intégration en 5 minutes</strong>, 
                commissions 50% moins chères que la concurrence.
              </p>
            </div>

            {/* Key stats */}
            <div className="grid grid-cols-3 gap-6 py-8">
              <div className="text-center">
                <div className="stat-number">89%</div>
                <p className="text-gray-400 text-sm">Sites sans paiement</p>
              </div>
              <div className="text-center">
                <div className="stat-number">5min</div>
                <p className="text-gray-400 text-sm">Intégration rapide</p>
              </div>
              <div className="text-center">
                <div className="stat-number">50%</div>
                <p className="text-gray-400 text-sm">Économies garanties</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="btn-senepay text-lg px-8 py-4">
                Démarrer gratuitement
                <Zap className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-senepay-dark text-lg px-8 py-4"
              >
                Voir la démo
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center space-x-6 pt-8">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-senepay-green" />
                <span className="text-sm text-gray-400">PCI DSS Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="h-5 w-5 text-senepay-gold" />
                <span className="text-sm text-gray-400">8 pays CEDEAO</span>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="relative animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="relative">
              {/* Main dashboard mockup */}
              <div className="glass-card p-6 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="bg-white rounded-lg p-6 shadow-2xl">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-800">Dashboard SenePay</h3>
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gradient-to-r from-senepay-gold to-senepay-orange p-4 rounded-lg text-white">
                      <p className="text-sm opacity-90">Revenus aujourd&apos;hui</p>
                      <p className="text-2xl font-bold">2.4M FCFA</p>
                    </div>
                    <div className="bg-gradient-to-r from-senepay-green to-blue-500 p-4 rounded-lg text-white">
                      <p className="text-sm opacity-90">Transactions</p>
                      <p className="text-2xl font-bold">1,247</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                          O
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">Orange Money</p>
                          <p className="text-sm text-gray-600">+221 77 123 45 67</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">+25,000 FCFA</p>
                        <p className="text-xs text-gray-500">Il y a 2min</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                          W
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">Wave</p>
                          <p className="text-sm text-gray-600">wave-user-123</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">+15,500 FCFA</p>
                        <p className="text-xs text-gray-500">Il y a 5min</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating payment methods */}
              <div className="absolute -top-4 -right-4 glass-card p-3 animate-pulse-gold">
                <div className="flex space-x-2">
                  <div className="w-8 h-6 bg-orange-500 rounded flex items-center justify-center text-white text-xs font-bold">OM</div>
                  <div className="w-8 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">W</div>
                  <div className="w-8 h-6 bg-green-600 rounded flex items-center justify-center text-white text-xs font-bold">FM</div>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 glass-card p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-senepay rounded-full flex items-center justify-center">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-bold">API Ultra-rapide</p>
                    <p className="text-gray-300 text-sm">&lt; 200ms response</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="h-6 w-6 text-white/60" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
