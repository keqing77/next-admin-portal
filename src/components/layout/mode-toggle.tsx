"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { theme,setTheme } = useTheme();

  return (
    <div className="flex items-center gap-1 rounded-md bg-muted p-1">
      <Button
        variant="ghost"
        size="icon"
        className="size-8 data-[state=active]:bg-background"
        onClick={() => setTheme("light")}
      >
        <Sun className={`size-4 ${theme === 'light' ? 'text-purple-500' : ''}`} />
        <span className="sr-only">Light Mode</span>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="size-8 data-[state=active]:bg-background"
        onClick={() => setTheme("dark")}
      >
        <Moon className={`size-4 ${theme === 'dark' ? 'text-purple-500' : ''}`}/>
        <span className="sr-only">Dark Mode</span>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="size-8 data-[state=active]:bg-background"
        onClick={() => setTheme("system")}
      >
        <Monitor className={`size-4 ${theme === 'system' ? 'text-purple-500' : ''}`} />
        <span className="sr-only">System Mode</span>
      </Button>
    </div>
  );
}
