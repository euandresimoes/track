import {
  Home,
  TrendingUp,
  Settings,
  User,
  LogOut,
  Sun,
  Moon,
  HomeIcon,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useTheme } from "next-themes";
import { useAuth } from "@/contexts/AuthContext";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const navigationItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Relatórios", url: "/relatorios", icon: TrendingUp },
  { title: "Configurações", url: "/configuracoes", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "bg-sidebar-accent text-sidebar-accent-foreground"
      : "hover:bg-sidebar-accent/50";

  const isCollapsed = state === "collapsed";

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Sidebar className={isCollapsed ? "w-14" : "w-60"} collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground">
            {!isCollapsed && "Navegação"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground">
            {!isCollapsed && "Tema"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={toggleTheme}>
                  {theme === "dark" ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
                  {!isCollapsed && (
                    <span>
                      {theme === "dark" ? "Tema Claro" : "Tema Escuro"}
                    </span>
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        {!isCollapsed && <Separator className="mb-4" />}

        <div
          className={`p-2 ${
            isCollapsed ? "flex flex-col items-center space-y-2" : "space-y-3"
          }`}
        >
          {!isCollapsed && (
            <div className="flex items-center space-x-3 px-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                  U
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  {user?.nome || "Usuário"}
                </p>
                <p className="text-xs text-sidebar-foreground/70 truncate">
                  {user?.email || ""}
                </p>
              </div>
            </div>
          )}

          {isCollapsed && (
            <Avatar className="h-8 w-8">
              <AvatarImage src="" />
              <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                U
              </AvatarFallback>
            </Avatar>
          )}

          <Button
            variant="ghost"
            size={isCollapsed ? "sm" : "default"}
            className={`w-full text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${
              isCollapsed ? "py-2 px-4 justify-center" : "justify-start"
            }`}
            onClick={logout}
          >
            <LogOut className="h-4 w-4" />
            {!isCollapsed && <span className="ml-2">Sair</span>}
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
