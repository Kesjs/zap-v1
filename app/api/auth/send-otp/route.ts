import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const { email, code } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }

    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      return NextResponse.json(
        {
          success: false,
          warning: "RESEND_API_KEY non configurée. Configurez RESEND_API_KEY dans .env.local ou le SMTP Supabase.",
        },
        { status: 200 }
      );
    }

    const resend = new Resend(resendApiKey);
    const fromEmail = process.env.RESEND_FROM_EMAIL || "ZAP <onboarding@resend.dev>";

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [email],
      subject: `Votre code d'accès ZAP : ${code || "------"}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #09090b; color: #ffffff; padding: 40px 20px; text-align: center;">
          <div style="max-width: 460px; margin: 0 auto; background-color: #121215; border: 1px solid rgba(255,255,255,0.12); border-radius: 16px; padding: 36px 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
            <div style="width: 44px; height: 44px; background: #ffffff; border-radius: 10px; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; font-weight: bold; color: #000000; font-size: 18px;">
              Z
            </div>
            <h1 style="color: #ffffff; font-size: 22px; margin-bottom: 8px; font-weight: 600; letter-spacing: -0.02em;">Code de vérification</h1>
            <p style="color: #a1a1aa; font-size: 14px; margin-bottom: 24px; line-height: 1.5;">Utilisez le code à usage unique suivant pour accéder à votre cockpit :</p>
            <div style="display: inline-block; background-color: #18181b; border: 1px solid rgba(255,255,255,0.2); border-radius: 12px; padding: 14px 28px; font-size: 30px; font-weight: 700; letter-spacing: 8px; color: #ffffff; margin-bottom: 24px;">
              ${code}
            </div>
            <p style="color: #71717a; font-size: 12px; margin-top: 16px; line-height: 1.5;">Ce code expire dans 10 minutes.<br>Si vous n'êtes pas à l'origine de cette demande, ignorez cet email.</p>
          </div>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Erreur interne" }, { status: 500 });
  }
}
