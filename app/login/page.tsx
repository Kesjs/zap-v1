"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import OtpInput from "@/components/auth/otp-input";
import { AlertBanner } from "@/components/ui/alert-banner";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

type AuthTab = "login" | "register" | "forgot";
type LoginMethod = "otp" | "password";
type ErrorContext = "otp-send" | "otp-verify" | "password-login" | "register" | "forgot";

// ─────────────────────────────────────────────────────────────────────────
// Traduction des erreurs Supabase en messages clairs, sans jargon technique.
// ─────────────────────────────────────────────────────────────────────────
function mapAuthError(error: any, context: ErrorContext): string {
  const raw = String(error?.message || "");

  if (/invalid login credentials/i.test(raw)) return "Email ou mot de passe incorrect.";
  if (/email not confirmed/i.test(raw))
    return "Confirmez votre email avant de vous connecter — vérifiez votre boîte de réception.";
  if (/rate limit|too many requests/i.test(raw) || error?.status === 429)
    return "Trop de tentatives. Patientez une minute avant de réessayer.";
  if (/user already registered/i.test(raw))
    return "Un compte existe déjà avec cet email. Connectez-vous plutôt.";
  if (/expired/i.test(raw)) return "Ce code a expiré. Demandez-en un nouveau.";
  if (/invalid token|invalid_grant|token/i.test(raw))
    return "Code incorrect. Vérifiez les 6 chiffres reçus par email.";
  if (/failed to fetch|network/i.test(raw))
    return "Connexion impossible. Vérifiez votre réseau et réessayez.";

  switch (context) {
    case "otp-send":
      return "Impossible d'envoyer le code. Réessayez dans un instant.";
    case "otp-verify":
      return "Code incorrect ou expiré.";
    case "password-login":
      return "Connexion impossible. Vérifiez vos identifiants.";
    case "register":
      return "Impossible de créer le compte. Vérifiez vos informations.";
    case "forgot":
      return "Impossible d'envoyer le lien de réinitialisation.";
  }
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginPageInner />
    </Suspense>
  );
}

function LoginPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialTab: AuthTab = searchParams.get("tab") === "register" ? "register" : "login";
  const [activeTab, setActiveTab] = useState<AuthTab>(initialTab);
  const [loginMethod, setLoginMethod] = useState<LoginMethod>("otp");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [craft, setCraft] = useState("Menuiserie / Bois");

  const [otpStep, setOtpStep] = useState<"email" | "code">("email");
  const [otpCode, setOtpCode] = useState("");
  const [resendTimer, setResendTimer] = useState(30);
  const [hasOtpError, setHasOtpError] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const validateEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  const isEmailValid = validateEmail(email);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activeTab === "login" && loginMethod === "otp" && otpStep === "code" && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => (prev <= 1 ? 0 : prev - 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeTab, loginMethod, otpStep, resendTimer]);

  const switchTab = (tab: AuthTab) => {
    setActiveTab(tab);
    setGeneralError("");
    setSuccessMessage("");
    setOtpStep("email");
    setOtpCode("");
  };

  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!isEmailValid || isLoading) return;
    setIsLoading(true);
    setGeneralError("");
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: { shouldCreateUser: true, data: { app: "zap" } },
      });
      if (error) throw error;
      setOtpStep("code");
      setResendTimer(30);
    } catch (err: any) {
      setGeneralError(mapAuthError(err, "otp-send"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (codeToVerify?: string) => {
    const code = codeToVerify || otpCode;
    if (code.length < 6 || isLoading) return;
    setIsLoading(true);
    setGeneralError("");
    setHasOtpError(false);
    try {
      const { error } = await supabase.auth.verifyOtp({
        email: email.trim(),
        token: code,
        type: "email",
      });
      if (error) throw error;
      setIsSuccess(true);
      setTimeout(() => router.push(searchParams.get("next") || "/dashboard"), 700);
    } catch (err: any) {
      setHasOtpError(true);
      setGeneralError(mapAuthError(err, "otp-verify"));
      setOtpCode("");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEmailValid || !password || isLoading) return;
    setIsLoading(true);
    setGeneralError("");
    try {
      const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      if (error) throw error;
      setIsSuccess(true);
      setTimeout(() => router.push(searchParams.get("next") || "/dashboard"), 700);
    } catch (err: any) {
      setGeneralError(mapAuthError(err, "password-login"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEmailValid || !fullName || isLoading) return;
    setIsLoading(true);
    setGeneralError("");
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: password || crypto.randomUUID(),
        options: {
          data: { app: "zap", full_name: fullName, business_name: businessName, craft },
        },
      });
      if (error) throw error;

      if (data.session) {
        setSuccessMessage("Compte créé avec succès ! Redirection vers votre cockpit...");
        setIsSuccess(true);
        setTimeout(() => router.push("/dashboard"), 900);
      } else {
        setSuccessMessage(
          "Compte créé ! Vérifiez votre boîte mail pour confirmer votre adresse avant de vous connecter."
        );
        setIsSuccess(true);
      }
    } catch (err: any) {
      setGeneralError(mapAuthError(err, "register"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEmailValid || isLoading) return;
    setIsLoading(true);
    setGeneralError("");
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/dashboard`,
      });
      if (error) throw error;
      setSuccessMessage("Un lien de réinitialisation sécurisé vous a été envoyé par email.");
    } catch (err: any) {
      setGeneralError(mapAuthError(err, "forgot"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center px-4 py-8 sm:py-12"
      style={{ background: "#F1EBDD" }}
    >
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600&display=swap"
      />

      <div className="w-full max-w-[440px]">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/" className="inline-flex items-center gap-2.5 no-underline">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold"
              style={{ background: "#22314A", color: "#F1EBDD", fontFamily: "'Fraunces', serif" }}
            >
              Z
            </div>
            <span
              style={{ fontFamily: "'Fraunces', serif", fontSize: "19px", fontWeight: 600, color: "#22314A" }}
            >
              ZAP
            </span>
          </Link>
          <span className="text-xs font-medium" style={{ color: "rgba(34,49,74,0.45)" }}>
            Bénin · Côte d'Ivoire
          </span>
        </div>

        {/* Bande de preuve compacte — visible sur tous les écrans, pas cachée sur mobile */}
        <div
          className="flex gap-3 overflow-x-auto mb-6 pb-1"
          style={{ scrollbarWidth: "none" }}
        >
          <div
            className="shrink-0 relative overflow-hidden"
            style={{ width: "232px", background: "#FFFFFF", border: "1px solid rgba(34,49,74,0.14)", borderRadius: "6px", padding: "16px 16px 13px" }}
          >
            <div
              aria-hidden
              className="absolute top-0 left-0 right-0"
              style={{
                height: "12px",
                background: "#F1EBDD",
                WebkitMaskImage:
                  "radial-gradient(circle 4.5px at 11px 6px, transparent 4.5px, black 5px)",
                WebkitMaskRepeat: "repeat-x",
                WebkitMaskSize: "22px 12px",
                maskImage: "radial-gradient(circle 4.5px at 11px 6px, transparent 4.5px, black 5px)",
                maskRepeat: "repeat-x",
                maskSize: "22px 12px",
              }}
            />
            <p
              className="text-[9px] font-semibold uppercase tracking-wider mb-2"
              style={{ color: "#9C4A36" }}
            >
              Facture N° 0104
            </p>
            <div className="flex justify-between text-[11.5px] py-1" style={{ color: "#22314A", borderBottom: "1px dashed rgba(34,49,74,0.14)" }}>
              <span>Table réunion teck</span>
              <span>350 000</span>
            </div>
            <div className="flex justify-between text-[11.5px] py-1" style={{ color: "#22314A" }}>
              <span>Livraison & pose</span>
              <span>35 000</span>
            </div>
            <div
              className="flex justify-between text-[12.5px] font-semibold pt-1.5 mt-1"
              style={{ color: "#22314A", borderTop: "1px solid #22314A" }}
            >
              <span>Total réglé</span>
              <span>385 000 F</span>
            </div>
          </div>

          <div
            className="shrink-0 flex items-center justify-center"
            style={{ width: "140px", background: "#FFFFFF", border: "1px solid rgba(34,49,74,0.14)", borderRadius: "6px" }}
          >
            <div
              className="rounded-full flex flex-col items-center justify-center text-center"
              style={{
                width: "82px",
                height: "82px",
                border: "2px solid #4A3B78",
                color: "#4A3B78",
                opacity: 0.85,
                transform: "rotate(-9deg)",
              }}
            >
              <span style={{ fontFamily: "'Fraunces', serif", fontSize: "11px", fontWeight: 600 }}>ZAP</span>
              <span style={{ fontSize: "7px", fontWeight: 600, letterSpacing: "0.06em", lineHeight: 1.3 }}>
                DOCUMENT
                <br />
                CERTIFIÉ
              </span>
            </div>
          </div>
        </div>

        {/* Card */}
        <div
          className="p-6 sm:p-8"
          style={{ background: "#FFFFFF", border: "1px solid rgba(34,49,74,0.14)", borderRadius: "12px" }}
        >
          {/* Tabs */}
          {activeTab !== "forgot" && (
            <div className="flex mb-6" style={{ borderBottom: "1.5px solid rgba(34,49,74,0.14)" }}>
              {(["login", "register"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => switchTab(tab)}
                  className="flex-1 text-center pb-3 text-sm font-medium relative"
                  style={{ color: activeTab === tab ? "#22314A" : "rgba(34,49,74,0.45)" }}
                >
                  {tab === "login" ? "Connexion" : "Inscription"}
                  {activeTab === tab && (
                    <span
                      className="absolute left-2 right-2"
                      style={{ bottom: "-1.5px", height: "2.5px", background: "#C4634B", borderRadius: "2px" }}
                    />
                  )}
                </button>
              ))}
            </div>
          )}

          {generalError && (
            <div className="mb-4">
              <AlertBanner variant="error" message={generalError} />
            </div>
          )}
          {successMessage && (
            <div className="mb-4">
              <AlertBanner variant="success" message={successMessage} />
            </div>
          )}

          {/* TAB: CONNEXION */}
          {activeTab === "login" && (
            <div>
              <h1
                className="mb-1.5"
                style={{ fontFamily: "'Fraunces', serif", fontSize: "24px", fontWeight: 500, color: "#22314A" }}
              >
                Retrouvez votre carnet
              </h1>
              <p className="text-[13px] mb-6" style={{ color: "rgba(34,49,74,0.6)" }}>
                Vos devis, factures et reçus, toujours signés et tamponnés.
              </p>

              {loginMethod === "otp" ? (
                <div>
                  {otpStep === "email" ? (
                    <form onSubmit={handleSendOtp} className="space-y-4">
                      <Field label="Adresse email professionnelle">
                        <input
                          type="email"
                          required
                          placeholder="artisan@atelier.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          style={inputStyle}
                        />
                      </Field>
                      <button
                        type="submit"
                        disabled={!isEmailValid || isLoading}
                        style={ctaStyle(!isEmailValid || isLoading)}
                        className="w-full flex items-center justify-center gap-2"
                      >
                        {isLoading ? "Envoi en cours..." : "Recevoir mon code"}
                        <ArrowRightIcon className="w-4 h-4" />
                      </button>
                    </form>
                  ) : (
                    <div className="space-y-5">
                      <div className="text-center">
                        <p className="text-xs mb-1" style={{ color: "rgba(34,49,74,0.55)" }}>
                          Code à 6 chiffres envoyé à :
                        </p>
                        <p className="text-sm font-medium flex items-center justify-center gap-2" style={{ color: "#22314A" }}>
                          {email}
                          <button
                            type="button"
                            onClick={() => setOtpStep("email")}
                            className="text-xs underline"
                            style={{ color: "rgba(34,49,74,0.55)" }}
                          >
                            Modifier
                          </button>
                        </p>
                      </div>

                      <OtpInput
                        length={6}
                        value={otpCode}
                        onChange={setOtpCode}
                        onComplete={handleVerifyOtp}
                        hasError={hasOtpError}
                        isSuccess={isSuccess}
                        isDisabled={isLoading}
                      />

                      <div className="text-center pt-1">
                        {resendTimer > 0 ? (
                          <span className="text-xs font-mono" style={{ color: "rgba(34,49,74,0.45)" }}>
                            Renvoyer un code dans 00:{resendTimer < 10 ? `0${resendTimer}` : resendTimer}
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleSendOtp()}
                            disabled={isLoading}
                            className="text-xs font-medium hover:underline"
                            style={{ color: "#C4634B" }}
                          >
                            Renvoyer un nouveau code
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <form onSubmit={handlePasswordLogin} className="space-y-4">
                  <Field label="Adresse email">
                    <input
                      type="email"
                      required
                      placeholder="nom@entreprise.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={inputStyle}
                    />
                  </Field>
                  <Field
                    label="Mot de passe"
                    action={
                      <button
                        type="button"
                        onClick={() => switchTab("forgot")}
                        className="text-xs font-medium hover:underline"
                        style={{ color: "#C4634B" }}
                      >
                        Mot de passe oublié ?
                      </button>
                    }
                  >
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      style={inputStyle}
                    />
                  </Field>
                  <button
                    type="submit"
                    disabled={!isEmailValid || !password || isLoading}
                    style={ctaStyle(!isEmailValid || !password || isLoading)}
                    className="w-full"
                  >
                    {isLoading ? "Connexion..." : "Se connecter"}
                  </button>
                </form>
              )}

              <div className="text-center mt-4 text-xs" style={{ color: "rgba(34,49,74,0.55)" }}>
                {loginMethod === "otp" ? (
                  <>
                    ou{" "}
                    <button
                      type="button"
                      onClick={() => setLoginMethod("password")}
                      className="font-medium hover:underline"
                      style={{ color: "#22314A" }}
                    >
                      utiliser un mot de passe
                    </button>
                  </>
                ) : (
                  <>
                    ou{" "}
                    <button
                      type="button"
                      onClick={() => {
                        setLoginMethod("otp");
                        setOtpStep("email");
                      }}
                      className="font-medium hover:underline"
                      style={{ color: "#22314A" }}
                    >
                      recevoir un code par email
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

          {/* TAB: INSCRIPTION */}
          {activeTab === "register" && (
            <div>
              <h1
                className="mb-1.5"
                style={{ fontFamily: "'Fraunces', serif", fontSize: "24px", fontWeight: 500, color: "#22314A" }}
              >
                Créez votre atelier
              </h1>
              <div
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full mb-6"
                style={{ background: "rgba(196,99,75,0.12)", color: "#9C4A36" }}
              >
                <span className="w-1 h-1 rounded-full" style={{ background: "#9C4A36" }} />
                8 documents offerts · aucune carte requise
              </div>

              <form onSubmit={handleRegister} className="space-y-3.5">
                <Field label="Votre nom complet">
                  <input
                    type="text"
                    required
                    placeholder="Ex: Koffi Mensah"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    style={inputStyle}
                  />
                </Field>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Field label="Nom de l'activité">
                    <input
                      type="text"
                      placeholder="Ex: Atelier Teck & Or"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      style={inputStyle}
                    />
                  </Field>
                  <Field label="Métier principal">
                    <select value={craft} onChange={(e) => setCraft(e.target.value)} style={inputStyle}>
                      <option value="Menuiserie / Bois">Menuiserie / Bois</option>
                      <option value="Couture & Mode">Couture & Mode</option>
                      <option value="Mécanique & Auto">Mécanique & Auto</option>
                      <option value="BTP & Chantiers">BTP & Chantiers</option>
                      <option value="Commerce / Boutique">Commerce / Boutique</option>
                      <option value="Autre service">Autre service</option>
                    </select>
                  </Field>
                </div>

                <Field label="Adresse email">
                  <input
                    type="email"
                    required
                    placeholder="contact@atelier.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={inputStyle}
                  />
                </Field>

                <Field label="Mot de passe (optionnel)">
                  <input
                    type="password"
                    placeholder="Laissez vide pour vous connecter par code email"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={inputStyle}
                  />
                  <p className="mt-1 text-[11px]" style={{ color: "rgba(34,49,74,0.5)" }}>
                    Sans mot de passe, connectez-vous plus tard avec un code reçu par email.
                  </p>
                </Field>

                <button
                  type="submit"
                  disabled={!isEmailValid || !fullName || isLoading}
                  style={{ ...ctaStyle(!isEmailValid || !fullName || isLoading), marginTop: "6px" }}
                  className="w-full"
                >
                  {isLoading ? "Création en cours..." : "Créer mon compte"}
                </button>
              </form>

              <div className="mt-4 text-center text-xs" style={{ color: "rgba(34,49,74,0.55)" }}>
                Déjà inscrit ?{" "}
                <button
                  type="button"
                  onClick={() => switchTab("login")}
                  className="font-medium hover:underline"
                  style={{ color: "#22314A" }}
                >
                  Connectez-vous
                </button>
              </div>
            </div>
          )}

          {/* TAB: RÉCUPÉRATION */}
          {activeTab === "forgot" && (
            <div>
              <button
                type="button"
                onClick={() => switchTab("login")}
                className="inline-flex items-center gap-1.5 text-xs font-medium mb-4"
                style={{ color: "rgba(34,49,74,0.55)" }}
              >
                <ArrowLeftIcon className="w-3.5 h-3.5" />
                Retour à la connexion
              </button>
              <h1
                className="mb-1.5"
                style={{ fontFamily: "'Fraunces', serif", fontSize: "22px", fontWeight: 500, color: "#22314A" }}
              >
                Récupération de compte
              </h1>
              <p className="text-[13px] mb-6" style={{ color: "rgba(34,49,74,0.6)" }}>
                Entrez l'email associé à votre compte. Vous recevrez un lien pour réinitialiser vos accès.
              </p>

              <form onSubmit={handleForgotPassword} className="space-y-4">
                <Field label="Adresse email">
                  <input
                    type="email"
                    required
                    placeholder="nom@entreprise.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={inputStyle}
                  />
                </Field>
                <button
                  type="submit"
                  disabled={!isEmailValid || isLoading}
                  style={ctaStyle(!isEmailValid || isLoading)}
                  className="w-full"
                >
                  {isLoading ? "Envoi..." : "Envoyer le lien de récupération"}
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-5 px-1 text-xs" style={{ color: "rgba(34,49,74,0.45)" }}>
          <div className="flex items-center gap-4">
            <Link href="/#faq" className="hover:underline">
              FAQ
            </Link>
            <Link href="/#pricing" className="hover:underline">
              Tarifs
            </Link>
          </div>
          <a
            href="https://wa.me/22997000000"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
            style={{ color: "#9C4A36" }}
          >
            Support WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Petits helpers de présentation, locaux à cette page.
// ─────────────────────────────────────────────────────────────────────────
const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "11px 13px",
  borderRadius: "6px",
  border: "1.5px solid rgba(34,49,74,0.22)",
  background: "#FFFFFF",
  fontSize: "14px",
  color: "#22314A",
};

function ctaStyle(disabled: boolean): React.CSSProperties {
  return {
    padding: "12px",
    borderRadius: "6px",
    background: "#22314A",
    color: "#F1EBDD",
    fontSize: "14px",
    fontWeight: 600,
    opacity: disabled ? 0.5 : 1,
    cursor: disabled ? "not-allowed" : "pointer",
  };
}

function Field({
  label,
  action,
  children,
}: {
  label: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-xs font-medium" style={{ color: "#22314A" }}>
          {label}
        </label>
        {action}
      </div>
      {children}
    </div>
  );
}
