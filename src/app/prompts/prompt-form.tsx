"use client";

import { useState, useEffect } from "react";
import { Prompt } from "./mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface PromptFormProps {
  prompt?: Prompt;
  onSubmit: (prompt: Omit<Prompt, "id" | "createdAt" | "updatedAt">) => void;
  onCancel: () => void;
}

export function PromptForm({ prompt, onSubmit, onCancel }: PromptFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    content: "",
    category: "",
  });

  useEffect(() => {
    if (prompt) {
      setFormData({
        name: prompt.name,
        description: prompt.description,
        content: prompt.content,
        category: prompt.category,
      });
    }
  }, [prompt]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          required
        />
      </div>
      <div>
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          value={formData.content}
          onChange={(e) =>
            setFormData({ ...formData, content: e.target.value })
          }
          required
        />
      </div>
      <div>
        <Label htmlFor="category">Category</Label>
        <Input
          id="category"
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          required
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{prompt ? "Update" : "Create"}</Button>
      </div>
    </form>
  );
}
