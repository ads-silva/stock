"use server";

import { createClient } from "@/lib/supabase/server";

export interface DashboardStats {
  totalProducts: number;
  totalStock: number;
  totalReservations: number;
  pendingReservations: number;
  completedReservations: number;
  rejectedReservations: number;
  availableReservations: number;
}

export interface ReservationsByMonth {
  month: string;
  completed: number;
  pending: number;
  rejected: number;
  available: number;
}

export interface TopProduct {
  name: string;
  totalDelivered: number;
  fill: string;
}

export interface ReservationStatusDistribution {
  status: string;
  count: number;
  fill: string;
}

export interface ProductStockLevel {
  name: string;
  stock: number;
  fill: string;
}

export interface LowStockProduct {
  id: number;
  name: string;
  amount: number;
  price: number;
}

/**
 * Fetches dashboard statistics.
 */
export async function getDashboardStats(): Promise<DashboardStats> {
  const supabase = await createClient();

  // Get total products and stock
  const { data: products } = await supabase
    .from("products")
    .select("amount");

  const totalProducts = products?.length ?? 0;
  const totalStock = products?.reduce((sum, p) => sum + (p.amount || 0), 0) ?? 0;

  // Get reservation counts by status
  const { data: reservations } = await supabase
    .from("reservations")
    .select("status");

  const totalReservations = reservations?.length ?? 0;
  const pendingReservations = reservations?.filter(r => r.status === "pending").length ?? 0;
  const completedReservations = reservations?.filter(r => r.status === "completed").length ?? 0;
  const rejectedReservations = reservations?.filter(r => r.status === "rejected").length ?? 0;
  const availableReservations = reservations?.filter(r => r.status === "available").length ?? 0;

  return {
    totalProducts,
    totalStock,
    totalReservations,
    pendingReservations,
    completedReservations,
    rejectedReservations,
    availableReservations,
  };
}

/**
 * Fetches reservations grouped by month for the last 6 months.
 */
export async function getReservationsByMonth(): Promise<ReservationsByMonth[]> {
  const supabase = await createClient();

  // Get reservations from the last 6 months
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const { data: reservations } = await supabase
    .from("reservations")
    .select("status, createdAt")
    .gte("createdAt", sixMonthsAgo.toISOString())
    .order("createdAt", { ascending: true });

  if (!reservations) {
    return [];
  }

  // Group by month
  const monthlyData: Record<string, { completed: number; pending: number; rejected: number; available: number }> = {};

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  reservations.forEach((reservation) => {
    const date = new Date(reservation.createdAt);
    const monthKey = `${months[date.getMonth()]} ${date.getFullYear()}`;

    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = { completed: 0, pending: 0, rejected: 0, available: 0 };
    }

    if (reservation.status === "completed") {
      monthlyData[monthKey].completed++;
    } else if (reservation.status === "pending") {
      monthlyData[monthKey].pending++;
    } else if (reservation.status === "rejected") {
      monthlyData[monthKey].rejected++;
    } else if (reservation.status === "available") {
      monthlyData[monthKey].available++;
    }
  });

  return Object.entries(monthlyData).map(([month, data]) => ({
    month,
    ...data,
  }));
}

/**
 * Fetches top 5 most delivered products.
 */
export async function getTopDeliveredProducts(): Promise<TopProduct[]> {
  const supabase = await createClient();

  // Get completed reservations with their products
  const { data: completedReservations } = await supabase
    .from("reservations")
    .select("id")
    .eq("status", "completed");

  if (!completedReservations || completedReservations.length === 0) {
    return [];
  }

  const reservationIds = completedReservations.map((r) => r.id);

  // Get products from completed reservations
  const { data: reservationProducts } = await supabase
    .from("reservations_products")
    .select(`
      amount,
      productId,
      product:products (name)
    `)
    .in("reservationId", reservationIds);

  if (!reservationProducts) {
    return [];
  }

  // Aggregate by product
  const productTotals: Record<string, { name: string; total: number }> = {};

  reservationProducts.forEach((rp) => {
    const productName = (rp.product as unknown as { name: string })?.name || "Unknown";
    const productKey = String(rp.productId);

    if (!productTotals[productKey]) {
      productTotals[productKey] = { name: productName, total: 0 };
    }
    productTotals[productKey].total += rp.amount || 0;
  });

  // Sort and get top 5
  const colors = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ];

  return Object.values(productTotals)
    .sort((a, b) => b.total - a.total)
    .slice(0, 5)
    .map((product, index) => ({
      name: product.name,
      totalDelivered: product.total,
      fill: colors[index],
    }));
}

