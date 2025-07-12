import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Base de connaissances SenePay
    const knowledgeData = [
      // API Documentation
      {
        content: `# SenePay API - Créer un paiement

Endpoint: POST /api/payments

Headers:
- Authorization: Bearer {API_KEY}
- Content-Type: application/json

Body:
{
  "amount": 10000,
  "currency": "XOF", 
  "payment_methods": ["orange_money", "wave"],
  "customer": {
    "email": "client@example.com",
    "phone": "+221771234567"
  },
  "success_url": "https://monsite.com/success",
  "cancel_url": "https://monsite.com/cancel"
}

Réponse:
{
  "id": "pay_123",
  "status": "pending",
  "checkout_url": "https://checkout.senepay.com/pay_123"
}`,
        content_type: 'api_doc',
        category: 'integration',
        metadata: { endpoint: 'create_payment', method: 'POST' }
      },

      // Intégration Orange Money
      {
        content: `# Intégrer Orange Money avec SenePay

Orange Money est le leader du mobile money au Sénégal avec plus de 8 millions d'utilisateurs.

## Configuration
1. Activez Orange Money dans votre dashboard SenePay
2. Utilisez le payment_method: "orange_money"
3. Le client sera redirigé vers l'interface Orange Money

## Exemple de code:
\`\`\`javascript
const payment = await senepay.payments.create({
  amount: 5000,
  currency: 'XOF',
  payment_methods: ['orange_money'],
  customer: {
    phone: '+221771234567'
  }
});
\`\`\`

## Tarifs: 1.2% par transaction
## Limite: 1,000,000 XOF par transaction`,
        content_type: 'integration_guide',
        category: 'payment',
        metadata: { provider: 'orange_money', country: 'senegal' }
      },

      // Intégration Wave
      {
        content: `# Intégrer Wave avec SenePay

Wave est une solution de paiement mobile populaire au Sénégal.

## Configuration
1. Activez Wave dans votre dashboard SenePay
2. Utilisez le payment_method: "wave"
3. Support QR Code et transferts directs

## Exemple de code:
\`\`\`javascript
const payment = await senepay.payments.create({
  amount: 15000,
  currency: 'XOF', 
  payment_methods: ['wave'],
  customer: {
    phone: '+221771234567'
  }
});
\`\`\`

## Tarifs: 1.2% par transaction
## Limite: 2,000,000 XOF par transaction`,
        content_type: 'integration_guide',
        category: 'payment',
        metadata: { provider: 'wave', country: 'senegal' }
      },

      // Webhooks
      {
        content: `# Configuration des Webhooks SenePay

Les webhooks vous permettent de recevoir des notifications en temps réel.

## Configuration
1. Ajoutez votre URL webhook dans le dashboard
2. Configurez la signature de sécurité
3. Gérez les événements payment.completed, payment.failed

## Exemple de gestion:
\`\`\`javascript
app.post('/webhooks/senepay', (req, res) => {
  const { event, data } = req.body;
  
  if (event === 'payment.completed') {
    // Confirmer la commande
    console.log('Paiement confirmé:', data.id);
  }
  
  res.status(200).send('OK');
});
\`\`\`

## Sécurité: Vérifiez toujours la signature webhook`,
        content_type: 'integration_guide',
        category: 'integration',
        metadata: { topic: 'webhooks', security: 'signature_verification' }
      },

      // Erreurs courantes
      {
        content: `# Erreurs courantes SenePay

## Erreur 401 - Non autorisé
- Vérifiez votre clé API
- Assurez-vous d'utiliser le bon environnement (test/live)

## Erreur 400 - Montant invalide
- Le montant doit être en XOF (entier)
- Minimum: 100 XOF, Maximum: 10,000,000 XOF

## Erreur 402 - Solde insuffisant
- Le client n'a pas assez de fonds
- Suggérez un autre moyen de paiement

## Timeout de paiement
- Les paiements expirent après 24h
- Créez un nouveau paiement si nécessaire`,
        content_type: 'error_solution',
        category: 'development',
        metadata: { topic: 'troubleshooting' }
      },

      // Guide de démarrage
      {
        content: `# Guide de démarrage rapide SenePay

## 1. Créer un compte
- Inscrivez-vous sur senepay.com
- Vérifiez votre email
- Complétez votre profil marchand

## 2. Obtenir vos clés API
- Dashboard → Paramètres → Clés API
- Clé publique: pk_test_... (pour le frontend)
- Clé secrète: sk_test_... (pour le backend)

## 3. Premier paiement
\`\`\`javascript
const senepay = new SenePay('pk_test_...');
const payment = await senepay.payments.create({
  amount: 1000,
  currency: 'XOF'
});
\`\`\`

## 4. Passer en production
- Vérification KYC obligatoire
- Remplacez les clés test par les clés live`,
        content_type: 'integration_guide',
        category: 'general',
        metadata: { topic: 'getting_started' }
      },

      // FAQ
      {
        content: `# FAQ SenePay

## Combien coûte SenePay ?
- Mobile Money: 1.2% par transaction
- Cartes bancaires: 1.9% par transaction
- Pas de frais de setup ou d'abonnement

## Quels pays sont supportés ?
- Sénégal (principal)
- Mali, Burkina Faso (bientôt)

## Délai de règlement ?
- Instantané pour les tests
- J+1 ouvré en production

## Support technique ?
- Email: support@senepay.com
- Téléphone: +221 77 656 40 42
- Chat 24/7 sur le site`,
        content_type: 'faq',
        category: 'general',
        metadata: { topic: 'pricing_support' }
      }
    ];

    // Insérer les données dans la base de connaissances
    const { data, error } = await supabase
      .from('chat_knowledge_base')
      .insert(knowledgeData);

    if (error) {
      console.error('Error inserting knowledge base:', error);
      throw error;
    }

    console.log('Knowledge base initialized successfully');

    return new Response(JSON.stringify({ 
      success: true,
      message: 'Base de connaissances initialisée avec succès',
      inserted: knowledgeData.length
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in init-knowledge-base function:', error);
    return new Response(JSON.stringify({ 
      error: 'Erreur lors de l\'initialisation de la base de connaissances',
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});