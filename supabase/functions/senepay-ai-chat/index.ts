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

    console.log('Chat request received:', { message, sessionId, userId, context });

    // Detect user type and intent
    const userProfile = await detectUserProfile(supabase, userId);
    const messageIntent = await analyzeMessageIntent(message);

    // Search knowledge base for relevant information
    const relevantKnowledge = await searchKnowledgeBase(supabase, message, messageIntent);

    // Generate enhanced AI response with multiple sources
    const aiResponse = await generateEnhancedAIResponse(message, userProfile, relevantKnowledge, context, messageIntent);

    // Save conversation
    await saveConversation(supabase, sessionId, userId, message, aiResponse, context);

    console.log('AI response generated successfully');

    return new Response(JSON.stringify({ 
      response: aiResponse,
      suggestions: generateSuggestions(messageIntent, userProfile),
      context: await updateContext(context, message, aiResponse)
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