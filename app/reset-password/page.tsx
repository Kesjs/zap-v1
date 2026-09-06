"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { createClient } from "@/lib/supabase/client";
import AnimatedButton from "@/components/ui/animated-button";
import Spinner from "@/components/ui/spinner";

const supabase = createClient();

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center">
          <Spinner size="md" />
        </div>
      }
    >
      <ResetPasswordInner />
    </Suspense>
  );
}

type CheckState = "checking" | "valid" | "invalid";

function ResetPasswordInner() {
  const router = useRouter();

  const [checkState, setCheckState] = useState<CheckState>("checking");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  // Le lien de récupération passe par /auth/callback?next=/reset-password,
  // qui échange le code contre une session avant d'arriver ici.
  // On vérifie donc simplement qu'une session existe.
  useEffect(() => {
    let isMounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!isMounted) return;
      setCheckState(data.session ? "valid" : "invalid");
    });

    const { data: subscription } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" || (event === "SIGNED_IN" && session)) {
        setCheckState("valid");
      }
    });

    return () => {
      isMounted = false;
      subscription.subscription.unsubscribe();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error("Mot de passe trop court", {
        description: "Utilisez au moins 6 caractères.",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas", {
        description: "Vérifiez la confirmation du mot de passe.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        toast.error("Impossible de mettre à jour le mot de passe", {
          description: error.message,
        });
        setIsSubmitting(false);
        return;
      }

      setIsDone(true);
      toast.success("Mot de passe mis à jour", {
        description: "Redirection vers votre cockpit...",
        duration: 1800,
      });

      setTimeout(() => router.push("/dashboard"), 1200);
    } catch (err: any) {
      toast.error("Échec de la mise à jour", {
        description: err?.message || "Une erreur réseau est survenue. Réessayez.",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#000000] p-3 text-white antialiased font-['DM_Sans'] flex items-center justify-center">
      <div className="w-full max-w-[440px] rounded-xl border border-white/10 bg-[#000000] px-6 py-10 sm:px-10">
        {/* Logo — Logo seul sans fond */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            aria-label="Retour à l'accueil ZAP"
            className="inline-flex items-center transition-opacity hover:opacity-80"
          >
            <Image
              src="/logo.png"
              alt="ZAP"
              width={38}
              height={38}
              priority
              className="h-9 w-9 object-contain"
            />
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeftIcon className="w-3.5 h-3.5" />
            Retour connexion
          </Link>
        </div>

        {checkState === "checking" && (
          <div className="flex flex-col items-center gap-3 py-6 text-center">
            <Spinner size="md" />
            <p className="text-sm text-zinc-400">Vérification du lien de récupération...</p>
          </div>
        )}

        {checkState === "invalid" && (
          <div className="text-center">
            <h1 className="text-2xl font-medium tracking-tight text-white sm:text-3xl">
              Lien invalide ou expiré
            </h1>
            <p className="mt-2 text-sm text-zinc-400">
              Ce lien de réinitialisation n'est plus valable. Demandez-en un nouveau depuis la page de connexion.
            </p>
            <Link
              href="/login?tab=forgot"
              className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-[10px] bg-white text-[15px] font-semibold text-black transition-all hover:bg-zinc-200 active:scale-[0.99]"
            >
              Demander un nouveau lien
            </Link>
          </div>
        )}

        {checkState === "valid" && !isDone && (
          <>
            <h1 className="text-2xl font-medium tracking-tight text-white sm:text-3xl">
              Nouveau mot de passe
            </h1>
            <p className="mt-2 text-sm text-zinc-400">
              Choisissez un nouveau mot de passe pour votre compte.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 mt-7">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                  Nouveau mot de passe
                </label>
                <input
                  type="password"
                  required
                  autoFocus
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 w-full rounded-[10px] border border-white/15 bg-white/5 px-4 text-sm text-white placeholder:text-zinc-600 outline-none transition-colors focus:border-white/40 focus:bg-white/10"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                  Confirmer le mot de passe
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="h-12 w-full rounded-[10px] border border-white/15 bg-white/5 px-4 text-sm text-white placeholder:text-zinc-600 outline-none transition-colors focus:border-white/40 focus:bg-white/10"
                />
              </div>

              <AnimatedButton
                type="submit"
                isLoading={isSubmitting}
                loadingText="Mise à jour..."
              >
                Mettre à jour le mot de passe
              </AnimatedButton>
            </form>
          </>
        )}

        {isDone && (
          <div className="text-center py-6">
            <h1 className="text-2xl font-medium tracking-tight text-white sm:text-3xl">
              C'est fait !
            </h1>
            <p className="mt-2 text-sm text-zinc-400">
              Votre mot de passe a été mis à jour. Redirection en cours...
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
