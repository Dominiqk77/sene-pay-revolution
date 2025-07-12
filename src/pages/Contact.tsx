
import React from "react";
import { Helmet } from "react-helmet-async";
import { Mail, Phone, MapPin, Clock, MessageSquare, Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

const Contact = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-16 sm:pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-hero text-white py-12 sm:py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
                Contactez-nous
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed px-4">
                Notre équipe d'experts est à votre disposition pour vous accompagner 
                dans l'intégration de SenePay et répondre à toutes vos questions.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info & Form */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
              
              {/* Contact Information */}
              <div className="space-y-6 sm:space-y-8">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
                    Parlons de votre projet
                  </h2>
                  <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-6 sm:mb-8">
                    Que vous soyez une startup ou une grande entreprise, 
                    nous avons la solution de paiement adaptée à vos besoins.
                  </p>
                </div>

                {/* Contact Cards */}
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-start space-x-3 sm:space-x-4 p-4 rounded-lg border border-gray-200 hover:border-senepay-gold transition-colors">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-senepay rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Adresse</h3>
                      <p className="text-gray-600 text-sm sm:text-base">
                        Dakar, Sénégal<br />
                        Zone de Almadies
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 sm:space-x-4 p-4 rounded-lg border border-gray-200 hover:border-senepay-gold transition-colors">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-senepay rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Téléphone</h3>
                      <p className="text-gray-600 text-sm sm:text-base">
                        +221 77 656 40 42<br />
                        Support technique 24/7
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 sm:space-x-4 p-4 rounded-lg border border-gray-200 hover:border-senepay-gold transition-colors">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-senepay rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Email</h3>
                      <p className="text-gray-600 text-sm sm:text-base">
                        contact@senepay.sn<br />
                        support@senepay.sn
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 sm:space-x-4 p-4 rounded-lg border border-gray-200 hover:border-senepay-gold transition-colors">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-senepay rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Horaires</h3>
                      <p className="text-gray-600 text-sm sm:text-base">
                        Lun - Ven: 8h00 - 18h00<br />
                        Support: 24h/24, 7j/7
                      </p>
                    </div>
                  </div>
                </div>

                {/* Response Time */}
                <div className="bg-senepay-light p-4 sm:p-6 rounded-lg border border-senepay-gold/20">
                  <h3 className="font-semibold text-senepay-dark mb-2 text-sm sm:text-base">
                    🚀 Temps de réponse garanti
                  </h3>
                  <p className="text-gray-700 text-sm sm:text-base">
                    • Questions générales: <strong>2h</strong><br />
                    • Support technique: <strong>30min</strong><br />
                    • Problèmes critiques: <strong>Immédiat</strong>
                  </p>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100">
                <div className="mb-6 sm:mb-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                    Envoyez-nous un message
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Remplissez le formulaire ci-dessous et nous vous répondrons rapidement.
                  </p>
                </div>

                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
                  Questions fréquentes
                </h2>
                <p className="text-gray-600 text-base sm:text-lg">
                  Trouvez rapidement les réponses aux questions les plus courantes
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                      Combien de temps pour l'intégration ?
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base">
                      L'intégration de base prend 5 minutes avec notre API simple. 
                      Une intégration complète peut être réalisée en 1 journée.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                      Quels sont les frais de transaction ?
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base">
                      1.2% pour le mobile money, 1.9% pour les cartes bancaires. 
                      50% moins cher que la concurrence.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                      Le support est-il inclus ?
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base">
                      Oui, le support technique 24/7 est inclus dans tous nos plans, 
                      même le plan gratuit.
                    </p>
                  </div>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                      Quels moyens de paiement acceptez-vous ?
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base">
                      Orange Money, Wave, Free Money, Wizall, cartes Visa/Mastercard, 
                      et virements bancaires.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                      La sécurité est-elle garantie ?
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base">
                      Nous sommes certifiés PCI DSS Level 1 et utilisons un 
                      chiffrement de niveau bancaire pour toutes les transactions.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                      Puis-je tester gratuitement ?
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base">
                      Oui, le plan Starter est gratuit jusqu'à 100 transactions/mois. 
                      Aucune carte de crédit requise.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
