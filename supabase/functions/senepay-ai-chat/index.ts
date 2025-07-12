import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const groqApiKey = Deno.env.get('GROQ_API_KEY');
const huggingFaceApiKey = Deno.env.get('HUGGINGFACE_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { message, sessionId, userId, context } = await req.json();

    console.log('💬 Chat request received:', { message, sessionId, userId, context });

    // ÉTAPE 1: Détection et qualification de lead intelligent
    const userProfile = await detectUserProfile(supabase, userId);
    const messageIntent = await analyzeMessageIntent(message);
    const leadScore = await calculateLeadScore(message, userProfile, messageIntent);
    
    // ÉTAPE 2: Créer ou mettre à jour le lead avec scoring automatique
    const leadData = await createOrUpdateLead(supabase, sessionId, userId, userProfile, messageIntent, leadScore, context);
    
    // ÉTAPE 3: Recherche intelligente dans la base de connaissances
    const relevantKnowledge = await searchKnowledgeBase(supabase, message, messageIntent);
    
    // ÉTAPE 4: Obtenir les offres contextuelles personnalisées
    const contextualOffers = await getContextualOffers(supabase, userProfile, messageIntent);
    
    // ÉTAPE 5: Générer une réponse IA optimisée pour la conversion
    const aiResponse = await generateConversionOptimizedAIResponse(
      message, userProfile, relevantKnowledge, context, messageIntent, leadData, contextualOffers
    );
    
    // ÉTAPE 6: Programmer les actions automatisées si lead qualifié
    if (leadData.qualification_status === 'qualified' || leadData.qualification_status === 'hot') {
      await scheduleAutomatedActions(supabase, leadData.id, userProfile, messageIntent);
    }
    
    // ÉTAPE 7: Tracking des conversions
    await trackConversionEvent(supabase, leadData.id, sessionId, 'chat_interaction', messageIntent);
    
    // ÉTAPE 8: Démarrer séquence de nurturing si applicable
    await initializeNurturingSequence(supabase, leadData.id, userProfile, messageIntent);
    
    // ÉTAPE 9: Sauvegarder la conversation
    await saveConversation(supabase, sessionId, userId, message, aiResponse, context);

    console.log('🚀 Système de génération de leads activé:', {
      leadScore: leadData.lead_score,
      qualification: leadData.qualification_status,
      revenue_potential: leadData.estimated_revenue
    });

    return new Response(JSON.stringify({ 
      response: aiResponse,
      suggestions: generateSmartSuggestions(messageIntent, userProfile, leadData),
      context: await updateContext(context, message, aiResponse),
      leadData: {
        score: leadData.lead_score,
        qualification: leadData.qualification_status,
        offers: contextualOffers
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in senepay-ai-chat function:', error);
    return new Response(JSON.stringify({ 
      error: 'Une erreur est survenue. Veuillez réessayer.',
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function detectUserProfile(supabase: any, userId: string | null) {
  if (!userId) {
    return { type: 'anonymous', experience: 'beginner' };
  }

  try {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role, company_name, created_at')
      .eq('id', userId)
      .single();

    const { data: merchantAccount } = await supabase
      .from('merchant_accounts')
      .select('total_transactions, created_at')
      .eq('user_id', userId)
      .single();

    const experience = merchantAccount?.total_transactions > 100 ? 'advanced' : 
                      merchantAccount?.total_transactions > 10 ? 'intermediate' : 'beginner';

    return {
      type: profile?.role || 'merchant',
      experience,
      hasAccount: !!merchantAccount,
      companyName: profile?.company_name
    };
  } catch (error) {
    console.error('Error detecting user profile:', error);
    return { type: 'merchant', experience: 'beginner' };
  }
}

async function analyzeMessageIntent(message: string) {
  const lowerMessage = message.toLowerCase();
  
  // Intent detection based on keywords
  if (lowerMessage.includes('intégr') || lowerMessage.includes('api') || lowerMessage.includes('sdk')) {
    return 'integration';
  }
  if (lowerMessage.includes('erreur') || lowerMessage.includes('problème') || lowerMessage.includes('bug')) {
    return 'troubleshooting';
  }
  if (lowerMessage.includes('tarif') || lowerMessage.includes('prix') || lowerMessage.includes('coût')) {
    return 'pricing';
  }
  if (lowerMessage.includes('orange money') || lowerMessage.includes('wave') || lowerMessage.includes('free money')) {
    return 'payment_methods';
  }
  if (lowerMessage.includes('webhook') || lowerMessage.includes('callback')) {
    return 'webhooks';
  }
  if (lowerMessage.includes('documentation') || lowerMessage.includes('guide')) {
    return 'documentation';
  }
  
  return 'general';
}

async function searchKnowledgeBase(supabase: any, message: string, intent: string) {
  try {
    // First, try to find exact matches based on intent and category
    const { data: knowledge } = await supabase
      .from('chat_knowledge_base')
      .select('content, content_type, category, metadata')
      .eq('category', intent)
      .limit(3);

    if (knowledge && knowledge.length > 0) {
      return knowledge;
    }

    // Fallback to general knowledge
    const { data: generalKnowledge } = await supabase
      .from('chat_knowledge_base')
      .select('content, content_type, category, metadata')
      .limit(5);

    return generalKnowledge || [];
  } catch (error) {
    console.error('Error searching knowledge base:', error);
    return [];
  }
}

async function generateEnhancedAIResponse(message: string, userProfile: any, knowledge: any[], context: any, intent: string) {
  // Try Groq first for ultra-fast, free AI responses
  if (groqApiKey) {
    try {
      return await generateGroqResponse(message, userProfile, knowledge, context, intent);
    } catch (error) {
      console.error('Groq API error, falling back to Hugging Face:', error);
    }
  }

  // Try Hugging Face as second option (also free)
  if (huggingFaceApiKey) {
    try {
      return await generateHuggingFaceResponse(message, userProfile, knowledge, context, intent);
    } catch (error) {
      console.error('Hugging Face API error, falling back to OpenAI:', error);
    }
  }

  // Fallback to OpenAI with enhanced prompting
  if (openAIApiKey) {
    try {
      return await generateEnhancedOpenAIResponse(message, userProfile, knowledge, context, intent);
    } catch (error) {
      console.error('OpenAI API error, falling back to static:', error);
    }
  }

  // Final fallback to intelligent static responses
  return getIntelligentStaticResponse(message, userProfile, intent, knowledge);
}

async function generateGroqResponse(message: string, userProfile: any, knowledge: any[], context: any, intent: string) {
  const systemPrompt = buildEnhancedSystemPrompt(userProfile, knowledge, intent);
  const contextualPrompt = buildEnhancedPrompt(message, userProfile, knowledge, intent);

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${groqApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama-3.1-70b-versatile', // Modèle gratuit ultra-rapide
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: contextualPrompt }
      ],
      temperature: 0.3,
      max_tokens: 1000,
      top_p: 0.9,
      stream: false
    }),
  });

  const data = await response.json();
  return data.choices[0].message.content;
}

async function generateHuggingFaceResponse(message: string, userProfile: any, knowledge: any[], context: any, intent: string) {
  const systemPrompt = buildEnhancedSystemPrompt(userProfile, knowledge, intent);
  const contextualPrompt = buildEnhancedPrompt(message, userProfile, knowledge, intent);

  const fullPrompt = `${systemPrompt}\n\nUtilisateur: ${contextualPrompt}\n\nAssistant:`;

  const response = await fetch('https://api-inference.huggingface.co/models/microsoft/DialoGPT-large', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${huggingFaceApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      inputs: fullPrompt,
      parameters: {
        max_new_tokens: 800,
        temperature: 0.4,
        top_p: 0.9,
        return_full_text: false
      }
    }),
  });

  const data = await response.json();
  return data[0]?.generated_text || getIntelligentStaticResponse(message, userProfile, intent, knowledge);
}

async function generateEnhancedOpenAIResponse(message: string, userProfile: any, knowledge: any[], context: any, intent: string) {
  const systemPrompt = buildEnhancedSystemPrompt(userProfile, knowledge, intent);
  const contextualMessage = buildEnhancedPrompt(message, userProfile, knowledge, intent);

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openAIApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: contextualMessage }
      ],
      temperature: 0.4,
      max_tokens: 1000,
      top_p: 0.9,
      frequency_penalty: 0.5,
      presence_penalty: 0.3,
    }),
  });

  const data = await response.json();
  return data.choices[0].message.content;
}

