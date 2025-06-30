import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { TrendingUp, Globe, Target, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
const MarketOpportunity = () => {
  // Market size data
  const marketSizeData = [{
    name: 'TAM',
    value: 25000,
    color: '#F59E0B',
    description: 'Total Addressable Market'
  }, {
    name: 'SAM',
    value: 8500,
    color: '#EA580C',
    description: 'Serviceable Addressable Market'
  }, {
    name: 'SOM',
    value: 2200,
    color: '#059669',
    description: 'Serviceable Obtainable Market'
  }];

  // Growth projection data
  const growthData = [{
    year: '2024',
    senepay: 0.5,
    market: 180,
    penetration: 0.3
  }, {
    year: '2025',
    senepay: 4.2,
    market: 290,
    penetration: 1.4
  }, {
    year: '2026',
    senepay: 25.8,
    market: 450,
    penetration: 5.7
  }, {
    year: '2027',
    senepay: 68.5,
    market: 680,
    penetration: 10.1
  }, {
    year: '2028',
    senepay: 145.2,
    market: 980,
    penetration: 14.8
  }];

  // Regional opportunity data
  const regionalData = [{
    name: 'Sénégal',
    merchants: 8500,
    volume: 180,
    penetration: 11
  }, {
    name: 'Côte d\'Ivoire',
    merchants: 12200,
    volume: 320,
    penetration: 8
  }, {
    name: 'Mali',
    merchants: 4800,
    volume: 95,
    penetration: 5
  }, {
    name: 'Burkina Faso',
    merchants: 3200,
    volume: 65,
    penetration: 4
  }, {
    name: 'Niger',
    merchants: 2100,
    volume: 42,
    penetration: 3
  }, {
    name: 'Guinée',
    merchants: 2800,
    volume: 58,
    penetration: 6
  }];
  const COLORS = ['#F59E0B', '#EA580C', '#059669', '#3B82F6', '#8B5CF6', '#EF4444'];
  return <section id="market-opportunity" className="py-20 bg-gradient-to-br from-gray-900 to-black">
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
            <span className="text-white">Une Opportunité de Marché</span>
            <br />
            <span className="gradient-text bg-gradient-to-r from-senepay-gold to-senepay-green bg-clip-text text-transparent">
              Exceptionnelle
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            L'Afrique de l'Ouest connaît une révolution digitale sans précédent. 
            89% des e-commerces n'acceptent pas les paiements en ligne, créant une opportunité massive.
          </p>
        </motion.div>

        {/* Market Size Visualization */}
        <motion.div className="grid lg:grid-cols-2 gap-12 mb-16" initial={{
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
              <CardTitle className="text-white flex items-center">
                <Target className="w-6 h-6 mr-3 text-senepay-gold" />
                Taille du Marché (Millions USD)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={marketSizeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="name" stroke="#fff" />
                  <YAxis stroke="#fff" />
                  <Tooltip contentStyle={{
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px'
                }} />
                  <Bar dataKey="value" fill="#F59E0B" radius={8} />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {marketSizeData.map((item, index) => <div key={index} className="flex justify-between items-center text-sm">
                    <span className="text-gray-300">{item.description}</span>
                    <span className="text-white font-semibold">${item.value}M</span>
                  </div>)}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <TrendingUp className="w-6 h-6 mr-3 text-senepay-green" />
                Projections de Croissance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={growthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="year" stroke="#fff" />
                  <YAxis stroke="#fff" />
                  <Tooltip contentStyle={{
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px'
                }} />
                  <Line type="monotone" dataKey="senepay" stroke="#F59E0B" strokeWidth={3} name="SenePay ARR (M$)" />
                  <Line type="monotone" dataKey="market" stroke="#059669" strokeWidth={3} name="Marché Total (M$)" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Regional Opportunity */}
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
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Globe className="w-6 h-6 mr-3 text-senepay-orange" />
                Opportunité par Pays CEDEAO
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={regionalData} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="volume" label={({
                    name,
                    percent
                  }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                      {regionalData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                
                <div className="space-y-4">
                  {regionalData.map((country, index) => <div key={index} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                      <div>
                        <div className="text-white font-semibold">{country.name}</div>
                        <div className="text-gray-400 text-sm">{country.merchants.toLocaleString()} marchands potentiels</div>
                      </div>
                      <div className="text-right">
                        <div className="text-senepay-gold font-bold">${country.volume}M</div>
                        <div className="text-gray-400 text-sm">{country.penetration}% pénétration</div>
                      </div>
                    </div>)}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Key Insights */}
        <motion.div className="grid md:grid-cols-3 gap-8" initial={{
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
          <Card className="bg-gradient-to-br from-senepay-gold/20 to-senepay-orange/20 border-senepay-gold/30">
            <CardContent className="p-6 text-center">
              <Zap className="w-12 h-12 text-senepay-gold mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">89%</h3>
              <p className="text-gray-950">des sites e-commerce sénégalais n'acceptent pas les paiements en ligne</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-senepay-green/20 to-senepay-orange/20 border-senepay-green/30">
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-12 h-12 text-senepay-green mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">45%</h3>
              <p className="text-zinc-950">de croissance annuelle du marché e-commerce ouest-africain</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-senepay-orange/20 to-senepay-gold/20 border-senepay-orange/30">
            <CardContent className="p-6 text-center">
              <Globe className="w-12 h-12 text-senepay-orange mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">25K+</h3>
              <p className="text-gray-950">e-commerces potentiels dans la zone CEDEAO d'ici 2026</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>;
};
export default MarketOpportunity;