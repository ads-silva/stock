"use client";

import {
  FilePlus2,
  LayoutDashboard,
  LayoutList,
  Warehouse,
} from "lucide-react";
import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

const teams = [
  {
    name: "Stock",
    logo: Warehouse,
    plan: "Stock Management System",
  },
];

const allNavItems = [
  {
    name: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    roles: ["reservation_manager"],
  },
  {
    name: "New Reservation",
    url: "/new-reservation",
    icon: FilePlus2,
    roles: ["reservation_requester"],
  },
  {
    name: "Reservations",
    url: "/reservations",
    icon: LayoutList,
    roles: ["reservation_requester", "reservation_manager"],
  },
];

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  readonly userRole: string | null;
}

export function AppSidebar({ userRole, ...props }: AppSidebarProps) {
  const navItems = allNavItems
    .filter((item) => !userRole || item.roles.includes(userRole))
    .map(({ roles: _roles, ...item }) => item);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
