import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Newspaper, Calendar, Download, ArrowRight, Users, Zap, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Press = () => {
  const navigate = useNavigate();

  const newsReleases = [
    {
      title: "SenePay lève 15 millions USD en Série A",
      excerpt: "La fintech sénégalaise accélère son expansion en Afrique de l'Ouest avec une levée de fonds record.",
      date: "20 Juin 2025",
      category: "Financement",
      featured: true
    },
    {
      title: "Partenariat stratégique avec Orange Business Services",
      excerpt: "SenePay et Orange s'allient pour démocratiser les paiements mobiles dans 8 pays africains.",
      date: "15 Juin 2025",
      category: "Partenariat",
      featured: false
    },
    {
      title: "SenePay dépasse le cap des 10 000 marchands actifs",
      excerpt: "La plateforme de paiement connaît une croissance de 300% en 12 mois.",
      date: "10 Juin 2025",
      category: "Croissance",
      featured: false
    },
    {
      title: "Prix de l'Innovation Fintech Africa 2025",
      excerpt: "SenePay remporte le prix de la meilleure solution de paiement B2B en Afrique francophone.",
      date: "5 Juin 2025",
      category: "Récompense",
      featured: false
    },
    {
      title: "Ouverture du bureau régional à Abidjan",
      excerpt: "SenePay renforce sa présence en Côte d'Ivoire avec l'ouverture d'un bureau régional.",
      date: "1 Juin 2025",
      category: "Expansion",
      featured: false
    }
  ];

  const mediaKitItems = [
    {
      title: "Logo SenePay",
      description: "Logos haute résolution en différents formats",
      type: "image",
      format: "PNG, SVG, EPS",
      size: "2.5 MB"
    },
    {
      title: "Photos Équipe",
      description: "Photos officielles des dirigeants et équipe",
      type: "image", 
      format: "JPG, PNG",
      size: "12 MB"
    },
    {
      title: "Communiqué de Presse Type",
      description: "Template et exemples de communiqués",
      type: "document",
      format: "PDF, DOCX",
      size: "500 KB"
    },
    {
      title: "Présentation Entreprise",
      description: "Deck de présentation officiel SenePay",
      type: "document",
      format: "PDF, PPTX",
      size: "8 MB"
    },
    {
      title: "Vidéo Institutionnelle",
      description: "Présentation vidéo de SenePay",
      type: "video",
      format: "MP4, MOV",
      size: "150 MB"
    },
    {
      title: "Captures d'Écran Produit",
      description: "Screenshots de l'interface et dashboard",
      type: "image",
      format: "PNG, JPG",
      size: "5 MB"
    }
  ];

  const keyFigures = [
    {
      number: "10,000+",
      label: "Marchands Actifs",
      description: "Croissance de 300% en 12 mois"
    },
    {
      number: "$50M",
      label: "Volume Traité",
      description: "Transactions traitées en 2025"
    },
    {
      number: "8",
      label: "Pays Couverts", 
      description: "Présence en Afrique de l'Ouest"
    },
    {
      number: "99.9%",
      label: "Disponibilité",
      description: "Uptime de nos services"
    }
  ];

  const pressContacts = [
    {
      name: "Fatou Diop",
      role: "Directrice Communication",
      email: "press@senepay.com",
      phone: "+221 77 656 40 42"
    },
    {
      name: "Amadou Sy",
      role: "CEO & Co-fondateur",
      email: "ceo@senepay.com",
      phone: "+221 77 462 75 03"
    }
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case "image": return <FileText className="h-6 w-6" />;
      case "video": return <FileText className="h-6 w-6" />;
      case "document": return <FileText className="h-6 w-6" />;
      default: return <Download className="h-6 w-6" />;
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      "Financement": "bg-green-100 text-green-800",
      "Partenariat": "bg-blue-100 text-blue-800",
      "Croissance": "bg-purple-100 text-purple-800",
      "Récompense": "bg-yellow-100 text-yellow-800",
      "Expansion": "bg-orange-100 text-orange-800"
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const featuredNews = newsReleases.find(news => news.featured);
  const regularNews = newsReleases.filter(news => !news.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-16">
        {/* Header */}
        <div className="bg-senepay-dark text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Newspaper className="h-16 w-16 mx-auto mb-6 text-senepay-gold" />
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Espace Presse
              </h1>
              <p className="text-xl text-gray-300">
                Ressources médias et actualités de SenePay
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            {/* Featured News */}
            {featuredNews && (
              <Card className="p-8 mb-12 bg-gradient-to-br from-senepay-gold/10 to-senepay-orange/10 border-senepay-gold/20">
                <div className="flex items-center mb-4">
                  <Badge className="bg-senepay-gold text-black mr-4">À la Une</Badge>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-1" />
                    {featuredNews.date}
                  </div>
                </div>
                
                <h2 className="text-3xl font-bold mb-4 text-senepay-dark">
                  {featuredNews.title}
                </h2>
                <p className="text-lg text-gray-700 mb-6">
                  {featuredNews.excerpt}
                </p>
                
                <div className="flex items-center space-x-4">
                  <Badge className={getCategoryColor(featuredNews.category)}>
                    {featuredNews.category}
                  </Badge>
                  <Button className="bg-senepay-gold hover:bg-senepay-orange">
                    Lire le Communiqué
                  </Button>
                </div>
              </Card>
            )}

            {/* Recent News */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-8 text-center text-senepay-dark">
                Actualités Récentes
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {regularNews.map((news, index) => (
                  <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <Badge className={getCategoryColor(news.category)}>
                        {news.category}
                      </Badge>
                      <span className="text-sm text-gray-500">{news.date}</span>
                    </div>
                    
                    <h3 className="text-lg font-bold mb-3 text-senepay-dark">
                      {news.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {news.excerpt}
                    </p>
                    
                    <Button variant="outline" className="w-full border-senepay-gold text-senepay-dark hover:bg-senepay-gold/10">
                      Lire Plus
                    </Button>
                  </Card>
                ))}
              </div>
            </div>

            {/* Key Figures */}
            <Card className="p-8 mb-12 bg-senepay-green/5 border-senepay-green/20">
              <h2 className="text-2xl font-bold mb-6 text-center text-senepay-dark">
                SenePay en Chiffres
              </h2>
              <div className="grid md:grid-cols-4 gap-6">
                {keyFigures.map((figure, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-senepay-gold mb-2">
                      {figure.number}
                    </div>
                    <h4 className="font-semibold mb-1">{figure.label}</h4>
                    <p className="text-sm text-gray-600">{figure.description}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Media Kit */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-8 text-center text-senepay-dark">
                Kit Presse
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mediaKitItems.map((item, index) => (
                  <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center mb-4">
                      <div className="p-2 bg-senepay-gold/10 rounded-lg mr-3">
                        {getFileIcon(item.type)}
                      </div>
                      <div>
                        <h3 className="font-bold">{item.title}</h3>
                        <p className="text-xs text-gray-500">{item.format} • {item.size}</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                    
                    <Button 
                      variant="outline" 
                      className="w-full border-senepay-gold text-senepay-dark hover:bg-senepay-gold/10"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Télécharger
                    </Button>
                  </Card>
                ))}
              </div>
            </div>

            {/* Press Contacts */}
            <Card className="p-8 mb-12">
              <h2 className="text-2xl font-bold mb-6 text-center text-senepay-dark">
                Contacts Presse
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {pressContacts.map((contact, index) => (
                  <div key={index} className="text-center p-6 bg-gray-50 rounded-lg">
                    <div className="w-16 h-16 bg-senepay-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="h-8 w-8 text-senepay-gold" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{contact.name}</h3>
                    <p className="text-gray-600 mb-4">{contact.role}</p>
                    <div className="space-y-2">
                      <p className="text-sm">
                        <span className="font-semibold">Email:</span> {contact.email}
                      </p>
                      <p className="text-sm">
                        <span className="font-semibold">Tél:</span> {contact.phone}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Newsletter */}
            <Card className="p-8 mb-12 bg-senepay-gold/10 border-senepay-gold/20">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4 text-senepay-dark">
                  Newsletter Presse
                </h2>
                <p className="text-gray-700 mb-6">
                  Recevez nos communiqués de presse et actualités en avant-première
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input 
                    type="email" 
                    placeholder="email@media.com"
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
                  Demande d'Interview ?
                </h3>
                <p className="text-lg mb-6 opacity-90 text-white">
                  Notre équipe est disponible pour vos interviews et reportages
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={() => navigate('/contact')}
                    className="bg-white text-senepay-dark hover:bg-gray-100 px-8 py-3 font-bold"
                  >
                    Demander un Interview
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-white text-white hover:bg-white hover:text-senepay-dark px-8 py-3"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Kit Presse Complet
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

export default Press;
