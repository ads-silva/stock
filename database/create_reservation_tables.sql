-- =====================================================
-- SCRIPT 1: CRIAÇÃO DAS TABELAS
-- =====================================================

-- Tabela de produtos
CREATE TABLE "public"."products" (
    "id" BIGSERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL UNIQUE,
    "description" VARCHAR(255) NOT NULL,
    "price" DECIMAL(10, 2) NOT NULL,
    "amount" BIGINT DEFAULT 0,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Tabela de pedidos de reserva
CREATE TABLE "public"."reservations" (
    "id" BIGSERIAL PRIMARY KEY,
    "status" VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK ("status" IN ('pending', 'available', 'rejected', 'completed')),
    "managerComment" VARCHAR(255) DEFAULT '',
    "managerUserId" BIGINT REFERENCES "public"."users"("id") ON DELETE CASCADE,
    "requesterUserId" BIGINT NOT NULL REFERENCES "public"."users"("id") ON DELETE CASCADE,
    "createdUserId" BIGINT NOT NULL REFERENCES "public"."users"("id") ON DELETE CASCADE,
    "updatedUserId" BIGINT REFERENCES "public"."users"("id") ON DELETE CASCADE,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Tabela de junção entre pedidos e produtos
CREATE TABLE "public"."reservations_products" (
    "id" BIGSERIAL PRIMARY KEY,
    "amount" BIGINT DEFAULT 0,
    "reservationId" BIGINT NOT NULL REFERENCES "public"."reservations"("id") ON DELETE CASCADE,
    "productId" BIGINT NOT NULL REFERENCES "public"."products"("id") ON DELETE CASCADE,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Índices para melhorar performance
CREATE INDEX idx_reservations_status ON "public"."reservations"("status");
CREATE INDEX idx_reservations_products_reservation_id ON "public"."reservations_products"("reservationId");
CREATE INDEX idx_reservations_products_product_id ON "public"."reservations_products"("productId");

-- Habilitar Row Level Security
ALTER TABLE "public"."products" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."reservations" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."reservations_products" ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "allow all users to do all actions on products" ON "public"."products" FOR ALL USING (true);
CREATE POLICY "allow all users to do all actions on reservations" ON "public"."reservations" FOR ALL USING (true);
CREATE POLICY "allow all users to do all actions on reservation products" ON "public"."reservations_products" FOR ALL USING (true);


