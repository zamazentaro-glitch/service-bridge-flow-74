import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import Auth from "./pages/Auth";
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

const AppLayout = ({ children }: { children: React.ReactNode }) => (
  <SidebarProvider>
    <div className="flex min-h-screen w-full">
      <AppSidebar />
      <div className="flex-1 flex flex-col">
        <header className="h-14 border-b flex items-center px-4 bg-background sticky top-0 z-10">
          <SidebarTrigger />
        </header>
        <main className="flex-1 p-6 bg-background">
          {children}
        </main>
      </div>
    </div>
  </SidebarProvider>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <Dashboard />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/work-orders"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <WorkOrders />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/work-orders/new"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <CreateWorkOrder />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/scan-qr"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <ScanQR />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/qr-management"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <QRManagement />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/purchase-orders"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <PurchaseOrders />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/purchase-orders/new"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <PurchaseOrders />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/supplier-insights"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <SupplierInsights />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/sync-center"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <SyncCenter />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/customers"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <Customers />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/vehicles"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <Vehicles />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/items"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <Items />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/suppliers"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <Suppliers />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
