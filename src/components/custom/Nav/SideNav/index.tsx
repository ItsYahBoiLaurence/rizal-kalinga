import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { LayoutDashboard, ShieldCheck, Wallet } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";

export function SideNavigation() {
  const navs: { url: string; label: string; icon: ReactNode }[] = [
    { icon: <LayoutDashboard />, url: "/", label: "Dashboard" },
    {
      icon: <ShieldCheck />,
      url: "/on-site-verification",
      label: "On-Site Verification",
    },
    { icon: <Wallet />, url: "/aid-disbursement", label: "Aid Disbursement" },
  ];

  return (
    <Sidebar className="bg-[#012B54] text-white" collapsible="icon">
      <SidebarHeader className="bg-[#012B54]">Header</SidebarHeader>
      <SidebarContent className="bg-[#012B54]">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                {navs.map((nav, index) => (
                  <SidebarMenuButton asChild>
                    <Link to={nav.url} key={`${nav.label} - ${index}`}>
                      {nav.icon}
                      <span>{nav.label}</span>
                    </Link>
                  </SidebarMenuButton>
                ))}
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter className="bg-[#012B54]">Footer</SidebarFooter>
    </Sidebar>
  );
}
