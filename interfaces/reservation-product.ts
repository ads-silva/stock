/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Database } from "@/lib/supabase/supabase";
import { Product } from "./product";
import { Reservation } from "./reservation";

type ReservationProductRowType = Database["public"]["Tables"]["reservation_product"]["Row"];
type ReservationProductInsertType = Database["public"]["Tables"]["reservation_product"]["Insert"];

export interface ReservationProduct extends ReservationProductRowType {
  product: Product[];
  reservation: Reservation;
}

export interface ReservationProductInsert extends ReservationProductInsertType {}
