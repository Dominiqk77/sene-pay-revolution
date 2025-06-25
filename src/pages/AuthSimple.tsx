
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import SimpleInput from '@/components/SimpleInput';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ArrowLeft } from 'lucide-react';

const AuthSimple = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // États pour les champs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', { email, password, fullName, isSignUp });
    
    if (!email || !password) {
      toast({
        title: 'Erreur',
        description: 'Veuillez remplir tous les champs requis',
        variant: 'destructive',
      });
      return;
    }

    if (isSignUp && password !== confirmPassword) {
      toast({
        title: 'Erreur',
        description: 'Les mots de passe ne correspondent pas',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    
    try {
      if (isSignUp) {
        const { error } = await signUp(email, password, fullName);
        if (error) {
          toast({
            title: 'Erreur d\'inscription',
            description: error.message,
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Inscription réussie',
            description: 'Vérifiez votre email pour confirmer votre compte.',
          });
          setIsSignUp(false);
        }
      } else {
        const { error } = await signIn(email, password);
        if (error) {
          toast({
            title: 'Erreur de connexion',
            description: 'Email ou mot de passe incorrect',
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Connexion réussie',
            description: 'Bienvenue sur SenePay !',
          });
          navigate('/dashboard');
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-senepay-orange/5 via-white to-senepay-gold/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link to="/" className="inline-flex items-center text-senepay-orange hover:text-senepay-orange/80 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à l'accueil
          </Link>
          <div className="flex items-center justify-center space-x-2 mb-2">
            <div className="w-12 h-12 bg-gradient-senepay rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">S</span>
            </div>
            <span className="text-3xl font-bold gradient-text">SenePay</span>  
          </div>
          <p className="text-gray-600">Votre passerelle de paiement révolutionnaire</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{isSignUp ? 'Créer un compte' : 'Connexion'}</CardTitle>
            <CardDescription>
              {isSignUp 
                ? 'Rejoignez la révolution des paiements en Afrique'
                : 'Connectez-vous à votre tableau de bord SenePay'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <SimpleInput
                  label="Nom complet"
                  type="text"
                  placeholder="Votre nom complet"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              )}
              
              <SimpleInput
                label="Email"
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              
              <SimpleInput
                label="Mot de passe"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              
              {isSignUp && (
                <SimpleInput
                  label="Confirmer le mot de passe"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              )}

              <Button type="submit" className="w-full btn-senepay" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isSignUp ? 'Créer mon compte' : 'Se connecter'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-senepay-orange hover:text-senepay-orange/80 font-medium"
              >
                {isSignUp 
                  ? 'Déjà un compte ? Se connecter'
                  : "Pas encore de compte ? S'inscrire"
                }
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthSimple;
