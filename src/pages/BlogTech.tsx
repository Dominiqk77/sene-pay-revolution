
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Code, Calendar, User, ArrowRight, BookOpen, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const BlogTech = () => {
  const navigate = useNavigate();

  const articles = [
    {
      title: "Les Tendances Tech qui Redéfinissent le Paiement en Ligne",
      date: "15 Mars 2025",
      author: "Fatou Diop",
      category: "Technologie",
      excerpt: "Découvrez comment l'IA, la blockchain et les nouvelles réglementations façonnent l'avenir des transactions numériques.",
      link: "#",
      image: "https://images.unsplash.com/photo-1555066931-436544c83898?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    },
    {
      title: "Comment Sécuriser Votre Boutique en Ligne Contre les Fraudes",
      date: "22 Février 2025",
      author: "Mamadou Mbaye",
      category: "Sécurité",
      excerpt: "Protégez vos clients et votre entreprise en adoptant les meilleures pratiques de sécurité et les outils de prévention de la fraude.",
      link: "#",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    },
    {
      title: "L'Impact du Mobile Payment sur le Commerce en Afrique",
      date: "10 Janvier 2025",
      author: "Aissatou Diallo",
      category: "Commerce Mobile",
      excerpt: "Analysez l'essor des paiements mobiles et leur influence croissante sur les habitudes d'achat des consommateurs africains.",
      link: "#",
      image: "https://images.unsplash.com/photo-1556740758-90de96684382?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-16">
        {/* Header */}
        <div className="bg-senepay-dark text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Code className="h-16 w-16 mx-auto mb-6 text-senepay-gold" />
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Blog Tech
              </h1>
              <p className="text-xl text-gray-300">
                Les dernières tendances et analyses sur le paiement en ligne
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            {/* Articles Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {articles.map((article, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <img src={article.image} alt={article.title} className="rounded-md mb-4 h-48 w-full object-cover" />
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2 text-gray-500">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">{article.date}</span>
                    </div>
                    <Badge variant="secondary">{article.category}</Badge>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{article.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{article.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-gray-500">
                      <User className="h-4 w-4" />
                      <span className="text-sm">{article.author}</span>
                    </div>
                    <Button size="sm" variant="link" className="text-senepay-gold hover:text-senepay-orange">
                      Lire l'article <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {/* Newsletter Signup */}
            <Card className="p-8 mb-12">
              <div className="text-center">
                <BookOpen className="h-12 w-12 mx-auto mb-4 text-senepay-gold" />
                <h2 className="text-2xl font-bold mb-4 text-senepay-dark">
                  Abonnez-vous à Notre Newsletter
                </h2>
                <p className="text-gray-600 mb-6">
                  Recevez les dernières nouvelles et mises à jour directement dans votre boîte de réception.
                </p>
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                  <input
                    type="email"
                    placeholder="Votre adresse email"
                    className="border border-gray-300 rounded-md px-4 py-2 w-full md:w-auto"
                  />
                  <Button className="bg-senepay-gold hover:bg-senepay-orange">
                    S'abonner
                  </Button>
                </div>
              </div>
            </Card>

            {/* Trending Topics */}
            <Card className="p-8 mb-12">
              <h2 className="text-2xl font-bold mb-6 text-senepay-dark">
                Sujets Tendances
              </h2>
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="h-5 w-5 text-gray-500" />
                    <span className="font-semibold">Paiements instantanés</span>
                  </div>
                  <Badge variant="outline">12 articles</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="h-5 w-5 text-gray-500" />
                    <span className="font-semibold">Sécurité des transactions</span>
                  </div>
                  <Badge variant="outline">8 articles</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="h-5 w-5 text-gray-500" />
                    <span className="font-semibold">Mobile commerce</span>
                  </div>
                  <Badge variant="outline">6 articles</Badge>
                </div>
              </div>
            </Card>

            {/* CTA */}
            <div className="text-center">
              <div className="bg-gradient-senepay rounded-2xl p-8 inline-block">
                <h3 className="text-2xl font-bold mb-4 text-white">
                  Explorez Plus d'Articles Tech
                </h3>
                <p className="text-lg mb-6 opacity-90 text-white">
                  Découvrez des analyses approfondies et des conseils pratiques pour optimiser vos paiements en ligne.
                </p>
                <Button
                  onClick={() => navigate('/documentation')}
                  className="bg-white text-senepay-dark hover:bg-gray-100 px-8 py-3 font-bold"
                >
                  Voir la Documentation
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

export default BlogTech;
