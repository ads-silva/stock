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

/**
 * Decrements product amounts when a reservation is created.
 * Each item in the array will have its amount subtracted from the product's stock.
 *
 * @param items - Array of {productId, amount} to decrement
 * @throws Error if any product update fails
 */
export async function decrementProductAmounts(
  items: { productId: number; amount: number }[]
): Promise<void> {
  const supabase = await createClient();

  for (const item of items) {
    const { data: product, error: fetchError } = await supabase
      .from("products")
      .select("amount")
      .eq("id", item.productId)
      .single();

    if (fetchError) {
      throw new Error(`Failed to fetch product ${item.productId}: ${fetchError.message}`);
    }

    const currentAmount = product?.amount ?? 0;
    const newAmount = currentAmount - item.amount;

    if (newAmount < 0) {
      throw new Error(`Insufficient stock for product ${item.productId}`);
    }

    const { error: updateError } = await supabase
      .from("products")
      .update({ amount: newAmount })
      .eq("id", item.productId);

    if (updateError) {
      throw new Error(`Failed to update product ${item.productId}: ${updateError.message}`);
    }
  }
}

/**
 * Increments product amounts when a reservation is rejected.
 * Restores the stock that was previously reserved.
 *
 * @param items - Array of {productId, amount} to increment
 * @throws Error if any product update fails
 */
export async function incrementProductAmounts(
  items: { productId: number; amount: number }[]
): Promise<void> {
  const supabase = await createClient();

  for (const item of items) {
    const { data: product, error: fetchError } = await supabase
      .from("products")
      .select("amount")
      .eq("id", item.productId)
      .single();

    if (fetchError) {
      throw new Error(`Failed to fetch product ${item.productId}: ${fetchError.message}`);
    }

    const currentAmount = product?.amount ?? 0;
    const newAmount = currentAmount + item.amount;

    const { error: updateError } = await supabase
      .from("products")
      .update({ amount: newAmount })
      .eq("id", item.productId);

    if (updateError) {
      throw new Error(`Failed to update product ${item.productId}: ${updateError.message}`);
    }
  }
}

