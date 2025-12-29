-- =====================================================
-- SCRIPT 1: CRIAÇÃO DAS TABELAS
-- =====================================================

-- Tabela de produtos
CREATE TABLE "public"."product" (
    "id" BIGSERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL UNIQUE,
    "description" VARCHAR(255) NOT NULL,
    "price" DECIMAL(10, 2) NOT NULL,
    "amount" BIGINT DEFAULT 0,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Tabela de pedidos de reserva
CREATE TABLE "public"."reservation" (
    "id" BIGSERIAL PRIMARY KEY,
    "status" VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK ("status" IN ('pending', 'available', 'rejected', 'completed')),
    "reason" VARCHAR(255),
    "managerComment" VARCHAR(255) DEFAULT '',
    "managerUserId" BIGINT REFERENCES "public"."users"("id") ON DELETE CASCADE,
    "requestUserId" BIGINT NOT NULL REFERENCES "public"."users"("id") ON DELETE CASCADE,
    "createdUserId" BIGINT NOT NULL REFERENCES "public"."users"("id") ON DELETE CASCADE,
    "updatedUserId" BIGINT REFERENCES "public"."users"("id") ON DELETE CASCADE,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Tabela de junção entre pedidos e produtos
CREATE TABLE "public"."reservation_product" (
    "id" BIGSERIAL PRIMARY KEY,
    "amount" BIGINT DEFAULT 0,
    "reservationId" BIGINT NOT NULL REFERENCES "public"."reservation"("id") ON DELETE CASCADE,
    "productId" BIGINT NOT NULL REFERENCES "public"."product"("id") ON DELETE CASCADE,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Índices para melhorar performance
CREATE INDEX idx_reservation_status ON "public"."reservation"("status");
CREATE INDEX idx_reservation_product_reservation_id ON "public"."reservation_product"("reservationId");
CREATE INDEX idx_reservation_product_product_id ON "public"."reservation_product"("productId");

-- Habilitar Row Level Security
ALTER TABLE "public"."product" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."reservation" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."reservation_product" ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "allow all users to do all actions on products" ON "public"."product" FOR ALL USING (true);
CREATE POLICY "allow all users to do all actions on reservations" ON "public"."reservation" FOR ALL USING (true);
CREATE POLICY "allow all users to do all actions on reservation products" ON "public"."reservation_product" FOR ALL USING (true);


