import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Plus, Trash2, Save, Printer } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface POLineItem {
  id: string;
  itemCode: string;
  name: string;
  qty: number;
  lastPrice: number;
  price: number;
}

export default function PurchaseOrders() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [supplier, setSupplier] = useState("");
  const [lineItems, setLineItems] = useState<POLineItem[]>([
    { id: "1", itemCode: "", name: "", qty: 1, lastPrice: 0, price: 0 }
  ]);

  const suppliers = [
    { value: "maju-motor", label: "PT Maju Motor Parts", score: 95 },
    { value: "sentosa", label: "CV Sentosa Otomotif", score: 88 },
    { value: "berkah", label: "UD Berkah Sparepart", score: 75 },
  ];

  const addLineItem = () => {
    setLineItems([...lineItems, { id: Date.now().toString(), itemCode: "", name: "", qty: 1, lastPrice: 0, price: 0 }]);
  };

  const removeLineItem = (id: string) => {
    setLineItems(lineItems.filter(item => item.id !== id));
  };

  const updateLineItem = (id: string, field: keyof POLineItem, value: string | number) => {
    setLineItems(lineItems.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const total = lineItems.reduce((sum, item) => sum + (item.qty * item.price), 0);

  const handleSave = () => {
    toast({
      title: "Purchase Order Saved",
      description: "PO has been saved successfully",
    });
  };

  const handlePrint = () => {
    toast({
      title: "Purchase Order Printed",
      description: "PO sent to printer",
    });
  };

  const selectedSupplier = suppliers.find(s => s.value === supplier);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/supplier-insights")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Create Purchase Order</h1>
          <p className="text-muted-foreground">Order supplies from supplier</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Supplier Selection</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="supplier">Select Supplier</Label>
                <Select value={supplier} onValueChange={setSupplier}>
                  <SelectTrigger id="supplier">
                    <SelectValue placeholder="Choose supplier" />
                  </SelectTrigger>
                  <SelectContent>
                    {suppliers.map((s) => (
                      <SelectItem key={s.value} value={s.value}>
                        {s.label} (Score: {s.score})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Order Items</CardTitle>
              <Button size="sm" onClick={addLineItem}>
                <Plus className="mr-2 h-4 w-4" />
                Add Item
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {lineItems.map((item) => (
                  <div key={item.id} className="flex gap-3 items-end">
                    <div className="flex-1 space-y-2">
                      <Label className="text-xs">Item</Label>
                      <Select
                        value={item.itemCode}
                        onValueChange={(value) => {
                          const itemData = {
                            'brake-pad': { name: 'Brake Pad Set', lastPrice: 420000 },
                            'oil-filter': { name: 'Oil Filter', lastPrice: 145000 },
                            'air-filter': { name: 'Air Filter', lastPrice: 115000 },
                          }[value];
                          if (itemData) {
                            updateLineItem(item.id, "itemCode", value);
                            updateLineItem(item.id, "name", itemData.name);
                            updateLineItem(item.id, "lastPrice", itemData.lastPrice);
                            updateLineItem(item.id, "price", itemData.lastPrice);
                          }
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select item" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="brake-pad">Brake Pad Set</SelectItem>
                          <SelectItem value="oil-filter">Oil Filter</SelectItem>
                          <SelectItem value="air-filter">Air Filter</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="w-20 space-y-2">
                      <Label className="text-xs">Qty</Label>
                      <Input
                        type="number"
                        min="1"
                        value={item.qty}
                        onChange={(e) => updateLineItem(item.id, "qty", parseInt(e.target.value) || 1)}
                      />
                    </div>
                    <div className="w-32 space-y-2">
                      <Label className="text-xs">Last Price</Label>
                      <Input
                        value={`Rp ${item.lastPrice.toLocaleString()}`}
                        disabled
                      />
                    </div>
                    <div className="w-32 space-y-2">
                      <Label className="text-xs">New Price</Label>
                      <Input
                        type="number"
                        min="0"
                        value={item.price}
                        onChange={(e) => updateLineItem(item.id, "price", parseInt(e.target.value) || 0)}
                        placeholder="0"
                      />
                    </div>
                    <div className="w-32 space-y-2">
                      <Label className="text-xs">Subtotal</Label>
                      <Input
                        value={`Rp ${(item.qty * item.price).toLocaleString()}`}
                        disabled
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeLineItem(item.id)}
                      disabled={lineItems.length === 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {selectedSupplier && (
            <Card className="border-primary">
              <CardHeader>
                <CardTitle className="text-base">Supplier Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">{selectedSupplier.score}</div>
                  <Badge variant="outline" className="border-success text-success">Recommended</Badge>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="font-semibold">Total Amount</span>
                <span className="text-xl font-bold text-primary">Rp {total.toLocaleString()}</span>
              </div>
              <Separator />
              <div className="text-sm text-muted-foreground">
                Items: {lineItems.filter(i => i.itemCode).length}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <Button className="w-full" variant="outline" onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              Save PO
            </Button>
            <Button className="w-full" onClick={handlePrint}>
              <Printer className="mr-2 h-4 w-4" />
              Print PO
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
