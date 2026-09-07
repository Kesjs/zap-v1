"use client";

import React, { useState, useMemo, useEffect } from "react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import {
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
  XMarkIcon,
  TagIcon,
  MagnifyingGlassIcon,
  DocumentTextIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

const supabase = createClient();

export interface CatalogItem {
  id: string;
  label: string;
  category: string;
  description?: string;
  price: number;
}

const DEFAULT_CATALOG: CatalogItem[] = [
  // Menuiserie
  {
    id: "1",
    label: "Table de réunion teck massif (12 places)",
    category: "Menuiserie & Bois",
    description: "Finitions huilées premium, piètement renforcé anti-déformation",
    price: 350000,
  },
  {
    id: "2",
    label: "Porte isoplane sur mesure (bois rouge)",
    category: "Menuiserie & Bois",
    description: "Avec chambranle, pose serrure 3 points et vernis marin",
    price: 45000,
  },
  {
    id: "3",
    label: "Fabrication & pose cuisine aménagée",
    category: "Menuiserie & Bois",
    description: "Caissons mélaminé hydrofuge, façades placage chêne",
    price: 180000,
  },
  // Couture & Mode
  {
    id: "4",
    label: "Confection tenue Bazin riche brodé",
    category: "Couture & Mode",
    description: "Broderie artisanale au fil or, coupe grand boubou 3 pièces",
    price: 65000,
  },
  {
    id: "5",
    label: "Robe de soirée sur mesure",
    category: "Couture & Mode",
    description: "Tissu fourni par l'atelier, doublure satin et finitions main",
    price: 40000,
  },
  {
    id: "6",
    label: "Chemise homme pagne wax & col mao",
    category: "Couture & Mode",
    description: "Coutures rabattues haute résistance, boutons en bois",
    price: 18000,
  },
  // BTP & Électricité
  {
    id: "7",
    label: "Installation tableau électrique divisionnaire",
    category: "BTP & Électricité",
    description: "Câblage 8 disjoncteurs différentiels 30mA aux normes UEMOA",
    price: 50000,
  },
  {
    id: "8",
    label: "Raccordement plomberie & pose sanitaires",
    category: "BTP & Électricité",
    description: "Tuyauterie PER encastrée et pose receveur de douche",
    price: 35000,
  },
  {
    id: "9",
    label: "Peinture intérieure mate (3 pièces)",
    category: "BTP & Électricité",
    description: "Lessivage, enduit de lissage 2 passes et peinture acrylique",
    price: 85000,
  },
  // Mécanique & Auto
  {
    id: "10",
    label: "Vidange moteur synthétique 5W40 + filtre",
    category: "Mécanique & Auto",
    description: "Huile haute performance + remplacement filtre à huile & purge",
    price: 15000,
  },
  {
    id: "11",
    label: "Diagnostic électronique valise OBD-II",
    category: "Mécanique & Auto",
    description: "Scan des calculateurs moteur/ABS et remise à zéro des voyants",
    price: 10000,
  },
  {
    id: "12",
    label: "Remplacement plaquettes de frein avant",
    category: "Mécanique & Auto",
    description: "Fourniture plaquettes céramique et vérification des disques",
    price: 18000,
  },
];

const DEFAULT_CATEGORIES = [
  "Menuiserie & Bois",
  "Couture & Mode",
  "BTP & Électricité",
  "Mécanique & Auto",
  "Services & Divers",
];

interface CatalogViewProps {
  onSelectItemForInvoice?: (item: CatalogItem) => void;
}

