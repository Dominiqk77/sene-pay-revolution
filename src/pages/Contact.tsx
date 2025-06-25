
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, MessageCircle, Headphones } from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Adresse",
      details: ["Dakar, Sénégal", "Zone de Almadies", "Près de King Fahd Palace"],
      color: "text-blue-500"
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Téléphone",
      details: ["+221 77 123 45 67", "+221 70 456 78 90", "Support 24/7"],
      color: "text-green-500"
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      details: ["contact@senepay.sn", "support@senepay.sn", "partnerships@senepay.sn"],
      color: "text-senepay-orange"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Horaires",
      details: ["Lun-Ven: 8h - 18h", "Sam: 9h - 13h", "Support technique 24/7"],
      color: "text-purple-500"
    }
  ];

  const supportChannels = [
    {
      icon: <MessageCircle className="h-8 w-8" />,
      title: "Chat en direct",
      description: "Support instantané via notre chat intégré",
      action: "Démarrer le chat",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Headphones className="h-8 w-8" />,
      title: "Support technique",
      description: "Assistance pour intégrations et API",
      action: "Contacter l'équipe tech",
      color: "from-senepay-orange to-senepay-gold"
    },
    {
      icon: <Phone className="h-8 w-8" />,
      title: "Appel direct",
      description: "Parlons directement de votre projet",
      action: "Programmer un appel",
      color: "from-senepay-green to-emerald-500"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Contactez-nous</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Notre équipe sénégalaise est là pour vous accompagner dans votre transformation digitale. 
            Support en Français et Wolof disponible 24/7.
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <Card key={info.title} className="p-6 text-center hover:shadow-xl transition-all duration-300">
                <div className={`w-12 h-12 ${info.color} bg-opacity-10 rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <div className={info.color}>
                    {info.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{info.title}</h3>
                <div className="space-y-1">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-600">{detail}</p>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          {/* Contact Form & Support Channels */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="p-8">
              <h2 className="text-3xl font-bold mb-6">
                <span className="text-gray-800">Envoyez-nous un</span>
                <span className="gradient-text"> message</span>
              </h2>
              
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Prénom *
                    </label>
                    <Input placeholder="Votre prénom" className="border-gray-300" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nom *
                    </label>
                    <Input placeholder="Votre nom" className="border-gray-300" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email *
                  </label>
                  <Input type="email" placeholder="votre@email.com" className="border-gray-300" />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Téléphone
                  </label>
                  <Input placeholder="+221 77 123 45 67" className="border-gray-300" />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Entreprise
                  </label>
                  <Input placeholder="Nom de votre entreprise" className="border-gray-300" />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Sujet *
                  </label>
                  <Input placeholder="Intégration API, Partenariat, Support..." className="border-gray-300" />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Message *
                  </label>
                  <Textarea 
                    placeholder="Décrivez votre projet ou votre besoin..."
                    className="border-gray-300 min-h-[120px]"
                  />
                </div>
                
                <Button className="btn-senepay w-full">
                  Envoyer le message
                </Button>
              </form>
            </Card>

            {/* Support Channels */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-6">
                  <span className="text-gray-800">Support</span>
                  <span className="gradient-text"> instantané</span>
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Choisissez le canal qui vous convient le mieux pour obtenir une assistance rapide
                </p>
              </div>

              <div className="space-y-6">
                {supportChannels.map((channel, index) => (
                  <Card key={channel.title} className="p-6 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${channel.color} text-white`}>
                        {channel.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{channel.title}</h3>
                        <p className="text-gray-600 mb-4">{channel.description}</p>
                        <Button variant="outline" className="border-senepay-gold text-senepay-gold hover:bg-senepay-gold hover:text-white">
                          {channel.action}
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Emergency Contact */}
              <Card className="p-6 bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
                <h3 className="text-xl font-bold text-red-800 mb-2">🚨 Urgence technique</h3>
                <p className="text-red-700 mb-4">
                  Problème critique affectant vos paiements en production ?
                </p>
                <Button className="bg-red-600 hover:bg-red-700 text-white">
                  Assistance d'urgence 24/7
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Quick Access */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">
            <span className="text-gray-800">Questions</span>
            <span className="gradient-text"> fréquentes</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-3">🚀 Intégration</h3>
              <p className="text-gray-600 mb-4">Comment intégrer SenePay en 5 minutes ?</p>
              <Button variant="outline" size="sm">Voir le guide</Button>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-3">💰 Tarifs</h3>
              <p className="text-gray-600 mb-4">Quels sont vos frais de transaction ?</p>
              <Button variant="outline" size="sm">Voir les tarifs</Button>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-3">🛡️ Sécurité</h3>
              <p className="text-gray-600 mb-4">Comment protégez-vous les transactions ?</p>
              <Button variant="outline" size="sm">En savoir plus</Button>
            </Card>
          </div>

          <p className="text-lg text-gray-600">
            Vous ne trouvez pas votre réponse ? 
            <button className="text-senepay-orange font-semibold hover:underline ml-2">
              Consultez notre FAQ complète
            </button>
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
