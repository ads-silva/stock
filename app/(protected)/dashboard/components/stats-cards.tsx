"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Boxes, ClipboardList, CheckCircle2, Clock, XCircle } from "lucide-react";

interface StatsCardsProps {
  totalProducts: number;
  totalStock: number;
  totalReservations: number;
  pendingReservations: number;
  completedReservations: number;
  rejectedReservations: number;
}

export function StatsCards({
  totalProducts,
  totalStock,
  totalReservations,
  pendingReservations,
  completedReservations,
  rejectedReservations,
}: StatsCardsProps) {
  const stats = [
    {
      title: "Total Products",
      value: totalProducts,
      icon: Package,
      description: "Different items in catalog",
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-950",
    },
    {
      title: "Total Stock",
      value: totalStock.toLocaleString(),
      icon: Boxes,
      description: "Units available in inventory",
      color: "text-emerald-600",
      bgColor: "bg-emerald-100 dark:bg-emerald-950",
    },
    {
      title: "Total Reservations",
      value: totalReservations,
      icon: ClipboardList,
      description: "All time reservations",
      color: "text-violet-600",
      bgColor: "bg-violet-100 dark:bg-violet-950",
    },
    {
      title: "Pending",
      value: pendingReservations,
      icon: Clock,
      description: "Awaiting approval",
      color: "text-amber-600",
      bgColor: "bg-amber-100 dark:bg-amber-950",
    },
    {
      title: "Completed",
      value: completedReservations,
      icon: CheckCircle2,
      description: "Successfully delivered",
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-950",
    },
    {
      title: "Rejected",
      value: rejectedReservations,
      icon: XCircle,
      description: "Declined requests",
      color: "text-red-600",
      bgColor: "bg-red-100 dark:bg-red-950",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {stats.map((stat) => (
        <Card key={stat.title} className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <div className={`rounded-full p-2 ${stat.bgColor}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
