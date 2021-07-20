import {
  emit,
  getSceneNodeById,
  getSelectedNodesOrAllNodes,
  on,
  showUI,
  traverseNode
} from "@create-figma-plugin/utilities";
import faker from "faker";
import moment, { Moment } from "moment";
import { NameData, TimeData } from "./@types/Panel";
import { Panels } from "./constants";

export default function () {
  const options = { width: 300, height: 500 };

  function replaceNodesContent(
    nodes: SceneNode[],
    content: string | number | string[],
    random?: Boolean
  ) {
    nodes.forEach((node, i) => {
      let index = i;
      if (node.type === "TEXT") {
        figma.loadFontAsync(node.fontName as FontName).then(() => {
          if (Array.isArray(content)) {
            index = random
              ? Math.floor(Math.random() * content.length)
              : index;
            node.characters = content[index];
          } else {
            node.characters = content.toString();
          }
        });
      }
    });
  }

  function getProvidedOrSelectedNodes(data) {
    let nodes;

    if (data.id) {
      nodes = [getSceneNodeById(data.id)];
    } else {
      nodes = getSelectedNodesOrAllNodes();
    }

    return nodes;
  }

  function randomName(nameData: NameData) {
    let nodes = getProvidedOrSelectedNodes(nameData);

    function nameFactory(gender: undefined | number) {
      let nameParts = [];

      if (nameData.firstName) {
        nameParts.push(faker.name.firstName(gender));
      }

      // if (nameData.middleName) {
      //   nameParts.push(faker.name.middleName(gender))
      // }

      if (nameData.lastName && nameData.lastInitial === "Full") {
        nameParts.push(faker.name.lastName(gender));
      } else if (nameData.lastInitial === "Initial") {
        nameParts.push(faker.name.lastName(gender).charAt(0));
      } else {
        nameParts.push(faker.name.findName());
      }

      return nameParts.join(" ");
    }

    let namesList = [];

    if (nameData.gender == "Any" || nameData.gender === undefined) {
      for (let i = 0; i < nodes.length; i++) {
        let name = nameFactory(undefined);

        namesList.push(name);
      }
    } else if (nameData.gender) {
      let gender = nameData.gender === "Male" ? 0 : 1; // Male = 0, Female = 1

      for (let i = 0; i < nodes.length; i++) {
        let name = nameFactory(gender);
        namesList.push(name);
      }
    }

    replaceNodesContent(nodes, namesList);
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

  let data;

  function generateTimeTable(data: TimeData) {
    let nodes = getProvidedOrSelectedNodes(data);

    data = {
      time: {
        hour: 10,
        minute: 0,
      },
      amPm: "AM",
      interval: "30",
    };

    let interval = data.interval.replace(/\D/g, "");

    // Get current time, replace hours and minutes with input value
    let start = moment()
      .hour(data.time.hour)
      .minute(data.time.minute);

    // Swap AM/PM if needed
    start = setMeridiem(start, data.amPm);

    // To locale string
    let startTime = moment(start).format("LT");

    // Pre-populate start time
    let timeStops = [startTime];

    // Add interval for every layer selected
    for (let i = 0; i < nodes.length; i++) {
      let newTime = start.add(interval, "minutes").format("LT");
      timeStops.push(newTime);
    }

    replaceNodesContent(nodes, timeStops);
  }

  function generateCustomList(data) {
    let nodes = getProvidedOrSelectedNodes(data);

    const placeholders = data.value.split("\n");

    replaceNodesContent(nodes, placeholders, true);
  }

  function sendSelectedNodes(nodes: SceneNode[]) {
    figma.ui.postMessage({
      type: Panels.CUSTOM_LIST.event,
      nodes: JSON.parse(JSON.stringify(nodes)),
    });
  }

  function getSelectedTextNodes(data) {
    let nodes = getProvidedOrSelectedNodes(data);
    const textNodes = [];

    nodes.forEach((node: SceneNode) => {
      traverseNode(node, function (child): void {
        if (node.type === "TEXT") {
          textNodes.push({
            ...node,
            id: node.id,
            characters: node.characters,
            name: node.name,
          });
        } else if (child.type === "TEXT") {
          textNodes.push({
            ...child,
            id: child.id,
            characters: child.characters,
            name: child.name,
          });
        }
      });
    });

    sendSelectedNodes(textNodes);

    // figma.root.setPluginData('selectedNodes', JSON.stringify(textNodes))

    // data.setOptions({...data.options, nodes: textNodes})

    return textNodes;
  }

  function generateMultiple(data) {
    // const textNodes = getSelectedTextNodes(data)
    // data.forEach(layer => {
    //   emit(layer.operation, data)
    // });

    console.log(data);

    // data.nodes.forEach((node, i) => {
    //   if (node.operation)

    //     figma.loadFontAsync(node.fontName as FontName).then(() => {
    //       if (Array.isArray(content)) {
    //         node.characters = content[i];
    //       } else {
    //         node.characters = content.toString();
    //       }
    //     });
    // });
  }

  on(Panels.NAMES.event, randomName);
  on(Panels.TIMES.event, generateTimeTable);
  on(Panels.CUSTOM_LIST.event, generateCustomList);
  on(Panels.COMPONENT_VARIABLES.event, generateMultiple);

  showUI(options, data);

  figma.on("selectionchange", () => {
    if (figma.currentPage.selection.length > 0) {
      getSelectedTextNodes({
        nodes: [...figma.currentPage.selection],
      });
    } else {
      figma.notify("Select at least 1 layer")
    }
  });
}
