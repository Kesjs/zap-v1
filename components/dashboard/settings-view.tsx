"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { toast } from "sonner";
import {
  BuildingStorefrontIcon,
  IdentificationIcon,
  CreditCardIcon,
  ShieldCheckIcon,
  PhotoIcon,
  TrashIcon,
  ArrowPathIcon,
  CheckIcon,
  ArrowUpTrayIcon,
  LockClosedIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useWorkshop, MobileMoneyAccount } from "./workshop-context";
import { createClient } from "@/lib/supabase/client";
import CustomSelect, { SelectOption } from "@/components/ui/custom-select";

const supabase = createClient();

const OPERATOR_OPTIONS: SelectOption[] = [
  { value: "MTN MoMo", label: "MTN Mobile Money", badge: "MoMo" },
  { value: "Moov Money", label: "Moov Money", badge: "Moov" },
  { value: "Wave", label: "Wave", badge: "Wave" },
  { value: "Celtiis", label: "Celtiis Cash", badge: "Celtiis" },
  { value: "Orange Money", label: "Orange Money", badge: "OM" },
];

const COUNTRY_OPTIONS: SelectOption[] = [
  { value: "Bénin", label: "Bénin", badge: "+229" },
  { value: "Côte d'Ivoire", label: "Côte d'Ivoire", badge: "+225" },
  { value: "Sénégal", label: "Sénégal", badge: "+221" },
  { value: "Togo", label: "Togo", badge: "+228" },
  { value: "Mali", label: "Mali", badge: "+223" },
  { value: "Burkina Faso", label: "Burkina Faso", badge: "+226" },
  { value: "Guinée", label: "Guinée", badge: "+224" },
  { value: "Niger", label: "Niger", badge: "+227" },
  { value: "Cameroun", label: "Cameroun", badge: "+237" },
];

type SettingsTab = "identity" | "stamp" | "payments" | "security";

