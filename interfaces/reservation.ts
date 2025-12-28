/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Database } from "@/lib/supabase/supabase";
import { User } from "./user";

type ReservationRowType = Database["public"]["Tables"]["reservation"]["Row"];
type ReservationInsertType = Database["public"]["Tables"]["reservation"]["Insert"];

export interface Reservation extends ReservationRowType {
  requestUser: User;
  managerUser: User;
}

export interface ReservationInsert extends ReservationInsertType {}
