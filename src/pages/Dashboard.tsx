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
    const variants: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
      "Draft": "secondary",
      "In Progress": "default",
      "Completed": "outline",
    };
    return <Badge variant={variants[status] || "default"}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your workshop overview.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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

      <div>
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-3">
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

      <Card>
        <CardHeader>
          <CardTitle>Recent Work Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-semibold">{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.customer}</p>
                  </div>
                  <div className="text-sm">
                    <p className="text-muted-foreground">Plate: {order.plate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {getStatusBadge(order.status)}
                  <p className="font-semibold">{order.total}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
