/**
 * Status color configuration for reservation statuses
 * Used across the application for consistent styling
 */
export const statusColors = {
  pending: {
    bg: "bg-amber-100 dark:bg-amber-950",
    text: "text-amber-700 dark:text-amber-300",
    border: "border-amber-200 dark:border-amber-800",
  },
  available: {
    bg: "bg-blue-100 dark:bg-blue-950",
    text: "text-blue-700 dark:text-blue-300",
    border: "border-blue-200 dark:border-blue-800",
  },
  completed: {
    bg: "bg-green-100 dark:bg-green-950",
    text: "text-green-700 dark:text-green-300",
    border: "border-green-200 dark:border-green-800",
  },
  rejected: {
    bg: "bg-red-100 dark:bg-red-950",
    text: "text-red-700 dark:text-red-300",
    border: "border-red-200 dark:border-red-800",
  },
} as const;

export type ReservationStatus = keyof typeof statusColors;

/**
 * Gets the CSS classes for a status badge
 *
 * @param status - The status of the reservation
 * @returns The CSS classes for the badge
 */
export function getStatusClasses(status: string): string {
  const colors = statusColors[status as ReservationStatus];
  if (!colors) {
    return "bg-gray-100 text-gray-700 border-gray-200";
  }
  return `${colors.bg} ${colors.text} ${colors.border}`;
}

/**
 * Gets the formatted label for a status
 *
 * @param status - The status of the reservation
 * @returns The formatted status label
 */
export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    pending: "Pending",
    available: "Available",
    completed: "Completed",
    rejected: "Rejected",
  };
  return labels[status] || status;
}
