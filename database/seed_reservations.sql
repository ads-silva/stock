-- =====================================================
-- SCRIPT: SEED DATA FOR RESERVATIONS AND RESERVATIONS_PRODUCTS
-- This creates example/demo data to populate the dashboard charts
-- =====================================================

-- Note: This assumes the following users exist:
--   id=1: manager@mail.com (reservation_manager)
--   id=2: requester@mail.com (reservation_requester)
-- And products with ids 1-41 exist from seed_products.sql

-- Clear existing reservation data (optional - comment out if you want to keep existing data)
-- TRUNCATE "public"."reservations_products" CASCADE;
-- TRUNCATE "public"."reservations" CASCADE;

-- =====================================================
-- RESERVATIONS DATA
-- Statuses: 'pending', 'available', 'rejected', 'completed'
-- =====================================================

-- Last 6 months of reservations for trending data
-- Month 1 (6 months ago) - Starting slow
INSERT INTO "public"."reservations" ("status", "managerComment", "managerUserId", "requesterUserId", "createdUserId", "updatedUserId", "createdAt", "updatedAt") VALUES
('completed', 'Approved and delivered', 1, 2, 2, 1, NOW() - INTERVAL '180 days', NOW() - INTERVAL '178 days'),
('completed', 'Items ready for pickup', 1, 2, 2, 1, NOW() - INTERVAL '175 days', NOW() - INTERVAL '173 days'),
('rejected', 'Insufficient stock', 1, 2, 2, 1, NOW() - INTERVAL '172 days', NOW() - INTERVAL '171 days');

-- Month 2 (5 months ago) - Growing
INSERT INTO "public"."reservations" ("status", "managerComment", "managerUserId", "requesterUserId", "createdUserId", "updatedUserId", "createdAt", "updatedAt") VALUES
('completed', 'Delivered successfully', 1, 2, 2, 1, NOW() - INTERVAL '150 days', NOW() - INTERVAL '148 days'),
('completed', 'All items provided', 1, 2, 2, 1, NOW() - INTERVAL '145 days', NOW() - INTERVAL '143 days'),
('completed', 'Pickup confirmed', 1, 2, 2, 1, NOW() - INTERVAL '140 days', NOW() - INTERVAL '138 days'),
('rejected', 'Product discontinued', 1, 2, 2, 1, NOW() - INTERVAL '138 days', NOW() - INTERVAL '137 days'),
('completed', 'Items delivered on time', 1, 2, 2, 1, NOW() - INTERVAL '135 days', NOW() - INTERVAL '133 days');

-- Month 3 (4 months ago) - Steady growth
INSERT INTO "public"."reservations" ("status", "managerComment", "managerUserId", "requesterUserId", "createdUserId", "updatedUserId", "createdAt", "updatedAt") VALUES
('completed', 'Ready for pickup', 1, 2, 2, 1, NOW() - INTERVAL '120 days', NOW() - INTERVAL '118 days'),
('completed', 'Delivered to department', 1, 2, 2, 1, NOW() - INTERVAL '115 days', NOW() - INTERVAL '113 days'),
('completed', 'All items approved', 1, 2, 2, 1, NOW() - INTERVAL '110 days', NOW() - INTERVAL '108 days'),
('completed', 'Supplies delivered', 1, 2, 2, 1, NOW() - INTERVAL '108 days', NOW() - INTERVAL '106 days'),
('rejected', 'Budget exceeded', 1, 2, 2, 1, NOW() - INTERVAL '105 days', NOW() - INTERVAL '104 days'),
('completed', 'Items confirmed', 1, 2, 2, 1, NOW() - INTERVAL '102 days', NOW() - INTERVAL '100 days'),
('completed', 'Delivery successful', 1, 2, 2, 1, NOW() - INTERVAL '98 days', NOW() - INTERVAL '96 days');

