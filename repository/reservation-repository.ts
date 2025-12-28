"use server";

import { Reservation } from "@/interfaces/reservation";
import { createClient } from "@/lib/supabase/server";

/**
 * Fetches all reservations from the database with joined user information.
 * Includes the name and email of the requesting user and the current manager.
 *
 * @returns Promise resolving to an array of reservations with user data
 * @throws Error if the database query fails
 */
export async function getAllReservationsWithUsers(): Promise<Reservation[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("reservation")
    .select(
      `
      *,
      requestUser:users!reservation_requestUserId_fkey (
        id,
        name,
        email
      ),
      managerUser:users!reservation_managerUserId_fkey (
        id,
        name,
        email
      )
    `
    )
    .order("createdAt", { ascending: false })
    .overrideTypes<Reservation[],{ merge: false }>();

  if (error) {
    throw new Error(`Failed to fetch reservations: ${error.message}`);
  }
  if (!data) {
    return [];
  }

  return data;
}
