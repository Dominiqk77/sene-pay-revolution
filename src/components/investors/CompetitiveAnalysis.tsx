import React from 'react';
import { motion } from 'framer-motion';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Shield, Zap, Globe, DollarSign, Users, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
const CompetitiveAnalysis = () => {
  // Competitive comparison data
  const competitiveData = [{
    subject: 'Intégration',
    SenePay: 95,
    CinetPay: 70,
    Paystack: 65,
    Flutterwave: 60
  }, {
    subject: 'Couverture Locale',
    SenePay: 100,
    CinetPay: 60,
    Paystack: 30,
    Flutterwave: 40
  }, {
    subject: 'Tarification',
    SenePay: 90,
    CinetPay: 55,
    Paystack: 45,
    Flutterwave: 50
  }, {
    subject: 'Support Local',
    SenePay: 100,
    CinetPay: 70,
    Paystack: 20,
    Flutterwave: 25
  }, {
    subject: 'Innovation',
    SenePay: 95,
    CinetPay: 65,
    Paystack: 75,
    Flutterwave: 80
  }, {
    subject: 'Sécurité',
    SenePay: 100,
    CinetPay: 75,
    Paystack: 85,
    Flutterwave: 80
  }];
  const competitors = [{
    name: 'CinetPay',
    country: 'Côte d\'Ivoire',
    funding: '$2.4M',
    merchants: '3,000+',
    coverage: '5 pays',
    weaknesses: ['Intégration complexe', 'Support limité', 'Tarifs élevés'],
    color: 'border-red-500/30'
  }, {
    name: 'Paystack',
    country: 'Nigeria',
    funding: '$200M',
    merchants: '60,000+',
    coverage: '4 pays',
    weaknesses: ['Pas d\'optimisation Sénégal', 'Mobile Money limité', 'Support anglophone'],
    color: 'border-blue-500/30'
  }, {
    name: 'Flutterwave',
    country: 'Nigeria',
    funding: '$474M',
    merchants: '900,000+',
    coverage: '34 pays',
    weaknesses: ['Complexité technique', 'Coûts cachés', 'Support local faible'],
    color: 'border-purple-500/30'
  }];
  const advantages = [{
    title: 'Premier Mover Advantage',
    description: 'Seule solution 100% sénégalaise avec connaissance profonde du marché local',
    icon: Globe,
    color: 'text-senepay-gold'
  }, {
    title: 'Intégration Ultra-Rapide',
    description: '5 minutes vs 2-3 semaines pour la concurrence',
    icon: Zap,
    color: 'text-senepay-orange'
  }, {
    title: 'Tarification Disruptive',
    description: '50% moins cher que CinetPay, 60% moins cher que Paystack',
    icon: DollarSign,
    color: 'text-senepay-green'
  }, {
    title: 'Support Multilingue',
    description: 'Français + Wolof + support technique local 24/7',
    icon: Users,
    color: 'text-blue-400'
  }, {
    title: 'Couverture Totale',
    description: 'Tous les moyens de paiement locaux + internationaux',
    icon: Shield,
    color: 'text-purple-400'
  }, {
    title: 'Innovation Continue',
    description: 'IA anti-fraude, analytics avancés, API-first approach',
    icon: Award,
    color: 'text-pink-400'
  }];
  return <section className="py-20 bg-gradient-to-br from-black to-gray-900">
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
            <span className="text-white">Analyse</span>
            <br />
            <span className="gradient-text bg-gradient-to-r from-senepay-gold to-senepay-orange bg-clip-text text-transparent">
              Concurrentielle
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            SenePay surpasse la concurrence sur tous les critères clés grâce à notre 
            approche 100% focalisée sur le marché ouest-africain.
          </p>
        </motion.div>

        {/* Competitive Radar Chart */}
        <motion.div className="mb-16" initial={{
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
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className="text-white text-center">
                Comparaison Multi-Critères
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={500}>
                <RadarChart data={competitiveData}>
                  <PolarGrid stroke="rgba(255,255,255,0.1)" />
                  <PolarAngleAxis dataKey="subject" tick={{
                  fill: '#fff',
                  fontSize: 12
                }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{
                  fill: '#fff',
                  fontSize: 10
                }} />
                  <Radar name="SenePay" dataKey="SenePay" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.3} strokeWidth={3} />
                  <Radar name="CinetPay" dataKey="CinetPay" stroke="#EF4444" fill="transparent" strokeWidth={2} />
                  <Radar name="Paystack" dataKey="Paystack" stroke="#3B82F6" fill="transparent" strokeWidth={2} />
                  <Radar name="Flutterwave" dataKey="Flutterwave" stroke="#8B5CF6" fill="transparent" strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
              <div className="flex justify-center space-x-8 mt-4">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-senepay-gold rounded mr-2"></div>
                  <span className="text-white text-sm">SenePay</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
                  <span className="text-gray-300 text-sm">CinetPay</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
                  <span className="text-gray-300 text-sm">Paystack</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-purple-500 rounded mr-2"></div>
                  <span className="text-gray-300 text-sm">Flutterwave</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Competitors Analysis */}
        <motion.div className="grid lg:grid-cols-3 gap-8 mb-16" initial={{
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
          {competitors.map((competitor, index) => <Card key={index} className={`bg-white/5 backdrop-blur-sm border-white/10 ${competitor.color} relative overflow-hidden`}>
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-white mb-2">{competitor.name}</h3>
                  <div className="text-gray-400 text-sm mb-3">{competitor.country}</div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-senepay-gold font-bold">{competitor.funding}</div>
                      <div className="text-gray-400 text-xs">Levée</div>
                    </div>
                    <div>
                      <div className="text-senepay-green font-bold">{competitor.merchants}</div>
                      <div className="text-gray-400 text-xs">Marchands</div>
                    </div>
                  </div>
                  <div className="mt-2">
                    <Badge className="bg-white/10 text-gray-300 border-white/20">
                      {competitor.coverage}
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-white font-semibold text-sm">Points Faibles:</h4>
                  {competitor.weaknesses.map((weakness, idx) => <div key={idx} className="flex items-center text-gray-300 text-sm">
                      <div className="w-1.5 h-1.5 bg-red-400 rounded-full mr-2"></div>
                      {weakness}
                    </div>)}
                </div>
              </CardContent>
            </Card>)}
        </motion.div>

        {/* SenePay Advantages */}
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
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Nos Avantages <span className="text-senepay-gold">Concurrentiels</span>
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => <motion.div key={index} whileHover={{
            scale: 1.02
          }} className="relative overflow-hidden">
                <Card className="bg-gradient-to-br from-white/5 to-white/10 border-white/10 backdrop-blur-sm h-full">
                  <CardContent className="p-6 text-center">
                    <advantage.icon className={`w-12 h-12 ${advantage.color} mx-auto mb-4`} />
                    <h4 className="text-lg font-bold mb-3 text-slate-950">{advantage.title}</h4>
                    <p className="text-sm leading-relaxed text-gray-950">{advantage.description}</p>
                  </CardContent>
                </Card>
              </motion.div>)}
          </div>
        </motion.div>

        {/* Market Position Summary */}
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
              <h3 className="text-2xl font-bold mb-4 text-gray-950">
                Position Concurrentielle Unique
              </h3>
              <p className="text-lg leading-relaxed mb-6 text-gray-950">
                SenePay est le <span className="text-senepay-gold font-semibold">seul acteur</span> à combiner 
                une connaissance approfondie du marché sénégalais, une technologie de pointe, 
                et un modèle économique optimisé pour l'Afrique de l'Ouest.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-senepay-gold mb-1">100%</div>
                  <div className="text-gray-300 text-sm">Couverture Locale</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-senepay-green mb-1">50%</div>
                  <div className="text-gray-300 text-sm">Moins Cher</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-senepay-orange mb-1">5min</div>
                  <div className="text-gray-300 text-sm">Intégration</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>;
};
export default CompetitiveAnalysis;