-- Month 4 (3 months ago) - Peak activity
INSERT INTO "public"."reservations" ("status", "managerComment", "managerUserId", "requesterUserId", "createdUserId", "updatedUserId", "createdAt", "updatedAt") VALUES
('completed', 'Approved by manager', 1, 2, 2, 1, NOW() - INTERVAL '90 days', NOW() - INTERVAL '88 days'),
('completed', 'Items delivered', 1, 2, 2, 1, NOW() - INTERVAL '87 days', NOW() - INTERVAL '85 days'),
('completed', 'Pickup completed', 1, 2, 2, 1, NOW() - INTERVAL '85 days', NOW() - INTERVAL '83 days'),
('completed', 'All supplies provided', 1, 2, 2, 1, NOW() - INTERVAL '82 days', NOW() - INTERVAL '80 days'),
('completed', 'Delivered as requested', 1, 2, 2, 1, NOW() - INTERVAL '78 days', NOW() - INTERVAL '76 days'),
('rejected', 'Duplicate request', 1, 2, 2, 1, NOW() - INTERVAL '75 days', NOW() - INTERVAL '74 days'),
('completed', 'Items confirmed delivered', 1, 2, 2, 1, NOW() - INTERVAL '72 days', NOW() - INTERVAL '70 days'),
('completed', 'Supplies received', 1, 2, 2, 1, NOW() - INTERVAL '68 days', NOW() - INTERVAL '66 days'),
('completed', 'Order fulfilled', 1, 2, 2, 1, NOW() - INTERVAL '65 days', NOW() - INTERVAL '63 days');

-- Month 5 (2 months ago) - Continued high activity
INSERT INTO "public"."reservations" ("status", "managerComment", "managerUserId", "requesterUserId", "createdUserId", "updatedUserId", "createdAt", "updatedAt") VALUES
('completed', 'Ready and delivered', 1, 2, 2, 1, NOW() - INTERVAL '60 days', NOW() - INTERVAL '58 days'),
('completed', 'Items dispatched', 1, 2, 2, 1, NOW() - INTERVAL '55 days', NOW() - INTERVAL '53 days'),
('completed', 'Pickup confirmed', 1, 2, 2, 1, NOW() - INTERVAL '52 days', NOW() - INTERVAL '50 days'),
('completed', 'All items approved', 1, 2, 2, 1, NOW() - INTERVAL '48 days', NOW() - INTERVAL '46 days'),
('rejected', 'Items not available', 1, 2, 2, 1, NOW() - INTERVAL '45 days', NOW() - INTERVAL '44 days'),
('completed', 'Delivery successful', 1, 2, 2, 1, NOW() - INTERVAL '42 days', NOW() - INTERVAL '40 days'),
('completed', 'Supplies provided', 1, 2, 2, 1, NOW() - INTERVAL '38 days', NOW() - INTERVAL '36 days'),
('completed', 'Order complete', 1, 2, 2, 1, NOW() - INTERVAL '35 days', NOW() - INTERVAL '33 days');

-- Month 6 (last month) - Recent activity
INSERT INTO "public"."reservations" ("status", "managerComment", "managerUserId", "requesterUserId", "createdUserId", "updatedUserId", "createdAt", "updatedAt") VALUES
('completed', 'Items delivered on schedule', 1, 2, 2, 1, NOW() - INTERVAL '28 days', NOW() - INTERVAL '26 days'),
('completed', 'Approved and sent', 1, 2, 2, 1, NOW() - INTERVAL '25 days', NOW() - INTERVAL '23 days'),
('completed', 'Pickup done', 1, 2, 2, 1, NOW() - INTERVAL '22 days', NOW() - INTERVAL '20 days'),
('completed', 'All items ready', 1, 2, 2, 1, NOW() - INTERVAL '18 days', NOW() - INTERVAL '16 days'),
('completed', 'Delivery confirmed', 1, 2, 2, 1, NOW() - INTERVAL '15 days', NOW() - INTERVAL '13 days'),
('completed', 'Items shipped', 1, 2, 2, 1, NOW() - INTERVAL '12 days', NOW() - INTERVAL '10 days'),
('rejected', 'Request cancelled by requester', 1, 2, 2, 1, NOW() - INTERVAL '10 days', NOW() - INTERVAL '9 days');

