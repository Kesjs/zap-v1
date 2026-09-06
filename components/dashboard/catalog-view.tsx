"use client";

import React, { useState, useMemo, useEffect } from "react";
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
  const [items, setItems] = useState<CatalogItem[]>(DEFAULT_CATALOG);
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

  // Load from localStorage on mount
  useEffect(() => {
    try {
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

  const handleSaveItem = () => {
    if (!label.trim()) return;

    const finalCategory = customCategoryInput.trim() ? customCategoryInput.trim() : category;

    if (customCategoryInput.trim() && !categories.includes(customCategoryInput.trim())) {
      persistCategories([...categories, customCategoryInput.trim()]);
    }

    if (editItem) {
      const updated = items.map((it) =>
        it.id === editItem.id
          ? { ...it, label: label.trim(), category: finalCategory, description: description.trim(), price }
          : it
      );
      persistItems(updated);
      setEditItem(null);
    } else {
      const newItem: CatalogItem = {
        id: Date.now().toString(),
        label: label.trim(),
        category: finalCategory,
        description: description.trim(),
        price,
      };
      persistItems([newItem, ...items]);
      setIsAddOpen(false);
    }
  };

  const handleConfirmDelete = () => {
    if (!deleteItem) return;
    const updated = items.filter((it) => it.id !== deleteItem.id);
    persistItems(updated);
    setDeleteItem(null);
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
          <h1
            style={{ fontFamily: "'DM Serif Display', serif" }}
            className="text-2xl text-white tracking-tight"
          >
            Modèles de prix &amp; Catalogue d&apos;atelier
          </h1>
          <p className="text-sm text-neutral-400 mt-1">
            Utilisez les modèles d&apos;Afrique de l&apos;Ouest ou créez vos propres prestations personnalisées. Rien n&apos;est imposé.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          {items.length > 0 ? (
            <button
              type="button"
              onClick={() => setIsClearConfirmOpen(true)}
              className="py-2 px-3 rounded-xl border border-[#262626] hover:border-red-900/50 text-xs text-neutral-400 hover:text-red-400 transition-colors cursor-pointer"
              title="Supprimer tous les modèles existants pour partir d'une liste 100% vierge"
            >
              Vider les exemples (Partir de zéro)
            </button>
          ) : (
            <button
              type="button"
              onClick={handleRestoreDefaults}
              className="flex items-center gap-1.5 py-2 px-3 rounded-xl border border-[#262626] hover:border-[#D4AF37]/50 text-xs text-neutral-300 hover:text-[#D4AF37] transition-colors cursor-pointer"
              title="Restaurer les modèles types d'atelier"
            >
              <ArrowPathIcon className="w-3.5 h-3.5" />
              <span>Restaurer les modèles types</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleOpenAdd}
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#D4AF37] hover:bg-[#e2b170] text-[#000000] text-sm font-semibold transition-colors cursor-pointer shrink-0"
          >
            <PlusIcon className="w-4 h-4 stroke-[2.5]" />
            <span>+ Ajouter une prestation</span>
          </button>
        </div>
      </div>

      {/* Category Pills and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-[#171717] border border-[#262626] rounded-2xl p-3">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveCategory("Tous")}
            className={`py-1.5 px-3 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
              activeCategory === "Tous"
                ? "bg-[#262626] text-[#D4AF37] font-semibold border border-[#D4AF37]/40"
                : "text-neutral-400 hover:text-white hover:bg-[#202020]"
            }`}
          >
            Tous ({items.length})
          </button>

          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`py-1.5 px-3 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat
                  ? "bg-[#262626] text-[#D4AF37] font-semibold border border-[#D4AF37]/40"
                  : "text-neutral-400 hover:text-white hover:bg-[#202020]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[220px]">
          <MagnifyingGlassIcon className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Rechercher une prestation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-[#000000] border border-[#262626] rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
          />
        </div>
      </div>

      {/* Catalog Table Card */}
      <div className="bg-[#171717] border border-[#262626] rounded-2xl overflow-hidden">
        {filteredItems.length === 0 ? (
          <div className="p-12 text-center">
            <TagIcon className="w-10 h-10 text-neutral-500 mx-auto mb-3" />
            <p className="text-base text-white font-medium">
              {items.length === 0 ? "Votre catalogue est actuellement vierge" : "Aucun modèle trouvé"}
            </p>
            <p className="text-xs text-neutral-400 mt-1 mb-4">
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
                className="py-2 px-4 rounded-xl bg-[#D4AF37] text-[#000000] text-xs font-semibold cursor-pointer"
              >
                + Ajouter ma première prestation
              </button>
              {items.length === 0 && (
                <button
                  type="button"
                  onClick={handleRestoreDefaults}
                  className="py-2 px-4 rounded-xl border border-[#262626] text-neutral-300 hover:text-white text-xs cursor-pointer"
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
                <tr className="border-b border-[#262626] text-[11px] font-mono uppercase text-neutral-400">
                  <th className="py-3 px-4 font-medium">PRESTATION / ARTICLE</th>
                  <th className="py-3 px-4 font-medium">CORPS DE MÉTIER</th>
                  <th className="py-3 px-4 font-medium text-right">PRIX UNITAIRE</th>
                  <th className="py-3 px-4 font-medium text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#222]">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-[#1c1c1c] transition-colors">
                    {/* Item label & description */}
                    <td className="py-3.5 px-4">
                      <p className="text-sm font-medium text-white">{item.label}</p>
                      {item.description && (
                        <p className="text-xs text-neutral-400 mt-0.5 max-w-md line-clamp-1">
                          {item.description}
                        </p>
                      )}
                    </td>

                    {/* Category badge */}
                    <td className="py-3.5 px-4">
                      <span className="inline-block py-0.5 px-2 rounded-md bg-[#262626] border border-[#333] text-[11px] text-neutral-300">
                        {item.category}
                      </span>
                    </td>

                    {/* Price in FCFA */}
                    <td className="py-3.5 px-4 text-right">
                      <span className="text-sm font-semibold text-[#D4AF37] font-mono tabular-nums">
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
                            className="flex items-center gap-1 py-1 px-2 rounded-lg bg-[#262626] hover:bg-[#303030] text-[#D4AF37] text-xs font-medium transition-colors cursor-pointer"
                            title="Créer une facture avec cet article"
                          >
                            <DocumentTextIcon className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Facturer</span>
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => handleOpenEdit(item)}
                          className="p-1.5 rounded-lg border border-[#262626] hover:border-[#404040] text-neutral-400 hover:text-white transition-colors cursor-pointer"
                          title="Modifier l'article"
                        >
                          <PencilSquareIcon className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => setDeleteItem(item)}
                          className="p-1.5 rounded-lg border border-[#262626] hover:border-red-900/60 text-neutral-500 hover:text-red-400 transition-colors cursor-pointer"
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
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#171717] border border-[#262626] rounded-2xl p-6 space-y-4 shadow-none">
            <div className="flex items-center justify-between border-b border-[#262626] pb-3">
              <h3
                style={{ fontFamily: "'DM Serif Display', serif" }}
                className="text-lg text-white"
              >
                {editItem ? "Modifier la prestation" : "Nouveau modèle de prestation"}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setIsAddOpen(false);
                  setEditItem(null);
                }}
                className="p-1 text-neutral-400 hover:text-white"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Catégorie / Corps de métier *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#000000] border border-[#262626] text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Ou créer une nouvelle catégorie personnalisée
                </label>
                <input
                  type="text"
                  placeholder="Ex: Soudure & Ferronnerie / Sérigraphie"
                  value={customCategoryInput}
                  onChange={(e) => setCustomCategoryInput(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#000000] border border-[#262626] text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Libellé de la prestation *
                </label>
                <input
                  type="text"
                  placeholder="Ex: Confection costume 3 pièces Bazin"
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#000000] border border-[#262626] text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Description complémentaire (facultatif)
                </label>
                <input
                  type="text"
                  placeholder="Détails des matériaux ou prestations incluses..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#000000] border border-[#262626] text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Prix unitaire (FCFA) *
                </label>
                <input
                  type="number"
                  min={0}
                  step={500}
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value) || 0)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#000000] border border-[#262626] text-sm text-white font-mono focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2 border-t border-[#262626]">
              <button
                type="button"
                onClick={() => {
                  setIsAddOpen(false);
                  setEditItem(null);
                }}
                className="flex-1 py-2.5 rounded-xl border border-[#262626] text-xs text-neutral-300 hover:text-white font-medium"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleSaveItem}
                className="flex-1 py-2.5 rounded-xl bg-[#D4AF37] text-[#000000] text-xs font-semibold hover:bg-[#e2b170] transition-colors"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Clear All Confirmation Modal */}
      {isClearConfirmOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-[#171717] border border-[#262626] rounded-2xl p-6 space-y-3">
            <h3
              style={{ fontFamily: "'DM Serif Display', serif" }}
              className="text-lg text-white"
            >
              Vider tous les modèles ?
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Cette action supprimera tous les exemples pour vous permettre de créer vos propres modèles sur une base 100% vierge. Vous pourrez les restaurer à tout moment.
            </p>

            <div className="flex gap-3 pt-3">
              <button
                type="button"
                onClick={() => setIsClearConfirmOpen(false)}
                className="flex-1 py-2.5 rounded-xl border border-[#262626] text-xs text-neutral-300 hover:text-white"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleClearAllExamples}
                className="flex-1 py-2.5 rounded-xl bg-red-500/80 hover:bg-red-500 text-white text-xs font-semibold transition-colors"
              >
                Vider et partir de zéro
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Single Item Modal */}
      {deleteItem && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-[#171717] border border-[#262626] rounded-2xl p-6 space-y-3">
            <h3
              style={{ fontFamily: "'DM Serif Display', serif" }}
              className="text-lg text-white"
            >
              Supprimer cette prestation ?
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Voulez-vous supprimer <strong className="text-white">{deleteItem.label}</strong> du catalogue ? Cette action est irréversible.
            </p>

            <div className="flex gap-3 pt-3">
              <button
                type="button"
                onClick={() => setDeleteItem(null)}
                className="flex-1 py-2.5 rounded-xl border border-[#262626] text-xs text-neutral-300 hover:text-white"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="flex-1 py-2.5 rounded-xl bg-red-500/80 hover:bg-red-500 text-white text-xs font-semibold transition-colors"
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
