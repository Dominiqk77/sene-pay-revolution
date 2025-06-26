
import { Button } from "@/components/ui/button";
import { ArrowDown, Shield, Zap, Globe } from "lucide-react";

const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen bg-gradient-hero text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-repeat" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 pt-20 sm:pt-24 pb-12 sm:pb-16 relative z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[calc(100vh-5rem)] sm:min-h-[80vh]">
          <div className="space-y-6 sm:space-y-8 animate-fade-in text-center lg:text-left">
            <div className="space-y-4">
              <div className="inline-flex items-center px-3 sm:px-4 py-2 rounded-full bg-gradient-senepay text-xs sm:text-sm font-medium">
                🚀 La révolution des paiements en Afrique
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                <span className="gradient-text">SenePay</span>
                <br />
                <span className="text-white">Passerelle de</span>
                <br />
                <span className="gradient-text">Paiement #1</span>
              </h1>
              
              <p className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                La solution de paiement ultra-puissante qui connecte tous les moyens de paiement 
                sénégalais et internationaux en une seule API révolutionnaire. 
                <strong className="text-senepay-gold">Intégration en 5 minutes</strong>, 
                commissions 50% moins chères que la concurrence.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 sm:gap-6 py-6 sm:py-8 max-w-md mx-auto lg:max-w-none">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold gradient-text">89%</div>
                <p className="text-gray-400 text-xs sm:text-sm">Sites sans paiement</p>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold gradient-text">5min</div>
                <p className="text-gray-400 text-xs sm:text-sm">Intégration rapide</p>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold gradient-text">50%</div>
                <p className="text-gray-400 text-xs sm:text-sm">Économies garanties</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <Button size="lg" className="btn-senepay text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 h-12 sm:h-auto touch-manipulation">
                Démarrer gratuitement
                <Zap className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white hover:bg-white text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 h-12 sm:h-auto text-blue-950 touch-manipulation">
                Voir la démo
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-6 pt-6 sm:pt-8">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-senepay-green" />
                <span className="text-xs sm:text-sm text-gray-400">PCI DSS Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4 sm:h-5 sm:w-5 text-senepay-gold" />
                <span className="text-xs sm:text-sm text-gray-400">8 pays CEDEAO</span>
              </div>
            </div>
          </div>

          <div className="relative animate-fade-in w-full max-w-lg mx-auto lg:max-w-none" style={{
            animationDelay: '0.3s'
          }}>
            <div className="relative">
              <div className="glass-card p-4 sm:p-6 transform rotate-1 hover:rotate-0 transition-transform duration-500">
                <div className="bg-white rounded-lg p-4 sm:p-6 shadow-2xl">
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800">Dashboard SenePay</h3>
                    <div className="flex space-x-1 sm:space-x-2">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-400"></div>
                      <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-400"></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="bg-gradient-to-r from-senepay-gold to-senepay-orange p-3 sm:p-4 rounded-lg text-white">
                      <p className="text-xs sm:text-sm opacity-90">Revenus aujourd&apos;hui</p>
                      <p className="text-lg sm:text-2xl font-bold">2.4M FCFA</p>
                    </div>
                    <div className="bg-gradient-to-r from-senepay-green to-blue-500 p-3 sm:p-4 rounded-lg text-white">
                      <p className="text-xs sm:text-sm opacity-90">Transactions</p>
                      <p className="text-lg sm:text-2xl font-bold">1,247</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold">
                          O
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 text-sm sm:text-base">Orange Money</p>
                          <p className="text-xs sm:text-sm text-gray-600">+221 77 123 45 67</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600 text-sm sm:text-base">+25,000 FCFA</p>
                        <p className="text-xs text-gray-500">Il y a 2min</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold">
                          W
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 text-sm sm:text-base">Wave</p>
                          <p className="text-xs sm:text-sm text-gray-600">wave-user-123</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600 text-sm sm:text-base">+15,500 FCFA</p>
                        <p className="text-xs text-gray-500">Il y a 5min</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 glass-card p-2 sm:p-3 animate-pulse-gold">
                <div className="flex space-x-1 sm:space-x-2">
                  <div className="w-6 h-4 sm:w-8 sm:h-6 bg-orange-500 rounded flex items-center justify-center text-white text-xs font-bold">OM</div>
                  <div className="w-6 h-4 sm:w-8 sm:h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">W</div>
                  <div className="w-6 h-4 sm:w-8 sm:h-6 bg-green-600 rounded flex items-center justify-center text-white text-xs font-bold">FM</div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 glass-card p-3 sm:p-4">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-senepay rounded-full flex items-center justify-center">
                    <Zap className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm sm:text-base">API Ultra-rapide</p>
                    <p className="text-gray-300 text-xs sm:text-sm">&lt; 200ms response</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="h-5 w-5 sm:h-6 sm:w-6 text-white/60" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
