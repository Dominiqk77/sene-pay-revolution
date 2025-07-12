import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, Star, Zap, Globe, Shield, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import Logo from '@/components/Logo';

const WelcomePopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('senepay_welcome_seen');
    const cookieConsent = localStorage.getItem('senepay_cookie_consent');
    
    // Show welcome popup only after cookie consent is handled and if not seen before
    if (!hasSeenWelcome && cookieConsent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem('senepay_welcome_seen', 'true');
    localStorage.setItem('senepay_welcome_date', new Date().toISOString());
    setIsVisible(false);
  };

  const handleGetStarted = () => {
    handleClose();
    // Scroll to features section or redirect to documentation
    const element = document.getElementById('solutions');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLearnMore = () => {
    handleClose();
    window.location.href = '/documentation';
  };

  const features = [
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Intégration 5 minutes",
      description: "API simple et documentée"
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "Sécurité militaire",
      description: "PCI DSS Level 1 + Encryption"
    },
    {
      icon: <Globe className="h-5 w-5" />,
      title: "8 pays CEDEAO",
      description: "Expansion régionale complète"
    }
  ];

  const benefits = [
    "✨ Commission 50% moins chère que la concurrence",
    "🚀 Intégration en 5 minutes avec notre API",
    "🛡️ Sécurité de niveau bancaire garantie",
    "📱 Support Mobile Money + Cartes + Crypto",
    "🇸🇳 Premier agrégateur 100% sénégalais",
    "💰 Tarifs transparents sans frais cachés"
  ];

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl mx-auto relative overflow-hidden animate-scale-in">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-senepay-orange/5 via-senepay-gold/5 to-orange-500/5" />
        
        {/* Close button */}
        <Button
          onClick={handleClose}
          variant="ghost"
          size="sm"
          className="absolute top-4 right-4 z-10 h-8 w-8 p-0 hover:bg-white/10"
        >
          <X className="h-4 w-4" />
        </Button>

        <CardHeader className="text-center pb-6 relative">
          {/* Hero section */}
          <div className="space-y-4">
            <div className="flex justify-center mb-4">
              <Logo size="xl" showText={true} interactive={true} />
            </div>
            
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-senepay text-white text-sm font-medium mb-4">
              <Sparkles className="h-4 w-4 mr-2" />
              🇸🇳 Révolution Fintech Ouest-Africaine
            </div>

            <h1 className="text-2xl md:text-3xl font-bold leading-tight">
              Bienvenue sur <span className="gradient-text">SenePay</span>
              <br />
              <span className="text-lg md:text-xl text-muted-foreground font-normal">
                La passerelle de paiement qui va dominer l'Afrique de l'Ouest
              </span>
            </h1>

            <div className="flex justify-center gap-4 mt-6">
              <Badge variant="outline" className="border-green-500 text-green-600">
                <CheckCircle className="h-3 w-3 mr-1" />
                PCI DSS Level 1
              </Badge>
              <Badge variant="outline" className="border-blue-500 text-blue-600">
                <Globe className="h-3 w-3 mr-1" />
                8 Pays CEDEAO
              </Badge>
              <Badge variant="outline" className="border-purple-500 text-purple-600">
                <Star className="h-3 w-3 mr-1" />
                API Ultra-Simple
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 relative">
          {/* Features grid */}
          <div className="grid md:grid-cols-3 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-lg border">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-senepay rounded-full text-white mb-3">
                  {feature.icon}
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Benefits list */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
            <h3 className="font-bold text-lg mb-4 text-center">
              🚀 Pourquoi 7,500+ marchands nous font confiance ?
            </h3>
            <div className="grid md:grid-cols-2 gap-3">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center text-sm">
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA section */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button 
              onClick={handleGetStarted}
              className="btn-senepay flex-1 h-12 text-base"
            >
              <ArrowRight className="h-5 w-5 mr-2" />
              Commencer maintenant
            </Button>
            <Button 
              onClick={handleLearnMore}
              variant="outline"
              className="flex-1 h-12 text-base border-senepay-gold text-senepay-gold hover:bg-senepay-gold hover:text-white"
            >
              <Globe className="h-5 w-5 mr-2" />
              Documentation API
            </Button>
          </div>

          {/* Stats bar */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t">
            <div className="text-center">
              <div className="text-2xl font-bold gradient-text">98.9%</div>
              <div className="text-xs text-muted-foreground">Taux de succès</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold gradient-text">5 min</div>
              <div className="text-xs text-muted-foreground">Intégration</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold gradient-text">7,500+</div>
              <div className="text-xs text-muted-foreground">Marchands</div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-xs text-muted-foreground pt-4 border-t">
            <p>
              🇸🇳 Fier d'être sénégalais • Conformité BCEAO • Support 24/7 en Français et Wolof
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WelcomePopup;