import { Icons } from "@/components/shared/icons";

// landing sections
export type InfoList = {
    icon: keyof typeof Icons;
    title: string;
    description: string;
  };
  
  export type InfoLdg = {
    title: string;
    image: string;
    description: string;
    list: InfoList[];
  };
  
  export type Features = {
    icon: any;
    title: string;
    description: string;
    link: string;
  };
  
  export type Feature = {
    icon: string;
    titleKey: string;
    descriptionKey: string;
  };
  
  export interface TestimonialType {
    id: string;
    name: string;
    job: string;
    image: string;
    review: string;
  }