export default function CatalogView({ onSelectItemForInvoice }: CatalogViewProps) {
  const [items, setItems] = useState<CatalogItem[]>([]);
  const [categories, setCategories] = useState<string[]>(DEFAULT_CATEGORIES);
  const [activeCategory, setActiveCategory] = useState<string>("Tous");
  const [searchQuery, setSearchQuery] = useState("");

  // Dialogs state
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editItem, setEditItem] = useState<CatalogItem | null>(null);
  const [deleteItem, setDeleteItem] = useState<CatalogItem | null>(null);
  const [isClearConfirmOpen, setIsClearConfirmOpen] = useState(false);

  // Form states
  const [label, setLabel] = useState("");
  const [category, setCategory] = useState<string>("Menuiserie & Bois");
  const [customCategoryInput, setCustomCategoryInput] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(25000);

  // Load from Supabase and LocalStorage on mount
  const fetchServices = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: dbServices, error } = await supabase
          .from("catalog_services")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: true });

        if (!error && dbServices && dbServices.length > 0) {
          const mapped: CatalogItem[] = dbServices.map((s: any) => ({
            id: s.id,
            label: s.name,
            category: s.category || "Service",
            description: s.description || undefined,
            price: Number(s.price) || 0,
          }));
          setItems(mapped);

          const uniqueCats = Array.from(new Set(mapped.map((m) => m.category))).filter(Boolean);
          if (uniqueCats.length > 0) {
            setCategories(uniqueCats);
          }
          try {
            localStorage.setItem("zap_custom_catalog", JSON.stringify(mapped));
          } catch {
            // ignore
          }
          return;
        }
      }

      // Fallback local storage
      const savedItems = localStorage.getItem("zap_custom_catalog");
      if (savedItems) {
        setItems(JSON.parse(savedItems));
      }
      const savedCats = localStorage.getItem("zap_custom_categories");
      if (savedCats) {
        setCategories(JSON.parse(savedCats));
      }
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Save to localStorage
  const persistItems = (newItems: CatalogItem[]) => {
    setItems(newItems);
    try {
      localStorage.setItem("zap_custom_catalog", JSON.stringify(newItems));
    } catch {
      // ignore
    }
  };

  const persistCategories = (newCats: string[]) => {
    setCategories(newCats);
    try {
      localStorage.setItem("zap_custom_categories", JSON.stringify(newCats));
    } catch {
      // ignore
    }
  };

  // Filter items
  const filteredItems = useMemo(() => {
    return items.filter((it) => {
      const matchesCat = activeCategory === "Tous" || it.category === activeCategory;
      const matchesSearch =
        it.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (it.description && it.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        it.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [items, activeCategory, searchQuery]);

  const handleOpenAdd = () => {
    setLabel("");
    setCategory(activeCategory === "Tous" ? (categories[0] || "Général") : activeCategory);
    setCustomCategoryInput("");
    setDescription("");
    setPrice(25000);
    setIsAddOpen(true);
  };

  const handleOpenEdit = (item: CatalogItem) => {
    setEditItem(item);
    setLabel(item.label);
    setCategory(item.category);
    setCustomCategoryInput("");
    setDescription(item.description || "");
    setPrice(item.price);
  };

  const handleSaveItem = async () => {
    if (!label.trim()) return;

    const finalCategory = customCategoryInput.trim() ? customCategoryInput.trim() : category;

    if (customCategoryInput.trim() && !categories.includes(customCategoryInput.trim())) {
      persistCategories([...categories, customCategoryInput.trim()]);
    }

    const { data: { user } } = await supabase.auth.getUser();

    if (editItem) {
      const updated = items.map((it) =>
        it.id === editItem.id
          ? { ...it, label: label.trim(), category: finalCategory, description: description.trim(), price }
          : it
      );
      persistItems(updated);
      setEditItem(null);

      if (user) {
        try {
          await supabase
            .from("catalog_services")
            .update({
              name: label.trim(),
              description: description.trim() || null,
              category: finalCategory,
              price,
              updated_at: new Date().toISOString(),
            })
            .eq("id", editItem.id);
        } catch (err) {
          console.warn("Supabase service update error:", err);
        }
      }
      toast.success("Prestation mise à jour avec succès dans Supabase !");
    } else {
      const tempId = Date.now().toString();
      let realId = tempId;

      if (user) {
        try {
          const { data: inserted } = await supabase
            .from("catalog_services")
            .insert({
              user_id: user.id,
              name: label.trim(),
              description: description.trim() || null,
              category: finalCategory,
              price,
            })
            .select()
            .single();
          if (inserted?.id) realId = inserted.id;
        } catch (err) {
          console.warn("Supabase service insert error:", err);
        }
      }

      const newItem: CatalogItem = {
        id: realId,
        label: label.trim(),
        category: finalCategory,
        description: description.trim(),
        price,
      };
      persistItems([newItem, ...items]);
      setIsAddOpen(false);
      toast.success("Prestation ajoutée au catalogue Supabase !");
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteItem) return;
    const targetId = deleteItem.id;
    const updated = items.filter((it) => it.id !== targetId);
    persistItems(updated);
    setDeleteItem(null);

    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      try {
        await supabase.from("catalog_services").delete().eq("id", targetId);
      } catch (err) {
        console.warn("Supabase service delete error:", err);
      }
    }
    toast.success("Prestation supprimée.");
  };

  // Option: Clear all examples to start from complete scratch
  const handleClearAllExamples = () => {
    persistItems([]);
    setIsClearConfirmOpen(false);
  };

  // Option: Restore default models
  const handleRestoreDefaults = () => {
    persistItems(DEFAULT_CATALOG);
    persistCategories(DEFAULT_CATEGORIES);
  };

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto pb-24">
      {/* Header & Main Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Modèles de prix &amp; Catalogue d&apos;atelier
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Gérez les prestations et tarifs de votre atelier pour facturer rapidement.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          {items.length > 0 ? (
            <button
              type="button"
              onClick={() => setIsClearConfirmOpen(true)}
              className="h-10 px-3.5 rounded-xl border border-white/10 hover:border-red-500/40 text-xs text-zinc-400 hover:text-red-400 transition-colors cursor-pointer"
              title="Supprimer tous les modèles existants pour partir d'une liste 100% vierge"
            >
              Vider les exemples
            </button>
          ) : (
            <button
              type="button"
              onClick={handleRestoreDefaults}
              className="flex items-center gap-1.5 h-10 px-3.5 rounded-xl border border-white/10 hover:border-white/25 text-xs text-zinc-300 hover:text-white transition-colors cursor-pointer"
              title="Restaurer les modèles types d'atelier"
            >
              <ArrowPathIcon className="w-3.5 h-3.5" />
              <span>Restaurer les modèles types</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleOpenAdd}
            className="flex items-center justify-center gap-2 h-10 px-4 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs sm:text-sm font-semibold transition-colors cursor-pointer shrink-0 shadow-sm"
          >
            <PlusIcon className="w-4 h-4 stroke-[2.5]" />
            <span>Ajouter une prestation</span>
          </button>
        </div>
      </div>

      {/* Category Pills and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-[#0C0C0C] border border-white/10 rounded-2xl p-2.5">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveCategory("Tous")}
            className={`h-8 px-3 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
              activeCategory === "Tous"
                ? "bg-white text-black font-semibold shadow-sm"
                : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            Tous ({items.length})
          </button>

          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`h-8 px-3 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat
                  ? "bg-white text-black font-semibold shadow-sm"
                  : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[220px]">
          <MagnifyingGlassIcon className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Rechercher une prestation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 pl-9 pr-3 bg-black border border-white/15 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-colors"
          />
        </div>
      </div>

      {/* Catalog Table Card */}
      <div className="bg-[#0C0C0C] border border-white/10 rounded-2xl overflow-hidden">
        {filteredItems.length === 0 ? (
          <div className="p-12 text-center">
            <TagIcon className="w-10 h-10 text-zinc-500 mx-auto mb-3" />
            <p className="text-base text-white font-medium">
              {items.length === 0 ? "Votre catalogue est actuellement vierge" : "Aucun modèle trouvé"}
            </p>
            <p className="text-xs text-zinc-400 mt-1 mb-4">
              {items.length === 0
                ? "Vous avez choisi de partir de zéro. Créez vos propres prestations selon votre activité."
                : searchQuery
                ? `Aucun résultat pour "${searchQuery}" dans cette catégorie.`
                : "Créez vos prestations fréquentes pour facturer en quelques secondes."}
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleOpenAdd}
                className="h-9 px-4 rounded-xl bg-white text-black hover:bg-zinc-200 text-xs font-semibold cursor-pointer transition-colors shadow-sm"
              >
                Ajouter ma première prestation
              </button>
              {items.length === 0 && (
                <button
                  type="button"
                  onClick={handleRestoreDefaults}
                  className="h-9 px-4 rounded-xl border border-white/15 text-zinc-300 hover:text-white text-xs cursor-pointer hover:bg-white/5 transition-colors"
                >
                  Charger les modèles types
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-[11px] font-mono uppercase text-zinc-400 bg-white/[0.02]">
                  <th className="py-3 px-4 font-medium">PRESTATION / ARTICLE</th>
                  <th className="py-3 px-4 font-medium">CORPS DE MÉTIER</th>
                  <th className="py-3 px-4 font-medium text-right">PRIX UNITAIRE</th>
                  <th className="py-3 px-4 font-medium text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                    {/* Item label & description */}
                    <td className="py-3.5 px-4">
                      <p className="text-sm font-medium text-white">{item.label}</p>
                      {item.description && (
                        <p className="text-xs text-zinc-400 mt-0.5 max-w-md line-clamp-1">
                          {item.description}
                        </p>
                      )}
                    </td>

                    {/* Category badge */}
                    <td className="py-3.5 px-4">
                      <span className="inline-block py-0.5 px-2 rounded-md bg-white/[0.04] border border-white/10 text-[11px] text-zinc-300 font-mono">
                        {item.category}
                      </span>
                    </td>

                    {/* Price in FCFA */}
                    <td className="py-3.5 px-4 text-right">
                      <span className="text-sm font-semibold text-white font-mono tabular-nums">
                        {item.price.toLocaleString("fr-FR")} FCFA
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {onSelectItemForInvoice && (
                          <button
                            type="button"
                            onClick={() => onSelectItemForInvoice(item)}
                            className="flex items-center gap-1 h-8 px-2.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-zinc-200 hover:text-white border border-white/10 text-xs font-medium transition-colors cursor-pointer"
                            title="Créer une facture avec cet article"
                          >
                            <DocumentTextIcon className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Facturer</span>
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => handleOpenEdit(item)}
                          className="h-8 w-8 rounded-lg border border-white/10 hover:border-white/25 text-zinc-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer flex items-center justify-center"
                          title="Modifier l'article"
                        >
                          <PencilSquareIcon className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => setDeleteItem(item)}
                          className="h-8 w-8 rounded-lg border border-white/10 hover:border-red-900/50 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer flex items-center justify-center"
                          title="Supprimer l'article"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Modal Dialog */}
      {(isAddOpen || editItem) && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#0C0C0C] border border-white/15 rounded-2xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-semibold text-white tracking-tight">
                {editItem ? "Modifier la prestation" : "Nouveau modèle de prestation"}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setIsAddOpen(false);
                  setEditItem(null);
                }}
                className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                  Catégorie / Corps de métier *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl bg-black border border-white/15 text-sm text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-colors cursor-pointer"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                  Ou créer une nouvelle catégorie personnalisée
                </label>
                <input
                  type="text"
                  placeholder="Ex: Soudure & Ferronnerie / Sérigraphie"
                  value={customCategoryInput}
                  onChange={(e) => setCustomCategoryInput(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl bg-black border border-white/15 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                  Libellé de la prestation *
                </label>
                <input
                  type="text"
                  placeholder="Ex: Confection costume 3 pièces Bazin"
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl bg-black border border-white/15 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                  Description complémentaire (facultatif)
                </label>
                <input
                  type="text"
                  placeholder="Détails des matériaux ou prestations incluses..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl bg-black border border-white/15 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                  Prix unitaire (FCFA) *
                </label>
                <input
                  type="number"
                  min={0}
                  step={500}
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value) || 0)}
                  className="w-full h-11 px-3.5 rounded-xl bg-black border border-white/15 text-sm text-white font-mono tabular-nums focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-colors"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2 border-t border-white/10">
              <button
                type="button"
                onClick={() => {
                  setIsAddOpen(false);
                  setEditItem(null);
                }}
                className="flex-1 h-11 rounded-xl border border-white/15 text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleSaveItem}
                className="flex-1 h-11 rounded-xl bg-white text-black text-xs font-semibold hover:bg-zinc-200 transition-colors cursor-pointer shadow-sm"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Clear All Confirmation Modal */}
      {isClearConfirmOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-[#0C0C0C] border border-white/15 rounded-2xl p-6 space-y-3 shadow-2xl">
            <h3 className="text-base font-semibold text-white tracking-tight">
              Vider tous les modèles ?
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Cette action supprimera tous les exemples pour vous permettre de créer vos propres modèles sur une base 100% vierge. Vous pourrez les restaurer à tout moment.
            </p>

            <div className="flex gap-3 pt-3">
              <button
                type="button"
                onClick={() => setIsClearConfirmOpen(false)}
                className="flex-1 h-10 rounded-xl border border-white/15 text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleClearAllExamples}
                className="flex-1 h-10 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                Vider et partir de zéro
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Single Item Modal */}
      {deleteItem && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-[#0C0C0C] border border-white/15 rounded-2xl p-6 space-y-3 shadow-2xl">
            <h3 className="text-base font-semibold text-white tracking-tight">
              Supprimer cette prestation ?
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Voulez-vous supprimer <strong className="text-white">{deleteItem.label}</strong> du catalogue ? Cette action est irréversible.
            </p>

            <div className="flex gap-3 pt-3">
              <button
                type="button"
                onClick={() => setDeleteItem(null)}
                className="flex-1 h-10 rounded-xl border border-white/15 text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="flex-1 h-10 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
