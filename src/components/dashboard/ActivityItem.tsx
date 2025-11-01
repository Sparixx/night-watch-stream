import { ReactNode } from "react";

interface ActivityItemProps {
  icon: ReactNode;
  title: string;
  description: string;
  iconColor: string;
}

const ActivityItem = ({ icon, title, description, iconColor }: ActivityItemProps) => {
  return (
    <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-secondary/50 transition-smooth">
      <div className={`p-2 rounded-lg ${iconColor} flex-shrink-0`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-foreground">{title}</h4>
        <p className="text-sm text-muted-foreground truncate">{description}</p>
      </div>
    </div>
  );
};

export default ActivityItem;
