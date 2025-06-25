
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ArrowLeft } from 'lucide-react';

const signInSchema = z.object({
  email: z.string().email('Veuillez saisir un email valide'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
});

const signUpSchema = z.object({
  fullName: z.string().min(2, 'Le nom complet doit contenir au moins 2 caractères'),
  email: z.string().email('Veuillez saisir un email valide'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
  confirmPassword: z.string().min(6, 'Veuillez confirmer votre mot de passe'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

type SignInFormData = z.infer<typeof signInSchema>;
type SignUpFormData = z.infer<typeof signUpSchema>;

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const signInForm = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const signUpForm = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSignIn = async (data: SignInFormData) => {
    setLoading(true);
    try {
      const { error } = await signIn(data.email, data.password);
      
      if (error) {
        let errorMessage = 'Une erreur est survenue lors de la connexion';
        
        if (error.message?.includes('Invalid login credentials')) {
          errorMessage = 'Email ou mot de passe incorrect';
        } else if (error.message?.includes('Email not confirmed')) {
          errorMessage = 'Veuillez confirmer votre email avant de vous connecter';
        } else if (error.message?.includes('Too many requests')) {
          errorMessage = 'Trop de tentatives. Veuillez réessayer plus tard';
        }
        
        toast({
          title: 'Erreur de connexion',
          description: errorMessage,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Connexion réussie',
          description: 'Redirection vers votre tableau de bord...',
        });
        navigate('/dashboard');
      }
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Une erreur inattendue est survenue',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const onSignUp = async (data: SignUpFormData) => {
    setLoading(true);
    try {
      const { error } = await signUp(data.email, data.password, data.fullName);
      
      if (error) {
        let errorMessage = "Une erreur est survenue lors de l'inscription";
        
        if (error.message?.includes('already registered')) {
          errorMessage = 'Un compte avec cet email existe déjà. Veuillez vous connecter.';
        } else if (error.message?.includes('Password should be at least')) {
          errorMessage = 'Le mot de passe doit contenir au moins 6 caractères';
        } else if (error.message?.includes('Invalid email')) {
          errorMessage = 'Veuillez saisir un email valide';
        }
        
        toast({
          title: "Erreur d'inscription",
          description: errorMessage,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Inscription réussie',
          description: 'Votre compte a été créé avec succès. Vous pouvez maintenant vous connecter.',
        });
        setIsSignUp(false);
        signUpForm.reset();
      }
    } catch (error) {
      toast({
        title: 'Erreur',
        description: "Une erreur inattendue est survenue lors de l'inscription",
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
            {isSignUp ? (
              <Form {...signUpForm}>
                <form onSubmit={signUpForm.handleSubmit(onSignUp)} className="space-y-4">
                  <FormField
                    control={signUpForm.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom complet</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Votre nom complet" 
                            {...field}
                            disabled={loading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={signUpForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="votre@email.com" 
                            {...field}
                            disabled={loading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={signUpForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mot de passe</FormLabel>
                        <FormControl>
                          <Input 
                            type="password" 
                            placeholder="••••••••" 
                            {...field}
                            disabled={loading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={signUpForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirmer le mot de passe</FormLabel>
                        <FormControl>
                          <Input 
                            type="password" 
                            placeholder="••••••••" 
                            {...field}
                            disabled={loading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full btn-senepay" disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Créer mon compte
                  </Button>
                </form>
              </Form>
            ) : (
              <Form {...signInForm}>
                <form onSubmit={signInForm.handleSubmit(onSignIn)} className="space-y-4">
                  <FormField
                    control={signInForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="votre@email.com" 
                            {...field}
                            disabled={loading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={signInForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mot de passe</FormLabel>
                        <FormControl>
                          <Input 
                            type="password" 
                            placeholder="••••••••" 
                            {...field}
                            disabled={loading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full btn-senepay" disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Se connecter
                  </Button>
                </form>
              </Form>
            )}

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-senepay-orange hover:text-senepay-orange/80 font-medium"
                disabled={loading}
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

export default Auth;
