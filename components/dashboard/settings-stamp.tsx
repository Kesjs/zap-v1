"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  BuildingOfficeIcon,
  CheckBadgeIcon,
  PhotoIcon,
  PencilSquareIcon,
  ArrowDownTrayIcon,
  LockClosedIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

export default function SettingsStamp() {
  // Company profile states
  const [companyName, setCompanyName] = useState("Atelier Koffi & Fils");
  const [ifu, setIfu] = useState("3202112456789");
  const [rccm, setRccm] = useState("RB/COT/21 B 12345");
  const [city, setCity] = useState("Cotonou");
  const [whatsapp, setWhatsapp] = useState("+229 97 00 11 22");
  const [isSavedCompany, setIsSavedCompany] = useState(false);

  // Stamp processing state (Canvas API background removal)
  const [stampPreview, setStampPreview] = useState<string | null>(null);
  const [isProcessingStamp, setIsProcessingStamp] = useState(false);
  const [stampError, setStampError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Signature canvas
  const signatureCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);

  // Handle stamp file upload & real-time Canvas API background removal
  const handleStampUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setStampError(null);
    setIsProcessingStamp(true);

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = document.createElement("img");
      img.src = event.target?.result as string;
      img.onload = () => {
        // Create off-screen canvas to process pixels
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;

        let darkPixels = 0;
        let totalPixels = data.length / 4;

        // Chroma key background removal: turn white/light grey pixels transparent
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const brightness = (r * 299 + g * 587 + b * 114) / 1000;

          if (brightness < 120) {
            darkPixels++;
          }

          // If pixel is light/paper background, set alpha to 0
          if (brightness > 190) {
            data[i + 3] = 0;
          } else {
            // Enhance dark ink
            const alphaFactor = (190 - brightness) / 190;
            data[i + 3] = Math.min(255, Math.floor(alphaFactor * 320));
          }
        }

        // Check if image was too dark overall
        if (darkPixels / totalPixels > 0.6) {
          setStampError(
            "L'image est trop sombre pour détacher l'encre nettement. Posez votre tampon sur une feuille bien blanche et reprenez la photo à la lumière."
          );
        }

        ctx.putImageData(imgData, 0, 0);
        setStampPreview(canvas.toDataURL("image/png"));
        setIsProcessingStamp(false);
      };
    };
    reader.readAsDataURL(file);
  };

  // Signature canvas drawing handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = signatureCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    setIsDrawing(true);
    setHasSignature(true);
    const rect = canvas.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.strokeStyle = "#D4AF37";
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = signatureCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = signatureCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  };

  const handleSaveCompany = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavedCompany(true);
    setTimeout(() => setIsSavedCompany(false), 2500);
  };

  return (
    <div className="flex flex-col gap-8 max-w-3xl mx-auto pb-24">
      {/* Section 1: Fiscal / Business Profile */}
      <div
        style={{
          background: "#171717",
          border: "1px solid #262626",
          borderRadius: "18px",
          padding: "24px",
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <BuildingOfficeIcon style={{ width: 20, height: 20, color: "#D4AF37" }} />
            <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "19px", color: "#F4F4F5", margin: 0 }}>
              Coordonnées de l&apos;entreprise
            </h3>
          </div>

          {isSavedCompany && (
            <span style={{ fontSize: "12px", color: "#7FBF8E", display: "flex", alignItems: "center", gap: "4px" }}>
              <CheckBadgeIcon style={{ width: 16, height: 16 }} />
              Enregistré
            </span>
          )}
        </div>

        <form onSubmit={handleSaveCompany} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label style={{ display: "block", fontSize: "12px", color: "#A1A1AA", marginBottom: "6px" }}>
              Nom commercial / Raison sociale
            </label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              style={{
                width: "100%",
                height: "44px",
                background: "#000000",
                border: "1px solid #262626",
                borderRadius: "10px",
                padding: "0 14px",
                color: "#F4F4F5",
                fontSize: "14px",
                outline: "none",
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "12px", color: "#A1A1AA", marginBottom: "6px" }}>
              Ville &amp; Pays
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              style={{
                width: "100%",
                height: "44px",
                background: "#000000",
                border: "1px solid #262626",
                borderRadius: "10px",
                padding: "0 14px",
                color: "#F4F4F5",
                fontSize: "14px",
                outline: "none",
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "12px", color: "#A1A1AA", marginBottom: "6px" }}>
              Numéro IFU (Bénin / Togo)
            </label>
            <input
              type="text"
              value={ifu}
              onChange={(e) => setIfu(e.target.value)}
              style={{
                width: "100%",
                height: "44px",
                background: "#000000",
                border: "1px solid #262626",
                borderRadius: "10px",
                padding: "0 14px",
                color: "#F4F4F5",
                fontSize: "14px",
                outline: "none",
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "12px", color: "#A1A1AA", marginBottom: "6px" }}>
              Numéro RCCM
            </label>
            <input
              type="text"
              value={rccm}
              onChange={(e) => setRccm(e.target.value)}
              style={{
                width: "100%",
                height: "44px",
                background: "#000000",
                border: "1px solid #262626",
                borderRadius: "10px",
                padding: "0 14px",
                color: "#F4F4F5",
                fontSize: "14px",
                outline: "none",
              }}
            />
          </div>

          <div className="sm:col-span-2 flex justify-end mt-2">
            <button
              type="submit"
              style={{
                background: "#D4AF37",
                color: "#000000",
                border: "none",
                borderRadius: "10px",
                padding: "10px 20px",
                fontSize: "13.5px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Sauvegarder les coordonnées
            </button>
          </div>
        </form>
      </div>

      {/* Section 2: Studio Tampon Numérique avec détourage en direct */}
      <div
        style={{
          background: "#171717",
          border: "1px solid #262626",
          borderRadius: "18px",
          padding: "24px",
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <PhotoIcon style={{ width: 20, height: 20, color: "#D4AF37" }} />
            <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "19px", color: "#F4F4F5", margin: 0 }}>
              Tampon d&apos;atelier officiel
            </h3>
          </div>
          <span style={{ fontSize: "11px", color: "#A1A1AA" }}>PNG transparent automatique</span>
        </div>

        <p style={{ fontSize: "13px", color: "#A1A1AA", marginBottom: "16px" }}>
          Prenez une photo de votre vrai cachet sur papier blanc. Notre algorithme Canvas supprime automatiquement le fond blanc pour ne conserver que l&apos;empreinte d&apos;encre officielle.
        </p>

        {/* Dropzone / Preview Area */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
          <div
            onClick={() => fileInputRef.current?.click()}
            style={{
              border: "2px dashed #262626",
              borderRadius: "14px",
              padding: "28px 16px",
              textAlign: "center",
              cursor: "pointer",
              background: "#000000",
              transition: "border-color 0.2s",
            }}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleStampUpload}
            />
            <PhotoIcon style={{ width: 32, height: 32, color: "#D4AF37", margin: "0 auto 10px" }} />
            <p style={{ fontSize: "13px", color: "#F4F4F5", fontWeight: 500, margin: 0 }}>
              Choisir une photo du tampon
            </p>
            <p style={{ fontSize: "11px", color: "#A1A1AA", margin: "4px 0 0" }}>
              JPG, PNG jusqu&apos;à 10 Mo
            </p>
          </div>

          {/* Transparent Result Preview */}
          <div
            style={{
              height: "150px",
              background: "#000000",
              border: "1px solid #262626",
              borderRadius: "14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {isProcessingStamp ? (
              <div className="flex flex-col items-center gap-2">
                <ArrowPathIcon className="animate-spin text-[#D4AF37]" style={{ width: 24, height: 24 }} />
                <span style={{ fontSize: "12px", color: "#A1A1AA" }}>Détourage en cours...</span>
              </div>
            ) : stampPreview ? (
              <div className="relative w-28 h-28">
                <Image src={stampPreview} alt="Tampon détouré" fill style={{ objectFit: "contain" }} unoptimized />
              </div>
            ) : (
              <span style={{ fontSize: "12px", color: "#A1A1AA" }}>Aperçu du tampon détouré</span>
            )}
          </div>
        </div>

        {stampError && (
          <p style={{ fontSize: "12px", color: "#E08585", marginTop: "12px" }}>
            {stampError}
          </p>
        )}
      </div>

      {/* Section 3: Signature Tactile */}
      <div
        style={{
          background: "#171717",
          border: "1px solid #262626",
          borderRadius: "18px",
          padding: "24px",
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <PencilSquareIcon style={{ width: 20, height: 20, color: "#D4AF37" }} />
            <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "19px", color: "#F4F4F5", margin: 0 }}>
              Signature tactile réutilisable
            </h3>
          </div>

          {hasSignature && (
            <button
              type="button"
              onClick={clearSignature}
              style={{
                background: "none",
                border: "none",
                color: "#E08585",
                fontSize: "12px",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Effacer la signature
            </button>
          )}
        </div>

        <p style={{ fontSize: "13px", color: "#A1A1AA", marginBottom: "16px" }}>
          Signez une seule fois avec votre doigt ou stylet sur l&apos;écran ci-dessous. Votre tracé sera vectorisé et apposé automatiquement sur vos factures.
        </p>

        {/* Signature Canvas Pad */}
        <div
          style={{
            background: "#000000",
            border: "1px solid #262626",
            borderRadius: "14px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <canvas
            ref={signatureCanvasRef}
            width={600}
            height={160}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            style={{
              display: "block",
              width: "100%",
              height: "160px",
              cursor: "crosshair",
            }}
          />
          {!hasSignature && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "none",
                color: "rgba(244,244,245,0.25)",
                fontSize: "13px",
              }}
            >
              Signez ici avec votre doigt ou votre souris
            </div>
          )}
        </div>
      </div>

      {/* Section 4: Export Comptable (Grand Livre .xlsx) */}
      <div
        style={{
          background: "#171717",
          border: "1px solid #262626",
          borderRadius: "18px",
          padding: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "18px", color: "#F4F4F5", margin: 0 }}>
              Export du Grand Livre comptable
            </h3>
            <span
              style={{
                background: "rgba(212,175,55,0.15)",
                border: "1px solid rgba(212,175,55,0.3)",
                color: "#D4AF37",
                fontSize: "10px",
                fontWeight: 600,
                padding: "2px 6px",
                borderRadius: "6px",
              }}
            >
              Pro Annuel
            </span>
          </div>
          <p style={{ fontSize: "13px", color: "#A1A1AA", margin: 0 }}>
            Téléchargez l&apos;intégralité de vos écritures au format Microsoft Excel (.xlsx) pour votre comptable.
          </p>
        </div>

        <button
          type="button"
          style={{
            background: "rgba(244,244,245,0.08)",
            border: "1px solid #262626",
            borderRadius: "10px",
            padding: "10px 18px",
            color: "#F4F4F5",
            fontSize: "13px",
            fontWeight: 500,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <ArrowDownTrayIcon style={{ width: 16, height: 16 }} />
          <span>Exporter le Grand Livre (.xlsx)</span>
        </button>
      </div>
    </div>
  );
}
