import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Plus, Trash2, QrCode, Save, Printer } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

interface LineItem {
  id: string;
  name: string;
  qty: number;
  price: number;
}

export default function CreateWorkOrder() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [customer, setCustomer] = useState("");
  const [phone, setPhone] = useState("");
  const [plate, setPlate] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [lineItems, setLineItems] = useState<LineItem[]>([
    { id: "1", name: "", qty: 1, price: 0 }
  ]);

  const addLineItem = () => {
    setLineItems([...lineItems, { id: Date.now().toString(), name: "", qty: 1, price: 0 }]);
  };

  const removeLineItem = (id: string) => {
    setLineItems(lineItems.filter(item => item.id !== id));
  };

  const updateLineItem = (id: string, field: keyof LineItem, value: string | number) => {
    setLineItems(lineItems.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const calculateSubtotal = () => {
    return lineItems.reduce((sum, item) => sum + (item.qty * item.price), 0);
  };

  const subtotal = calculateSubtotal();
  const tax = subtotal * 0.11; // 11% PPN
  const total = subtotal + tax;

  const handleSaveDraft = () => {
    toast({
      title: "Draft Saved",
      description: "Work order has been saved as draft",
    });
  };

  const handlePrintAndLock = () => {
    toast({
      title: "Work Order Locked",
      description: "Nota printed and work order is now locked",
    });
    navigate("/work-orders");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/work-orders")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Create Work Order</h1>
          <p className="text-muted-foreground">Fill in the details below</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="customer">Customer Name</Label>
                  <Input
                    id="customer"
                    placeholder="Enter customer name"
                    value={customer}
                    onChange={(e) => setCustomer(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
              <Separator />
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="plate">Vehicle Plate</Label>
                  <Input
                    id="plate"
                    placeholder="B 1234 XYZ"
                    value={plate}
                    onChange={(e) => setPlate(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Vehicle Type</Label>
                  <Input
                    id="type"
                    placeholder="Toyota Avanza"
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Service Items</CardTitle>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => navigate("/scan-qr")}>
                  <QrCode className="mr-2 h-4 w-4" />
                  Scan QR
                </Button>
                <Button size="sm" onClick={addLineItem}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Item
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {lineItems.map((item) => (
                  <div key={item.id} className="flex gap-3 items-end">
                    <div className="flex-1 space-y-2">
                      <Label className="text-xs">Item Name</Label>
                      <Select
                        value={item.name}
                        onValueChange={(value) => updateLineItem(item.id, "name", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select item" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="oil-change">Oil Change</SelectItem>
                          <SelectItem value="brake-pad">Brake Pad</SelectItem>
                          <SelectItem value="tire-rotation">Tire Rotation</SelectItem>
                          <SelectItem value="battery">Battery</SelectItem>
                          <SelectItem value="air-filter">Air Filter</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="w-24 space-y-2">
                      <Label className="text-xs">Qty</Label>
                      <Input
                        type="number"
                        min="1"
                        value={item.qty}
                        onChange={(e) => updateLineItem(item.id, "qty", parseInt(e.target.value) || 1)}
                      />
                    </div>
                    <div className="w-32 space-y-2">
                      <Label className="text-xs">Unit Price</Label>
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
          <Card>
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">Rp {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax (11%)</span>
                <span className="font-medium">Rp {tax.toLocaleString()}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="font-semibold">Total</span>
                <span className="text-xl font-bold text-primary">Rp {total.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <Button className="w-full" variant="outline" onClick={handleSaveDraft}>
              <Save className="mr-2 h-4 w-4" />
              Save as Draft
            </Button>
            <Button className="w-full" onClick={handlePrintAndLock}>
              <Printer className="mr-2 h-4 w-4" />
              Print & Lock Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
