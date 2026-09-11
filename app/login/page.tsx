"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { createClient } from "@/lib/supabase/client";
import AnimatedButton from "@/components/ui/animated-button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";

const supabase = createClient();

// Dynamic import with ssr: false to prevent WebGL hydration mismatches
const GrainGradientShader = dynamic(
  () => import("@/components/auth/grain-gradient-shader"),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-black" />,
  }
);

type AuthTab = "login" | "register" | "forgot";
type LoginMethod = "otp" | "password";

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center text-white">
          Chargement de l'atelier...
        </div>
      }
    >
      <LoginPageInner />
    </Suspense>
  );
}

function LoginPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const queryTab = searchParams.get("tab");
  const initialTab: AuthTab =
    queryTab === "register"
      ? "register"
      : queryTab === "forgot"
      ? "forgot"
      : "login";

  const [activeTab, setActiveTab] = useState<AuthTab>(initialTab);
  const [loginMethod, setLoginMethod] = useState<LoginMethod>("otp");
  const [otpStep, setOtpStep] = useState<"email" | "code">("email");

  // Inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [resendTimer, setResendTimer] = useState(30);

  // Loading state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBackHovered, setIsBackHovered] = useState(false);

  useEffect(() => {
    if (queryTab === "register") {
      setActiveTab("register");
      setOtpStep("email");
    } else if (queryTab === "forgot") {
      setActiveTab("forgot");
    } else if (queryTab === "login") {
      setActiveTab("login");
    }

    const errorParam = searchParams.get("error");
    if (errorParam === "auth-callback-failed") {
      toast.error("Échec d'authentification", {
        description: "La validation du compte avec Google ou le lien a échoué. Veuillez réessayer.",
      });
    }
  }, [queryTab, searchParams]);

  // Countdown timer for OTP resend
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activeTab === "login" && loginMethod === "otp" && otpStep === "code" && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => (prev <= 1 ? 0 : prev - 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeTab, loginMethod, otpStep, resendTimer]);

  const validateEmail = (val: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());

  // 1. Send OTP Code
  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!email.trim() || !validateEmail(email)) {
      toast.error("Email invalide", {
        description: "Veuillez entrer une adresse email valide (ex: john@doe.com).",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: { shouldCreateUser: true, data: { app: "zap" } },
      });

      if (error) {
        const isRateLimit =
          error.message.toLowerCase().includes("rate limit") ||
          error.message.toLowerCase().includes("security purposes") ||
          error.message.toLowerCase().includes("frequency");

        toast.error(isRateLimit ? "Limite d'envoi Supabase atteinte" : "Impossible d'envoyer le code", {
          description: isRateLimit
            ? "Le quota gratuit d'emails de test Supabase est atteint. Configurez Resend SMTP dans Supabase pour des envois illimités."
            : error.message,
          duration: 6000,
        });
        setIsSubmitting(false);
        return;
      }

      setOtpStep("code");
      setResendTimer(30);
      toast.success("Code envoyé !", {
        description: `Un code à 6 chiffres a été envoyé à ${email.trim()}.`,
      });
    } catch (err: any) {
      toast.error("Impossible d'envoyer le code", {
        description: err?.message || "Une erreur réseau est survenue. Réessayez.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // 2. Verify OTP Code
  const handleVerifyOtp = async (codeToVerify?: string) => {
    const code = codeToVerify || otpCode;
    if (code.length < 6 || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const { error } = await supabase.auth.verifyOtp({
        email: email.trim(),
        token: code,
        type: "email",
      });

      if (error) {
        toast.error("Code incorrect ou expiré", {
          description: "Vérifiez les 6 chiffres reçus par email.",
        });
        setIsSubmitting(false);
        setOtpCode("");
        return;
      }

      toast.success("Connexion réussie", {
        description: "Redirection vers votre cockpit...",
        duration: 1800,
      });

      router.push("/dashboard");
    } catch (err: any) {
      toast.error("Échec de la vérification", {
        description: err?.message || "Une erreur réseau est survenue. Réessayez.",
      });
      setOtpCode("");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 3. Password Login
  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !validateEmail(email)) {
      toast.error("Email requis", {
        description: "Veuillez indiquer une adresse email valide.",
      });
      return;
    }

    if (!password) {
      toast.error("Mot de passe requis", {
        description: "Veuillez indiquer votre mot de passe.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        toast.error("Identifiants incorrects", {
          description: "Email ou mot de passe incorrect.",
        });
        setIsSubmitting(false);
        return;
      }

      toast.success("Connexion réussie", {
        description: "Accès à votre cockpit d'atelier...",
        duration: 1800,
      });

      router.push("/dashboard");
    } catch (err: any) {
      toast.error("Échec de connexion", {
        description: err?.message || "Une erreur réseau est survenue. Réessayez.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // 4. Simplified Register
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !validateEmail(email)) {
      toast.error("Email requis", {
        description: "Veuillez entrer une adresse email valide (ex: john@doe.com).",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: { shouldCreateUser: true, data: { app: "zap" } },
      });

      if (error) {
        const isRateLimit =
          error.message.toLowerCase().includes("rate limit") ||
          error.message.toLowerCase().includes("security purposes") ||
          error.message.toLowerCase().includes("frequency");

        toast.error(isRateLimit ? "Limite d'envoi Supabase atteinte" : "Erreur d'inscription", {
          description: isRateLimit
            ? "Le quota gratuit d'emails de test Supabase est atteint. Configurez Resend SMTP dans Supabase pour des envois illimités."
            : error.message,
          duration: 6000,
        });
        setIsSubmitting(false);
        return;
      }

      setActiveTab("login");
      setLoginMethod("otp");
      setOtpStep("code");
      setResendTimer(30);

      toast.success("Compte en cours de création !", {
        description: `Un code de confirmation a été envoyé à ${email.trim()}.`,
      });
    } catch (err: any) {
      toast.error("Erreur d'inscription", {
        description: err?.message || "Une erreur réseau est survenue. Réessayez.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // 5. Forgot Password
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !validateEmail(email)) {
      toast.error("Email requis", {
        description: "Veuillez saisir votre adresse email pour recevoir le lien.",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
      });
      toast.success("Lien de récupération envoyé", {
        description: "Consultez votre boîte de réception pour réinitialiser vos accès.",
        duration: 4000,
      });
      setActiveTab("login");
    } catch {
      toast.info("Demande transmise", {
        description: "Si un compte existe avec cet email, un lien vous a été transmis.",
      });
      setActiveTab("login");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialClick = async (provider: string) => {
    if (provider.toLowerCase() === "google") {
      setIsSubmitting(true);
      try {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo: `${window.location.origin}/auth/callback`,
            queryParams: {
              access_type: "offline",
              prompt: "consent",
            },
          },
        });

        if (error) {
          toast.error("Échec de connexion Google", {
            description: error.message,
          });
          setIsSubmitting(false);
        }
      } catch (err: any) {
        toast.error("Erreur de connexion", {
          description: err?.message || "Impossible d'initialiser Google OAuth.",
        });
        setIsSubmitting(false);
      }
    } else {
      toast.info(`Connexion ${provider}`, {
        description: `L'authentification directe avec ${provider} sera disponible lors de la prochaine mise à jour.`,
        duration: 3500,
      });
    }
  };

  return (
    <section className="min-h-screen bg-[#000000] p-3 text-white antialiased font-['DM_Sans']">
      <div className="grid min-h-[calc(100vh-1.5rem)] gap-4 lg:grid-cols-[1.02fr_0.98fr] xl:gap-6">
        {/* ─────────────────────────────────────────────────────────────
            FORM PANEL (Desktop: Right / Mobile: Top)
           ───────────────────────────────────────────────────────────── */}
        <div className="order-1 lg:order-2 flex min-h-[640px] flex-col justify-between rounded-xl border border-white/10 bg-[#000000] px-6 py-8 sm:px-10 lg:min-h-0 lg:px-14 xl:px-16">
          <div className="mx-auto w-full max-w-[440px]">
            {/* Top Logo & Retour interactif morphing style Stripe Checkout */}
            <div className="flex items-center justify-between mb-8">
              <Link
                href="/"
                onMouseEnter={() => setIsBackHovered(true)}
                onMouseLeave={() => setIsBackHovered(false)}
                aria-label="Retour à l'accueil ZAP"
                className="group inline-flex items-center gap-2 py-1 text-zinc-400 hover:text-white transition-colors no-underline cursor-pointer"
              >
                {/* Flèche retour animée */}
                <motion.div
                  animate={{ x: isBackHovered ? -3 : 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="flex items-center justify-center text-zinc-400 group-hover:text-white transition-colors"
                >
                  <ArrowLeftIcon className="w-4 h-4" />
                </motion.div>

                {/* Zone animée : Texte 'Retour' se transforme en Logo ZAP */}
                <div className="relative h-6 flex items-center overflow-hidden min-w-[48px]">
                  <AnimatePresence mode="wait" initial={false}>
                    {!isBackHovered ? (
                      <motion.span
                        key="text"
                        initial={{ opacity: 0, y: 3 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -3 }}
                        transition={{ duration: 0.15, ease: "easeInOut" }}
                        className="text-xs font-medium text-zinc-400 group-hover:text-white select-none whitespace-nowrap"
                      >
                        Retour
                      </motion.span>
                    ) : (
                      <motion.div
                        key="logo"
                        initial={{ opacity: 0, scale: 0.85, y: 3 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.85, y: -3 }}
                        transition={{ type: "spring", stiffness: 450, damping: 25 }}
                        className="flex items-center gap-1.5"
                      >
                        <div className="relative w-5 h-5 rounded-md overflow-hidden flex items-center justify-center shrink-0">
                          <Image
                            src="/log.jpg"
                            alt="ZAP"
                            width={20}
                            height={20}
                            priority
                            className="rotate-90"
                            style={{ objectFit: "cover", width: "100%", height: "100%" }}
                          />
                        </div>
                        <span className="text-xs font-bold text-white tracking-wider font-['Space_Grotesk']">
                          ZAP
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Link>

              {activeTab === "forgot" && (
                <button
                  type="button"
                  onClick={() => setActiveTab("login")}
                  className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
                >
                  <ArrowLeftIcon className="w-3.5 h-3.5" />
                  Retour connexion
                </button>
              )}
            </div>

            {/* ─────────────────────────────────────────────────────────
                MODE : INSCRIPTION (Create your account)
               ───────────────────────────────────────────────────────── */}
            {activeTab === "register" && (
              <div>
                <h1 className="text-3xl font-medium tracking-tight text-white sm:text-4xl">
                  Créer votre compte
                </h1>
                <p className="mt-2 text-sm text-zinc-400">
                  8 devis & factures offerts · Sans engagement
                </p>

                <div className="mt-7">
                  <SocialButton
                    icon={<GoogleIcon />}
                    label="Continuer avec Google"
                    onClick={() => handleSocialClick("Google")}
                  />
                </div>

                <div className="my-6 flex items-center gap-4 text-center">
                  <div className="h-[1px] flex-1 bg-white/10" />
                  <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                    ou
                  </span>
                  <div className="h-[1px] flex-1 bg-white/10" />
                </div>

                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                      Adresse email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="john@doe.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 w-full rounded-[10px] border border-white/15 bg-white/5 px-4 text-sm text-white placeholder:text-zinc-600 outline-none transition-colors focus:border-white/40 focus:bg-white/10"
                    />
                  </div>

                  <AnimatedButton
                    type="submit"
                    isLoading={isSubmitting}
                    loadingText="Création en cours..."
                  >
                    Créer mon compte
                  </AnimatedButton>

                  <p className="text-center text-xs text-zinc-400 pt-2">
                    Déjà un compte ?{" "}
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab("login");
                        setOtpStep("email");
                      }}
                      className="font-medium text-white hover:underline"
                    >
                      Se connecter
                    </button>
                  </p>
                </form>
              </div>
            )}

            {/* ─────────────────────────────────────────────────────────
                MODE : CONNEXION (Sign in) — OTP ou Mot de passe
               ───────────────────────────────────────────────────────── */}
            {activeTab === "login" && (
              <div>
                <h1 className="text-3xl font-medium tracking-tight text-white sm:text-4xl">
                  Connexion
                </h1>

                {loginMethod === "otp" && otpStep === "email" && (
                  <p className="mt-2 text-sm text-zinc-400">
                    Un email et un code. C&apos;est tout.
                  </p>
                )}

                {loginMethod === "password" && (
                  <p className="mt-2 text-sm text-zinc-400">
                    Connectez-vous avec votre email et mot de passe.
                  </p>
                )}

                {loginMethod === "otp" ? (
                  <div>
                    {otpStep === "email" ? (
                      <div>
                        <div className="mt-7">
                          <SocialButton
                            icon={<GoogleIcon />}
                            label="Continuer avec Google"
                            onClick={() => handleSocialClick("Google")}
                          />
                        </div>

                        <div className="my-6 flex items-center gap-4 text-center">
                          <div className="h-[1px] flex-1 bg-white/10" />
                          <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                            ou
                          </span>
                          <div className="h-[1px] flex-1 bg-white/10" />
                        </div>

                        <form onSubmit={handleSendOtp} className="space-y-4">
                          <div>
                            <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                              Adresse email
                            </label>
                            <input
                              type="email"
                              required
                              placeholder="john@doe.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="h-12 w-full rounded-[10px] border border-white/15 bg-white/5 px-4 text-sm text-white placeholder:text-zinc-600 outline-none transition-colors focus:border-white/40 focus:bg-white/10"
                            />
                          </div>

                          <AnimatedButton
                            type="submit"
                            isLoading={isSubmitting}
                            loadingText="Connexion en cours..."
                          >
                            Se connecter
                          </AnimatedButton>

                          <div className="space-y-2 pt-2 text-center text-xs text-zinc-400">
                            <p>
                              Vous préférez un mot de passe ?{" "}
                              <button
                                type="button"
                                onClick={() => setLoginMethod("password")}
                                className="font-medium text-white hover:underline"
                              >
                                Utiliser mot de passe
                              </button>
                            </p>
                            <p>
                              Pas encore de compte ?{" "}
                              <button
                                type="button"
                                onClick={() => setActiveTab("register")}
                                className="font-medium text-white hover:underline"
                              >
                                Créer un compte
                              </button>
                            </p>
                          </div>
                        </form>
                      </div>
                    ) : (
                      <div className="mt-6 space-y-6">
                        <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-center">
                          <p className="text-xs text-zinc-400">
                            Un code à usage unique a été envoyé à :
                          </p>
                          <p className="text-sm font-semibold text-white mt-1 flex items-center justify-center gap-2">
                            <span>{email}</span>
                            <button
                              type="button"
                              onClick={() => setOtpStep("email")}
                              className="text-xs text-zinc-400 hover:text-white underline"
                            >
                              Modifier
                            </button>
                          </p>
                        </div>

                        <div className="flex justify-center py-2">
                          <InputOTP
                            maxLength={6}
                            value={otpCode}
                            onChange={(val) => {
                              setOtpCode(val);
                              if (val.length === 6) {
                                handleVerifyOtp(val);
                              }
                            }}
                          >
                            <InputOTPGroup>
                              <InputOTPSlot index={0} />
                              <InputOTPSlot index={1} />
                              <InputOTPSlot index={2} />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                              <InputOTPSlot index={3} />
                              <InputOTPSlot index={4} />
                              <InputOTPSlot index={5} />
                            </InputOTPGroup>
                          </InputOTP>
                        </div>

                        <AnimatedButton
                          type="button"
                          onClick={() => handleVerifyOtp()}
                          isLoading={isSubmitting}
                          loadingText="Vérification..."
                          disabled={otpCode.length < 6}
                        >
                          Valider le code
                        </AnimatedButton>

                        <div className="flex items-center justify-between text-xs text-zinc-400 pt-1">
                          {resendTimer > 0 ? (
                            <span className="font-mono">
                              Renvoyer dans 00:{resendTimer < 10 ? `0${resendTimer}` : resendTimer}
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleSendOtp()}
                              className="text-white hover:underline font-medium"
                            >
                              Renvoyer le code
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => setLoginMethod("password")}
                            className="hover:text-white transition-colors"
                          >
                            Utiliser mot de passe
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <div className="mt-7">
                      <SocialButton
                        icon={<GoogleIcon />}
                        label="Continuer avec Google"
                        onClick={() => handleSocialClick("Google")}
                      />
                    </div>

                    <div className="my-6 flex items-center gap-4 text-center">
                      <div className="h-[1px] flex-1 bg-white/10" />
                      <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                        ou
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <form onSubmit={handlePasswordLogin} className="space-y-4">
                      <div>
                        <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                          Adresse email
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="john@doe.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="h-12 w-full rounded-[10px] border border-white/15 bg-white/5 px-4 text-sm text-white placeholder:text-zinc-600 outline-none transition-colors focus:border-white/40 focus:bg-white/10"
                        />
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="text-xs font-medium text-zinc-300">
                            Mot de passe
                          </label>
                          <button
                            type="button"
                            onClick={() => setActiveTab("forgot")}
                            className="text-xs text-zinc-400 hover:text-white transition-colors"
                          >
                            Mot de passe oublié ?
                          </button>
                        </div>
                        <input
                          type="password"
                          required
                          placeholder="••••••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="h-12 w-full rounded-[10px] border border-white/15 bg-white/5 px-4 text-sm text-white placeholder:text-zinc-600 outline-none transition-colors focus:border-white/40 focus:bg-white/10"
                        />
                      </div>

                      <AnimatedButton
                        type="submit"
                        isLoading={isSubmitting}
                        loadingText="Connexion en cours..."
                      >
                        Se connecter
                      </AnimatedButton>

                      <div className="space-y-2 pt-2 text-center text-xs text-zinc-400">
                        <p>
                          Connexion plus rapide ?{" "}
                          <button
                            type="button"
                            onClick={() => {
                              setLoginMethod("otp");
                              setOtpStep("email");
                            }}
                            className="font-medium text-white hover:underline"
                          >
                            Se connecter avec code OTP
                          </button>
                        </p>
                        <p>
                          Pas encore de compte ?{" "}
                          <button
                            type="button"
                            onClick={() => setActiveTab("register")}
                            className="font-medium text-white hover:underline"
                          >
                            Créer un compte
                          </button>
                        </p>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            )}

            {/* ─────────────────────────────────────────────────────────
                MODE : MOT DE PASSE OUBLIÉ (Forgot password)
               ───────────────────────────────────────────────────────── */}
            {activeTab === "forgot" && (
              <div className="mt-4">
                <h1 className="text-3xl font-medium tracking-tight text-white sm:text-4xl">
                  Mot de passe oublié
                </h1>
                <p className="mt-2 text-sm text-zinc-400">
                  Entrez votre email pour recevoir un lien de réinitialisation.
                </p>

                <form onSubmit={handleForgotPassword} className="space-y-4 mt-7">
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                      Adresse email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="john@doe.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 w-full rounded-[10px] border border-white/15 bg-white/5 px-4 text-sm text-white placeholder:text-zinc-600 outline-none transition-colors focus:border-white/40 focus:bg-white/10"
                    />
                  </div>

                  <AnimatedButton
                    type="submit"
                    isLoading={isSubmitting}
                    loadingText="Envoi en cours..."
                  >
                    Envoyer le lien
                  </AnimatedButton>
                </form>
              </div>
            )}
          </div>

          <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-zinc-500">
            <span>© ZAP. Tous droits réservés.</span>
            <div className="flex items-center gap-4">
              <Link href="/cgu" className="hover:text-zinc-300">
                Conditions
              </Link>
              <Link href="/confidentialite" className="hover:text-zinc-300">
                Confidentialité
              </Link>
            </div>
          </div>
        </div>

          {/* ─────────────────────────────────────────────────────────────
              VISUAL PANEL (Desktop: Left / Mobile: Bottom) : GrainGradient WebGL Shader + Value Proposition
             ───────────────────────────────────────────────────────────── */}
          <div className="order-2 lg:order-1 relative flex min-h-[560px] flex-col justify-center overflow-hidden rounded-xl bg-black p-8 text-white sm:p-12 lg:min-h-0 lg:p-14">
            {/* The Dynamic WebGL GrainGradient Shader */}
            <GrainGradientShader />

            {/* Overlay Gradient for contrast */}
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/60"
              aria-hidden="true"
            />

            {/* Center Content */}
            <div className="relative z-10 py-8">
              <h2 className="font-['DM_Serif_Display'] max-w-[540px] text-4xl font-normal leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[54px]">
                Vos devis &amp; factures,
                <br />
                tamponnés en 2 min.
              </h2>
              <p className="mt-4 max-w-[460px] font-['DM_Sans'] text-base text-zinc-300 leading-relaxed font-light">
                Partage direct sur WhatsApp en 1 clic. Signature tactile et calcul
                automatique d&apos;acompte &amp; solde pour chaque commande.
              </p>
            </div>
          </div>
        </div>
      </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Subcomponents
// ─────────────────────────────────────────────────────────────────────────────

function SocialButton({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-11 w-full items-center justify-center gap-2.5 rounded-[10px] border border-white/15 bg-white/5 px-3 text-xs font-medium text-white transition-all hover:bg-white/10 active:scale-[0.99]"
    >
      <span className="shrink-0">{icon}</span>
      <span className="truncate">{label}</span>
    </button>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09Z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84Z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38Z"
        fill="#EB4335"
      />
    </svg>
  );
}
