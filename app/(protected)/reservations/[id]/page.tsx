import { getReservationWithProducts } from "@/repository/reservation-repository";
import { getCurrentUser } from "@/repository/users-repository";
import { notFound, redirect } from "next/navigation";
import { ReservationDetails } from "../components/reservation-details";

interface ReservationDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function ReservationDetailsPage({
  params,
}: ReservationDetailsPageProps) {
  const { id } = await params;
  const reservationId = parseInt(id, 10);

  if (isNaN(reservationId)) {
    notFound();
  }

  const currentUser = await getCurrentUser();
  if (!currentUser) {
    redirect("/login");
  }

  const reservation = await getReservationWithProducts(reservationId);
  if (!reservation) {
    notFound();
  }

  // Requesters can only view their own reservations
  if (
    currentUser.role === "reservation_requester" &&
    reservation.requesterUserId !== currentUser.id
  ) {
    notFound();
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <h1 className="text-2xl font-bold">Reservation Details</h1>
      <ReservationDetails reservation={reservation} />
    </div>
  );
}
