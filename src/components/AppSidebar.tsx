import { 
  LayoutDashboard, 
  ClipboardList, 
  QrCode, 
  Scan,
  TruckIcon,
  ShoppingCart,
  Database,
  Users,
  Car,
  Package,
  Building2,
  RefreshCw,
  LogOut
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";

const mainMenuItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Work Orders", url: "/work-orders", icon: ClipboardList },
  { title: "Scan QR", url: "/scan-qr", icon: Scan },
  { title: "QR Management", url: "/qr-management", icon: QrCode },
  { title: "Purchase Orders", url: "/purchase-orders", icon: ShoppingCart },
  { title: "Supplier Insights", url: "/supplier-insights", icon: TruckIcon },
];

const masterDataItems = [
  { title: "Customers", url: "/customers", icon: Users },
  { title: "Vehicles", url: "/vehicles", icon: Car },
  { title: "Items", url: "/items", icon: Package },
  { title: "Suppliers", url: "/suppliers", icon: Building2 },
];

const systemItems = [
  { title: "Sync Center", url: "/sync-center", icon: RefreshCw },
];

export function AppSidebar() {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded bg-primary flex items-center justify-center">
            <Database className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-sidebar-foreground">Bengkel Service</h2>
            <p className="text-xs text-sidebar-foreground/60">Bridge System</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end={item.url === "/"}
                      className="hover:bg-sidebar-accent"
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Master Data</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {masterDataItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url}
                      className="hover:bg-sidebar-accent"
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>System</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {systemItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url}
                      className="hover:bg-sidebar-accent"
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-4">
        {user && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-sidebar-accent flex items-center justify-center">
                <span className="text-xs font-medium text-sidebar-foreground">
                  {user.email?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-sidebar-foreground truncate">
                  {user.email}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSignOut}
              className="w-full justify-start text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Keluar
            </Button>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
