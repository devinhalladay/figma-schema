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

  function randomTime(data) {
    console.log(data);

    const today = moment()

    let interval = data.interval.replace(/\D/g,'');

    // let start = moment(`${today}, ${}:${data.time.minute} ${data.amPm}`)
    const start = moment().hour(data.time.hour).minute(data.time.minute)
    
    
    // const timeString = moment(time).format('LT');
    const nodes = getSelectedNodesOrAllNodes();

    var startTime = moment(start).format("LT")

    console.log(startTime);
    
    

    var timeStops = [startTime];

    for (let i = 0; i < nodes.length; i++) {
      let newTime = start.add(interval, "minutes").format("LT");
      timeStops.push(newTime);
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
  on("GENERATE_RANDOM_NAMES", randomName);
  on("GENERATE_RANDOM_TIMES", randomTime);

  showUI(options, data);
}