"use server";

import { Product } from "@/interfaces/product";
import { Reservation } from "@/interfaces/reservation";
import { createClient } from "@/lib/supabase/server";
import { decrementProductAmounts, incrementProductAmounts } from "./product-repository";
import { getCurrentUser } from "./users-repository";

export interface CreateReservationInput {
  items: { productId: number; amount: number }[];
}

export interface ReservationWithProducts extends Reservation {
  reservations_products: {
    id: number;
    amount: number | null;
    productId: number;
    product: Product;
  }[];
}

export interface ReservationWithItemCount extends Reservation {
  itemsCount: number;
  totalQuantity: number;
}

/**
 * Fetches all reservations from the database with joined user information.
 * Includes the name and email of the requester user and the current manager.
 *
 * @returns Promise resolving to an array of reservations with user data
 * @throws Error if the database query fails
 */
export async function getAllReservationsWithUsers(): Promise<Reservation[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("reservations")
    .select(
      `
      *,
      requesterUser:users!reservations_requesterUserId_fkey (
        id,
        name,
        email
      ),
      managerUser:users!reservations_managerUserId_fkey (
        id,
        name,
        email
      )
    `
    )
    .order("createdAt", { ascending: false })
    .overrideTypes<Reservation[], { merge: false }>();

  if (error) {
    throw new Error(`Failed to fetch reservations: ${error.message}`);
  }
  if (!data) {
    return [];
  }

  return data;
}

/**
 * Fetches all reservations for a given requester user email.
 *
 * @param requesterUserId - The ID of the requester user
 * @returns Promise resolving to an array of reservations with item counts
 * @throws Error if the database query fails
 */
export async function getReservationsByRequesterUserId(
  requesterUserId: number
): Promise<ReservationWithItemCount[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("reservations")
    .select(
      `
      *,
      managerUser:users!reservations_managerUserId_fkey (
        id,
        name,
        email
      ),
      reservations_products (
        amount
      )
    `
    )
    .eq("requesterUserId", requesterUserId)
    .order("createdAt", { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch reservations: ${error.message}`);
  }
  if (!data) {
    return [];
  }

  // Calculate items count and total quantity for each reservation
  return data.map((reservation) => {
    const products = reservation.reservations_products || [];
    const { reservations_products: _rp, ...rest } = reservation;
    return {
      ...rest,
      requesterUser: null as unknown as Reservation["requesterUser"],
      managerUser: reservation.managerUser as Reservation["managerUser"],
      itemsCount: products.length,
      totalQuantity: products.reduce((sum, p) => sum + (p.amount || 0), 0),
    };
  }) as ReservationWithItemCount[];
}

/**
 * Creates a new reservation with products and decrements product stock.
 *
 * @param input - The reservation data with items
 * @returns The created reservation ID
 * @throws Error if creation fails
 */
export async function createReservation(
  input: CreateReservationInput
): Promise<number> {
  const supabase = await createClient();
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error("User not authenticated");
  }

  // Create the reservation
  const { data: reservation, error: reservationError } = await supabase
    .from("reservations")
    .insert({
      status: "pending",
      requesterUserId: currentUser.id,
      createdUserId: currentUser.id,
    })
    .select("id")
    .single();

  if (reservationError) {
    throw new Error(`Failed to create reservation: ${reservationError.message}`);
  }

  // Insert reservation products
  const reservationProducts = input.items.map((item) => ({
    reservationId: reservation.id,
    productId: item.productId,
    amount: item.amount,
  }));

  const { error: productsError } = await supabase
    .from("reservations_products")
    .insert(reservationProducts);

  if (productsError) {
    throw new Error(`Failed to add products to reservation: ${productsError.message}`);
  }

  // Decrement product amounts
  await decrementProductAmounts(input.items);

  return reservation.id;
}

/**
 * Gets a reservation by ID with user information.
 *
 * @param id - The reservation ID
 * @returns The reservation or null if not found
 */
export async function getReservationById(id: number): Promise<Reservation | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("reservations")
    .select(
      `
      *,
      requesterUser:users!reservations_requesterUserId_fkey (
        id,
        name,
        email
      ),
      managerUser:users!reservations_managerUserId_fkey (
        id,
        name,
        email
      )
    `
    )
    .eq("id", id)
    .single()
    .overrideTypes<Reservation, { merge: false }>();

  if (error) {
    return null;
  }

  return data;
}

/**
 * Gets a reservation with its products.
 *
 * @param id - The reservation ID
 * @returns The reservation with products or null if not found
 */
export async function getReservationWithProducts(
  id: number
): Promise<ReservationWithProducts | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("reservations")
    .select(
      `
      *,
      requesterUser:users!reservations_requesterUserId_fkey (
        id,
        name,
        email
      ),
      managerUser:users!reservations_managerUserId_fkey (
        id,
        name,
        email
      ),
      reservations_products (
        id,
        amount,
        productId,
        product:products (*)
      )
    `
    )
    .eq("id", id)
    .single()
    .overrideTypes<ReservationWithProducts, { merge: false }>();

  if (error) {
    return null;
  }

  return data;
}

/**
 * Gets reservations filtered by status (for manager tabs).
 *
 * @param status - The status to filter by
 * @returns Array of reservations with the given status and item counts
 */
export async function getReservationsByStatus(
  status: string
): Promise<ReservationWithItemCount[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("reservations")
    .select(
      `
      *,
      requesterUser:users!reservations_requesterUserId_fkey (
        id,
        name,
        email
      ),
      managerUser:users!reservations_managerUserId_fkey (
        id,
        name,
        email
      ),
      reservations_products (
        amount
      )
    `
    )
    .eq("status", status)
    .order("createdAt", { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch reservations: ${error.message}`);
  }

  if (!data) {
    return [];
  }

  // Calculate items count and total quantity for each reservation
  return data.map((reservation) => {
    const products = reservation.reservations_products || [];
    const { reservations_products: _rp, ...rest } = reservation;
    return {
      ...rest,
      requesterUser: reservation.requesterUser as Reservation["requesterUser"],
      managerUser: reservation.managerUser as Reservation["managerUser"],
      itemsCount: products.length,
      totalQuantity: products.reduce((sum, p) => sum + (p.amount || 0), 0),
    };
  }) as ReservationWithItemCount[];
}

