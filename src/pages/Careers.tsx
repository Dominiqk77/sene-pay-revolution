import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, MapPin, Calendar, ArrowRight, Heart, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Careers = () => {
  const navigate = useNavigate();

  const positions = [
    {
      title: "Développeur Full-Stack Senior",
      department: "Engineering",
      location: "Dakar, Sénégal",
      type: "CDI",
      level: "Senior",
      description: "Rejoignez notre équipe engineering pour développer la prochaine génération de solutions de paiement.",
      requirements: ["5+ ans d'expérience", "Node.js, React, TypeScript", "Experience fintech appréciée"]
    },
    {
      title: "Product Manager Paiements",
      department: "Product",
      location: "Dakar, Sénégal / Remote",
      type: "CDI",
      level: "Senior",
      description: "Définissez la roadmap produit et les fonctionnalités clés de notre plateforme de paiement.",
      requirements: ["3+ ans en product management", "Expérience fintech", "Excellent français/anglais"]
    },
    {
      title: "DevOps/SRE Engineer",
      department: "Infrastructure",
      location: "Dakar, Sénégal",
      type: "CDI", 
      level: "Mid-Level",
      description: "Assurez la fiabilité et la scalabilité de notre infrastructure critique.",
      requirements: ["AWS/Azure expertise", "Kubernetes, Docker", "Monitoring et observabilité"]
    },
    {
      title: "Sales Manager Afrique de l'Ouest",
      department: "Sales",
      location: "Dakar, Sénégal",
      type: "CDI",
      level: "Senior",
      description: "Développez notre présence commerciale à travers l'Afrique de l'Ouest.",
      requirements: ["Expérience vente B2B", "Connaissance marché africain", "Réseau professionnel étendu"]
    },
    {
      title: "UX/UI Designer",
      department: "Design",
      location: "Dakar, Sénégal / Remote",
      type: "CDI",
      level: "Mid-Level",
      description: "Créez des expériences utilisateur exceptionnelles pour nos marchands et clients finaux.",
      requirements: ["Portfolio solide", "Figma, Sketch", "Design system experience"]
    },
    {
      title: "Compliance Officer",
      department: "Legal & Compliance",
      location: "Dakar, Sénégal",
      type: "CDI",
      level: "Senior",
      description: "Assurez la conformité réglementaire de nos opérations au Sénégal et en Afrique de l'Ouest.",
      requirements: ["Droit bancaire/financier", "Expérience BCEAO", "Bilingue français/anglais"]
    }
  ];

  const benefits = [
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Santé & Bien-être",
      description: "Assurance santé premium + sport"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Évolution de Carrière",
      description: "Formation continue et mobilité interne"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Équipe Internationale",
      description: "Collaboration avec les meilleurs talents"
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: "Équity Package",
      description: "Participation aux bénéfices de l'entreprise"
    }
  ];

  const values = [
    {
      title: "Innovation",
      description: "Nous repoussons constamment les limites du possible dans l'écosystème fintech africain."
    },
    {
      title: "Excellence",
      description: "Nous visons l'excellence dans tout ce que nous faisons, de notre code à notre service client."
    },
    {
      title: "Impact",
      description: "Nous créons des solutions qui transforment positivement l'économie numérique africaine."
    },
    {
      title: "Inclusion",
      description: "Nous valorisons la diversité et créons un environnement où chacun peut s'épanouir."
    }
  ];

  const getDepartmentColor = (department: string) => {
    const colors = {
      "Engineering": "bg-blue-100 text-blue-800",
      "Product": "bg-green-100 text-green-800",
      "Infrastructure": "bg-purple-100 text-purple-800",
      "Sales": "bg-orange-100 text-orange-800",
      "Design": "bg-pink-100 text-pink-800",
      "Legal & Compliance": "bg-red-100 text-red-800"
    };
    return colors[department as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-16">
        {/* Header */}
        <div className="bg-senepay-dark text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Users className="h-16 w-16 mx-auto mb-6 text-senepay-gold" />
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Rejoignez l'Équipe SenePay
              </h1>
              <p className="text-xl text-gray-300 mb-6">
                Construisez l'avenir des paiements digitaux en Afrique
              </p>
              <div className="flex justify-center gap-4">
                <Badge variant="outline" className="bg-senepay-gold text-black border-senepay-gold">
                  6 Postes Ouverts
                </Badge>
                <Badge variant="outline" className="bg-senepay-green text-white border-senepay-green">
                  Croissance Rapide
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            {/* Company Culture */}
            <Card className="p-8 mb-12 bg-gradient-to-br from-senepay-gold/10 to-senepay-orange/10 border-senepay-gold/20">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4 text-senepay-dark">
                  Pourquoi SenePay ?
                </h2>
                <p className="text-lg text-gray-700">
                  Rejoignez une startup en hypercroissance qui révolutionne les paiements en Afrique
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="text-center">
                    <div className="p-3 bg-senepay-gold/10 rounded-lg inline-block mb-4">
                      {benefit.icon}
                    </div>
                    <h4 className="font-semibold mb-2">{benefit.title}</h4>
                    <p className="text-sm text-gray-600">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Values */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-8 text-center text-senepay-dark">
                Nos Valeurs
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {values.map((value, index) => (
                  <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                    <h3 className="text-lg font-bold mb-3 text-senepay-dark">{value.title}</h3>
                    <p className="text-gray-600 text-sm">{value.description}</p>
                  </Card>
                ))}
              </div>
            </div>

            {/* Open Positions */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-8 text-center text-senepay-dark">
                Postes Ouverts
              </h2>
              <div className="space-y-6">
                {positions.map((position, index) => (
                  <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
                      <div className="mb-4 lg:mb-0">
                        <h3 className="text-xl font-bold mb-2 text-senepay-dark">{position.title}</h3>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <Badge className={getDepartmentColor(position.department)}>
                            {position.department}
                          </Badge>
                          <div className="flex items-center text-gray-600 text-sm">
                            <MapPin className="h-4 w-4 mr-1" />
                            {position.location}
                          </div>
                          <div className="flex items-center text-gray-600 text-sm">
                            <Calendar className="h-4 w-4 mr-1" />
                            {position.type}
                          </div>
                          <Badge variant="outline">{position.level}</Badge>
                        </div>
                      </div>
                      <Button className="bg-senepay-gold hover:bg-senepay-orange">
                        <ArrowRight className="h-4 w-4 mr-2" />
                        Postuler
                      </Button>
                    </div>
                    
                    <p className="text-gray-700 mb-4">{position.description}</p>
                    
                    <div>
                      <h4 className="font-semibold mb-2 text-sm">Profil Recherché :</h4>
                      <div className="flex flex-wrap gap-2">
                        {position.requirements.map((req, reqIndex) => (
                          <Badge key={reqIndex} variant="outline" className="text-xs">
                            {req}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Stats */}
            <Card className="p-8 mb-12 bg-senepay-green/5 border-senepay-green/20">
              <h2 className="text-2xl font-bold mb-6 text-center text-senepay-dark">
                SenePay en Chiffres
              </h2>
              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-senepay-gold mb-2">45+</div>
                  <p className="text-gray-600">Employés Talentueux</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-senepay-gold mb-2">8</div>
                  <p className="text-gray-600">Pays d'Opération</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-senepay-gold mb-2">500%</div>
                  <p className="text-gray-600">Croissance Annuelle</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-senepay-gold mb-2">$15M</div>
                  <p className="text-gray-600">Levée de Fonds</p>
                </div>
              </div>
            </Card>

            {/* Application Process */}
            <Card className="p-8 mb-12">
              <h2 className="text-2xl font-bold mb-6 text-center text-senepay-dark">
                Processus de Recrutement
              </h2>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-senepay-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-white">1</span>
                  </div>
                  <h4 className="font-semibold mb-2">Candidature</h4>
                  <p className="text-sm text-gray-600">Envoyez CV et lettre de motivation</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-senepay-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-white">2</span>
                  </div>
                  <h4 className="font-semibold mb-2">Entretien RH</h4>
                  <p className="text-sm text-gray-600">Discussion sur votre profil et motivations</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-senepay-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-white">3</span>
                  </div>
                  <h4 className="font-semibold mb-2">Test Technique</h4>
                  <p className="text-sm text-gray-600">Évaluation de vos compétences techniques</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-senepay-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-white">4</span>
                  </div>
                  <h4 className="font-semibold mb-2">Entretien Final</h4>
                  <p className="text-sm text-gray-600">Rencontre avec l'équipe et négociation</p>
                </div>
              </div>
            </Card>

            {/* CTA */}
            <div className="text-center">
              <div className="bg-gradient-senepay rounded-2xl p-8 inline-block">
                <h3 className="text-2xl font-bold mb-4 text-white">
                  Prêt à Transformer l'Afrique avec Nous ?
                </h3>
                <p className="text-lg mb-6 opacity-90 text-white">
                  Envoyez-nous votre candidature ou contactez-nous pour en savoir plus
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={() => navigate('/contact')}
                    className="bg-white text-senepay-dark hover:bg-gray-100 px-8 py-3 font-bold"
                  >
                    Candidature Spontanée
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/contact')}
                    className="border-white text-white hover:bg-white hover:text-senepay-dark px-8 py-3"
                  >
                    Nous Contacter
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Careers;
