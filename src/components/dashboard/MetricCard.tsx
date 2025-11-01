import { ReactNode } from "react";
import { Card } from "@/components/ui/card";

interface MetricCardProps {
  icon: ReactNode;
  label: string;
  value: number;
  iconColor: string;
}

const MetricCard = ({ icon, label, value, iconColor }: MetricCardProps) => {
  return (
    <Card className="p-6 shadow-card hover:shadow-glow transition-smooth border-border">
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-lg ${iconColor}`}>
          {icon}
        </div>
        <div className="flex-1">
          <p className="text-muted-foreground text-sm mb-1">{label}</p>
          <p className="text-4xl font-bold text-foreground">{value}</p>
        </div>
      </div>
    </Card>
  );
};

export default MetricCard;
