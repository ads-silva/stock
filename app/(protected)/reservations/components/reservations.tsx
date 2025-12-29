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
import { getAllReservationsWithUsers } from "@/repository/reservation-repository";
import { useEffect, useState } from "react";

/**
 * Determines the badge variant based on reservation status
 */
function getStatusVariant(
  status: string
): "default" | "secondary" | "destructive" {
  if (status === "rejected") {
    return "destructive";
  }
  if (status === "completed" || status === "available") {
    return "default";
  }
  return "secondary";
}

export default function Reservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    const fetchReservations = async () => {
      const reservations = await getAllReservationsWithUsers();
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
          <TableHead>Reason</TableHead>
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
              <TableCell>{reservation.requestUser.name}</TableCell>
              <TableCell>{reservation.managerUser?.name || "-"}</TableCell>
              <TableCell>{reservation.reason || "-"}</TableCell>
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
