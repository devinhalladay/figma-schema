import {
  Button,
  Checkbox,
  Container,
  Dropdown,
  DropdownOption,
  Text,
  VerticalSpace,
} from "@create-figma-plugin/ui";
import { emit } from "@create-figma-plugin/utilities";
import { h, JSX, Fragment } from "preact";
import { useState } from "preact/hooks";
import { Panels } from "src/constants";
import Panel from ".";

export default function ComponentVariabelsPanel() {
  const [options, setOptions] = useState({
    value: "",
    nodes: [],
  });

  const typeOptions: Array<DropdownOption> = [
    { value: "Names", event: Panels.NAMES.event },
    { value: "Times", event: Panels.TIMES.event },
    { value: "Custom List", event: Panels.CUSTOM_LIST.event },
  ];

  const [selectedLayers, setSelectedLayers] = useState([]);

  function handleChange(
    event: JSX.TargetedEvent<HTMLInputElement>,
    node: SceneNode | Node
  ) {
    if (event.currentTarget.checked) {
      // setSelectedLayers(selectedLayers.concat(node));

      if (selectedLayers.some((layer) => layer.id === node.id)) {
        let nodeIndex = selectedLayers.indexOf(node);
        let nodesCopy = [...selectedLayers];
        let nodeCopy = {
          ...nodesCopy[nodeIndex],
        };
        nodeCopy.operation = typeOptions.find(
          (option) => option.value === event.currentTarget.value
        );

        nodesCopy[nodeIndex] = nodeCopy;

        setSelectedLayers(nodesCopy);

        console.log(selectedLayers);
      } else {
        let nodeCopy = {
          ...node,
        };

        nodeCopy.operation = typeOptions[0]; //works

        setSelectedLayers(selectedLayers.concat(nodeCopy));

        console.log("selected");
        console.log(selectedLayers);
      }
    } else if (selectedLayers.some((layer) => layer.id === node.id)) {
      setSelectedLayers(
        selectedLayers.filter(function (item) {
          return item.id !== node.id;
        })
      );
    }

    return;
  }

  onmessage = (event) => {
    setOptions({ ...options, nodes: event.data.pluginMessage.nodes });
    console.log(event.data.pluginMessage);

    // console.log(options.nodes);
  };

  function dispatchAllEvents() {
    selectedLayers.forEach((node) => {
      if (node.operation) {
        console.log(node.operation);

        emit(node.operation.event, node);
      }
    });
  }

  return (
    <Panel panel={Panels.COMPONENT_VARIABLES} data={options}>
      <Container space="small">
        {options.nodes.length > 0 &&
          options.nodes.map((node, i) => {
            return (
              <>
                <Checkbox
                  onChange={(e) => handleChange(e, node)}
                  value={selectedLayers.some(
                    (layer) => layer.id === node.id
                  )}>
                  <Text>{node.name}</Text>
                </Checkbox>
                <VerticalSpace space="small" />
                {selectedLayers.some(
                  (layer) => layer.id === node.id
                ) && (
                  <>
                    <Dropdown
                      onChange={(
                        e: JSX.TargetedEvent<HTMLInputElement>
                      ) => {
                        let nodeIndex = selectedLayers.findIndex(
                          (layer) => layer.id === node.id
                        );
                        let nodesCopy = [...selectedLayers];
                        let nodeCopy = {
                          ...nodesCopy[nodeIndex],
                        };
                        nodeCopy.operation = typeOptions.find(
                          (option) =>
                            option.value === e.currentTarget.value
                        );

                        nodesCopy[nodeIndex] = nodeCopy;

                        setSelectedLayers(nodesCopy);

                        console.log(selectedLayers);
                      }}
                      options={typeOptions}
                      value={
                        selectedLayers.find(
                          (layer) => layer.id === node.id
                        ).operation.value
                      }
                    />
                    <VerticalSpace space="small" />
                  </>
                )}
              </>
            );
          })}

        <Button onClick={() => dispatchAllEvents()}>
          Fill selected layers
        </Button>
      </Container>
    </Panel>
  );
}
