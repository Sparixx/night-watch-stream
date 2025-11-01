import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface LogEntry {
  id: string;
  timestamp: string;
  type: "info" | "warning" | "error" | "blocked";
  message: string;
  ip?: string;
}

const Logs = () => {
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: "1",
      timestamp: new Date().toISOString(),
      type: "info",
      message: "System initialized successfully",
    },
    {
      id: "2",
      timestamp: new Date(Date.now() - 60000).toISOString(),
      type: "blocked",
      message: "Blocked malicious request - SQL injection attempt",
      ip: "192.168.1.100",
    },
    {
      id: "3",
      timestamp: new Date(Date.now() - 120000).toISOString(),
      type: "warning",
      message: "High request rate detected from IP",
      ip: "10.0.0.50",
    },
    {
      id: "4",
      timestamp: new Date(Date.now() - 180000).toISOString(),
      type: "info",
      message: "WAF rules updated",
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const types: LogEntry["type"][] = ["info", "warning", "blocked"];
      const messages = [
        "Request processed successfully",
        "Suspicious pattern detected",
        "Rate limit exceeded",
        "XSS attempt blocked",
      ];
      
      const newLog: LogEntry = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        type: types[Math.floor(Math.random() * types.length)],
        message: messages[Math.floor(Math.random() * messages.length)],
        ip: Math.random() > 0.5 ? `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}` : undefined,
      };

      setLogs((prev) => [newLog, ...prev].slice(0, 50));
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const getLogColor = (type: LogEntry["type"]) => {
    switch (type) {
      case "error":
      case "blocked":
        return "bg-destructive/10 text-destructive border-destructive/20";
      case "warning":
        return "bg-warning/10 text-warning border-warning/20";
      default:
        return "bg-info/10 text-info border-info/20";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">System Logs</h1>
        <Badge variant="secondary" className="text-sm">
          Live Updates
        </Badge>
      </div>

      <Card className="p-6 shadow-card">
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-3">
            {logs.map((log) => (
              <div
                key={log.id}
                className={`p-4 rounded-lg border transition-smooth hover:shadow-md ${getLogColor(log.type)}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge variant="outline" className="uppercase text-xs">
                        {log.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(log.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm font-medium">{log.message}</p>
                    {log.ip && (
                      <p className="text-xs text-muted-foreground mt-1 font-mono">
                        IP: {log.ip}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
};

export default Logs;
