import { Outlet } from "react-router-dom";
import { SideNavigation } from "../custom/Nav";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";

export default function AppLayout() {
  return (
    <SidebarProvider>
      <SideNavigation />
      <main className="flex flex-col w-full">
        <section className="">
          <SidebarTrigger />
        </section>
        <section className="h-full p-2">
          <Outlet />
        </section>
      </main>
    </SidebarProvider>
  );
}
