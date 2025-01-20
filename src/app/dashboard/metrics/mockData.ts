import { DateRange } from "react-day-picker";

export interface MetricData {
  requestId: string;
  metricName: string;
  evaluationMethod: string;
  timestamp: string;
  metricValue: number;
  threshold: number;
  actionableInsights: string;
  country: string;
  businessUnit: string;
  input?: string;
  output?: string;
  responseTime?: number;
  model?: string;
}

export const mockData: MetricData[] = [
  {
    requestId: "req_100001",
    metricName: "User giver",
    evaluationMethod: "Automated",
    timestamp: "2024-01-15T09:30:00Z",
    metricValue: 0.85,
    threshold: 0.75,
    actionableInsights: "N/A",
    country: "HK",
    businessUnit: "ASP",
    input: "How do I implement error handling in Python?",
    output: "In Python, you can implement error handling using try-except blocks. Here's an example:\n\ntry:\n    # Your code here\n    result = 10 / 0\nexcept ZeroDivisionError:\n    print('Cannot divide by zero')\nexcept Exception as e:\n    print(f'An error occurred: {e}')\n\nThis helps your program gracefully handle errors instead of crashing.",
    responseTime: 850,
    model: "GPT-4"
  },
  {
    requestId: "req_100002",
    metricName: "Accuracy",
    evaluationMethod: "Automated",
    timestamp: "2024-01-15T10:15:00Z",
    metricValue: 0.92,
    threshold: 0.75,
    actionableInsights: "N/A",
    country: "SG",
    businessUnit: "CTO",
    input: "What are the best practices for API security?",
    output: "Key API security best practices include: 1. Use OAuth/JWT for authentication 2. Implement rate limiting 3. Use HTTPS/TLS encryption 4. Input validation 5. Regular security audits",
    responseTime: 720,
    model: "Claude 3"
  },
  {
    requestId: "req_100003",
    metricName: "Completeness",
    evaluationMethod: "Manual",
    timestamp: "2024-01-16T11:20:00Z",
    metricValue: 0.68,
    threshold: 0.75,
    actionableInsights: "N/A",
    country: "UK",
    businessUnit: "CIO",
    input: "Explain microservices architecture",
    output: "Microservices architecture is a design approach where an application is built as a collection of small, independent services. Each service runs in its own process and communicates through APIs.",
    responseTime: 930,
    model: "Gemini Pro"
  },
  {
    requestId: "req_100004",
    metricName: "Hallucination",
    evaluationMethod: "Automated",
    timestamp: "2024-01-16T13:45:00Z",
    metricValue: 0.88,
    threshold: 0.75,
    actionableInsights: "N/A",
    country: "HK",
    businessUnit: "CTO",
    input: "What is Docker containerization?",
    output: "Docker containerization is a technology that packages an application and its dependencies together in a container, ensuring consistent operation across different computing environments.",
    responseTime: 680,
    model: "GPT-4"
  },
  {
    requestId: "req_100005",
    metricName: "User giver",
    evaluationMethod: "Automated",
    timestamp: "2024-01-17T14:30:00Z",
    metricValue: 0.95,
    threshold: 0.75,
    actionableInsights: "N/A",
    country: "SG",
    businessUnit: "ASP",
    input: "Explain REST API principles",
    output: "REST APIs follow key principles: 1. Stateless communication 2. Client-server architecture 3. Uniform interface 4. Cacheable responses 5. Layered system design",
    responseTime: 750,
    model: "Claude 3"
  },
  {
    requestId: "req_100006",
    metricName: "Accuracy",
    evaluationMethod: "Automated",
    timestamp: "2024-01-17T15:20:00Z",
    metricValue: 0.72,
    threshold: 0.75,
    actionableInsights: "N/A",
    country: "UK",
    businessUnit: "CIO",
    input: "How to optimize database queries?",
    output: "To optimize database queries: 1. Use proper indexing 2. Avoid SELECT * 3. Use EXPLAIN to analyze queries 4. Minimize JOIN operations 5. Consider query caching",
    responseTime: 890,
    model: "LLaMA-2"
  },
  {
    requestId: "req_100007",
    metricName: "Completeness",
    evaluationMethod: "Manual",
    timestamp: "2024-01-18T09:15:00Z",
    metricValue: 0.89,
    threshold: 0.75,
    actionableInsights: "N/A",
    country: "HK",
    businessUnit: "ASP",
    input: "What are design patterns in software engineering?",
    output: "Design patterns are reusable solutions to common problems in software design. Examples include Singleton, Factory, Observer, and Strategy patterns.",
    responseTime: 820,
    model: "GPT-4"
  },
  {
    requestId: "req_100008",
    metricName: "Hallucination",
    evaluationMethod: "Automated",
    timestamp: "2024-01-18T10:45:00Z",
    metricValue: 0.78,
    threshold: 0.75,
    actionableInsights: "N/A",
    country: "SG",
    businessUnit: "CTO",
    input: "Explain CI/CD pipeline",
    output: "A CI/CD pipeline automates the software delivery process. CI (Continuous Integration) automatically builds and tests code changes, while CD (Continuous Deployment) automatically deploys verified code to production.",
    responseTime: 700,
    model: "Claude 3"
  },
  {
    requestId: "req_100009",
    metricName: "User giver",
    evaluationMethod: "Automated",
    timestamp: "2024-01-19T11:30:00Z",
    metricValue: 0.91,
    threshold: 0.75,
    actionableInsights: "N/A",
    country: "UK",
    businessUnit: "CIO",
    input: "Best practices for code review",
    output: "Code review best practices: 1. Review manageable chunks 2. Use automated tools 3. Focus on design and functionality 4. Provide constructive feedback 5. Verify bug fixes",
    responseTime: 780,
    model: "Gemini Pro"
  },
  {
    requestId: "req_100010",
    metricName: "Accuracy",
    evaluationMethod: "Automated",
    timestamp: "2024-01-19T13:20:00Z",
    metricValue: 0.86,
    threshold: 0.75,
    actionableInsights: "N/A",
    country: "HK",
    businessUnit: "ASP",
    input: "What is Kubernetes?",
    output: "Kubernetes is an open-source container orchestration platform that automates the deployment, scaling, and management of containerized applications.",
    responseTime: 650,
    model: "GPT-4"
  }
];
