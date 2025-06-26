import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import Logo from '@/components/Logo';

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { signIn, signUp, user, loading: globalLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // États pour les formulaires avec gestion manuelle
  const [signInData, setSignInData] = useState({
    email: '',
    password: ''
  });

  const [signUpData, setSignUpData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Redirect if already authenticated
  useEffect(() => {
    if (user && !globalLoading) {
      console.log('User authenticated, redirecting to dashboard');
      navigate('/dashboard');
    }
  }, [user, globalLoading, navigate]);

  // Validation functions
  const validateSignIn = () => {
    const newErrors: Record<string, string> = {};
    
    if (!signInData.email || !/\S+@\S+\.\S+/.test(signInData.email)) {
      newErrors.email = 'Veuillez saisir un email valide';
    }
    
    if (!signInData.password || signInData.password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateSignUp = () => {
    const newErrors: Record<string, string> = {};
    
    if (!signUpData.fullName || signUpData.fullName.length < 2) {
      newErrors.fullName = 'Le nom complet doit contenir au moins 2 caractères';
    }
    
    if (!signUpData.email || !/\S+@\S+\.\S+/.test(signUpData.email)) {
      newErrors.email = 'Veuillez saisir un email valide';
    }
    
    if (!signUpData.password || signUpData.password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }
    
    if (signUpData.password !== signUpData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('SignIn form submitted with data:', signInData);
    
    if (!validateSignIn()) return;

    setAuthLoading(true);
    try {
      console.log('Starting signIn process');
      const { error } = await signIn(signInData.email, signInData.password);
      
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
      }
    } catch (error) {
      console.error('SignIn unexpected error:', error);
      toast({
        title: 'Erreur',
        description: 'Une erreur inattendue est survenue',
        variant: 'destructive',
      });
    } finally {
      setAuthLoading(false);
    }
  };

  const onSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('SignUp form submitted with data:', signUpData);
    
    if (!validateSignUp()) return;

    setAuthLoading(true);
    try {
      console.log('Starting signUp process');
      const { error } = await signUp(signUpData.email, signUpData.password, signUpData.fullName);
      
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
        setSignUpData({ fullName: '', email: '', password: '', confirmPassword: '' });
      }
    } catch (error) {
      console.error('SignUp unexpected error:', error);
      toast({
        title: 'Erreur',
        description: "Une erreur inattendue est survenue lors de l'inscription",
        variant: 'destructive',
      });
    } finally {
      setAuthLoading(false);
    }
  };

  const toggleAuthMode = () => {
    console.log('Toggling auth mode from', isSignUp ? 'SignUp' : 'SignIn');
    setIsSignUp(!isSignUp);
    setShowPassword(false);
    setShowConfirmPassword(false);
    setErrors({});
    // Reset forms when switching modes
    setSignInData({ email: '', password: '' });
    setSignUpData({ fullName: '', email: '', password: '', confirmPassword: '' });
  };

  // Styles forcés pour les inputs
  const inputStyle = {
    pointerEvents: 'auto' as const,
    zIndex: 9999,
    position: 'relative' as const,
    width: '100%',
    height: '40px',
    padding: '8px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '14px',
    backgroundColor: '#ffffff',
    color: '#000000',
    outline: 'none',
    transition: 'all 0.2s'
  };

  const inputErrorStyle = {
    ...inputStyle,
    borderColor: '#ef4444'
  };

  if (globalLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-senepay-orange/5 via-white to-senepay-gold/5 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin text-senepay-orange" />
          <span className="text-gray-600">Chargement...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-senepay-orange/5 via-white to-senepay-gold/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link to="/" className="inline-flex items-center text-senepay-orange hover:text-senepay-orange/80 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à l'accueil
          </Link>
          <div className="flex items-center justify-center mb-2">
            <Logo size="lg" variant="default" interactive={true} />
          </div>
          <p className="text-gray-600">Votre passerelle de paiement révolutionnaire</p>
        </div>

        <Card className="transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle className="transition-all duration-300">
              {isSignUp ? 'Créer un compte' : 'Connexion'}
            </CardTitle>
            <CardDescription className="transition-all duration-300">
              {isSignUp 
                ? 'Rejoignez la révolution des paiements en Afrique'
                : 'Connectez-vous à votre tableau de bord SenePay'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="transition-all duration-500 ease-in-out">
              {isSignUp ? (
                <form onSubmit={onSignUp} className="space-y-4">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                      Nom complet
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      placeholder="Votre nom complet"
                      disabled={authLoading}
                      style={errors.fullName ? inputErrorStyle : inputStyle}
                      value={signUpData.fullName}
                      onClick={() => console.log('Full name input clicked')}
                      onFocus={() => console.log('Full name input focused')}
                      onChange={(e) => {
                        console.log('Full name changed:', e.target.value);
                        setSignUpData({ ...signUpData, fullName: e.target.value });
                        if (errors.fullName) {
                          setErrors({ ...errors, fullName: '' });
                        }
                      }}
                    />
                    {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label htmlFor="email-signup" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      id="email-signup"
                      type="email"
                      placeholder="votre@email.com"
                      disabled={authLoading}
                      style={errors.email ? inputErrorStyle : inputStyle}
                      value={signUpData.email}
                      onClick={() => console.log('Email input clicked')}
                      onFocus={() => console.log('Email input focused')}
                      onChange={(e) => {
                        console.log('Email changed:', e.target.value);
                        setSignUpData({ ...signUpData, email: e.target.value });
                        if (errors.email) {
                          setErrors({ ...errors, email: '' });
                        }
                      }}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="password-signup" className="block text-sm font-medium text-gray-700 mb-1">
                      Mot de passe
                    </label>
                    <div className="relative">
                      <input
                        id="password-signup"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        disabled={authLoading}
                        style={errors.password ? { ...inputErrorStyle, paddingRight: '40px' } : { ...inputStyle, paddingRight: '40px' }}
                        value={signUpData.password}
                        onClick={() => console.log('Password input clicked')}
                        onFocus={() => console.log('Password input focused')}
                        onChange={(e) => {
                          console.log('Password changed:', e.target.value);
                          setSignUpData({ ...signUpData, password: e.target.value });
                          if (errors.password) {
                            setErrors({ ...errors, password: '' });
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                        style={{ zIndex: 10000 }}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      Confirmer le mot de passe
                    </label>
                    <div className="relative">
                      <input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        disabled={authLoading}
                        style={errors.confirmPassword ? { ...inputErrorStyle, paddingRight: '40px' } : { ...inputStyle, paddingRight: '40px' }}
                        value={signUpData.confirmPassword}
                        onClick={() => console.log('Confirm password input clicked')}
                        onFocus={() => console.log('Confirm password input focused')}
                        onChange={(e) => {
                          console.log('Confirm password changed:', e.target.value);
                          setSignUpData({ ...signUpData, confirmPassword: e.target.value });
                          if (errors.confirmPassword) {
                            setErrors({ ...errors, confirmPassword: '' });
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                        style={{ zIndex: 10000 }}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                  </div>

                  <Button type="submit" className="w-full btn-senepay" disabled={authLoading}>
                    {authLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Créer mon compte
                  </Button>
                </form>
              ) : (
                <form onSubmit={onSignIn} className="space-y-4">
                  <div>
                    <label htmlFor="email-signin" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      id="email-signin"
                      type="email"
                      placeholder="votre@email.com"
                      disabled={authLoading}
                      style={errors.email ? inputErrorStyle : inputStyle}
                      value={signInData.email}
                      onClick={() => console.log('SignIn email input clicked')}
                      onFocus={() => console.log('SignIn email input focused')}
                      onChange={(e) => {
                        console.log('SignIn email changed:', e.target.value);
                        setSignInData({ ...signInData, email: e.target.value });
                        if (errors.email) {
                          setErrors({ ...errors, email: '' });
                        }
                      }}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="password-signin" className="block text-sm font-medium text-gray-700 mb-1">
                      Mot de passe
                    </label>
                    <div className="relative">
                      <input
                        id="password-signin"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        disabled={authLoading}
                        style={errors.password ? { ...inputErrorStyle, paddingRight: '40px' } : { ...inputStyle, paddingRight: '40px' }}
                        value={signInData.password}
                        onClick={() => console.log('SignIn password input clicked')}
                        onFocus={() => console.log('SignIn password input focused')}
                        onChange={(e) => {
                          console.log('SignIn password changed:', e.target.value);
                          setSignInData({ ...signInData, password: e.target.value });
                          if (errors.password) {
                            setErrors({ ...errors, password: '' });
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                        style={{ zIndex: 10000 }}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                  </div>

                  <Button type="submit" className="w-full btn-senepay" disabled={authLoading}>
                    {authLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Se connecter
                  </Button>
                </form>
              )}
            </div>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={toggleAuthMode}
                className="text-senepay-orange hover:text-senepay-orange/80 font-medium transition-all duration-200 hover:scale-105"
                disabled={authLoading}
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
