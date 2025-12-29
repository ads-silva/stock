"use server";

import { Product } from "@/interfaces/product";
import { createClient } from "@/lib/supabase/server";

/**
 * Fetches all products from the database.
 * 
 * @returns Promise resolving to an array of products
 * @throws Error if the database query fails
 */
export async function getAllProducts(): Promise<Product[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch products: ${error.message}`);
  }
  if (!data) {
    return [];
  }

  return data;
}

