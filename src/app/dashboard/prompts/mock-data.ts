export interface Prompt {
  id: string;
  name: string;
  description: string;
  content: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export const mockPrompts: Prompt[] = [
  {
    id: "1",
    name: "Customer Support Greeting",
    description: "Initial greeting for customer support interactions",
    content: "Hello! How can I assist you today?",
    category: "Customer Support",
    createdAt: "2023-05-01T10:00:00Z",
    updatedAt: "2023-05-01T10:00:00Z",
  },
  {
    id: "2",
    name: "Product Recommendation",
    description: "Prompt for recommending products based on user preferences",
    content:
      "Based on your interests in {interests}, I recommend the following products: {recommendations}",
    category: "Sales",
    createdAt: "2023-05-02T14:30:00Z",
    updatedAt: "2023-05-03T09:15:00Z",
  },
  {
    id: "3",
    name: "Technical Troubleshooting",
    description:
      "Guide for technical support agents to troubleshoot common issues",
    content:
      "Let's troubleshoot your {device} issue step by step. First, can you tell me what specific problem you're experiencing?",
    category: "Technical Support",
    createdAt: "2023-05-04T11:45:00Z",
    updatedAt: "2023-05-04T11:45:00Z",
  },
];
