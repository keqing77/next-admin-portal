import { Features, InfoLdg, TestimonialType } from "@/types";

export const infos: InfoLdg[] = [
  {
    title: "Empower your projects",
    description:
      "Unlock the full potential of your projects with our open-source SaaS platform. Collaborate seamlessly, innovate effortlessly, and scale limitlessly.",
    image: "/_static/illustrations/work-from-home.jpg",
    list: [
      {
        title: "Collaborative",
        description: "Work together with your team members in real-time.",
        icon: "laptop",
      },
      {
        title: "Innovative",
        description: "Stay ahead of the curve with access constant updates.",
        icon: "settings",
      },
      {
        title: "Scalable",
        description:
          "Our platform offers the scalability needed to adapt to your needs.",
        icon: "search",
      },
    ],
  },
  {
    title: "Seamless Integration",
    description:
      "Integrate our open-source SaaS seamlessly into your existing workflows. Effortlessly connect with your favorite tools and services for a streamlined experience.",
    image: "/_static/illustrations/work-from-home.jpg",
    list: [
      {
        title: "Flexible",
        description:
          "Customize your integrations to fit your unique requirements.",
        icon: "laptop",
      },
      {
        title: "Efficient",
        description: "Streamline your processes and reducing manual effort.",
        icon: "search",
      },
      {
        title: "Reliable",
        description:
          "Rely on our robust infrastructure and comprehensive documentation.",
        icon: "settings",
      },
    ],
  },
];

export const features: Features[] = [
  {
    title: "Prompt Management",
    description:
      "Efficiently manage and customize prompts to enhance user interactions and model responses.",
    link: "/",
    icon: "nextjs",
  },
  {
    title: "Model Performance Monitoring",
    description:
      "Monitor and analyze model performance metrics to ensure optimal operation and accuracy.",
    link: "/",
    icon: "gitHub",
  },
  {
    title: "Audit Logs Monitoring",
    description:
      "Track and review audit logs to maintain security and compliance within the system.",
    link: "/",
    icon: "laptop",
  },
  {
    title: "User Access Management",
    description:
      "Control and manage user access levels to ensure secure and efficient system usage.",
    link: "/",
    icon: "user",
  },
  {
    title: "Data Analytics",
    description:
      "Analyze and visualize data to gain insights and drive informed decision-making.",
    link: "/",
    icon: "google",
  },
  {
    title: "Notification Management",
    description:
      "Manage and customize notifications to keep users informed and engaged.",
    link: "/",
    icon: "copy",
  },
];

export const testimonials: TestimonialType[] = [
  {
    id: "1",
    name: "Alice Johnson",
    job: "Full Stack Developer",
    image: "https://randomuser.me/api/portraits/men/41.jpg",
    review:
      "The admin dashboard has truly revolutionized my workflow. With its comprehensive features and seamless integration, I've been able to manage LLM parameters, user access, and prompt management more efficiently than ever before. The documentation is clear and concise, making it easy to navigate through the setup process. I highly recommend this admin dashboard to any developer.",
  },
  {
    id: "2",
    name: "Michael Smith",
    job: "UI/UX Designer",
    image: "https://randomuser.me/api/portraits/women/32.jpg",
    review:
      "Thanks to the admin dashboard, I've been able to create modern and attractive user interfaces for managing LLM parameters and user access in record time. The dashboard provides a solid foundation for building sleek and intuitive designs, allowing me to focus more on the creative aspects of my work.",
  },
  {
    id: "3",
    name: "Joe Smith",
    job: "DevOps Engineer",
    image: "https://randomuser.me/api/portraits/men/33.jpg",
    review:
      "Thanks to the admin dashboard, I was able to streamline the entire process of managing model performance and user access. The dashboard's features have made it easy to monitor and adjust LLM parameters, ensuring optimal performance.",
  },
  {
    id: "4",
    name: "Emily Davis",
    job: "Project Manager",
    image: "https://randomuser.me/api/portraits/men/15.jpg",
    review:
      "I'm impressed by the quality of code and clear documentation of the admin dashboard. It has made managing prompt configurations and user access a breeze. Kudos to the team!",
  },
  {
    id: "5",
    name: "Jessica Lee",
    job: "Data Analyst",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
    review:
      "The admin dashboard provided me with the tools I needed to efficiently manage user data and monitor model performance. Thank you so much!",
  },
  {
    id: "6",
    name: "Daniel Anderson",
    job: "Marketing Manager",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    review:
      "The admin dashboard has been an invaluable asset in my role as a marketing manager. With its seamless integration, I've been able to launch targeted marketing campaigns with built-in user access management, allowing us to monetize our products and services more effectively.",
  },
  {
    id: "7",
    name: "Kobe Bryant",
    job: "Web Designer",
    image: "https://randomuser.me/api/portraits/men/10.jpg",
    review:
      "Thanks to the admin dashboard, I've been able to create modern and attractive user interfaces for managing LLM parameters and user access in record time. The dashboard provides a solid foundation for building sleek and intuitive designs, allowing me to focus more on the creative aspects of my work.",
  },
];
