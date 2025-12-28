/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Database } from "@/lib/supabase/supabase";

type ProductRowType = Database["public"]["Tables"]["product"]["Row"];
type ProductInsertType = Database["public"]["Tables"]["product"]["Insert"];

export interface Product extends ProductRowType {}

export interface ProductInsert extends ProductInsertType {}
