"use client";

import * as React from "react";
import { Product } from "@/interfaces/product";
import { getAllProducts } from "@/repository/product-repository";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface AddProductModalProps {
  onClose: () => void;
  onAdd: (product: Product, quantity: number) => void;
  selectedProductIds?: string[];
}

/**
 * Modal component for adding products to a reservation.
 * Features a searchable combobox for product selection and quantity input with validation.
 */
export function AddProductModal({
  onClose,
  onAdd,
  selectedProductIds = [],
}: AddProductModalProps) {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(
    null,
  );
  const [quantity, setQuantity] = React.useState<string>("");
  const [quantityError, setQuantityError] = React.useState<string>("");

  // Fetch products when component mounts
  React.useEffect(() => {
    setIsLoading(true);
    getAllProducts()
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Failed to fetch products:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // Reset form state
  const resetForm = React.useCallback(() => {
    setSelectedProduct(null);
    setQuantity("");
    setQuantityError("");
  }, []);

  // Reset state when component unmounts
  React.useEffect(() => {
    return () => {
      resetForm();
    };
  }, [resetForm]);

  // Filter products - exclude already selected products
  // Show all products including those with 0 amount so users know they're out of stock
  // Command component handles search filtering internally
  const availableProducts = React.useMemo(() => {
    return products.filter((product) => {
      const productIdString = String(product.id);
      const notAlreadySelected = !selectedProductIds.includes(productIdString);
      return notAlreadySelected;
    });
  }, [products, selectedProductIds]);

  const handleQuantityChange = (value: string) => {
    // Only allow numbers
    const numericValue = value.replaceAll(/\D/g, "");
    setQuantity(numericValue);

    if (!selectedProduct) {
      setQuantityError("");
      return;
    }

    if (numericValue === "") {
      setQuantityError("");
      return;
    }

    const numValue = Number.parseInt(numericValue, 10);
    const productAmount = selectedProduct.amount ?? 0;
    if (numValue <= 0) {
      setQuantityError("Quantity must be greater than 0");
    } else if (productAmount === 0) {
      setQuantityError("This product is out of stock (0 units available).");
    } else if (numValue > productAmount) {
      setQuantityError(
        `Insufficient amount available. Only ${productAmount} units available.`,
      );
    } else {
      setQuantityError("");
    }
  };

  const handleAdd = () => {
    if (!selectedProduct) {
      return;
    }

    const numQuantity = Number.parseInt(quantity, 10);
    const productAmount = selectedProduct.amount ?? 0;
    if (numQuantity <= 0) {
      setQuantityError("Quantity must be greater than 0");
      return;
    }

    if (productAmount === 0) {
      setQuantityError("This product is out of stock (0 units available).");
      return;
    }

    if (numQuantity > productAmount) {
      setQuantityError(
        `Insufficient amount available. Only ${productAmount} units available.`,
      );
      return;
    }

    onAdd(selectedProduct, numQuantity);
    resetForm();
    onClose();
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const numQuantity = quantity ? Number.parseInt(quantity, 10) : 0;
  const canAdd =
    selectedProduct &&
    quantity &&
    !quantityError &&
    numQuantity > 0 &&
    (selectedProduct.amount ?? 0) > 0;

  return (
    <Dialog open={true} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
          <DialogDescription>
            Search and select a product to add to your reservation.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="product-search">Product</Label>
            <Command className="rounded-lg border" shouldFilter={true}>
              <CommandInput
                placeholder="Search products..."
                id="product-search"
              />
              <CommandList>
                {(() => {
                  if (isLoading) {
                    return (
                      <div className="py-6 text-center text-sm text-muted-foreground">
                        Loading products...
                      </div>
                    );
                  }
                  if (availableProducts.length === 0) {
                    return <CommandEmpty>No products found.</CommandEmpty>;
                  }
                  return (
                    <CommandGroup>
                      {availableProducts.map((product) => (
                      <CommandItem
                        key={product.id}
                        value={`${product.name} ${product.description || ""}`}
                        onSelect={() => {
                          setSelectedProduct(product);
                          setQuantity("");
                          setQuantityError("");
                        }}
                        className={cn(
                          "cursor-pointer",
                          selectedProduct?.id === product.id && "bg-accent",
                          (product.amount ?? 0) === 0 && "opacity-60",
                        )}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span>{product.name}</span>
                          {(() => {
                            const amount = product.amount ?? 0;
                            const isOutOfStock = amount === 0;
                            const amountClassName = isOutOfStock
                              ? "text-destructive font-medium"
                              : "text-muted-foreground";
                            return (
                              <span className={cn("text-xs ml-2", amountClassName)}>
                                ({amount} available)
                              </span>
                            );
                          })()}
                        </div>
                      </CommandItem>
                      ))}
                    </CommandGroup>
                  );
                })()}
              </CommandList>
            </Command>
            {selectedProduct && (
              <p className="text-sm text-muted-foreground mt-2">
                Selected: <span className="font-medium">{selectedProduct.name}</span>
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="text"
              inputMode="numeric"
              placeholder="Enter quantity"
              value={quantity}
              onChange={(e) => handleQuantityChange(e.target.value)}
              disabled={!selectedProduct}
              aria-invalid={!!quantityError}
            />
            {quantityError && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <span role="alert" aria-live="polite">
                  {quantityError}
                </span>
              </p>
            )}
            {selectedProduct &&
              !quantityError &&
              quantity &&
              (selectedProduct.amount ?? 0) > 0 && (
                <p className="text-sm text-muted-foreground">
                  {(selectedProduct.amount ?? 0) - Number.parseInt(quantity, 10)} units will remain
                </p>
              )}
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleClose}
            type="button"
          >
            Cancel
          </Button>
          <Button
            onClick={handleAdd}
            disabled={!canAdd}
            type="button"
          >
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

