"use server";

import { User } from "@/interfaces/user";
import { createClient } from "@/lib/supabase/server";

/**
 * Fetches a user by their email address from the database.
 *
 * @param email - The email address of the user to fetch
 * @returns Promise resolving to the user object
 * @throws Error if the database query fails
 */
export async function getUserByEmail(email: string): Promise<User | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();
  if (error) {
    throw new Error(`Failed to fetch user: ${error.message}`);
  }
  return data;
}

/**
 * Fetches the current user from the database.
 *
 * @returns Promise resolving to the user object
 * @throws Error if the database query fails
 */
export async function getCurrentUser(): Promise<User | null> {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims;
  if (!claims?.email) {
    return null;
  }
  const user = await getUserByEmail(claims.email);
  return user;
}
