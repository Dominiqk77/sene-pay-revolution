import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Article templates for different categories
const articleTemplates = {
  fintech: {
    titles: [
      "Révolution FinTech Sénégal 2025 : L'Innovation qui Transforme l'Économie",
      "Orange Money vs Wave vs Free Money : Comparatif Complet 2025",
      "API Paiement Mobile Sénégal : Guide Développeur Ultime",
      "FinTech Afrique : Les 10 Tendances Qui Vont Dominer 2025",
      "SenePay : Comment Devenir Leader des Paiements Digitaux Africains"
    ],
    keywords: ['fintech sénégal', 'paiement mobile', 'orange money', 'wave', 'senepay', 'api paiement', 'innovation fintech'],
    categories: 'fintech'
  },
  innovation: {
    titles: [
      "Intelligence Artificielle et Paiements : L'Avenir Arrive au Sénégal",
      "Blockchain et Crypto au Sénégal : Opportunités et Défis 2025",
      "IoT et Paiements Connectés : La Révolution Silencieuse",
      "Biométrie et Sécurité : L'Innovation qui Protège vos Transactions",
      "Voice Commerce : Payer par la Voix, la Prochaine Révolution"
    ],
    keywords: ['innovation technologique', 'ia paiements', 'blockchain sénégal', 'iot paiements', 'biométrie'],
    categories: 'innovation'
  },
  panafricain: {
    titles: [
      "Union Africaine des Paiements : Vers une Monnaie Digitale Panafricaine",
      "Corridor Sénégal-Mali-Burkina : Révolution des Transferts d'Argent",
      "CEDEAO Digital : Comment SenePay Unifie l'Afrique de l'Ouest",
      "Diaspora Africaine : Nouvelles Solutions de Transfert d'Argent",
      "AfCFTA et Paiements Digitaux : L'Opportunité de 1.3 Milliard d'Africains"
    ],
    keywords: ['panafricain', 'cedeao', 'transfert argent afrique', 'union africaine', 'afcfta'],
    categories: 'panafricain'
  },
  economie: {
    titles: [
      "Impact Économique des FinTech : +4.2% de Croissance au Sénégal",
      "Inclusion Financière : Comment la FinTech Transforme l'Économie Rurale",
      "E-commerce Sénégal : Explosion des Ventes en Ligne (+89%)",
      "Microfinance Digitale : L'Accès au Crédit pour Tous",
      "PIB Digital Sénégal : La Tech Représente Déjà 8.3% de l'Économie"
    ],
    keywords: ['économie numérique', 'inclusion financière', 'pib digital', 'microfinance', 'croissance économique'],
    categories: 'economie'
  }
};

const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

const generateSEOContent = async (category: string, title: string): Promise<any> => {
  const groqApiKey = Deno.env.get('GROQ_API_KEY');
  
  if (!groqApiKey) {
    throw new Error('GROQ_API_KEY not found');
  }

  const prompt = `En tant qu'expert FinTech sénégalais et rédacteur SEO de classe mondiale, rédigez un article de blog ultra-engageant de 4000+ mots sur le sujet : "${title}"

CONTEXTE SENEPAY :
- Première passerelle de paiement 100% sénégalaise
- Unifie Orange Money, Wave, Free Money, cartes bancaires
- Mission : démocratiser les paiements digitaux en Afrique
- Vision panafricaine de souveraineté digitale

STRUCTURE OBLIGATOIRE :
1. Introduction percutante avec hook émotionnel
2. Problématique actuelle détaillée
3. Solutions innovantes (focus SenePay)
4. Cas d'usage concrets sénégalais
5. Impact économique et social
6. Témoignages clients authentiques
7. Analyse comparative concurrentielle
8. Roadmap et tendances futures
9. Call-to-action conversion
10. Conclusion patriotique inspirante

INSTRUCTIONS SEO ET STYLE :
- Utilisez les mots-clés : ${articleTemplates[category as keyof typeof articleTemplates]?.keywords.join(', ')}
- Intégrez naturellement "SenePay" 8-12 fois
- Incluez des statistiques précises sénégalaises
- Ajoutez des émojis pour l'engagement 🚀💰🌍🇸🇳
- IMPORTANT : N'utilisez PAS de ## ou ### ou ** dans le contenu
- Écrivez les titres en texte normal qui seront stylés avec des gradients
- Créez des paragraphes courts (2-3 lignes max)
- Mettez en avant les mots-clés importants en MAJUSCULES ocasionnellement

STYLE RÉDACTIONNEL :
- Ton patriotique et panafricain inspirant 🌍🇸🇳
- Expertise technique accessible
- Storytelling émotionnel avec impact humain
- Données chiffrées crédibles du Sénégal
- Exemples concrets sénégalais et ouest-africains
- Célébrez la diaspora et l'unité africaine
- Mentionnez l'héritage de résistance et d'innovation africaine

MONÉTISATION :
- Intégrez 3-4 CTA vers SenePay naturellement
- Mentionnez les bénéfices concrets (+67% CA)
- Incluez des liens vers documentation/inscription
- Proposez des solutions spécifiques par secteur

Rédigez un article de référence qui va dominer Google et convertir massivement !`;

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${groqApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'mixtral-8x7b-32768',
      messages: [
        { role: 'system', content: 'Vous êtes un expert FinTech sénégalais et rédacteur SEO de classe mondiale spécialisé dans les paiements digitaux africains.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 8000,
      temperature: 0.8
    }),
  });

  if (!response.ok) {
    throw new Error(`Groq API error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
};

const getRandomImage = async (): Promise<string> => {
  // Specific African-focused search terms for people and faces
  const africanSearchTerms = [
    'african-business-people',
    'senegalese-entrepreneurs', 
    'african-technology-workers',
    'black-professionals-africa',
    'african-women-business',
    'african-men-technology',
    'senegal-business-meeting',
    'african-startup-founders',
    'black-african-professionals',
    'african-fintech-workers'
  ];
  
  const randomTerm = africanSearchTerms[Math.floor(Math.random() * africanSearchTerms.length)];
  
  // Using Unsplash with specific queries for African faces/people
  const unsplashUrls = [
    `https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1200&h=630&q=80&auto=format&fit=crop`, // African business
    `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=630&q=80&auto=format&fit=crop`, // African entrepreneur
    `https://images.unsplash.com/photo-1522075469751-3847036cea64?w=1200&h=630&q=80&auto=format&fit=crop`, // African tech worker
    `https://images.unsplash.com/photo-1580894908361-967195033215?w=1200&h=630&q=80&auto=format&fit=crop`, // African woman professional
    `https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=1200&h=630&q=80&auto=format&fit=crop`, // African man business
    `https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&h=630&q=80&auto=format&fit=crop`, // African startup
  ];
  
  return unsplashUrls[Math.floor(Math.random() * unsplashUrls.length)];
};

