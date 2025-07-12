
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InvestorHero from '@/components/investors/InvestorHero';
import MarketOpportunity from '@/components/investors/MarketOpportunity';
import TractionMetrics from '@/components/investors/TractionMetrics';

import FundingRequest from '@/components/investors/FundingRequest';
import InvestorForm from '@/components/investors/InvestorForm';
import FinancialProjections from '@/components/investors/FinancialProjections';
import CompetitiveAnalysis from '@/components/investors/CompetitiveAnalysis';
import PartnershipsSection from '@/components/investors/PartnershipsSection';

const Investors = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-senepay-dark via-gray-900 to-black">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section Premium */}
        <InvestorHero />
        
        {/* Market Opportunity */}
        <MarketOpportunity />
        
        {/* Traction & Performance */}
        <TractionMetrics />
        
        {/* Financial Projections */}
        <FinancialProjections />
        
        {/* Competitive Analysis */}
        <CompetitiveAnalysis />
        
        {/* Strategic Partnerships */}
        <PartnershipsSection />
        
        
        {/* Funding Request */}
        <FundingRequest />
        
        {/* Lead Generation Form */}
        <InvestorForm />
      </main>
      
      <Footer />
    </div>
  );
};

export default Investors;
