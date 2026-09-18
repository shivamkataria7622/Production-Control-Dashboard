import React, { useState, useEffect } from "react";
import { Factory, Activity, Clock, RefreshCw, Cpu } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface HeaderProps {
  onResetData: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onResetData }) => {
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }),
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-30 border-b border-stone-200 bg-[#faf8f5]/90 backdrop-blur-md px-6 py-3.5">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-stone-200 bg-white text-stone-600 shadow-sm">
            <Factory className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold tracking-tight text-stone-900 uppercase font-mono">
                Production Control Dashboard
              </h1>
              <Badge
                variant="info"
                className="text-[10px] py-0 font-mono uppercase bg-stone-100 text-stone-700 border-stone-300"
              >
                v2.4 Live
              </Badge>
            </div>
            <p className="text-xs text-stone-500 flex items-center gap-1.5 mt-0.5">
              <Cpu className="h-3 w-3 text-stone-400" />
              <span>Plant 04 • High Precision Assembly & Milling</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 rounded-full border border-stone-200 bg-white px-3 py-1 text-xs shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-medium text-stone-700">System Online</span>
            <span className="text-stone-300">|</span>
            <span className="text-stone-500 font-mono">Shift A</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-xs text-stone-600 font-mono bg-white px-3 py-1.5 rounded-lg border border-stone-200 shadow-sm">
            <Clock className="h-3.5 w-3.5 text-stone-400" />
            <span>{currentTime || "10:00:00 AM"}</span>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={onResetData}
            title="Reset dataset to factory default mock state"
            className="text-xs bg-white"
          >
            <RefreshCw className="h-3.5 w-3.5 mr-1.5 text-stone-400" />
            <span>Reset Demo Data</span>
          </Button>
        </div>
      </div>
    </header>
  );
};
