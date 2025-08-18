import { useState, useEffect } from "react";
import {
  FileText,
  Settings,
  ChevronDown,
  ChevronUp,
  Moon,
  LogOut,
  Menu,
  PanelLeft,
  PanelRight,
  User,
  TrendingUp,
  TrendingDown,
  Handshake,
  Store,
  ChartColumnBig,
  Wallet,
  LayoutDashboard,
} from "lucide-react";

export function AppSidebar() {
  const [openPersonal, setOpenPersonal] = useState(false);
  const [openBusiness, setOpenBusiness] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  const sidebarWidth = collapsed ? "w-16" : "w-64";
  const iconSize = collapsed ? 20 : 18;
  const itemClass = collapsed
    ? "flex flex-col items-center justify-center h-12 text-foreground rounded-md transition-colors cursor-pointer px-1 group hover:bg-foreground hover:[&>*]:text-foreground/80"
    : "flex items-center gap-2 text-foreground rounded-md py-2 transition-colors cursor-pointer hover:[&>*]:text-foreground/80";

  const sidebarContent = (
    <aside
      className={`flex flex-col h-screen bg-background border-border border-r shadow-md justify-between transition-smooth ${sidebarWidth}`}
    >
      <div>
        <nav className={`py-4 ${collapsed ? "px-2" : "px-6"}`}>
          <div
            className={
              collapsed
                ? "flex flex-col items-start mb-4"
                : "flex flex-col gap-1 mb-4 items-start w-full"
            }
          >
            {!collapsed && (
              <div className="flex items-center w-full justify-between">
                <h2 className="text-xs font-semibold text-foreground/90">
                  Navegação
                </h2>
                <button
                  className="text-foreground hover:text-foreground/80"
                  onClick={() => setCollapsed((v) => !v)}
                  aria-label="Retrair sidebar"
                >
                  <PanelLeft size={20} />
                </button>
              </div>
            )}
            {collapsed && (
              <div className="w-full">
                <button
                  className="flex flex-col items-center justify-center h-12 w-full text-foreground rounded-md transition-colors cursor-pointer px-1 group hover:bg-foreground"
                  onClick={() => setCollapsed((v) => !v)}
                  aria-label="Expandir sidebar"
                >
                  <PanelRight
                    size={20}
                    className="group-hover:text-background transition-colors"
                  />
                </button>
              </div>
            )}
          </div>
          <ul className="space-y-1">
            <li className={itemClass}>
              <LayoutDashboard
                size={iconSize}
                className={
                  collapsed
                    ? "group-hover:text-background transition-colors"
                    : "text-foreground"
                }
              />
              {!collapsed && <span className="text-foreground">Dashboard</span>}
            </li>
            <li
              className={itemClass + " cursor-pointer"}
              onClick={() => setOpenPersonal((v) => !v)}
            >
              <Wallet
                size={iconSize}
                className={
                  collapsed
                    ? "group-hover:text-background transition-colors"
                    : "text-foreground"
                }
              />
              {!collapsed && <span className="text-foreground">Pessoal</span>}
              {!collapsed &&
                (openPersonal ? (
                  <ChevronUp size={16} className="ml-auto text-foreground" />
                ) : (
                  <ChevronDown size={16} className="ml-auto text-foreground" />
                ))}
            </li>
            {!collapsed && (
              <li
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openPersonal ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <ul className="pl-7 space-y-1">
                  <li className={itemClass}>
                    <TrendingUp size={iconSize} className="text-foreground" />
                    <span className="text-foreground">Vendas</span>
                  </li>
                  <li className={itemClass}>
                    <TrendingDown size={iconSize} className="text-foreground" />
                    <span className="text-foreground">Gastos</span>
                  </li>
                  <li className={itemClass}>
                    <FileText size={iconSize} className="text-foreground" />
                    <span className="text-foreground">Boletos</span>
                  </li>
                </ul>
              </li>
            )}
            <li
              className={itemClass + " cursor-pointer"}
              onClick={() => setOpenBusiness((v) => !v)}
            >
              <Store
                size={iconSize}
                className={
                  collapsed
                    ? "group-hover:text-background transition-colors"
                    : "text-foreground"
                }
              />
              {!collapsed && (
                <span className="text-foreground">Meu Negócio</span>
              )}
              {!collapsed &&
                (openBusiness ? (
                  <ChevronUp size={16} className="ml-auto text-foreground" />
                ) : (
                  <ChevronDown size={16} className="ml-auto text-foreground" />
                ))}
            </li>
            {!collapsed && (
              <li
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openBusiness ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <ul className="pl-7 space-y-1">
                  <li className={itemClass}>
                    <TrendingUp size={iconSize} className="text-foreground" />
                    <span className="text-foreground">Vendas</span>
                  </li>
                  <li className={itemClass}>
                    <TrendingDown size={iconSize} className="text-foreground" />
                    <span className="text-foreground">Gastos</span>
                  </li>
                  <li className={itemClass}>
                    <Handshake size={iconSize} className="text-foreground" />
                    <span className="text-foreground">Clientes</span>
                  </li>
                  <li className={itemClass}>
                    <ChartColumnBig
                      size={iconSize}
                      className="text-foreground"
                    />
                    <span className="text-foreground">Relatórios</span>
                  </li>
                </ul>
              </li>
            )}
            <li className={itemClass}>
              <Settings
                size={iconSize}
                className={
                  collapsed
                    ? "group-hover:text-background transition-colors"
                    : "text-foreground"
                }
              />
              {!collapsed && (
                <span className="text-foreground">Configurações</span>
              )}
            </li>
          </ul>
          <div className="mt-6">
            {!collapsed && (
              <div className="flex items-center w-full mb-2">
                <h2 className="text-xs font-semibold text-foreground/90">
                  Tema
                </h2>
              </div>
            )}
            <div className="flex items-center w-full">
              <button
                className={
                  collapsed
                    ? "flex flex-col items-center justify-center h-12 w-full text-foreground rounded-md transition-colors cursor-pointer group hover:bg-foreground hover:[&>*]:text-foreground/80"
                    : "flex items-center gap-2 w-full rounded-md transition-colors text-foreground font-medium mt-2 hover:[&>*]:text-foreground/80"
                }
                onClick={() => setDark((d) => !d)}
                aria-label="Alternar tema"
              >
                <Moon
                  size={iconSize}
                  className={
                    collapsed
                      ? "group-hover:text-background transition-colors"
                      : "text-foreground"
                  }
                />
                {!collapsed && (
                  <span className="text-foreground">
                    {dark ? "Tema Claro" : "Tema Escuro"}
                  </span>
                )}
              </button>
            </div>
          </div>
        </nav>
      </div>
      <div
        className={`py-4 border-t border-border ${collapsed ? "px-2" : "px-6"}`}
      >
        <div
          className={
            collapsed
              ? "flex flex-col items-center"
              : "flex items-center gap-3 mb-4"
          }
        >
          <User
            size={collapsed ? 23 : 28}
            className="text-foreground muted rounded-full"
          />
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-base font-semibold text-foreground leading-tight">
                Usuário
              </span>
              <span className="text-xs text-muted-foreground">
                usuario@email.com
              </span>
            </div>
          )}
        </div>
        <button
          className={
            collapsed
              ? "flex flex-col items-center justify-center h-12 w-full mt-2 text-foreground rounded-md transition-colors cursor-pointer px-1 group hover:bg-foreground"
              : "flex items-center bg-foreground hover:bg-foreground/90 gap-2 justify-center w-full py-2 rounded-md text-sm font-medium transition-colors mt-4"
          }
        >
          <LogOut
            size={iconSize}
            className={
              collapsed
                ? "group-hover:text-background transition-colors"
                : "text-background"
            }
          />
          {!collapsed && <span className="text-background">Sair</span>}
        </button>
      </div>
    </aside>
  );

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-background rounded-full p-2 shadow-md"
        onClick={() => setMobileOpen(true)}
        aria-label="Abrir menu"
      >
        <Menu size={24} />
      </button>
      <div className="hidden md:block">{sidebarContent}</div>
      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex">
          {sidebarContent}
          <div
            className="flex-1 bg-background/80"
            onClick={() => setMobileOpen(false)}
          ></div>
        </div>
      )}
    </>
  );
}
