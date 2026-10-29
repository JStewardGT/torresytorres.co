/**
 * Cloudflare Worker para el envío seguro de correos con Resend
 * Desplegado en: https://torres-contact-api.johans-galeanot.workers.dev
 *
 * Configuración requerida en Cloudflare Dashboard -> Settings -> Variables and Secrets:
 * 1. RESEND_API_KEY (Secret): Tu clave de Resend que empieza por "re_..."
 * 2. FROM_EMAIL (Variable opcional): "TORRES & TORRES <notificaciones@tudominio.com>"
 */

export default {
  async fetch(request, env) {
    // Manejo de CORS
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== "POST") {
      return new Response(JSON.stringify({ error: "Método no permitido" }), {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    try {
      const data = await request.json();

      // Descartar si el honeypot fue completado por un bot
      if (data._gotcha) {
        return new Response(JSON.stringify({ success: true, message: "Ignored" }), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Validación de campos
      if (!data.fullName || !data.email || !data.message) {
        return new Response(
          JSON.stringify({ error: "Faltan campos obligatorios (nombre, correo o mensaje)" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      if (!env.RESEND_API_KEY) {
        return new Response(
          JSON.stringify({ error: "Falta configurar la variable RESEND_API_KEY en Cloudflare" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Envío formal a través de Resend API
      const resendResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: env.FROM_EMAIL || "TORRES & TORRES <onboarding@resend.dev>",
          to: ["contacto@torresytorres.co"],
          reply_to: data.email,
          subject: `[Consulta Legal] ${data.service || 'General'} - ${data.fullName}`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 620px; margin: 0 auto; padding: 24px; border: 1px solid #081225/15; border-radius: 12px; background-color: #ffffff; color: #081225;">
              <div style="border-bottom: 2px solid #C5A880; padding-bottom: 12px; margin-bottom: 20px;">
                <span style="font-size: 11px; font-weight: bold; letter-spacing: 2px; color: #C5A880; text-transform: uppercase;">Portal Web Oficial</span>
                <h2 style="margin: 4px 0 0; color: #081225; font-size: 22px;">Nuevo Requerimiento Confidencial</h2>
              </div>

              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
                <tr>
                  <td style="padding: 8px 0; color: #666; width: 140px;"><strong>Cliente:</strong></td>
                  <td style="padding: 8px 0; color: #081225; font-weight: 600;">${data.fullName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666;"><strong>Tipo Solicitante:</strong></td>
                  <td style="padding: 8px 0; color: #081225;">${data.clientType === 'empresa' ? 'Persona Jurídica / Empresa' : 'Persona Natural / Familia'}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666;"><strong>Correo:</strong></td>
                  <td style="padding: 8px 0;"><a href="mailto:${data.email}" style="color: #0D1C39; font-weight: bold;">${data.email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666;"><strong>Teléfono:</strong></td>
                  <td style="padding: 8px 0; color: #081225;"><a href="tel:${data.phone}" style="color: #081225;">${data.phone || 'No suministrado'}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666;"><strong>Servicio:</strong></td>
                  <td style="padding: 8px 0; color: #C5A880; font-weight: bold;">${data.service || 'Consulta General'}</td>
                </tr>
              </table>

              <div style="background-color: #f7f8fa; border-left: 4px solid #081225; padding: 16px; border-radius: 4px; margin-bottom: 24px;">
                <p style="margin: 0 0 8px; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; color: #888;">Síntesis de la Consulta:</p>
                <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #1a1a1a; white-space: pre-wrap;">${data.message}</p>
              </div>

              <footer style="border-top: 1px solid #eee; padding-top: 14px; font-size: 11px; color: #999; text-align: center;">
                TORRES &amp; TORRES Abogados Asociados S.A.S. — Bogotá, Colombia
              </footer>
            </div>
          `,
        }),
      });

      const resendData = await resendResponse.json();

      if (!resendResponse.ok) {
        return new Response(JSON.stringify({ error: resendData }), {
          status: resendResponse.status,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify({ success: true, id: resendData.id }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  },
};
