
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, User, ArrowRight, Search, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";

const Guides = () => {
  const navigate = useNavigate();

  const guides = [
    {
      title: "Intégration API en 5 Minutes",
      description: "Guide complet pour intégrer SenePay dans votre application",
      category: "Intégration",
      difficulty: "Débutant",
      readTime: "5 min",
      author: "Équipe SenePay"
    },
    {
      title: "Configuration des Webhooks",
      description: "Recevez des notifications en temps réel pour tous vos paiements",
      category: "Webhooks",
      difficulty: "Intermédiaire",
      readTime: "8 min",
      author: "Équipe SenePay"
    },
    {
      title: "Paiements Récurrents pour SaaS",
      description: "Automatisez vos abonnements et boostez votre MRR",
      category: "Abonnements",
      difficulty: "Avancé",
      readTime: "12 min",
      author: "Équipe SenePay"
    },
    {
      title: "Sécurisation des Transactions",
      description: "Meilleures pratiques pour sécuriser vos paiements",
      category: "Sécurité",
      difficulty: "Intermédiaire",
      readTime: "10 min",
      author: "Équipe SenePay"
    },
    {
      title: "Optimisation Mobile Money",
      description: "Maximisez les conversions avec Orange Money et Wave",
      category: "Mobile Money",
      difficulty: "Débutant",
      readTime: "6 min",
      author: "Équipe SenePay"
    },
    {
      title: "Analytics et Reporting",
      description: "Exploitez vos données de paiement pour croître",
      category: "Analytics",
      difficulty: "Intermédiaire",
      readTime: "9 min",
      author: "Équipe SenePay"
    }
  ];

  const categories = ["Tous", "Intégration", "Webhooks", "Abonnements", "Sécurité", "Mobile Money", "Analytics"];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Débutant": return "bg-green-100 text-green-800";
      case "Intermédiaire": return "bg-yellow-100 text-yellow-800";
      case "Avancé": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-senepay-dark text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <BookOpen className="h-16 w-16 mx-auto mb-6 text-senepay-gold" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Guides d'Intégration
            </h1>
            <p className="text-xl text-gray-300">
              Apprenez à intégrer SenePay étape par étape
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Search and Filter */}
          <Card className="p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  placeholder="Rechercher un guide..." 
                  className="pl-10"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <div className="flex flex-wrap gap-2">
                  {categories.map((category, index) => (
                    <Badge 
                      key={index}
                      variant={index === 0 ? "default" : "outline"}
                      className={index === 0 ? "bg-senepay-gold text-black" : "cursor-pointer hover:bg-senepay-gold/10"}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Quick Start */}
          <Card className="p-8 mb-12 bg-gradient-to-br from-senepay-gold/10 to-senepay-orange/10 border-senepay-gold/20">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-4 text-senepay-dark">
                Démarrage Rapide
              </h2>
              <p className="text-lg text-gray-700">
                Intégrez SenePay en 3 étapes simples
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-senepay-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-white">1</span>
                </div>
                <h4 className="font-semibold mb-2">Créer un Compte</h4>
                <p className="text-sm text-gray-600">Inscrivez-vous et obtenez vos clés API</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-senepay-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-white">2</span>
                </div>
                <h4 className="font-semibold mb-2">Intégrer l'API</h4>
                <p className="text-sm text-gray-600">Suivez nos guides d'intégration</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-senepay-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-white">3</span>
                </div>
                <h4 className="font-semibold mb-2">Aller en Production</h4>
                <p className="text-sm text-gray-600">Testez et lancez vos paiements</p>
              </div>
            </div>
          </Card>

          {/* Guides Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {guides.map((guide, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="outline" className="text-senepay-dark border-senepay-gold">
                    {guide.category}
                  </Badge>
                  <Badge variant="secondary" className={getDifficultyColor(guide.difficulty)}>
                    {guide.difficulty}
                  </Badge>
                </div>
                
                <h3 className="text-lg font-bold mb-2 text-senepay-dark">
                  {guide.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {guide.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {guide.readTime}
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {guide.author}
                  </div>
                </div>
                
                <Button 
                  className="w-full mt-4 bg-senepay-gold hover:bg-senepay-orange"
                  onClick={() => navigate('/api-documentation')}
                >
                  Lire le Guide
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Card>
            ))}
          </div>

          {/* Popular Topics */}
          <Card className="p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6 text-center text-senepay-dark">
              Sujets Populaires
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {["Intégration WordPress", "Paiements Mobiles", "Gestion des Erreurs", "Tests de Charge"].map((topic, index) => (
                <div key={index} className="text-center p-4 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <BookOpen className="h-8 w-8 mx-auto mb-2 text-senepay-gold" />
                  <p className="text-sm font-medium">{topic}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* CTA */}
          <div className="text-center">
            <div className="bg-gradient-senepay rounded-2xl p-8 inline-block">
              <h3 className="text-2xl font-bold mb-4 text-white">
                Besoin d'Aide Personnalisée ?
              </h3>
              <p className="text-lg mb-6 opacity-90 text-white">
                Notre équipe technique est là pour vous accompagner
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => navigate('/contact')}
                  className="bg-white text-senepay-dark hover:bg-gray-100 px-8 py-3 font-bold"
                >
                  Contacter le Support
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/sandbox')}
                  className="border-white text-white hover:bg-white hover:text-senepay-dark px-8 py-3"
                >
                  Tester l'API
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guides;
