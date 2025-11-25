import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, QrCode, Printer, Download } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

export default function QRManagement() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");

  const items = [
    { code: "ITM-001", name: "Premium Oil Filter", price: 150000, category: "Parts", hasQR: true },
    { code: "ITM-002", name: "Brake Pad Set", price: 450000, category: "Parts", hasQR: true },
    { code: "SVC-001", name: "Full Oil Change Service", price: 350000, category: "Service", hasQR: true },
    { code: "ITM-003", name: "Air Filter", price: 120000, category: "Parts", hasQR: false },
    { code: "ITM-004", name: "Spark Plug Set", price: 280000, category: "Parts", hasQR: true },
  ];

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const generateQR = (code: string, name: string) => {
    toast({
      title: "QR Code Generated",
      description: `QR code generated for ${name}`,
    });
  };

  const printLabel = (code: string) => {
    toast({
      title: "Print Queued",
      description: `Label for ${code} sent to printer`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">QR Code Management</h1>
          <p className="text-muted-foreground">Generate and print QR labels for items</p>
        </div>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export All QR
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search items..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item Code</TableHead>
                <TableHead>Item Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>QR Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.map((item) => (
                <TableRow key={item.code}>
                  <TableCell className="font-medium">{item.code}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.category}</Badge>
                  </TableCell>
                  <TableCell className="font-semibold">Rp {item.price.toLocaleString()}</TableCell>
                  <TableCell>
                    {item.hasQR ? (
                      <Badge variant="outline" className="border-success text-success">
                        <QrCode className="mr-1 h-3 w-3" />
                        Generated
                      </Badge>
                    ) : (
                      <Badge variant="secondary">No QR</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => generateQR(item.code, item.name)}
                      >
                        <QrCode className="mr-2 h-4 w-4" />
                        {item.hasQR ? 'Regenerate' : 'Generate'}
                      </Button>
                      {item.hasQR && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => printLabel(item.code)}
                        >
                          <Printer className="mr-2 h-4 w-4" />
                          Print
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="text-center space-y-2">
              <QrCode className="h-12 w-12 mx-auto text-primary" />
              <h3 className="font-semibold">QR Label Format</h3>
              <p className="text-sm text-muted-foreground">
                Standard 40x40mm labels with item code and name
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center space-y-2">
              <Printer className="h-12 w-12 mx-auto text-primary" />
              <h3 className="font-semibold">Print Settings</h3>
              <p className="text-sm text-muted-foreground">
                Configure printer and label size in settings
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center space-y-2">
              <Download className="h-12 w-12 mx-auto text-primary" />
              <h3 className="font-semibold">Batch Export</h3>
              <p className="text-sm text-muted-foreground">
                Export all QR codes as PDF for bulk printing
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
