import { Outlet } from "react-router-dom";
import { SideNavigation } from "../custom/Nav";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";

export default function AppLayout() {
  return (
    <SidebarProvider>
      <SideNavigation />
      <main className="flex flex-col w-full">
        <section>
          <SidebarTrigger />
        </section>
        <section className="h-full py-2 px-5">
          <Outlet />
        </section>
      </main>
    </SidebarProvider>
  );
}
