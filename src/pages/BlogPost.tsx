import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Calendar, Clock, Eye, Share2, ArrowLeft, Heart, Bookmark, Twitter, Linkedin, Facebook } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

// Component to render enhanced blog content with gradients and colors
const BlogContent = ({ content }: { content: string }) => {
  const parseContent = (text: string) => {
    let processedText = text;
    
    // Remove ALL markdown symbols (##, ###, **)
    processedText = processedText.replace(/#{1,6}\s*/g, '');
    processedText = processedText.replace(/\*\*(.*?)\*\*/g, '$1');
    
    // Split into paragraphs and process each
    const paragraphs = processedText.split('\n\n').filter(p => p.trim());
    
    let result = '';
    let colorIndex = 0;
    const gradientColors = [
      'from-blue-600 to-purple-600',
      'from-green-600 to-emerald-600', 
      'from-orange-600 to-red-600',
      'from-purple-600 to-pink-600',
      'from-emerald-600 to-cyan-600',
      'from-indigo-600 to-blue-600'
    ];
    
    paragraphs.forEach((paragraph, index) => {
      const trimmed = paragraph.trim();
      
      // Check if it's a title (first word is capitalized and paragraph is short)
      if (trimmed.length < 100 && /^[A-ZÀÂÄÉÈÊËÏÎÔÖÙÛÜŸÇ]/.test(trimmed) && 
          (trimmed.includes(':') || trimmed.includes('?') || trimmed.includes('!'))) {
        const gradient = gradientColors[colorIndex % gradientColors.length];
        colorIndex++;
        result += `<h2 class="text-3xl md:text-4xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent my-8 leading-tight">${trimmed}</h2>`;
      } else {
        // Enhanced paragraph with better formatting
        let enhancedParagraph = trimmed
          // Replace country references with flags
          .replace(/\bSénégal\b/g, 'Sénégal 🇸🇳')
          .replace(/\bAfrique\b/g, 'Afrique 🌍')
          .replace(/\bMali\b/g, 'Mali 🇲🇱')
          .replace(/\bBurkina\b/g, 'Burkina Faso 🇧🇫')
          .replace(/\bCôte d\'Ivoire\b/g, 'Côte d\'Ivoire 🇨🇮')
          // Highlight company names with varied colors
          .replace(/\b(SenePay)\b/g, '<span class="font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-md">$1</span>')
          .replace(/\b(Orange Money)\b/g, '<span class="font-semibold text-orange-500 bg-orange-50 px-2 py-1 rounded-md">$1</span>')
          .replace(/\b(Wave)\b/g, '<span class="font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">$1</span>')
          .replace(/\b(Free Money)\b/g, '<span class="font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-md">$1</span>')
          // Highlight tech terms with different colors
          .replace(/\b(FinTech|Fintech)\b/g, '<span class="font-medium text-purple-600">$1</span>')
          .replace(/\b(Innovation|Digital|API|Mobile Money)\b/g, '<span class="font-medium text-indigo-600">$1</span>')
          .replace(/\b(Blockchain|Intelligence Artificielle|IA)\b/g, '<span class="font-medium text-emerald-600">$1</span>')
          // Highlight percentages and numbers
          .replace(/(\d+%|\d+\.\d+%)/g, '<span class="font-bold text-green-600 bg-green-50 px-1 rounded">$1</span>')
          .replace(/(\d+[.,]\d+|\d{1,3}[., ]\d{3})/g, '<span class="font-semibold text-blue-600">$1</span>');
        
        result += `<p class="text-gray-800 leading-8 mb-6 text-lg">${enhancedParagraph}</p>`;
      }
    });
    
    return result;
  };

  return (
    <div 
      className="blog-content space-y-6"
      dangerouslySetInnerHTML={{ 
        __html: `<p class="text-gray-700 leading-relaxed mb-6">${parseContent(content)}</p>` 
      }}
    />
  );
};

interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featured_image_url: string;
  category: string;
  tags: string[];
  author_name: string;
  author_avatar: string;
  reading_time: number;
  view_count: number;
  like_count: number;
  share_count: number;
  published_at: string;
  meta_title: string;
  meta_description: string;
  keywords: string[];
  monetization_cta: any;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<BlogArticle | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (slug) {
      fetchArticle(slug);
    }
  }, [slug]);

  const fetchArticle = async (articleSlug: string) => {
    try {
      setLoading(true);
      
      // Fetch article
      const { data: articleData } = await supabase
        .from('blog_articles')
        .select('*')
        .eq('slug', articleSlug)
        .eq('is_published', true)
        .single();

      if (articleData) {
        setArticle(articleData);
        
        // Update view count
        await supabase
          .from('blog_articles')
          .update({ view_count: articleData.view_count + 1 })
          .eq('id', articleData.id);

        // Fetch related articles
        const { data: related } = await supabase
          .from('blog_articles')
          .select('*')
          .eq('category', articleData.category)
          .neq('id', articleData.id)
          .eq('is_published', true)
          .limit(3);

        if (related) setRelatedArticles(related);
      }
    } catch (error) {
      console.error('Error fetching article:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (!article) return;
    
    setLiked(!liked);
    const newLikeCount = liked ? article.like_count - 1 : article.like_count + 1;
    
    await supabase
      .from('blog_articles')
      .update({ like_count: newLikeCount })
      .eq('id', article.id);
    
    setArticle({ ...article, like_count: newLikeCount });
    
    toast({
      title: liked ? "Like retiré" : "Article liké !",
      description: liked ? "Vous n'aimez plus cet article" : "Merci pour votre soutien ❤️",
    });
  };

  const handleShare = async (platform: string) => {
    if (!article) return;
    
    const url = window.location.href;
    const text = `${article.title} - ${article.excerpt}`;
    
    let shareUrl = '';
    
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
      
      // Update share count
      await supabase
        .from('blog_articles')
        .update({ share_count: article.share_count + 1 })
        .eq('id', article.id);
      
      setArticle({ ...article, share_count: article.share_count + 1 });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="pt-24 pb-16">
          <div className="container mx-auto px-4 text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-senepay-orange"></div>
            <p className="mt-4 text-gray-600">Chargement de l'article...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="pt-24 pb-16">
          <div className="container mx-auto px-4 text-center py-20">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Article non trouvé</h1>
            <p className="text-gray-600 mb-8">L'article que vous recherchez n'existe pas ou a été supprimé.</p>
            <Link to="/blog">
              <Button className="btn-senepay">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour au blog
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{article.meta_title || article.title}</title>
        <meta name="description" content={article.meta_description || article.excerpt} />
        <meta name="keywords" content={article.keywords?.join(', ')} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:image" content={article.featured_image_url} />
        <meta property="og:type" content="article" />
        <meta property="article:author" content={article.author_name} />
        <meta property="article:published_time" content={article.published_at} />
        <meta property="article:section" content={article.category} />
        {article.tags.map((tag, index) => (
          <meta key={index} property="article:tag" content={tag} />
        ))}
        <link rel="canonical" href={`https://senepay.sn/blog/${article.slug}`} />
      </Helmet>

      <Header />

      {/* Article Header */}
      <section className="pt-24 pb-8">
        <div className="container mx-auto px-4">
          <Link to="/blog" className="inline-flex items-center text-senepay-orange hover:underline mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour au blog
          </Link>

          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <Badge className="bg-gradient-to-r from-senepay-orange to-senepay-gold text-white mb-4">
                {article.category}
              </Badge>
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {article.title}
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                {article.excerpt}
              </p>

              {/* Article Meta */}
              <div className="flex flex-wrap items-center gap-6 text-gray-500 border-b border-gray-200 pb-6">
                <div className="flex items-center">
                  <img
                    src={article.author_avatar || "/placeholder.svg"}
                    alt={article.author_name}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <span className="font-medium text-gray-900">{article.author_name}</span>
                </div>
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {formatDate(article.published_at)}
                </span>
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {article.reading_time} min de lecture
                </span>
                <span className="flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  {article.view_count.toLocaleString()} vues
                </span>
              </div>
            </div>

            {/* Featured Image */}
            <div className="mb-12">
              <img
                src={article.featured_image_url}
                alt={article.title}
                className="w-full h-[400px] md:h-[500px] object-cover rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-8">
              {/* Left Sidebar - Lead Generation */}
              <div className="lg:col-span-2">
                <div className="space-y-6 sticky top-32">
                  {/* Webinaire Gratuit */}
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-5 rounded-xl border border-blue-200">
                    <div className="text-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                        🎯
                      </div>
                      <h4 className="font-bold text-sm mb-2">Webinaire Live</h4>
                      <p className="text-xs text-gray-600 mb-3">
                        "FinTech Africa 2025: Opportunités"
                      </p>
                      <p className="text-xs font-bold text-blue-600 mb-3">
                        🔴 LIVE Mercredi 20h
                      </p>
                      <Button className="w-full bg-blue-600 text-white text-xs py-2">
                        Réserver ma Place
                      </Button>
                    </div>
                  </div>

                  {/* Étude Exclusive */}
                  <div className="bg-gradient-to-br from-orange-50 to-red-50 p-5 rounded-xl border border-orange-200">
                    <div className="text-center">
                      <div className="w-10 h-10 bg-orange-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                        📊
                      </div>
                      <h4 className="font-bold text-sm mb-2">Étude Exclusive</h4>
                      <p className="text-xs text-gray-600 mb-3">
                        "État du Mobile Money Sénégal 2025"
                      </p>
                      <Button className="w-full bg-orange-600 text-white text-xs py-2">
                        Télécharger Gratuit
                      </Button>
                      <p className="text-xs text-gray-500 mt-2">
                        📈 +500 experts l'ont déjà
                      </p>
                    </div>
                  </div>

                  {/* Social Proof En Temps Réel */}
                  <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
                        <span className="text-xs font-medium">En direct</span>
                      </div>
                      <p className="text-xs text-gray-600">
                        <span className="font-bold text-green-600">23 personnes</span><br/>
                        lisent cet article maintenant
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Share Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-32 flex lg:flex-col gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLike}
                    className={`${liked ? 'bg-red-50 border-red-200 text-red-600' : ''}`}
                  >
                    <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
                    <span className="ml-1 hidden sm:inline">{article.like_count}</span>
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setBookmarked(!bookmarked)}
                    className={`${bookmarked ? 'bg-blue-50 border-blue-200 text-blue-600' : ''}`}
                  >
                    <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare('twitter')}
                  >
                    <Twitter className="w-4 h-4" />
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare('linkedin')}
                  >
                    <Linkedin className="w-4 h-4" />
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare('facebook')}
                  >
                    <Facebook className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Article Content */}
              <div className="lg:col-span-6">
                {/* Progress Bar */}
                <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
                  <div className="h-full bg-gradient-to-r from-senepay-orange to-senepay-gold transition-all duration-300" style={{width: '45%'}}></div>
                </div>
                <BlogContent content={article.content} />
                
                {/* Bannière Intermédiaire */}
                <div className="my-12 p-6 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl text-white text-center">
                  <h3 className="text-xl font-bold mb-2">🚀 Calculateur ROI SenePay</h3>
                  <p className="text-sm opacity-90 mb-4">
                    Découvrez combien vous pourriez économiser avec SenePay
                  </p>
                  <Button className="bg-white text-indigo-600 hover:bg-gray-100 font-medium">
                    Calculer mes Économies
                  </Button>
                </div>
                
                {/* Témoignage Client */}
                <div className="my-12 p-6 bg-green-50 border-l-4 border-green-500 rounded-r-xl">
                  <div className="flex items-start space-x-4">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=60&h=60"
                      alt="Amadou Diop"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-gray-800 italic mb-2">
                        "Depuis que j'utilise SenePay, mes revenus ont augmenté de 40%. 
                        L'intégration a été d'une simplicité déconcertante !"
                      </p>
                      <p className="text-sm font-medium text-green-700">
                        - Amadou Diop, CEO TechStore Dakar
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Author Bio Section */}
                <div className="mt-16 p-8 bg-gradient-to-br from-senepay-orange/5 to-senepay-gold/5 rounded-2xl border-l-4 border-senepay-orange">
                  <div className="flex items-start space-x-6">
                    <img
                      src="/lovable-uploads/88dbce95-d909-4dce-83ae-d7b6b87eedfd.png"
                      alt="Dominiqk Mendy"
                      className="w-20 h-20 rounded-full border-4 border-white shadow-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-senepay-orange to-senepay-gold bg-clip-text text-transparent mb-2">
                        Dominiqk Mendy
                      </h3>
                      <p className="text-lg font-semibold text-gray-800 mb-3">
                        Expert en Transformation Digitale | Consultant International en Innovation Numérique
                      </p>
                      <p className="text-gray-600 leading-relaxed">
                        Pionnier de la révolution FinTech en Afrique de l'Ouest, Dominiqk accompagne les entreprises 
                        dans leur transformation digitale depuis plus de 10 ans. Créateur de SenePay, il œuvre pour 
                        l'inclusion financière et la souveraineté numérique africaine.
                      </p>
                      <div className="flex items-center mt-4 space-x-4">
                        <Badge className="bg-senepay-orange text-white">🚀 Fondateur SenePay</Badge>
                        <Badge className="bg-senepay-gold text-white">🌍 Vision Panafricaine</Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-3">
                    {article.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-700">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* CTA Monetization */}
                {article.monetization_cta && Object.keys(article.monetization_cta).length > 0 && (
                  <div className="mt-12 p-8 bg-gradient-to-r from-senepay-orange to-senepay-gold rounded-2xl text-white">
                    <h3 className="text-2xl font-bold mb-4">Prêt à Révolutionner Vos Paiements ? 🚀</h3>
                    <p className="text-lg mb-6 opacity-90">
                      Rejoignez les 500+ marchands qui font confiance à SenePay pour leurs paiements digitaux.
                    </p>
                    <Link to="/auth">
                      <Button className="bg-white text-senepay-orange hover:bg-gray-100 font-medium">
                        Commencer Gratuitement
                      </Button>
                    </Link>
                  </div>
                )}
              </div>

              {/* Right Sidebar - Monetization */}
              <div className="lg:col-span-3">
                <div className="space-y-8">
                  {/* Newsletter Premium */}
                  <div className="bg-gradient-to-br from-senepay-orange/10 to-senepay-gold/10 p-6 rounded-xl border border-senepay-orange/20 sticky top-32">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-senepay-orange to-senepay-gold rounded-full mx-auto mb-4 flex items-center justify-center">
                        📧
                      </div>
                      <h3 className="font-bold text-lg mb-2">Newsletter Premium</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Recevez les insights exclusifs FinTech chaque semaine 
                      </p>
                      <div className="space-y-3">
                        <input 
                          type="email" 
                          placeholder="votre@email.com"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-senepay-orange"
                        />
                        <Button className="w-full bg-gradient-to-r from-senepay-orange to-senepay-gold text-white text-sm">
                          S'abonner Gratuitement
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        ✅ +2,500 experts nous font confiance
                      </p>
                    </div>
                  </div>

                  {/* Guide Gratuit */}
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                        📚
                      </div>
                      <h3 className="font-bold text-lg mb-2">Guide Gratuit</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        "Intégrer les Paiements Mobile au Sénégal"
                      </p>
                      <Button className="w-full bg-blue-600 text-white text-sm hover:bg-blue-700">
                        Télécharger PDF
                      </Button>
                      <p className="text-xs text-gray-500 mt-2">
                        ⭐ 4.9/5 - 1,200+ téléchargements
                      </p>
                    </div>
                  </div>

                  {/* Consultation Gratuite */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                        💬
                      </div>
                      <h3 className="font-bold text-lg mb-2">Consultation Gratuite</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        30 min avec Dominiqk Mendy
                      </p>
                      <Button className="w-full bg-green-600 text-white text-sm hover:bg-green-700">
                        Réserver Créneaux
                      </Button>
                      <p className="text-xs text-gray-500 mt-2">
                        🔥 Plus que 3 créneaux cette semaine
                      </p>
                    </div>
                  </div>

                  {/* Formation Payante */}
                  <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-xl border border-purple-200">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                        🎓
                      </div>
                      <h3 className="font-bold text-lg mb-2">Formation Premium</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        "Créer sa FinTech en Afrique"
                      </p>
                      <div className="text-lg font-bold text-purple-600 mb-4">
                        <span className="text-sm line-through text-gray-400">299€</span> 199€
                      </div>
                      <Button className="w-full bg-purple-600 text-white text-sm hover:bg-purple-700">
                        Accéder à la Formation
                      </Button>
                      <p className="text-xs text-gray-500 mt-2">
                        ⏰ Offre limitée - 72h restantes
                      </p>
                    </div>
                  </div>

                  {/* Publicité Native */}
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                    <div className="text-center">
                      <p className="text-xs text-gray-400 mb-2">SPONSORISÉ</p>
                      <img 
                        src="https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&q=80&w=200&h=100"
                        alt="Fintech Tools"
                        className="w-full h-20 object-cover rounded-lg mb-3"
                      />
                      <h3 className="font-bold text-sm mb-2">Outils FinTech Essentiels</h3>
                      <p className="text-xs text-gray-600 mb-3">
                        Les meilleurs outils pour entrepreneurs africains
                      </p>
                      <Button variant="outline" className="w-full text-xs">
                        Découvrir
                      </Button>
                    </div>
                  </div>

                  {/* Articles Populaires */}
                  <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <h3 className="font-bold text-lg mb-4">📈 Articles Populaires</h3>
                    <div className="space-y-3">
                      {['Wave vs Orange Money: Comparatif 2025', 'IA et FinTech: L\'Avenir du Sénégal', 'Startup FinTech: Guide Complet'].map((title, index) => (
                        <div key={index} className="pb-3 border-b border-gray-100 last:border-b-0">
                          <h4 className="text-sm font-medium text-gray-900 hover:text-senepay-orange cursor-pointer transition-colors">
                            {title}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">{1200 + index * 300} vues</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="sticky top-32 space-y-8">
                  {/* Newsletter */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Newsletter FinTech 📧</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Analyses exclusives et insights panafricains chaque semaine.
                    </p>
                    <Button className="w-full btn-senepay">
                      S'abonner
                    </Button>
                  </div>

                  {/* Related Articles */}
                  {relatedArticles.length > 0 && (
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Articles Similaires</h3>
                      <div className="space-y-4">
                        {relatedArticles.map((relatedArticle) => (
                          <Link key={relatedArticle.id} to={`/blog/${relatedArticle.slug}`}>
                            <div className="group cursor-pointer">
                              <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-shadow">
                                <h4 className="font-semibold text-gray-900 group-hover:text-senepay-orange transition-colors line-clamp-2 mb-2">
                                  {relatedArticle.title}
                                </h4>
                                <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                                  {relatedArticle.excerpt}
                                </p>
                                <div className="flex items-center text-xs text-gray-500">
                                  <Clock className="w-3 h-3 mr-1" />
                                  {relatedArticle.reading_time} min
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPost;