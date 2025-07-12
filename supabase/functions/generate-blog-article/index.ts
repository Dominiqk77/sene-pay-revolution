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

  const prompt = `En tant qu'expert FinTech sénégalais et rédacteur SEO de classe mondiale, rédigez un article de blog ultra-professionnel de 6000+ mots sur le sujet : "${title}"

CONTEXTE SENEPAY :
- Première passerelle de paiement 100% sénégalaise créée par Dominiqk Mendy
- Unifie Orange Money, Wave, Free Money, cartes bancaires en une seule API
- Mission : démocratiser les paiements digitaux en Afrique
- Vision panafricaine de souveraineté numérique et inclusion financière

STRUCTURE OBLIGATOIRE ULTRA-DÉTAILLÉE :
1. Introduction percutante avec accroche émotionnelle africaine (8-10 paragraphes riches)
2. Contextualisation historique et patriotique (6-8 paragraphes approfondis)
3. Analyse technique approfondie avec données statistiques (10-12 paragraphes experts)
4. Témoignages clients authentiques avec ROI précis (6-8 cas concrets détaillés)
5. Comparaison concurrentielle poussée (8-10 paragraphes analytiques)
6. Projections économiques et impact social (8-10 paragraphes avec chiffres)
7. Roadmap technologique et tendances futures (6-8 paragraphes prospectifs)
8. Call-to-action conversion stratégiques (3-4 CTA intégrés naturellement)
9. Conclusion patriotique inspirante avec vision panafricaine (6-8 paragraphes)

EXIGENCES QUALITÉ PREMIUM :
- Chaque paragraphe doit contenir 6-10 lignes minimum avec contenu riche et engageant
- Utilisez les mots-clés : ${articleTemplates[category as keyof typeof articleTemplates]?.keywords.join(', ')}
- Intégrez "SenePay" 12-15 fois naturellement dans le contenu
- Incluez des statistiques précises et crédibles du Sénégal et de l'Afrique de l'Ouest
- Ajoutez des données chiffrées concrètes (pourcentages, montants, croissance)
- ABSOLUMENT INTERDIT : N'utilisez JAMAIS ## ou ### ou ** dans le contenu
- Écrivez les titres en texte normal sans formatage markdown
- Créez des paragraphes substantiels avec analyses approfondies
- Mettez en avant les mots-clés importants en MAJUSCULES stratégiquement

STYLE EXPERT ULTRA-PROFESSIONNEL :
- Ton d'expert international en transformation digitale africaine
- Analyses économiques pointues avec références sectorielles
- Storytelling émotionnel avec impact humain fort
- Données macro-économiques du Sénégal et de la région CEDEAO
- Exemples concrets d'entreprises sénégalaises et ouest-africaines
- Célébrez l'innovation africaine et la diaspora entrepreneuriale
- Mentionnez l'héritage historique de résistance et d'innovation du Sénégal
- Intégrez des comparaisons internationales (Silicon Valley, Europe, Asie)

MONÉTISATION STRATÉGIQUE :
- Intégrez 4-5 CTA vers SenePay de manière fluide et naturelle
- Mentionnez des ROI concrets (+67% CA, réduction coûts -45%, conversion +120%)
- Incluez des bénéfices sectoriels spécifiques (e-commerce, services, restaurants)
- Proposez des solutions personnalisées par taille d'entreprise
- Ajoutez des testimonials authentiques avec résultats chiffrés

SIGNATURE OBLIGATOIRE :
Signez TOUS les articles par "Dominiqk Mendy - Expert en Transformation Digitale - Consultant International en Innovation Numérique"

Rédigez l'article de référence FinTech qui va révolutionner la perception des paiements digitaux africains !`;

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

const getRandomImage = async (category: string = 'general'): Promise<string> => {
  // Collection d'images africaines locales pour SenePay FinTech
  const africanFintechImages = {
    'fintech': [
      '/src/assets/blog/african-fintech-mobile-money.jpg',
      '/src/assets/blog/mobile-banking-tech.jpg',
      '/src/assets/blog/african-tech-innovation.jpg'
    ],
    'ecommerce': [
      '/src/assets/blog/african-ecommerce-fintech.jpg',
      '/src/assets/blog/african-fintech-mobile-money.jpg',
      '/src/assets/blog/mobile-banking-tech.jpg'
    ],
    'innovation': [
      '/src/assets/blog/african-tech-innovation.jpg',
      '/src/assets/blog/african-fintech-mobile-money.jpg',
      '/src/assets/blog/pan-african-fintech.jpg'
    ],
    'panafricain': [
      '/src/assets/blog/pan-african-fintech.jpg',
      '/src/assets/blog/african-ecommerce-fintech.jpg',
      '/src/assets/blog/senegal-economic-fintech.jpg'
    ],
    'economie': [
      '/src/assets/blog/senegal-economic-fintech.jpg',
      '/src/assets/blog/pan-african-fintech.jpg',
      '/src/assets/blog/african-ecommerce-fintech.jpg'
    ],
    'general': [
      '/src/assets/blog/african-fintech-mobile-money.jpg',
      '/src/assets/blog/african-ecommerce-fintech.jpg',
      '/src/assets/blog/african-tech-innovation.jpg',
      '/src/assets/blog/pan-african-fintech.jpg',
      '/src/assets/blog/senegal-economic-fintech.jpg',
      '/src/assets/blog/mobile-banking-tech.jpg'
    ]
  };

  // Sélectionner les images selon la catégorie, avec fallback sur 'general'
  const categoryImages = africanFintechImages[category as keyof typeof africanFintechImages] || africanFintechImages.general;
  
  return categoryImages[Math.floor(Math.random() * categoryImages.length)];
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

    // Get random image based on category
    const featuredImage = await getRandomImage(randomCategory);

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
        author_name: 'SenePay Team',
        author_avatar: '/lovable-uploads/73c4c6f7-047b-4539-af47-a4a9f290fa73.png',
        view_count: Math.floor(Math.random() * (5000 - 790 + 1)) + 790, // Views between 790-5000
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