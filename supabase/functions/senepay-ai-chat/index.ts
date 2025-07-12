import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
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

    // Generate AI response
    const aiResponse = await generateAIResponse(message, userProfile, relevantKnowledge, context);

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

async function generateAIResponse(message: string, userProfile: any, knowledge: any[], context: any) {
  if (!openAIApiKey) {
    return getStaticResponse(message, userProfile);
  }

  const systemPrompt = buildSystemPrompt(userProfile, knowledge);
  const contextualMessage = buildContextualMessage(message, context);

  try {
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
        temperature: 0.7,
        max_tokens: 800,
      }),
    });

    const data = await response.json();
    return data.choices[0].message.content;

  } catch (error) {
    console.error('Error generating AI response:', error);
    return getStaticResponse(message, userProfile);
  }
}

function buildSystemPrompt(userProfile: any, knowledge: any[]) {
  const knowledgeContext = knowledge.map(k => k.content).join('\n\n');
  
  return `Tu es l'assistant IA de SenePay, la plateforme de paiement mobile #1 au Sénégal.

CONTEXTE UTILISATEUR:
- Type: ${userProfile.type}
- Expérience: ${userProfile.experience}
- Compte marchand: ${userProfile.hasAccount ? 'Oui' : 'Non'}

CONNAISSANCES SENEPAY:
${knowledgeContext}

INFORMATIONS CLÉS:
- SenePay connecte Orange Money, Wave, Free Money, Wizall
- Intégration simple avec APIs REST
- Support Webhooks pour notifications temps réel
- Tarifs: 1.2% Mobile Money, 1.9% cartes bancaires
- Support technique 24/7 au +221 77 656 40 42

STYLE DE RÉPONSE:
- Professionnel mais amical
- Français principalement
- Code examples si pertinent
- Liens vers documentation
- Émojis subtils (🚀💳📱)

TU PEUX:
- Guider l'intégration SenePay
- Expliquer les APIs et webhooks
- Diagnostiquer les erreurs
- Générer du code personnalisé
- Recommander les meilleures pratiques

TU NE PEUX PAS:
- Accéder aux données privées
- Modifier les configurations
- Traiter les paiements
- Révéler les secrets API`;
}

function buildContextualMessage(message: string, context: any) {
  if (!context || Object.keys(context).length === 0) {
    return message;
  }

  return `Contexte de la conversation: ${JSON.stringify(context)}

Question actuelle: ${message}`;
}

function getStaticResponse(message: string, userProfile: any) {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('bonjour') || lowerMessage.includes('salut')) {
    return `Bonjour ! 👋 Je suis l'assistant IA de SenePay. Comment puis-je vous aider avec l'intégration de notre plateforme de paiement ?`;
  }
  
  if (lowerMessage.includes('api') || lowerMessage.includes('intégr')) {
    return `Pour intégrer SenePay, vous pouvez:
    
1. 📚 Consulter notre documentation: https://docs.senepay.com
2. 🔑 Récupérer vos clés API depuis le dashboard
3. 💻 Utiliser nos SDKs (JavaScript, PHP, Python)
4. 🔗 Configurer les webhooks pour les notifications

Besoin d'aide avec une étape spécifique ? 🚀`;
  }
  
  if (lowerMessage.includes('tarif') || lowerMessage.includes('prix')) {
    return `Nos tarifs SenePay sont très compétitifs:

💳 **Mobile Money**: 1.2% (Orange Money, Wave, Free Money)
🏦 **Cartes bancaires**: 1.9% (Visa, Mastercard)
⚡ **Pas de frais de setup** - Démarrez gratuitement !

Volume élevé ? Contactez-nous pour des tarifs préférentiels ! 📞 +221 77 656 40 42`;
  }
  
  return `Je suis là pour vous aider avec SenePay ! 🚀

Posez-moi vos questions sur:
• 🔧 Intégration technique
• 💳 Méthodes de paiement
• 📊 Tarification
• 🐛 Résolution de problèmes
• 📖 Documentation

Comment puis-je vous assister ?`;
}

function generateSuggestions(intent: string, userProfile: any) {
  const suggestions = {
    integration: [
      "Comment intégrer Orange Money ?",
      "Exemple de code pour créer un paiement",
      "Configuration des webhooks"
    ],
    troubleshooting: [
      "Erreurs API les plus courantes",
      "Tester l'intégration en sandbox",
      "Vérifier les logs de transaction"
    ],
    pricing: [
      "Calculateur de coûts",
      "Tarifs par volume",
      "Comparaison avec la concurrence"
    ],
    general: [
      "Documentation développeur",
      "Guide de démarrage rapide",
      "Contacter le support technique"
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