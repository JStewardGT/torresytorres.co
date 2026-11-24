/**
 * Cloudflare Worker para el envío seguro de correos con Resend
 * Desplegado en: https://torres-contact-api.johans-galeanot.workers.dev
 *
 * Configuración requerida en Cloudflare Dashboard -> Settings -> Variables and Secrets:
 * 1. RESEND_API_KEY (Secret): Tu clave de Resend que empieza por "re_..."
 * 2. FROM_EMAIL (Variable opcional): "TORRES & TORRES <notificaciones@tudominio.com>"
 * 3. DESTINATION_EMAIL (Variable opcional): Correo donde recibirás las consultas
 */

function generateEmailHtml(data) {
  const isCompany = data.clientType === 'empresa';
  const clientTypeBadge = isCompany ? 'Persona Jurídica / Empresa' : 'Persona Natural / Familia';
  const cleanPhone = (data.phone || '').replace(/[^0-9]/g, '');
  const waLink = cleanPhone
    ? `https://wa.me/${cleanPhone.startsWith('57') ? cleanPhone : '57' + cleanPhone}?text=${encodeURIComponent(`Estimado/a ${data.fullName}, le contactamos de TORRES & TORRES Abogados Asociados en respuesta a su consulta legal sobre ${data.service || 'su caso'}.`)}`
    : null;

  return `<!DOCTYPE html>
<html lang="es" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Nuevo Requerimiento Jurídico - TORRES &amp; TORRES</title>
  <!--[if mso]>
  <style type="text/css">
    table {border-collapse:collapse;border-spacing:0;margin:0;}
    div, td {padding:0;}
    div {margin:0 !important;}
  </style>
  <![endif]-->
  <style type="text/css">
    @media only screen and (max-width: 620px) {
      .mobile-padding { padding-left: 20px !important; padding-right: 20px !important; }
      .mobile-stack { display: block !important; width: 100% !important; max-width: 100% !important; }
      .mobile-button { display: block !important; width: 100% !important; text-align: center !important; margin-bottom: 10px !important; padding-left: 0 !important; padding-right: 0 !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; width: 100% !important; background-color: #050B16; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Plus Jakarta Sans', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">

  <!-- Preheader text (visible in inbox snippet preview) -->
  <div style="display: none; font-size: 1px; color: #050B16; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
    Nuevo requerimiento legal de ${data.fullName} para ${data.service || 'Consulta General'} — TORRES &amp; TORRES Abogados Asociados
  </div>

  <!-- Background Wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #050B16; padding: 32px 12px;">
    <tr>
      <td align="center">
        <!-- Main Container Card -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 620px; background-color: #081225; border: 1px solid #1E2D4A; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.5);">
          
          <!-- Top Gold Accent Line -->
          <tr>
            <td height="4" style="background-color: #C5A880; font-size: 0; line-height: 0;">&nbsp;</td>
          </tr>

          <!-- Header Section -->
          <tr>
            <td class="mobile-padding" style="padding: 36px 36px 24px; text-align: center; background-color: #081225; border-bottom: 1px solid #152238;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center">
                    <!-- Brand Monogram -->
                    <div style="font-family: 'Times New Roman', Times, Georgia, serif; font-size: 24px; font-weight: 700; letter-spacing: 4px; color: #F8FAFC; text-transform: uppercase;">
                      TORRES <span style="color: #C5A880;">&amp;</span> TORRES
                    </div>
                    <div style="font-size: 10px; font-weight: 600; letter-spacing: 3.5px; color: #C5A880; text-transform: uppercase; margin-top: 6px;">
                      Abogados Asociados
                    </div>

                    <!-- Category Pill Badge -->
                    <div style="margin-top: 20px; display: inline-block;">
                      <table cellpadding="0" cellspacing="0" border="0" align="center">
                        <tr>
                          <td style="padding: 5px 14px; background-color: rgba(197, 168, 128, 0.12); border: 1px solid rgba(197, 168, 128, 0.35); border-radius: 20px; font-size: 10px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-weight: 600; letter-spacing: 2px; color: #C5A880; text-transform: uppercase;">
                            ● Portal Web Oficial &bull; Requerimiento Confidencial
                          </td>
                        </tr>
                      </table>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Content Section -->
          <tr>
            <td class="mobile-padding" style="padding: 32px 36px;">
              
              <!-- Section Title -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 24px;">
                <tr>
                  <td>
                    <h1 style="margin: 0 0 6px; font-family: 'Times New Roman', Times, Georgia, serif; font-size: 22px; font-weight: 400; color: #FFFFFF; letter-spacing: 0.5px;">
                      Detalles de la Solicitud
                    </h1>
                    <p style="margin: 0; font-size: 13px; color: #94A3B8; line-height: 1.5;">
                      Un nuevo cliente potencial ha completado el formulario de contacto oficial solicitando asesoría jurídica especializada.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Information Grid Card -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #0D1C39; border: 1px solid #1A2E50; border-radius: 12px; margin-bottom: 24px; overflow: hidden;">
                <!-- Solicitante -->
                <tr>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #162644; width: 130px; font-size: 12px; font-weight: 600; color: #8F9CAE; text-transform: uppercase; letter-spacing: 1px;">
                    Cliente
                  </td>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #162644; font-size: 14px; font-weight: 600; color: #F8FAFC;">
                    ${data.fullName}
                  </td>
                </tr>
                <!-- Perfil / Tipo de Cliente -->
                <tr>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #162644; font-size: 12px; font-weight: 600; color: #8F9CAE; text-transform: uppercase; letter-spacing: 1px;">
                    Tipo
                  </td>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #162644; font-size: 13px; color: #CBD5E1;">
                    <span style="display: inline-block; padding: 3px 8px; border-radius: 6px; background-color: #152238; border: 1px solid #233658; font-size: 11px; font-weight: 500; color: #93C5FD;">
                      ${clientTypeBadge}
                    </span>
                  </td>
                </tr>
                <!-- Área de Práctica / Servicio -->
                <tr>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #162644; font-size: 12px; font-weight: 600; color: #8F9CAE; text-transform: uppercase; letter-spacing: 1px;">
                    Especialidad
                  </td>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #162644; font-size: 13px; font-weight: 600; color: #C5A880;">
                    ${data.service || 'Consulta General'}
                  </td>
                </tr>
                <!-- Correo Electrónico -->
                <tr>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #162644; font-size: 12px; font-weight: 600; color: #8F9CAE; text-transform: uppercase; letter-spacing: 1px;">
                    Correo
                  </td>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #162644; font-size: 13px;">
                    <a href="mailto:${data.email}" style="color: #60A5FA; text-decoration: none; font-weight: 500;">
                      ${data.email}
                    </a>
                  </td>
                </tr>
                <!-- Teléfono -->
                <tr>
                  <td style="padding: 14px 18px; font-size: 12px; font-weight: 600; color: #8F9CAE; text-transform: uppercase; letter-spacing: 1px;">
                    Teléfono
                  </td>
                  <td style="padding: 14px 18px; font-size: 13px;">
                    ${data.phone ? `<a href="tel:${data.phone}" style="color: #F8FAFC; text-decoration: none; font-weight: 500;">${data.phone}</a>` : '<span style="color: #64748B; font-style: italic;">No suministrado</span>'}
                  </td>
                </tr>
              </table>

              <!-- Message Callout Card -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #0A162D; border: 1px solid #1A2E50; border-left: 4px solid #C5A880; border-radius: 8px; margin-bottom: 28px;">
                <tr>
                  <td style="padding: 18px 20px;">
                    <div style="font-size: 11px; font-weight: 700; color: #C5A880; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 10px;">
                      Síntesis del Requerimiento / Mensaje:
                    </div>
                    <div style="font-size: 14px; line-height: 1.7; color: #E2E8F0; white-space: pre-wrap; word-break: break-word;">
                      ${data.message}
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Interactive Actions / Quick Response CTAs -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center">
                    <table cellpadding="0" cellspacing="0" border="0" class="mobile-stack">
                      <tr>
                        <!-- Primary Reply Button -->
                        <td align="center" class="mobile-button" style="padding: 0 6px 10px;">
                          <a href="mailto:${data.email}?subject=Re:%20Consulta%20Legal%20-%20TORRES%20%26%20TORRES&body=Estimado(a)%20${encodeURIComponent(data.fullName)},%0A%0AGracias%20por%20contactar%20a%20TORRES%20%26%20TORRES%20Abogados%20Asociados.%20En%20referencia%20a%20su%20solicitud%20sobre%20${encodeURIComponent(data.service || 'su consulta')}:%0A%0A" 
                             style="display: inline-block; background-color: #C5A880; color: #081225; font-size: 12px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; text-decoration: none; padding: 13px 22px; border-radius: 8px; box-shadow: 0 4px 14px rgba(197, 168, 128, 0.25);">
                            ✉ Responder por Correo
                          </a>
                        </td>
                        ${waLink ? `
                        <!-- Secondary WhatsApp Button -->
                        <td align="center" class="mobile-button" style="padding: 0 6px 10px;">
                          <a href="${waLink}" target="_blank"
                             style="display: inline-block; background-color: #12213D; color: #25D366; border: 1px solid rgba(37, 211, 102, 0.4); font-size: 12px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; text-decoration: none; padding: 12px 20px; border-radius: 8px;">
                            💬 Abrir WhatsApp
                          </a>
                        </td>` : ''}
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer Section -->
          <tr>
            <td class="mobile-padding" style="padding: 24px 36px 32px; background-color: #060E1C; border-top: 1px solid #131E33; text-align: center;">
              <p style="margin: 0 0 6px; font-size: 12px; font-weight: 600; color: #94A3B8; letter-spacing: 1px; text-transform: uppercase;">
                TORRES &amp; TORRES Abogados Asociados S.A.S.
              </p>
              <p style="margin: 0 0 16px; font-size: 11px; color: #64748B;">
                Bogotá D.C., Colombia &bull; <a href="https://torresytorres.co" style="color: #C5A880; text-decoration: none;">www.torresytorres.co</a>
              </p>
              <p style="margin: 0; font-size: 10px; line-height: 1.6; color: #475569; max-width: 480px;">
                AVISO DE CONFIDENCIALIDAD: Este mensaje y cualquier archivo adjunto están destinados exclusivamente a la firma y contienen información amparada por el secreto profesional del abogado y las normas colombianas de protección de datos personales (Ley 1581 de 2012).
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>`;
}

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

      // Validación de campos obligatorios
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

      const emailHtml = generateEmailHtml(data);

      // Envío formal a través de Resend API
      const resendResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: env.FROM_EMAIL || "TORRES & TORRES <onboarding@resend.dev>",
          to: [env.DESTINATION_EMAIL || "johans.galeanot@gmail.com"],
          reply_to: data.email,
          subject: `[Consulta Legal] ${data.service || 'General'} - ${data.fullName}`,
          html: emailHtml,
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
