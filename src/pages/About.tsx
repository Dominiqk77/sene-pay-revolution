
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Users, Target, Award, Globe } from "lucide-react";

const About = () => {
  const team = [
    {
      name: "Dominiqk",
      role: "Founder & CEO",
      description: "Visionnaire fintech avec 10+ ans d'expérience dans les paiements digitaux en Afrique",
      avatar: "D"
    },
    {
      name: "Équipe Technique",
      role: "Engineering Team",
      description: "Développeurs sénégalais experts en APIs de paiement et infrastructure scalable",
      avatar: "T"
    },
    {
      name: "Équipe Business",
      role: "Business Development",
      description: "Spécialistes du marché e-commerce ouest-africain et relations partenaires",
      avatar: "B"
    }
  ];

  const values = [
    {
      icon: <Users className="h-8 w-8" />,
      title: "Innovation Locale",
      description: "Développé au Sénégal, pour l'Afrique, avec une compréhension profonde des défis locaux"
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Simplicité Radicale",
      description: "Intégration en 5 minutes, API ultra-simple, documentation parfaite"
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Excellence Technique",
      description: "Infrastructure de classe mondiale, sécurité militaire, performance garantie"
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Impact Continental",
      description: "Vision d'unifier les paiements de toute l'Afrique de l'Ouest en une seule API"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">À propos de SenePay</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Nous révolutionnons l'écosystème e-commerce ouest-africain en connectant 
            tous les moyens de paiement en une seule API ultra-puissante.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                <span className="text-gray-800">Notre</span>
                <span className="gradient-text"> Mission</span>
              </h2>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                Démocratiser les paiements digitaux en Afrique de l'Ouest en rendant 
                l'intégration si simple qu'aucun business ne peut se permettre de ne pas accepter 
                les paiements en ligne.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                89% des sites web sénégalais n'acceptent pas les paiements en ligne. 
                Notre objectif : passer ce chiffre à 0% d'ici 2026.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-senepay-gold/10 to-senepay-orange/10 rounded-2xl">
                <div className="text-4xl font-bold gradient-text mb-2">25,000</div>
                <div className="text-gray-600">E-commerces potentiels CEDEAO</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-senepay-green/10 to-blue-500/10 rounded-2xl">
                <div className="text-4xl font-bold gradient-text mb-2">15M+</div>
                <div className="text-gray-600">Utilisateurs mobile money</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-purple-500/10 to-senepay-orange/10 rounded-2xl">
                <div className="text-4xl font-bold gradient-text mb-2">$180M</div>
                <div className="text-gray-600">Marché e-commerce Sénégal</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-senepay-green/10 to-senepay-gold/10 rounded-2xl">
                <div className="text-4xl font-bold gradient-text mb-2">8</div>
                <div className="text-gray-600">Pays CEDEAO ciblés</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              <span className="text-gray-800">Nos</span>
              <span className="gradient-text"> Valeurs</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Les principes qui guident notre vision de transformer l'Afrique en leader mondial des paiements digitaux
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={value.title} className="p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-senepay rounded-2xl flex items-center justify-center text-white mx-auto mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              <span className="text-gray-800">Notre</span>
              <span className="gradient-text"> Équipe</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une équipe 100% sénégalaise avec une expertise internationale, 
              dédiée à révolutionner les paiements en Afrique
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={member.name} className="p-8 text-center hover:shadow-xl transition-all duration-300">
                <div className="w-20 h-20 bg-gradient-senepay rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {member.avatar}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{member.name}</h3>
                <p className="text-senepay-orange font-semibold mb-4">{member.role}</p>
                <p className="text-gray-600 leading-relaxed">{member.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-senepay text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Rejoignez la révolution des paiements africains
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Faites partie des pionniers qui transforment l'e-commerce en Afrique de l'Ouest
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-senepay-dark px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors">
              Devenir partenaire
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-senepay-dark transition-colors">
              Rejoindre l'équipe
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
