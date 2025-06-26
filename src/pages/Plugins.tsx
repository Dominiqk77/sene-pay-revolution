
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Puzzle, Download, Star, ArrowRight, Zap, ShoppingCart, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Plugins = () => {
  const navigate = useNavigate();

  const plugins = [
    {
      name: "WooCommerce SenePay",
      description: "Plugin officiel pour WooCommerce - Intégration complète avec tous les moyens de paiement",
      downloads: "15,000+",
      rating: 4.9,
      platform: "WordPress",
      icon: <ShoppingCart className="h-8 w-8" />,
      status: "stable"
    },
    {
      name: "Shopify SenePay",
      description: "Application Shopify native avec configuration en 2 clics",
      downloads: "8,500+",
      rating: 4.8,
      platform: "Shopify",
      icon: <CreditCard className="h-8 w-8" />,
      status: "stable"
    },
    {
      name: "PrestaShop SenePay",
      description: "Module PrestaShop avec support multi-boutiques",
      downloads: "3,200+",
      rating: 4.7,
      platform: "PrestaShop",
      icon: <Puzzle className="h-8 w-8" />,
      status: "beta"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-senepay-dark text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Puzzle className="h-16 w-16 mx-auto mb-6 text-senepay-gold" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Plugins & Extensions
            </h1>
            <p className="text-xl text-gray-300">
              Intégrations prêtes à l'emploi pour votre plateforme e-commerce
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Plugins Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {plugins.map((plugin, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-senepay-gold/10 rounded-lg">
                    {plugin.icon}
                  </div>
                  <Badge 
                    variant={plugin.status === 'stable' ? 'default' : 'secondary'}
                    className={plugin.status === 'stable' ? 'bg-senepay-green' : 'bg-yellow-500'}
                  >
                    {plugin.status}
                  </Badge>
                </div>
                <h3 className="text-xl font-bold mb-2">{plugin.name}</h3>
                <p className="text-gray-600 mb-4 text-sm">{plugin.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Download className="h-4 w-4 mr-1 text-gray-500" />
                      <span className="text-sm text-gray-600">{plugin.downloads}</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1 text-yellow-500 fill-current" />
                      <span className="text-sm text-gray-600">{plugin.rating}</span>
                    </div>
                  </div>
                  <Badge variant="outline">{plugin.platform}</Badge>
                </div>

                <Button className="w-full bg-senepay-gold hover:bg-senepay-orange">
                  <Download className="h-4 w-4 mr-2" />
                  Télécharger
                </Button>
              </Card>
            ))}
          </div>

          {/* Installation Guide */}
          <Card className="p-8 mb-8 bg-gradient-to-br from-senepay-gold/10 to-senepay-orange/10 border-senepay-gold/20">
            <div className="flex items-center mb-6">
              <Zap className="h-8 w-8 text-senepay-gold mr-4" />
              <h2 className="text-2xl font-bold text-senepay-dark">
                Installation Facile
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-senepay-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-white">1</span>
                </div>
                <h4 className="font-semibold mb-2">Téléchargement</h4>
                <p className="text-sm text-gray-600">Téléchargez le plugin pour votre plateforme</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-senepay-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-white">2</span>
                </div>
                <h4 className="font-semibold mb-2">Installation</h4>
                <p className="text-sm text-gray-600">Installez via votre interface d'administration</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-senepay-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-white">3</span>
                </div>
                <h4 className="font-semibold mb-2">Configuration</h4>
                <p className="text-sm text-gray-600">Configurez avec vos clés API SenePay</p>
              </div>
            </div>
          </Card>

          {/* CTA */}
          <div className="text-center">
            <div className="bg-gradient-senepay rounded-2xl p-8 inline-block">
              <h3 className="text-2xl font-bold mb-4 text-white">
                Votre Plugin n'est pas Listé ?
              </h3>
              <p className="text-lg mb-6 opacity-90 text-white">
                Demandez le développement d'un plugin personnalisé
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => navigate('/contact')}
                  className="bg-white text-senepay-dark hover:bg-gray-100 px-8 py-3 font-bold"
                >
                  Demander un Plugin
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/api-documentation')}
                  className="border-white text-white hover:bg-white hover:text-senepay-dark px-8 py-3"
                >
                  Développer Soi-même
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

export default Plugins;
