"use client";

import { useState } from "react";
import { PromptTable } from "./prompt-table";
import { PromptForm } from "./prompt-form";
import { mockPrompts } from "./mock-data";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { Prompt } from "./mock-data";

export default function PromptManagementPage() {
  const [prompts, setPrompts] = useState<Prompt[]>(mockPrompts);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState<Prompt | undefined>(
    undefined
  );

  const handleCreatePrompt = (
    newPrompt: Omit<Prompt, "id" | "createdAt" | "updatedAt">
  ) => {
    const prompt: Prompt = {
      ...newPrompt,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setPrompts([...prompts, prompt]);
    setIsFormOpen(false);
  };

  const handleUpdatePrompt = (
    updatedPrompt: Omit<Prompt, "id" | "createdAt" | "updatedAt">
  ) => {
    if (editingPrompt) {
      const updatedPrompts = prompts.map((p) =>
        p.id === editingPrompt.id
          ? { ...p, ...updatedPrompt, updatedAt: new Date().toISOString() }
          : p
      );
      setPrompts(updatedPrompts);
      setEditingPrompt(undefined);
      setIsFormOpen(false);
    }
  };

  const handleDeletePrompt = (id: string) => {
    setPrompts(prompts.filter((p) => p.id !== id));
  };

  const handleEditPrompt = (prompt: Prompt) => {
    setEditingPrompt(prompt);
    setIsFormOpen(true);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-6">Prompt Management</h1>
      {isFormOpen ? (
        <PromptForm
          prompt={editingPrompt}
          onSubmit={editingPrompt ? handleUpdatePrompt : handleCreatePrompt}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingPrompt(undefined);
          }}
        />
      ) : (
        <div className="space-y-4">
          <Button onClick={() => setIsFormOpen(true)}>
            <PlusIcon className="mr-2 h-4 w-4" /> Create New Prompt
          </Button>
          <PromptTable
            prompts={prompts}
            onEdit={handleEditPrompt}
            onDelete={handleDeletePrompt}
          />
        </div>
      )}
    </div>
  );
}
