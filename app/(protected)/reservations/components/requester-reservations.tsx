"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  getReservationsByRequesterUserId,
  ReservationWithItemCount,
} from "@/repository/reservation-repository";
import { getCurrentUser } from "@/repository/users-repository";
import { getStatusVariant } from "@/utils/reservations-utils";

export default function RequesterReservations() {
  const router = useRouter();
  const [reservations, setReservations] = useState<ReservationWithItemCount[]>(
    []
  );

  useEffect(() => {
    const fetchReservations = async () => {
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        return;
      }
      const reservations = await getReservationsByRequesterUserId(
        currentUser.id
      );
      setReservations(reservations);
    };
    fetchReservations();
  }, []);

  return (
    <Table>
      <TableCaption>A list of your reservations.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Items</TableHead>
          <TableHead>Manager</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead className="w-[100px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reservations.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={6}
              className="text-center text-muted-foreground"
            >
              No reservations found.
            </TableCell>
          </TableRow>
        ) : (
          reservations.map((reservation) => (
            <TableRow key={reservation.id}>
              <TableCell className="font-medium">{reservation.id}</TableCell>
              <TableCell>
                <Badge variant={getStatusVariant(reservation.status)}>
                  {reservation.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                {reservation.totalQuantity}
              </TableCell>
              <TableCell>{reservation.managerUser?.name || "-"}</TableCell>
              <TableCell>
                {new Date(reservation.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push(`/reservations/${reservation.id}`)}
                >
                  Details
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
