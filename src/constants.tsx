import { IconSearchLarge32 } from "@create-figma-plugin/ui";
import { createContext, Fragment, h, JSX } from "preact";
import { ReactElement, ReactNode } from "react";
import UsersIcon from "./components/Icons/UsersIcon";
import TimeIcon from "./components/Icons/TimeIcon";
import VariableIcon from "./components/Icons/VariableIcon";
// import { ReactComponent as VariableIcon } from "./assets/variables.svg";

export interface PanelData {
  name: string;
  summary: string;
  event: string;
  icon: ReactNode | null;
}

export const Panels = {
  USERS: {
    name: "Users",
    summary: "Complete user profiles",
    event: "GENERATE_USER_PROFILE",
    icon: null,
  },
  NAMES: {
    name: "Names",
    summary: "Male, Female, and Neutral",
    event: "GENERATE_RANDOM_NAMES",
    icon: <UsersIcon />,
  },
  COMPONENT_VARIABLES: {
    name: "Component Variables",
    summary: "Fill multiple variables",
    event: "GET_COMPONENT_VARIABLES",
    icon: <VariableIcon />,
  },
  CUSTOM_LIST: {
    name: "Create a custom list",
    summary: "Add a list of your own content",
    event: "GET_CUSTOM_LIST",
    icon: <VariableIcon />,
  },
  TIMES: {
    name: "Times",
    summary: "Spaced, Random, and Time Zones",
    event: "GENERATE_RANDOM_TIMES",
    icon: <TimeIcon />,
  },
  ORGANIZATIONS: {
    name: "Organizations",
    summary: "Publications, Brands, Websites",
    event: "GENERATE_ORGANIZATIONS",
    icon: null,
  },
  NUMBERS: {
    name: "Numbers",
    summary: "Prices, Percentages, Random Numbers",
    event: "GENERATE_NUMBERS",
    icon: null,
  },
  API: {
    name: "API Integration",
    summary: "Connect a data source to your designs",
    event: "GENERATE_API_REQUEST",
    icon: null,
  },
  CONTACT_INFORMATION: {
    name: "Contact Information",
    summary: "Emails, Phone Numbers, Addresses",
    event: "GENERATE_CONTACT_INFO",
    icon: null,
  },
  TRENDING_TOPICS: {
    name: "Trending Topics",
    summary: "Hashtags or keywords trending on the internet",
    event: "GENERATE_TRENDS",
    icon: null,
  },
};
