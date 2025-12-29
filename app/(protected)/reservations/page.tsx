import ManagerReservations from "./components/manager-reservations";

export default async function ReservationsPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <h1 className="text-2xl font-bold">Reservations</h1>
      <ManagerReservations />
    </div>
  );
}
