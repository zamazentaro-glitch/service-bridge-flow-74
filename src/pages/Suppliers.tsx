import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Plus, Search, Edit, Trash2, Phone, Mail, MapPin } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function Suppliers() {
  const [searchTerm, setSearchTerm] = useState("");

  const suppliers = [
    { 
      id: 1, 
      name: "PT Maju Motor Parts", 
      contact: "Budi Santoso",
      phone: "021-12345678",
      email: "sales@majumotor.com",
      address: "Jakarta Utara",
      rating: 4.8,
      totalTransactions: 156
    },
    { 
      id: 2, 
      name: "CV Sentosa Otomotif", 
      contact: "Siti Rahayu",
      phone: "021-87654321",
      email: "info@sentosaoto.com",
      address: "Jakarta Barat",
      rating: 4.5,
      totalTransactions: 98
    },
    { 
      id: 3, 
      name: "UD Berkah Sparepart", 
      contact: "Ahmad Yani",
      phone: "021-23456789",
      email: "berkahsparepart@mail.com",
      address: "Tangerang",
      rating: 4.2,
      totalTransactions: 67
    },
  ];

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.contact.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Suppliers</h1>
          <p className="text-muted-foreground">Manage supplier database</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Supplier
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search suppliers..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredSuppliers.map((supplier) => (
              <Card key={supplier.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold">{supplier.name}</h3>
                        <Badge variant="outline">
                          ⭐ {supplier.rating}
                        </Badge>
                        <Badge variant="secondary">
                          {supplier.totalTransactions} transactions
                        </Badge>
                      </div>
                      
                      <div className="grid gap-2 md:grid-cols-2 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Phone className="h-4 w-4" />
                          {supplier.phone}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Mail className="h-4 w-4" />
                          {supplier.email}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          {supplier.address}
                        </div>
                        <div className="text-muted-foreground">
                          Contact: {supplier.contact}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
