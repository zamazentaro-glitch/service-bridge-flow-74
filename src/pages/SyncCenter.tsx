import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, RefreshCw, CheckCircle, XCircle, Clock } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

export default function SyncCenter() {
  const { toast } = useToast();

  const syncQueue = [
    { id: "WO-0005", type: "Work Order", status: "pending", date: "2025-01-18 14:30", customer: "Charlie Davis" },
    { id: "WO-0004", type: "Work Order", status: "success", date: "2025-01-18 12:15", customer: "Alice Brown" },
    { id: "WO-0003", type: "Work Order", status: "failed", date: "2025-01-18 10:45", customer: "Bob Wilson", error: "Connection timeout" },
    { id: "WO-0002", type: "Work Order", status: "success", date: "2025-01-17 16:20", customer: "Jane Smith" },
  ];

  const getStatusBadge = (status: string) => {
    const config: Record<string, { icon: any, variant: "default" | "outline" | "secondary" | "destructive", className?: string }> = {
      "pending": { icon: Clock, variant: "secondary" },
      "success": { icon: CheckCircle, variant: "outline", className: "border-success text-success" },
      "failed": { icon: XCircle, variant: "destructive" },
    };
    const { icon: Icon, variant, className } = config[status];
    return (
      <Badge variant={variant} className={className}>
        <Icon className="mr-1 h-3 w-3" />
        {status}
      </Badge>
    );
  };

  const handleExportCSV = () => {
    toast({
      title: "Export Started",
      description: "CSV file is being generated for legacy system",
    });
  };

  const handleRetrySync = (id: string) => {
    toast({
      title: "Retry Initiated",
      description: `Retrying sync for ${id}`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Sync Center</h1>
          <p className="text-muted-foreground">Export and sync data with legacy system</p>
        </div>
        <Button onClick={handleExportCSV}>
          <Download className="mr-2 h-4 w-4" />
          Export to CSV
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-warning/10 flex items-center justify-center">
                <Clock className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">1</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-success/10 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Success</p>
                <p className="text-2xl font-bold">2</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-destructive/10 flex items-center justify-center">
                <XCircle className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Failed</p>
                <p className="text-2xl font-bold">1</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sync Queue</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date/Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Error Message</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {syncQueue.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{item.customer}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{item.date}</TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell className="text-sm text-destructive">{item.error || "-"}</TableCell>
                  <TableCell className="text-right">
                    {item.status === "failed" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRetrySync(item.id)}
                      >
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Retry
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Export Log</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm font-mono bg-muted p-4 rounded-lg max-h-64 overflow-y-auto">
          <p className="text-success">[2025-01-18 16:45:12] Export initiated for WO-0004</p>
          <p className="text-success">[2025-01-18 16:45:15] CSV file generated successfully</p>
          <p className="text-success">[2025-01-18 16:45:16] Data exported: 1 work order(s)</p>
          <p className="text-destructive">[2025-01-18 14:20:45] Connection error: Timeout connecting to legacy system</p>
          <p className="text-success">[2025-01-17 18:30:22] Export completed for WO-0002</p>
        </CardContent>
      </Card>
    </div>
  );
}
