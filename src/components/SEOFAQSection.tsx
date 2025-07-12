import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    question: "Comment intégrer l'API Orange Money Sénégal avec SenePay ?",
    answer: "L'intégration de l'API Orange Money avec SenePay est ultra-simple et ne prend que 5 minutes. Créez votre compte développeur gratuit, récupérez vos clés API, et utilisez notre SDK JavaScript : `senepay.payments.create({ method: 'orange_money', amount: 10000 })`. Notre documentation complète vous guide pas à pas.",
    category: "Integration"
  },
  {
    question: "Quels sont les tarifs de SenePay pour les paiements mobiles au Sénégal ?",
    answer: "SenePay propose les tarifs les plus compétitifs du marché sénégalais : 1.2% pour Orange Money et Wave (vs 2.8% chez la concurrence), 1.9% pour les cartes bancaires (vs 3.5% ailleurs). Essai gratuit avec 100 transactions incluses, puis plans à partir de 15,000 FCFA/mois.",
    category: "Pricing"
  },
  {
    question: "SenePay supporte-t-il Wave Payment et Free Money Sénégal ?",
    answer: "Absolument ! SenePay est la seule passerelle au Sénégal qui intègre TOUS les moyens de paiement locaux : Orange Money, Wave, Free Money, YUP (Banque Atlantique), Wizall, plus toutes les cartes bancaires internationales (Visa, Mastercard, Amex). Une seule API pour tout connecter.",
    category: "Payment Methods"
  },
  {
    question: "Combien de temps prend l'intégration de SenePay dans mon e-commerce ?",
    answer: "L'intégration complète de SenePay prend entre 5 minutes (pour les solutions standard) et 2 heures (pour les intégrations personnalisées). Nous fournissons des plugins prêts à l'emploi pour WooCommerce, Shopify, et des SDKs pour tous les langages populaires.",
    category: "Integration"
  },
  {
    question: "SenePay est-il sécurisé pour les transactions financières au Sénégal ?",
    answer: "SenePay bénéficie de la sécurité bancaire de niveau international : certification PCI DSS Level 1, conformité BCEAO, chiffrement SSL 256-bits, authentification 3D Secure, et système anti-fraude IA. Vos transactions sont protégées au plus haut niveau mondial.",
    category: "Security"
  },
  {
    question: "Comment recevoir les notifications de paiement avec les webhooks SenePay ?",
    answer: "Les webhooks SenePay vous notifient en temps réel de tous les événements : paiements réussis, échecs, remboursements. Configuration en 1 clic dans votre dashboard, avec retry automatique et signatures cryptographiques pour garantir l'authenticité des notifications.",
    category: "Technical"
  },
  {
    question: "SenePay fonctionne-t-il dans toute l'Afrique de l'Ouest ?",
    answer: "SenePay couvre actuellement le Sénégal (tous opérateurs) et s'étend rapidement en Afrique de l'Ouest : Mali, Burkina Faso, Côte d'Ivoire, Niger. Notre roadmap prévoit la couverture complète CEDEAO d'ici fin 2025 avec les opérateurs locaux de chaque pays.",
    category: "Coverage"
  },
  {
    question: "Quels frameworks et langages supportent les SDKs SenePay ?",
    answer: "SenePay fournit des SDKs natifs pour tous les langages populaires : JavaScript/TypeScript (React, Vue, Angular), PHP (Laravel, Symfony), Python (Django, Flask), Java (Spring), C# (.NET), Ruby on Rails, et des plugins pour WordPress, WooCommerce, Shopify.",
    category: "Technical"
  }
];

const SEOFAQSection: React.FC = () => {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  // Structured data pour les FAQs
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(faqStructuredData)}
        </script>
      </Helmet>
      
      <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="container mx-auto px-4">
          {/* En-tête SEO optimisé */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-senepay-orange to-senepay-gold bg-clip-text text-transparent">
              Questions Fréquentes API Paiement Sénégal
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Tout ce que vous devez savoir sur l'intégration de l'API de paiement mobile la plus avancée d'Afrique de l'Ouest. 
              <strong> Orange Money, Wave, Free Money</strong> - toutes vos questions ont une réponse.
            </p>
          </div>

          {/* Grille FAQ avec catégories */}
          <div className="max-w-4xl mx-auto space-y-4">
            {faqData.map((faq, index) => (
              <Card 
                key={index} 
                className="transition-all duration-300 hover:shadow-lg border-l-4 border-l-senepay-orange/30 hover:border-l-senepay-orange"
              >
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full text-left p-6 focus:outline-none focus:ring-2 focus:ring-senepay-orange/20 rounded-lg"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-xs font-semibold px-2 py-1 bg-senepay-orange/10 text-senepay-orange rounded-full">
                            {faq.category}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 pr-4">
                          {faq.question}
                        </h3>
                      </div>
                      <div className="flex-shrink-0">
                        {openItems.has(index) ? (
                          <ChevronUp className="h-5 w-5 text-senepay-orange" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                    </div>
                  </button>
                  
                  {openItems.has(index) && (
                    <div className="px-6 pb-6">
                      <div className="pt-4 border-t border-gray-100">
                        <p className="text-gray-700 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-senepay-orange/5 to-senepay-gold/5 rounded-2xl p-8 max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                Une question spécifique sur l'intégration ?
              </h3>
              <p className="text-gray-600 mb-6">
                Notre équipe technique sénégalaise répond à vos questions en moins de 2 heures. 
                Support en français et wolof disponible 24/7.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/contact" 
                  className="inline-flex items-center justify-center px-6 py-3 bg-senepay-orange text-white font-semibold rounded-lg hover:bg-senepay-orange/90 transition-colors"
                >
                  Contactez notre support technique
                </a>
                <a 
                  href="/documentation" 
                  className="inline-flex items-center justify-center px-6 py-3 border border-senepay-orange text-senepay-orange font-semibold rounded-lg hover:bg-senepay-orange/5 transition-colors"
                >
                  Consulter la documentation
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SEOFAQSection;