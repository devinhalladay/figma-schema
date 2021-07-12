import {
  getSelectedNodesOrAllNodes,
  loadFontsAsync,
  on,
  showUI,
  sortNodesByCanonicalOrder,
} from "@create-figma-plugin/utilities";
import faker from "faker";
import moment from "moment";

export default function () {
  const options = { width: 300, height: 500 };
  const data = { greeting: "Hello, World!" };

  function replaceSelectedNodesContent(
    content: string | number | string[]
  ) {
    let nodes = getSelectedNodesOrAllNodes();
    nodes = sortNodesByCanonicalOrder(nodes).reverse();

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

  function randomName() {
    const name = faker.name.findName();
    replaceSelectedNodesContent(name);
  }

  function randomTime(start: Date | number) {    
  
    // const timeString = moment(time).format('LT');
    const nodes = getSelectedNodesOrAllNodes();

    var startTime = moment(start, "LT");

    var timeStops = [];

    for (let i = 0; i < nodes.length; i++) {
      timeStops.push(moment(startTime).format("LT"));
      startTime.add(15, "minutes");
    }

    console.log(timeStops);

    replaceSelectedNodesContent(timeStops);
  }

  // function handleSubmit (data: object) {
  //   console.log(data) //=> { greeting: 'Hello, World!' }
  //   const nodes = getSelectedNodesOrAllNodes()

  //   nodes.forEach((node) => {
  //     if (node.type === "TEXT") {
  //       figma.loadFontAsync(node.fontName as FontName).then(() => {
  //         node.characters = randomName()
  //       })
  //     }
  //   })
  // }

  // on('SUBMIT', handleSubmit)
  on("GENERATE_RANDOM_NAME", randomName);
  on("GENERATE_RANDOM_TIME", () => randomTime(1626056227));

  showUI(options, data);
}
