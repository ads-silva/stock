import { isManager, isRequester } from "@/repository/users-repository";
import { redirect } from "next/navigation";
import ManagerReservations from "./components/manager-reservations";
import RequesterReservations from "./components/requester-reservations";

export default async function ReservationsPage() {
  const userIsManager = await isManager();
  const userIsRequester = await isRequester();

  if (!userIsManager && !userIsRequester) {
    redirect("/login");
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <h1 className="text-2xl font-bold">Reservations</h1>
      {userIsManager ? <ManagerReservations /> : <RequesterReservations />}
    </div>
  );
}
