import { StatCard } from "@/components/StatCard";
import { QuickActionCard } from "@/components/QuickActionCard";
import { ClipboardList, DollarSign, Clock, CheckCircle, Plus, Scan, ShoppingCart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Dashboard() {
  // Mock data - in real app, this would come from API
  const stats = {
    todayRevenue: "Rp 2,450,000",
    todayOrders: 12,
    pendingOrders: 3,
    completedOrders: 9,
  };

  const recentOrders = [
    { id: "WO-0001", customer: "John Doe", plate: "B 1234 XYZ", status: "In Progress", total: "Rp 750,000" },
    { id: "WO-0002", customer: "Jane Smith", plate: "B 5678 ABC", status: "Completed", total: "Rp 1,200,000" },
    { id: "WO-0003", customer: "Bob Wilson", plate: "B 9012 DEF", status: "Draft", total: "Rp 500,000" },
  ];

  const getStatusBadge = (status: string) => {
    const config: Record<string, { variant: "default" | "secondary" | "outline" | "destructive", className: string }> = {
      "Draft": { 
        variant: "secondary", 
        className: "bg-muted text-muted-foreground border-0" 
      },
      "In Progress": { 
        variant: "default", 
        className: "bg-primary/10 text-primary border-0 hover:bg-primary/20" 
      },
      "Completed": { 
        variant: "outline", 
        className: "bg-success/10 text-success border-success/20 hover:bg-success/20" 
      },
    };
    
    const { variant, className } = config[status] || config["Draft"];
    return (
      <Badge variant={variant} className={className}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="space-y-8 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's your workshop overview.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Today's Revenue"
          value={stats.todayRevenue}
          icon={DollarSign}
          trend={{ value: "12% from yesterday", isPositive: true }}
        />
        <StatCard
          title="Total Orders"
          value={stats.todayOrders}
          icon={ClipboardList}
        />
        <StatCard
          title="Pending"
          value={stats.pendingOrders}
          icon={Clock}
        />
        <StatCard
          title="Completed"
          value={stats.completedOrders}
          icon={CheckCircle}
        />
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Quick Actions</h2>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <QuickActionCard
            title="Create Work Order"
            description="Start a new service work order"
            icon={Plus}
            href="/work-orders/new"
            variant="primary"
          />
          <QuickActionCard
            title="Scan QR Code"
            description="Quick add items via QR"
            icon={Scan}
            href="/scan-qr"
          />
          <QuickActionCard
            title="Create Purchase Order"
            description="Order supplies from vendors"
            icon={ShoppingCart}
            href="/purchase-orders/new"
          />
        </div>
      </div>

      {/* Recent Work Orders */}
      <Card className="border-border/40 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-semibold tracking-tight">
            Recent Work Orders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div 
                key={order.id} 
                className="flex items-center justify-between p-4 rounded-lg border border-border/40 bg-card hover:bg-muted/30 hover:border-border transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-center gap-6">
                  <div className="space-y-1">
                    <p className="font-semibold text-sm">{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.customer}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Plate Number</p>
                    <p className="text-sm font-medium">{order.plate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  {getStatusBadge(order.status)}
                  <p className="font-semibold text-sm min-w-[120px] text-right">
                    {order.total}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
