"use server";

import { Reservation } from "@/interfaces/reservation";
import { createClient } from "@/lib/supabase/server";

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
 * @returns Promise resolving to an array of reservations
 * @throws Error if the database query fails
 */
export async function getReservationsByRequesterUserId(
  requesterUserId: number
): Promise<Reservation[]> {
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
      )
    `
    )
    .eq("requesterUserId", requesterUserId)
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
