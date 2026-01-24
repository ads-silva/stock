"use client";

import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ReservationWithProducts } from "@/repository/reservation-repository";
import { getStatusVariant } from "@/utils/reservations-utils";

interface ReservationDetailsProps {
  readonly reservation: ReservationWithProducts;
}

export function ReservationDetails({ reservation }: ReservationDetailsProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-6">
      {/* Reservation Info Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Reservation #{reservation.id}</CardTitle>
            <Badge variant={getStatusVariant(reservation.status)}>
              {reservation.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Requester</p>
              <p className="font-medium">{reservation.requesterUser?.name}</p>
              <p className="text-sm text-muted-foreground">
                {reservation.requesterUser?.email}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Manager</p>
              {reservation.managerUser ? (
                <>
                  <p className="font-medium">{reservation.managerUser.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {reservation.managerUser.email}
                  </p>
                </>
              ) : (
                <p className="text-muted-foreground">Not assigned</p>
              )}
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Created At</p>
              <p className="font-medium">
                {new Date(reservation.createdAt).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Last Updated</p>
              <p className="font-medium">
                {new Date(reservation.updatedAt).toLocaleString()}
              </p>
            </div>
            {reservation.managerComment && (
              <div className="col-span-2">
                <p className="text-sm text-muted-foreground">Manager Comment</p>
                <p className="font-medium">{reservation.managerComment}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Requested Items</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Requested Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reservation.reservations_products.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="text-center text-muted-foreground"
                  >
                    No items in this reservation.
                  </TableCell>
                </TableRow>
              ) : (
                reservation.reservations_products.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">
                      {item.product.name}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {item.product.description || "-"}
                    </TableCell>
                    <TableCell className="text-right">{item.amount}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Back Button */}
      <div className="flex justify-start">
        <Button variant="outline" onClick={() => router.push("/reservations")}>
          Back to Reservations
        </Button>
      </div>
    </div>
  );
}
