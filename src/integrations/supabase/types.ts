export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      audit_logs: {
        Row: {
          action: string
          created_at: string | null
          id: string
          ip_address: unknown | null
          merchant_id: string | null
          metadata: Json | null
          resource_id: string | null
          resource_type: string | null
          user_agent: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          merchant_id?: string | null
          metadata?: Json | null
          resource_id?: string | null
          resource_type?: string | null
          user_agent?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          merchant_id?: string | null
          metadata?: Json | null
          resource_id?: string | null
          resource_type?: string | null
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_merchant_id_fkey"
            columns: ["merchant_id"]
            isOneToOne: false
            referencedRelation: "merchant_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      automated_actions: {
        Row: {
          action_data: Json
          action_type: string
          created_at: string
          executed_at: string | null
          id: string
          lead_id: string
          result_data: Json | null
          scheduled_at: string
          status: string
          trigger_condition: string
        }
        Insert: {
          action_data?: Json
          action_type: string
          created_at?: string
          executed_at?: string | null
          id?: string
          lead_id: string
          result_data?: Json | null
          scheduled_at: string
          status?: string
          trigger_condition: string
        }
        Update: {
          action_data?: Json
          action_type?: string
          created_at?: string
          executed_at?: string | null
          id?: string
          lead_id?: string
          result_data?: Json | null
          scheduled_at?: string
          status?: string
          trigger_condition?: string
        }
        Relationships: [
          {
            foreignKeyName: "automated_actions_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_articles: {
        Row: {
          ai_generated: boolean | null
          author_avatar: string | null
          author_name: string | null
          category: string
          content: string
          created_at: string
          excerpt: string
          featured_image_url: string | null
          id: string
          is_featured: boolean | null
          is_published: boolean | null
          keywords: string[] | null
          like_count: number | null
          meta_description: string | null
          meta_title: string | null
          monetization_cta: Json | null
          published_at: string | null
          reading_time: number | null
          seo_score: number | null
          share_count: number | null
          slug: string
          tags: string[] | null
          title: string
          updated_at: string
          view_count: number | null
        }
        Insert: {
          ai_generated?: boolean | null
          author_avatar?: string | null
          author_name?: string | null
          category: string
          content: string
          created_at?: string
          excerpt: string
          featured_image_url?: string | null
          id?: string
          is_featured?: boolean | null
          is_published?: boolean | null
          keywords?: string[] | null
          like_count?: number | null
          meta_description?: string | null
          meta_title?: string | null
          monetization_cta?: Json | null
          published_at?: string | null
          reading_time?: number | null
          seo_score?: number | null
          share_count?: number | null
          slug: string
          tags?: string[] | null
          title: string
          updated_at?: string
          view_count?: number | null
        }
        Update: {
          ai_generated?: boolean | null
          author_avatar?: string | null
          author_name?: string | null
          category?: string
          content?: string
          created_at?: string
          excerpt?: string
          featured_image_url?: string | null
          id?: string
          is_featured?: boolean | null
          is_published?: boolean | null
          keywords?: string[] | null
          like_count?: number | null
          meta_description?: string | null
          meta_title?: string | null
          monetization_cta?: Json | null
          published_at?: string | null
          reading_time?: number | null
          seo_score?: number | null
          share_count?: number | null
          slug?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
          view_count?: number | null
        }
        Relationships: []
      }
      chat_conversations: {
        Row: {
          context: Json | null
          created_at: string
          id: string
          messages: Json
          session_id: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          context?: Json | null
          created_at?: string
          id?: string
          messages?: Json
          session_id: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          context?: Json | null
          created_at?: string
          id?: string
          messages?: Json
          session_id?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      chat_feedback: {
        Row: {
          conversation_id: string | null
          created_at: string
          feedback_text: string | null
          id: string
          message_id: string
          rating: number | null
          user_id: string | null
        }
        Insert: {
          conversation_id?: string | null
          created_at?: string
          feedback_text?: string | null
          id?: string
          message_id: string
          rating?: number | null
          user_id?: string | null
        }
        Update: {
          conversation_id?: string | null
          created_at?: string
          feedback_text?: string | null
          id?: string
          message_id?: string
          rating?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_feedback_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "chat_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_knowledge_base: {
        Row: {
          category: string
          content: string
          content_type: string
          created_at: string
          embeddings: string | null
          file_path: string | null
          id: string
          metadata: Json | null
          updated_at: string
        }
        Insert: {
          category: string
          content: string
          content_type: string
          created_at?: string
          embeddings?: string | null
          file_path?: string | null
          id?: string
          metadata?: Json | null
          updated_at?: string
        }
        Update: {
          category?: string
          content?: string
          content_type?: string
          created_at?: string
          embeddings?: string | null
          file_path?: string | null
          id?: string
          metadata?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      contextual_offers: {
        Row: {
          call_to_action: string
          conversion_rate: number
          created_at: string
          current_uses: number
          discount_amount: number | null
          discount_percentage: number | null
          id: string
          is_active: boolean
          max_uses: number | null
          offer_name: string
          offer_text: string
          offer_type: string
          target_intent: string
          target_profile: string
          updated_at: string
          validity_hours: number
        }
        Insert: {
          call_to_action: string
          conversion_rate?: number
          created_at?: string
          current_uses?: number
          discount_amount?: number | null
          discount_percentage?: number | null
          id?: string
          is_active?: boolean
          max_uses?: number | null
          offer_name: string
          offer_text: string
          offer_type: string
          target_intent: string
          target_profile: string
          updated_at?: string
          validity_hours?: number
        }
        Update: {
          call_to_action?: string
          conversion_rate?: number
          created_at?: string
          current_uses?: number
          discount_amount?: number | null
          discount_percentage?: number | null
          id?: string
          is_active?: boolean
          max_uses?: number | null
          offer_name?: string
          offer_text?: string
          offer_type?: string
          target_intent?: string
          target_profile?: string
          updated_at?: string
          validity_hours?: number
        }
        Relationships: []
      }
      conversion_tracking: {
        Row: {
          attribution_data: Json | null
          conversion_date: string
          conversion_event: string
          conversion_value: number | null
          created_at: string
          funnel_stage: string
          id: string
          lead_id: string
          session_id: string
        }
        Insert: {
          attribution_data?: Json | null
          conversion_date?: string
          conversion_event: string
          conversion_value?: number | null
          created_at?: string
          funnel_stage: string
          id?: string
          lead_id: string
          session_id: string
        }
        Update: {
          attribution_data?: Json | null
          conversion_date?: string
          conversion_event?: string
          conversion_value?: number | null
          created_at?: string
          funnel_stage?: string
          id?: string
          lead_id?: string
          session_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversion_tracking_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          budget_range: string | null
          company_name: string | null
          conversion_probability: number
          created_at: string
          email: string | null
          estimated_revenue: number
          id: string
          intent: string
          interaction_count: number
          last_interaction_at: string
          lead_score: number
          lead_source: string
          metadata: Json | null
          pain_points: string[] | null
          phone: string | null
          profile_type: string
          qualification_status: string
          session_id: string
          timeline: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          budget_range?: string | null
          company_name?: string | null
          conversion_probability?: number
          created_at?: string
          email?: string | null
          estimated_revenue?: number
          id?: string
          intent?: string
          interaction_count?: number
          last_interaction_at?: string
          lead_score?: number
          lead_source?: string
          metadata?: Json | null
          pain_points?: string[] | null
          phone?: string | null
          profile_type?: string
          qualification_status?: string
          session_id: string
          timeline?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          budget_range?: string | null
          company_name?: string | null
          conversion_probability?: number
          created_at?: string
          email?: string | null
          estimated_revenue?: number
          id?: string
          intent?: string
          interaction_count?: number
          last_interaction_at?: string
          lead_score?: number
          lead_source?: string
          metadata?: Json | null
          pain_points?: string[] | null
          phone?: string | null
          profile_type?: string
          qualification_status?: string
          session_id?: string
          timeline?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      merchant_accounts: {
        Row: {
          api_key: string | null
          api_secret: string | null
          business_address: string | null
          business_email: string | null
          business_name: string
          business_phone: string | null
          business_type: string | null
          created_at: string
          id: string
          is_active: boolean | null
          monthly_volume: number | null
          total_transactions: number | null
          updated_at: string
          user_id: string
          website_url: string | null
        }
        Insert: {
          api_key?: string | null
          api_secret?: string | null
          business_address?: string | null
          business_email?: string | null
          business_name: string
          business_phone?: string | null
          business_type?: string | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          monthly_volume?: number | null
          total_transactions?: number | null
          updated_at?: string
          user_id: string
          website_url?: string | null
        }
        Update: {
          api_key?: string | null
          api_secret?: string | null
          business_address?: string | null
          business_email?: string | null
          business_name?: string
          business_phone?: string | null
          business_type?: string | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          monthly_volume?: number | null
          total_transactions?: number | null
          updated_at?: string
          user_id?: string
          website_url?: string | null
        }
        Relationships: []
      }
      nurturing_sequences: {
        Row: {
          completion_rate: number
          created_at: string
          current_step: number
          engagement_score: number
          id: string
          lead_id: string
          next_action_at: string
          sequence_data: Json | null
          sequence_type: string
          status: string
          total_steps: number
          updated_at: string
        }
        Insert: {
          completion_rate?: number
          created_at?: string
          current_step?: number
          engagement_score?: number
          id?: string
          lead_id: string
          next_action_at: string
          sequence_data?: Json | null
          sequence_type: string
          status?: string
          total_steps: number
          updated_at?: string
        }
        Update: {
          completion_rate?: number
          created_at?: string
          current_step?: number
          engagement_score?: number
          id?: string
          lead_id?: string
          next_action_at?: string
          sequence_data?: Json | null
          sequence_type?: string
          status?: string
          total_steps?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "nurturing_sequences_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_methods: {
        Row: {
          code: string
          config: Json | null
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
        }
        Insert: {
          code: string
          config?: Json | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
        }
        Update: {
          code?: string
          config?: Json | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          company_name: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          is_verified: boolean | null
          phone: string | null
          role: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          company_name?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          is_verified?: boolean | null
          phone?: string | null
          role?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          company_name?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          is_verified?: boolean | null
          phone?: string | null
          role?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount: number
          callback_url: string | null
          cancel_url: string | null
          completed_at: string | null
          created_at: string | null
          currency: string | null
          customer_email: string | null
          customer_name: string | null
          customer_phone: string | null
          description: string | null
          expires_at: string | null
          id: string
          merchant_id: string
          metadata: Json | null
          payment_method: string | null
          reference_id: string
          status: string | null
          success_url: string | null
          updated_at: string | null
        }
        Insert: {
          amount: number
          callback_url?: string | null
          cancel_url?: string | null
          completed_at?: string | null
          created_at?: string | null
          currency?: string | null
          customer_email?: string | null
          customer_name?: string | null
          customer_phone?: string | null
          description?: string | null
          expires_at?: string | null
          id?: string
          merchant_id: string
          metadata?: Json | null
          payment_method?: string | null
          reference_id: string
          status?: string | null
          success_url?: string | null
          updated_at?: string | null
        }
        Update: {
          amount?: number
          callback_url?: string | null
          cancel_url?: string | null
          completed_at?: string | null
          created_at?: string | null
          currency?: string | null
          customer_email?: string | null
          customer_name?: string | null
          customer_phone?: string | null
          description?: string | null
          expires_at?: string | null
          id?: string
          merchant_id?: string
          metadata?: Json | null
          payment_method?: string | null
          reference_id?: string
          status?: string | null
          success_url?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transactions_merchant_id_fkey"
            columns: ["merchant_id"]
            isOneToOne: false
            referencedRelation: "merchant_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      webhook_events: {
        Row: {
          attempts: number | null
          created_at: string | null
          delivered: boolean | null
          event_type: string
          id: string
          last_attempt_at: string | null
          max_attempts: number | null
          merchant_id: string
          next_retry_at: string | null
          payload: Json
          transaction_id: string | null
          webhook_url: string
        }
        Insert: {
          attempts?: number | null
          created_at?: string | null
          delivered?: boolean | null
          event_type: string
          id?: string
          last_attempt_at?: string | null
          max_attempts?: number | null
          merchant_id: string
          next_retry_at?: string | null
          payload: Json
          transaction_id?: string | null
          webhook_url: string
        }
        Update: {
          attempts?: number | null
          created_at?: string | null
          delivered?: boolean | null
          event_type?: string
          id?: string
          last_attempt_at?: string | null
          max_attempts?: number | null
          merchant_id?: string
          next_retry_at?: string | null
          payload?: Json
          transaction_id?: string | null
          webhook_url?: string
        }
        Relationships: [
          {
            foreignKeyName: "webhook_events_merchant_id_fkey"
            columns: ["merchant_id"]
            isOneToOne: false
            referencedRelation: "merchant_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "webhook_events_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "transactions"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      binary_quantize: {
        Args: { "": string } | { "": unknown }
        Returns: unknown
      }
      get_current_user_role: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      halfvec_avg: {
        Args: { "": number[] }
        Returns: unknown
      }
      halfvec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      halfvec_send: {
        Args: { "": unknown }
        Returns: string
      }
      halfvec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      hnsw_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_sparsevec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnswhandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflat_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflat_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflathandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      l2_norm: {
        Args: { "": unknown } | { "": unknown }
        Returns: number
      }
      l2_normalize: {
        Args: { "": string } | { "": unknown } | { "": unknown }
        Returns: unknown
      }
      setup_super_admin: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      sparsevec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      sparsevec_send: {
        Args: { "": unknown }
        Returns: string
      }
      sparsevec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      vector_avg: {
        Args: { "": number[] }
        Returns: string
      }
      vector_dims: {
        Args: { "": string } | { "": unknown }
        Returns: number
      }
      vector_norm: {
        Args: { "": string }
        Returns: number
      }
      vector_out: {
        Args: { "": string }
        Returns: unknown
      }
      vector_send: {
        Args: { "": string }
        Returns: string
      }
      vector_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
