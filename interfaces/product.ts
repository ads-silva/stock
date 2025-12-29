/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Database } from "@/lib/supabase/supabase";

type ProductRowType = Database["public"]["Tables"]["products"]["Row"];
type ProductInsertType = Database["public"]["Tables"]["products"]["Insert"];

export interface Product extends ProductRowType {}

export interface ProductInsert extends ProductInsertType {}