/**
 * Updates a reservation's status.
 *
 * @param id - The reservation ID
 * @param status - The new status
 * @throws Error if update fails
 */
export async function updateReservationStatus(
  id: number,
  status: string
): Promise<void> {
  const supabase = await createClient();
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error("User not authenticated");
  }

  const { error } = await supabase
    .from("reservations")
    .update({
      status,
      managerUserId: currentUser.id,
      updatedUserId: currentUser.id,
    })
    .eq("id", id);

  if (error) {
    throw new Error(`Failed to update reservation: ${error.message}`);
  }
}

/**
 * Rejects a reservation and restores product amounts.
 *
 * @param id - The reservation ID
 * @throws Error if rejection fails
 */
export async function rejectReservation(id: number): Promise<void> {
  const supabase = await createClient();

  // Get reservation products to restore amounts
  const { data: reservationProducts, error: fetchError } = await supabase
    .from("reservations_products")
    .select("productId, amount")
    .eq("reservationId", id);

  if (fetchError) {
    throw new Error(`Failed to fetch reservation products: ${fetchError.message}`);
  }

  // Restore product amounts
  const itemsToRestore = reservationProducts
    .filter((rp) => rp.amount !== null)
    .map((rp) => ({
      productId: rp.productId,
      amount: rp.amount as number,
    }));

  await incrementProductAmounts(itemsToRestore);

  // Update reservation status
  await updateReservationStatus(id, "rejected");
}

/**
 * Marks a reservation as available (items are ready for pickup).
 *
 * @param id - The reservation ID
 * @throws Error if update fails
 */
export async function markReservationAvailable(id: number): Promise<void> {
  await updateReservationStatus(id, "available");
}

/**
 * Marks a reservation as completed (items delivered).
 *
 * @param id - The reservation ID
 * @throws Error if update fails
 */
export async function deliverReservation(id: number): Promise<void> {
  await updateReservationStatus(id, "completed");
}
