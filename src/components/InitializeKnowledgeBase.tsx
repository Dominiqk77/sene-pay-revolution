import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export default function InitializeKnowledgeBase() {
  const initializeKnowledge = async () => {
    try {
      console.log('Initializing SenePay knowledge base...');
      
      const { data, error } = await supabase.functions.invoke('init-knowledge-base');
      
      if (error) {
        console.error('Error:', error);
        toast({
          title: "Erreur",
          description: "Erreur lors de l'initialisation de la base de connaissances",
          variant: "destructive"
        });
        return;
      }

      console.log('Knowledge base initialized:', data);
      toast({
        title: "Succès ! 🚀",
        description: `Base de connaissances initialisée avec ${data.inserted} entrées`,
      });
      
    } catch (error) {
      console.error('Error initializing knowledge base:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors de l'initialisation",
        variant: "destructive"
      });
    }
  };

  // Auto-initialize on component mount
  useEffect(() => {
    initializeKnowledge();
  }, []);

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-2">Initialisation du Chat IA SenePay</h3>
      <p className="text-muted-foreground mb-4">
        Initialisation de la base de connaissances en cours...
      </p>
      <Button onClick={initializeKnowledge}>
        Réinitialiser la base de connaissances
      </Button>
    </div>
  );
}