
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  subject: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData: ContactFormData = await req.json();
    console.log("Received contact form data:", formData);

    // Send notification email to SenePay team
    const adminEmailResponse = await resend.emails.send({
      from: "SenePay Contact <contact@senepay.sn>",
      to: ["contact@senepay.sn"],
      subject: `[SenePay Contact] ${formData.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #F59E0B 0%, #EA580C 50%, #059669 100%); padding: 20px; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Nouveau message de contact</h1>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px;">
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #0F172A; margin-top: 0;">Informations du contact</h2>
              <p><strong>Nom:</strong> ${formData.name}</p>
              <p><strong>Email:</strong> ${formData.email}</p>
              ${formData.company ? `<p><strong>Entreprise:</strong> ${formData.company}</p>` : ''}
              ${formData.phone ? `<p><strong>Téléphone:</strong> ${formData.phone}</p>` : ''}
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 8px;">
              <h3 style="color: #0F172A; margin-top: 0;">Sujet: ${formData.subject}</h3>
              <div style="background: #f8f9fa; padding: 15px; border-radius: 4px; border-left: 4px solid #F59E0B;">
                <p style="margin: 0; line-height: 1.6;">${formData.message.replace(/\n/g, '<br>')}</p>
              </div>
            </div>
          </div>
        </div>
      `,
    });

    // Send confirmation email to user
    const userEmailResponse = await resend.emails.send({
      from: "SenePay Support <support@senepay.sn>",
      to: [formData.email],
      subject: "Confirmation de réception - SenePay",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #F59E0B 0%, #EA580C 50%, #059669 100%); padding: 20px; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Merci de nous avoir contactés !</h1>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px;">
            <p style="color: #0F172A; font-size: 16px; margin-top: 0;">
              Bonjour <strong>${formData.name}</strong>,
            </p>
            
            <p style="color: #374151; line-height: 1.6;">
              Nous avons bien reçu votre message concernant <strong>"${formData.subject}"</strong>. 
              Notre équipe vous répondra dans les plus brefs délais, généralement sous 24 heures.
            </p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #059669;">
              <h3 style="color: #0F172A; margin-top: 0;">Votre message :</h3>
              <p style="color: #374151; margin: 0; line-height: 1.6; font-style: italic;">
                "${formData.message}"
              </p>
            </div>
            
            <p style="color: #374151; line-height: 1.6;">
              En attendant, n'hésitez pas à consulter notre 
              <a href="https://senepay.lovable.app/documentation" style="color: #F59E0B; text-decoration: none;">documentation</a> 
              pour découvrir toutes les fonctionnalités de SenePay.
            </p>
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="https://senepay.lovable.app" style="background: linear-gradient(135deg, #F59E0B 0%, #EA580C 100%); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                Découvrir SenePay
              </a>
            </div>
            
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
            
            <p style="color: #6b7280; font-size: 14px; text-align: center; margin-bottom: 0;">
              Cordialement,<br>
              <strong>L'équipe SenePay</strong><br>
              <small>La passerelle de paiement révolutionnaire du Sénégal</small>
            </p>
          </div>
        </div>
      `,
    });

    console.log("Admin email sent:", adminEmailResponse);
    console.log("User confirmation email sent:", userEmailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        adminEmail: adminEmailResponse,
        userEmail: userEmailResponse 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );

  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message || "Une erreur est survenue lors de l'envoi de l'email" 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
