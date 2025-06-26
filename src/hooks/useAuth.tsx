import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { cleanupAuthState, forceSignOut } from '@/utils/authCleanup';
import { logSecurityEvent } from '@/utils/securityUtils';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('🔄 Auth state changed:', event, session?.user?.email);
        console.log('🌍 Current URL when auth changed:', window.location.href);
        
        // Logger les événements d'authentification
        if (event === 'SIGNED_IN' && session?.user) {
          await logSecurityEvent({
            action: 'USER_SIGNED_IN',
            resourceType: 'authentication',
            metadata: {
              userId: session.user.id,
              email: session.user.email,
              timestamp: new Date().toISOString()
            }
          });
        } else if (event === 'SIGNED_OUT') {
          await logSecurityEvent({
            action: 'USER_SIGNED_OUT',
            resourceType: 'authentication',
            metadata: {
              timestamp: new Date().toISOString()
            }
          });
        }
        
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Error getting session:', error);
          cleanupAuthState();
        } else {
          console.log('📋 Initial session found:', session?.user?.email);
          setSession(session);
          setUser(session?.user ?? null);
        }
      } catch (error) {
        console.error('Error in getInitialSession:', error);
        cleanupAuthState();
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      console.log('Attempting signUp for:', email);
      
      // Logger la tentative d'inscription
      await logSecurityEvent({
        action: 'USER_SIGNUP_ATTEMPT',
        resourceType: 'authentication',
        metadata: {
          email,
          timestamp: new Date().toISOString()
        }
      });
      
      cleanupAuthState();
      
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: fullName
          }
        }
      });
      
      console.log('SignUp result:', { data: data?.user?.email, error });
      
      if (data?.user && !error) {
        await logSecurityEvent({
          action: 'USER_SIGNUP_SUCCESS',
          resourceType: 'authentication',
          metadata: {
            userId: data.user.id,
            email: data.user.email,
            timestamp: new Date().toISOString()
          }
        });
      } else if (error) {
        await logSecurityEvent({
          action: 'USER_SIGNUP_FAILED',
          resourceType: 'authentication',
          metadata: {
            email,
            error: error.message,
            timestamp: new Date().toISOString()
          }
        });
      }
      
      return { error };
    } catch (error) {
      console.error('SignUp error:', error);
      await logSecurityEvent({
        action: 'USER_SIGNUP_ERROR',
        resourceType: 'authentication',
        metadata: {
          email,
          error: error instanceof Error ? error.message : 'Unknown error',
          timestamp: new Date().toISOString()
        }
      });
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log('Attempting signIn for:', email);
      
      // Logger la tentative de connexion
      await logSecurityEvent({
        action: 'USER_SIGNIN_ATTEMPT',
        resourceType: 'authentication',
        metadata: {
          email,
          timestamp: new Date().toISOString()
        }
      });
      
      cleanupAuthState();
      
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (signOutError) {
        console.warn('Pre-signin signout failed, continuing:', signOutError);
      }
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      console.log('SignIn result:', { data: data?.user?.email, error });
      
      // Pas de redirection automatique ici - laissons les composants gérer ça
      if (data?.user && !error) {
        await logSecurityEvent({
          action: 'USER_SIGNIN_SUCCESS',
          resourceType: 'authentication',
          metadata: {
            userId: data.user.id,
            email: data.user.email,
            timestamp: new Date().toISOString()
          }
        });
      } else if (error) {
        await logSecurityEvent({
          action: 'USER_SIGNIN_FAILED',
          resourceType: 'authentication',
          metadata: {
            email,
            error: error.message,
            timestamp: new Date().toISOString()
          }
        });
      }
      
      return { error };
    } catch (error) {
      console.error('SignIn error:', error);
      await logSecurityEvent({
        action: 'USER_SIGNIN_ERROR',
        resourceType: 'authentication',
        metadata: {
          email,
          error: error instanceof Error ? error.message : 'Unknown error',
          timestamp: new Date().toISOString()
        }
      });
      return { error };
    }
  };

  const signOut = async () => {
    try {
      console.log('Attempting signOut');
      await forceSignOut(supabase);
    } catch (error) {
      console.error('SignOut error:', error);
      window.location.href = '/auth';
    }
  };

  const value = {
    user,
    session,
    signUp,
    signIn,
    signOut,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
