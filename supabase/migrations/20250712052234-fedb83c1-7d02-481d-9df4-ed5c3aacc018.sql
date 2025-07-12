-- Create chat conversations table
CREATE TABLE public.chat_conversations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  session_id VARCHAR NOT NULL,
  messages JSONB NOT NULL DEFAULT '[]'::jsonb,
  context JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create chat knowledge base table
CREATE TABLE public.chat_knowledge_base (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  content TEXT NOT NULL,
  content_type VARCHAR NOT NULL CHECK (content_type IN ('code', 'api_doc', 'faq', 'error_solution', 'integration_guide')),
  category VARCHAR NOT NULL CHECK (category IN ('integration', 'payment', 'security', 'billing', 'development', 'general')),
  file_path VARCHAR,
  metadata JSONB DEFAULT '{}'::jsonb,
  embeddings VECTOR(1536), -- OpenAI embeddings dimension
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create chat feedback table
CREATE TABLE public.chat_feedback (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID REFERENCES public.chat_conversations(id),
  message_id VARCHAR NOT NULL,
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  feedback_text TEXT,
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.chat_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_knowledge_base ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_feedback ENABLE ROW LEVEL SECURITY;

-- RLS Policies for chat_conversations
CREATE POLICY "Users can view their own conversations" 
ON public.chat_conversations 
FOR SELECT 
USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can create conversations" 
ON public.chat_conversations 
FOR INSERT 
WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can update their own conversations" 
ON public.chat_conversations 
FOR UPDATE 
USING (auth.uid() = user_id OR user_id IS NULL);

-- RLS Policies for chat_knowledge_base (read-only for all authenticated users)
CREATE POLICY "All authenticated users can view knowledge base" 
ON public.chat_knowledge_base 
FOR SELECT 
USING (auth.role() = 'authenticated');

-- RLS Policies for chat_feedback
CREATE POLICY "Users can view their own feedback" 
ON public.chat_feedback 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create feedback" 
ON public.chat_feedback 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX idx_chat_conversations_user_id ON public.chat_conversations(user_id);
CREATE INDEX idx_chat_conversations_session_id ON public.chat_conversations(session_id);
CREATE INDEX idx_chat_knowledge_base_category ON public.chat_knowledge_base(category);
CREATE INDEX idx_chat_knowledge_base_content_type ON public.chat_knowledge_base(content_type);
CREATE INDEX idx_chat_feedback_conversation_id ON public.chat_feedback(conversation_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_chat_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_chat_conversations_updated_at
BEFORE UPDATE ON public.chat_conversations
FOR EACH ROW
EXECUTE FUNCTION public.update_chat_updated_at_column();

CREATE TRIGGER update_chat_knowledge_base_updated_at
BEFORE UPDATE ON public.chat_knowledge_base
FOR EACH ROW
EXECUTE FUNCTION public.update_chat_updated_at_column();