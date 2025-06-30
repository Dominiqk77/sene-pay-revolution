
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Download, TrendingUp, Globe, Zap, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const InvestorHero = () => {
  const handleDownloadPitchDeck = () => {
    // Logic to download pitch deck
    console.log('Downloading pitch deck...');
  };

  const scrollToOpportunity = () => {
    document.getElementById('market-opportunity')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient Animations */}
      <div className="absolute inset-0 bg-gradient-to-br from-senepay-dark via-gray-900 to-black">
        <div className="absolute inset-0 bg-gradient-to-r from-senepay-gold/10 via-senepay-orange/5 to-senepay-green/10 animate-pulse" />
      </div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-senepay-gold/30 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Premium Badges */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge className="bg-senepay-gold/20 text-senepay-gold border-senepay-gold/30 text-sm font-semibold">
            <TrendingUp className="w-4 h-4 mr-2" />
            Croissance 450% YoY
          </Badge>
          <Badge className="bg-senepay-green/20 text-senepay-green border-senepay-green/30 text-sm font-semibold">
            <Shield className="w-4 h-4 mr-2" />
            PCI DSS Compliant
          </Badge>
          <Badge className="bg-senepay-orange/20 text-senepay-orange border-senepay-orange/30 text-sm font-semibold">
            <Globe className="w-4 h-4 mr-2" />
            8 Pays CEDEAO
          </Badge>
        </motion.div>

        {/* Main Title */}
        <motion.h1 
          className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="text-white">Investissez dans</span>
          <br />
          <span className="gradient-text bg-gradient-to-r from-senepay-gold via-senepay-orange to-senepay-green bg-clip-text text-transparent">
            l'avenir des paiements
          </span>
          <br />
          <span className="text-white">africains</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          SenePay révolutionne l'e-commerce africain avec la première API de paiement 
          qui connecte <span className="text-senepay-gold font-semibold">tous les moyens de paiement locaux</span> 
          en une seule intégration. Marché TAM de <span className="text-senepay-green font-semibold">$25B+</span> 
          avec seulement 11% de pénétration.
        </motion.p>

        {/* Key Metrics */}
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-senepay-gold mb-2">$25M</div>
            <div className="text-gray-400 text-sm">ARR Objectif 2026</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-senepay-green mb-2">15K+</div>
            <div className="text-gray-400 text-sm">Marchands Cibles</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-senepay-orange mb-2">8</div>
            <div className="text-gray-400 text-sm">Pays CEDEAO</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-senepay-gold mb-2">2.3%</div>
            <div className="text-gray-400 text-sm">Commission Moyenne</div>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Button 
            onClick={handleDownloadPitchDeck}
            className="bg-gradient-to-r from-senepay-gold to-senepay-orange hover:from-senepay-orange hover:to-senepay-gold text-white font-semibold px-8 py-4 rounded-xl text-lg shadow-2xl hover:shadow-senepay-gold/25 transition-all duration-300 transform hover:scale-105"
          >
            <Download className="w-5 h-5 mr-3" />
            Télécharger le Pitch Deck
          </Button>
          <Button 
            variant="outline"
            onClick={scrollToOpportunity}
            className="border-2 border-senepay-green text-senepay-green hover:bg-senepay-green hover:text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all duration-300"
          >
            <Zap className="w-5 h-5 mr-3" />
            Découvrir l'Opportunité
          </Button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="animate-bounce cursor-pointer"
          onClick={scrollToOpportunity}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <ArrowDown className="w-8 h-8 text-senepay-gold mx-auto" />
        </motion.div>
      </div>
    </section>
  );
};

export default InvestorHero;
