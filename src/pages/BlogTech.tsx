
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Newspaper, Clock, User, Tag, ArrowRight, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BlogTech = () => {
  const navigate = useNavigate();

  const articles = [
    {
      title: "L'Évolution des Paiements Mobiles au Sénégal en 2024",
      excerpt: "Analyse approfondie des tendances Mobile Money et leur impact sur l'e-commerce local.",
      category: "Market Analysis",
      date: "15 Juin 2025",
      readTime: "8 min",
      author: "Amadou Diallo",
      featured: true
    },
    {
      title: "Comment Réduire les Abandons de Panier de 40%",
      excerpt: "Stratégies éprouvées pour optimiser votre checkout et maximiser les conversions.",
      category: "Optimisation",
      date: "12 Juin 2025",
      readTime: "6 min",
      author: "Fatou Sow",
      featured: false
    },
    {
      title: "Sécurité PCI DSS : Guide Complet pour les E-commerçants",
      excerpt: "Tout ce que vous devez savoir sur la conformité PCI DSS au Sénégal.",
      category: "Sécurité",
      date: "10 Juin 2025",
      readTime: "12 min",
      author: "Moussa Ba",
      featured: false
    },
    {
      title: "API First : Architecture de Paiement Moderne",
      excerpt: "Pourquoi adopter une approche API-first pour vos systèmes de paiement.",
      category: "Technique",
      date: "8 Juin 2025",
      readTime: "10 min",
      author: "Khadija Ndiaye",
      featured: false
    },
    {
      title: "Success Story : Comment Jumia a Intégré SenePay",
      excerpt: "Retour d'expérience sur l'intégration de SenePay dans une marketplace majeure.",
      category: "Case Study",
      date: "5 Juin 2025",
      readTime: "7 min",
      author: "Équipe SenePay",
      featured: false
    },
    {
      title: "Webhooks vs Polling : Quelle Stratégie Choisir ?",
      excerpt: "Comparaison détaillée des approches de notification temps réel.",
      category: "Technique",
      date: "3 Juin 2025",
      readTime: "9 min",
      author: "Ibrahima Sy",
      featured: false
    }
  ];

  const categories = ["Tous", "Market Analysis", "Optimisation", "Sécurité", "Technique", "Case Study"];

  const getCategoryColor = (category: string) => {
    const colors = {
      "Market Analysis": "bg-blue-100 text-blue-800",
      "Optimisation": "bg-green-100 text-green-800",
      "Sécurité": "bg-red-100 text-red-800",
      "Technique": "bg-purple-100 text-purple-800",
      "Case Study": "bg-orange-100 text-orange-800"
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const featuredArticle = articles.find(article => article.featured);
  const regularArticles = articles.filter(article => !article.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-senepay-dark text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Newspaper className="h-16 w-16 mx-auto mb-6 text-senepay-gold" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Blog Technique SenePay
            </h1>
            <p className="text-xl text-gray-300">
              Insights, guides et actualités du paiement digital en Afrique
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Featured Article */}
          {featuredArticle && (
            <Card className="p-8 mb-12 bg-gradient-to-br from-senepay-gold/10 to-senepay-orange/10 border-senepay-gold/20">
              <div className="flex items-center mb-4">
                <TrendingUp className="h-6 w-6 text-senepay-gold mr-2" />
                <Badge className="bg-senepay-gold text-black">Article Vedette</Badge>
              </div>
              
              <h2 className="text-3xl font-bold mb-4 text-senepay-dark">
                {featuredArticle.title}
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                {featuredArticle.excerpt}
              </p>
              
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <Badge className={getCategoryColor(featuredArticle.category)}>
                  {featuredArticle.category}
                </Badge>
                <div className="flex items-center text-gray-600">
                  <Clock className="h-4 w-4 mr-1" />
                  {featuredArticle.readTime}
                </div>
                <div className="flex items-center text-gray-600">
                  <User className="h-4 w-4 mr-1" />
                  {featuredArticle.author}
                </div>
                <span className="text-gray-500 text-sm">{featuredArticle.date}</span>
              </div>
              
              <Button className="bg-senepay-gold hover:bg-senepay-orange">
                Lire l'Article
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Card>
          )}

          {/* Categories Filter */}
          <Card className="p-6 mb-8">
            <div className="flex flex-wrap items-center gap-2">
              <Tag className="h-4 w-4 text-gray-500 mr-2" />
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
          </Card>

          {/* Articles Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {regularArticles.map((article, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <Badge className={getCategoryColor(article.category)}>
                    {article.category}
                  </Badge>
                  <span className="text-xs text-gray-500">{article.date}</span>
                </div>
                
                <h3 className="text-lg font-bold mb-3 text-senepay-dark line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {article.readTime}
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {article.author}
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full border-senepay-gold text-senepay-dark hover:bg-senepay-gold/10"
                >
                  Lire Plus
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Card>
            ))}
          </div>

          {/* Newsletter Signup */}
          <Card className="p-8 mb-12 bg-senepay-green/5 border-senepay-green/20">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4 text-senepay-dark">
                Restez Informé
              </h2>
              <p className="text-gray-700 mb-6">
                Recevez nos derniers articles et insights directement dans votre boîte mail
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="votre@email.com"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-senepay-gold"
                />
                <Button className="bg-senepay-gold hover:bg-senepay-orange px-8">
                  S'Abonner
                </Button>
              </div>
            </div>
          </Card>

          {/* CTA */}
          <div className="text-center">
            <div className="bg-gradient-senepay rounded-2xl p-8 inline-block">
              <h3 className="text-2xl font-bold mb-4 text-white">
                Envie de Contribuer ?
              </h3>
              <p className="text-lg mb-6 opacity-90 text-white">
                Partagez votre expertise avec la communauté SenePay
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => navigate('/contact')}
                  className="bg-white text-senepay-dark hover:bg-gray-100 px-8 py-3 font-bold"
                >
                  Proposer un Article
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/guides')}
                  className="border-white text-white hover:bg-white hover:text-senepay-dark px-8 py-3"
                >
                  Voir les Guides
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogTech;
