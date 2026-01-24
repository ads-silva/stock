import { getReservationWithProducts } from "@/repository/reservation-repository";
import { getCurrentUser, isManager } from "@/repository/users-repository";
import { notFound, redirect } from "next/navigation";
import { DeliveryView } from "../../components/delivery-view";

interface DeliveryPageProps {
  params: Promise<{ id: string }>;
}

export default async function DeliveryPage({ params }: DeliveryPageProps) {
  const { id } = await params;
  const reservationId = parseInt(id, 10);

  if (isNaN(reservationId)) {
    notFound();
  }

  // Only managers can access this page
  const isUserManager = await isManager();
  if (!isUserManager) {
    redirect("/reservations");
  }

  const currentUser = await getCurrentUser();
  if (!currentUser) {
    redirect("/login");
  }

  const reservation = await getReservationWithProducts(reservationId);
  if (!reservation) {
    notFound();
  }

  // Only pending reservations can be processed
  if (reservation.status !== "pending") {
    redirect("/reservations");
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <h1 className="text-2xl font-bold">Delivery - Reservation #{reservation.id}</h1>
      <DeliveryView reservation={reservation} />
    </div>
  );
}
