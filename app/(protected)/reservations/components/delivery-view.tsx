"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  ReservationWithProducts,
  markReservationAvailable,
  rejectReservation,
} from "@/repository/reservation-repository";

interface DeliveryViewProps {
  readonly reservation: ReservationWithProducts;
}

export function DeliveryView({ reservation }: DeliveryViewProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    type: "available" | "reject" | null;
  }>({ open: false, type: null });

  const handleMarkAvailable = async () => {
    setIsLoading(true);
    try {
      await markReservationAvailable(reservation.id);
      toast.success("Reservation marked as available");
      router.push("/reservations");
    } catch {
      toast.error("Failed to mark reservation as available");
    } finally {
      setIsLoading(false);
      setConfirmDialog({ open: false, type: null });
    }
  };

  const handleReject = async () => {
    setIsLoading(true);
    try {
      await rejectReservation(reservation.id);
      toast.success("Reservation rejected successfully");
      router.push("/reservations");
    } catch {
      toast.error("Failed to reject reservation");
    } finally {
      setIsLoading(false);
      setConfirmDialog({ open: false, type: null });
    }
  };

  return (
    <>
      <div className="flex flex-col gap-6">
        {/* Reservation Info Card */}
        <Card>
          <CardHeader>
            <CardTitle>Requester Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">{reservation.requesterUser?.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{reservation.requesterUser?.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Created At</p>
                <p className="font-medium">
                  {new Date(reservation.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Products Table */}
        <Card>
          <CardHeader>
            <CardTitle>Items to Prepare</CardTitle>
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
                      <TableCell className="text-right font-medium">
                        {item.amount}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => router.push("/reservations")}
            disabled={isLoading}
          >
            Back
          </Button>
          <div className="flex gap-2">
            <Button
              variant="destructive"
              onClick={() => setConfirmDialog({ open: true, type: "reject" })}
              disabled={isLoading}
            >
              Reject
            </Button>
            <Button
              onClick={() => setConfirmDialog({ open: true, type: "available" })}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Mark Available"}
            </Button>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <AlertDialog
        open={confirmDialog.open}
        onOpenChange={(open) => !open && setConfirmDialog({ open: false, type: null })}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {confirmDialog.type === "reject"
                ? "Reject Reservation"
                : "Mark as Available"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {confirmDialog.type === "reject"
                ? "Are you sure you want to reject this reservation? The reserved items will be restored to stock."
                : "Are you sure you want to mark this reservation as available? The requester will be notified that items are ready for pickup."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={
                confirmDialog.type === "reject" ? handleReject : handleMarkAvailable
              }
              disabled={isLoading}
              className={
                confirmDialog.type === "reject"
                  ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  : ""
              }
            >
              {isLoading
                ? "Processing..."
                : confirmDialog.type === "reject"
                  ? "Reject"
                  : "Mark Available"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
