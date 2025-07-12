import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, User, Mail, Phone, Building, DollarSign, MessageSquare, Download, Calendar, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
const InvestorForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    title: '',
    investorType: '',
    investmentRange: '',
    timeline: '',
    interests: [] as string[],
    message: '',
    newsletter: false,
    meetingRequest: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    toast
  } = useToast();
  const investorTypes = ['Business Angel', 'Venture Capital', 'Private Equity', 'Family Office', 'Corporate Investor', 'Investment Bank', 'Autre'];
  const investmentRanges = ['$25K - $100K', '$100K - $500K', '$500K - $1M', '$1M - $5M', '$5M+', 'À discuter'];
  const timelines = ['Immédiat (< 1 mois)', 'Court terme (1-3 mois)', 'Moyen terme (3-6 mois)', 'Long terme (6+ mois)', 'En exploration'];
  const interestAreas = ['Fintech Afrique', 'Paiements mobiles', 'API Banking', 'E-commerce', 'Expansion CEDEAO', 'Technologie blockchain', 'IA/Machine Learning', 'Conformité réglementaire'];
  const documents = [{
    title: 'Executive Summary',
    description: 'Résumé exécutif 2 pages',
    size: '2.4 MB'
  }, {
    title: 'Pitch Deck Complet',
    description: 'Présentation investisseurs 24 slides',
    size: '8.7 MB'
  }, {
    title: 'Projections Financières',
    description: 'Modèle financier 5 ans',
    size: '1.2 MB'
  }, {
    title: 'Due Diligence Pack',
    description: 'Documentation complète',
    size: '15.3 MB'
  }];
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Investor form submitted:', formData);
      setIsSubmitted(true);
      toast({
        title: "Demande envoyée avec succès !",
        description: "Notre équipe vous contactera sous 24h."
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest) ? prev.interests.filter(i => i !== interest) : [...prev.interests, interest]
    }));
  };
  const handleDownload = (docTitle: string) => {
    let downloadUrl = '';
    let fileName = '';
    switch (docTitle) {
      case 'Pitch Deck Complet':
        downloadUrl = 'https://www.genspark.ai/aidrive/preview/sen_services_project/senepay_pitch_deck_series_a_20250625200942.pdf';
        fileName = 'SenePay_Pitch_Deck_Series_A.pdf';
        break;
      case 'Projections Financières':
        downloadUrl = 'https://www.genspark.ai/aidrive/preview/sen_services_project/senepay_modele_financier_projections.pdf';
        fileName = 'SenePay_Modele_Financier_Projections.pdf';
        break;
      default:
        toast({
          title: "Document non disponible",
          description: `${docTitle} sera disponible prochainement.`
        });
        return;
    }

    // Téléchargement automatique
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = fileName;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({
      title: "Téléchargement en cours",
      description: `${docTitle} téléchargé avec succès.`
    });
  };
  if (isSubmitted) {
    return <section className="py-20 bg-gradient-to-br from-senepay-dark via-black to-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="max-w-2xl mx-auto text-center" initial={{
          opacity: 0,
          scale: 0.8
        }} animate={{
          opacity: 1,
          scale: 1
        }} transition={{
          duration: 0.6
        }}>
            <Card className="bg-gradient-to-br from-senepay-green/10 to-senepay-gold/10 border-senepay-green/30">
              <CardContent className="p-12">
                <CheckCircle className="w-16 h-16 text-senepay-green mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-white mb-4">Merci pour votre intérêt !</h2>
                <p className="text-gray-300 text-lg mb-6">
                  Votre demande a été transmise à notre équipe. Nous vous contacterons 
                  sous 24h pour planifier un échange personnalisé.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={() => setIsSubmitted(false)} className="bg-senepay-gold hover:bg-senepay-orange text-white">
                    Nouvelle Demande
                  </Button>
                  <Button variant="outline" className="border-senepay-green text-senepay-green hover:bg-senepay-green hover:text-white">
                    <Calendar className="w-4 h-4 mr-2" />
                    Calendrier Direct
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>;
  }
  return <section id="investor-form" className="py-20 bg-gradient-to-br from-gray-900 via-senepay-dark to-black">
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
            <span className="text-white">Rejoignez nos</span>
            <br />
            <span className="gradient-text bg-gradient-to-r from-senepay-gold to-senepay-orange bg-clip-text text-transparent">
              Investisseurs
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Accédez aux documents confidentiels et planifiez un échange personnalisé 
            avec notre équipe pour découvrir cette opportunité d'investissement unique.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div initial={{
          opacity: 0,
          x: -40
        }} whileInView={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.8
        }} viewport={{
          once: true
        }}>
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <MessageSquare className="w-6 h-6 mr-3 text-senepay-gold" />
                  Demande d'Informations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Info */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <Input placeholder="Prénom" value={formData.firstName} onChange={e => setFormData({
                      ...formData,
                      firstName: e.target.value
                    })} className="pl-10 bg-white/5 border-white/20 text-white placeholder-gray-400" required />
                    </div>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <Input placeholder="Nom" value={formData.lastName} onChange={e => setFormData({
                      ...formData,
                      lastName: e.target.value
                    })} className="pl-10 bg-white/5 border-white/20 text-white placeholder-gray-400" required />
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <Input type="email" placeholder="Email professionnel" value={formData.email} onChange={e => setFormData({
                      ...formData,
                      email: e.target.value
                    })} className="pl-10 bg-white/5 border-white/20 text-white placeholder-gray-400" required />
                    </div>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <Input placeholder="Téléphone" value={formData.phone} onChange={e => setFormData({
                      ...formData,
                      phone: e.target.value
                    })} className="pl-10 bg-white/5 border-white/20 text-white placeholder-gray-400" />
                    </div>
                  </div>

                  {/* Company Info */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="relative">
                      <Building className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <Input placeholder="Société/Fonds" value={formData.company} onChange={e => setFormData({
                      ...formData,
                      company: e.target.value
                    })} className="pl-10 bg-white/5 border-white/20 text-white placeholder-gray-400" required />
                    </div>
                    <Input placeholder="Titre/Position" value={formData.title} onChange={e => setFormData({
                    ...formData,
                    title: e.target.value
                  })} className="bg-white/5 border-white/20 text-white placeholder-gray-400" />
                  </div>

                  {/* Investment Details */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <Select onValueChange={value => setFormData({
                    ...formData,
                    investorType: value
                  })}>
                      <SelectTrigger className="bg-white/5 border-white/20 text-white">
                        <SelectValue placeholder="Type d'investisseur" />
                      </SelectTrigger>
                      <SelectContent>
                        {investorTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                      </SelectContent>
                    </Select>

                    <Select onValueChange={value => setFormData({
                    ...formData,
                    investmentRange: value
                  })}>
                      <SelectTrigger className="bg-white/5 border-white/20 text-white">
                        <SelectValue placeholder="Ticket d'investissement" />
                      </SelectTrigger>
                      <SelectContent>
                        {investmentRanges.map(range => <SelectItem key={range} value={range}>{range}</SelectItem>)}
                      </SelectContent>
                    </Select>

                    <Select onValueChange={value => setFormData({
                    ...formData,
                    timeline: value
                  })}>
                      <SelectTrigger className="bg-white/5 border-white/20 text-white">
                        <SelectValue placeholder="Timeline" />
                      </SelectTrigger>
                      <SelectContent>
                        {timelines.map(timeline => <SelectItem key={timeline} value={timeline}>{timeline}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Areas of Interest */}
                  <div>
                    <label className="text-white font-semibold mb-3 block">
                      Domaines d'intérêt (sélection multiple)
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {interestAreas.map(interest => <div key={interest} className="flex items-center space-x-2">
                          <Checkbox id={interest} checked={formData.interests.includes(interest)} onCheckedChange={() => handleInterestToggle(interest)} className="border-white/20" />
                          <label htmlFor={interest} className="text-sm text-gray-300 cursor-pointer">
                            {interest}
                          </label>
                        </div>)}
                    </div>
                  </div>

                  {/* Message */}
                  <Textarea placeholder="Message ou questions spécifiques..." value={formData.message} onChange={e => setFormData({
                  ...formData,
                  message: e.target.value
                })} className="bg-white/5 border-white/20 text-white placeholder-gray-400 min-h-[100px]" />

                  {/* Checkboxes */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="newsletter" checked={formData.newsletter} onCheckedChange={checked => setFormData({
                      ...formData,
                      newsletter: checked as boolean
                    })} className="border-white/20" />
                      <label htmlFor="newsletter" className="text-sm text-gray-300">
                        Recevoir les updates investisseurs mensuelles
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="meeting" checked={formData.meetingRequest} onCheckedChange={checked => setFormData({
                      ...formData,
                      meetingRequest: checked as boolean
                    })} className="border-white/20" />
                      <label htmlFor="meeting" className="text-sm text-gray-300">
                        Demander un rendez-vous de présentation (30 min)
                      </label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-senepay-gold to-senepay-orange hover:from-senepay-orange hover:to-senepay-gold text-white font-semibold py-3">
                    {isSubmitting ? <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Envoi en cours...
                      </div> : <>
                        <Send className="w-5 h-5 mr-2" />
                        Envoyer la Demande
                      </>}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Documents & Info */}
          <motion.div initial={{
          opacity: 0,
          x: 40
        }} whileInView={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.8,
          delay: 0.2
        }} viewport={{
          once: true
        }} className="space-y-8">
            {/* Documents disponibles */}
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Download className="w-6 h-6 mr-3 text-senepay-green" />
                  Documents Investisseurs
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {documents.map((doc, index) => <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                    <div>
                      <h4 className="text-white font-semibold">{doc.title}</h4>
                      <p className="text-gray-400 text-sm">{doc.description}</p>
                      <Badge className="mt-1 bg-senepay-gold/20 text-senepay-gold border-senepay-gold/30 text-xs">
                        {doc.size}
                      </Badge>
                    </div>
                    <Button size="sm" onClick={() => handleDownload(doc.title)} className="bg-senepay-green hover:bg-senepay-green/80 text-white">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>)}
              </CardContent>
            </Card>

            {/* Contact rapide */}
            <Card className="bg-gradient-to-br from-senepay-gold/10 to-senepay-orange/10 border-senepay-gold/30">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold mb-3 text-zinc-950">Contact Direct</h3>
                <p className="mb-4 text-gray-950">
                  Pour les investisseurs qualifiés, contactez directement notre équipe :
                </p>
                <div className="space-y-2 text-sm">
                  <div className="text-senepay-gold">investors@senepay.com</div>
                  <div className="text-senepay-green">+221 77 656 40 42 - 77 462 75 03</div>
                </div>
                <Button className="mt-4 bg-senepay-gold hover:bg-senepay-orange text-white">
                  <Calendar className="w-4 h-4 mr-2" />
                  Planifier un Call
                </Button>
              </CardContent>
            </Card>

            {/* Stats rapides */}
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-white mb-4">Pourquoi SenePay ?</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Marché TAM</span>
                    <span className="text-senepay-gold font-bold">$25B+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Croissance YoY</span>
                    <span className="text-senepay-green font-bold">450%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">ARR Objectif 2026</span>
                    <span className="text-senepay-orange font-bold">$25M</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">ROI Projeté 5 ans</span>
                    <span className="text-senepay-gold font-bold">50x</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>;
};
export default InvestorForm;