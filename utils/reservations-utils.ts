/**
 * Determines the badge variant based on reservation status
 *
 * @param status - The status of the reservation
 * @returns The badge variant
 */
export function getStatusVariant(
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