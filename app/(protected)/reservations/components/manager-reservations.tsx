"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  getReservationsByStatus,
  rejectReservation,
  deliverReservation,
  ReservationWithItemCount,
} from "@/repository/reservation-repository";
import { getStatusClasses, getStatusLabel } from "@/utils/reservations-utils";

type TabStatus = "pending" | "available" | "rejected" | "completed";

interface ConfirmDialogState {
  open: boolean;
  type: "reject" | "deliver" | null;
  reservationId: number | null;
}

export default function ManagerReservations() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabStatus>("pending");
  const [reservations, setReservations] = useState<ReservationWithItemCount[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialogState>({
    open: false,
    type: null,
    reservationId: null,
  });

  const fetchReservations = async (status: TabStatus) => {
    setIsLoading(true);
    try {
      const data = await getReservationsByStatus(status);
      setReservations(data);
    } catch {
      toast.error("Failed to fetch reservations");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations(activeTab);
  }, [activeTab]);

  const handleTabChange = (value: string) => {
    setActiveTab(value as TabStatus);
  };

  const handleReject = async () => {
    if (!confirmDialog.reservationId) return;

    try {
      await rejectReservation(confirmDialog.reservationId);
      toast.success("Reservation rejected successfully");
      fetchReservations(activeTab);
    } catch {
      toast.error("Failed to reject reservation");
    } finally {
      setConfirmDialog({ open: false, type: null, reservationId: null });
    }
  };

  const handleDeliver = async () => {
    if (!confirmDialog.reservationId) return;

    try {
      await deliverReservation(confirmDialog.reservationId);
      toast.success("Items delivered successfully");
      fetchReservations(activeTab);
    } catch {
      toast.error("Failed to deliver items");
    } finally {
      setConfirmDialog({ open: false, type: null, reservationId: null });
    }
  };

  const openRejectDialog = (reservationId: number) => {
    setConfirmDialog({ open: true, type: "reject", reservationId });
  };

  const openDeliverDialog = (reservationId: number) => {
    setConfirmDialog({ open: true, type: "deliver", reservationId });
  };

  const renderActions = (reservation: ReservationWithItemCount) => {
    switch (activeTab) {
      case "pending":
        return (
          <div className="flex gap-2">
            <Button
              variant="default"
              size="sm"
              onClick={() => router.push(`/reservations/${reservation.id}/delivery`)}
            >
              Delivery
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => openRejectDialog(reservation.id)}
            >
              Reject
            </Button>
          </div>
        );
      case "available":
        return (
          <div className="flex gap-2">
            <Button
              variant="default"
              size="sm"
              onClick={() => openDeliverDialog(reservation.id)}
            >
              Deliver Items
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => openRejectDialog(reservation.id)}
            >
              Reject
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  const hasActions = activeTab === "pending" || activeTab === "available";
  const colSpan = hasActions ? 5 : 4;

  const renderTableBody = () => {
    if (isLoading) {
      return (
        <TableRow>
          <TableCell colSpan={colSpan} className="text-center text-muted-foreground">
            Loading...
          </TableCell>
        </TableRow>
      );
    }

    if (reservations.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={colSpan} className="text-center text-muted-foreground">
            No {activeTab} reservations found.
          </TableCell>
        </TableRow>
      );
    }

    return reservations.map((reservation) => (
      <TableRow key={reservation.id}>
        <TableCell className="font-medium">{reservation.id}</TableCell>
        <TableCell>{reservation.requesterUser?.name || "-"}</TableCell>
        <TableCell className="text-right">{reservation.itemsCount}</TableCell>
        <TableCell>
          {new Date(reservation.createdAt).toLocaleDateString()}
        </TableCell>
        {hasActions && <TableCell>{renderActions(reservation)}</TableCell>}
      </TableRow>
    ));
  };

  const renderTable = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Requested By</TableHead>
          <TableHead className="text-right">Items</TableHead>
          <TableHead>Created At</TableHead>
          {hasActions && <TableHead className="w-[200px]">Actions</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>{renderTableBody()}</TableBody>
    </Table>
  );

  return (
    <>
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList>
          <TabsTrigger value="pending">
            <Badge variant="outline" className={`mr-1 ${getStatusClasses("pending")}`}>
              {getStatusLabel("pending")}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="available">
            <Badge variant="outline" className={`mr-1 ${getStatusClasses("available")}`}>
              {getStatusLabel("available")}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="rejected">
            <Badge variant="outline" className={`mr-1 ${getStatusClasses("rejected")}`}>
              {getStatusLabel("rejected")}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="completed">
            <Badge variant="outline" className={`mr-1 ${getStatusClasses("completed")}`}>
              {getStatusLabel("completed")}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending">{renderTable()}</TabsContent>
        <TabsContent value="available">{renderTable()}</TabsContent>
        <TabsContent value="rejected">{renderTable()}</TabsContent>
        <TabsContent value="completed">{renderTable()}</TabsContent>
      </Tabs>

      {/* Confirmation Dialog */}
      <AlertDialog
        open={confirmDialog.open}
        onOpenChange={(open) =>
          !open && setConfirmDialog({ open: false, type: null, reservationId: null })
        }
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {confirmDialog.type === "reject"
                ? "Reject Reservation"
                : "Deliver Items"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {confirmDialog.type === "reject"
                ? "Are you sure you want to reject this reservation? The reserved items will be restored to stock."
                : "Are you sure you want to mark this reservation as delivered? This action cannot be undone."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDialog.type === "reject" ? handleReject : handleDeliver}
              className={
                confirmDialog.type === "reject"
                  ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  : ""
              }
            >
              {confirmDialog.type === "reject" ? "Reject" : "Deliver"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
