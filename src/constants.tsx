import { Fragment, h } from "preact";
import { ReactElement } from "react";
import { ReactNode } from "react";
import TimeIcon from "./components/Icons/TimeIcon";
import UsersIcon from "./components/Icons/UsersIcon";
import VariableIcon from "./components/Icons/VariableIcon";
import ComponentVariabelsPanel from "./components/Panel/ComponentVariablesPanel";
import CustomListPanel from "./components/Panel/CustomListPanel";
import NamePanel from "./components/Panel/NamesPanel";
import TimesPanel from "./components/Panel/TimesPanel";

export interface PanelData {
  name: string;
  summary: string;
  event: string;
  icon: ReactNode | null;
  isEnabled: Boolean;
  element?: ReactElement;
  isVariableOption?: Boolean;
}

export const Panels = {
  USERS: {
    name: "Users",
    summary: "Complete user profiles",
    event: "GENERATE_USER_PROFILE",
    icon: null,
    isEnabled: false,
    isVariableOption: false,
  },
  NAMES: {
    name: "Names",
    summary: "Male, Female, and Neutral",
    event: "GENERATE_RANDOM_NAMES",
    icon: <UsersIcon />,
    element: <NamePanel />,
    isEnabled: true,
    isVariableOption: true,
  },
  COMPONENT_VARIABLES: {
    name: "Component Variables",
    summary: "Fill multiple variables",
    event: "GET_COMPONENT_VARIABLES",
    icon: <VariableIcon />,
    element: <ComponentVariabelsPanel />,
    isEnabled: true,
    isVariableOption: false,
  },
  CUSTOM_LIST: {
    name: "Create a custom list",
    summary: "Add a list of your own content",
    event: "GET_CUSTOM_LIST",
    icon: <VariableIcon />,
    element: <CustomListPanel />,
    isEnabled: true,
    isVariableOption: false,
  },
  TIMES: {
    name: "Times",
    summary: "Spaced, Random, and Time Zones",
    event: "GENERATE_RANDOM_TIMES",
    icon: <TimeIcon />,
    element: <TimesPanel />,
    isEnabled: true,
    isVariableOption: true,
  },
  ORGANIZATIONS: {
    name: "Organizations",
    summary: "Publications, Brands, Websites",
    event: "GENERATE_ORGANIZATIONS",
    icon: null,
    isEnabled: false,
    isVariableOption: false,
  },
  NUMBERS: {
    name: "Numbers",
    summary: "Prices, Percentages, Random Numbers",
    event: "GENERATE_NUMBERS",
    icon: null,
    isEnabled: false,
    isVariableOption: false,
  },
  API: {
    name: "API Integration",
    summary: "Connect a data source to your designs",
    event: "GENERATE_API_REQUEST",
    icon: null,
    isEnabled: false,
    isVariableOption: false,
  },
  CONTACT_INFORMATION: {
    name: "Contact Information",
    summary: "Emails, Phone Numbers, Addresses",
    event: "GENERATE_CONTACT_INFO",
    icon: null,
    isEnabled: false,
    isVariableOption: false,
  },
  TRENDING_TOPICS: {
    name: "Trending Topics",
    summary: "Hashtags or keywords trending on the internet",
    event: "GENERATE_TRENDS",
    icon: null,
    isEnabled: false,
    isVariableOption: false,
  },
};
