"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { LLMSettings } from "./llm-settings";

const SettingsSchema = z.object({
  theme: z.enum(["light", "dark"]),
  language: z.string(),
  llmModel: z.string(),
  temperature: z.number().min(0).max(1),
  maxTokens: z.number().positive(),
  websiteName: z.string(),
  websiteDescription: z.string(),
});

type SettingsValues = z.infer<typeof SettingsSchema>;

export default function SettingsForm() {
  const [isPending, setIsPending] = useState(false);
  const { toast } = useToast();

  const form = useForm<SettingsValues>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      theme: "light",
      language: "en",
      llmModel: "gpt-3.5-turbo",
      temperature: 0.7,
      maxTokens: 100,
      websiteName: "My Admin Portal",
      websiteDescription: "A powerful admin dashboard",
    },
  });

  async function onSubmit(data: SettingsValues) {
    setIsPending(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsPending(false);
    toast({
      title: "Settings updated",
      description: "Your settings have been updated successfully.",
    });
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* <ThemeToggle control={form.control} /> */}
        <LLMSettings control={form.control} />
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Save changes"}
        </Button>
      </form>
    </Form>
  );
}
