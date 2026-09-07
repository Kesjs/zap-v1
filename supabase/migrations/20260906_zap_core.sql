-- ==============================================================================
-- ZAP - MIGRATION CORE DATABASE
-- Tables : workshops, documents, document_items, catalog_services
-- Sécurité : RLS activé sur toutes les tables (auth.uid() = user_id)
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. TABLE ATELIERS / WORKSHOPS
CREATE TABLE IF NOT EXISTS public.workshops (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL DEFAULT 'Mon Atelier',
    owner_name TEXT,
    phone TEXT,
    email TEXT,
    address TEXT,
    city TEXT DEFAULT 'Cotonou',
    country TEXT DEFAULT 'Bénin',
    currency TEXT DEFAULT 'FCFA',
    tax_id TEXT,
    momo_operator TEXT DEFAULT 'MTN Mobile Money',
    momo_number TEXT,
    logo_url TEXT,
    stamp_signature_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT workshops_user_id_unique UNIQUE(user_id)
);

-- 3. TABLE DOCUMENTS (Factures, Devis, Reçus, Commandes)
CREATE TABLE IF NOT EXISTS public.documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    workshop_id UUID REFERENCES public.workshops(id) ON DELETE SET NULL,
    number TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('invoice', 'quote', 'receipt', 'order')),
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'pending', 'paid', 'cancelled')),
    client_name TEXT NOT NULL,
    client_phone TEXT,
    client_email TEXT,
    client_address TEXT,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    due_date DATE,
    subtotal NUMERIC(12, 2) NOT NULL DEFAULT 0,
    discount NUMERIC(12, 2) NOT NULL DEFAULT 0,
    tax NUMERIC(12, 2) NOT NULL DEFAULT 0,
    total NUMERIC(12, 2) NOT NULL DEFAULT 0,
    amount_paid NUMERIC(12, 2) NOT NULL DEFAULT 0,
    payment_method TEXT DEFAULT 'cash',
    notes TEXT,
    terms TEXT,
    signature_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. TABLE LIGNES DE DOCUMENT (Items)
CREATE TABLE IF NOT EXISTS public.document_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    document_id UUID NOT NULL REFERENCES public.documents(id) ON DELETE CASCADE,
    description TEXT NOT NULL,
    quantity NUMERIC(10, 2) NOT NULL DEFAULT 1,
    unit_price NUMERIC(12, 2) NOT NULL DEFAULT 0,
    total NUMERIC(12, 2) NOT NULL DEFAULT 0,
    sort_order INT DEFAULT 0
);

-- 5. TABLE SERVICES / CATALOGUE
CREATE TABLE IF NOT EXISTS public.catalog_services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    category TEXT DEFAULT 'Service',
    price NUMERIC(12, 2) NOT NULL DEFAULT 0,
    duration TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. INDEX POUR PERFORMANCES
CREATE INDEX IF NOT EXISTS idx_documents_user_id ON public.documents(user_id);
CREATE INDEX IF NOT EXISTS idx_documents_type ON public.documents(type);
CREATE INDEX IF NOT EXISTS idx_documents_status ON public.documents(status);
CREATE INDEX IF NOT EXISTS idx_documents_created_at ON public.documents(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_document_items_document_id ON public.document_items(document_id);
CREATE INDEX IF NOT EXISTS idx_catalog_services_user_id ON public.catalog_services(user_id);

-- 7. SÉCURITÉ ROW LEVEL SECURITY (RLS)
ALTER TABLE public.workshops ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.document_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.catalog_services ENABLE ROW LEVEL SECURITY;

-- POLICIES WORKSHOPS
DROP POLICY IF EXISTS "Users can manage their own workshop" ON public.workshops;
CREATE POLICY "Users can manage their own workshop"
    ON public.workshops FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- POLICIES DOCUMENTS
DROP POLICY IF EXISTS "Users can manage their own documents" ON public.documents;
CREATE POLICY "Users can manage their own documents"
    ON public.documents FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- POLICIES DOCUMENT ITEMS
DROP POLICY IF EXISTS "Users can manage items of their documents" ON public.document_items;
CREATE POLICY "Users can manage items of their documents"
    ON public.document_items FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.documents d
            WHERE d.id = document_items.document_id
            AND d.user_id = auth.uid()
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.documents d
            WHERE d.id = document_items.document_id
            AND d.user_id = auth.uid()
        )
    );

-- POLICIES CATALOG SERVICES
DROP POLICY IF EXISTS "Users can manage their own catalog services" ON public.catalog_services;
CREATE POLICY "Users can manage their own catalog services"
    ON public.catalog_services FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- 8. TRIGGER UPDATED_AT AUTOMATIQUE
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_workshops_updated_at ON public.workshops;
CREATE TRIGGER set_workshops_updated_at
    BEFORE UPDATE ON public.workshops
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_documents_updated_at ON public.documents;
CREATE TRIGGER set_documents_updated_at
    BEFORE UPDATE ON public.documents
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_catalog_services_updated_at ON public.catalog_services;
CREATE TRIGGER set_catalog_services_updated_at
    BEFORE UPDATE ON public.catalog_services
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
