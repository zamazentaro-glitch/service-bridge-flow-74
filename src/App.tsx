import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Dashboard from "./pages/Dashboard";
import WorkOrders from "./pages/WorkOrders";
import CreateWorkOrder from "./pages/CreateWorkOrder";
import ScanQR from "./pages/ScanQR";
import QRManagement from "./pages/QRManagement";
import SupplierInsights from "./pages/SupplierInsights";
import SyncCenter from "./pages/SyncCenter";
import Customers from "./pages/Customers";
import Vehicles from "./pages/Vehicles";
import Items from "./pages/Items";
import Suppliers from "./pages/Suppliers";
import PurchaseOrders from "./pages/PurchaseOrders";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="flex min-h-screen w-full">
            <AppSidebar />
            <div className="flex-1 flex flex-col">
              <header className="h-14 border-b flex items-center px-4 bg-background sticky top-0 z-10">
                <SidebarTrigger />
              </header>
              <main className="flex-1 p-6 bg-background">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/work-orders" element={<WorkOrders />} />
                  <Route path="/work-orders/new" element={<CreateWorkOrder />} />
                  <Route path="/scan-qr" element={<ScanQR />} />
                  <Route path="/qr-management" element={<QRManagement />} />
                  <Route path="/purchase-orders" element={<PurchaseOrders />} />
                  <Route path="/purchase-orders/new" element={<PurchaseOrders />} />
                  <Route path="/supplier-insights" element={<SupplierInsights />} />
                  <Route path="/sync-center" element={<SyncCenter />} />
                  <Route path="/customers" element={<Customers />} />
                  <Route path="/vehicles" element={<Vehicles />} />
                  <Route path="/items" element={<Items />} />
                  <Route path="/suppliers" element={<Suppliers />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
