export interface ActivityData {
  userId: string;
  username: string;
  country: string;
  department: string;
  requestContent: Record<string, any>;
  responseContent: Record<string, any>;
  activity: string;
  requestToken: number;
  responseToken: number;
  cost: number;
}

export const mockData: ActivityData[] = [
  {
    userId: "4999999",
    username: "admin",
    country: "HK",
    department: "COMP IT - ASP CHINA GZ",
    requestContent: {
      key1: "value1",
      key2: "value2",
      nested: {
        a: 1,
        b: 2
      }
    },
    responseContent: {
      status: "success",
      data: {
        result: "processed",
        details: {
          x: "test",
          y: 123
        }
      }
    },
    activity: "Chat",
    requestToken: 3210,
    responseToken: 250,
    cost: 0.05
  },
  {
    userId: "4666666",
    username: "user1",
    country: "China",
    department: "COMP IT - ASP CHINA GZ",
    requestContent: { content: "-" },
    responseContent: { content: "-" },
    activity: "Login",
    requestToken: 1320,
    responseToken: 210,
    cost: 0.03
  },
  // Add more mock data as needed
];
