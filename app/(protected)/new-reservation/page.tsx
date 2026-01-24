import { createClient } from "@/lib/supabase/server";
import { isRequester } from "@/repository/users-repository";
import { redirect } from "next/navigation";
import { NewReservationForm } from "./components/new-reservation-form";

export default async function NewReservationPage() {
  // Only requesters can access this page
  const userIsRequester = await isRequester();
  if (!userIsRequester) {
    redirect("/reservations");
  }

  const supabase = await createClient();

  // Get current authenticated user
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser?.email) {
    redirect("/login");
  }

  // Get user details from users table
  const { data: userData } = await supabase
    .from("users")
    .select("name, email")
    .eq("email", authUser.email)
    .single();

  const requesterName = userData?.name ?? "";

  // Format current date and time
  const currentDateTime = new Date().toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <h1 className="text-2xl font-bold">New Reservation</h1>
      <div className="flex justify-start">
        <div className="w-full max-w-4xl">
          <NewReservationForm
            requesterName={requesterName}
            currentDateTime={currentDateTime}
          />
        </div>
      </div>
    </div>
  );
}