function buildEnhancedSystemPrompt(userProfile: any, knowledge: any[], intent: string) {
  const knowledgeContext = knowledge.map(k => k.content).join('\n\n');
  
  const personalizedInstructions = {
    beginner: "Explique de manière très simple, étape par étape, avec des exemples concrets",
    intermediate: "Donne des détails techniques appropriés avec des exemples de code",
    advanced: "Sois technique et précis, focus sur l'optimisation et les bonnes pratiques"
  };

  const intentInstructions = {
    integration: "Focus sur le code, les APIs et les guides d'implémentation",
    troubleshooting: "Identifie la cause, donne une solution claire et des vérifications",
    pricing: "Détaille les coûts, compare avec la concurrence, calcule des exemples",
    payment_methods: "Explique les spécificités techniques et business de chaque méthode",
    webhooks: "Focus sécurité, configuration et gestion d'erreurs",
    documentation: "Fournis des liens précis et des exemples pratiques"
  };

  return `Tu es l'expert SenePay, assistant IA spécialisé dans les paiements mobiles africains.

PROFIL UTILISATEUR:
- Type: ${userProfile.type} (${userProfile.experience})
- Compte marchand: ${userProfile.hasAccount ? 'Actif' : 'Non configuré'}
- Entreprise: ${userProfile.companyName || 'Non renseignée'}

INSTRUCTION PERSONNALISÉE: ${personalizedInstructions[userProfile.experience] || personalizedInstructions.beginner}
FOCUS INTENTION: ${intentInstructions[intent] || 'Assistance générale complète'}

CONNAISSANCES SENEPAY:
${knowledgeContext}

DONNÉES CLÉS SENEPAY 2024:
- Mobile Money: Orange Money (8M users), Wave (2M users), Free Money, Wizall
- Tarifs compétitifs: 1.2% Mobile Money, 1.9% cartes bancaires
- Couverture: Sénégal (principal), Mali, Burkina Faso (expansion)
- API REST moderne, webhooks temps réel, SDKs multilingues
- Support: +221 77 656 40 42, support@senepay.com

STYLE DE RÉPONSE:
- Français professionnel mais accessible
- Émojis subtils (📱💳🚀⚡🔧)
- Code examples avec explications
- Liens vers docs officielles
- Call-to-action pertinents

CAPACITÉS:
✅ Intégrations techniques détaillées
✅ Diagnostic et résolution d'erreurs
✅ Calculs tarifaires personnalisés
✅ Génération de code sur mesure
✅ Recommandations business

INTERDICTIONS:
❌ Jamais révéler les clés API ou secrets
❌ Pas d'accès aux données privées clients
❌ Pas de modifications de comptes
❌ Pas de traitement de paiements réels`;
}

