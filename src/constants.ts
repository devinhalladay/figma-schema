export interface PanelData {
  name: string;
  summary: string;
  event: string;
}

export const Panels = {
  USERS: {
    name: "Users",
    summary: "Complete user profiles",
    event: "GENERATE_USER_PROFILE"
  },
  NAMES: {
    name: "Names",
    summary: "Male, Female, and Neutral",
    event: "GENERATE_RANDOM_NAMES",
  },
  CUSTOM_LIST: {
    name: "Create a custom list",
    summary: "Add a list of your own content",
    event: "GENERATE_CUSTOM_LIST"
  },
  TIMES: {
    name: "Times",
    summary: "Spaced, Random, and Time Zones",
    event: "GENERATE_RANDOM_TIMES",
  },
  ORGANIZATIONS: {
    name: "Organizations",
    summary: "Publications, Brands, Websites",
    event: "GENERATE_ORGANIZATIONS"
  },
  NUMBERS: {
    name: "Numbers",
    summary: "Prices, Percentages, Random Numbers",
    event: "GENERATE_NUMBERS"
  },
  API: {
    name: "API Integration",
    summary: "Connect a data source to your designs",
    event: "GENERATE_API_REQUEST"
  },
  CONTACT_INFORMATION: {
    name: "Contact Information",
    summary: "Emails, Phone Numbers, Addresses",
    event: "GENERATE_CONTACT_INFO"
  },
  TRENDING_TOPICS: {
    name: "Trending Topics",
    summary: "Hashtags or keywords trending on the internet",
    event: "GENERATE_TRENDS"
  }
};
