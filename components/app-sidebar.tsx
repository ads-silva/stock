"use client";

import {
  FilePlus2,
  LayoutDashboard,
  LayoutList,
  Warehouse
} from "lucide-react";
import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail
} from "@/components/ui/sidebar";

const data = {
  teams: [
    {
      name: "Stock",
      logo: Warehouse,
      plan: "Stock Management System",
    },
  ],
  navMain: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "New Reservation",
      url: "/new-reservation",
      icon: FilePlus2,
    },
    {
      name: "Reservations",
      url: "/reservations",
      icon: LayoutList,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
