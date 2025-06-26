
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Smartphone, Zap, QrCode, Nfc, Users, Star, ArrowRight, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MobileAppsSolution = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "SDK Mobile Natif",
      description: "Intégration native iOS et Android avec UI personnalisable"
    },
    {
      icon: <QrCode className="h-8 w-8" />,
      title: "Paiements QR Code",
      description: "Génération et scan de QR codes pour paiements instantanés"
    },
    {
      icon: <NFC className="h-8 w-8" />,
      title: "Paiements Contactless",
      description: "Paiements NFC et proximité pour commerce physique"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Checkout Optimisé",
      description: "Expérience de paiement mobile ultra-rapide et sécurisée"
    }
  ];

  const benefits = [
    "SDK React Native et Flutter",
    "Interface utilisateur native",
    "Paiements one-click",
    "Stockage sécurisé des cartes",
    "Notifications push",
    "Mode hors-ligne",
    "Analytics comportementaux",
    "A/B testing intégré"
  ];

  const useCases = [
    {
      title: "E-commerce Mobile",
      description: "Applications de shopping avec checkout optimisé",
      icon: <Smartphone className="h-12 w-12" />
    },
    {
      title: "Livraison & Restauration",
      description: "Apps de commande avec paiement à la livraison",
      icon: <Users className="h-12 w-12" />
    },
    {
      title: "Commerce de Proximité",
      description: "Solutions de paiement pour magasins physiques",
      icon: <QrCode className="h-12 w-12" />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-senepay-dark text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Smartphone className="h-16 w-16 mx-auto mb-6 text-senepay-gold" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Solutions Mobile Apps
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              Intégrez des paiements natifs dans vos applications mobiles
            </p>
            <div className="flex justify-center gap-4">
              <Badge variant="outline" className="bg-senepay-gold text-black border-senepay-gold">
                iOS & Android
              </Badge>
              <Badge variant="outline" className="bg-senepay-green text-white border-senepay-green">
                React Native & Flutter
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="p-3 bg-senepay-gold/10 rounded-lg inline-block mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </Card>
            ))}
          </div>

          {/* Mobile Experience */}
          <Card className="p-8 mb-12 bg-gradient-to-br from-senepay-gold/10 to-senepay-orange/10 border-senepay-gold/20">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4 text-senepay-dark">
                Expérience Mobile Optimale
              </h2>
              <p className="text-lg text-gray-700">
                Checkout mobile avec taux de conversion jusqu'à 85%
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-senepay-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold mb-2">Checkout Rapide</h4>
                <p className="text-gray-600">Paiement en 2 clics avec autofill intelligent</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-senepay-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <QrCode className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold mb-2">QR Code Natif</h4>
                <p className="text-gray-600">Scanner intégré pour paiements instantanés</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-senepay-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <NFC className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold mb-2">Contactless</h4>
                <p className="text-gray-600">Paiements NFC pour commerce physique</p>
              </div>
            </div>
          </Card>

          {/* SDK Integration */}
          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-senepay-dark">
                Intégration SDK Simple
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-senepay-green mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Code d'Intégration</h3>
              <div className="bg-gray-900 rounded-lg p-4 mb-4">
                <pre className="text-sm text-gray-300 font-mono overflow-x-auto">
                  <code>{`// React Native
import { SenePay } from '@senepay/react-native';

const payment = await SenePay.createPayment({
  amount: 25000,
  currency: 'XOF',
  customer: { 
    phone: '+221771234567' 
  }
});`}</code>
                </pre>
              </div>
              <div className="bg-gray-900 rounded-lg p-4">
                <pre className="text-sm text-gray-300 font-mono overflow-x-auto">
                  <code>{`// Flutter
final payment = await SenePay.createPayment(
  amount: 25000,
  currency: 'XOF',
  customer: Customer(
    phone: '+221771234567'
  )
);`}</code>
                </pre>
              </div>
            </Card>
          </div>

          {/* Use Cases */}
          <Card className="p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6 text-center text-senepay-dark">
              Cas d'Usage Mobile
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {useCases.map((useCase, index) => (
                <div key={index} className="text-center">
                  <div className="p-4 bg-senepay-gold/10 rounded-lg mb-4 inline-block">
                    {useCase.icon}
                  </div>
                  <h4 className="font-semibold mb-2">{useCase.title}</h4>
                  <p className="text-sm text-gray-600">{useCase.description}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Performance Stats */}
          <Card className="p-8 mb-12 bg-senepay-green/5 border-senepay-green/20">
            <h2 className="text-2xl font-bold mb-6 text-center text-senepay-dark">
              Performance Mobile
            </h2>
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-senepay-gold mb-2">85%</div>
                <p className="text-gray-600">Taux de Conversion</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-senepay-gold mb-2">2.3s</div>
                <p className="text-gray-600">Temps de Checkout</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-senepay-gold mb-2">99.9%</div>
                <p className="text-gray-600">Disponibilité</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-senepay-gold mb-2">4.9/5</div>
                <p className="text-gray-600">Satisfaction</p>
                <Star className="h-4 w-4 text-yellow-500 fill-current inline ml-1" />
              </div>
            </div>
          </Card>

          {/* CTA */}
          <div className="text-center">
            <div className="bg-gradient-senepay rounded-2xl p-8 inline-block">
              <h3 className="text-2xl font-bold mb-4 text-white">
                Transformez Votre App Mobile
              </h3>
              <p className="text-lg mb-6 opacity-90 text-white">
                SDK prêt à intégrer avec documentation complète
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => navigate('/sdks')}
                  className="bg-white text-senepay-dark hover:bg-gray-100 px-8 py-3 font-bold"
                >
                  Télécharger SDK
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/sandbox')}
                  className="border-white text-white hover:bg-white hover:text-senepay-dark px-8 py-3"
                >
                  Tester Maintenant
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileAppsSolution;
