import { useState, useEffect } from "react";
import { Globe, Shield, AlertTriangle, Ban, Flame, Bot, Zap, Activity, CheckCircle2, Globe2, XCircle, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import MetricCard from "@/components/dashboard/MetricCard";
import ProtectionFeature from "@/components/dashboard/ProtectionFeature";
import ActivityItem from "@/components/dashboard/ActivityItem";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Dashboard = () => {
  const { toast } = useToast();
  const [metrics, setMetrics] = useState({
    totalRequests: 85,
    blockedRequests: 9,
    activeThreats: 0,
    blockedIPs: 0,
  });

  const [protectionFeatures, setProtectionFeatures] = useState({
    waf: true,
    antiCrawler: true,
    xdpFiltering: false,
    rateLimiting: true,
  });

  const [blockedIPs, setBlockedIPs] = useState<string[]>([]);
  const [newIP, setNewIP] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        ...prev,
        totalRequests: prev.totalRequests + Math.floor(Math.random() * 3),
        blockedRequests: prev.blockedRequests + (Math.random() > 0.7 ? 1 : 0),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const toggleFeature = (feature: keyof typeof protectionFeatures) => {
    setProtectionFeatures((prev) => ({
      ...prev,
      [feature]: !prev[feature],
    }));
    toast({
      title: "Protection Updated",
      description: `${feature} has been ${!protectionFeatures[feature] ? "enabled" : "disabled"}`,
    });
  };

  const addIPBlock = () => {
    if (newIP && /^(\d{1,3}\.){3}\d{1,3}$/.test(newIP)) {
      setBlockedIPs([...blockedIPs, newIP]);
      setMetrics((prev) => ({ ...prev, blockedIPs: prev.blockedIPs + 1 }));
      setNewIP("");
      setIsDialogOpen(false);
      toast({
        title: "IP Blocked",
        description: `Successfully blocked ${newIP}`,
      });
    } else {
      toast({
        title: "Invalid IP",
        description: "Please enter a valid IP address",
        variant: "destructive",
      });
    }
  };

  const removeIPBlock = (ip: string) => {
    setBlockedIPs(blockedIPs.filter((i) => i !== ip));
    setMetrics((prev) => ({ ...prev, blockedIPs: prev.blockedIPs - 1 }));
    toast({
      title: "IP Unblocked",
      description: `Removed block for ${ip}`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          icon={<Globe className="w-6 h-6 text-info" />}
          label="Total Requests"
          value={metrics.totalRequests}
          iconColor="bg-info/10"
        />
        <MetricCard
          icon={<Shield className="w-6 h-6 text-destructive" />}
          label="Blocked Requests"
          value={metrics.blockedRequests}
          iconColor="bg-destructive/10"
        />
        <MetricCard
          icon={<AlertTriangle className="w-6 h-6 text-warning" />}
          label="Active Threats"
          value={metrics.activeThreats}
          iconColor="bg-warning/10"
        />
        <MetricCard
          icon={<Ban className="w-6 h-6 text-primary" />}
          label="Blocked IPs"
          value={metrics.blockedIPs}
          iconColor="bg-primary/10"
        />
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Protection Features */}
        <Card className="p-6 shadow-card">
          <h2 className="text-xl font-bold mb-4 text-foreground">Protection Features</h2>
          <div className="space-y-2">
            <ProtectionFeature
              icon={<Flame className="w-5 h-5 text-destructive" />}
              title="Web Application Firewall"
              description="SQLi, XSS, and pattern filtering"
              enabled={protectionFeatures.waf}
              onToggle={() => toggleFeature("waf")}
              iconColor="bg-destructive/10"
            />
            <ProtectionFeature
              icon={<Bot className="w-5 h-5 text-info" />}
              title="Virtual Anti-Crawler"
              description="Advanced packet scrubbing"
              enabled={protectionFeatures.antiCrawler}
              onToggle={() => toggleFeature("antiCrawler")}
              iconColor="bg-info/10"
            />
            <ProtectionFeature
              icon={<Zap className="w-5 h-5 text-success" />}
              title="XDP Filtering"
              description="Kernel-level packet filtering"
              enabled={protectionFeatures.xdpFiltering}
              onToggle={() => toggleFeature("xdpFiltering")}
              iconColor="bg-success/10"
            />
            <ProtectionFeature
              icon={<Activity className="w-5 h-5 text-primary" />}
              title="Rate Limiting"
              description="HTTP flood mitigation"
              enabled={protectionFeatures.rateLimiting}
              onToggle={() => toggleFeature("rateLimiting")}
              iconColor="bg-primary/10"
            />
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="p-6 shadow-card">
          <h2 className="text-xl font-bold mb-4 text-foreground">Recent Activity</h2>
          <div className="space-y-2">
            <ActivityItem
              icon={<CheckCircle2 className="w-5 h-5 text-success" />}
              title="System running"
              description="VAC/XDP active"
              iconColor="bg-success/10"
            />
            <ActivityItem
              icon={<Globe2 className="w-5 h-5 text-info" />}
              title="Requests"
              description={`Total ${metrics.totalRequests}, Blocked ${metrics.blockedRequests}`}
              iconColor="bg-info/10"
            />
            <ActivityItem
              icon={<XCircle className="w-5 h-5 text-destructive" />}
              title="Blocked IPs"
              description={`${metrics.blockedIPs} currently blocked`}
              iconColor="bg-destructive/10"
            />
          </div>
        </Card>
      </div>

      {/* Blocked IP Addresses */}
      <Card className="p-6 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-foreground">Blocked IP Addresses</h2>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Add IP Block
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-border">
              <DialogHeader>
                <DialogTitle>Block IP Address</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Enter the IP address you want to block from accessing your system.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="ip">IP Address</Label>
                  <Input
                    id="ip"
                    placeholder="192.168.1.1"
                    value={newIP}
                    onChange={(e) => setNewIP(e.target.value)}
                    className="bg-background"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="secondary" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={addIPBlock}>Block IP</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        {blockedIPs.length > 0 ? (
          <div className="space-y-2">
            {blockedIPs.map((ip) => (
              <div
                key={ip}
                className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-smooth"
              >
                <div className="flex items-center gap-3">
                  <Ban className="w-5 h-5 text-destructive" />
                  <span className="font-mono text-foreground">{ip}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeIPBlock(ip)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  Unblock
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-8">No blocked IP addresses</p>
        )}
      </Card>
    </div>
  );
};

export default Dashboard;
