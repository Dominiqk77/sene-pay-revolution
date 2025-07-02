import React from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, Users, DollarSign, Repeat, Award, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
const TractionMetrics = () => {
  // Revenue growth data
  const revenueData = [{
    month: 'Jan 2024',
    mrr: 2.5,
    arr: 30,
    transactions: 450
  }, {
    month: 'Fév 2024',
    mrr: 4.2,
    arr: 50,
    transactions: 680
  }, {
    month: 'Mar 2024',
    mrr: 7.8,
    arr: 94,
    transactions: 1200
  }, {
    month: 'Avr 2024',
    mrr: 12.5,
    arr: 150,
    transactions: 1850
  }, {
    month: 'Mai 2024',
    mrr: 18.3,
    arr: 220,
    transactions: 2400
  }, {
    month: 'Jun 2024',
    mrr: 28.7,
    arr: 344,
    transactions: 3200
  }];

  // User acquisition data
  const userGrowthData = [{
    month: 'Q1 2024',
    merchants: 45,
    volume: 125000,
    retention: 92
  }, {
    month: 'Q2 2024',
    merchants: 128,
    volume: 340000,
    retention: 94
  }, {
    month: 'Q3 2024',
    merchants: 285,
    volume: 750000,
    retention: 96
  }, {
    month: 'Q4 2024',
    merchants: 520,
    volume: 1200000,
    retention: 97
  }];

  // Payment methods performance
  const paymentMethodsData = [{
    method: 'Orange Money',
    volume: 45,
    transactions: 2400,
    growth: 125
  }, {
    method: 'Wave',
    volume: 32,
    transactions: 1800,
    growth: 98
  }, {
    method: 'Free Money',
    volume: 18,
    transactions: 950,
    growth: 87
  }, {
    method: 'Cartes Bancaires',
    volume: 28,
    transactions: 1200,
    growth: 76
  }, {
    method: 'Wizall',
    volume: 12,
    transactions: 650,
    growth: 65
  }];
  const kpiCards = [{
    title: 'MRR Actuel',
    value: '$28.7K',
    growth: '+340%',
    icon: DollarSign,
    color: 'text-senepay-gold',
    bgColor: 'from-senepay-gold/20'
  }, {
    title: 'Marchands Actifs',
    value: '520+',
    growth: '+1,056%',
    icon: Users,
    color: 'text-senepay-green',
    bgColor: 'from-senepay-green/20'
  }, {
    title: 'Taux de Rétention',
    value: '97%',
    growth: '+5.4%',
    icon: Repeat,
    color: 'text-senepay-orange',
    bgColor: 'from-senepay-orange/20'
  }, {
    title: 'NPS Score',
    value: '74',
    growth: '+12 pts',
    icon: Award,
    color: 'text-blue-400',
    bgColor: 'from-blue-400/20'
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
            <span className="text-gray-50">Traction &</span>
            <br />
            <span className="gradient-text bg-gradient-to-r from-senepay-gold to-senepay-orange bg-clip-text text-transparent">
              Performance Exceptionnelle
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Une croissance explosive portée par l'adoption massive des marchands 
            et l'excellence de notre plateforme technologique.
          </p>
        </motion.div>

        {/* KPI Cards */}
        <motion.div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16" initial={{
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
          {kpiCards.map((kpi, index) => <motion.div key={index} whileHover={{
          scale: 1.05
        }} className="relative overflow-hidden">
              <Card className={`bg-gradient-to-br ${kpi.bgColor} to-transparent border-white/10 backdrop-blur-sm`}>
                <CardContent className="p-6 text-center">
                  <kpi.icon className={`w-8 h-8 ${kpi.color} mx-auto mb-3`} />
                  <div className="text-3xl font-bold text-black mb-1">{kpi.value}</div>
                  <div className="text-sm text-gray-400 mb-2">{kpi.title}</div>
                  <Badge className={`${kpi.color} bg-transparent border-current`}>
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {kpi.growth}
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>)}
        </motion.div>

        {/* Revenue Growth Chart */}
        <motion.div className="grid lg:grid-cols-2 gap-8 mb-16" initial={{
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
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className="text-black flex items-center">
                <TrendingUp className="w-6 h-6 mr-3 text-senepay-gold" />
                Croissance des Revenus (K$)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorMRR" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.1} />
                    </linearGradient>
                    <linearGradient id="colorARR" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#059669" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#059669" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="month" stroke="#000" fontSize={12} />
                   <YAxis stroke="#000" />
                  <Tooltip contentStyle={{
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px'
                }} />
                  <Area type="monotone" dataKey="mrr" stroke="#F59E0B" fillOpacity={1} fill="url(#colorMRR)" name="MRR" />
                  <Area type="monotone" dataKey="arr" stroke="#059669" fillOpacity={1} fill="url(#colorARR)" name="ARR" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className="text-black flex items-center">
                <Users className="w-6 h-6 mr-3 text-senepay-green" />
                Croissance Utilisateurs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="month" stroke="#000" />
                  <YAxis stroke="#000" />
                  <Tooltip contentStyle={{
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px'
                }} />
                  <Bar dataKey="merchants" fill="#059669" radius={4} name="Marchands" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Payment Methods Performance */}
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
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className="text-black flex items-center">
                <Zap className="w-6 h-6 mr-3 text-senepay-orange" />
                Performance par Méthode de Paiement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paymentMethodsData.map((method, index) => <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-3 h-3 rounded-full bg-senepay-gold"></div>
                      <div>
                        <div className="text-black font-semibold">{method.method}</div>
                        <div className="text-gray-400 text-sm">{method.transactions.toLocaleString()} transactions</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-senepay-gold font-bold">{method.volume}% volume</div>
                      <div className="text-senepay-green text-sm">+{method.growth}% croissance</div>
                    </div>
                  </div>)}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Success Stories */}
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
          <h3 className="text-2xl font-bold text-black mb-8">Témoignages Clients</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[{
            quote: "SenePay a transformé notre e-commerce. +340% de conversions en 3 mois.",
            author: "Amadou Ba",
            company: "Jumia Sénégal",
            growth: "+340%"
          }, {
            quote: "L'intégration la plus simple que j'ai jamais vue. 5 minutes chrono!",
            author: "Fatou Diop",
            company: "Kaymu Fashion",
            growth: "+280%"
          }, {
            quote: "Enfin une solution 100% adaptée au marché sénégalais. Révolutionnaire!",
            author: "Ousmane Sy",
            company: "Dakar Digital",
            growth: "+450%"
          }].map((testimonial, index) => <Card key={index} className="bg-gradient-to-br from-senepay-gold/10 to-senepay-green/10 border-senepay-gold/20">
                <CardContent className="p-6">
                  <div className="text-4xl text-senepay-gold mb-4">"</div>
                  <p className="mb-4 italic text-zinc-950">{testimonial.quote}</p>
                  <div className="text-black font-semibold">{testimonial.author}</div>
                  <div className="text-gray-400 text-sm">{testimonial.company}</div>
                  <Badge className="mt-2 bg-senepay-green/20 text-senepay-green border-senepay-green/30">
                    {testimonial.growth} revenus
                  </Badge>
                </CardContent>
              </Card>)}
          </div>
        </motion.div>
      </div>
    </section>;
};
export default TractionMetrics;