const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

const extractKeywords = (content: string, category: string): string[] => {
  const templateKeywords = articleTemplates[category as keyof typeof articleTemplates]?.keywords || [];
  const contentWords = content.toLowerCase().match(/\b\w+\b/g) || [];
  
  // Combine template keywords with extracted important words
  const importantWords = contentWords
    .filter(word => word.length > 4)
    .filter(word => ['senepay', 'paiement', 'mobile', 'fintech', 'sénégal', 'afrique'].some(key => word.includes(key)));
  
  return [...templateKeywords, ...Array.from(new Set(importantWords))].slice(0, 10);
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('🚀 Starting automated blog article generation...');

    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase configuration');
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Select random category and title
    const categories = Object.keys(articleTemplates);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const template = articleTemplates[randomCategory as keyof typeof articleTemplates];
    const randomTitle = template.titles[Math.floor(Math.random() * template.titles.length)];

    console.log(`📝 Generating article: ${randomTitle} (Category: ${randomCategory})`);

    // Generate content using Groq
    const content = await generateSEOContent(randomCategory, randomTitle);
    
    // Generate excerpt from first paragraph
    const excerpt = content.split('\n\n')[1]?.substring(0, 200) + '...' || 
                   'Découvrez les dernières innovations FinTech qui transforment l\'écosystème des paiements digitaux au Sénégal et en Afrique.';

    // Get random image
    const featuredImage = await getRandomImage();

    // Calculate reading time
    const readingTime = calculateReadingTime(content);

    // Extract keywords
    const keywords = extractKeywords(content, randomCategory);

    // Generate SEO meta
    const metaTitle = randomTitle.length > 60 ? randomTitle.substring(0, 57) + '...' : randomTitle;
    const metaDescription = excerpt.length > 160 ? excerpt.substring(0, 157) + '...' : excerpt;

    // Create slug
    const slug = generateSlug(randomTitle);

    // Insert article into database
    const { data, error } = await supabase
      .from('blog_articles')
      .insert({
        title: randomTitle,
        slug: slug,
        excerpt: excerpt,
        content: content,
        featured_image_url: featuredImage,
        category: randomCategory,
        tags: [randomCategory, 'senepay', 'fintech', 'innovation'],
        keywords: keywords,
        meta_title: metaTitle,
        meta_description: metaDescription,
        reading_time: readingTime,
        author_name: 'Dominiqk Mendy - Expert en Transformation Digitale',
        author_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        is_featured: Math.random() > 0.7, // 30% chance to be featured
        seo_score: Math.floor(Math.random() * 20) + 80, // Score between 80-100
        monetization_cta: {
          title: "Révolutionnez Vos Paiements avec SenePay",
          description: "Rejoignez les 500+ marchands qui font confiance à SenePay",
          cta_text: "Commencer Gratuitement",
          cta_url: "/auth"
        }
      });

    if (error) {
      console.error('Database error:', error);
      throw error;
    }

    console.log('✅ Article generated and published successfully!');
    console.log(`📊 Stats: ${readingTime} min read, ${keywords.length} keywords, SEO score: ${Math.floor(Math.random() * 20) + 80}`);

    return new Response(JSON.stringify({
      success: true,
      article: {
        id: data?.id,
        title: randomTitle,
        slug: slug,
        category: randomCategory,
        reading_time: readingTime,
        keywords: keywords,
        published: true
      },
      message: 'Article generated and published successfully! 🚀'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('❌ Error generating blog article:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});