export default function SettingsView({ onLogout }: { onLogout?: () => void }) {
  const {
    workshop,
    updateWorkshop,
    getInitials,
    isSyncing,
    isCloudSynced,
    lastSyncedAt,
    userEmail: contextEmail,
    userId,
  } = useWorkshop();
  const [activeTab, setActiveTab] = useState<SettingsTab>("identity");

  // Local form state for Tab 1 (Identity)
  const [name, setName] = useState(workshop.name);
  const [activity, setActivity] = useState(workshop.activity);
  const [city, setCity] = useState(workshop.city);
  const [country, setCountry] = useState(workshop.country);
  const [whatsapp, setWhatsapp] = useState(workshop.whatsapp);
  const [ifu, setIfu] = useState(workshop.ifu);
  const [rccm, setRccm] = useState(workshop.rccm);
  const [logoUrl, setLogoUrl] = useState<string | null>(workshop.logoUrl);

  // Logo file input ref & dropzone
  const logoInputRef = useRef<HTMLInputElement | null>(null);
  const [isDraggingLogo, setIsDraggingLogo] = useState(false);

  // Tab 2 (Stamp & Signature)
  const stampInputRef = useRef<HTMLInputElement | null>(null);
  const signatureCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [stampUrl, setStampUrl] = useState<string | null>(workshop.stampUrl);
  const [isProcessingStamp, setIsProcessingStamp] = useState(false);
  const [hasSignature, setHasSignature] = useState<boolean>(!!workshop.signatureUrl);
  const [isDrawing, setIsDrawing] = useState(false);

  // Tab 3 (Payments)
  const [mm1, setMm1] = useState<MobileMoneyAccount>(workshop.mobileMoney1);
  const [mm2, setMm2] = useState<MobileMoneyAccount>(
    workshop.mobileMoney2 || { provider: "Moov Money", number: "", name: "" }
  );
  const [bankInfo, setBankInfo] = useState(
    workshop.bankInfo || { bank: "", rib: "", iban: "" }
  );

  // Tab 4 (Security)
  const [userEmail, setUserEmail] = useState<string>("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Sync when workshop context updates
  useEffect(() => {
    setName(workshop.name);
    setActivity(workshop.activity);
    setCity(workshop.city);
    setCountry(workshop.country);
    setWhatsapp(workshop.whatsapp);
    setIfu(workshop.ifu);
    setRccm(workshop.rccm);
    setLogoUrl(workshop.logoUrl);
    setStampUrl(workshop.stampUrl);
    setMm1(workshop.mobileMoney1);
    if (workshop.mobileMoney2) setMm2(workshop.mobileMoney2);
    if (workshop.bankInfo) setBankInfo(workshop.bankInfo);
  }, [workshop]);

  // Fetch current user email
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user?.email) setUserEmail(data.user.email);
    });
  }, []);

  // ─────────────────────────────────────────────────────────────────────────────
  // Logo Upload & Handling
  // ─────────────────────────────────────────────────────────────────────────────
  const processLogoFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Format non supporté", {
        description: "Veuillez sélectionner une image (PNG, JPG, WEBP, SVG).",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Fichier trop lourd", {
        description: "La taille maximale du logo est de 5 Mo.",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setLogoUrl(result);
      updateWorkshop({ logoUrl: result });
      toast.success("Logo mis à jour", {
        description: "Le logo de votre atelier a été actualisé sur la sidebar et vos documents.",
      });
    };
    reader.readAsDataURL(file);
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processLogoFile(file);
  };

  const handleLogoRemove = () => {
    setLogoUrl(null);
    updateWorkshop({ logoUrl: null });
    toast.info("Logo supprimé", {
      description: "Le logo a été retiré. Vos initiales sont désormais utilisées.",
    });
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // Stamp Processing (Canvas Background Removal)
  // ─────────────────────────────────────────────────────────────────────────────
  const handleStampUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessingStamp(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = document.createElement("img");
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          setIsProcessingStamp(false);
          return;
        }

        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;

        // Dynamic luminance thresholding to remove white/bright paper
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const brightness = (r * 299 + g * 587 + b * 114) / 1000;

          if (brightness > 200) {
            data[i + 3] = 0; // Transparent
          } else if (brightness > 160) {
            data[i + 3] = Math.round(((200 - brightness) / 40) * 255);
          }
        }

        ctx.putImageData(imgData, 0, 0);
        const processedDataUrl = canvas.toDataURL("image/png");
        setStampUrl(processedDataUrl);
        updateWorkshop({ stampUrl: processedDataUrl });
        setIsProcessingStamp(false);
        toast.success("Tampon détouré avec succès", {
          description: "Le fond papier a été supprimé automatiquement.",
        });
      };
    };
    reader.readAsDataURL(file);
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // Signature Canvas
  // ─────────────────────────────────────────────────────────────────────────────
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = signatureCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#FFFFFF";
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = signatureCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
    setHasSignature(true);
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = signatureCanvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL("image/png");
    updateWorkshop({ signatureUrl: dataUrl });
  };

  const clearSignature = () => {
    const canvas = signatureCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
    updateWorkshop({ signatureUrl: null });
    toast.info("Signature effacée");
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // Save Actions
  // ─────────────────────────────────────────────────────────────────────────────
  const handleSaveIdentity = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateWorkshop({
      name,
      activity,
      city,
      country,
      whatsapp,
      ifu,
      rccm,
      logoUrl,
    });
    toast.success("Informations de l'atelier enregistrées", {
      description: isCloudSynced
        ? "Synchronisé avec succès sur votre compte Supabase Cloud."
        : "Enregistré en local. Connectez-vous pour synchroniser sur le Cloud.",
    });
  };

  const handleSavePayments = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateWorkshop({
      mobileMoney1: mm1,
      mobileMoney2: mm2,
      bankInfo,
    });
    toast.success("Moyens de paiement enregistrés", {
      description: isCloudSynced
        ? "Coordonnées de paiement synchronisées sur Supabase Cloud."
        : "Enregistré en local. Connectez-vous pour synchroniser sur le Cloud.",
    });
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      toast.error("Mot de passe trop court", {
        description: "Utilisez au moins 6 caractères.",
      });
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Mots de passe non identiques", {
        description: "Vérifiez votre confirmation de mot de passe.",
      });
      return;
    }

    setIsChangingPassword(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;

      toast.success("Mot de passe modifié", {
        description: "Votre nouveau mot de passe est désormais actif.",
      });
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      toast.error("Échec de la modification", {
        description: err?.message || "Une erreur est survenue.",
      });
    } finally {
      setIsChangingPassword(false);
    }
  };

  const tabs = [
    {
      id: "identity" as SettingsTab,
      label: "Identité & Logo",
      icon: BuildingStorefrontIcon,
      description: "Nom, logo et coordonnées de l'atelier",
    },
    {
      id: "stamp" as SettingsTab,
      label: "Tampon & Signature",
      icon: IdentificationIcon,
      description: "Cachet officiel et signature tactile",
    },
    {
      id: "payments" as SettingsTab,
      label: "Paiements & Acomptes",
      icon: CreditCardIcon,
      description: "Mobile Money & coordonnées bancaires",
    },
    {
      id: "security" as SettingsTab,
      label: "Compte & Sécurité",
      icon: ShieldCheckIcon,
      description: "Email, mot de passe et session",
    },
  ];

  return (
    <div className="space-y-6">
      {/* ──────────────────────────────────────────────────────────────────────────
          PAGE HEADER WITH SUPABASE SYNC STATUS
      ────────────────────────────────────────────────────────────────────────── */}
      <div className="border-b border-white/10 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            Paramètres de l&apos;Atelier
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            Gérez l&apos;identité de votre entreprise, vos coordonnées de paiement et vos accès.
          </p>
        </div>

        {/* Supabase Cloud Live Status */}
        <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-white/10 bg-white/[0.03] self-start sm:self-auto">
          <div
            className={`w-2 h-2 rounded-full shrink-0 ${
              isSyncing
                ? "bg-amber-400 animate-pulse"
                : isCloudSynced
                ? "bg-emerald-400"
                : "bg-zinc-500"
            }`}
          />
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
            <span className="text-xs font-medium text-white">
              {isSyncing
                ? "Synchronisation..."
                : isCloudSynced
                ? "Supabase Cloud actif"
                : "Mode local"}
            </span>
            {lastSyncedAt && isCloudSynced && (
              <span className="text-[10px] text-zinc-400 font-mono">
                · synchro à {lastSyncedAt}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────────────────────
          RESPONSIVE TABS (Desktop vertical sidebar / Mobile horizontal pills)
      ────────────────────────────────────────────────────────────────────────── */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Navigation Tabs */}
        <aside className="lg:w-64 shrink-0">
          <nav className="flex lg:flex-col gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all text-left whitespace-nowrap lg:whitespace-normal cursor-pointer ${
                    isActive
                      ? "bg-white/10 text-white border border-white/15 shadow-sm"
                      : "text-zinc-400 hover:text-white hover:bg-white/[0.04] border border-transparent"
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : "text-zinc-400"}`} />
                  <div className="flex flex-col">
                    <span className="font-medium">{tab.label}</span>
                    <span className="hidden lg:block text-[10px] text-zinc-500 font-normal">
                      {tab.description}
                    </span>
                  </div>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Tab Content Panel */}
        <main className="flex-1 min-w-0">
          {/* ──────────────────────────────────────────────────────────────────────────
              TAB 1 : IDENTITÉ & LOGO DE L'ATELIER
          ────────────────────────────────────────────────────────────────────────── */}
          {activeTab === "identity" && (
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 space-y-8">
              <div>
                <h2 className="text-lg font-medium text-white">
                  Identité de votre Atelier
                </h2>
                <p className="mt-1 text-xs text-zinc-400">
                  Ces informations s&apos;affichent automatiquement en en-tête de vos devis et factures.
                </p>
              </div>

              {/* Logo Upload Dropzone (inspiré de 21st.dev) */}
              <div className="space-y-3">
                <label className="block text-xs font-medium text-zinc-300">
                  Logo officiel de l&apos;atelier
                </label>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                  {/* Current Logo / Initials Preview */}
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-white/15 bg-black flex items-center justify-center shadow-md">
                    {logoUrl ? (
                      <Image
                        src={logoUrl}
                        alt="Logo atelier"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <span className="text-xl font-bold tracking-wider text-white">
                        {getInitials()}
                      </span>
                    )}
                  </div>

                  {/* Drag & Drop Area */}
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDraggingLogo(true);
                    }}
                    onDragLeave={() => setIsDraggingLogo(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDraggingLogo(false);
                      const file = e.dataTransfer.files?.[0];
                      if (file) processLogoFile(file);
                    }}
                    onClick={() => logoInputRef.current?.click()}
                    className={`flex-1 w-full flex flex-col items-center justify-center rounded-xl border border-dashed p-5 text-center cursor-pointer transition-all ${
                      isDraggingLogo
                        ? "border-white bg-white/10"
                        : "border-white/20 hover:border-white/40 bg-white/[0.02] hover:bg-white/[0.04]"
                    }`}
                  >
                    <input
                      ref={logoInputRef}
                      type="file"
                      accept="image/png, image/jpeg, image/webp, image/svg+xml"
                      onChange={handleLogoChange}
                      className="hidden"
                    />
                    <ArrowUpTrayIcon className="w-5 h-5 text-zinc-400 mb-2" />
                    <p className="text-xs font-medium text-white">
                      Cliquez pour téléverser ou glissez votre logo ici
                    </p>
                    <p className="mt-1 text-[11px] text-zinc-500">
                      PNG, JPG, WEBP ou SVG jusqu&apos;à 5 Mo
                    </p>
                  </div>

                  {/* Remove Button */}
                  {logoUrl && (
                    <button
                      type="button"
                      onClick={handleLogoRemove}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs text-red-400 hover:text-red-300 hover:bg-red-950/30 border border-red-900/40 transition-colors"
                      title="Supprimer le logo"
                    >
                      <TrashIcon className="w-4 h-4" />
                      <span>Retirer</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="h-[1px] bg-white/10" />

              {/* Form Fields */}
              <form onSubmit={handleSaveIdentity} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                      Nom de l&apos;atelier / Raison sociale
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="ex: Atelier Bois & Métal"
                      className="h-11 w-full rounded-xl border border-white/15 bg-black px-3.5 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-white/40 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                      Corps de métier / Activité
                    </label>
                    <input
                      type="text"
                      value={activity}
                      onChange={(e) => setActivity(e.target.value)}
                      placeholder="ex: Menuiserie, Couture, BTP..."
                      className="h-11 w-full rounded-xl border border-white/15 bg-black px-3.5 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-white/40 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                      Ville & Quartier
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="ex: Cotonou, Akpakpa"
                      className="h-11 w-full rounded-xl border border-white/15 bg-black px-3.5 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-white/40 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                      Pays d&apos;activité
                    </label>
                    <CustomSelect
                      value={country}
                      onChange={(val) => setCountry(val)}
                      options={COUNTRY_OPTIONS}
                      placeholder="Sélectionnez votre pays..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                    Numéro WhatsApp officiel (relié aux partages 1-clic)
                  </label>
                  <input
                    type="text"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="+229 97 00 11 22"
                    className="h-11 w-full rounded-xl border border-white/15 bg-black px-3.5 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-white/40 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-medium text-zinc-300">
                        Numéro IFU / NINEA
                      </label>
                      <span className="text-[10px] text-zinc-500 font-mono">Optionnel</span>
                    </div>
                    <input
                      type="text"
                      value={ifu}
                      onChange={(e) => setIfu(e.target.value)}
                      placeholder="ex: 3202112456789"
                      className="h-11 w-full rounded-xl border border-white/15 bg-black px-3.5 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-white/40 transition-colors font-mono"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-medium text-zinc-300">
                        Registre de commerce (RCCM)
                      </label>
                      <span className="text-[10px] text-zinc-500 font-mono">Optionnel</span>
                    </div>
                    <input
                      type="text"
                      value={rccm}
                      onChange={(e) => setRccm(e.target.value)}
                      placeholder="ex: RB/COT/21 B 12345"
                      className="h-11 w-full rounded-xl border border-white/15 bg-black px-3.5 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-white/40 transition-colors font-mono"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-colors cursor-pointer shadow-sm active:scale-98"
                  >
                    <CheckIcon className="w-4 h-4" />
                    <span>Enregistrer l&apos;identité</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ──────────────────────────────────────────────────────────────────────────
              TAB 2 : TAMPON & SIGNATURE OFFICIELLE
          ────────────────────────────────────────────────────────────────────────── */}
          {activeTab === "stamp" && (
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 space-y-8">
              <div>
                <h2 className="text-lg font-medium text-white">
                  Tampon encreur & Signature officielle
                </h2>
                <p className="mt-1 text-xs text-zinc-400">
                  Prenez en photo votre vrai tampon sur papier blanc : l&apos;algorithme retire automatiquement le blanc pour ne garder que l&apos;empreinte nette.
                </p>
              </div>

              {/* Stamp Upload Area */}
              <div className="space-y-4">
                <label className="block text-xs font-medium text-zinc-300">
                  Empreinte du tampon encreur physique
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Dropzone */}
                  <div
                    onClick={() => stampInputRef.current?.click()}
                    className="flex flex-col items-center justify-center rounded-xl border border-dashed border-white/20 hover:border-white/40 bg-white/[0.02] hover:bg-white/[0.04] p-6 text-center cursor-pointer transition-all"
                  >
                    <input
                      ref={stampInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleStampUpload}
                      className="hidden"
                    />
                    <PhotoIcon className="w-6 h-6 text-zinc-400 mb-2" />
                    <p className="text-xs font-medium text-white">
                      {isProcessingStamp ? "Détourage automatique..." : "Prendre en photo ou importer"}
                    </p>
                    <p className="mt-1 text-[11px] text-zinc-500">
                      Photo de votre tampon sur feuille blanche
                    </p>
                  </div>

                  {/* Stamp Result Preview */}
                  <div className="flex flex-col items-center justify-center rounded-xl border border-white/10 bg-black/60 p-4 min-h-[140px] relative">
                    {stampUrl ? (
                      <div className="relative w-28 h-28">
                        <Image
                          src={stampUrl}
                          alt="Tampon détouré"
                          fill
                          className="object-contain"
                          unoptimized
                        />
                      </div>
                    ) : (
                      <span className="text-xs text-zinc-500 text-center">
                        Aucun tampon enregistré pour l&apos;instant
                      </span>
                    )}

                    {stampUrl && (
                      <button
                        type="button"
                        onClick={() => {
                          setStampUrl(null);
                          updateWorkshop({ stampUrl: null });
                          toast.info("Tampon retiré");
                        }}
                        className="absolute top-2 right-2 p-1.5 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-white/10 transition-colors"
                        title="Retirer le tampon"
                      >
                        <TrashIcon className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="h-[1px] bg-white/10" />

              {/* Signature Pad */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-xs font-medium text-zinc-300">
                      Signature tactile
                    </label>
                    <p className="text-[11px] text-zinc-500 mt-0.5">
                      Signez au doigt ou à la souris dans le cadre ci-dessous.
                    </p>
                  </div>

                  {hasSignature && (
                    <button
                      type="button"
                      onClick={clearSignature}
                      className="inline-flex items-center gap-1 text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer"
                    >
                      <ArrowPathIcon className="w-3.5 h-3.5" />
                      <span>Effacer</span>
                    </button>
                  )}
                </div>

                <div className="relative rounded-xl border border-white/15 bg-black overflow-hidden">
                  <canvas
                    ref={signatureCanvasRef}
                    width={500}
                    height={160}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                    className="w-full h-40 cursor-crosshair touch-none"
                  />
                  {!hasSignature && (
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-xs text-zinc-600">
                      Tracez votre signature ici
                    </div>
                  )}
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      toast.success("Tampon & signature enregistrés", {
                        description: "Votre cachet officiel et signature sont prêts pour vos documents.",
                      });
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-colors cursor-pointer shadow-sm active:scale-98"
                  >
                    <CheckIcon className="w-4 h-4" />
                    <span>Enregistrer le cachet & la signature</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ──────────────────────────────────────────────────────────────────────────
              TAB 3 : PAIEMENTS MOBILE MONEY & BANQUE
          ────────────────────────────────────────────────────────────────────────── */}
          {activeTab === "payments" && (
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 space-y-8">
              <div>
                <h2 className="text-lg font-medium text-white">
                  Coordonnées de Paiement & Acomptes
                </h2>
                <p className="mt-1 text-xs text-zinc-400">
                  Ces informations sont imprimées au bas de chaque facture pour que vos clients puissent vous transférer leur acompte sans erreur.
                </p>
              </div>

              <form onSubmit={handleSavePayments} className="space-y-6">
                {/* Mobile Money 1 */}
                <div className="space-y-3 p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                  <span className="text-xs font-medium text-white uppercase tracking-wider">
                    Compte Mobile Money n°1 (Principal)
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-zinc-400 mb-1">
                        Opérateur
                      </label>
                      <CustomSelect
                        value={mm1.provider}
                        onChange={(val) =>
                          setMm1((prev) => ({
                            ...prev,
                            provider: val as any,
                          }))
                        }
                        options={OPERATOR_OPTIONS}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-zinc-400 mb-1">
                        Numéro de réception
                      </label>
                      <input
                        type="text"
                        value={mm1.number}
                        onChange={(e) =>
                          setMm1((prev) => ({ ...prev, number: e.target.value }))
                        }
                        placeholder="+229 97 00 11 22"
                        className="h-11 w-full rounded-xl border border-white/15 bg-black px-3.5 text-sm text-white outline-none focus:border-white/40 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-zinc-400 mb-1">
                        Nom du titulaire
                      </label>
                      <input
                        type="text"
                        value={mm1.name}
                        onChange={(e) =>
                          setMm1((prev) => ({ ...prev, name: e.target.value }))
                        }
                        placeholder="ex: Koffi Mensah"
                        className="h-11 w-full rounded-xl border border-white/15 bg-black px-3.5 text-sm text-white outline-none focus:border-white/40"
                      />
                    </div>
                  </div>
                </div>

                {/* Mobile Money 2 */}
                <div className="space-y-3 p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-white uppercase tracking-wider">
                      Compte Mobile Money n°2 (Optionnel)
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono">Second réseau</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-zinc-400 mb-1">
                        Opérateur
                      </label>
                      <CustomSelect
                        value={mm2.provider}
                        onChange={(val) =>
                          setMm2((prev) => ({
                            ...prev,
                            provider: val as any,
                          }))
                        }
                        options={OPERATOR_OPTIONS}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-zinc-400 mb-1">
                        Numéro
                      </label>
                      <input
                        type="text"
                        value={mm2.number}
                        onChange={(e) =>
                          setMm2((prev) => ({ ...prev, number: e.target.value }))
                        }
                        placeholder="+229 95 33 44 55"
                        className="h-11 w-full rounded-xl border border-white/15 bg-black px-3.5 text-sm text-white outline-none focus:border-white/40 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-zinc-400 mb-1">
                        Titulaire
                      </label>
                      <input
                        type="text"
                        value={mm2.name}
                        onChange={(e) =>
                          setMm2((prev) => ({ ...prev, name: e.target.value }))
                        }
                        placeholder="ex: Atelier Koffi"
                        className="h-11 w-full rounded-xl border border-white/15 bg-black px-3.5 text-sm text-white outline-none focus:border-white/40"
                      />
                    </div>
                  </div>
                </div>

                {/* Coordonnées bancaires */}
                <div className="space-y-3 p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-white uppercase tracking-wider">
                      Compte Bancaire d&apos;Atelier (Optionnel)
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono">Pour clients entreprises</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-zinc-400 mb-1">
                        Nom de la Banque
                      </label>
                      <input
                        type="text"
                        value={bankInfo.bank}
                        onChange={(e) =>
                          setBankInfo((prev) => ({ ...prev, bank: e.target.value }))
                        }
                        placeholder="ex: BOA Bénin, Ecobank..."
                        className="h-10 w-full rounded-xl border border-white/15 bg-black px-3 text-xs text-white outline-none focus:border-white/40"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-zinc-400 mb-1">
                        Numéro RIB
                      </label>
                      <input
                        type="text"
                        value={bankInfo.rib}
                        onChange={(e) =>
                          setBankInfo((prev) => ({ ...prev, rib: e.target.value }))
                        }
                        placeholder="BJ061 01001 002345678901 23"
                        className="h-10 w-full rounded-xl border border-white/15 bg-black px-3 text-xs text-white outline-none focus:border-white/40 font-mono text-[11px]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-zinc-400 mb-1">
                        IBAN
                      </label>
                      <input
                        type="text"
                        value={bankInfo.iban}
                        onChange={(e) =>
                          setBankInfo((prev) => ({ ...prev, iban: e.target.value }))
                        }
                        placeholder="BJ66 BJ06 1010 0100..."
                        className="h-10 w-full rounded-xl border border-white/15 bg-black px-3 text-xs text-white outline-none focus:border-white/40 font-mono text-[11px]"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-colors cursor-pointer shadow-sm"
                  >
                    <CheckIcon className="w-4 h-4" />
                    <span>Enregistrer les coordonnées de paiement</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ──────────────────────────────────────────────────────────────────────────
              TAB 4 : COMPTE & SÉCURITÉ
          ────────────────────────────────────────────────────────────────────────── */}
          {activeTab === "security" && (
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 space-y-8">
              <div>
                <h2 className="text-lg font-medium text-white">
                  Compte & Sécurité des accès
                </h2>
                <p className="mt-1 text-xs text-zinc-400">
                  Gérez vos identifiants de connexion et sécurisez l&apos;accès à votre espace.
                </p>
              </div>

              {/* Email information */}
              <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <label className="block text-xs font-medium text-zinc-400">
                    Adresse email du compte
                  </label>
                  <p className="text-sm font-mono text-white mt-0.5">
                    {userEmail || contextEmail || "Session locale active"}
                  </p>
                  {userId && (
                    <p className="text-[10px] text-zinc-500 font-mono mt-0.5">
                      ID Cloud : {userId}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span className="text-[10px] font-mono text-emerald-400 px-2.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-800/40 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Supabase Cloud
                  </span>
                </div>
              </div>

              {/* Change Password Form */}
              <form onSubmit={handleChangePassword} className="space-y-4 pt-2">
                <div className="flex items-center gap-2 text-xs font-medium text-white">
                  <LockClosedIcon className="w-4 h-4 text-zinc-400" />
                  <span>Modifier le mot de passe</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                      Nouveau mot de passe
                    </label>
                    <input
                      type="password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="h-11 w-full rounded-xl border border-white/15 bg-black px-3.5 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-white/40 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                      Confirmer le mot de passe
                    </label>
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="h-11 w-full rounded-xl border border-white/15 bg-black px-3.5 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-white/40 transition-colors"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    disabled={isChangingPassword}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-colors cursor-pointer shadow-sm disabled:opacity-50"
                  >
                    <CheckIcon className="w-4 h-4" />
                    <span>{isChangingPassword ? "Mise à jour..." : "Mettre à jour le mot de passe"}</span>
                  </button>
                </div>
              </form>

              <div className="h-[1px] bg-white/10" />

              {/* Logout Session */}
              <div className="flex items-center justify-between p-4 rounded-xl border border-red-900/30 bg-red-950/10">
                <div>
                  <p className="text-xs font-medium text-white">
                    Fermer la session de travail
                  </p>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    Déconnecte cet appareil de votre cockpit d&apos;atelier.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={onLogout}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium text-red-400 hover:text-white hover:bg-red-900/40 border border-red-900/40 transition-colors cursor-pointer"
                >
                  <ArrowLeftOnRectangleIcon className="w-4 h-4" />
                  <span>Se déconnecter</span>
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
