import { ReactNode } from "react";
import { Switch } from "@/components/ui/switch";

interface ProtectionFeatureProps {
  icon: ReactNode;
  title: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
  iconColor: string;
}

const ProtectionFeature = ({
  icon,
  title,
  description,
  enabled,
  onToggle,
  iconColor,
}: ProtectionFeatureProps) => {
  return (
    <div className="flex items-center justify-between p-4 rounded-lg hover:bg-secondary/50 transition-smooth">
      <div className="flex items-center gap-4">
        <div className={`p-2 rounded-lg ${iconColor}`}>
          {icon}
        </div>
        <div>
          <h3 className="font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <Switch checked={enabled} onCheckedChange={onToggle} />
    </div>
  );
};

export default ProtectionFeature;
