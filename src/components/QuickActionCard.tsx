import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  variant?: "default" | "primary";
}

export function QuickActionCard({ 
  title, 
  description, 
  icon: Icon, 
  href,
  variant = "default" 
}: QuickActionCardProps) {
  const navigate = useNavigate();
  
  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate(href)}>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className={`h-12 w-12 rounded-lg flex items-center justify-center shrink-0 ${
            variant === "primary" ? "bg-primary text-primary-foreground" : "bg-secondary"
          }`}>
            <Icon className="h-6 w-6" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground mb-3">{description}</p>
            <Button 
              size="sm" 
              variant={variant === "primary" ? "default" : "outline"}
              onClick={(e) => {
                e.stopPropagation();
                navigate(href);
              }}
            >
              Open
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
