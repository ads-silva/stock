/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Database } from "@/lib/supabase/supabase";

type UserRowType = Database["public"]["Tables"]["users"]["Row"];
type UserInsertType = Database["public"]["Tables"]["users"]["Insert"];

export interface User extends UserRowType {}

export interface UserInsert extends UserInsertType {}
