"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Product } from "@/interfaces/product";
import { createReservation } from "@/repository/reservation-repository";
import { AddProductModal } from "./add-product-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface SelectedProduct {
  product: Product;
  quantity: number;
}

interface NewReservationFormProps {
  requesterName: string;
  currentDateTime: string;
}

/**
 * Form component for creating a new reservation.
 * Manages product selection and displays them in a table.
 */
export function NewReservationForm({
  requesterName,
  currentDateTime,
}: NewReservationFormProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedProducts, setSelectedProducts] = React.useState<
    SelectedProduct[]
  >([]);

  const handleAddProduct = (product: Product, quantity: number) => {
    setSelectedProducts((prev) => {
      // Check if product already exists
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id
      );
      if (existingIndex >= 0) {
        // Update quantity if product already exists
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      }
      // Add new product
      return [...prev, { product, quantity }];
    });
  };

  const handleRemoveProduct = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.filter((item) => String(item.product.id) !== productId)
    );
  };

  const handleSendRequest = async () => {
    if (selectedProducts.length === 0) return;

    setIsLoading(true);
    try {
      await createReservation({
        items: selectedProducts.map((item) => ({
          productId: item.product.id,
          amount: item.quantity,
        })),
      });
      toast.success("Reservation created successfully");
      setSelectedProducts([]);
      router.push("/reservations");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to create reservation"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const selectedProductIds = selectedProducts.map((item) =>
    String(item.product.id)
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Request Information */}
      <div className="flex items-end justify-between gap-4 border-b pb-4">
        <div className="space-y-2 flex-1">
          <Label htmlFor="requester-name">Requester Name</Label>
          <Input
            id="requester-name"
            readOnly
            value={requesterName}
            className="bg-muted"
          />
        </div>
        <div className="space-y-2 text-right flex-1">
          <Label>Current Date and Time</Label>
          <p className="text-sm text-muted-foreground font-medium">
            {currentDateTime}
          </p>
        </div>
      </div>

      {/* Products Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Products</h2>
          <Button
            onClick={() => setIsModalOpen(true)}
            variant="outline"
            type="button"
          >
            Add Product
          </Button>
        </div>

        {selectedProducts.length === 0 ? (
          <div className="border rounded-lg p-8 text-center text-muted-foreground">
            No products added yet. Click &quot;Add Product&quot; to get started.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead className="w-[100px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedProducts.map((item) => (
                <TableRow key={item.product.id}>
                  <TableCell className="font-medium">
                    {item.product.name}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {item.product.description || "-"}
                  </TableCell>
                  <TableCell className="text-right">{item.quantity}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        handleRemoveProduct(String(item.product.id))
                      }
                      type="button"
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Send Request Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSendRequest}
          disabled={selectedProducts.length === 0 || isLoading}
          type="button"
        >
          {isLoading ? "Saving..." : "Save"}
        </Button>
      </div>

      {/* Add Product Modal */}
      {isModalOpen && (
        <AddProductModal
          onClose={() => setIsModalOpen(false)}
          onAdd={handleAddProduct}
          selectedProductIds={selectedProductIds}
        />
      )}
    </div>
  );
}
