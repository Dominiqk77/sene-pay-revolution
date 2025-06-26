import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Code, Zap, Users, ArrowRight, Clock, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Guides = () => {
  const navigate = useNavigate();

  const guides = [
    {
      title: "Intégration Facile avec React Native",
      description: "Guide pas-à-pas pour intégrer SenePay dans vos applications React Native",
      icon: <Code className="h-8 w-8" />,
      time: "5 min",
      level: "Débutant"
    },
    {
      title: "Paiements Sécurisés avec Webhooks",
      description: "Comment utiliser les webhooks pour sécuriser vos paiements",
      icon: <Zap className="h-8 w-8" />,
      time: "10 min",
      level: "Intermédiaire"
    },
    {
      title: "Gestion des Utilisateurs avec l'API",
      description: "Guide pour gérer les utilisateurs et les paiements via notre API",
      icon: <Users className="h-8 w-8" />,
      time: "15 min",
      level: "Avancé"
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
              <BookOpen className="h-16 w-16 mx-auto mb-6 text-senepay-gold" />
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Guides & Tutoriels
              </h1>
              <p className="text-xl text-gray-300">
                Apprenez à intégrer SenePay rapidement et facilement
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            {/* Guides Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {guides.map((guide, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-senepay-gold/10 rounded-lg">
                      {guide.icon}
                    </div>
                    <Badge variant="outline">{guide.level}</Badge>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{guide.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{guide.description}</p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{guide.time}</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1 text-yellow-500 fill-current" />
                      <span className="text-sm text-gray-600">4.8</span>
                    </div>
                  </div>

                  <Button className="w-full bg-senepay-gold hover:bg-senepay-orange">
                    Lire le Guide
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Card>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center">
              <div className="bg-gradient-senepay rounded-2xl p-8 inline-block">
                <h3 className="text-2xl font-bold mb-4 text-white">
                  Besoin d'Aide Supplémentaire ?
                </h3>
                <p className="text-lg mb-6 opacity-90 text-white">
                  Contactez notre équipe de support pour une assistance personnalisée
                </p>
                <Button
                  onClick={() => navigate('/contact')}
                  className="bg-white text-senepay-dark hover:bg-gray-100 px-8 py-3 font-bold"
                >
                  Contacter le Support
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Guides;
