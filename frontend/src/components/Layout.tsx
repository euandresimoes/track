import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ThemeProvider } from "next-themes";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar />

          <div className="flex-1 flex flex-col">
            <header className="h-14 flex items-center px-4">
              <SidebarTrigger />
              <h2 className="ml-2 mb-[0.1rem] text-lg font-semibold text-foreground">
                Track
              </h2>
            </header>

            <main className="flex-1 overflow-auto">{children}</main>
          </div>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
}
