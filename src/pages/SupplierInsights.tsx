import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Star, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function SupplierInsights() {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState("brake-pad");

  const items = [
    { value: "brake-pad", label: "Brake Pad Set" },
    { value: "oil-filter", label: "Oil Filter" },
    { value: "air-filter", label: "Air Filter" },
  ];

  const recommendations = [
    {
      id: 1,
      supplier: "PT Maju Motor Parts",
      lastPrice: 420000,
      lastPurchase: "2025-01-15",
      transactions: 24,
      score: 95,
      isRecommended: true
    },
    {
      id: 2,
      supplier: "CV Sentosa Otomotif",
      lastPrice: 450000,
      lastPurchase: "2025-01-10",
      transactions: 18,
      score: 88,
      isRecommended: false
    },
    {
      id: 3,
      supplier: "UD Berkah Sparepart",
      lastPrice: 480000,
      lastPurchase: "2024-12-20",
      transactions: 12,
      score: 75,
      isRecommended: false
    },
  ];

  const purchaseHistory = [
    { date: "2025-01-15", supplier: "PT Maju Motor Parts", qty: 10, price: 420000, total: 4200000 },
    { date: "2025-01-10", supplier: "CV Sentosa Otomotif", qty: 5, price: 450000, total: 2250000 },
    { date: "2024-12-28", supplier: "PT Maju Motor Parts", qty: 15, price: 415000, total: 6225000 },
    { date: "2024-12-20", supplier: "UD Berkah Sparepart", qty: 8, price: 480000, total: 3840000 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Supplier Insights</h1>
        <p className="text-muted-foreground">AI-powered supplier recommendations based on history</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Select Item</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedItem} onValueChange={setSelectedItem}>
            <SelectTrigger>
              <SelectValue placeholder="Select an item" />
            </SelectTrigger>
            <SelectContent>
              {items.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-xl font-semibold mb-4">Top Supplier Recommendations</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {recommendations.map((rec, index) => (
            <Card key={rec.id} className={rec.isRecommended ? "border-primary" : ""}>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{rec.supplier}</h3>
                      {rec.isRecommended && (
                        <Badge className="mt-1">
                          <Star className="mr-1 h-3 w-3" />
                          Recommended
                        </Badge>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{rec.score}</div>
                      <div className="text-xs text-muted-foreground">Score</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Last Price</span>
                      <span className="font-semibold">Rp {rec.lastPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Last Purchase</span>
                      <span>{rec.lastPurchase}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Transactions</span>
                      <span className="font-medium">{rec.transactions}</span>
                    </div>
                  </div>

                  <Button 
                    className="w-full" 
                    variant={rec.isRecommended ? "default" : "outline"}
                    onClick={() => navigate("/purchase-orders/new")}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Create PO
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Purchase History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Unit Price</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {purchaseHistory.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.date}</TableCell>
                  <TableCell className="font-medium">{item.supplier}</TableCell>
                  <TableCell>{item.qty}</TableCell>
                  <TableCell>Rp {item.price.toLocaleString()}</TableCell>
                  <TableCell className="text-right font-semibold">
                    Rp {item.total.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">How Recommendations Work</h3>
              <p className="text-sm text-muted-foreground">
                Our system analyzes your purchase history, supplier performance, pricing trends, and delivery reliability 
                to recommend the best suppliers for each item. The score is calculated based on price competitiveness, 
                transaction frequency, and consistency.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
