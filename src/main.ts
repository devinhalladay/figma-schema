import {
  getSelectedNodesOrAllNodes,
  loadFontsAsync,
  on,
  showUI,
  sortNodesByCanonicalOrder,
} from "@create-figma-plugin/utilities";
import faker from "faker";
import moment, { Moment } from "moment";

export default function () {
  const options = { width: 300, height: 500 };
  const data = { greeting: "Hello, World!" };

  function replaceSelectedNodesContent(
    content: string | number | string[]
  ) {
    let nodes = getSelectedNodesOrAllNodes();
    // nodes = sortNodesByCanonicalOrder(nodes).reverse();

    nodes.forEach((node, i) => {
      if (node.type === "TEXT") {
        figma.loadFontAsync(node.fontName as FontName).then(() => {
          if (Array.isArray(content)) {
            node.characters = content[i];
          } else {
            node.characters = content.toString();
          }
        });
      }
    });
  }

  function randomName(data) {
    const nodes = getSelectedNodesOrAllNodes();

    function nameFactory(gender: undefined | number) {
      let nameParts = [];

      if (data.firstName) {
        nameParts.push(
          faker.name.firstName(gender)
        );
      }
        
      // if (data.middleName) {
      //   nameParts.push(faker.name.middleName(gender))
      // }

      if (data.lastName && data.lastInitial === "Full") {
        nameParts.push(
          faker.name.lastName(gender)
        );
      } else if (data.lastInitial === "Initial") {
        nameParts.push(faker.name.lastName(gender).charAt(0))
      }

      // console.log(nameParts);

      return nameParts.join(' ')
    }

    let namesList = [];
    

    if (data.gender == "Any") {
      for (let i = 0; i < nodes.length; i++) {
        let name = nameFactory(undefined)
        namesList.push(name);
      }
    } else {
      let gender = data.gender === "Male" ? 0 : 1; // Male = 0, Female = 1

      for (let i = 0; i < nodes.length; i++) {
        let name = nameFactory(gender)
        namesList.push(name);
      }
    }

    console.log(namesList);

    replaceSelectedNodesContent(namesList);
  }

  function setMeridiem(time: Moment, newMeridiem: string) {
    if (newMeridiem.toUpperCase() === "AM" && time.hours() >= 12) {
      time.hours(time.hours() - 12);
    } else if (
      newMeridiem.toUpperCase() === "PM" &&
      time.hours() < 12
    ) {
      time.hours(time.hours() + 12);
    }

    return time;
  }

  function generateTimeTable(data) {
    let interval = data.interval.replace(/\D/g, "");

    // Get current time, replace hours and minutes with input value
    let start = moment()
      .hour(data.time.hour)
      .minute(data.time.minute);

    // Swap AM/PM if needed
    start = setMeridiem(start, data.amPm);

    const nodes = getSelectedNodesOrAllNodes();

    // To locale string
    let startTime = moment(start).format("LT");

    // Pre-populate start time
    let timeStops = [startTime];

    // Add interval for every layer selected
    for (let i = 0; i < nodes.length; i++) {
      let newTime = start.add(interval, "minutes").format("LT");
      timeStops.push(newTime);
    }

    console.log(timeStops);

    replaceSelectedNodesContent(timeStops);
  }

  on("GENERATE_RANDOM_NAMES", randomName);
  on("GENERATE_RANDOM_TIMES", generateTimeTable);

  showUI(options, data);
}
