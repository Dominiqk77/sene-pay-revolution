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
  const [currentViews, setCurrentViews] = useState(0);
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
        
        // Generate dynamic view count between 790 and 5000
        const baseViews = Math.floor(Math.random() * (5000 - 790 + 1)) + 790;
        const timeBonus = Math.floor(Date.now() / (30 * 60 * 1000)) % 100; // Grows every 30 minutes
        const dynamicViews = baseViews + timeBonus;
        setCurrentViews(dynamicViews);
        
        // Update view count in database
        await supabase
          .from('blog_articles')
          .update({ view_count: dynamicViews })
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
                    src="/lovable-uploads/856c5d11-f4a7-40b5-8400-a063597b67d3.png"
                    alt="SenePay Team"
                    className="w-10 h-10 rounded-full mr-3 object-cover"
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
                  {currentViews.toLocaleString()} vues
                </span>
              </div>
            </div>

            {/* Featured Image */}
            <div className="mb-12">
              <img
                src="/src/assets/african-fintech-hero.jpg"
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
              <div className="lg:col-span-8">
                <BlogContent content={article.content} />
                
                {/* Author Bio Section */}
                <div className="mt-16 p-8 bg-gradient-to-br from-senepay-orange/5 to-senepay-gold/5 rounded-2xl border-l-4 border-senepay-orange">
                  <div className="flex items-start space-x-6">
                    <img
                      src="/lovable-uploads/73c4c6f7-047b-4539-af47-a4a9f290fa73.png"
                      alt="SenePay Team"
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

              {/* Right Sidebar */}
              <div className="lg:col-span-3">
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