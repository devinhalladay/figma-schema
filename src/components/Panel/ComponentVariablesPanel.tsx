import {
  Button,
  Checkbox,
  Container,
  Dropdown,
  DropdownOption,
  IconButton,
  Inline,
  Text,
  VerticalSpace,
} from "@create-figma-plugin/ui";
import { emit } from "@create-figma-plugin/utilities";
import { h, JSX, Fragment } from "preact";
import { useState } from "preact/hooks";
import { TextLayerData } from "src/@types/Panel";
import { Panels } from "../../constants";
import styles from "../../styles.module.css";
import Panel from ".";
import SliderIcon from "../Icons/SliderIcon";
import HorizontalSpace from "../HorizontalSpace";

export default function ComponentVariabelsPanel({ show }) {
  const [selectedNodes, setSelectedNodes] = useState([]);

  const optionGenerator = Object.entries(Panels).map(
    ([key, value]) => {
      return {
        // children: (
        //   <div className={styles.inlineCenter}>
        //     {value.icon}
        //     {value.name}
        //   </div>
        // ),
        children: value.name,
        value: value.name,
        event: value.event,
        panel: value,
      };
    }
  );
  // .filter((panel) => {
  //   return panel.isVariableOption !== true;
  // });

  const typeOptions: Array<DropdownOption> = [...optionGenerator];

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

        nodeCopy.operation = typeOptions[0].event; //works

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
    setSelectedNodes(event.data.pluginMessage.nodes);
    // setOptions({ ...options, nodes: event.data.pluginMessage.nodes });/
    // console.log(event.data.pluginMessage);

    // console.log(options.nodes);
  };

  function dispatchAllEvents() {
    selectedLayers.forEach((node: TextLayerData) => {
      if (node.operation) {
        console.log(node.operation);

        emit(node.operation.event, node);
      }
    });
  }

  const [showOptions, setShowOptions] = useState(false);

  const [selectedOption, setSelectedOption] = useState(
    typeOptions[0]
  );

  function handleShowOptions(
    event: JSX.TargetedEvent<HTMLInputElement>
  ) {
    setShowOptions(event.currentTarget.checked);
  }

  return (
    <Panel
      panel={Panels.COMPONENT_VARIABLES}
      data={selectedLayers}
      show={show}>
      <Container space="small">
        {selectedNodes.length > 0 &&
          selectedNodes.map((node, i) => {
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
                    <div className={styles.inlineCenter}>
                      <div className={styles.extend}>
                        <Dropdown
                          // icon={
                          //   typeOptions.find(
                          //     (option) =>
                          //       option.value == selectedOption.value
                          //   ).panel.icon
                          // }
                          onChange={(
                            e: JSX.TargetedEvent<HTMLInputElement>
                          ) => {
                            // console.log(e.currentTarget.value);

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
                            ).event;
                            // console.log(nodeCopy.operation);

                            nodesCopy[nodeIndex] = nodeCopy;
                            setSelectedLayers(nodesCopy);
                            console.log(selectedLayers);
                            // setSelectedOption(
                            //   typeOptions.find(
                            //     (option) =>
                            //       option.value ===
                            //       e.currentTarget.value
                            //   )
                            // );
                          }}
                          options={typeOptions}
                          value={
                            typeOptions.find(
                              (option) =>
                                option.event === node.operation
                            )?.value || typeOptions[0].value
                          }
                        />
                      </div>
                      <HorizontalSpace space="extraSmall" />
                      <IconButton
                        value={showOptions}
                        onChange={handleShowOptions}>
                        <SliderIcon />
                      </IconButton>
                    </div>
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
