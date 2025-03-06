"use client";

import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";

interface LLMSettingsProps {
  control: Control<any>;
}

export function LLMSettings({ control }: LLMSettingsProps) {
  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="llmModel"
        render={({ field }) => (
          <FormItem>
            <FormLabel>LLM Model</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a model" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                <SelectItem value="gpt-4">GPT-4</SelectItem>
                <SelectItem value="claude-v1">Claude v1</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="temperature"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Temperature: {field.value.toFixed(2)}</FormLabel>
            <FormControl>
              <Slider
                min={0}
                max={1}
                step={0.01}
                value={[field.value]}
                onValueChange={(value) => field.onChange(value[0])}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="maxTokens"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Max Tokens</FormLabel>
            <FormControl>
              <Input
                type="number"
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
}
