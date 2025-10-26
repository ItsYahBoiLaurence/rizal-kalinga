import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { LayoutDashboard, ShieldCheck, Wallet } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";

export function SideNavigation() {
  const { open } = useSidebar();
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
    <Sidebar collapsible="icon">
      <SidebarHeader className="primaryBackground">
        <div className="flex flex-row items-center gap-2">
          <Link to={"/"}>
            <img src="/appLogo.svg" />
          </Link>
          {open && <p>Kalinga ng Bayan</p>}
        </div>
      </SidebarHeader>
      <SidebarContent className="primaryBackground">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                {navs.map((nav, index) => (
                  <SidebarMenuButton key={`${nav.label} - ${index}`} asChild>
                    <Link to={nav.url}>
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
    </Sidebar>
  );
}
