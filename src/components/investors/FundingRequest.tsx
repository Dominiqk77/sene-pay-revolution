import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, Globe, Zap, Shield, Users, Target, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
const FundingRequest = () => {
  const fundingRounds = [{
    round: 'Série A',
    amount: '$2.5M',
    status: 'En cours',
    investors: 'Business Angels + VC',
    timeline: 'Q1 2024',
    color: 'border-senepay-gold/50 bg-senepay-gold/10'
  }, {
    round: 'Série B',
    amount: '$8M',
    status: 'Planifiée',
    investors: 'VCs Internationaux',
    timeline: 'Q4 2024',
    color: 'border-senepay-orange/50 bg-senepay-orange/10'
  }, {
    round: 'Série C',
    amount: '$25M',
    status: 'Vision',
    investors: 'Growth Equity',
    timeline: '2026',
    color: 'border-senepay-green/50 bg-senepay-green/10'
  }];
  const fundAllocation = [{
    category: 'Développement Produit',
    percentage: 40,
    amount: '$1M',
    details: ['API v2.0 avancée', 'IA anti-fraude', 'Mobile SDKs', 'Blockchain integration'],
    icon: Zap,
    color: 'text-senepay-gold'
  }, {
    category: 'Expansion Marché',
    percentage: 30,
    amount: '$750K',
    details: ['Mali, Burkina, Niger', 'Équipes locales', 'Partenariats opérateurs', 'Marketing digital'],
    icon: Globe,
    color: 'text-senepay-orange'
  }, {
    category: 'Équipe & Talent',
    percentage: 20,
    amount: '$500K',
    details: ['Tech leads senior', 'Sales managers', 'Customer success', 'Compliance officers'],
    icon: Users,
    color: 'text-senepay-green'
  }, {
    category: 'Conformité & Sécurité',
    percentage: 10,
    amount: '$250K',
    details: ['Certifications PCI DSS', 'Audits sécurité', 'Legal compliance', 'Insurance coverage'],
    icon: Shield,
    color: 'text-blue-400'
  }];
  const milestones = [{
    timeline: 'Q1 2024',
    title: 'Product Market Fit',
    targets: ['500 marchands actifs', '$5M volume mensuel', 'Break-even opérationnel'],
    status: 'current'
  }, {
    timeline: 'Q2 2024',
    title: 'Expansion Régionale',
    targets: ['Lancement Mali', '1,500 marchands', '$15M volume mensuel'],
    status: 'upcoming'
  }, {
    timeline: 'Q4 2024',
    title: 'Leadership CEDEAO',
    targets: ['4 pays couverts', '5,000 marchands', '$50M volume mensuel'],
    status: 'planned'
  }, {
    timeline: '2025',
    title: 'Rentabilité & Scale',
    targets: ['15,000 marchands', '$200M volume mensuel', 'Profitabilité nette'],
    status: 'vision'
  }];
  const investorBenefits = [{
    title: 'ROI Exceptionnel',
    description: 'Projections 50x sur 5 ans avec expansion CEDEAO',
    icon: TrendingUp,
    highlight: '5,000% ROI'
  }, {
    title: 'First Mover Advantage',
    description: 'Première API complète paiements Sénégal/Mali',
    icon: Target,
    highlight: 'Blue Ocean'
  }, {
    title: 'Marché Massif',
    description: '$25B TAM avec 11% de pénétration actuelle',
    icon: Globe,
    highlight: '$25B TAM'
  }, {
    title: 'Équipe Exceptionnelle',
    description: 'Track record prouvé en fintech et paiements mobiles',
    icon: Award,
    highlight: 'Dream Team'
  }];
  return <section className="py-20 bg-gradient-to-br from-black via-senepay-dark to-gray-900">
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
            <span className="text-white">Demande de</span>
            <br />
            <span className="gradient-text bg-gradient-to-r from-senepay-gold to-senepay-orange bg-clip-text text-transparent">
              Financement
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Investissez dans la révolution des paiements africains. Une opportunité unique 
            de participer à la transformation de l'écosystème e-commerce ouest-africain.
          </p>
        </motion.div>

        {/* Funding Rounds */}
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
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Stratégie de <span className="text-senepay-gold">Levée</span>
          </h3>
          <div className="grid lg:grid-cols-3 gap-8">
            {fundingRounds.map((round, index) => <motion.div key={index} whileHover={{
            scale: 1.02
          }} className="relative overflow-hidden">
                <Card className={`${round.color} border backdrop-blur-sm h-full`}>
                  <CardHeader className="text-center">
                    <CardTitle className="text-white">{round.round}</CardTitle>
                    <div className="text-3xl font-bold text-senepay-gold">{round.amount}</div>
                  </CardHeader>
                  <CardContent className="text-center space-y-3">
                    <Badge className={round.status === 'En cours' ? 'bg-senepay-gold text-black' : round.status === 'Planifiée' ? 'bg-senepay-orange/20 text-senepay-orange border-senepay-orange/30' : 'bg-white/10 text-gray-300 border-white/20'}>
                      {round.status}
                    </Badge>
                    <div className="text-gray-300">
                      <div className="font-semibold">{round.investors}</div>
                      <div className="text-sm text-gray-400">{round.timeline}</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>)}
          </div>
        </motion.div>

        {/* Fund Allocation */}
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
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Allocation des <span className="text-senepay-green">Fonds</span>
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {fundAllocation.map((allocation, index) => <Card key={index} className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <allocation.icon className={`w-8 h-8 ${allocation.color} mr-3`} />
                      <div>
                        <h4 className="text-lg font-bold text-white">{allocation.category}</h4>
                        <div className="text-senepay-gold font-semibold">{allocation.amount}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">{allocation.percentage}%</div>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                    <div className={`h-2 rounded-full bg-gradient-to-r ${allocation.color.includes('gold') ? 'from-senepay-gold to-senepay-orange' : allocation.color.includes('orange') ? 'from-senepay-orange to-senepay-green' : allocation.color.includes('green') ? 'from-senepay-green to-blue-400' : 'from-blue-400 to-purple-400'}`} style={{
                  width: `${allocation.percentage}%`
                }}></div>
                  </div>
                  
                  {/* Details */}
                  <div className="space-y-2">
                    {allocation.details.map((detail, idx) => <div key={idx} className="flex items-center text-gray-300 text-sm">
                        <div className="w-1.5 h-1.5 bg-senepay-gold rounded-full mr-2"></div>
                        {detail}
                      </div>)}
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </motion.div>

        {/* Milestones & Roadmap */}
        <motion.div className="mb-16" initial={{
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
            Roadmap & <span className="text-senepay-orange">Milestones</span>
          </h3>
          <div className="space-y-8">
            {milestones.map((milestone, index) => <motion.div key={index} className="relative" whileHover={{
            scale: 1.01
          }}>
                <Card className={`border-l-4 ${milestone.status === 'current' ? 'border-l-senepay-gold bg-senepay-gold/5' : milestone.status === 'upcoming' ? 'border-l-senepay-orange bg-senepay-orange/5' : milestone.status === 'planned' ? 'border-l-senepay-green bg-senepay-green/5' : 'border-l-blue-400 bg-blue-400/5'} bg-white/5 backdrop-blur-sm border-white/10`}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                      <div>
                        <Badge className={`mb-2 ${milestone.status === 'current' ? 'bg-senepay-gold text-black' : milestone.status === 'upcoming' ? 'bg-senepay-orange/20 text-senepay-orange border-senepay-orange/30' : milestone.status === 'planned' ? 'bg-senepay-green/20 text-senepay-green border-senepay-green/30' : 'bg-blue-400/20 text-blue-400 border-blue-400/30'}`}>
                          {milestone.timeline}
                        </Badge>
                        <h4 className="text-xl font-bold text-white">{milestone.title}</h4>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      {milestone.targets.map((target, idx) => <div key={idx} className="flex items-center text-gray-300">
                          <Target className="w-4 h-4 text-senepay-gold mr-2" />
                          {target}
                        </div>)}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>)}
          </div>
        </motion.div>

        {/* Investor Benefits */}
        <motion.div className="mb-16" initial={{
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
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Pourquoi <span className="text-senepay-gold">Investir</span> ?
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {investorBenefits.map((benefit, index) => <motion.div key={index} whileHover={{
            scale: 1.05
          }} className="text-center">
                <Card className="bg-gradient-to-br from-white/5 to-white/10 border-white/10 backdrop-blur-sm h-full">
                  <CardContent className="p-6">
                    <benefit.icon className="w-12 h-12 text-senepay-gold mx-auto mb-4" />
                    <div className="text-2xl font-bold text-senepay-orange mb-2">{benefit.highlight}</div>
                    <h4 className="text-lg font-bold text-white mb-3">{benefit.title}</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>)}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div className="text-center" initial={{
        opacity: 0,
        y: 40
      }} whileInView={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8,
        delay: 1
      }} viewport={{
        once: true
      }}>
          <Card className="bg-gradient-to-br from-senepay-gold/10 via-senepay-orange/10 to-senepay-green/10 border-senepay-gold/30 max-w-4xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-3xl font-bold mb-4 text-orange-500">
                Rejoignez la Révolution
              </h3>
              <p className="text-lg leading-relaxed mb-8 text-zinc-950">
                Une opportunité unique d'investir dans <span className="text-senepay-gold font-semibold">la prochaine licorne fintech africaine</span>. 
                Marché en hypercroissance, équipe exceptionnelle, technologie disruptive.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-gradient-to-r from-senepay-gold to-senepay-orange hover:from-senepay-orange hover:to-senepay-gold text-white font-semibold px-8 py-4 rounded-xl text-lg">
                  <DollarSign className="w-5 h-5 mr-3" />
                  Investir Maintenant
                </Button>
                <Button variant="outline" className="border-2 border-senepay-green text-senepay-green hover:bg-senepay-green hover:text-white font-semibold px-8 py-4 rounded-xl text-lg">
                  Planifier un Call
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>;
};
export default FundingRequest;