/**
 * Fetches reservation status distribution for pie chart.
 */
export async function getReservationStatusDistribution(): Promise<ReservationStatusDistribution[]> {
  const supabase = await createClient();

  const { data: reservations } = await supabase
    .from("reservations")
    .select("status");

  if (!reservations) {
    return [];
  }

  const statusCounts: Record<string, number> = {
    pending: 0,
    available: 0,
    completed: 0,
    rejected: 0,
  };

  reservations.forEach((r) => {
    if (statusCounts[r.status] !== undefined) {
      statusCounts[r.status]++;
    }
  });

  const statusColors: Record<string, string> = {
    pending: "hsl(45, 93%, 47%)",    // Amber/Yellow
    available: "hsl(217, 91%, 60%)", // Blue
    completed: "hsl(142, 71%, 45%)", // Green
    rejected: "hsl(0, 84%, 60%)",    // Red
  };

  const statusLabels: Record<string, string> = {
    pending: "Pending",
    available: "Available",
    completed: "Completed",
    rejected: "Rejected",
  };

  return Object.entries(statusCounts)
    .filter(([, count]) => count > 0)
    .map(([status, count]) => ({
      status: statusLabels[status],
      count,
      fill: statusColors[status],
    }));
}

/**
 * Fetches products with low stock (below 20 units).
 */
export async function getLowStockProducts(): Promise<LowStockProduct[]> {
  const supabase = await createClient();

  const { data: products } = await supabase
    .from("products")
    .select("id, name, amount, price")
    .lt("amount", 20)
    .order("amount", { ascending: true })
    .limit(10);

  if (!products) {
    return [];
  }

  return products.map((p) => ({
    id: p.id,
    name: p.name,
    amount: p.amount ?? 0,
    price: p.price,
  }));
}

/**
 * Fetches product stock levels for bar chart (top 10 by stock).
 */
export async function getProductStockLevels(): Promise<ProductStockLevel[]> {
  const supabase = await createClient();

  const { data: products } = await supabase
    .from("products")
    .select("name, amount")
    .order("amount", { ascending: false })
    .limit(10);

  if (!products) {
    return [];
  }

  const colors = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ];

  return products.map((product, index) => ({
    name: product.name,
    stock: product.amount || 0,
    fill: colors[index % colors.length],
  }));
}

/**
 * Fetches weekly reservation trend for the last 4 weeks.
 */
export async function getWeeklyReservationTrend(): Promise<{ week: string; reservations: number }[]> {
  const supabase = await createClient();

  const fourWeeksAgo = new Date();
  fourWeeksAgo.setDate(fourWeeksAgo.getDate() - 28);

  const { data: reservations } = await supabase
    .from("reservations")
    .select("createdAt")
    .gte("createdAt", fourWeeksAgo.toISOString())
    .order("createdAt", { ascending: true });

  if (!reservations) {
    return [];
  }

  // Group by week
  const weeklyData: Record<string, number> = {};

  reservations.forEach((reservation) => {
    const date = new Date(reservation.createdAt);
    const weekStart = new Date(date);
    weekStart.setDate(date.getDate() - date.getDay());
    const weekKey = `Week of ${weekStart.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;

    if (!weeklyData[weekKey]) {
      weeklyData[weekKey] = 0;
    }
    weeklyData[weekKey]++;
  });

  return Object.entries(weeklyData).map(([week, reservations]) => ({
    week,
    reservations,
  }));
}
