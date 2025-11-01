import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your settings have been updated successfully",
    });
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <h1 className="text-3xl font-bold text-foreground">Settings</h1>

      {/* General Settings */}
      <Card className="p-6 shadow-card">
        <h2 className="text-xl font-bold mb-4 text-foreground">General Settings</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" placeholder="admin@example.com" className="bg-background" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">Company Name</Label>
            <Input id="company" placeholder="Your Company" className="bg-background" />
          </div>
        </div>
      </Card>

      {/* Notification Settings */}
      <Card className="p-6 shadow-card">
        <h2 className="text-xl font-bold mb-4 text-foreground">Notifications</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Email Alerts</Label>
              <p className="text-sm text-muted-foreground">Receive email notifications for security events</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label>Threat Notifications</Label>
              <p className="text-sm text-muted-foreground">Get notified about detected threats</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label>System Updates</Label>
              <p className="text-sm text-muted-foreground">Notifications about system updates</p>
            </div>
            <Switch />
          </div>
        </div>
      </Card>

      {/* Security Settings */}
      <Card className="p-6 shadow-card">
        <h2 className="text-xl font-bold mb-4 text-foreground">Security</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="threshold">Threat Detection Threshold</Label>
            <Input id="threshold" type="number" min="0" max="100" defaultValue="75" className="bg-background" />
            <p className="text-sm text-muted-foreground">Set the sensitivity level for threat detection (0-100)</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="rate-limit">Rate Limit (requests/minute)</Label>
            <Input id="rate-limit" type="number" min="1" defaultValue="100" className="bg-background" />
          </div>
        </div>
      </Card>

      <Button onClick={handleSave} className="w-full">
        Save Settings
      </Button>
    </div>
  );
};

export default Settings;