-- Current week - Active reservations (various statuses)
INSERT INTO "public"."reservations" ("status", "managerComment", "managerUserId", "requesterUserId", "createdUserId", "updatedUserId", "createdAt", "updatedAt") VALUES
('completed', 'Delivered today', 1, 2, 2, 1, NOW() - INTERVAL '7 days', NOW() - INTERVAL '5 days'),
('completed', 'Fulfilled successfully', 1, 2, 2, 1, NOW() - INTERVAL '5 days', NOW() - INTERVAL '3 days'),
('available', 'Ready for pickup', 1, 2, 2, 1, NOW() - INTERVAL '4 days', NOW() - INTERVAL '2 days'),
('available', 'Items prepared', 1, 2, 2, 1, NOW() - INTERVAL '3 days', NOW() - INTERVAL '1 day'),
('pending', '', NULL, 2, 2, NULL, NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days'),
('pending', '', NULL, 2, 2, NULL, NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day'),
('pending', '', NULL, 2, 2, NULL, NOW(), NOW());

-- =====================================================
-- RESERVATIONS_PRODUCTS DATA
-- Links products to reservations with amounts
-- This creates the data for "top delivered products" chart
-- =====================================================

-- Get the reservation IDs dynamically would require a more complex script
-- For simplicity, we assume reservations start from ID 1
-- Adjust the reservationId values based on your actual data

-- Products that are frequently requested (for top products chart):
-- notebook (id=1), pen (id=5), sticky notes (id=36), paper clips (id=3), highlighter (id=21)
-- printer paper (id=10), markers (id=40), folder (id=11), tape (id=7), scissors (id=9)

-- Reservation 1 products
INSERT INTO "public"."reservations_products" ("amount", "reservationId", "productId", "createdAt", "updatedAt") VALUES
(5, 1, 1, NOW() - INTERVAL '180 days', NOW() - INTERVAL '180 days'),
(10, 1, 5, NOW() - INTERVAL '180 days', NOW() - INTERVAL '180 days'),
(3, 1, 36, NOW() - INTERVAL '180 days', NOW() - INTERVAL '180 days');

-- Reservation 2 products
INSERT INTO "public"."reservations_products" ("amount", "reservationId", "productId", "createdAt", "updatedAt") VALUES
(15, 2, 5, NOW() - INTERVAL '175 days', NOW() - INTERVAL '175 days'),
(2, 2, 10, NOW() - INTERVAL '175 days', NOW() - INTERVAL '175 days');

-- Reservation 3 products (rejected)
INSERT INTO "public"."reservations_products" ("amount", "reservationId", "productId", "createdAt", "updatedAt") VALUES
(50, 3, 4, NOW() - INTERVAL '172 days', NOW() - INTERVAL '172 days');

-- Reservation 4 products
INSERT INTO "public"."reservations_products" ("amount", "reservationId", "productId", "createdAt", "updatedAt") VALUES
(8, 4, 1, NOW() - INTERVAL '150 days', NOW() - INTERVAL '150 days'),
(20, 4, 5, NOW() - INTERVAL '150 days', NOW() - INTERVAL '150 days'),
(5, 4, 21, NOW() - INTERVAL '150 days', NOW() - INTERVAL '150 days');

-- Reservation 5 products
INSERT INTO "public"."reservations_products" ("amount", "reservationId", "productId", "createdAt", "updatedAt") VALUES
(10, 5, 36, NOW() - INTERVAL '145 days', NOW() - INTERVAL '145 days'),
(3, 5, 40, NOW() - INTERVAL '145 days', NOW() - INTERVAL '145 days');

-- Reservation 6 products
INSERT INTO "public"."reservations_products" ("amount", "reservationId", "productId", "createdAt", "updatedAt") VALUES
(4, 6, 11, NOW() - INTERVAL '140 days', NOW() - INTERVAL '140 days'),
(2, 6, 7, NOW() - INTERVAL '140 days', NOW() - INTERVAL '140 days'),
(6, 6, 3, NOW() - INTERVAL '140 days', NOW() - INTERVAL '140 days');

-- Reservation 7 products (rejected)
INSERT INTO "public"."reservations_products" ("amount", "reservationId", "productId", "createdAt", "updatedAt") VALUES
(30, 7, 38, NOW() - INTERVAL '138 days', NOW() - INTERVAL '138 days');

-- Reservation 8 products
INSERT INTO "public"."reservations_products" ("amount", "reservationId", "productId", "createdAt", "updatedAt") VALUES
(12, 8, 1, NOW() - INTERVAL '135 days', NOW() - INTERVAL '135 days'),
(25, 8, 5, NOW() - INTERVAL '135 days', NOW() - INTERVAL '135 days');

-- Reservation 9 products
INSERT INTO "public"."reservations_products" ("amount", "reservationId", "productId", "createdAt", "updatedAt") VALUES
(6, 9, 9, NOW() - INTERVAL '120 days', NOW() - INTERVAL '120 days'),
(8, 9, 36, NOW() - INTERVAL '120 days', NOW() - INTERVAL '120 days');

-- Reservation 10 products
INSERT INTO "public"."reservations_products" ("amount", "reservationId", "productId", "createdAt", "updatedAt") VALUES
(15, 10, 5, NOW() - INTERVAL '115 days', NOW() - INTERVAL '115 days'),
(3, 10, 10, NOW() - INTERVAL '115 days', NOW() - INTERVAL '115 days'),
(10, 10, 3, NOW() - INTERVAL '115 days', NOW() - INTERVAL '115 days');

-- Reservation 11 products
INSERT INTO "public"."reservations_products" ("amount", "reservationId", "productId", "createdAt", "updatedAt") VALUES
(5, 11, 21, NOW() - INTERVAL '110 days', NOW() - INTERVAL '110 days'),
(4, 11, 40, NOW() - INTERVAL '110 days', NOW() - INTERVAL '110 days');

-- Reservation 12 products
INSERT INTO "public"."reservations_products" ("amount", "reservationId", "productId", "createdAt", "updatedAt") VALUES
(10, 12, 1, NOW() - INTERVAL '108 days', NOW() - INTERVAL '108 days'),
(8, 12, 11, NOW() - INTERVAL '108 days', NOW() - INTERVAL '108 days');

-- Reservation 13 products (rejected)
INSERT INTO "public"."reservations_products" ("amount", "reservationId", "productId", "createdAt", "updatedAt") VALUES
(100, 13, 34, NOW() - INTERVAL '105 days', NOW() - INTERVAL '105 days');

-- Reservation 14 products
INSERT INTO "public"."reservations_products" ("amount", "reservationId", "productId", "createdAt", "updatedAt") VALUES
(20, 14, 5, NOW() - INTERVAL '102 days', NOW() - INTERVAL '102 days'),
(5, 14, 36, NOW() - INTERVAL '102 days', NOW() - INTERVAL '102 days');

-- Reservation 15 products
INSERT INTO "public"."reservations_products" ("amount", "reservationId", "productId", "createdAt", "updatedAt") VALUES
(3, 15, 7, NOW() - INTERVAL '98 days', NOW() - INTERVAL '98 days'),
(2, 15, 9, NOW() - INTERVAL '98 days', NOW() - INTERVAL '98 days'),
(6, 15, 3, NOW() - INTERVAL '98 days', NOW() - INTERVAL '98 days');

-- Reservation 16 products
INSERT INTO "public"."reservations_products" ("amount", "reservationId", "productId", "createdAt", "updatedAt") VALUES
(7, 16, 1, NOW() - INTERVAL '90 days', NOW() - INTERVAL '90 days'),
(30, 16, 5, NOW() - INTERVAL '90 days', NOW() - INTERVAL '90 days');

-- Reservation 17 products
INSERT INTO "public"."reservations_products" ("amount", "reservationId", "productId", "createdAt", "updatedAt") VALUES
(12, 17, 36, NOW() - INTERVAL '87 days', NOW() - INTERVAL '87 days'),
(4, 17, 21, NOW() - INTERVAL '87 days', NOW() - INTERVAL '87 days');

-- Reservation 18 products
INSERT INTO "public"."reservations_products" ("amount", "reservationId", "productId", "createdAt", "updatedAt") VALUES
(5, 18, 10, NOW() - INTERVAL '85 days', NOW() - INTERVAL '85 days'),
(6, 18, 40, NOW() - INTERVAL '85 days', NOW() - INTERVAL '85 days');

-- Reservation 19 products
INSERT INTO "public"."reservations_products" ("amount", "reservationId", "productId", "createdAt", "updatedAt") VALUES
(10, 19, 11, NOW() - INTERVAL '82 days', NOW() - INTERVAL '82 days'),
(15, 19, 3, NOW() - INTERVAL '82 days', NOW() - INTERVAL '82 days');

-- Reservation 20 products
INSERT INTO "public"."reservations_products" ("amount", "reservationId", "productId", "createdAt", "updatedAt") VALUES
(8, 20, 1, NOW() - INTERVAL '78 days', NOW() - INTERVAL '78 days'),
(25, 20, 5, NOW() - INTERVAL '78 days', NOW() - INTERVAL '78 days'),
(3, 20, 7, NOW() - INTERVAL '78 days', NOW() - INTERVAL '78 days');

-- Reservation 21 products (rejected)
INSERT INTO "public"."reservations_products" ("amount", "reservationId", "productId", "createdAt", "updatedAt") VALUES
(20, 21, 1, NOW() - INTERVAL '75 days', NOW() - INTERVAL '75 days');

-- Reservation 22-25 products
INSERT INTO "public"."reservations_products" ("amount", "reservationId", "productId", "createdAt", "updatedAt") VALUES
(6, 22, 36, NOW() - INTERVAL '72 days', NOW() - INTERVAL '72 days'),
(4, 22, 21, NOW() - INTERVAL '72 days', NOW() - INTERVAL '72 days'),
(10, 23, 5, NOW() - INTERVAL '68 days', NOW() - INTERVAL '68 days'),
(2, 23, 9, NOW() - INTERVAL '68 days', NOW() - INTERVAL '68 days'),
(15, 24, 1, NOW() - INTERVAL '65 days', NOW() - INTERVAL '65 days'),
(8, 24, 3, NOW() - INTERVAL '65 days', NOW() - INTERVAL '65 days');

-- Reservation 25-30 products
INSERT INTO "public"."reservations_products" ("amount", "reservationId", "productId", "createdAt", "updatedAt") VALUES
(20, 25, 5, NOW() - INTERVAL '60 days', NOW() - INTERVAL '60 days'),
(5, 25, 40, NOW() - INTERVAL '60 days', NOW() - INTERVAL '60 days'),
(3, 26, 10, NOW() - INTERVAL '55 days', NOW() - INTERVAL '55 days'),
(10, 26, 36, NOW() - INTERVAL '55 days', NOW() - INTERVAL '55 days'),
(4, 27, 11, NOW() - INTERVAL '52 days', NOW() - INTERVAL '52 days'),
(6, 27, 7, NOW() - INTERVAL '52 days', NOW() - INTERVAL '52 days'),
(8, 28, 21, NOW() - INTERVAL '48 days', NOW() - INTERVAL '48 days'),
(12, 28, 3, NOW() - INTERVAL '48 days', NOW() - INTERVAL '48 days');

-- Reservation 29 products (rejected)
INSERT INTO "public"."reservations_products" ("amount", "reservationId", "productId", "createdAt", "updatedAt") VALUES
(40, 29, 4, NOW() - INTERVAL '45 days', NOW() - INTERVAL '45 days');

-- Reservation 30-35 products
INSERT INTO "public"."reservations_products" ("amount", "reservationId", "productId", "createdAt", "updatedAt") VALUES
(10, 30, 1, NOW() - INTERVAL '42 days', NOW() - INTERVAL '42 days'),
(30, 30, 5, NOW() - INTERVAL '42 days', NOW() - INTERVAL '42 days'),
(5, 31, 36, NOW() - INTERVAL '38 days', NOW() - INTERVAL '38 days'),
(3, 31, 9, NOW() - INTERVAL '38 days', NOW() - INTERVAL '38 days'),
(8, 32, 40, NOW() - INTERVAL '35 days', NOW() - INTERVAL '35 days'),
(4, 32, 11, NOW() - INTERVAL '35 days', NOW() - INTERVAL '35 days');

-- Reservation 33-38 products (last month)
INSERT INTO "public"."reservations_products" ("amount", "reservationId", "productId", "createdAt", "updatedAt") VALUES
(12, 33, 1, NOW() - INTERVAL '28 days', NOW() - INTERVAL '28 days'),
(15, 33, 5, NOW() - INTERVAL '28 days', NOW() - INTERVAL '28 days'),
(6, 34, 21, NOW() - INTERVAL '25 days', NOW() - INTERVAL '25 days'),
(10, 34, 3, NOW() - INTERVAL '25 days', NOW() - INTERVAL '25 days'),
(4, 35, 10, NOW() - INTERVAL '22 days', NOW() - INTERVAL '22 days'),
(8, 35, 36, NOW() - INTERVAL '22 days', NOW() - INTERVAL '22 days'),
(5, 36, 7, NOW() - INTERVAL '18 days', NOW() - INTERVAL '18 days'),
(6, 36, 40, NOW() - INTERVAL '18 days', NOW() - INTERVAL '18 days'),
(20, 37, 5, NOW() - INTERVAL '15 days', NOW() - INTERVAL '15 days'),
(3, 37, 9, NOW() - INTERVAL '15 days', NOW() - INTERVAL '15 days'),
(10, 38, 1, NOW() - INTERVAL '12 days', NOW() - INTERVAL '12 days'),
(5, 38, 11, NOW() - INTERVAL '12 days', NOW() - INTERVAL '12 days');

-- Reservation 39 products (rejected)
INSERT INTO "public"."reservations_products" ("amount", "reservationId", "productId", "createdAt", "updatedAt") VALUES
(15, 39, 38, NOW() - INTERVAL '10 days', NOW() - INTERVAL '10 days');

-- Recent reservations products (current week)
INSERT INTO "public"."reservations_products" ("amount", "reservationId", "productId", "createdAt", "updatedAt") VALUES
(8, 40, 5, NOW() - INTERVAL '7 days', NOW() - INTERVAL '7 days'),
(4, 40, 36, NOW() - INTERVAL '7 days', NOW() - INTERVAL '7 days'),
(6, 41, 1, NOW() - INTERVAL '5 days', NOW() - INTERVAL '5 days'),
(10, 41, 3, NOW() - INTERVAL '5 days', NOW() - INTERVAL '5 days'),
(5, 42, 21, NOW() - INTERVAL '4 days', NOW() - INTERVAL '4 days'),
(8, 42, 40, NOW() - INTERVAL '4 days', NOW() - INTERVAL '4 days'),
(3, 43, 10, NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days'),
(12, 43, 5, NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days'),
(4, 44, 1, NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days'),
(6, 44, 7, NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days'),
(10, 45, 36, NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day'),
(5, 45, 9, NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day'),
(8, 46, 5, NOW(), NOW()),
(3, 46, 11, NOW(), NOW());
