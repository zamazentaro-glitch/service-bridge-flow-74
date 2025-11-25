import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

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
    <Card 
      className="border-border/40 shadow-sm hover:shadow-md hover:border-border transition-all duration-200 cursor-pointer group" 
      onClick={() => navigate(href)}
    >
      <CardContent className="p-6">
        <div className="flex flex-col gap-4">
          {/* Icon */}
          <div className={`h-12 w-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 ${
            variant === "primary" 
              ? "bg-primary/10 text-primary" 
              : "bg-secondary text-foreground"
          }`}>
            <Icon className="h-6 w-6" strokeWidth={2} />
          </div>
          
          {/* Content */}
          <div className="space-y-2">
            <h3 className="font-semibold text-base">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>

          {/* Action Button */}
          <Button 
            size="sm" 
            variant={variant === "primary" ? "default" : "ghost"}
            className="w-fit mt-1 group-hover:gap-2 transition-all"
            onClick={(e) => {
              e.stopPropagation();
              navigate(href);
            }}
          >
            Open
            <ArrowRight className="h-3.5 w-3.5 opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
