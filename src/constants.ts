export interface PanelData {
  name: string;
  summary: string;
  event: string;
}


export const Panels = {
  NAMES: {
    name: "Names",
    summary: "Male, Female, and Neutral",
    event: "GENERATE_RANDOM_NAMES",
  },
  TIMES: {
    name: "Times",
    summary: "Spaced, Random, and Time Zones",
    event: "GENERATE_RANDOM_TIMES",
  },
};
