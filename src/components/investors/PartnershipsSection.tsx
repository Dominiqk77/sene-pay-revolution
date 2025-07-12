import React from 'react';
import { motion } from 'framer-motion';
import { Handshake, Shield, Globe, Zap, Award, Building } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
const PartnershipsSection = () => {
  const strategicPartners = [{
    category: 'Opérateurs Télécoms',
    partners: ['Orange Sénégal', 'Free Sénégal', 'Expresso'],
    status: 'Actif',
    impact: 'Accès direct à 14M+ utilisateurs mobile',
    icon: Globe,
    color: 'from-senepay-gold/20 to-senepay-orange/20'
  }, {
    category: 'Fintechs Locales',
    partners: ['Wave', 'Wizall', 'YUP'],
    status: 'Intégration',
    impact: 'Couverture 95% des paiements mobiles',
    icon: Zap,
    color: 'from-senepay-green/20 to-senepay-gold/20'
  }, {
    category: 'Institutions Financières',
    partners: ['BCEAO', 'Banque Atlantique', 'UBA'],
    status: 'Négociation',
    impact: 'Conformité réglementaire & licences',
    icon: Shield,
    color: 'from-blue-500/20 to-senepay-green/20'
  }, {
    category: 'Plateformes E-commerce',
    partners: ['Jumia', 'Kaymu', 'Afrimarket'],
    status: 'Pilote',
    impact: '60% du e-commerce sénégalais',
    icon: Building,
    color: 'from-purple-500/20 to-senepay-orange/20'
  }];
  const technicalPartners = [{
    name: 'AWS',
    type: 'Cloud Infrastructure',
    benefits: ['Scalabilité mondiale', 'Sécurité enterprise', 'Compliance'],
    logo: '☁️'
  }, {
    name: 'Stripe Connect',
    type: 'International Payments',
    benefits: ['Cartes internationales', '3D Secure', 'Multi-devises'],
    logo: '💳'
  }, {
    name: 'Plaid',
    type: 'Open Banking',
    benefits: ['Connexion bancaire', 'Vérification KYC', 'Scoring crédit'],
    logo: '🏦'
  }, {
    name: 'Twilio',
    type: 'Communications',
    benefits: ['SMS/WhatsApp', 'Vérifications', 'Support multicanal'],
    logo: '📱'
  }];
  const upcomingPartnerships = [{
    partner: 'Ministère du Numérique',
    type: 'Gouvernement',
    objective: 'Initiative Sénégal Digital 2025',
    timeline: 'Q1 2024',
    impact: 'Support institutionnel & subventions'
  }, {
    partner: 'CEDEAO',
    type: 'Organisation Régionale',
    objective: 'Harmonisation paiements CEDEAO',
    timeline: 'Q2 2024',
    impact: 'Expansion 8 pays facilité'
  }, {
    partner: 'Mastercard',
    type: 'Réseau International',
    objective: 'Programme Mastercard Start Path',
    timeline: 'Q3 2024',
    impact: 'Accès global & expertise'
  }];
  return <section className="py-20 bg-gradient-to-br from-gray-900 to-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div className="text-center mb-16" initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8
      }} viewport={{
        once: true
      }}>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="text-white">Partenariats</span>
            <br />
            <span className="gradient-text bg-gradient-to-r from-senepay-gold to-senepay-green bg-clip-text text-transparent">
              Stratégiques
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Un réseau d'alliances stratégiques qui nous donne un avantage concurrentiel 
            décisif et accélère notre expansion dans l'écosystème fintech africain.
          </p>
        </motion.div>

        {/* Strategic Partnerships */}
        <motion.div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-8 mb-16" initial={{
        opacity: 0,
        y: 40
      }} whileInView={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8,
        delay: 0.2
      }} viewport={{
        once: true
      }}>
          {strategicPartners.map((partnership, index) => <motion.div key={index} whileHover={{
          scale: 1.02
        }} className="relative overflow-hidden">
              <Card className={`bg-gradient-to-br ${partnership.color} border-white/10 backdrop-blur-sm h-full`}>
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <partnership.icon className="w-8 h-8 text-senepay-gold mx-auto mb-3" />
                    <h3 className="text-lg font-bold text-white mb-2">{partnership.category}</h3>
                    <Badge className={`${partnership.status === 'Actif' ? 'bg-senepay-green/20 text-senepay-green border-senepay-green/30' : 'bg-senepay-orange/20 text-senepay-orange border-senepay-orange/30'}`}>
                      {partnership.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="text-black font-semibold text-sm mb-1">Partenaires:</div>
                      {partnership.partners.map((partner, idx) => <div key={idx} className="text-blue-900 text-blue-900 ">• {partner}</div>)}
                    </div>
                    
                    <div>
                      <div className="text-white font-semibold text-sm mb-1">Impact:</div>
                      <div className="text-gray-300 text-sm">{partnership.impact}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>)}
        </motion.div>

        {/* Technical Partners */}
        <motion.div className="mb-16" initial={{
        opacity: 0,
        y: 40
      }} whileInView={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8,
        delay: 0.4
      }} viewport={{
        once: true
      }}>
          <h3 className="text-3xl font-bold text-white text-center mb-8">
            Partenaires <span className="text-senepay-gold">Technologiques</span>
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {technicalPartners.map((partner, index) => <Card key={index} className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">{partner.logo}</div>
                  <h4 className="text-white font-bold mb-1">{partner.name}</h4>
                  <div className="text-senepay-gold text-sm mb-3">{partner.type}</div>
                  <div className="space-y-1">
                    {partner.benefits.map((benefit, idx) => <div key={idx} className="text-gray-400 text-xs">• {benefit}</div>)}
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </motion.div>

        {/* Upcoming Partnerships */}
        <motion.div initial={{
        opacity: 0,
        y: 40
      }} whileInView={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8,
        delay: 0.6
      }} viewport={{
        once: true
      }}>
          <h3 className="text-3xl font-bold text-white text-center mb-8">
            Partenariats en <span className="text-senepay-green">Négociation</span>
          </h3>
          <div className="space-y-6">
            {upcomingPartnerships.map((partnership, index) => <Card key={index} className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <Handshake className="w-5 h-5 text-senepay-gold mr-3" />
                        <h4 className="text-xl font-bold text-white">{partnership.partner}</h4>
                        <Badge className="ml-3 bg-blue-500/20 text-blue-400 border-blue-500/30">
                          {partnership.type}
                        </Badge>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <div className="text-gray-400 text-sm">Objectif:</div>
                          <div className="text-white">{partnership.objective}</div>
                        </div>
                        <div>
                          <div className="text-gray-400 text-sm">Impact Attendu:</div>
                          <div className="text-gray-300">{partnership.impact}</div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 lg:mt-0 lg:ml-6 text-center">
                      <Badge className="bg-senepay-orange/20 text-senepay-orange border-senepay-orange/30">
                        {partnership.timeline}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </motion.div>

        {/* Partnership Impact Summary */}
        <motion.div className="mt-16 text-center" initial={{
        opacity: 0,
        y: 40
      }} whileInView={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8,
        delay: 0.8
      }} viewport={{
        once: true
      }}>
          <Card className="bg-gradient-to-br from-senepay-gold/10 via-senepay-orange/10 to-senepay-green/10 border-senepay-gold/30 max-w-4xl mx-auto">
            <CardContent className="p-8">
              <Award className="w-12 h-12 text-senepay-gold mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">
                Écosystème de Partenariats Unique
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Nos partenariats stratégiques nous donnent accès à <span className="text-senepay-gold font-semibold">95% du marché</span> des 
                paiements mobiles, une conformité réglementaire complète, et une infrastructure 
                technologique de classe mondiale.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-senepay-gold mb-1">14M+</div>
                  <div className="text-gray-300 text-sm">Utilisateurs Accessibles</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-senepay-green mb-1">95%</div>
                  <div className="text-gray-300 text-sm">Couverture Paiements</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-senepay-orange mb-1">8</div>
                  <div className="text-gray-300 text-sm">Pays d'Expansion</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>;
};
export default PartnershipsSection;