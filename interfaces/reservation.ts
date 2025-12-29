/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Database } from "@/lib/supabase/supabase";
import { User } from "./user";

type ReservationRowType = Database["public"]["Tables"]["reservations"]["Row"];
type ReservationInsertType = Database["public"]["Tables"]["reservations"]["Insert"];

export interface Reservation extends ReservationRowType {
  requesterUser: User;
  managerUser: User;
}

export interface ReservationInsert extends ReservationInsertType {}
