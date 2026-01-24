"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { ReservationsByMonth } from "@/repository/dashboard-repository";
import { TrendingUp } from "lucide-react";

interface ReservationsTrendChartProps {
  data: ReservationsByMonth[];
}

const chartConfig = {
  completed: {
    label: "Completed",
    color: "hsl(142, 71%, 45%)", // Green
  },
  pending: {
    label: "Pending",
    color: "hsl(45, 93%, 47%)", // Amber/Yellow
  },
  rejected: {
    label: "Rejected",
    color: "hsl(0, 84%, 60%)", // Red
  },
  available: {
    label: "Available",
    color: "hsl(217, 91%, 60%)", // Blue
  },
} satisfies ChartConfig;

export function ReservationsTrendChart({ data }: ReservationsTrendChartProps) {
  // Calculate trend percentage
  const lastMonth = data[data.length - 1];
  const prevMonth = data[data.length - 2];
  const trendPercentage = prevMonth
    ? Math.round(((lastMonth?.completed || 0) - (prevMonth?.completed || 0)) / Math.max(prevMonth.completed, 1) * 100)
    : 0;

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Reservations Trend
          {trendPercentage > 0 && (
            <span className="flex items-center text-sm font-normal text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              +{trendPercentage}%
            </span>
          )}
        </CardTitle>
        <CardDescription>
          Monthly reservation activity over the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
              top: 12,
              bottom: 12,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.split(" ")[0]}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <ChartLegend content={<ChartLegendContent />} />
            <defs>
              <linearGradient id="fillCompleted" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillPending" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(45, 93%, 47%)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="hsl(45, 93%, 47%)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <Area
              dataKey="completed"
              type="natural"
              fill="url(#fillCompleted)"
              stroke="hsl(142, 71%, 45%)"
              strokeWidth={2}
              stackId="a"
            />
            <Area
              dataKey="pending"
              type="natural"
              fill="url(#fillPending)"
              stroke="hsl(45, 93%, 47%)"
              strokeWidth={2}
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
