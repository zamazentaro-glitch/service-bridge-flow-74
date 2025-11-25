import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

export function StatCard({ title, value, icon: Icon, trend }: StatCardProps) {
  return (
    <Card className="border-border/40 shadow-sm hover:shadow-md transition-all duration-200">
      <CardContent className="p-6">
        <div className="flex flex-col gap-4">
          {/* Icon with pill background */}
          <div className="flex items-center justify-between">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Icon className="h-5 w-5 text-primary" strokeWidth={2} />
            </div>
            {trend && (
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                trend.isPositive 
                  ? 'bg-success/10 text-success' 
                  : 'bg-destructive/10 text-destructive'
              }`}>
                {trend.isPositive ? '↑' : '↓'} {trend.value}
              </span>
            )}
          </div>

          {/* Value and title */}
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">
              {title}
            </p>
            <h3 className="text-3xl font-semibold tracking-tight">
              {value}
            </h3>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
