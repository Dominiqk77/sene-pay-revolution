import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Bar, Area, AreaChart } from 'recharts';
import { DollarSign, TrendingUp, PieChart, Calculator } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
const FinancialProjections = () => {
  // 5-year financial projections
  const financialData = [{
    year: '2024',
    revenue: 0.5,
    gross_profit: 0.42,
    net_profit: -0.18,
    merchants: 520,
    transactions: 8500,
    take_rate: 2.1
  }, {
    year: '2025',
    revenue: 4.2,
    gross_profit: 3.6,
    net_profit: 0.85,
    merchants: 1800,
    transactions: 42000,
    take_rate: 2.2
  }, {
    year: '2026',
    revenue: 25.8,
    gross_profit: 22.5,
    net_profit: 8.2,
    merchants: 7500,
    transactions: 280000,
    take_rate: 2.3
  }, {
    year: '2027',
    revenue: 68.5,
    gross_profit: 61.2,
    net_profit: 28.4,
    merchants: 15000,
    transactions: 650000,
    take_rate: 2.4
  }, {
    year: '2028',
    revenue: 145.2,
    gross_profit: 133.8,
    net_profit: 72.6,
    merchants: 25000,
    transactions: 1200000,
    take_rate: 2.5
  }];

  // Unit economics data
  const unitEconomics = [{
    metric: 'Customer Acquisition Cost (CAC)',
    value: '$35',
    trend: '-22%'
  }, {
    metric: 'Lifetime Value (LTV)',
    value: '$2,400',
    trend: '+45%'
  }, {
    metric: 'LTV/CAC Ratio',
    value: '68.6x',
    trend: '+85%'
  }, {
    metric: 'Payback Period',
    value: '2.1 mois',
    trend: '-35%'
  }, {
    metric: 'Gross Margin',
    value: '92%',
    trend: '+3%'
  }, {
    metric: 'Monthly Churn Rate',
    value: '3%',
    trend: '-40%'
  }];

  // Funding scenarios
  const fundingScenarios = [{
    name: 'Série A Conservative',
    amount: '$2M',
    equity: '15%',
    valuation: '$13.3M',
    milestones: ['1,500 marchands', '$8M ARR', '3 pays'],
    color: 'from-blue-500/20 to-blue-600/20'
  }, {
    name: 'Série A Optimal',
    amount: '$5M',
    equity: '20%',
    valuation: '$25M',
    milestones: ['7,500 marchands', '$25M ARR', '8 pays CEDEAO'],
    color: 'from-senepay-gold/20 to-senepay-orange/20'
  }, {
    name: 'Série A Aggressive',
    amount: '$12M',
    equity: '25%',
    valuation: '$48M',
    milestones: ['15,000 marchands', '$68M ARR', 'Expansion Maghreb'],
    color: 'from-senepay-green/20 to-senepay-orange/20'
  }];
  return <section className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900">
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
            <span className="text-white">Projections Financières</span>
            <br />
            <span className="gradient-text bg-gradient-to-r from-senepay-gold to-senepay-green bg-clip-text text-transparent">
              Exceptionnelles
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Modèle économique éprouvé avec une trajectoire de profitabilité rapide 
            et des marges extraordinaires grâce à notre approche technologique.
          </p>
        </motion.div>

        {/* Revenue Projections Chart */}
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
              <CardTitle className="text-white flex items-center">
                <TrendingUp className="w-6 h-6 mr-3 text-senepay-gold" />
                Projections Revenus & Profitabilité (M$)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <ComposedChart data={financialData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="year" stroke="#fff" />
                  <YAxis stroke="#fff" />
                  <Tooltip contentStyle={{
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px'
                }} />
                  <Area type="monotone" dataKey="revenue" fill="url(#colorRevenue)" stroke="#F59E0B" strokeWidth={3} name="Revenus" />
                  <Line type="monotone" dataKey="gross_profit" stroke="#059669" strokeWidth={3} name="Profit Brut" />
                  <Line type="monotone" dataKey="net_profit" stroke="#EA580C" strokeWidth={3} name="Profit Net" />
                </ComposedChart>
              </ResponsiveContainer>
              
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mt-6">
                {financialData.map((year, index) => <div key={index} className="text-center p-3 bg-white/5 rounded-lg">
                    <div className="text-white font-bold text-lg">{year.year}</div>
                    <div className="text-senepay-gold text-sm">${year.revenue}M ARR</div>
                    <div className="text-gray-400 text-xs">{year.merchants.toLocaleString()} marchands</div>
                  </div>)}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Unit Economics */}
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
              <CardTitle className="text-white flex items-center">
                <Calculator className="w-6 h-6 mr-3 text-senepay-green" />
                Unit Economics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {unitEconomics.map((item, index) => <div key={index} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                    <div className="text-gray-300">{item.metric}</div>
                    <div className="flex items-center space-x-3">
                      <span className="text-white font-bold">{item.value}</span>
                      <Badge className={`${item.trend.startsWith('+') ? 'text-senepay-green' : 'text-senepay-orange'} bg-transparent border-current text-xs`}>
                        {item.trend}
                      </Badge>
                    </div>
                  </div>)}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <PieChart className="w-6 h-6 mr-3 text-senepay-orange" />
                Take Rate Evolution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={financialData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="year" stroke="#fff" />
                  <YAxis stroke="#fff" domain={[2.0, 2.6]} />
                  <Tooltip contentStyle={{
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px'
                }} />
                  <Line type="monotone" dataKey="take_rate" stroke="#EA580C" strokeWidth={4} name="Take Rate (%)" />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-4 text-center">
                <p className="text-gray-300 text-sm">
                  Take rate optimisé grâce à l'amélioration continue de la valeur ajoutée
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Funding Scenarios */}
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
          <h3 className="text-3xl font-bold text-white text-center mb-8">Scénarios de Financement</h3>
          <div className="grid lg:grid-cols-3 gap-8">
            {fundingScenarios.map((scenario, index) => <motion.div key={index} whileHover={{
            scale: 1.02
          }} className="relative overflow-hidden">
                <Card className={`bg-gradient-to-br ${scenario.color} border-white/10 backdrop-blur-sm h-full`}>
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <h4 className="text-xl font-bold mb-2 text-zinc-950">{scenario.name}</h4>
                      <div className="text-3xl font-bold text-senepay-gold mb-1">{scenario.amount}</div>
                      <div className="text-gray-300">{scenario.equity} equity</div>
                      <div className="text-sm text-gray-400">Valorisation: {scenario.valuation}</div>
                    </div>
                    
                    <div className="space-y-3">
                      <h5 className="font-semibold text-zinc-950">Milestones Clés:</h5>
                      {scenario.milestones.map((milestone, idx) => <div key={idx} className="flex items-center text-gray-300 text-sm">
                          <div className="w-2 h-2 bg-senepay-gold rounded-full mr-3"></div>
                          {milestone}
                        </div>)}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>)}
          </div>
        </motion.div>

        {/* Key Financial Metrics Summary */}
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
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-senepay-gold/20 to-senepay-orange/20 p-6 rounded-2xl">
              <DollarSign className="w-8 h-8 text-senepay-gold mx-auto mb-3" />
              <div className="text-2xl font-bold text-white">$145M</div>
              <div className="text-gray-300 text-sm">ARR 2028</div>
            </div>
            <div className="bg-gradient-to-br from-senepay-green/20 to-senepay-gold/20 p-6 rounded-2xl">
              <TrendingUp className="w-8 h-8 text-senepay-green mx-auto mb-3" />
              <div className="text-2xl font-bold text-white">50%</div>
              <div className="text-gray-300 text-sm">Marge Nette 2028</div>
            </div>
            <div className="bg-gradient-to-br from-senepay-orange/20 to-senepay-green/20 p-6 rounded-2xl">
              <Calculator className="w-8 h-8 text-senepay-orange mx-auto mb-3" />
              <div className="text-2xl font-bold text-white">68.6x</div>
              <div className="text-gray-300 text-sm">LTV/CAC Ratio</div>
            </div>
            <div className="bg-gradient-to-br from-blue-500/20 to-senepay-gold/20 p-6 rounded-2xl">
              <PieChart className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white">2.1</div>
              <div className="text-gray-300 text-sm">Mois Payback</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>;
};
export default FinancialProjections;