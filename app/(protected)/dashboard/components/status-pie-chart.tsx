"use client";

import { Pie, PieChart, Cell, Label } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { ReservationStatusDistribution } from "@/repository/dashboard-repository";
import { useMemo } from "react";

interface StatusPieChartProps {
  data: ReservationStatusDistribution[];
}

const chartConfig = {
  count: {
    label: "Reservations",
  },
  Pending: {
    label: "Pending",
    color: "hsl(45, 93%, 47%)", // Amber/Yellow
  },
  Available: {
    label: "Available",
    color: "hsl(217, 91%, 60%)", // Blue
  },
  Completed: {
    label: "Completed",
    color: "hsl(142, 71%, 45%)", // Green
  },
  Rejected: {
    label: "Rejected",
    color: "hsl(0, 84%, 60%)", // Red
  },
} satisfies ChartConfig;

export function StatusPieChart({ data }: StatusPieChartProps) {
  const totalReservations = useMemo(() => {
    return data.reduce((acc, curr) => acc + curr.count, 0);
  }, [data]);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Reservation Status</CardTitle>
        <CardDescription>Distribution of all reservations by status</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="mx-auto aspect-square h-[280px]">
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={data}
              dataKey="count"
              nameKey="status"
              innerRadius={60}
              outerRadius={90}
              strokeWidth={5}
              paddingAngle={2}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalReservations}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground text-sm"
                        >
                          Reservations
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
            <ChartLegend
              content={<ChartLegendContent nameKey="status" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
