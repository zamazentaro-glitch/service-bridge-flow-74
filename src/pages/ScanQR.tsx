import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Camera, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

export default function ScanQR() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [scannedItem, setScannedItem] = useState<any>(null);

  // Simulate QR scan
  const simulateScan = () => {
    setScannedItem({
      code: "ITM-001",
      name: "Premium Oil Filter",
      price: 150000,
      category: "Parts"
    });
  };

  const addToWorkOrder = () => {
    toast({
      title: "Item Added",
      description: "Item has been added to the current work order",
    });
    setScannedItem(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Scan QR Code</h1>
          <p className="text-muted-foreground">Quick add items to work order</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>QR Scanner</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-muted rounded-lg flex flex-col items-center justify-center gap-4">
              <Camera className="h-24 w-24 text-muted-foreground" />
              <p className="text-muted-foreground">Position QR code within frame</p>
              <Button onClick={simulateScan}>
                Simulate Scan (Demo)
              </Button>
            </div>
          </CardContent>
        </Card>

        {scannedItem && (
          <Card className="border-primary">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Item Detected</span>
                <Badge>{scannedItem.category}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Item Code</span>
                  <span className="font-medium">{scannedItem.code}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Item Name</span>
                  <span className="font-medium">{scannedItem.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Price</span>
                  <span className="text-xl font-bold text-primary">
                    Rp {scannedItem.price.toLocaleString()}
                  </span>
                </div>
              </div>
              <Button className="w-full" onClick={addToWorkOrder}>
                <Plus className="mr-2 h-4 w-4" />
                Add to Work Order
              </Button>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Instructions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• Point your device camera at the QR code label on the item</p>
            <p>• Ensure good lighting for better scan accuracy</p>
            <p>• The item will be automatically detected and can be added to the current work order</p>
            <p>• If scan fails, you can manually enter the item in the work order form</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
