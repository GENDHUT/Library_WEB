import { AppSidebar } from "@/components/app-sidebar";
import { Header } from "@/components/header";

import {
  SidebarProvider,
  SidebarInset,
} from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="">
      {children}
    </main>
  );
}
