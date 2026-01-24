import { isManager } from "@/repository/users-repository";
import { redirect } from "next/navigation";
import {
  getDashboardStats,
  getReservationsByMonth,
  getTopDeliveredProducts,
  getReservationStatusDistribution,
  getProductStockLevels,
  getLowStockProducts,
} from "@/repository/dashboard-repository";
import { StatsCards } from "./components/stats-cards";
import { ReservationsTrendChart } from "./components/reservations-trend-chart";
import { TopProductsChart } from "./components/top-products-chart";
import { StatusPieChart } from "./components/status-pie-chart";
import { StockLevelsChart } from "./components/stock-levels-chart";
import { LowStockTable } from "./components/low-stock-table";

export default async function DashboardPage() {
  const userIsManager = await isManager();

  if (!userIsManager) {
    redirect("/reservations");
  }

  // Fetch all dashboard data in parallel
  const [
    stats,
    reservationsByMonth,
    topProducts,
    statusDistribution,
    stockLevels,
    lowStockProducts,
  ] = await Promise.all([
    getDashboardStats(),
    getReservationsByMonth(),
    getTopDeliveredProducts(),
    getReservationStatusDistribution(),
    getProductStockLevels(),
    getLowStockProducts(),
  ]);

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your stock management and reservations
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <StatsCards
        totalProducts={stats.totalProducts}
        totalStock={stats.totalStock}
        totalReservations={stats.totalReservations}
        pendingReservations={stats.pendingReservations}
        completedReservations={stats.completedReservations}
        rejectedReservations={stats.rejectedReservations}
      />

      {/* Charts Row 1 */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ReservationsTrendChart data={reservationsByMonth} />
        <StatusPieChart data={statusDistribution} />
      </div>

      {/* Charts Row 2 */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <TopProductsChart data={topProducts} />
        <StockLevelsChart data={stockLevels} />
      </div>

      {/* Low Stock Alert */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <LowStockTable data={lowStockProducts} />
      </div>
    </div>
  );
}