function buildEnhancedPrompt(message: string, userProfile: any, knowledge: any[], intent: string) {
  const contextElements = [];
  
  if (userProfile.hasAccount) {
    contextElements.push(`L'utilisateur a déjà un compte marchand SenePay`);
  } else {
    contextElements.push(`L'utilisateur découvre SenePay - guider vers l'inscription`);
  }

  if (userProfile.companyName) {
    contextElements.push(`Entreprise: ${userProfile.companyName}`);
  }

  const relevantKnowledge = knowledge.filter(k => 
    k.category === intent || 
    k.content.toLowerCase().includes(message.toLowerCase().split(' ')[0])
  );

  return `CONTEXTE UTILISATEUR: ${contextElements.join(', ')}

CONNAISSANCES PERTINENTES:
${relevantKnowledge.map(k => `- ${k.content_type}: ${k.content.substring(0, 200)}...`).join('\n')}

QUESTION: ${message}

Réponds de manière personnalisée selon le profil et l'intention détectée.`;
}

function getIntelligentStaticResponse(message: string, userProfile: any, intent: string, knowledge: any[]) {
  const lowerMessage = message.toLowerCase();
  const experience = userProfile.experience || 'beginner';
  
  // Réponses intelligentes basées sur l'intention et le profil
  const responses = {
    integration: {
      beginner: `🚀 **Guide d'intégration SenePay pour débutants**

Pour ${userProfile.companyName || 'votre entreprise'}, voici les étapes simples :

1. **Inscription gratuite** → [senepay.com/register](https://senepay.com/register)
2. **Récupérer vos clés API** (dashboard → Paramètres)
3. **Premier test en 5 minutes** :
\`\`\`javascript
// Installation simple
npm install senepay-sdk

// Premier paiement
const senepay = new SenePay('pk_test_...');
const payment = await senepay.payments.create({
  amount: 1000, // 1000 XOF
  currency: 'XOF',
  methods: ['orange_money', 'wave']
});
\`\`\`

💡 **Besoin d'aide ?** → Chat avec moi ou appelez +221 77 656 40 42`,

      intermediate: `⚡ **Intégration SenePay avancée**

Pour optimiser ${userProfile.companyName || 'votre intégration'} :

**APIs principales :**
- \`POST /payments\` - Créer un paiement
- \`GET /payments/{id}\` - Vérifier le statut
- \`POST /webhooks\` - Notifications temps réel

**Exemple production-ready :**
\`\`\`javascript
const payment = await senepay.payments.create({
  amount: 15000,
  currency: 'XOF',
  payment_methods: ['orange_money', 'wave'],
  customer: { phone: '+221771234567' },
  metadata: { order_id: 'CMD-123' },
  webhook_url: 'https://api.votresite.com/senepay/webhook'
});
\`\`\`

📊 **Tarifs** : 1.2% Mobile Money, 50% moins cher que la concurrence`,

      advanced: `🔧 **Architecture SenePay Enterprise**

**Optimisations pour ${userProfile.companyName || 'votre scale'} :**

\`\`\`typescript
// Configuration avancée avec retry et monitoring
const senePayClient = new SenePay({
  apiKey: process.env.SENEPAY_SECRET_KEY,
  timeout: 30000,
  retries: 3,
  webhookSecret: process.env.SENEPAY_WEBHOOK_SECRET
});

// Paiement avec escrow pour marketplace
const payment = await senePayClient.payments.create({
  amount: 50000,
  split_payment: {
    merchant_fee: 2000,
    platform_fee: 500,
    vendor_amount: 47500
  },
  webhook_url: 'https://api.votresite.com/webhook',
  idempotency_key: uuid()
});
\`\`\`

**Performance :** 99.9% uptime, <200ms response time`
    },

    pricing: {
      beginner: `💰 **Tarifs SenePay transparents**

**Pour ${userProfile.companyName || 'votre business'} :**
- 🏦 **Mobile Money** : 1.2% (Orange Money, Wave, etc.)
- 💳 **Cartes bancaires** : 1.9% (Visa, Mastercard)
- 🎯 **Aucun frais fixe** - Payez seulement quand vous vendez !

**Exemple de calcul :**
- Vente de 10,000 XOF → Frais = 120 XOF
- Vous recevez : 9,880 XOF

🎁 **Offre spéciale** : 100 premières transactions gratuites !`,
      
      intermediate: `📊 **Analyse tarifaire SenePay vs Concurrence**

**Votre économie potentielle :**
${userProfile.hasAccount ? '- Transactions actuelles analysées' : '- Estimation basée sur volume moyen'}

| Méthode | SenePay | Concurrents | Économie |
|---------|---------|-------------|----------|
| Orange Money | 1.2% | 2.8% | **57% moins cher** |
| Wave | 1.2% | 2.5% | **52% moins cher** |
| Cartes | 1.9% | 3.5% | **46% moins cher** |

💡 **ROI estimé** : ${userProfile.companyName || 'Votre entreprise'} économise ~40% sur les frais de transaction`,

      advanced: `💎 **Optimisation tarifaire Enterprise**

**Structure de pricing personnalisée pour ${userProfile.companyName || 'votre volume'} :**

\`\`\`json
{
  "tiers": {
    "starter": { "volume": "0-1M XOF/mois", "rate": "1.2%" },
    "business": { "volume": "1M-10M XOF/mois", "rate": "1.0%" },
    "enterprise": { "volume": "10M+ XOF/mois", "rate": "0.8%" }
  },
  "volume_discounts": {
    "high_frequency": "-0.1%",
    "recurring_payments": "-0.05%",
    "bulk_operations": "-0.15%"
  }
}
\`\`\`

📞 **Contact commercial** : +221 77 656 40 42 pour tarifs négociés`
    }
  };

  // Sélection intelligente de la réponse
  if (responses[intent] && responses[intent][experience]) {
    return responses[intent][experience];
  }

  // Réponse par défaut personnalisée
  const defaultResponse = `Bonjour ${userProfile.companyName ? `l'équipe de ${userProfile.companyName}` : ''} ! 👋

Je suis l'assistant IA de SenePay, spécialisé dans les paiements mobiles africains.

**Comment puis-je vous aider ?**
🔧 Intégration technique
💰 Tarifs et économies  
📱 Méthodes de paiement (Orange Money, Wave...)
🐛 Résolution de problèmes
📚 Documentation

**Votre profil :** ${userProfile.type} ${experience}
**Status :** ${userProfile.hasAccount ? 'Compte actif' : 'Nouveau sur SenePay'}

Posez-moi votre question spécifique ! 🚀`;

  return defaultResponse;
}

function generateSuggestions(intent: string, userProfile: any) {
  const suggestions = {
    integration: userProfile.experience === 'beginner' ? [
      "Guide d'installation étape par étape",
      "Premier paiement en 5 minutes",
      "Exemple de code simple"
    ] : [
      "Configuration webhooks avancée",
      "Optimisation performance API",
      "Gestion d'erreurs robuste"
    ],
    
    troubleshooting: [
      "Vérifier les logs d'API",
      "Tester en mode sandbox",
      "Diagnostiquer les timeouts"
    ],
    
    pricing: userProfile.hasAccount ? [
      "Calculer mes économies actuelles",
      "Optimiser ma structure tarifaire",
      "Négocier un tarif enterprise"
    ] : [
      "Comparer avec mes coûts actuels",
      "Estimer le ROI sur 1 an",
      "Voir la grille tarifaire complète"
    ],
    
    payment_methods: [
      "Intégrer Orange Money",
      "Configuration Wave",
      "Support multi-opérateurs"
    ],
    
    general: userProfile.hasAccount ? [
      "Optimiser mon intégration",
      "Nouvelles fonctionnalités",
      "Support technique prioritaire"
    ] : [
      "Créer mon compte marchand",
      "Guide de démarrage rapide",
      "Voir une démo personnalisée"
    ]
  };

  return suggestions[intent] || suggestions.general;
}

async function updateContext(context: any, message: string, response: string) {
  return {
    ...context,
    lastMessage: message,
    lastResponse: response,
    timestamp: new Date().toISOString()
  };
}

// ============= SYSTÈME AVANCÉ DE GÉNÉRATION DE LEADS ET REVENUS =============

async function calculateLeadScore(message: string, userProfile: any, intent: string) {
  let score = 0;
  
  // Scoring basé sur l'intention (0-30 points)
  const intentScores = {
    'integration': 25,
    'pricing': 20,
    'payment_methods': 15,
    'troubleshooting': 10,
    'webhooks': 15,
    'documentation': 5,
    'general': 5
  };
  score += intentScores[intent] || 5;
  
  // Scoring basé sur le profil utilisateur (0-25 points)
  if (userProfile.hasAccount) score += 10;
  if (userProfile.companyName) score += 8;
  if (userProfile.experience === 'advanced') score += 7;
  else if (userProfile.experience === 'intermediate') score += 5;
  
  // Scoring basé sur le contenu du message (0-25 points)
  const lowerMessage = message.toLowerCase();
  if (lowerMessage.includes('budget') || lowerMessage.includes('coût')) score += 8;
  if (lowerMessage.includes('urgent') || lowerMessage.includes('rapidement')) score += 6;
  if (lowerMessage.includes('équipe') || lowerMessage.includes('développeur')) score += 5;
  if (lowerMessage.includes('production') || lowerMessage.includes('mise en ligne')) score += 8;
  
  // Bonifications qualité (0-20 points)
  if (userProfile.type === 'enterprise') score += 15;
  else if (userProfile.type === 'sme') score += 10;
  else if (userProfile.type === 'startup') score += 8;
  
  return Math.min(score, 100); // Max 100 points
}

async function createOrUpdateLead(supabase: any, sessionId: string, userId: string | null, userProfile: any, intent: string, leadScore: number, context: any) {
  try {
    // Déterminer la qualification basée sur le score
    let qualification = 'new';
    if (leadScore >= 80) qualification = 'hot';
    else if (leadScore >= 60) qualification = 'qualified';
    else if (leadScore >= 40) qualification = 'qualified';
    else if (leadScore < 25) qualification = 'cold';
    
    // Déterminer le type de profil
    let profileType = 'unknown';
    if (userProfile.companyName) {
      if (userProfile.type === 'enterprise') profileType = 'enterprise';
      else if (userProfile.experience === 'advanced') profileType = 'sme';
      else profileType = 'startup';
    } else if (userProfile.type === 'developer') {
      profileType = 'developer';
    }
    
    // Estimer le revenu potentiel basé sur le profil
    const revenueEstimates = {
      'enterprise': 50000,
      'sme': 15000,
      'startup': 5000,
      'developer': 2000,
      'unknown': 1000
    };
    
    const estimatedRevenue = revenueEstimates[profileType] || 1000;
    const conversionProbability = Math.min(leadScore / 100 * 0.8, 0.8); // Max 80%
    
    // Créer ou mettre à jour le lead
    const { data: existingLead } = await supabase
      .from('leads')
      .select('*')
      .eq('session_id', sessionId)
      .single();
    
    if (existingLead) {
      // Mettre à jour le lead existant
      const { data: updatedLead } = await supabase
        .from('leads')
        .update({
          lead_score: Math.max(existingLead.lead_score, leadScore),
          qualification_status: qualification,
          profile_type: profileType,
          intent: intent,
          interaction_count: existingLead.interaction_count + 1,
          last_interaction_at: new Date().toISOString(),
          conversion_probability: conversionProbability,
          estimated_revenue: estimatedRevenue,
          metadata: { ...existingLead.metadata, ...context }
        })
        .eq('id', existingLead.id)
        .select()
        .single();
      
      return updatedLead;
    } else {
      // Créer un nouveau lead
      const { data: newLead } = await supabase
        .from('leads')
        .insert({
          session_id: sessionId,
          user_id: userId,
          email: context.email || null,
          phone: context.phone || null,
          company_name: userProfile.companyName || null,
          lead_score: leadScore,
          qualification_status: qualification,
          profile_type: profileType,
          intent: intent,
          conversion_probability: conversionProbability,
          estimated_revenue: estimatedRevenue,
          metadata: context
        })
        .select()
        .single();
      
      return newLead;
    }
  } catch (error) {
    console.error('❌ Erreur création/mise à jour lead:', error);
    return { id: 'fallback', lead_score: leadScore, qualification_status: 'new', estimated_revenue: 0 };
  }
}

async function getContextualOffers(supabase: any, userProfile: any, intent: string) {
  try {
    const profileType = userProfile.type === 'enterprise' ? 'enterprise' : 
                       userProfile.experience === 'advanced' ? 'sme' : 
                       userProfile.type === 'developer' ? 'developer' : 'startup';
    
    const { data: offers } = await supabase
      .from('contextual_offers')
      .select('*')
      .eq('is_active', true)
      .or(`target_profile.eq.${profileType},target_intent.eq.${intent}`)
      .limit(3);
    
    return offers || [];
  } catch (error) {
    console.error('❌ Erreur récupération offres:', error);
    return [];
  }
}

async function generateConversionOptimizedAIResponse(message: string, userProfile: any, knowledge: any[], context: any, intent: string, leadData: any, offers: any[]) {
  // Construire un prompt optimisé pour la conversion
  const conversionPrompt = buildConversionPrompt(userProfile, knowledge, intent, leadData, offers);
  
  // Utiliser la même logique de fallback que l'ancienne fonction
  if (groqApiKey) {
    try {
      return await generateGroqConversionResponse(message, conversionPrompt);
    } catch (error) {
      console.error('Groq API error, falling back to Hugging Face:', error);
    }
  }

  if (huggingFaceApiKey) {
    try {
      return await generateHuggingFaceConversionResponse(message, conversionPrompt);
    } catch (error) {
      console.error('Hugging Face API error, falling back to OpenAI:', error);
    }
  }

  if (openAIApiKey) {
    try {
      return await generateOpenAIConversionResponse(message, conversionPrompt);
    } catch (error) {
      console.error('OpenAI API error, falling back to static:', error);
    }
  }

  return getConversionOptimizedStaticResponse(message, userProfile, intent, leadData, offers);
}

function buildConversionPrompt(userProfile: any, knowledge: any[], intent: string, leadData: any, offers: any[]) {
  const knowledgeContext = knowledge.map(k => k.content).join('\n\n');
  const offersContext = offers.map(o => `${o.offer_name}: ${o.offer_text} (${o.call_to_action})`).join('\n');
  
  return `MISSION: Tu es l'assistant commercial IA de SenePay optimisé pour la CONVERSION et la GÉNÉRATION DE REVENUS.

🎯 OBJECTIF PRINCIPAL: Transformer chaque interaction en opportunité commerciale qualifiée.

📊 PROFIL LEAD ANALYSÉ:
- Score: ${leadData.lead_score}/100 (${leadData.qualification_status})
- Type: ${leadData.profile_type}
- Revenue potentiel: ${leadData.estimated_revenue} XOF
- Probabilité conversion: ${Math.round(leadData.conversion_probability * 100)}%
- Intention: ${intent}

💰 OFFRES CONTEXTUELLES DISPONIBLES:
${offersContext}

📚 BASE DE CONNAISSANCES:
${knowledgeContext}

🚀 STRATÉGIE DE RÉPONSE SELON QUALIFICATION:
${leadData.qualification_status === 'hot' ? 
  '🔥 LEAD CHAUD: Proposer démo immédiate, devis personnalisé, contact commercial direct' : 
  leadData.qualification_status === 'qualified' ? 
  '✅ LEAD QUALIFIÉ: Éduquer sur la valeur, calculer ROI, proposer essai gratuit' : 
  '🌱 LEAD NOUVEAU: Sensibiliser aux bénéfices, créer urgence, capturer informations'
}

💡 ÉLÉMENTS OBLIGATOIRES À INCLURE:
- Calcul ROI personnalisé avec chiffres concrets
- Comparaison avec solutions actuelles (économies)
- Call-to-action clair et actionnable
- Création d'urgence (offres limitées)
- Social proof (clients similaires)
- Next steps précis

🎯 OBJECTIFS DE CONVERSION:
1. Capturer email/téléphone si absent
2. Qualifier le budget et timeline
3. Identifier les décideurs
4. Proposer prochaine étape concrète (démo, devis, consultation)
5. Créer sentiment d'urgence

STYLE: Professionnel mais humain, focus business value, data-driven, persuasif sans être aggressive.`;
}

async function generateGroqConversionResponse(message: string, conversionPrompt: string) {
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${groqApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama-3.1-70b-versatile',
      messages: [
        { role: 'system', content: conversionPrompt },
        { role: 'user', content: message }
      ],
      temperature: 0.4,
      max_tokens: 1200,
      top_p: 0.9,
    }),
  });

  const data = await response.json();
  return data.choices[0].message.content;
}

async function generateHuggingFaceConversionResponse(message: string, conversionPrompt: string) {
  const fullPrompt = `${conversionPrompt}\n\nUtilisateur: ${message}\n\nAssistant commercial SenePay:`;

  const response = await fetch('https://api-inference.huggingface.co/models/microsoft/DialoGPT-large', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${huggingFaceApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      inputs: fullPrompt,
      parameters: {
        max_new_tokens: 1000,
        temperature: 0.5,
        top_p: 0.9,
        return_full_text: false
      }
    }),
  });

  const data = await response.json();
  return data[0]?.generated_text || getConversionOptimizedStaticResponse(message, {}, 'general', {}, []);
}

async function generateOpenAIConversionResponse(message: string, conversionPrompt: string) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openAIApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: conversionPrompt },
        { role: 'user', content: message }
      ],
      temperature: 0.5,
      max_tokens: 1200,
      top_p: 0.9,
    }),
  });

  const data = await response.json();
  return data.choices[0].message.content;
}

function getConversionOptimizedStaticResponse(message: string, userProfile: any, intent: string, leadData: any, offers: any[]) {
  const companyName = userProfile.companyName || 'votre entreprise';
  const qualification = leadData.qualification_status || 'new';
  
  // Réponses optimisées selon la qualification
  if (qualification === 'hot') {
    return `🔥 **Opportunité immédiate pour ${companyName}**

Votre profil montre un potentiel de ${leadData.estimated_revenue || 25000} XOF d'économies annuelles !

🎯 **Actions immédiates disponibles :**
- **Démo personnalisée** en 15 minutes → Réserver maintenant
- **Devis sur mesure** envoyé en 2h → Demander le devis
- **Contact commercial** direct → +221 77 656 40 42

💰 **Offre exclusive (24h)** : ${offers[0]?.offer_text || '30% de réduction sur vos 3 premiers mois'}

⚡ **Prochaine étape** : Partagez votre email pour recevoir votre analyse personnalisée.`;
  }
  
  if (qualification === 'qualified') {
    return `✅ **Solution idéale identifiée pour ${companyName}**

📊 **Votre économie potentielle avec SenePay :**
- Mobile Money : **57% moins cher** que la concurrence
- Cartes bancaires : **46% moins cher**
- ROI projeté : +40% d'économies sur 12 mois

🎁 **Offre découverte** : ${offers[0]?.offer_text || 'Consultation gratuite de 30 minutes'}

💡 **Calculez vos économies exactes** → Partagez votre volume mensuel

🚀 **Commencer maintenant** : ${offers[0]?.call_to_action || 'Créer votre compte test gratuit'}`;
  }
  
  // Réponse pour nouveaux leads
  return `🌟 **Découvrez pourquoi +2,500 entreprises choisissent SenePay**

**Avantages immédiats pour ${companyName} :**
💸 Économisez jusqu'à 57% sur vos frais de paiement
⚡ Intégration en 5 minutes avec notre API
📱 Tous les moyens de paiement sénégalais (Orange Money, Wave...)
🛡️ Sécurité bancaire niveau 1

🎯 **Offre de bienvenue** : 100 premières transactions gratuites

**Prochaine étape** → Créez votre compte gratuit en 2 minutes : senepay.com/register

💬 **Questions ?** Continuez à me parler ou appelez +221 77 656 40 42`;
}

async function scheduleAutomatedActions(supabase: any, leadId: string, userProfile: any, intent: string) {
  try {
    const actions = [];
    
    // Actions selon l'intention
    if (intent === 'pricing') {
      actions.push({
        lead_id: leadId,
        action_type: 'quote_generation',
        trigger_condition: 'pricing_interest',
        scheduled_at: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2h
        action_data: { template: 'custom_pricing', urgency: 'high' }
      });
    }
    
    if (intent === 'integration') {
      actions.push({
        lead_id: leadId,
        action_type: 'demo_invite',
        trigger_condition: 'integration_need',
        scheduled_at: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30min
        action_data: { type: 'technical_demo', duration: 30 }
      });
    }
    
    // Action de suivi systématique
    actions.push({
      lead_id: leadId,
      action_type: 'follow_up_call',
      trigger_condition: 'qualified_lead',
      scheduled_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24h
      action_data: { priority: 'high', type: 'commercial' }
    });
    
    if (actions.length > 0) {
      await supabase
        .from('automated_actions')
        .insert(actions);
      
      console.log(`📅 ${actions.length} actions automatisées programmées pour lead ${leadId}`);
    }
  } catch (error) {
    console.error('❌ Erreur programmation actions:', error);
  }
}

async function trackConversionEvent(supabase: any, leadId: string, sessionId: string, eventType: string, intent: string) {
  try {
    // Déterminer l'étape du funnel
    let funnelStage = 'visitor';
    if (intent === 'pricing' || intent === 'integration') funnelStage = 'lead';
    
    await supabase
      .from('conversion_tracking')
      .insert({
        lead_id: leadId,
        session_id: sessionId,
        funnel_stage: funnelStage,
        conversion_event: eventType,
        attribution_data: { intent, timestamp: new Date().toISOString() }
      });
    
    console.log(`📊 Événement de conversion tracké: ${eventType} (${funnelStage})`);
  } catch (error) {
    console.error('❌ Erreur tracking conversion:', error);
  }
}

async function initializeNurturingSequence(supabase: any, leadId: string, userProfile: any, intent: string) {
  try {
    // Sélectionner le type de séquence selon le profil et l'intention
    let sequenceType = 'education';
    let totalSteps = 5;
    
    if (intent === 'integration') {
      sequenceType = 'onboarding';
      totalSteps = 7;
    } else if (intent === 'pricing') {
      sequenceType = 'conversion';
      totalSteps = 4;
    }
    
    await supabase
      .from('nurturing_sequences')
      .insert({
        lead_id: leadId,
        sequence_type: sequenceType,
        total_steps: totalSteps,
        next_action_at: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(), // 4h
        sequence_data: {
          profile: userProfile.type,
          intent: intent,
          started_at: new Date().toISOString()
        }
      });
    
    console.log(`🎯 Séquence de nurturing ${sequenceType} initialisée pour lead ${leadId}`);
  } catch (error) {
    console.error('❌ Erreur initialisation nurturing:', error);
  }
}

function generateSmartSuggestions(intent: string, userProfile: any, leadData: any) {
  const qualification = leadData.qualification_status || 'new';
  
  // Suggestions optimisées selon la qualification
  if (qualification === 'hot') {
    return [
      "📞 Réserver ma démo immédiate",
      "💰 Obtenir mon devis personnalisé",
      "🚀 Commencer l'intégration maintenant",
      "📊 Calculer mes économies exactes"
    ];
  }
  
  if (qualification === 'qualified') {
    return [
      "💡 Voir les cas d'usage similaires",
      "🎯 Estimer mes économies",
      "📱 Tester avec mon volume",
      "👥 Parler à un expert"
    ];
  }
  
  // Suggestions pour nouveaux leads
  const suggestions = {
    integration: [
      "🔧 Guide d'intégration en 5 minutes",
      "📚 Voir la documentation API",
      "⚡ Créer mon compte test gratuit",
      "💬 Assistance développeur"
    ],
    pricing: [
      "💰 Calculer mes économies",
      "📊 Comparer avec ma solution actuelle",
      "🎁 Voir les offres du moment",
      "📞 Demander un devis personnalisé"
    ],
    payment_methods: [
      "📱 Orange Money vs concurrents",
      "⚡ Intégrer Wave rapidement",
      "🌍 Support multi-opérateurs",
      "🔧 Configuration technique"
    ],
    general: [
      "🚀 Commencer gratuitement",
      "📖 Guide de démarrage",
      "💡 Voir les bénéfices",
      "📞 Parler à un expert"
    ]
  };
  
  return suggestions[intent] || suggestions.general;
}

async function saveConversation(supabase: any, sessionId: string, userId: string | null, message: string, response: string, context: any) {
  try {
    const messageData = {
      id: crypto.randomUUID(),
      user: message,
      assistant: response,
      timestamp: new Date().toISOString()
    };

    // Try to update existing conversation
    const { data: existing } = await supabase
      .from('chat_conversations')
      .select('messages')
      .eq('session_id', sessionId)
      .single();

    if (existing) {
      const updatedMessages = [...existing.messages, messageData];
      await supabase
        .from('chat_conversations')
        .update({ 
          messages: updatedMessages,
          context: context 
        })
        .eq('session_id', sessionId);
    } else {
      // Create new conversation
      await supabase
        .from('chat_conversations')
        .insert({
          session_id: sessionId,
          user_id: userId,
          messages: [messageData],
          context: context
        });
    }
  } catch (error) {
    console.error('Error saving conversation:', error);
  }
}