import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ThemeType = "light" | "dark" | "system";

interface UserPanelProps {
  collapsed?: boolean;
}

export function UserPanel({ collapsed }: UserPanelProps) {
  const { theme, setTheme } = useTheme();

  return (
    <div className={cn("relative", collapsed ? "flex justify-center" : "px-2")}>
      <Popover>
        <PopoverTrigger asChild>
          <button className="flex items-center hover:bg-gray-100 p-2 rounded-lg w-full">
            <img
              className="h-8 w-8 rounded-full"
              src="https://github.com/shadcn.png"
              alt="avatar"
            />
            {!collapsed && (
              <div className="ml-2 text-left">
                <div className="text-sm font-medium">username</div>
                <div className="text-xs text-gray-500">test@example.com</div>
              </div>
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent
          className="w-64"
          align={collapsed ? "start" : "center"}
          side={collapsed ? "right" : "bottom"}
        >
          <div className="space-y-4">
            <div className="border-b pb-4">
              <div className="text-sm font-medium">username</div>
              <div className="text-xs text-gray-500">test@example.com</div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">主题设置</h4>
              <RadioGroup
                defaultValue={theme}
                onValueChange={(value) => setTheme(value as ThemeType)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="light" id="light" />
                  <label htmlFor="light">浅色</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="dark" id="dark" />
                  <label htmlFor="dark">深色</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="system" id="system" />
                  <label htmlFor="system">系统</label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">语言</h4>
              <Select defaultValue="zh">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="选择语言" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="zh">中文</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button variant="destructive" className="w-full">
              退出登录
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
