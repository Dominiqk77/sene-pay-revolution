import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Calendar, Clock, Eye, Share2, Search, Filter, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featured_image_url: string;
  category: string;
  tags: string[];
  author_name: string;
  reading_time: number;
  view_count: number;
  published_at: string;
  seo_score: number;
  is_featured: boolean;
}

const Blog = () => {
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [featuredArticles, setFeaturedArticles] = useState<BlogArticle[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: "all", name: "Tous les articles", color: "bg-gradient-to-r from-senepay-orange to-senepay-gold" },
    { id: "fintech", name: "FinTech", color: "bg-gradient-to-r from-blue-500 to-blue-600" },
    { id: "innovation", name: "Innovation", color: "bg-gradient-to-r from-purple-500 to-purple-600" },
    { id: "panafricain", name: "Panafricain", color: "bg-gradient-to-r from-green-500 to-green-600" },
    { id: "economie", name: "Économie", color: "bg-gradient-to-r from-yellow-500 to-orange-500" },
    { id: "technologie", name: "Technologie", color: "bg-gradient-to-r from-cyan-500 to-blue-500" }
  ];

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      
      // Fetch featured articles
      const { data: featured } = await supabase
        .from('blog_articles')
        .select('*')
        .eq('is_published', true)
        .eq('is_featured', true)
        .order('published_at', { ascending: false })
        .limit(3);

      // Fetch all articles
      const { data: allArticles } = await supabase
        .from('blog_articles')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false });

      if (featured) setFeaturedArticles(featured);
      if (allArticles) setArticles(allArticles);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50">
      <Helmet>
        <title>Blog SenePay - #1 FinTech Insights Afrique | Innovation Paiements Digitaux Sénégal</title>
        <meta name="description" content="Blog #1 FinTech Afrique par SenePay. Analyses exclusives, innovations paiements mobiles, insights panafricains. Orange Money, Wave, révolution digitale sénégalaise." />
        <meta name="keywords" content="blog fintech afrique, senepay blog, paiement mobile sénégal, innovation digitale, orange money, wave, fintech insights" />
        <meta property="og:title" content="Blog SenePay - #1 FinTech Insights Afrique" />
        <meta property="og:description" content="Découvrez les dernières innovations FinTech africaines, analyses exclusives et insights panafricains sur notre blog de référence." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://senepay.sn/blog" />
      </Helmet>

      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-senepay-orange via-senepay-gold to-yellow-400">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm mb-6">
              <TrendingUp className="w-5 h-5 mr-2" />
              <span className="font-medium">#1 Blog FinTech Afrique</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-yellow-100 bg-clip-text text-transparent">
              SenePay<span className="text-white"> Blog</span> 🇸🇳
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white/90">
              Découvrez les <span className="font-bold text-yellow-200">dernières innovations FinTech africaines</span>, 
              analyses exclusives et insights panafricains qui façonnent l'avenir des paiements digitaux.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Rechercher un article..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 bg-white/95 backdrop-blur-sm border-0 text-gray-800 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className={`${
                  selectedCategory === category.id 
                    ? `${category.color} text-white border-0 shadow-lg` 
                    : "border-gray-300 text-gray-700 hover:border-senepay-orange"
                }`}
              >
                <Filter className="w-4 h-4 mr-2" />
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <section className="py-16 bg-gradient-to-r from-gray-50 to-blue-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-senepay-orange to-senepay-gold bg-clip-text text-transparent">
                Articles à la Une
              </span>
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredArticles.map((article, index) => (
                <Link key={article.id} to={`/blog/${article.slug}`}>
                  <div className={`group cursor-pointer transform transition-all duration-300 hover:scale-105 ${
                    index === 0 ? 'md:col-span-2 lg:col-span-1' : ''
                  }`}>
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
                      <div className="relative overflow-hidden">
                        <img
                          src={article.featured_image_url || "/placeholder.svg"}
                          alt={article.title}
                          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-senepay-orange text-white font-medium">
                            ⭐ À la une
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {formatDate(article.published_at)}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {article.reading_time} min
                          </span>
                          <span className="flex items-center">
                            <Eye className="w-4 h-4 mr-1" />
                            {article.view_count.toLocaleString()}
                          </span>
                        </div>
                        
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-senepay-orange transition-colors">
                          {article.title}
                        </h3>
                        
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {article.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                            {article.category}
                          </Badge>
                          <span className="text-senepay-orange font-medium group-hover:underline">
                            Lire la suite →
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Articles */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Tous nos Articles
            </span>
          </h2>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-senepay-orange"></div>
              <p className="mt-4 text-gray-600">Chargement des articles...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <Link key={article.id} to={`/blog/${article.slug}`}>
                  <div className="group cursor-pointer">
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                      <div className="relative overflow-hidden">
                        <img
                          src={article.featured_image_url || "/placeholder.svg"}
                          alt={article.title}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      
                      <div className="p-6">
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {formatDate(article.published_at)}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {article.reading_time} min
                          </span>
                        </div>
                        
                        <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-senepay-orange transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {article.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary" className="bg-gray-100 text-gray-700 text-xs">
                              {article.category}
                            </Badge>
                          </div>
                          <div className="flex items-center text-gray-500">
                            <Eye className="w-4 h-4 mr-1" />
                            <span className="text-sm">{article.view_count}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {filteredArticles.length === 0 && !loading && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Aucun article trouvé pour cette recherche.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-gradient-to-r from-senepay-orange to-senepay-gold">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Restez à la Pointe de l'Innovation FinTech 🚀
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Recevez nos analyses exclusives, insights panafricains et dernières innovations directement dans votre boîte mail.
          </p>
          <div className="max-w-md mx-auto flex gap-3">
            <Input
              type="email"
              placeholder="Votre email..."
              className="flex-1 h-12 bg-white/95 backdrop-blur-sm border-0"
            />
            <Button className="h-12 px-6 bg-white text-senepay-orange hover:bg-gray-100 font-medium">
              S'abonner
            </Button>
          </div>
          <p className="text-white/80 text-sm mt-4">
            +2,500 professionnels nous font déjà confiance
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;