import Reservations from "./components/reservations";

export default async function ReservationsPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <Reservations />
    </div>
  );
}
