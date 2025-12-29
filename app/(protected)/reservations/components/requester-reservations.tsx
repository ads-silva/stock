"use client";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Reservation } from "@/interfaces/reservation";
import { getReservationsByRequesterUserId } from "@/repository/reservation-repository";
import { getCurrentUser } from "@/repository/users-repository";
import { getStatusVariant } from "@/utils/reservations-utils";
import { useEffect, useState } from "react";

export default function RequesterReservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);

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
      <TableCaption>A list of all reservations.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Requested By</TableHead>
          <TableHead>Manager</TableHead>
          <TableHead>Created At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reservations.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={7}
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
              <TableCell>{reservation.requesterUser.name}</TableCell>
              <TableCell>{reservation.managerUser?.name || "-"}</TableCell>
              <TableCell>
                {new Date(reservation.createdAt).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
