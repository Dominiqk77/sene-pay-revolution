import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Twitter, Award, Users, Target, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
const TeamSection = () => {
  const teamMembers = [{
    name: 'Dominique Mbaye',
    role: 'CEO & Founder',
    experience: '15+ ans Fintech',
    description: 'Ex-Orange Money, expertise paiements mobiles Afrique',
    image: '/placeholder.svg',
    achievements: ['Scale Orange Money Sénégal', 'Expert réglementaire BCEAO', 'MBA Finance International'],
    linkedin: '#',
    twitter: '#'
  }, {
    name: 'Amadou Diallo',
    role: 'CTO & Co-Founder',
    experience: '12+ ans Tech',
    description: 'Architecte systèmes haute performance, ex-Microsoft',
    image: '/placeholder.svg',
    achievements: ['Lead Dev Microsoft Azure', 'Expert blockchain/crypto', 'MSc Computer Science MIT'],
    linkedin: '#',
    twitter: '#'
  }, {
    name: 'Fatou Sow',
    role: 'CPO & Co-Founder',
    experience: '10+ ans Product',
    description: 'Product strategy e-commerce, ex-Jumia Africa',
    image: '/placeholder.svg',
    achievements: ['Head Product Jumia Pay', 'UX/UI certifiée Google', 'Expert growth hacking'],
    linkedin: '#',
    twitter: '#'
  }];
  const advisors = [{
    name: 'Dr. Alassane Ba',
    role: 'Strategic Advisor',
    company: 'Ex-Directeur BCEAO',
    expertise: 'Réglementation financière'
  }, {
    name: 'Marie Diop',
    role: 'Tech Advisor',
    company: 'Ex-CTO Paystack',
    expertise: 'Scaling fintech Africa'
  }, {
    name: 'Omar Cissé',
    role: 'Business Advisor',
    company: 'CEO InTouch',
    expertise: 'Télécoms & Mobile Money'
  }];
  const keyStrengths = [{
    icon: Users,
    title: 'Équipe Complémentaire',
    description: 'Mix parfait entre expertise locale et vision internationale',
    color: 'text-senepay-gold'
  }, {
    icon: Target,
    title: 'Track Record Prouvé',
    description: 'Succès démontrés dans fintech, paiements mobiles et e-commerce',
    color: 'text-senepay-orange'
  }, {
    icon: Award,
    title: 'Réseau Stratégique',
    description: 'Connexions directes avec régulateurs, opérateurs et investisseurs',
    color: 'text-senepay-green'
  }, {
    icon: Zap,
    title: 'Exécution Rapide',
    description: 'Capacité prouvée à livrer des solutions complexes rapidement',
    color: 'text-blue-400'
  }];
  return <section className="py-20 bg-gradient-to-br from-gray-900 via-black to-senepay-dark">
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
            <span className="text-white">Équipe de</span>
            <br />
            <span className="gradient-text bg-gradient-to-r from-senepay-gold to-senepay-orange bg-clip-text text-transparent">
              Champions
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Une équipe exceptionnelle avec l'expertise technique, la connaissance du marché 
            et le réseau nécessaires pour révolutionner les paiements en Afrique de l'Ouest.
          </p>
        </motion.div>

        {/* Core Team */}
        <motion.div className="mb-20" initial={{
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
            Équipe <span className="text-senepay-gold">Fondatrice</span>
          </h3>
          <div className="grid lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => <motion.div key={index} whileHover={{
            scale: 1.02
          }} className="relative overflow-hidden">
                <Card className="bg-gradient-to-br from-white/5 to-white/10 border-white/10 backdrop-blur-sm h-full">
                  <CardContent className="p-6 text-center">
                    {/* Profile Image */}
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-senepay-gold to-senepay-orange p-1">
                      <div className="w-full h-full rounded-full bg-white/10 flex items-center justify-center">
                        <Users className="w-12 h-12 text-white" />
                      </div>
                    </div>
                    
                    {/* Member Info */}
                    <h4 className="text-xl font-bold text-white mb-2">{member.name}</h4>
                    <div className="text-senepay-gold font-semibold mb-1">{member.role}</div>
                    <Badge className="bg-senepay-green/20 text-senepay-green border-senepay-green/30 mb-3">
                      {member.experience}
                    </Badge>
                    <p className="text-gray-300 text-sm mb-4 leading-relaxed">{member.description}</p>
                    
                    {/* Achievements */}
                    <div className="space-y-2 mb-4">
                      {member.achievements.map((achievement, idx) => <div key={idx} className="flex items-center text-gray-300 text-sm">
                          <div className="w-1.5 h-1.5 bg-senepay-gold rounded-full mr-2"></div>
                          {achievement}
                        </div>)}
                    </div>
                    
                    {/* Social Links */}
                    <div className="flex justify-center space-x-4">
                      <a href={member.linkedin} className="text-gray-400 hover:text-senepay-gold transition-colors">
                        <Linkedin className="w-5 h-5" />
                      </a>
                      <a href={member.twitter} className="text-gray-400 hover:text-senepay-gold transition-colors">
                        <Twitter className="w-5 h-5" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>)}
          </div>
        </motion.div>

        {/* Advisors */}
        <motion.div className="mb-20" initial={{
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
            Conseillers <span className="text-senepay-green">Stratégiques</span>
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {advisors.map((advisor, index) => <Card key={index} className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-senepay-green to-senepay-orange p-1">
                    <div className="w-full h-full rounded-full bg-white/10 flex items-center justify-center">
                      <Award className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-1">{advisor.name}</h4>
                  <div className="text-senepay-gold text-sm mb-1">{advisor.role}</div>
                  <div className="text-gray-400 text-sm mb-2">{advisor.company}</div>
                  <Badge className="bg-white/10 text-gray-300 border-white/20 text-xs">
                    {advisor.expertise}
                  </Badge>
                </CardContent>
              </Card>)}
          </div>
        </motion.div>

        {/* Key Strengths */}
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
            Forces <span className="text-senepay-orange">Clés</span>
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyStrengths.map((strength, index) => <motion.div key={index} whileHover={{
            scale: 1.05
          }} className="text-center">
                <Card className="bg-gradient-to-br from-white/5 to-white/10 border-white/10 backdrop-blur-sm h-full">
                  <CardContent className="p-6">
                    <strength.icon className={`w-12 h-12 ${strength.color} mx-auto mb-4`} />
                    <h4 className="text-lg font-bold mb-3 text-blue-600">{strength.title}</h4>
                    <p className="text-sm leading-relaxed text-zinc-950">{strength.description}</p>
                  </CardContent>
                </Card>
              </motion.div>)}
          </div>
        </motion.div>

        {/* Vision Statement */}
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
              <h3 className="text-2xl font-bold mb-4 text-green-600">
                Notre Vision 2030
              </h3>
              <p className="text-lg leading-relaxed text-slate-950">
                Faire de SenePay <span className="text-senepay-gold font-semibold">la référence</span> des 
                paiements digitaux en Afrique de l'Ouest, en connectant plus de 
                <span className="text-senepay-green font-semibold"> 50,000 marchands</span> dans 
                <span className="text-senepay-orange font-semibold"> 15 pays</span> et en traitant plus de 
                <span className="text-senepay-gold font-semibold"> $5 milliards</span> de transactions annuelles.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>;
};
export default TeamSection;