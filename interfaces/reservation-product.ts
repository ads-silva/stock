/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Database } from "@/lib/supabase/supabase";
import { Product } from "./product";
import { Reservation } from "./reservation";

type ReservationProductRowType = Database["public"]["Tables"]["reservations_products"]["Row"];
type ReservationProductInsertType = Database["public"]["Tables"]["reservations_products"]["Insert"];

export interface ReservationProduct extends ReservationProductRowType {
  products: Product[];
  reservation: Reservation;
}

export interface ReservationProductInsert extends ReservationProductInsertType {}
