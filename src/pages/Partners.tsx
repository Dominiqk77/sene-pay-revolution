
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Handshake, Users, Globe, ArrowRight, Star, Zap, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Partners = () => {
  const navigate = useNavigate();

  const partners = [
    {
      name: "Developpeurs Web",
      description: "Agence web spécialisée ReactJS, NextJS, Node",
      clients: "50+",
      countries: "3",
      rating: 4.8,
      icon: <Globe className="h-8 w-8" />
    },
    {
      name: "Intégrateurs de Paiement",
      description: "Experts en intégration de solutions de paiement",
      clients: "120+",
      countries: "8",
      rating: 4.9,
      icon: <Handshake className="h-8 w-8" />
    },
    {
      name: "Consultants Fintech",
      description: "Cabinet de conseil spécialisé en technologies financières",
      clients: "30+",
      countries: "5",
      rating: 4.7,
      icon: <Users className="h-8 w-8" />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-16">
        {/* Header */}
        <div className="bg-senepay-dark text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Handshake className="h-16 w-16 mx-auto mb-6 text-senepay-gold" />
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Programme Partenaires
              </h1>
              <p className="text-xl text-gray-300">
                Rejoignez notre réseau de partenaires et développez votre activité
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            {/* Partners Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {partners.map((partner, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-senepay-gold/10 rounded-lg">
                      {partner.icon}
                    </div>
                    <Badge variant="outline">Partenaire</Badge>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{partner.name}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{partner.description}</p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1 text-gray-500" />
                        <span className="text-sm text-gray-600">{partner.clients} Clients</span>
                      </div>
                      <div className="flex items-center">
                        <Globe className="h-4 w-4 mr-1 text-gray-500" />
                        <span className="text-sm text-gray-600">{partner.countries} Pays</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1 text-yellow-500 fill-current" />
                      <span className="text-sm text-gray-600">{partner.rating}</span>
                    </div>
                  </div>

                  <Button className="w-full bg-senepay-gold hover:bg-senepay-orange">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    En savoir plus
                  </Button>
                </Card>
              ))}
            </div>

            {/* Benefits */}
            <Card className="p-8 mb-12 bg-gradient-to-br from-senepay-gold/10 to-senepay-orange/10 border-senepay-gold/20">
              <div className="flex items-center mb-6">
                <Zap className="h-8 w-8 text-senepay-gold mr-4" />
                <h2 className="text-2xl font-bold text-senepay-dark">
                  Avantages du Programme
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-senepay-green mr-2" />
                    <span className="text-gray-700">Commissions attractives</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-senepay-green mr-2" />
                    <span className="text-gray-700">Support technique dédié</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-senepay-green mr-2" />
                    <span className="text-gray-700">Accès à notre API</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-senepay-green mr-2" />
                    <span className="text-gray-700">Matériel marketing</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-senepay-green mr-2" />
                    <span className="text-gray-700">Opportunités de co-marketing</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-senepay-green mr-2" />
                    <span className="text-gray-700">Reconnaissance officielle</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* CTA */}
            <div className="text-center">
              <div className="bg-gradient-senepay rounded-2xl p-8 inline-block">
                <h3 className="text-2xl font-bold mb-4 text-white">
                  Devenez Partenaire SenePay
                </h3>
                <p className="text-lg mb-6 opacity-90 text-white">
                  Rejoignez notre programme et développez votre activité avec nous
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => navigate('/contact')}
                    className="bg-white text-senepay-dark hover:bg-gray-100 px-8 py-3 font-bold"
                  >
                    Postuler Maintenant
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate('/api-documentation')}
                    className="border-white text-white hover:bg-white hover:text-senepay-dark px-8 py-3"
                  >
                    Documentation API
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Partners;
